import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroCanvas } from './components/HeroCanvas';

export const metadata: Metadata = {
  title: 'TechAdyant Labs — Agentic software studio · WordPress, Serverless, AI Agents',
  description:
    'TechAdyant Labs builds and runs the agent layer of your business — on modern serverless. WordPress, Cloudflare, Vercel, Supabase, Neon, LangGraph, n8n. Principal-led studio, Delhi, India.',
};

const STACK_CHIPS = [
  { label: 'Next.js' },
  { label: 'TypeScript' },
  { label: 'Tailwind' },
  { label: 'Cloudflare Pages' },
  { label: 'Vercel' },
  { label: 'Supabase' },
  { label: 'Neon' },
  { label: 'WordPress' },
  { label: 'WooCommerce' },
  { label: 'LangGraph', hot: true },
  { label: 'n8n', hot: true },
  { label: 'OpenAI', hot: true },
  { label: 'Anthropic', hot: true },
  { label: 'Stripe' },
  { label: 'Resend' },
];

const PRACTICES = [
  {
    num: '01',
    title: 'Web & Commerce',
    body: 'WordPress, WooCommerce, custom plugins, migrations, Core Web Vitals, security hardening. Static marketing sites on Cloudflare Pages when you want speed, not WP.',
    stack: ['WordPress', 'WooCommerce', 'Next.js', 'Astro', 'Cloudflare'],
    budget: 'From $149 · Patches in 48h',
    href: '/services',
  },
  {
    num: '02',
    title: 'Product Engineering',
    body: 'Serverless web apps done right. Dashboards, admin panels, internal tools, SaaS MVPs with auth, billing, data. Typescript-first, edge-deployed, observability baked in.',
    stack: ['Next.js 14+', 'Supabase', 'Neon', 'Stripe', 'Vercel'],
    budget: 'From $1,999 · 2–5 weeks',
    href: '/services',
  },
  {
    num: '03',
    title: 'AI Agents & Automation',
    hero: true,
    body: 'Agentic workflows that actually run your business. Support triage, lead qualification, invoice processing, content ops. RAG, tool-calling, guardrails, evals, observability.',
    stack: ['LangGraph', 'CrewAI', 'n8n', 'OpenAI', 'Anthropic', 'pgvector'],
    budget: 'From $1,499 · Starter in 2 weeks',
    href: '/services',
  },
  {
    num: '04',
    title: 'Ongoing Partnership',
    body: 'Care, Growth, Agent Ops, Partner retainers. The recurring-revenue engine — especially Agent Ops, which keeps your live agents tuned as foundation models drift.',
    stack: ['Care', 'Growth', 'Agent Ops', 'Partner', 'Fractional CTO'],
    budget: 'From $99/mo · Month-to-month',
    href: '/services',
  },
];

