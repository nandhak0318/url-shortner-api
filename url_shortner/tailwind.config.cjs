/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      scale: {
        '200': '40',
      },
      transitionDuration: {
        '10s': '10s',
      },
    },
  },
  plugins: [],
}
