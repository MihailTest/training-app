import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

import type { Page } from '@playwright/test';
import { expect, test as setup } from '@playwright/test';
import LoginPage from '@ui/page-objects/login-page.ts';
import type { UICredentials } from '@ui/test-data/ui-credentials.ts';
import { ADMIN_USER, QA_USER } from '@ui/test-data/ui-credentials.ts';
import { ADMIN_STORAGE_STATE_PATH, QA_STORAGE_STATE_PATH } from '@utils/constants.ts';

/**
 * Authenticate one reusable account per role and persist separate browser states.
 *
 * This showcase does not mutate shared server-side account data, so reusing one
 * state per role is deterministic. A stateful production suite should provision
 * a unique account/state per parallel worker instead.
 */
async function authenticateAndSaveState(page: Page, credentials: UICredentials, storageStatePath: string): Promise<void> {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.loginWithCredentials(credentials);
  await expect(loginPage.logoutButton, `${credentials.role} user should be authenticated before saving state`).toBeVisible();

  await mkdir(dirname(storageStatePath), { recursive: true });
  await page.context().storageState({ path: storageStatePath });
}

/**
 * Create the full-access admin browser state.
 */
setup('authenticate as admin user', { tag: ['@SetupUI'] }, async ({ page }) => {
  await authenticateAndSaveState(page, ADMIN_USER, ADMIN_STORAGE_STATE_PATH);
});

/**
 * Create the limited-access QA browser state.
 */
setup('authenticate as QA user', { tag: ['@SetupUI'] }, async ({ page }) => {
  await authenticateAndSaveState(page, QA_USER, QA_STORAGE_STATE_PATH);
});
