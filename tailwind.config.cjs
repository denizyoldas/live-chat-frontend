/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#06C1AB'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
