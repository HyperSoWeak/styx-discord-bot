import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.git', 'coverage'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Logic & Best Practices
      curly: ['error', 'multi-line', 'consistent'],
      'no-console': 'off', // Allow console logging for the bot
      'no-empty-function': 'error',
      'no-lonely-if': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      yoda: 'error',
      'no-shadow': 'off', // Turn off JS rule to avoid false positives
      '@typescript-eslint/no-shadow': ['error'],

      // Promise handling (Crucial for Discord.js)
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Type safety
      '@typescript-eslint/no-explicit-any': 'warn', // Warn on any, but allow if necessary

      // Style (that Prettier doesn't handle or complements)
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
  // Disable type-checking for config files to avoid "not included in tsconfig" errors
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  prettierConfig
);
