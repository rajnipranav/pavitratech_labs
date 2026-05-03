import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroCanvas } from '../components/HeroCanvas';

export const metadata: Metadata = {
  title: 'Contact — TechAdyant Labs · Book a 30-minute intake call',
  description:
    'Book an intake call with TechAdyant Labs. Fill the form or email labs@techadyant.com. 30-minute scoping, no sales motion, principal-led.',
};

const FAQ = [
  {
    q: 'Do I need to have a spec ready?',
    a: 'No. Most clients don\'t. Describe the problem in plain English — we\'ll shape it into a spec within 48 hours of the call.',
  },
  {
    q: 'Is the 30-minute call really free?',
    a: 'Yes. Intake is always free. We\'d rather spend 30 minutes confirming fit than sell you a misfit project.',
  },
  {
    q: 'Can we sign an NDA first?',
    a: 'Happy to. Standard mutual NDA, we\'ll send one within a day of you asking. For deeper due-diligence needs we also carry liability insurance — ask.',
  },
  {
    q: 'What if my budget is small?',
    a: 'We have a $149 Patch & Fix for a reason. If your budget is below that, we\'ll probably point you to a DIY path and tell you what to watch for.',
  },
  {
    q: 'Which time zones do you cover?',
    a: 'IST (GMT+5:30). That overlaps well with UK mornings, European mid-days, US afternoons and AU early days. For pure US-west-coast clients we schedule late evenings IST.',
  },
];

export default function ContactPage() {
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
            <span className="hero-eyebrow-text">Booking from May 2026 · Global Response</span>
            <div className="hero-eyebrow-dot" />
          </div>
          <h1 className="hero-main-title">
            Tell us the <span className="accent">problem.</span> We&apos;ll tell you the shape of the solution.
          </h1>
          <p className="hero-description">
            Fill the form and it&apos;ll land in Rajni&apos;s inbox. Or email{' '}
            <a href="mailto:labs@techadyant.com" style={{ color: 'var(--gold)' }}>labs@techadyant.com</a>{' '}
            directly. Either way you&apos;ll hear back within a business day, usually sooner.
          </p>
          <div className="hero-actions-container">
            <button className="hero-btn-primary" data-open-modal="contact">
              Fill intake form <span className="hero-btn-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Intake ── */}
      <section id="intake">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '40px', alignItems: 'start' }}>
            {/* CTA card */}
            <div
              className="form-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 40px',
                textAlign: 'center',
                background: 'linear-gradient(135deg,rgba(15,15,26,0.5) 0%,rgba(26,26,46,0.5) 100%)',
                border: '1px solid rgba(0,242,255,0.1)',
                borderRadius: '12px',
              }}
            >
              <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 700, letterSpacing: '-0.5px' }}>Quick intake form</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.5, maxWidth: '320px' }}>
                Tell us the problem. The inputs (data, systems, approvals). The smallest shape that could solve it.
              </p>
              <button
                className="btn-primary"
                data-open-modal="contact"
                style={{ background: 'linear-gradient(135deg,#00f2ff 0%,#00d9e8 100%)', color: '#0a0a0f', fontWeight: 700 }}
              >
                Open Intake Form
              </button>
            </div>

            {/* Details */}
            <div>
              <div className="callout">
                <span className="callout-k">What we&apos;ll cover on the call</span>
                The problem in your words. The inputs (data, systems, approvals). The smallest shape that could solve it. A ceiling and a timeline — or an honest &ldquo;we&apos;re not the right shop.&rdquo;
              </div>

              <div className="callout warm" style={{ marginTop: '16px' }}>
                <span className="callout-k">What we won&apos;t do</span>
                Drip-sequence you. Pitch you a tier you don&apos;t need. Charge for the intake. Hand you off to a bench of juniors after the call.
              </div>

              <div style={{ marginTop: '32px' }}>
                <div className="fact-k" style={{ marginBottom: '12px' }}>Direct channels</div>
                <div className="contact-row" style={{ marginTop: 0 }}>
                  <a className="cc" href="mailto:labs@techadyant.com">labs@techadyant.com</a>
                  <a className="cc" href="https://techadyant.com" target="_blank" rel="noopener noreferrer">techadyant.com (parent)</a>
                </div>
              </div>

              <div style={{ marginTop: '28px' }}>
                <div className="fact-k" style={{ marginBottom: '12px' }}>Entity &amp; location</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.6 }}>
                  TechAdyant Pvt. Ltd.<br />
                  Delhi, India · GMT+5:30<br />
                  Working hours overlap with UK mornings, US afternoons, AU early days.
                </p>
              </div>

              <div style={{ marginTop: '28px' }}>
                <div className="fact-k" style={{ marginBottom: '12px' }}>Response SLA</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.6 }}>
                  One business day for new intakes.<br />
                  Retainer clients follow their tier&apos;s SLA (4h – 48h).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Common first questions</div>
            <h2 className="sec-title">We get these on most first contacts.</h2>
          </div>
          <div className="faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
