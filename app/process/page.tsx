import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroCanvas } from '../components/HeroCanvas';

export const metadata: Metadata = {
  title: 'Process — TechAdyant Labs · Five steps, no theatre',
  description:
    'How TechAdyant Labs engages — intake, spec, build, launch, operate. Short cycles, visible checkpoints, fixed ceilings, cancellable retainers.',
};

const STEPS = [
  { num: '01 · INTAKE', name: 'Scope in 30 min',     body: 'Free call. We map the problem, confirm the inputs exist, and tell you honestly whether we\'re the right shop — sometimes we aren\'t.' },
  { num: '02 · SPEC',   name: 'One-page plan',        body: 'Short written spec — goal, deliverables, stack, success criteria, ceiling, timeline, what\'s out of scope. Your sign-off starts the clock.' },
  { num: '03 · BUILD',  name: 'Private preview',      body: 'Short cycles. Async daily or every-other-day updates. Preview URL by mid-sprint. You can see traces, evals and CI runs live.' },
  { num: '04 · LAUNCH', name: 'Gated rollout',        body: 'Shadow mode → staged traffic → 100%. Kill-switch wired in. Human-in-the-loop gates on anything expensive or customer-facing.' },
  { num: '05 · OPERATE', name: 'Retainer or handover', body: 'Clean handover to your team, or a retainer so we keep it tuned. Either way, you get full docs and a runbook.' },
];

export default function ProcessPage() {
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
            <span className="hero-eyebrow-text">Five Steps · Short Cycles · Visible Checkpoints</span>
            <div className="hero-eyebrow-dot" />
          </div>
          <h1 className="hero-main-title">
            How we actually <span className="accent">run</span> a project from intake to operation.
          </h1>
          <p className="hero-description">
            No six-month discovery theatre. No gated waterfalls. Five named steps with visible outputs at each. If something isn&apos;t working by step three, we&apos;d rather tell you than quietly keep billing.
          </p>
          <div className="hero-actions-container">
            <button className="hero-btn-primary" data-open-modal="contact">
              Start step one <span className="hero-btn-arrow">→</span>
            </button>
            <Link href="/pricing" className="hero-btn-secondary">
              See pricing <span className="hero-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process grid ── */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">The five steps</div>
            <h2 className="sec-title">Intake → spec → build → launch → operate.</h2>
            <p className="sec-sub">
              Every engagement follows the same shape, whether it&apos;s a $149 Patch &amp; Fix or a $12,999 Vertical Agent. The depth varies; the order doesn&apos;t.
            </p>
          </div>
          <div className="process-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="step">
                <div className="step-num">{s.num}</div>
                <div className="step-name">{s.name}</div>
                <div className="step-body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Step 01 detail ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Step 01 · Intake</div>
            <h2 className="sec-title">What happens in the first 30 minutes.</h2>
            <p className="sec-sub">
              Intake is not a sales call. We ask the questions we need to give you a useful answer. You leave with a recommendation, a ballpark, or a clean &ldquo;we&apos;re not the right fit&rdquo; — not a follow-up drip sequence.
            </p>
          </div>
          <ul className="delivs">
            <li><div><strong>You describe the problem</strong><span>Not the solution. What&apos;s broken, what&apos;s missing, what you&apos;d like it to look like in six months.</span></div></li>
            <li><div><strong>We ask the ugly questions</strong><span>Where&apos;s the data? Who approves? What fails in the current process? Where does the money actually move?</span></div></li>
            <li><div><strong>We map it to a tier</strong><span>Most problems slot into an existing tier. Some need a custom shape. We&apos;ll say which.</span></div></li>
            <li><div><strong>We give a ceiling</strong><span>A ballpark by the end of the call. A written one-page spec follows within 48 hours if we&apos;re both in.</span></div></li>
          </ul>
        </div>
      </section>

      {/* ── Step 02 detail ── */}
      <section>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Step 02 · Spec</div>
            <h2 className="sec-title">One-page spec, 48 hours.</h2>
            <p className="sec-sub">
              We don&apos;t do 40-page proposals. We do a tight one-pager that fits on a phone screen. Every project has one. It&apos;s the contract; anything else you hear from us has to match it.
            </p>
          </div>
          <div className="callout">
            <span className="callout-k">Contents</span>
            Goal · Deliverables · Explicit non-goals · Stack · Success criteria · Ceiling and timeline · Payment schedule · Agreed channels and response times · Change-request process.
          </div>
        </div>
      </section>

      {/* ── Step 03 detail ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Step 03 · Build</div>
            <h2 className="sec-title">Short cycles, visible progress.</h2>
          </div>
          <ul className="delivs">
            <li><div><strong>Daily or every-other-day async</strong><span>Short written update in Slack or email. What shipped, what&apos;s next, what&apos;s stuck.</span></div></li>
            <li><div><strong>Preview URL by mid-sprint</strong><span>You can click through the real thing — not wait for an end-of-project reveal.</span></div></li>
            <li><div><strong>Your GitHub org, from day one</strong><span>Repo lives in your org. You own it. Every commit is traceable.</span></div></li>
            <li><div><strong>CI from the first PR</strong><span>GitHub Actions, preview deploys on every pull request, linting and type-checking enforced.</span></div></li>
            <li><div><strong>Observability wired early</strong><span>Sentry, PostHog, LangSmith or Langfuse plumbed before the first real user touches it.</span></div></li>
            <li><div><strong>One weekly 30-min call</strong><span>Optional if the async updates are flowing well. Reserved for genuine ambiguity, not status theatre.</span></div></li>
          </ul>
        </div>
      </section>

      {/* ── Step 04 detail ── */}
      <section>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Step 04 · Launch</div>
            <h2 className="sec-title">Gated rollouts, not big-bang releases.</h2>
            <p className="sec-sub">
              Especially for agents — but the shape applies to any real system with users. We ship in stages so a bug never meets more than a manageable slice of your traffic.
            </p>
          </div>
          <ul className="delivs">
            <li><div><strong>Shadow mode (where applicable)</strong><span>Agent runs on real inputs, outputs compared to the current process, nothing goes live.</span></div></li>
            <li><div><strong>Staged traffic</strong><span>10% → 25% → 50% → 100% over days or weeks, with eval scores watched at each step.</span></div></li>
            <li><div><strong>Kill-switch &amp; rollback</strong><span>Feature flags, reversible migrations, known-good snapshot. If something&apos;s wrong, we go backward safely.</span></div></li>
            <li><div><strong>Runbook handover</strong><span>Short markdown runbook — how to deploy, how to roll back, where logs live, who to call at 2am.</span></div></li>
          </ul>
        </div>
      </section>

      {/* ── Step 05 detail ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap-narrow">
          <div className="sec-head">
            <div className="sec-kicker">Step 05 · Operate</div>
            <h2 className="sec-title">Handover — or retainer.</h2>
            <p className="sec-sub">You choose. We won&apos;t try to tether you to us.</p>
          </div>
          <div className="callout warm">
            <span className="callout-k">Handover includes</span>
            README, runbook, architecture diagram, known issues, pending TODOs, list of every secret in every vault, first two weeks of questions answered for free. If you decide you&apos;d rather we keep running it, any retainer tier is a one-click upgrade.
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <div className="wrap">
          <div className="cta-band">
            <h2>Ready to start step one?</h2>
            <p>30 minutes. You don&apos;t need a brief. Just tell us what&apos;s broken or what you want to ship.</p>
            <div className="cta-actions">
              <button className="btn-primary" data-open-modal="contact">Book an intake call</button>
              <Link href="/pricing" className="btn-ghost">See pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
