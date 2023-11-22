/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.svelte', './src/*.{html,css}'],
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
