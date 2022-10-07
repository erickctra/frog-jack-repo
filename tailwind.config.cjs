/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        monogram: ["monogram"]
      },
      colors: {
        'bg': '#EDEBE9',
        'primary': '#373948',
        'b-secondary': '#B9AAAA',
        'secondary': '#AFAEA9',
        'shadow': '#D4D2C9',
      },
      animation: {
        getCard: 'getCard 0.5s ease-in-out',
        getAlert: 'getAlert 0.5s ease-in-out forwards ',
        actionLoader: 'actionLoader 6s cubic-bezier(0.3, 0.27, 0.51, 0.54) forwards'
      },
      keyframes: {
        getCard: {
          '50%, 0%': { transform: 'translateY(-100px)', opacity: '0',  },
          '100%': {
            transform: 'translateY(0px) rotate(-2deg)'
          }
        },
        getAlert: {
          '100%': { transform: 'translateY(-60px)', opacity: '1',  },
          '0%': {
            transform: 'translateY(0px)',
            opacity: '0',
          }
        },
        actionLoader: {
          '0%': {width: '100%'},
          '100%': { width: '0'}
        }
      }
    },
  },
  plugins: [],
}
