import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';

import base from './eslint.base.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/pnpm-lock.yaml', '**/playwright-report/**', '**/test-results/**', '**/.state/**', '**/node_modules/**'],
  },

  ...base,

  // to disable conflicting formatting rules.
  ...compat.extends('prettier'),

  {
    plugins: { playwright, prettier },
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Playwright best-practice rules
      'no-empty-pattern': 'off',
      'playwright/max-nested-describe': 'error',
      'playwright/missing-playwright-await': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-force-option': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-restricted-matchers': 'error',
      'playwright/no-skipped-test': 'error',
      'playwright/no-useless-not': 'error',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-lowercase-title': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/require-top-level-describe': 'error',
      'playwright/valid-expect': 'error',

      'playwright/expect-expect': 'off',
      'playwright/no-conditional-in-test': 'off',

      'playwright/no-networkidle': 'off',
      'prettier/prettier': [
        'error',
        {
          printWidth: 200,
          tabWidth: 2,
          singleQuote: true,
          semi: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          bracketSameLine: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },
];
