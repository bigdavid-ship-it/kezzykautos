import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          primary: '#0a0a0a',
          surface: '#141414',
          elevated: '#1a1a1a',
          input: '#1e1e1e',
          hover: '#222222',
        },
        // Accent — Burnt Orange (NO red, NO yellow)
        accent: {
          DEFAULT: '#c2662d',
          hover: '#d4742f',
          muted: '#8b4513',
          subtle: 'rgba(194, 102, 45, 0.1)',
          dark: '#7a4420',
        },
        // Text
        text: {
          primary: '#ffffff',
          secondary: '#9ca3af',
          muted: '#6b7280',
        },
        // Borders
        border: {
          DEFAULT: '#262626',
          light: '#333333',
          accent: '#c2662d',
        },
        // Status colors (NO red)
        status: {
          success: '#22c55e',
          warning: '#c2662d',
          error: '#c2662d',
          sold: '#6b7280',
          available: '#22c55e',
          pending: '#c2662d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'subheading': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      borderRadius: {
        'card': '0.75rem',
        'button': '0.5rem',
        'input': '0.5rem',
        'badge': '0.375rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(0, 0, 0, 0.3)',
        'elevated': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(194, 102, 45, 0.15)',
        'glow-strong': '0 0 30px rgba(194, 102, 45, 0.25)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #c2662d 0%, #d4742f 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)',
        'gradient-surface': 'linear-gradient(180deg, #141414 0%, #1a1a1a 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.8) 60%, #0a0a0a 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      screens: {
        'xs': '375px',
        'sm': '430px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '150ms',
        slow: '300ms',
      },
    },
  },
  plugins: [],
}

export default config
