/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060608',
        'bg-elevated': '#0c0c10',
        text: '#e8e4dc',
        'text-dim': '#6b6872',
        accent: '#00e5a0',
        'accent-warm': '#ffd060',
        'accent-blue': '#5090ff',
        border: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'scroll-pulse': 'scrollPulse 2s ease infinite',
        'loader-fill': 'loaderFill 0.15s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.5)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        loaderFill: {
          'to': { width: 'var(--target-width)' }
        },
      },
      backdropBlur: {
        'luxury': '20px'
      }
    },
  },
  plugins: [],
}