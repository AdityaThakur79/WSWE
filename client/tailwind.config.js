/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'yellow-custom': '#FAA845',
      },
      fontFamily: {
        'pacifco': ['Pacifico', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
      }
    },
  },
  plugins: [],
}