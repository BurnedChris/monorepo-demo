const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './web/public/**/*.html',
    './web/src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    backdropFilter: {
      // defaults to {}
      none: 'none',
      hero: 'blur(10px)',
      bg: 'blur(60px)',
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      10: 10,
      20: 20,
      25: 25,
      30: 30,
      40: 40,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto',
    },
    extend: {
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--color-primary)',
        a11y: 'var(--bg-accessability)',

        accent: 'var(--color-accent)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--color-primary)',
        a11y: 'var(--text-accessability)',

        accent: 'var(--color-accent)',
      },
      divideColor: {
        nordTest: 'var(--divide-nordTest)',
      },
      ringColor: {
        accent: 'var(--color-accent-focus)',
      },
      borderColor: {
        accent: 'var(--color-accent-focus)',
      },
      fontFamily: {
        title: ['visby', ...defaultTheme.fontFamily.sans],
        sans: defaultTheme.fontFamily.sans,
      },
      borderRadius: {
        '2xl': '2rem',
        xl: '1rem',
      },
      cursor: ['ew-resize'],
      colors: {
        'active-white': 'white!important',
        'anti-white': '#f2f4f7',
        nord: {
          0: '#2E3440',
          1: '#3B4252',
          2: '#434C5E',
          3: '#4C566A',
          4: '#D8DEE9',
          5: '#E5E9F0',
          6: '#ECEFF4',
          7: '#F8F9FB',
          8: '#8FBCBB',
          9: '#88C0D0',
          10: '#81A1C1',
          11: '#5E81AC',
          12: '#BF616A',
          13: '#D08770',
          14: '#EBCB8B',
          15: '#A3BE8C',
          16: '#B48EAD',
        },
        green: {
          50: '#f8fcf6',
          100: '#f0f9ec',
          200: '#daf1d0',
          300: '#c4e8b4',
          400: '#98d77c',
          500: '#6cc644',
          600: '#61b23d',
          700: '#519533',
          800: '#417729',
          900: '#356121',
        },
        brown: {
          50: '#fdfbf8',
          100: '#faf7f1',
          200: '#f3ebdc',
          300: '#ebdec6',
          400: '#dcc69c',
          500: '#cdad71',
          600: '#b99c66',
          700: '#9a8255',
          800: '#7b6844',
          900: '#645537',
        },
        yellow: {
          50: '#fffcf2',
          100: '#fefae6',
          200: '#fdf2bf',
          300: '#fbe999',
          400: '#f8d94d',
          500: '#f5c900',
          600: '#ddb500',
          700: '#b89700',
          800: '#937900',
          900: '#786200',
        },
        peach: {
          50: '#fffaf9',
          100: '#fff4f3',
          200: '#ffe4e0',
          300: '#ffd4cd',
          400: '#ffb3a8',
          500: '#ff9382',
          600: '#e68475',
          700: '#bf6e62',
          800: '#99584e',
          900: '#7d4840',
        },
        pink: {
          50: '#fef6f8',
          100: '#feedf1',
          200: '#fcd2dc',
          300: '#fab6c6',
          400: '#f7809c',
          500: '#F34971',
          600: '#db4266',
          700: '#b63755',
          800: '#922c44',
          900: '#772437',
        },
        orange: {
          50: '#fff7f2',
          100: '#feefe6',
          200: '#fed8bf',
          300: '#fdc199',
          400: '#fb924d',
          500: '#f96300',
          600: '#e05900',
          700: '#bb4a00',
          800: '#953b00',
          900: '#7a3100',
        },
        blue: {
          50: '#f5fcfc',
          100: '#ebf9fa',
          200: '#ceeff1',
          300: '#b0e6e9',
          400: '#74d3d9',
          500: '#39c0c8',
          600: '#33adb4',
          700: '#2b9096',
          800: '#227378',
          900: '#1c5e62',
        },
        neon: {
          50: '#f8f6ff',
          100: '#f0edff',
          200: '#dad1ff',
          300: '#c4b5ff',
          400: '#987eff',
          500: '#6c47ff',
          600: '#6140e6',
          700: '#5135bf',
          800: '#412b99',
          900: '#35237d',
        },
        everGreen: '#009681',
        ever: {
          DEFAULT: '#009681',
          50: '#4FFFE6',
          100: '#3AFFE3',
          200: '#11FFDE',
          300: '#00E8C7',
          400: '#00BFA4',
          500: '#009681',
          600: '#005E51',
          700: '#002621',
          800: '#000000',
          900: '#000000',
        },
        linkedIn: { main: '#0077b5', hover: '#005997' },
        google: { main: '#4285f4', hover: '#2467d6' },
        github: { main: '#333333', hover: '#515151' },
      },
      minHeight: {
        donationPanel: '20rem',
      },
      minWidth: {
        goal: '3.75rem',
        square: '3.75rem',
      },

      typography(theme) {
        return {
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.100') },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.800'),
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: { color: theme('colors.gray.100') },
              'a code': { color: theme('colors.gray.100') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
            },
          },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}