/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/src/**/*.{html,js,jsx,ts,tsx}', './client/dist/index.html'],
  theme: {
    extend: {
      minWidth: {
        '1000': '1000px'
      },
      backgroundImage: {
        'dark-crypto': "url('../assets/DarkCrytoBG2.png')"
      }
    },
  },
  plugins: [],
}