import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from './posts';

export const metadata: Metadata = {
  title: 'Blog — TechAdyant Labs · Agentic software thinking',
  description:
    'Practical articles on AI agents, serverless product engineering, and running a principal-led software studio in 2026.',
};

/** Map a tag to an emoji for card visuals (falls back to a gradient). */
const TAG_EMOJI: Record<string, string> = {
  AI: '🤖',
  SaaS: '☁️',
  Research: '🔬',
  n8n: '⚡',
};

function cardVisual(post: (typeof POSTS)[number]) {
  const emoji = post.tags.map((t) => TAG_EMOJI[t]).find(Boolean);
  if (emoji) {
    return (
      <div className="w-full h-full flex items-center justify-center text-5xl select-none">
        {emoji}
      </div>
    );
  }
  return null;
}

export default function BlogPage() {
  return (
    <>
      {/* ── Hero section ── */}
      <section className="relative pt-[120px] pb-16 md:pb-20 border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg-2)] to-[var(--bg)]">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl -translate-x-1/4 translate-y-1/3" />
        </div>

        <div className="wrap-narrow relative z-10">
          <div className="sec-kicker mb-4">Studio writing</div>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] mb-5 text-[var(--text)]">
            From the lab bench
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-[560px] leading-relaxed">
            Practical articles on AI agents, serverless architecture, and running a
            principal-led studio. No content-farm fodder — just things we&apos;ve
            actually needed to figure out.
          </p>
        </div>
      </section>

      {/* ── Card grid ── */}
      <section className="py-16 md:py-24">
        <div className="wrap-narrow">
          {POSTS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-[var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {/* Card image area */}
                  <div
                    className="relative w-full h-44 md:h-48 overflow-hidden"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--surface-2) 0%, var(--bg-2) 50%, var(--surface) 100%)',
                    }}
                  >
                    {cardVisual(post)}
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />
                  </div>

                  {/* Card body */}
                  <div className="p-5 md:p-6 flex flex-col gap-3">
                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] tracking-[0.08em] uppercase text-primary-bright bg-primary/10 px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--text)] group-hover:text-primary-bright transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta row: date + read time + link */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-2 text-xs text-[var(--text-dim)] font-mono">
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <span className="text-xs font-semibold text-primary-bright group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        Read more <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-muted)] text-center py-24">
              First post coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ── Subscribe nudge ── */}
      <section className="bg-[var(--bg-2)]">
        <div className="wrap-narrow text-center py-16 md:py-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[var(--text)]">
            Want to be notified of new posts?
          </h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto leading-relaxed">
            We don&apos;t have a newsletter yet. Just follow us or email{' '}
            <a
              href="mailto:labs@techadyant.com"
              className="text-primary-bright hover:underline"
            >
              labs@techadyant.com
            </a>{' '}
            to say hi.
          </p>
          <Link href="/contact" className="btn-ghost">
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}
