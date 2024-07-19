import { fixupConfigRules } from '@eslint/compat'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['**/*.config.js', '**/node_modules', '**/dist', '**/out', '**/.gitignore']
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      '@electron-toolkit/eslint-config-ts/recommended',
      '@electron-toolkit/eslint-config-prettier'
    )
  ),
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['**/*.config.js'],

    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
]
