/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,jsx,tsx}",
  ],
  darkMode:  'media' ,
  theme: {
    extend: {},
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [],
}
