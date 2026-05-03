import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { ContactModal } from './components/ContactModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Techadyant Labs — Where Ideas Evolve',
    template: '%s | Techadyant Labs',
  },
  description:
    'Techadyant Labs builds full-stack products, AI integrations, design systems, and UX audits for early-stage startups.',
  openGraph: {
    type: 'website',
    siteName: 'Techadyant Labs',
  },
};

const NAV_LINKS = [
  { href: '/',         label: 'Home'     },
  { href: '/about',    label: 'About'    },
  { href: '/services', label: 'Services' },
  { href: '/work',     label: 'Work'     },
  { href: '/process',  label: 'Process'  },
  { href: '/pricing',  label: 'Pricing'  },
  { href: '/blog',     label: 'Blog'     },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          {/* ── Sticky nav ── */}
          <header className="site-nav" role="banner">
            <nav className="nav-inner container">
              <Link href="/" className="nav-logo" aria-label="Techadyant Labs home">
                <span className="logo-mark">⬡</span>
                <span className="logo-text">Techadyant Labs</span>
              </Link>

              <ul className="nav-links" role="list">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="nav-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="nav-actions">
                <ThemeToggle />
                <button
                  className="btn btn-primary btn-sm"
                  data-open-modal="contact"
                >
                  Start a Project
                </button>
              </div>
            </nav>
          </header>

          {/* ── Page content ── */}
          <main id="main-content">
            {children}
          </main>

          {/* ── Footer ── */}
          <footer className="site-footer">
            <div className="container footer-inner">
              <div className="footer-brand">
                <Link href="/" className="nav-logo" style={{ marginBottom: '12px', display: 'inline-flex' }}>
                  <span className="logo-mark">⬡</span>
                  <span className="logo-text">Techadyant Labs</span>
                </Link>
                <p className="footer-tagline">
                  Where ideas evolve — small team, full-stack execution.
                </p>
              </div>

              <div className="footer-links">
                <div className="footer-col">
                  <h4>Navigate</h4>
                  <ul role="list">
                    {NAV_LINKS.map(({ href, label }) => (
                      <li key={href}><Link href={href}>{label}</Link></li>
                    ))}
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Contact</h4>
                  <ul role="list">
                    <li>
                      <a href="mailto:hello@techadyant.com">hello@techadyant.com</a>
                    </li>
                    <li>
                      <button
                        className="footer-link-btn"
                        data-open-modal="contact"
                      >
                        Start a Project →
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Techadyant Labs. All rights reserved.</p>
            </div>
          </footer>

          {/* ── Global contact modal ── */}
          <ContactModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
