/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 12s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'shine': 'shine 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: '0.6' },
        },
        wave: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-25%) translateY(-15px)' },
          '50%': { transform: 'translateX(-50%) translateY(0)' },
          '75%': { transform: 'translateX(-25%) translateY(15px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #D4AF37 0%, #0D9488 50%, #7C3AED 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FDE047 0%, #F59E0B 50%, #CA8A04 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #34D399 0%, #059669 50%, #047857 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(212, 175, 55, 0.3)',
        'luxury-lg': '0 25px 80px rgba(212, 175, 55, 0.4)',
        'luxury-xl': '0 35px 120px rgba(212, 175, 55, 0.5)',
        'emerald-glow': '0 0 40px rgba(16, 185, 129, 0.5)',
        'gold-glow': '0 0 40px rgba(212, 175, 55, 0.5)',
        'purple-glow': '0 0 40px rgba(124, 58, 237, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}