const WORK_ITEMS = [
  {
    project: 'ridge-rowan',
    kind: 'Web & Commerce',
    name: 'Ridge & Rowan Dental',
    tag: 'Building',
    tagClass: 'work-tag coming',
    desc: 'Boutique dental practice — bookings, services, reviews, static build on Astro.',
    stack: ['Astro', 'Cloudflare Pages', 'Cal.com'],
    href: '/work',
  },
  {
    project: 'kindling',
    kind: 'Web & Commerce + Agent',
    name: 'Kindling Candle Co.',
    tag: '+ Agent',
    tagClass: 'work-tag agent',
    desc: 'WooCommerce D2C store with an AI support-triage agent handling returns and order lookups.',
    stack: ['WooCommerce', 'LangGraph', 'Anthropic', 'n8n'],
    href: '/work',
  },
  {
    project: 'orbitflow',
    kind: 'Product + Multi-agent',
    name: 'Orbitflow',
    tag: 'Agentic MVP',
    tagClass: 'work-tag agent',
    desc: 'Async standup tool with a multi-agent layer that summarizes, flags blockers, and nudges teammates.',
    stack: ['Next.js', 'Supabase', 'LangGraph', 'OpenAI'],
    href: '/work',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section">
        <HeroCanvas />
        <div className="vignette" />
        <div className="scanlines" />

        <div className="hero-corner hero-c-tl">
          <svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg>
        </div>
        <div className="hero-corner hero-c-tr">
          <svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg>
        </div>
        <div className="hero-corner hero-c-bl">
          <svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg>
        </div>
        <div className="hero-corner hero-c-br">
          <svg viewBox="0 0 24 24" fill="none"><path d="M0 24 L0 0 L24 0" stroke="#e8c96d" strokeWidth="1.5" opacity="0.5"/></svg>
        </div>

        <div className="hero-inner-content">
          <div className="hero-eyebrow-container">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Agentic software studio · Booking May 2026</span>
            <div className="hero-eyebrow-dot" />
          </div>

          <h1 className="hero-main-title">
            Building the <span className="accent">agent layer</span> of your business on modern serverless architecture.
          </h1>

          <p className="hero-description">
            TechAdyant Labs builds and runs the agent layer of your business. Principal-led studio for WordPress, product engineering on Cloudflare, Vercel, Supabase and Neon, and AI agents that actually ship to production.
          </p>

          <div className="hero-actions-container">
            <Link href="/contact" className="hero-btn-primary">
              Book an intake call <span className="hero-btn-arrow">→</span>
            </Link>
            <Link href="/services" className="hero-btn-secondary">
              Explore capabilities <span className="hero-btn-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <div className="hero-stat-num">15+</div>
            <div className="hero-stat-label">Years Experience</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <div className="hero-stat-num">AI Agents</div>
            <div className="hero-stat-label">Production Ready</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <div className="hero-stat-num">50+</div>
            <div className="hero-stat-label">Systems Deployed</div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── Stack chips ── */}
      <div className="stack">
        <div className="wrap stack-inner">
          {STACK_CHIPS.map((c) => (
            <span key={c.label} className={`chip${c.hot ? ' hot' : ''}`}>{c.label}</span>
          ))}
        </div>
      </div>

      {/* ── Practices ── */}
      <section id="practices">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Four practices</div>
            <h2 className="sec-title">From a 48-hour plugin patch to a multi-agent product in production.</h2>
            <p className="sec-sub">
              We deliberately work both ends of the barbell: fast commodity builds that win reviews and feed the funnel, and premium agentic engineering where margin and defensibility actually live.
            </p>
          </div>

          <div className="practices">
            {PRACTICES.map((p) => (
              <Link key={p.num} className="prac" href={p.href}>
                <div className="prac-num">{p.num} / PRACTICE</div>
                <div className="prac-title">
                  {p.title}
                  {p.hero && <span className="tag hero-tag">Hero</span>}
                </div>
                <div className="prac-body">{p.body}</div>
                <div className="prac-list">
                  {p.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
                <div className="prac-foot">
                  <span className="prac-budget">{p.budget}</span>
                  <span className="prac-link">Deep dive →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="sec-cta-row">
            <Link href="/services" className="btn-ghost">See full capabilities →</Link>
          </div>
        </div>
      </section>

      {/* ── Work preview ── */}
      <section id="work-preview" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Selected work</div>
            <h2 className="sec-title">Live products we build and ship.</h2>
            <p className="sec-sub">
              Five sample products on Cloudflare Pages covering the barbell — fast commodity commerce, polished product work, and agent-powered systems. Every link below is a real deployment.
            </p>
          </div>

          <div className="work-grid">
            {WORK_ITEMS.map((w) => (
              <Link key={w.project} className="work" href={w.href}>
                <div className="work-visual" data-project={w.project}><div className="wv-inner" /></div>
                <div className="work-body">
                  <div className="work-kind">{w.kind}</div>
                  <div className="work-name">
                    {w.name} <span className={w.tagClass}>{w.tag}</span>
                  </div>
                  <div className="work-desc">{w.desc}</div>
                  <div className="work-stack">
                    {w.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </Link>
            ))}

            <Link
              href="/work"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg,rgba(99,102,241,0.10),rgba(245,181,68,0.04))',
                border: '1px dashed var(--border-strong)',
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-jetbrains, monospace)', fontSize: '11px', color: 'var(--primary-bright)', letterSpacing: '.18em', marginBottom: '10px' }}>2 MORE</div>
                <div style={{ fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>See all work</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Cartographer · Noctua · your project next</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing snapshot ── */}
      <section id="pricing-snapshot">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Pricing · snapshot</div>
            <h2 className="sec-title">Honest floors. AI-aware. Built for Upwork and direct work alike.</h2>
            <p className="sec-sub">
              Commodity builds priced to feed the funnel. Agent work priced for the value it delivers. Retainers priced to actually get renewed. Full rate card lives on the{' '}
              <Link href="/pricing" style={{ color: 'var(--primary-bright)' }}>Pricing page</Link>.
            </p>
          </div>

          <div className="price-wrap">
            <div className="price-col">
              <div className="price-col-title">Web &amp; Commerce <span className="tag">Volume</span></div>
              {[
                { name: 'Patch', price: 'from $149', meta: '48h', body: 'Small fix, speed audit, plugin tweak.' },
                { name: 'Launch Site', price: 'from $499', meta: '5–7 days', body: 'WordPress or static marketing site, 3–6 pages.' },
                { name: 'Commerce', price: 'from $1,299', meta: '2 weeks', body: 'WooCommerce or Shopify headless build.' },
              ].map((t) => (
                <div key={t.name} className="price-tier">
                  <div className="price-tier-head"><span className="price-tier-name">{t.name}</span><span className="price-tier-price">{t.price}</span></div>
                  <div className="price-tier-meta">{t.meta}</div>
                  <div className="price-tier-body">{t.body}</div>
                </div>
              ))}
            </div>

            <div className="price-col">
              <div className="price-col-title">Product Engineering <span className="tag">Mid</span></div>
              {[
                { name: 'App Sprint', price: 'from $1,999', meta: '2 weeks', body: 'Internal tool, dashboard, or tight MVP.' },
                { name: 'Product Build', price: 'from $3,999', meta: '3–5 weeks', body: 'Auth, billing, data, production-grade.' },
              ].map((t) => (
                <div key={t.name} className="price-tier">
                  <div className="price-tier-head"><span className="price-tier-name">{t.name}</span><span className="price-tier-price">{t.price}</span></div>
                  <div className="price-tier-meta">{t.meta}</div>
                  <div className="price-tier-body">{t.body}</div>
                </div>
              ))}
            </div>

            <div className="price-col hero">
              <div className="price-col-title">AI Agents &amp; Automation <span className="tag hero-tag">Hero</span></div>
              {[
                { name: 'Agent Starter', price: 'from $1,499', meta: '1–2 weeks', body: 'One workflow automated end-to-end, monitored.' },
                { name: 'Agentic Feature', price: 'from $3,999', meta: '2–3 weeks', body: 'RAG + tool-calling into existing app, with evals.' },
                { name: 'Agentic MVP', price: 'from $7,999', meta: '4–6 weeks', body: 'Full multi-agent product with observability.' },
              ].map((t) => (
                <div key={t.name} className="price-tier">
                  <div className="price-tier-head"><span className="price-tier-name">{t.name}</span><span className="price-tier-price">{t.price}</span></div>
                  <div className="price-tier-meta">{t.meta}</div>
                  <div className="price-tier-body">{t.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sec-cta-row">
            <Link href="/pricing" className="btn-ghost">Full pricing page →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section id="cta">
        <div className="wrap">
          <div className="cta-band">
            <h2>Ready to ship the agent layer of your business?</h2>
            <p>A 30-minute intake call is free. You leave with a written scope, a fixed price, and a timeline — or an honest "we're not the right shop for this" and a referral.</p>
            <div className="cta-actions">
              <button className="btn-primary" data-open-modal="contact">Book an intake call</button>
              <Link href="/services" className="btn-ghost">See full capabilities</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
