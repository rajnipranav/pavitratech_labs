/**
 * POST /api/contact
 *
 * Cloudflare Pages Function for labs.techadyant.com
 * Receives a contact-form submission, verifies Cloudflare Turnstile,
 * then dispatches an email via Resend. Returns JSON.
 *
 * Required environment variables (set in Cloudflare Pages → Settings → Environment variables):
 *
 *   RESEND_API_KEY        Secret. Get from https://resend.com/api-keys
 *   TURNSTILE_SECRET_KEY  Secret. Get from Cloudflare → Turnstile → your site → Settings
 *   FROM_EMAIL            Plain text. Must be on a domain you've verified on Resend.
 *                         For labs.techadyant.com: "TechPavitra Labs <labs@techadyant.com>"
 *   INBOX_LABS            Plain text. e.g. labs@techadyant.com
 *
 * Bound to the same project as the static site, so it lives at /api/contact
 * with no extra routing config.
 */

const ALLOWED_DESKS = {
  web:        { label: "Web & Commerce",                  envKey: "INBOX_LABS" },
  product:    { label: "Product Engineering",             envKey: "INBOX_LABS" },
  ai:         { label: "AI Agents & Automation",          envKey: "INBOX_LABS" },
  partnership: { label: "Ongoing Partnership",            envKey: "INBOX_LABS" },
  general:    { label: "General enquiry",                 envKey: "INBOX_LABS" },
};

const MAX_LEN = {
  name: 120,
  email: 200,
  company: 200,
  message: 5000,
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token, secret, ip) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = await res.json();
  return Boolean(data && data.success);
}

async function sendEmail(env, { to, replyTo, subject, html, text }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend error ${res.status}: ${errText}`);
  }
  return res.json();
}

export async function onRequestPost({ request, env }) {
  // Parse + sanity-check input
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Malformed request body." }, 400);
  }

  const name         = String(payload.name         || "").trim().slice(0, MAX_LEN.name);
  const email        = String(payload.email        || "").trim().slice(0, MAX_LEN.email);
  const company      = String(payload.company      || "").trim().slice(0, MAX_LEN.company);
  const message      = String(payload.message      || "").trim().slice(0, MAX_LEN.message);
  const practice     = String(payload.practice     || "general").trim().toLowerCase();
  const budget       = String(payload.budget       || "").trim();
  const turnstile    = String(payload.turnstileToken || "").trim();
  const honeypot     = String(payload.website      || "").trim();   // Bot trap

  // Honeypot — if a bot filled the hidden field, silently 200 (don't tip them off)
  if (honeypot) return json({ ok: true });

  // Required field validation
  if (!name)    return json({ ok: false, error: "Please share your name." }, 400);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                return json({ ok: false, error: "Please share a valid email." }, 400);
  if (!message) return json({ ok: false, error: "Please include a short message." }, 400);
  if (message.length < 20)
                return json({ ok: false, error: "Please include a few sentences so we can route it correctly." }, 400);

  const desk = ALLOWED_DESKS[practice] || ALLOWED_DESKS.general;

  // Turnstile check (skip only if explicitly disabled in dev)
  if (env.TURNSTILE_SECRET_KEY) {
    if (!turnstile) {
      return json({ ok: false, error: "Please complete the security check." }, 400);
    }
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const ok = await verifyTurnstile(turnstile, env.TURNSTILE_SECRET_KEY, ip);
    if (!ok) {
      return json({ ok: false, error: "Security check failed. Please retry." }, 400);
    }
  }

  // Resolve destination inbox
  const to = env[desk.envKey] || env.INBOX_LABS;
  if (!to) {
    return json({ ok: false, error: "Server misconfigured: no inbox is set." }, 500);
  }

  // Compose the email
  const subject = `New intake · ${name}${company ? " · " + company : ""}`;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Inter,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1a2a30;">
      <h2 style="margin:0 0 4px;color:#083b46;">New intake form submission</h2>
      <p style="margin:0 0 24px;color:#5b6e75;font-size:14px;">Submitted via labs.techadyant.com</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#5b6e75;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#5b6e75;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#083b46;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#5b6e75;">Company</td><td style="padding:8px 0;">${escapeHtml(company || "—")}</td></tr>
        <tr><td style="padding:8px 0;color:#5b6e75;">Practice</td><td style="padding:8px 0;">${escapeHtml(desk.label)}</td></tr>
        <tr><td style="padding:8px 0;color:#5b6e75;">Budget</td><td style="padding:8px 0;">${escapeHtml(budget || "—")}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
      <h3 style="margin:0 0 12px;color:#083b46;font-size:15px;">Message</h3>
      <div style="white-space:pre-wrap;line-height:1.55;font-size:14px;color:#1a2a30;">${escapeHtml(message)}</div>
    </div>
  `;

  const text = [
    `New intake form submission`,
    `Submitted via labs.techadyant.com`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Company: ${company || "—"}`,
    `Practice: ${desk.label}`,
    `Budget:  ${budget || "—"}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  try {
    await sendEmail(env, {
      to,
      replyTo: email,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error("Send failed:", err);
    return json({ ok: false, error: "We couldn't send your message just now. Please email us directly." }, 502);
  }

  return json({ ok: true });
}

// Any non-POST method gets 405. Pages routes to method-specific handlers
// first, so this only runs for GET/PUT/DELETE/etc.
export async function onRequest() {
  return json({ ok: false, error: "Method not allowed." }, 405);
}
