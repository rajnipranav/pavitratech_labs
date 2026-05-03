import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroCanvas } from '../components/HeroCanvas';

export const metadata: Metadata = {
  title: 'Services — TechAdyant Labs · WordPress, Serverless, AI Agents',
  description:
    'Four practices at TechAdyant Labs: Web & Commerce, Product Engineering, AI Agents & Automation, and Ongoing Partnership. Freelance-friendly rates, retainer-first operations.',
};

const PRACTICES = [
  {
    num: '01',
    title: 'Web & Commerce',
    body: 'WordPress and WooCommerce with real engineering craft. Custom plugins, headless builds, migrations, Core Web Vitals, security hardening, static marketing sites on Cloudflare Pages. Priced for volume, turned fast.',
    stack: ['WordPress', 'WooCommerce', 'PHP', 'Next.js', 'Astro', 'Cloudflare'],
    budget: 'Patch $149 · Site $499 · Commerce $1,299',
  },
  {
    num: '02',
    title: 'Product Engineering',
    body: 'Serverless web apps — dashboards, admin panels, internal tools, SaaS MVPs with authentication, billing and data. Typescript-first, edge-deployed, observability baked in. Honest mid-tier pricing for honest work.',
    stack: ['Next.js 14+', 'TypeScript', 'Supabase', 'Neon', 'Stripe', 'Vercel', 'shadcn/ui'],
    budget: 'App Sprint $1,999 · Product Build $3,999',
  },
  {
    num: '03',
    title: 'AI Agents & Automation',
    hero: true,
    body: 'Agentic workflows that actually run your business — support triage, lead qualification, invoice processing, content ops, e-commerce personalization. RAG pipelines, tool-calling, human-in-the-loop guardrails, evals, observability. This is where we concentrate the next three years.',
    stack: ['LangGraph', 'CrewAI', 'AutoGen', 'n8n', 'OpenAI', 'Anthropic', 'pgvector', 'LangSmith'],
    budget: 'Starter $1,499 · Feature $3,999 · MVP $7,999',
  },
  {
    num: '04',
    title: 'Ongoing Partnership',
    body: 'Care, Growth, Agent Ops and Partner retainers. The real moat — especially Agent Ops, which keeps your live agents tuned as foundation models drift, token costs shift and guardrails need updating. Month-to-month, cancel anytime.',
    stack: ['Care', 'Growth', 'Agent Ops', 'Partner', 'Fractional CTO'],
    budget: 'Care $99/mo · Agent Ops $599/mo · Partner $1,499/mo',
  },
];

const MOAT = [
  { title: 'Messy real-world integrations',  body: 'CRMs, ERPs, banking APIs, government portals, WooCommerce plugin ecosystems — poorly documented and inconsistently behaved.' },
  { title: 'Reliability & governance',        body: 'Security, compliance, human-in-the-loop safeguards that stop agents making expensive mistakes in production.' },
  { title: 'Strategic design',                body: 'Translating vague business goals into robust agent workflows with clear inputs, outputs and failure modes.' },
  { title: 'Domain judgment',                 body: 'Knowing which 80% of the work an agent should handle and which 20% must stay human — that line moves by industry.' },
  { title: 'Ongoing operations',              body: 'Evals, drift monitoring, token-cost control, guardrail maintenance, model-migration as foundation models keep changing.' },
];

export default function ServicesPage() {
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
            <span className="hero-eyebrow-text">Four Practices · One Barbell</span>
            <div className="hero-eyebrow-dot" />
          </div>
          <h1 className="hero-main-title">
            Four practices. <span className="accent">One strategy.</span> Delivering production grade software solutions.
          </h1>
          <p className="hero-description">
            We work both ends of the market deliberately. Commodity tier at the low end — fast, cheap, reliable. Premium agentic engineering at the high end — where margin and defensibility concentrate in 2026.
          </p>
          <div className="hero-actions-container">
            <button className="hero-btn-primary" data-open-modal="contact">
              Book an intake call <span className="hero-btn-arrow">→</span>
            </button>
            <Link href="/pricing" className="hero-btn-secondary">
              See pricing <span className="hero-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Practice cards ── */}
      <section>
        <div className="wrap">
          <div className="practices">
            {PRACTICES.map((p) => (
              <div key={p.num} className="prac">
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
                  <button className="prac-link" data-open-modal="contact" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--primary-bright)', font: 'inherit' }}>
                    Enquire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The moat ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">The moat</div>
            <h2 className="sec-title">What AI coding assistants still can&apos;t do — and what we sell.</h2>
            <p className="sec-sub">
              Pricing premium tiers at premium rates is only credible if we can articulate why the work is not commodity. These five areas are genuinely hard, and clients pay for the judgment.
            </p>
          </div>
          <ul className="delivs">
            {MOAT.map((m) => (
              <li key={m.title}>
                <div>
                  <strong>{m.title}</strong>
                  <span>{m.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <div className="wrap">
          <div className="cta-band">
            <h2>Not sure which practice fits?</h2>
            <p>Tell us the problem, not the solution. We&apos;ll recommend the right tier — or tell you we&apos;re not the right shop for this.</p>
            <div className="cta-actions">
              <button className="btn-primary" data-open-modal="contact">Book a 30-min intake call</button>
              <Link href="/pricing" className="btn-ghost">See full pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
