'use client';

import { useState, useCallback } from 'react';

// ──────────────────────────────────────────────────────────────────────────────
// Cloudflare Worker proxy for the DeepSeek API.
//
// The Worker (workers/deepseek-proxy/) receives POST { text: string }, forwards
// it to api.deepseek.com/v1/chat/completions with the key stored as a secret,
// and returns structured analysis. This keeps the API key server-side — it's
// never bundled into the static export.
//
// Set NEXT_PUBLIC_DEEPSEEK_WORKER_URL to your deployed Worker URL (e.g.
// https://deepseek-proxy.your-subdomain.workers.dev). The URL is safe to expose.
//
// When the URL is absent the component falls back to mock data so the site
// still builds and looks correct before the Worker is deployed.
// ──────────────────────────────────────────────────────────────────────────────

const WORKER_URL =
  process.env.NEXT_PUBLIC_DEEPSEEK_WORKER_URL || '';

interface AnalysisResult {
  summary: string;
  painPoints: string[];
  suggestions: string[];
}

// ── Mock responses (fallback when no Worker URL is set) ──────────────────────
const MOCK_RESPONSES: AnalysisResult[] = [
  {
    summary:
      'This text reveals frustration with onboarding complexity and a lack of progress visibility — two high-signal pain points that correlate strongly with churn in SaaS products.',
    painPoints: [
      'Onboarding process is too long with no indication of how many steps remain',
      'Documentation references features that have been renamed or moved',
      'No way to skip or customize the setup wizard for advanced users',
      "Error messages are cryptic and don't suggest next actions",
    ],
    suggestions: [
      'Add a progress bar or step counter to the onboarding flow',
      'Implement a "quick setup" path for experienced users who want to self-configure',
      'Audit all documentation links from within the product to catch broken references',
      'Rewrite error messages to include a clear "what to do next" action item',
    ],
  },
  {
    summary:
      'The feedback centers on pricing transparency and billing surprises — issues that erode trust and drive support ticket volume.',
    painPoints: [
      "Pricing page doesn't clearly explain what happens when you exceed plan limits",
      'No usage dashboard to monitor consumption in real time',
      'Annual billing saves money but the cancellation process is intentionally difficult',
      'Feature gating between tiers feels arbitrary rather than value-aligned',
    ],
    suggestions: [
      'Show a real-time usage meter in the dashboard with projected monthly cost',
      'Publish a clear overage policy with examples on the pricing page',
      'Add a self-serve downgrade/cancel flow (no support ticket required)',
      'Re-evaluate tier breaks so each tier unlocks a distinct capability story',
    ],
  },
];

function getMockResult(text: string): AnalysisResult {
  return MOCK_RESPONSES[text.length % MOCK_RESPONSES.length];
}

// ── Component ────────────────────────────────────────────────────────────────

export function DeepSeekResearch() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [isLive, setIsLive] = useState(false); // true once we know the Worker is reachable

  const analyze = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (WORKER_URL) {
        // ── Real call via Cloudflare Worker ───────────────────────────────
        const response = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: trimmed }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(
            (body as { error?: string }).error ||
              `Worker returned status ${response.status}`
          );
        }

        const data = await response.json();
        setResult(data as AnalysisResult);
        setIsLive(true);
      } else {
        // ── Mock fallback ─────────────────────────────────────────────────
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 600));
        setResult(getMockResult(trimmed));
        setIsLive(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [text]);

  return (
    <div className="my-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl" aria-hidden="true">🧪</span>
        <h3 className="text-lg font-bold text-[var(--text)] m-0">
          DeepSeek Research Lens
        </h3>
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-bright bg-primary/10 px-2 py-0.5 rounded">
          {WORKER_URL ? 'LIVE · DeepSeek' : 'DEMO · mock data'}
        </span>
      </div>
      <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
        Paste any text below — a Reddit comment, a product review, a support
        ticket, or a paragraph from this article — and get AI-powered analysis
        of pain points, missing features, and actionable insights.
      </p>

      {/* Input area */}
      <div className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
              analyze();
            }
          }}
          placeholder="Paste any text you want to analyze..."
          rows={5}
          className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] resize-y min-h-[120px] font-sans transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          disabled={loading}
        />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs text-[var(--text-dim)]">
            {text.length > 0
              ? `${text.length} character${text.length === 1 ? '' : 's'}`
              : 'Ctrl + Enter to submit'}
          </span>
          <button
            onClick={analyze}
            disabled={loading || !text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary-bright hover:translate-y-[-1px] hover:shadow-lg hover:shadow-primary/20"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing…
              </>
            ) : (
              <>
                Analyze with DeepSeek
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-5 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          <span className="font-semibold">Error: </span>
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !result && (
        <div className="mt-6 space-y-4 animate-pulse">
          <div className="h-4 bg-[var(--surface-2)] rounded w-3/4" />
          <div className="h-4 bg-[var(--surface-2)] rounded w-1/2" />
          <div className="h-4 bg-[var(--surface-2)] rounded w-5/6" />
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-6">
          {/* Summary */}
          <div className="p-4 md:p-5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
            <div className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-[0.08em] mb-2 font-mono">
              Summary
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed m-0">
              {result.summary}
            </p>
          </div>

          {/* Pain Points */}
          <div>
            <div className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-[0.08em] mb-3 font-mono">
              Pain Points Identified
            </div>
            <ul className="list-none p-0 m-0 space-y-2">
              {result.painPoints.map((pain, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm"
                >
                  <span className="font-mono text-[11px] text-primary-bright mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[var(--text)]">{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div>
            <div className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-[0.08em] mb-3 font-mono">
              Actionable Suggestions
            </div>
            <ul className="list-none p-0 m-0 space-y-2">
              {result.suggestions.map((suggestion, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm"
                >
                  <span className="text-primary-bright mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                  <span className="text-[var(--text)]">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Status indicator */}
          {!isLive && (
            <p className="text-[11px] text-[var(--text-dim)] italic text-center pt-2">
              ⚠️ Mock data — deploy the Cloudflare Worker (workers/deepseek-proxy/)
              and set NEXT_PUBLIC_DEEPSEEK_WORKER_URL to enable live DeepSeek analysis.
            </p>
          )}
          {isLive && (
            <p className="text-[11px] text-[var(--text-dim)] text-center pt-2">
              Powered by DeepSeek via Cloudflare Workers
            </p>
          )}
        </div>
      )}
    </div>
  );
}
