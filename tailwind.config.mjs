/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FCFDFC',
          100: '#EEF2F0',
          200: '#E3E8E5',
          300: '#CDD5D1',
          400: '#ABB3AF',
          500: '#7B8380',
          600: '#535A57',
          700: '#2B302E',
        },
        sage: {
          50: '#DAE9E3',
          100: '#C2DBD2',
          200: '#8FBFAE',
          300: '#4A7C6F',
          400: '#3A6358',
          500: '#2A4A41',
        },
        terra: {
          50: '#F3EAE1',
          100: '#E8D5C4',
          200: '#D4B59A',
          300: '#C08B68',
          400: '#9A6D4E',
        },
        plum: {
          50: '#EEEAF2',
          100: '#D8D0E0',
          200: '#A898B8',
          300: '#7B6B8A',
          400: '#5C4E68',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Outfit', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['42px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'h2': ['28px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '1.8' }],
        'small': ['14px', { lineHeight: '1.6' }],
        'xs': ['12px', { lineHeight: '1.5' }],
      },
      animation: {
        'breathe': 'breathe 7s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'shimmer': 'shimmer 4s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-6px, 8px)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '-200% 0' },
          '50%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
