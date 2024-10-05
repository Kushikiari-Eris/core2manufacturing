/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Disable system-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
