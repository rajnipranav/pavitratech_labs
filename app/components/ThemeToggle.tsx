'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="theme-toggle"
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '6px 10px',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        fontSize: '14px',
        lineHeight: 1,
        transition: 'color 0.2s, border-color 0.2s',
      }}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
