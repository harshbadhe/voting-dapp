/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sky Blue Theme
        primary: {
          DEFAULT: '#0ea5e9', // Sky 500
          hover: '#0284c7', // Sky 600
        },
        secondary: {
          DEFAULT: '#6366f1', // Indigo 500
          hover: '#4f46e5', // Indigo 600
        },
        background: '#f0f9ff', // Sky 50
        surface: '#ffffff', // White
        foreground: '#0f172a', // Slate 900
        muted: '#64748b', // Slate 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Requires Google Font import
      }
    },
  },
  plugins: [],
}
