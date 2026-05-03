import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroCanvas } from '../components/HeroCanvas';

export const metadata: Metadata = {
  title: 'Work — TechAdyant Labs · Selected live products',
  description:
    'Sample products and case studies from TechAdyant Labs. AI agents, web apps, and modern serverless e-commerce sites.',
};

const WORK_ITEMS = [
  {
    project: 'ridge-rowan',
    kind: 'Web & Commerce',
    name: 'Ridge & Rowan Dental',
    tag: 'Building',
    tagClass: 'work-tag coming',
    desc: 'Boutique dental practice — bookings, services, reviews, static build on Astro for zero-latency load times.',
    stack: ['Astro', 'Cloudflare Pages', 'Cal.com'],
  },
  {
    project: 'kindling',
    kind: 'Web & Commerce + Agent',
    name: 'Kindling Candle Co.',
    tag: '+ Agent',
    tagClass: 'work-tag agent',
    desc: 'WooCommerce D2C store powered by an AI support-triage agent handling returns and order lookups autonomously.',
    stack: ['WooCommerce', 'LangGraph', 'Anthropic', 'n8n'],
  },
  {
    project: 'orbitflow',
    kind: 'Product + Multi-agent',
    name: 'Orbitflow',
    tag: 'Agentic MVP',
    tagClass: 'work-tag agent',
    desc: 'Async standup tool with a multi-agent layer that summarizes daily updates, flags blockers, and nudges teammates implicitly.',
    stack: ['Next.js', 'Supabase', 'LangGraph', 'OpenAI'],
  },
  {
    project: 'cartographer',
    kind: 'Product Engineering',
    name: 'Cartographer',
    tag: null,
    tagClass: '',
    desc: 'A complex geospatial dashboard parsing large datasets with a highly optimized React frontend and edge API.',
    stack: ['Next.js', 'Neon', 'Vercel', 'Tailwind'],
  },
  {
    project: 'noctua',
    kind: 'AI Agents & Automation',
    name: 'Noctua',
    tag: 'Agentic Feature',
    tagClass: 'work-tag agent',
    desc: 'A background research agent reading, archiving, and synthesizing long-form articles via headless browser tools and RAG.',
    stack: ['LangGraph', 'pgvector', 'Supabase', 'OpenAI'],
  },
];

export default function WorkPage() {
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
            <span className="hero-eyebrow-text">Proof of Work · Deployed Live</span>
            <div className="hero-eyebrow-dot" />
          </div>
          <h1 className="hero-main-title">
            Real products. <span className="accent">Real impact.</span> Explore our latest active deployments.
          </h1>
          <p className="hero-description">
            Five sample products covering both ends of the barbell — from fast Astro marketing sites and WooCommerce, to complex multi-agent workflows. Every project linked below is a real deployment you can explore.
          </p>
          <div className="hero-actions-container">
            <button className="hero-btn-primary" data-open-modal="contact">
              Commission your project <span className="hero-btn-arrow">→</span>
            </button>
            <Link href="/services" className="hero-btn-secondary">
              View practices <span className="hero-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Work grid ── */}
      <section>
        <div className="wrap">
          <div className="work-grid">
            {WORK_ITEMS.map((w) => (
              <div key={w.project} className="work">
                <div className="work-visual" data-project={w.project}><div className="wv-inner" /></div>
                <div className="work-body">
                  <div className="work-kind">{w.kind}</div>
                  <div className="work-name">
                    {w.name}
                    {w.tag && <span className={w.tagClass}>{w.tag}</span>}
                  </div>
                  <div className="work-desc">{w.desc}</div>
                  <div className="work-stack">
                    {w.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}

            <button
              className="work"
              data-open-modal="contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg,rgba(99,102,241,0.10),rgba(245,181,68,0.04))',
                border: '1px dashed var(--border-strong)',
                cursor: 'pointer',
              }}
            >
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-jetbrains, monospace)', fontSize: '11px', color: 'var(--primary-bright)', letterSpacing: '.18em', marginBottom: '10px' }}>COMMISSION US</div>
                <div style={{ fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>Your project next</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Take the 30-min intake call</div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
