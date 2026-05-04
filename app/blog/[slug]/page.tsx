/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readFileSync } from 'fs';
import path from 'path';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { POSTS, getPost } from '../posts';
import { PainPointWidget } from '../../components/PainPointWidget';
import { DeepSeekResearch } from '../../components/DeepSeekResearch';

// ── Static params for export ────────────────────────────────────────────────
export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

// ── Per-page metadata ────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const mdxPath = path.join(process.cwd(), 'contents', 'blog', `${slug}.mdx`);

  let source: string;
  try {
    source = readFileSync(mdxPath, 'utf-8');
  } catch {
    notFound();
  }

  // Strip frontmatter (--- ... ---) before compiling
  const content = source!.replace(/^---[\s\S]+?---\n/, '');

  // Compile MDX with the project's own React runtime (avoids duplicate-React error)
  const { default: MDXContent } = await evaluate(content, {
    ...(runtime as any),
  });

  return (
    <>
      {/* ── Post header ── */}
      <header className="relative pt-[120px] pb-12 md:pb-16 border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg-2)] to-[var(--bg)] overflow-hidden">
        {/* Subtle decorative accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="wrap-narrow relative z-10">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-6 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true">
              ←
            </span>
            Back to all posts
          </Link>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-4">
            {post!.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-[0.08em] uppercase text-primary-bright bg-primary/10 px-2 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] mb-5 text-[var(--text)] max-w-3xl">
            {post!.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-sm text-[var(--text-dim)] font-mono">
            <span>
              {new Date(post!.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span aria-hidden="true" className="text-[var(--border-strong)]">
              ·
            </span>
            <span>{post!.readingTime}</span>
          </div>
        </div>
      </header>

      {/* ── Post body ── */}
      <article className="pt-12 md:pt-16 pb-20 md:pb-24">
        <div className="wrap-narrow">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXContent
              components={{
                PainPointWidget,
                DeepSeekResearch,
              }}
            />
          </div>
        </div>
      </article>

      {/* ── Post footer ── */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-2)]">
        <div className="wrap-narrow py-12 md:py-16 text-center">
          <p className="text-[var(--text-muted)] mb-5">
            Want to build something with AI? Let&apos;s talk.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              className="btn-primary"
              data-open-modal="contact"
              type="button"
            >
              Book an intake call
            </button>
            <Link href="/blog" className="btn-ghost">
              ← More posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
