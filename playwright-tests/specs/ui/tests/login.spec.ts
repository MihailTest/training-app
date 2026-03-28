import { expect } from '@playwright/test';
import { ADMIN_USER, QA_USER } from '@ui/test-data/ui-credentials.ts';
import { test } from '@utils/ui-fixtures';

test.describe('login', () => {
  test.use({
    storageState: { cookies: [], origins: [] }, // run login.spec.ts with a clean storage state
  });

  test('verify admin can log in with valid credentials and reach the authenticated area', { tag: ['@smoke'] }, async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.loginWithCredentials(ADMIN_USER);
    await expect(await loginPage.getCurrentUrl(), 'Page URL should match /').toMatch(/\/$/);
  });

  test('verify qa user can log in with valid credentials and reach the authenticated area', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.loginWithCredentials(QA_USER);
    await expect(await loginPage.getCurrentUrl(), 'Page URL should match /').toMatch(/\/$/);
  });

  test('verify login fails when password is incorrect for a valid username.', { tag: ['@smoke'] }, async ({ loginPage }) => {
    const invalidPassword = `${ADMIN_USER.password}-invalid`;

    await loginPage.navigateTo();
    await loginPage.login(ADMIN_USER.username, invalidPassword);
    await expect(await loginPage.getCurrentUrl(), 'Page URL should match /auth/login').toMatch(/\/auth\/login$/);
    await expect(await loginPage.isInvalidCredentialsMessageVisible(), 'Invalid credentials message should appear').toBe(true);
  });

  test('verify validation prevents login with missing credentials.', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.submitLogin();
    await expect(await loginPage.getCurrentUrl(), 'Page URL should match /auth/login').toMatch(/\/auth\/login$/);
    await expect(await loginPage.isUsernameInputFocused(), 'Username input should be focused').toBe(true);
    await expect(await loginPage.isUsernameValueMissing(), 'Username required field should display browser-native validation state').toBe(true);
  });

  test('verify credentials with leading/trailing spaces are handled consistently.', { tag: ['@regression'] }, async ({ loginPage }) => {
    const usernameWithSpaces = `  ${ADMIN_USER.username}  `;
    const passwordWithSpaces = `  ${ADMIN_USER.password}  `;
    await loginPage.navigateTo();
    await loginPage.login(usernameWithSpaces, passwordWithSpaces);
    await expect(await loginPage.getCurrentUrl(), 'Page URL should match /auth/login').toMatch(/\/auth\/login$/);
    await expect(await loginPage.isInvalidCredentialsMessageVisible(), 'Invalid credentials message should appear').toBe(true);
  });
});
