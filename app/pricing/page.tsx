import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroCanvas } from '../components/HeroCanvas';

export const metadata: Metadata = {
  title: 'Pricing — TechAdyant Labs · Barbell rates for 2026',
  description:
    'Full pricing for TechAdyant Labs — Web & Commerce, Product Engineering, AI Agents and retainers. Barbell strategy: commodity at the low end, premium agentic at the high end.',
};

const ADDONS = [
  { name: 'Landing page · $299',           body: 'Single-page conversion-tuned landing with analytics and A/B variant structure ready.' },
  { name: 'Conversion audit · $399',       body: 'Funnel walkthrough, copy review, CRO recommendations — ranked by estimated impact.' },
  { name: 'SEO audit · $499',              body: 'Technical SEO, content gaps, internal linking, Core Web Vitals, three competitor benchmarks.' },
  { name: 'Security audit · $599',         body: 'WP / Woo / app security review — plugin audit, user audit, WAF rules, hardening report.' },
  { name: 'Eval suite build-out · $799',   body: 'Golden dataset curation, LLM-as-judge scoring, regression harness, dashboards. For existing agents.' },
  { name: 'Fractional CTO day · $899/day', body: 'One day of deep engineering leadership — architecture, hiring, technical due diligence.' },
];

const PRINCIPLES = [
  { title: 'Ceilings, not estimates',        body: 'Every project quote is a ceiling. If we come in under, you pay less. If we go over, that\'s our problem, not yours.' },
  { title: 'No per-seat or per-user revenue share', body: 'Pricing is per project or per month. We don\'t take equity-lite cuts of your product.' },
  { title: 'Retainers are cancellable',      body: '30-day notice, no exit fee. If it\'s not earning its keep, we\'d rather hear that than keep quiet-billing.' },
  { title: 'USD default, INR equivalent',    body: 'We list USD because most of our inbound is global. India-based clients can pay INR at market rate.' },
  { title: 'Outcome-based when it fits',     body: 'For well-scoped agent work with a clear business metric, we\'re open to a base fee + outcome bonus. Ask.' },
  { title: 'Revised quarterly',              body: 'The AI market compresses and expands prices quarterly. We re-audit rates every three months. This page shows current.' },
];

