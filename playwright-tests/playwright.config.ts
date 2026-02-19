import { defineConfig, devices } from '@playwright/test';
import { ADMIN_STORAGE_STATE_PATH } from '@utils/constants.ts';
import 'dotenv/config';

const isCI = process.env.CI === 'true';
const shard = process.env.SHARD_LABEL ?? 'local';

/**
 * Default configuration shared across all projects
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  /* Maximum time one test can run for */
  timeout: isCI ? 120_000 : 60_000,
  globalTimeout: isCI ? 15 * 60_000 : 10 * 60_000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met
     */
    timeout: 10_000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Retry failing tests in CI environment one time, don't retry in local */
  retries: isCI ? 1 : 0,

  /* Reporter configuration - different for CI vs local */
  reporter: isCI
    ? [
      ['blob', { outputDir: `artifacts/${shard}/blob` }],
      ['json', { outputFile: `artifacts/${shard}/results.json` }],
      ['junit', { outputFile: `artifacts/${shard}/results.xml` }],
      ['html', { outputFolder: `artifacts/${shard}/html`, open: 'never' }],
    ]
    : [['html', { open: 'never' }]],

  /* Folder for test artifacts such as screenshots, videos, traces, etc */
  outputDir: `artifacts/${shard}/test-results-artifacts`,

  /* Number of parallel workers */
  workers: isCI ? undefined : 3,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Limit the number of failures on CI to save resources */
  maxFailures: 50,

  use: {
    /* Run in headless mode in CI, headed locally */
    headless: isCI,

    /* Data test id attribute pattern */
    testIdAttribute: 'data-testid',

    /* Record trace on first retry */
    trace: 'on-first-retry',

    /* Take a screenshot when test fails */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',
  },


  /**
   * Playwright Test Configuration
   * Defines test projects for different environments and setups
   */
  projects: [
    // Setup project for Dev environment
    {
      name: 'setup',
      testDir: `./specs/config/`,
      testMatch: /global\.setup.ts/,
      grep: /@SetupUI/,
    },

    // UI tests for Dev environment on Chromium
    // admin project
    {
      name: 'chromium',
      testDir: `./specs/ui/tests/`,
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        ignoreHTTPSErrors: true,
        storageState: ADMIN_STORAGE_STATE_PATH,
      },
      // dependencies: ['setup'],
    },

    // qa project
    // first import QA_STORAGE_STATE_PATH
    // {
    //   name: 'qa chromium',
    //   testDir: `./specs/ui/tests/`,
    //   testMatch: /.*\.spec\.ts/,
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     ignoreHTTPSErrors: true,
    //     storageState: QA_STORAGE_STATE_PATH,
    //   },
    //   // dependencies: ['setup'],
    // },
  ],
});
