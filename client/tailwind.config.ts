import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#edf2f7',
          100: '#2d3748',
          200: '#1a202c',
          300: '#171923',
          400: '#141618',
        },
        accent: {
          primary: '#60a5fa',
          secondary: '#34d399',
          tertiary: '#a78bfa',
          quaternary: '#f43f5e',
        },
        glow: {
          primary: '#60a5fa80',
          secondary: '#34d39980',
          tertiary: '#a78bfa80',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
