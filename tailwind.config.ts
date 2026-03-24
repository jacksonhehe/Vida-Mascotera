import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff7f8',
          100: '#d2ebef',
          200: '#a9d8df',
          300: '#79beca',
          400: '#4fa2b0',
          500: '#338393',
          600: '#256977',
          700: '#1e5561',
          800: '#1c4750',
          900: '#0f4c5c',
        },
        mint: {
          50: '#f1f8f4',
          100: '#dbeee1',
          200: '#b7dcc2',
          300: '#8cc69d',
          400: '#65b17b',
          500: '#47955f',
          600: '#367848',
          700: '#2d603c',
          800: '#264d32',
          900: '#1f3f2a',
        },
        cream: {
          50: '#fbf8f1',
          100: '#f4ede1',
          200: '#e8d9c2',
          300: '#ddc4a1',
          400: '#d4b184',
          500: '#c99963',
          600: '#ba804c',
          700: '#9b6540',
          800: '#7e5238',
          900: '#664431',
        },
        coral: {
          50: '#fff1ee',
          100: '#ffe0d8',
          200: '#ffc2b1',
          300: '#ff9b81',
          400: '#ff7150',
          500: '#f55b3d',
          600: '#e2391b',
          700: '#be2a11',
          800: '#9d2713',
          900: '#822615',
        },
      },
      boxShadow: {
        soft: '0 18px 45px -24px rgba(15, 76, 92, 0.35)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(255, 113, 80, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(101, 177, 123, 0.2), transparent 28%)',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
