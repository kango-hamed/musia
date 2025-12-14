/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7ab529", // Lime Green from screenshot
        sidebar: "#0d1e15", // Dark Green/Black
        "sidebar-active": "rgba(255, 255, 255, 0.1)",
        background: "#f3f4f6", // Light Gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
