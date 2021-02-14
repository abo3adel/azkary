const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['src/**/*.vue', 'public/**/*.html', 'src/**/*.ts'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          '400': 'var(--ion-color-primary-tint)',
          '600': 'var(--ion-color-primary)',
          '800': 'var(--ion-color-primary-shade)',
        },
        // primary: 'var(--ion-color-primary)',
        gray: colors.blueGray,
        teal: colors.teal,
        orange: colors.orange,
      },
      backgroundColors: {
        page: 'var(--page-bg)',
        primary: 'var(--ion-color-primary)'
      }
    }
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
}