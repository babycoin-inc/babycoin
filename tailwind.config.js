/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/src/**/*.{html,js,jsx,ts,tsx}', './client/dist/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'dark-crypto': "url('/client/dist/assets/DarkCryptoBG2.png')",
        'bright-crypto': "url('/client/dist/assets/BrightCrypto.jpg')"
      },
      content: {
        'empty': '""',
        'dash': '"------"'
      }
    },
  },
  plugins: [],
}