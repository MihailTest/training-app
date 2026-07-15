import { expect } from '@playwright/test';
import { ADMIN_USER, QA_USER } from '@ui/test-data/ui-credentials.ts';
import { ADMIN_STORAGE_STATE_PATH } from '@utils/constants.ts';
import { test } from '@utils/ui-fixtures';

test.describe('login', () => {
  // Authentication tests must not inherit a project-level user session.
  test.use({
    storageState: { cookies: [], origins: [] },
  });

  test('verify admin can log in with valid credentials and reach the authenticated area', { tag: ['@smoke'] }, async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.loginWithCredentials(ADMIN_USER);
    await expect(loginPage.page, 'admin should reach the home route').toHaveURL(/\/$/);
    await expect(loginPage.logoutButton, 'authenticated header controls should be visible after admin login').toBeVisible();
  });

  test('verify qa user can log in with valid credentials and reach the authenticated area', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.loginWithCredentials(QA_USER);
    await expect(loginPage.page, 'QA user should reach the home route').toHaveURL(/\/$/);
    await expect(loginPage.logoutButton, 'authenticated header controls should be visible after QA login').toBeVisible();
  });

  test('verify login fails when password is incorrect for a valid username.', { tag: ['@smoke'] }, async ({ loginPage }) => {
    const invalidPassword = `${ADMIN_USER.password}-invalid`;

    await loginPage.navigateTo();
    await loginPage.login(ADMIN_USER.username, invalidPassword);
    await expect(loginPage.page, 'invalid credentials should keep the user on the login route').toHaveURL(/\/auth\/login$/);
    await expect(loginPage.invalidCredentialsMessage, 'invalid credentials message should appear').toBeVisible();
  });

  test('verify validation prevents login with missing credentials.', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.submitLogin();
    await expect(loginPage.page, 'native validation should keep the user on the login route').toHaveURL(/\/auth\/login$/);
    await expect(loginPage.usernameInput, 'username input should be focused').toBeFocused();
    expect(await loginPage.isUsernameValueMissing(), 'Username required field should display browser-native validation state').toBe(true);
  });

  test('verify credentials with leading/trailing spaces are handled consistently.', { tag: ['@regression'] }, async ({ loginPage }) => {
    const usernameWithSpaces = `  ${ADMIN_USER.username}  `;
    const passwordWithSpaces = `  ${ADMIN_USER.password}  `;
    await loginPage.navigateTo();
    await loginPage.login(usernameWithSpaces, passwordWithSpaces);
    await expect(loginPage.page, 'credentials with surrounding spaces should stay on the login route').toHaveURL(/\/auth\/login$/);
    await expect(loginPage.invalidCredentialsMessage, 'invalid credentials message should appear').toBeVisible();
  });

  test.describe('authenticated session behavior', () => {
    // Override the clean state above to prove role-specific state reuse and redirect behavior.
    test.use({ storageState: ADMIN_STORAGE_STATE_PATH });

    test('verify authenticated users are redirected away from the login page', { tag: ['@regression'] }, async ({ loginPage }) => {
      await loginPage.navigateToRoute();
      await loginPage.waitForPostLogin();
      await expect(loginPage.page, 'authenticated users should be redirected to the home route').toHaveURL(/\/$/);
      await expect(loginPage.logoutButton, 'authenticated header controls should remain visible after redirect').toBeVisible();
    });
  });
});
