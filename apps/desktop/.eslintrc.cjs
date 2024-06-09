module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn', // or "error"
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }
  ],
  overrides: [
    {
      files: ['*.config.js'],
      env: {
        node: true
      }
    }
  ],
  ignorePatterns: ['*.config.js']
}
