import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';
import { Environment, ADMIN_STORAGE_STATE_PATH, UI_BASE_URL, QA_STORAGE_STATE_PATH } from '@utils/constants.ts';
import 'dotenv/config';

/**
 * Default configuration shared across all projects
 * See https://playwright.dev/docs/test-configuration
 */
export const defaultConfig: PlaywrightTestConfig = {
  /* Maximum time one test can run for */
  timeout: 180_000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met
     */
    timeout: 20_000,
  },

  /* Global timeout for the entire test run */
  globalTimeout: 270_000,

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Retry failing tests in CI environment one time, don't retry in local */
  retries: process.env.CI ? 1 : 0,

  /* Reporter configuration - different for CI vs local */
  reporter: process.env.CI
    ? [
      ['blob'],
      ['list'],
      ['junit', { outputFile: 'playwright-report/xml/test-results.xml' }],
      ['playwright-ctrf-json-reporter', { outputFile: 'json-results.json', outputDir: 'playwright-report/json' }],
    ]
    : [['list']],

  /* Folder for test artifacts such as screenshots, videos, traces, etc */
  outputDir: './playwright-report/test-results-artifacts/',

  /* Number of parallel workers */
  workers: 3,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Limit the number of failures on CI to save resources */
  maxFailures: 50,

  use: {
    /* Run in headless mode in CI, headed locally */
    headless: !!process.env.CI,

    /* Maximum time each action such as `click()` can take */
    actionTimeout: 20_000,

    /* Navigation timeout */
    navigationTimeout: 120_000,

    /* Data test id attribute pattern */
    testIdAttribute: 'data-testid',

    /* Record trace on first retry */
    trace: 'on-first-retry',

    /* Take a screenshot when test fails */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',
  },
};

/**
 * Playwright Test Configuration
 * Defines test projects for different environments and setups
 */
export default defineConfig({
  ...defaultConfig,
  projects: [
    // Setup project for Dev environment
    {
      name: `training-setup-${Environment.DEV}`,
      testDir: `./specs/config/`,
      testMatch: /global\.setup.ts/,
      grep: /@SetupUI/,
      use: {
        baseURL: UI_BASE_URL(Environment.DEV),
      },
    },

    // UI tests for Dev environment on Chromium
    // admin project
    {
      name: `training-${Environment.DEV}-admin-chromium`,
      testDir: `./specs/ui/tests/`,
      testMatch: /.*\.spec\.ts/,
      use: {
        baseURL: UI_BASE_URL(Environment.DEV),
        ...devices['Desktop Chrome'],
        ignoreHTTPSErrors: true,
        storageState: ADMIN_STORAGE_STATE_PATH,
      },
      // dependencies: [`training-setup-${Environment.DEV}`],
    },

    // qa project
    // {
    //   name: `training-${Environment.DEV}-qa-user-chromium`,
    //   testDir: `./specs/ui/tests/`,
    //   testMatch: /.*\.spec\.ts/,
    //   use: {
    //     baseURL: UI_BASE_URL(Environment.DEV),
    //     ...devices['Desktop Chrome'],
    //     ignoreHTTPSErrors: true,
    //     storageState: QA_STORAGE_STATE_PATH,
    //   },
    //   // dependencies: [`training-setup-${Environment.DEV}`],
    // },

    // // Optional: Setup project for QA environment
    // {
    //   name: `training-setup-${Environment.QA}`,
    //   testDir: `./specs/ui/tests/auth`,
    //   testMatch: /auth.setup.ts/,
    //   grep: /@SetupUI/,
    //   use: {
    //     baseURL: UI_BASE_URL(Environment.QA),
    //     storageState: STORAGE_STATE_PATH,
    //   },
    // },

    // // Optional: UI tests for QA environment on Chromium
    // {
    //   name: `training-${Environment.QA}-chromium`,
    //   testDir: `./specs/ui/tests/`,
    //   testMatch: /.*\.spec\.ts/,
    //   use: {
    //     baseURL: UI_BASE_URL(Environment.QA),
    //     ...devices['Desktop Chrome'],
    //     ignoreHTTPSErrors: true,
    //     storageState: STORAGE_STATE_PATH,
    //   },
    //   dependencies: [`training-setup-${Environment.QA}`],
    // },
  ],
});
