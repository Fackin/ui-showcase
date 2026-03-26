/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'rgb(var(--background-primary) / <alpha-value>)',
          secondary: 'rgb(var(--background-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--background-tertiary) / <alpha-value>)',
          hover: 'rgb(var(--background-hover) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--text-tertiary) / <alpha-value>)',
          accent: 'rgb(var(--text-accent) / <alpha-value>)',
          inverted: 'rgb(var(--text-inverted) / <alpha-value>)',
        },
        border: {
          primary: 'rgb(var(--border-primary) / <alpha-value>)',
          secondary: 'rgb(var(--border-secondary) / <alpha-value>)',
        },
        accent: {
          primary: 'rgb(var(--accent-primary) / <alpha-value>)',
          secondary: 'rgb(var(--accent-secondary) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
          subtle: 'rgb(var(--accent-subtle) / <alpha-value>)',
          text: 'rgb(var(--accent-text) / <alpha-value>)',
          'text-hover': 'rgb(var(--accent-text-hover) / <alpha-value>)',
        },
        code: {
          background: 'rgb(var(--code-background) / <alpha-value>)',
          text: 'rgb(var(--code-text) / <alpha-value>)',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}