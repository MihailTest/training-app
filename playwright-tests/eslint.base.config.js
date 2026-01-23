import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Disable formatting rules that conflict with Prettier
  prettierConfig,

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Imports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // TypeScript hygiene
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      'no-debugger': 'error',
    },
  },
];
