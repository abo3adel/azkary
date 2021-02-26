const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['src/**/*.vue', 'public/**/*.html', 'src/**/*.ts'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        themeVariants: ['rtl'],
        extend: {
            colors: {
                primary: {
                    '400': 'var(--ion-color-primary-tint, #4c8dff)',
                    '600': 'var(--ion-color-primary, #3880ff)',
                    '800': 'var(--ion-color-primary-shade, #3171e0)',
                },
                color: 'var(--ion-color-primary-contrast, #ffffff)',
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
            textAlign: ['rtl'],
            transform: ['rtl'],
            rotate: ['rtl'],
        },
    },
    plugins: [require('tailwindcss-multi-theme')],
};
