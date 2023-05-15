/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Instrument': ['"Instrument Sans"', 'sans-serif'],
        'Righteous': ['"Righteous"', 'cursive']
      }
    },
  },
  plugins: [],
}

