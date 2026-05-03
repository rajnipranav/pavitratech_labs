# Next.js Migration — Setup Instructions

## What was created

All files in the new `app/` directory + support files are fully written. 
The existing static HTML/CSS files remain untouched in their original folders.

## 1. Install dependencies

From the project root, run:

```bash
npm install next@latest react@latest react-dom@latest typescript @types/node @types/react @types/react-dom
npm install @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote
npm install next-themes
npm install @tailwindcss/typography tailwindcss postcss autoprefixer
npm install --save-dev eslint eslint-config-next
```

Or add these to `package.json` dependencies then run `npm install`:

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@next/mdx": "^15.0.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "next-mdx-remote": "^5.0.0",
    "next-themes": "^0.3.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

## 2. Add scripts to package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 3. Create postcss.config.js (if not present)

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 4. Create tsconfig.json (if not present)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 5. File structure created

```
app/
  globals.css          ← all CSS (Tailwind + original styles + new nav/footer)
  layout.tsx           ← root layout (nav, footer, fonts, ThemeProvider, ContactModal)
  page.tsx             ← homepage (/)
  about/page.tsx
  services/page.tsx
  contact/page.tsx
  pricing/page.tsx
  process/page.tsx
  work/page.tsx
  blog/
    page.tsx           ← blog listing (/blog)
    posts.ts           ← post registry
    [slug]/page.tsx    ← dynamic MDX post route (/blog/:slug)
  components/
    ThemeProvider.tsx
    ThemeToggle.tsx
    HeroCanvas.tsx     ← canvas animation (ported from hero.js)
    ContactModal.tsx   ← global modal with Turnstile CAPTCHA
    PortraitImage.tsx  ← about page portrait with error fallback
    PainPointWidget.tsx ← interactive AI widget for blog post

contents/
  blog/
    how-i-find-saas-pain-points-with-ai.mdx

next.config.ts
tailwind.config.ts
mdx-components.tsx
```

## 6. Development

```bash
npm run dev
# → http://localhost:3000
```

## 7. Production build

```bash
npm run build
# Outputs static files to: out/
```

The `output: 'export'` in `next.config.ts` generates a fully static site.

## 8. Cloudflare Pages deployment

The existing `functions/api/contact.js` Cloudflare Pages Function is unchanged and will
continue to handle POST requests to `/api/contact` on Cloudflare Pages.

**Deploy command:** `npm run build`  
**Output directory:** `out`

If using Wrangler:
```bash
npx wrangler pages deploy out --project-name labs-techadyant
```

## 9. PainPointWidget — wire up n8n

The `PainPointWidget` in `app/components/PainPointWidget.tsx` calls:
```
process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
```

Set this in `.env.local` (development) or Cloudflare Pages environment variables:
```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/pain-point-radar
```

The widget includes a graceful fallback with demo data when the webhook is unreachable
(useful while testing). The n8n webhook should return JSON:

```json
{
  "market": "project management SaaS",
  "intensity": 82,
  "topPains": [
    "Onboarding takes too long with no progress visibility",
    "..."
  ],
  "opportunity": "Highest-signal gap: ..."
}
```

## 10. Dark mode

Dark mode is the default. The ThemeToggle in the nav lets users switch. The 
`next-themes` package handles persistence via `localStorage` and applies 
`class="dark"` or `class="light"` to `<html>`.

## 11. Contact modal

The `ContactModal` component listens for clicks on any element with 
`data-open-modal="contact"` — matching the existing `modal-loader.js` behavior.
This means all existing buttons like `<button data-open-modal="contact">` work
without changes across all pages.

The modal submits to `/api/contact` (POST JSON). On Cloudflare Pages, this is
handled by `functions/api/contact.js`.

## 12. Adding more blog posts

1. Create `contents/blog/your-slug.mdx` with frontmatter:
   ```yaml
   ---
   title: "Your Title"
   date: "2026-06-01"
   excerpt: "..."
   tags: ["tag1", "tag2"]
   readingTime: "5 min read"
   ---
   ```

2. Add an entry to `app/blog/posts.ts`:
   ```ts
   {
     slug: 'your-slug',
     title: 'Your Title',
     date: '2026-06-01',
     excerpt: '...',
     tags: ['tag1', 'tag2'],
     readingTime: '5 min read',
   }
   ```

The blog post will automatically appear in the listing and be statically generated.