export default function PricingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section">
        <HeroCanvas />
        <div className="vignette" /><div className="scanlines" />
        <div className="hero-corner hero-c-tl"><svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg></div>
        <div className="hero-corner hero-c-tr"><svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg></div>
        <div className="hero-corner hero-c-bl"><svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg></div>
        <div className="hero-corner hero-c-br"><svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg></div>
        <div className="hero-inner-content">
          <div className="hero-eyebrow-container">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Barbell 2026 · Transparent Pricing</span>
            <div className="hero-eyebrow-dot" />
          </div>
          <h1 className="hero-main-title">
            One honest <span className="accent">pricing page.</span> No mystery meat, ever.
          </h1>
          <p className="hero-description">
            Everything we sell, with ceilings in writing. Web &amp; Commerce at the low end because AI coding assistants compress margins. AI Agents priced where the moat is. Retainers that actually justify themselves.
          </p>
          <div className="hero-actions-container">
            <Link href="/contact" className="hero-btn-primary">Book an intake call <span className="hero-btn-arrow">→</span></Link>
            <Link href="/services" className="hero-btn-secondary">Explore practices <span className="hero-btn-arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── Practice 01 ── */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Practice 01 · Web &amp; Commerce</div>
            <h2 className="sec-title">WordPress, Woo, static sites — priced for volume.</h2>
            <p className="sec-sub">Commodity tier on purpose. Tight scope, fast turn, predictable outcomes. Most engagements ship in under two weeks.</p>
          </div>
          <div className="price-wrap">
            <div className="price-col">
              <div className="price-col-title">Patch &amp; Fix</div>
              <div className="price-tier">
                <div className="price-tier-head"><span className="price-tier-name">Single-issue fix</span><span className="price-tier-price">from $149</span></div>
                <div className="price-tier-meta">2–3 days</div>
                <div className="price-tier-body">Plugin conflict, broken checkout, CWV red flag, a security finding. Scoped in 15 minutes.</div>
              </div>
            </div>
            <div className="price-col hero">
              <div className="price-col-title">Site Build <span className="tag hero-tag">Most booked</span></div>
              <div className="price-tier">
                <div className="price-tier-head"><span className="price-tier-name">Marketing Site</span><span className="price-tier-price">from $499</span></div>
                <div className="price-tier-meta">7–10 days · up to 8 pages</div>
                <div className="price-tier-body">WP block theme or Astro on Cloudflare Pages, responsive, accessible, CWV-tuned, analytics + email deliverability.</div>
              </div>
              <div className="price-tier">
                <div className="price-tier-head"><span className="price-tier-name">Migration</span><span className="price-tier-price">from $799</span></div>
                <div className="price-tier-meta">5–10 days · no SEO loss</div>
                <div className="price-tier-body">Content audit, redirect map, image migration, DNS cutover, 14 days of post-launch GSC monitoring.</div>
              </div>
            </div>
            <div className="price-col">
              <div className="price-col-title">Commerce</div>
              <div className="price-tier">
                <div className="price-tier-head"><span className="price-tier-name">Commerce Store</span><span className="price-tier-price">from $1,299</span></div>
                <div className="price-tier-meta">2–3 weeks · up to 50 SKUs</div>
                <div className="price-tier-body">Full Woo or headless store. Payments, tax, shipping, order emails, abandoned cart.</div>
              </div>
              <div className="price-tier">
                <div className="price-tier-head"><span className="price-tier-name">Custom Plugin</span><span className="price-tier-price">from $699</span></div>
                <div className="price-tier-meta">1–2 weeks · your spec</div>
                <div className="price-tier-body">Small-to-medium WP plugin or Gutenberg block, clean PHP, documented.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice 02 ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Practice 02 · Product Engineering</div>
            <h2 className="sec-title">Serverless apps — priced honestly for the mid-tier.</h2>
            <p className="sec-sub">TypeScript, Next.js, Supabase or Neon, Stripe, Vercel or Cloudflare. Dashboards, internal tools, SaaS MVPs with users and a database.</p>
          </div>
          <div className="price-wrap" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            <div className="price-col">
              <div className="price-col-title">App Sprint</div>
              <div className="price-tier">
                <div className="price-tier-head"><span className="price-tier-name">App Sprint</span><span className="price-tier-price">from $1,999</span></div>
                <div className="price-tier-meta">~2 weeks · single-purpose</div>
                <div className="price-tier-body">One app, one database. Auth, 3–5 screens, 1–2 integrations. Internal tools, dashboards, thin SaaS.</div>
              </div>
            </div>
            <div className="price-col hero">
              <div className="price-col-title">Product Build <span className="tag hero-tag">SaaS MVP</span></div>
              <div className="price-tier">
                <div className="price-tier-head"><span className="price-tier-name">Product Build</span><span className="price-tier-price">from $3,999</span></div>
                <div className="price-tier-meta">4–6 weeks · multi-tenant</div>
                <div className="price-tier-body">Full SaaS MVP — auth, Stripe subs, admin console, email, onboarding, 8–12 screens, Sentry + PostHog wired.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice 03 ── */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Practice 03 · AI Agents &amp; Automation <span className="tag hero-tag">Hero</span></div>
            <h2 className="sec-title">Agents priced at the high end of the barbell.</h2>
            <p className="sec-sub">
              This is where margin, defensibility and repeat business concentrate. Production launches always pair with an{' '}
              <Link href="/pricing#retainers" style={{ color: 'var(--primary-bright)' }}>Agent Ops retainer</Link>
              {' '}— agents without operations degrade in weeks.
            </p>
          </div>
          <div className="price-wrap" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            {[
              { col: '', title: 'Agent Starter', tag: 'Pilot', name: 'Agent Starter', price: 'from $1,499', meta: '~1 week · scoped pilot', body: 'Single-purpose agent. One data source, 1–2 tools, basic evals, LangSmith traces, deployed. Proves the shape works.' },
              { col: 'hero', title: 'Agentic Feature', tag: 'Popular', tagHero: true, name: 'Agentic Feature', price: 'from $3,999', meta: '2–3 weeks · production-grade', body: 'Production agent in your product or ops. RAG, tool-calling, human-in-the-loop, evals, observability, cost controls, 30-day tuning window.' },
              { col: 'hero', title: 'Agentic MVP', tag: 'Hero', tagHero: true, name: 'Agentic MVP', price: 'from $7,999', meta: '4–6 weeks · multi-agent', body: 'Multi-agent workflow with UI, auth, billing stub, admin console, approval queues. Full observability and rollback.' },
              { col: '', title: 'Vertical Agent', tag: '', name: 'Vertical Agent', price: 'from $12,999', meta: '8–12 weeks · deep domain', body: 'Industry-specific agent (legal intake, medical coding, procurement). Custom taxonomy, domain evals, compliance-aware guardrails.' },
            ].map((t) => (
              <div key={t.name} className={`price-col${t.col === 'hero' ? ' hero' : ''}`}>
                <div className="price-col-title">
                  {t.title}
                  {t.tag && <span className={`tag${t.tagHero ? ' hero-tag' : ''}`}>{t.tag}</span>}
                </div>
                <div className="price-tier">
                  <div className="price-tier-head"><span className="price-tier-name">{t.name}</span><span className="price-tier-price">{t.price}</span></div>
                  <div className="price-tier-meta">{t.meta}</div>
                  <div className="price-tier-body">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practice 04 — Retainers ── */}
      <section id="retainers" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Practice 04 · Ongoing Partnership</div>
            <h2 className="sec-title">Four retainers. Month-to-month. No lock-in.</h2>
            <p className="sec-sub">Projects pay bills; retainers build the studio. Agent Ops is where the real defensibility lives — keeping live agents tuned as models drift.</p>
          </div>
          <div className="retainers">
            <div className="retainer-grid">
              {[
                { name: 'Care',       price: '$99 / mo',    body: 'Backups, updates, uptime monitoring, small fixes. 2h bank · 48h SLA.' },
                { name: 'Growth',     price: '$299 / mo',   body: 'Care + monthly CWV/SEO pass, content updates, small features, A/B experiments. 6h bank · 24h SLA.' },
                { name: 'Agent Ops',  price: '$599 / mo',   body: 'Eval runs, drift alerts, prompt tuning, cost control, guardrail updates, model migrations. 8h bank · 24h SLA.', badge: 'Moat' },
                { name: 'Partner',    price: '$1,499 / mo', body: 'Fractional principal engineer + agent lead. Roadmap, architecture, on-call. 20h bank · 4h SLA.' },
              ].map((r) => (
                <div key={r.name} className="retainer">
                  <div className="retainer-name">
                    {r.name}
                    {r.badge && <span className="agent-badge">{r.badge}</span>}
                  </div>
                  <div className="retainer-price">{r.price}</div>
                  <div className="retainer-body">{r.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Add-ons ── */}
      <section>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Add-ons</div>
            <h2 className="sec-title">Small things that plug into any tier.</h2>
            <p className="sec-sub">Priced individually because not every project needs them, and we&apos;d rather itemize than bury them in an inflated base rate.</p>
          </div>
          <ul className="delivs">
            {ADDONS.map((a) => (
              <li key={a.name}><div><strong>{a.name}</strong><span>{a.body}</span></div></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pricing principles ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Our pricing principles</div>
            <h2 className="sec-title">How we think about what things cost.</h2>
          </div>
          <ul className="delivs">
            {PRINCIPLES.map((p) => (
              <li key={p.title}><div><strong>{p.title}</strong><span>{p.body}</span></div></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <div className="wrap">
          <div className="cta-band">
            <h2>See a tier that fits? Or not sure?</h2>
            <p>Either way, the next step is a 30-minute intake call. We&apos;ll recommend the right shape — or tell you we&apos;re not the right shop.</p>
            <div className="cta-actions">
              <button className="btn-primary" data-open-modal="contact">Book an intake call</button>
              <Link href="/services" className="btn-ghost">Explore the four practices</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
