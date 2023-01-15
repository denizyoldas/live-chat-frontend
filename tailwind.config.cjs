/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#06C1AB',
        secondary: '#D9D9D9'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
