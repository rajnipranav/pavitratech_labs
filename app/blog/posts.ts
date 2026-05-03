export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

export const POSTS: PostMeta[] = [
  {
    slug: 'how-i-find-saas-pain-points-with-ai',
    title: 'How I Find SaaS Pain Points With AI (And Why You Should Too)',
    date: '2026-05-01',
    excerpt:
      'Most indie hackers build what they wish existed. I run a different playbook: point AI at the feedback firehose and let it surface what people are actually screaming about.',
    tags: ['AI', 'SaaS', 'Research', 'n8n'],
    readingTime: '8 min read',
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return POSTS.find((p) => p.slug === slug);
}
