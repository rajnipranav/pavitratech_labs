/**
 * Cloudflare Worker — DeepSeek API Proxy
 *
 * Accepts POST { text: string } from your static blog, forwards it to the
 * DeepSeek Chat API, and returns the AI analysis. Your DEEPSEEK_API_KEY stays
 * in the Worker environment — it's never exposed to the client.
 *
 * Deploy:  npx wrangler deploy
 * Set key: npx wrangler secret put DEEPSEEK_API_KEY
 */

interface Env {
  DEEPSEEK_API_KEY: string;
}

interface AnalysisResult {
  summary: string;
  painPoints: string[];
  suggestions: string[];
}

const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

const SYSTEM_PROMPT = `You are a product analyst and research assistant. Extract pain points, missing features, or actionable insights from the text below.

Return your response as a JSON object with exactly this structure — no markdown, no code fences, just raw JSON:

{
  "summary": "A 2-3 sentence overview of the key themes and sentiment in the text",
  "painPoints": ["Specific pain point 1", "pain point 2", "pain point 3", "pain point 4"],
  "suggestions": ["Actionable suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4"]
}

Always provide exactly 4 pain points and 4 suggestions. Be concise but thorough. Focus on things a product team could actually act on.`;

// ── CORS headers for the static site ──────────────────────────────────────────
const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function corsResponse(body: string, status = 200): Response {
  return new Response(body, { status, headers: CORS_HEADERS });
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return corsResponse('', 204);
    }

    // Only accept POST
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed. Use POST.' }, 405);
    }

    // Check API key is configured
    if (!env.DEEPSEEK_API_KEY) {
      return jsonResponse(
        { error: 'Server misconfigured — API key not set.' },
        500
      );
    }

    // Parse the incoming text
    let userText: string;
    try {
      const body = (await request.json()) as { text?: string };
      userText = (body.text || '').trim();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body. Send { text: "..." }' }, 400);
    }

    if (!userText) {
      return jsonResponse({ error: 'Missing "text" field in request body.' }, 400);
    }

    if (userText.length > 8000) {
      return jsonResponse(
        { error: 'Text too long. Maximum 8,000 characters.' },
        400
      );
    }

    // Call DeepSeek
    try {
      const dsResponse = await fetch(DEEPSEEK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userText },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!dsResponse.ok) {
        const errText = await dsResponse.text().catch(() => '');
        console.error(`DeepSeek API error ${dsResponse.status}: ${errText}`);

        if (dsResponse.status === 401 || dsResponse.status === 403) {
          return jsonResponse(
            { error: 'Invalid API key. Check your DEEPSEEK_API_KEY secret.' },
            502
          );
        }
        if (dsResponse.status === 429) {
          return jsonResponse(
            { error: 'DeepSeek rate limit reached. Please try again in a few seconds.' },
            429
          );
        }
        return jsonResponse(
          { error: `DeepSeek API returned status ${dsResponse.status}.` },
          502
        );
      }

      const data = (await dsResponse.json()) as {
        choices?: { message?: { content?: string } }[];
      };

      const rawContent = data.choices?.[0]?.message?.content;
      if (!rawContent) {
        return jsonResponse(
          { error: 'DeepSeek returned an empty response.' },
          502
        );
      }

      // DeepSeek should return JSON per our system prompt, but sanitize just in
      // case it wraps the JSON in markdown code fences
      let cleaned = rawContent.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      }

      // Parse and validate
      let result: AnalysisResult;
      try {
        result = JSON.parse(cleaned) as AnalysisResult;
      } catch {
        // Fallback: wrap the raw text as a summary
        result = {
          summary: cleaned.slice(0, 500),
          painPoints: ['(Could not parse structured pain points)'],
          suggestions: ['(Could not parse structured suggestions)'],
        };
      }

      return jsonResponse({
        summary: result.summary || '',
        painPoints: Array.isArray(result.painPoints) ? result.painPoints : [],
        suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      return jsonResponse(
        { error: 'An unexpected error occurred. Please try again.' },
        500
      );
    }
  },
};
