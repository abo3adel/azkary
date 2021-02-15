const colors = require('tailwindcss/colors');

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
                color: 'var(--ion-color-primary-contrast)',
                // primary: 'var(--ion-color-primary)',
                gray: colors.blueGray,
                teal: colors.teal,
                orange: colors.orange,
            },
            backgroundColors: {
                page: 'var(--page-bg)',
                primary: 'var(--ion-color-primary)',
            },
            fontFamily: {
                sans: [
                    'Roboto',
                    'Cairo',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                ],
            },
        },
    },
    variants: {
        extend: {
            animation: ['responsive', 'hover'],
            backgroundColor: ['disabled', 'hover', 'focus', 'active'],
            backgroundImage: ['disabled', 'responsive'],
            borderColor: [
                'disabled',
                'hover',
                'focus',
                'active',
                'group-hover',
            ],
            boxShadow: ['disabled', 'hover', 'focus', 'active'],
            cursor: ['disabled', 'hover'],
            gradientColorStops: ['responsive', 'hover', 'focus'],
            opacity: ['responsive', 'hover', 'focus', 'disabled'],
            outline: ['hover', 'focus', 'disabled'],
            textColor: ['hover', 'disabled', 'group-hover'],
        },
    },
    plugins: [],
};
