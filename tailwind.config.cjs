/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        monogram: ["monogram"]
      },
      colors: {
        'bg':         '#EDEBE9',
        'primary':    '#373948',
        'b-secondary': '#B9AAAA',
        'secondary':  '#AFAEA9',
        'shadow':     '#D4D2C9',
      }
    },
  },
  plugins: [],
}
