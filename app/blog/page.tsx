import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from './posts';

export const metadata: Metadata = {
  title: 'Blog — TechAdyant Labs · Agentic software thinking',
  description:
    'Practical articles on AI agents, serverless product engineering, and running a principal-led software studio in 2026.',
};

export default function BlogPage() {
  return (
    <>
      {/* ── Page header ── */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap-narrow">
          <div className="sec-kicker" style={{ marginBottom: '16px' }}>Studio writing</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.03em' }}>
            From the lab bench
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '560px', margin: 0 }}>
            Practical articles on AI agents, serverless architecture, and running a principal-led studio. No content-farm fodder — just things we&apos;ve actually needed to figure out.
          </p>
        </div>
      </section>

      {/* ── Post list ── */}
      <section>
        <div className="wrap-narrow">
          <div style={{ display: 'grid', gap: '2px', paddingTop: '8px' }}>
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article
                  className="transition-lift"
                  style={{
                    padding: '32px 0',
                    borderBottom: '1px solid var(--border)',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '24px',
                    alignItems: 'start',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-jetbrains, monospace)',
                            letterSpacing: '0.1em',
                            color: 'var(--primary-bright)',
                            background: 'rgba(99,102,241,0.1)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                      {post.title}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '6px' }}>
                      {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                      {post.readingTime}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {POSTS.length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
              First post coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ── Subscribe nudge ── */}
      <section style={{ background: 'var(--bg-2)' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <h2 style={{ marginBottom: '12px', fontSize: '1.5rem' }}>Want to be notified of new posts?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            We don&apos;t have a newsletter yet. Just follow us or email{' '}
            <a href="mailto:labs@techadyant.com" style={{ color: 'var(--primary-bright)' }}>labs@techadyant.com</a> to say hi.
          </p>
          <Link href="/contact" className="btn-ghost">Get in touch →</Link>
        </div>
      </section>
    </>
  );
}
