module.exports = {
  root: true,
  extends: [
    '@redwoodjs/eslint-config',
    'plugin:xstate/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:lodash/recommended',
    'plugin:i18next/recommended',
    'prettier',
  ],
  plugins: [
    'xstate',
    '@tanstack/query',
    'react-refresh',
    'tailwindcss',
    'lodash',
    'i18next',
  ],
  rules: {
    'import/order': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    'tailwindcss/migration-from-tailwind-2': 'off',
    'lodash/prefer-lodash-method': 'off',
    'lodash/prefer-lodash-typecheck': 'off',
    'lodash/import-scope': [2, 'member'],
    'lodash/prefer-constant': 'off',
    'lodash/prefer-includes': 'off',
    'i18next/no-literal-string': 'off',
  },
  settings: {
    tailwindcss: {
      // These are the default values but feel free to customize
      config: './web/config/tailwind.config.js',
      whitelist: [
        'text-primary',
        'text-secondary',
        'ring-opacity-5',
        'sentry-mask',
        'sentry-ignore',
      ],
    },
  },
}
