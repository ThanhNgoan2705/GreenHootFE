/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.vue',
    './src/**/*.js',
  ],
  theme: {
    extend: {},
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [],
}

