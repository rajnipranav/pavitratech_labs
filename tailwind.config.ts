import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contents/**/*.{mdx,md}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B14',
        'bg-2': '#111122',
        surface: '#161629',
        'surface-2': '#1C1C34',
        primary: '#6366F1',
        'primary-bright': '#818CF8',
        brass: '#F5B544',
        'brass-cream': '#E6D1A0',
        gold: '#00f2ff',
        success: '#34D399',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
