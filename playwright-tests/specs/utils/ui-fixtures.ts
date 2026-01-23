import type { Page, TestInfo } from '@playwright/test';
import { test as baseTest } from '@playwright/test';
import LoginPage from '@ui/page-objects/login-page.ts';
import type { UICredentials } from '@ui/test-data/ui-credentials';
import { QA_USER, ADMIN_USER, getTestUserCredentials } from '@ui/test-data/ui-credentials';
import type { UserRole } from '@utils/types';
import { QA_STORAGE_STATE_PATH, ADMIN_STORAGE_STATE_PATH } from '@utils/constants';
import * as fs from 'fs';

/**
 * Extended fixtures interface for UI testing
 * Provides page objects as fixtures for easy access in tests
 */
interface TrainigFixtures {
    loginPage: LoginPage;
    // in progress
}

/**
 * Extended test with page object fixtures
 * Use this instead of the base test to get access to all page objects
 *
 * @example
 * ```typescript
 * test('user can login', async ({ loginPage }) => {
 *   await loginPage.navigateTo();
 *   await loginPage.login();
 *   // ...
 * });
 * ```
 */
export const test = baseTest.extend<TrainigFixtures>({
    // Pass TestInfo through so page objects can attach per-test artifacts in the future.
    loginPage: async ({ page }: { page: Page }, use, testInfo: TestInfo) => {
        await use(new LoginPage(page, testInfo));
    },
    // in progress
});

// Export expect from @playwright/test for convenience
export { expect } from '@playwright/test';
