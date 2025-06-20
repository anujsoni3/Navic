/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gothic: ['"League Gothic"', 'sans-serif'],
        spartan: ['"League Spartan"', 'sans-serif'],
        lustria: ['Lustria', 'serif'],
      },
    },
  },
  plugins: [],
}

