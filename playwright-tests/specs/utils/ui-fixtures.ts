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
 * Role-based fixtures interface
 * Provides authenticated pages for different user roles
 */
interface RoleBasedFixtures {
    QA_USER: { page: Page; credentials: UICredentials };
    ADMIN_USER: { page: Page; credentials: UICredentials };
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


export const testAsRole = baseTest.extend<RoleBasedFixtures>({
    QA_USER: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page, {} as TestInfo);

        await loginPage.navigateTo();
        await loginPage.loginWithCredentials(QA_USER);

        await use({ page, credentials: QA_USER });

        await context.close();
    },

    ADMIN_USER: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page, {} as TestInfo);

        await loginPage.navigateTo();
        await loginPage.loginWithCredentials(ADMIN_USER);

        await use({ page, credentials: ADMIN_USER });

        await context.close();
    },
});

/**
 * Get storage state path for a given role
 * @param role - User role
 * @returns Path to storage state file
 */
function getStorageStatePath(role: UserRole): string {
    switch (role) {
        case 'qa':
            return QA_STORAGE_STATE_PATH;
        case 'admin':
            return ADMIN_STORAGE_STATE_PATH;
        default:
            return QA_STORAGE_STATE_PATH;
    }
}

/**
 * Helper function to create role-specific test
 * Automatically authenticates with the specified role before running the test
 * Uses storage state if available for better performance, otherwise logs in fresh
 *
 * @param title - Test title
 * @param role - User role to authenticate as
 * @param testFunction - Test function that receives authenticated page and credentials
 *
 * @example
 * ```typescript
 * testWithRole('qa user can manage jobs', async ({ page, credentials, testInfo }) => {
 *   const jobsPage = new JobsListingPage(page, testInfo);
 *   await jobsPage.navigateTo();
 *   await jobsPage.clickCreateJob();
 * });
 * ```
 */
export function testWithRole(title: string, role: UserRole, testFunction: (args: { page: Page; credentials: UICredentials; testInfo: TestInfo }) => Promise<void>): void {
    baseTest(title, async ({ browser }, testInfo) => {
        const credentials = getTestUserCredentials(role);
        const storageStatePath = getStorageStatePath(role);

        // Use storage state if it exists, otherwise create a fresh context and login
        const contextOptions = fs.existsSync(storageStatePath) ? { storageState: storageStatePath } : {};
        const context = await browser.newContext(contextOptions);
        const page = await context.newPage();

        // If no storage state exists, perform login
        if (!fs.existsSync(storageStatePath)) {
            // Preserve TestInfo for possible per-test logging/attachments inside page objects.
            const loginPage = new LoginPage(page, testInfo);
            await loginPage.navigateTo();
            await loginPage.loginWithCredentials(credentials);
        }

        try {
            await testFunction({ page, credentials, testInfo });
        } finally {
            await context.close();
        }
    });
}

// Export expect from @playwright/test for convenience
export { expect } from '@playwright/test';
