module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-prototype-builtins': 'off',

    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    'react/destructuring-assignment': 'off',
    'react/state-in-constructor': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
