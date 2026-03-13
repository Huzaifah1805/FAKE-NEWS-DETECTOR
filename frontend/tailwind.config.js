/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#151C2C',
          border: '#2A3441',
          text: '#E2E8F0',
          muted: '#94A3B8'
        },
        primary: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        success: '#10B981',
        danger: '#EF4444',
      }
    },
  },
  plugins: [],
}
