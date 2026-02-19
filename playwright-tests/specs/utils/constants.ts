import 'dotenv/config';

/**
 * Environment enum for different deployment environments
 */
export enum Environment {
  DEV = 'dev',
  QA = 'qa',
  PROD = 'prod',
}

/**
 * Get the base URL for UI tests based on environment
 * @param env - The environment to get URL for
 * @returns The base URL string
 */
export const UI_BASE_URL = (env: Environment): string => {
  switch (env) {
    case Environment.DEV:
      return 'http://localhost:3000/';
    case Environment.QA:
      return 'https://preprod.localhost:3000';
    case Environment.PROD:
      return 'https://app.localhost:3000';
    default:
      return 'http://localhost:3000/';
  }
};

/**
 * Storage state paths for different user roles
 */
export const STORAGE_STATE_PATH = '.state/state.json';
export const QA_STORAGE_STATE_PATH = '.state/qa-state.json';
export const ADMIN_STORAGE_STATE_PATH = '.state/admin-state.json';

/**
 * Get storage state path for a specific test
 * @param testTitle - The test title
 * @param parallelIndex - The parallel worker index
 * @param type - The test type (UI or API)
 * @returns Path to storage state file for this test
 */
export const getStorageStatePathForTest = (testTitle: string, parallelIndex: number, type: 'UI' | 'API'): string => {
  const sanitizedTitle = testTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return `.state/${type.toLowerCase()}_${sanitizedTitle}_${parallelIndex}.json`;
};
