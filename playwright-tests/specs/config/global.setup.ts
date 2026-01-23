import { test as setup } from '@playwright/test';
import LoginPage from '@ui/page-objects/login-page.ts';
import { ADMIN_USER, QA_USER } from '@ui/test-data/ui-credentials.ts';
import { ADMIN_STORAGE_STATE_PATH, QA_STORAGE_STATE_PATH } from '@utils/constants.ts';

/**
 * Global setup for UI tests
 * Creates necessary directories and storage state files for all user roles
 * Tagged with @SetupUI for selective test execution
 */

/**
 * Authentication setup for admin user (full access)
 * Tagged with @SetupUI for selective execution
 */
setup('authenticate as admin user', { tag: ['@SetupUI'] }, async ({ page, }, testInfo) => {
    // TestInfo is passed to page objects to enable future per-test attachments/logging.
    const loginPage = new LoginPage(page, testInfo);
    await loginPage.navigateTo();
    await loginPage.loginWithCredentials(ADMIN_USER);

    const isLoggedIn = await loginPage.isLoggedIn();
    if (!isLoggedIn) {
        throw new Error('admin user authentication failed');
    }

    await loginPage.saveStorageState(ADMIN_STORAGE_STATE_PATH);
});

/**
 * Authentication setup for QA user (limited access)
 * Tagged with @SetupUI for selective execution
 */
setup('authenticate as QA user', { tag: ['@SetupUI'] }, async ({ page }, testInfo) => {
    // TestInfo is passed to page objects to enable future per-test attachments/logging.
    const loginPage = new LoginPage(page, testInfo);

    await loginPage.navigateTo();
    await loginPage.loginWithCredentials(QA_USER);

    const isLoggedIn = await loginPage.isLoggedIn();
    if (!isLoggedIn) {
        throw new Error('QA user authentication failed');
    }

    await loginPage.saveStorageState(QA_STORAGE_STATE_PATH);
});
