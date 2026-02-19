import { test } from '@utils/ui-fixtures';
import { ADMIN_USER, QA_USER } from '@ui/test-data/ui-credentials.ts';

test.describe('Login', () => {
    test.use({
        storageState: { cookies: [], origins: [] }, // run login.spec.ts with a clean storage state
    });

    test('Verify admin can log in with valid credentials and reach the authenticated area', { tag: ['@smoke'] }, async ({ loginPage }) => {
        await loginPage.navigateTo();
        await loginPage.loginWithCredentials(ADMIN_USER);
        await loginPage.shouldHavePath(/\/$/);
    });

    test('Verify qa user can log in with valid credentials and reach the authenticated area', { tag: ['@regression'] }, async ({ loginPage }) => {
        await loginPage.navigateTo();
        await loginPage.loginWithCredentials(QA_USER);
        await loginPage.shouldHavePath(/\/$/);
    });

    test('Verify login fails when password is incorrect for a valid username.', { tag: ['@smoke'] }, async ({ loginPage }) => {
        const invalidPassword = `${ADMIN_USER.password}-invalid`;

        await loginPage.navigateTo();
        await loginPage.login(ADMIN_USER.username, invalidPassword);
        await loginPage.shouldHavePath(/\/auth\/login$/);
        await loginPage.expectInvalidCredentialsMessage();
    });

    test('Verify validation prevents login with missing credentials.', { tag: ['@regression'] }, async ({ loginPage }) => {
        await loginPage.navigateTo();
        await loginPage.submitLogin();
        await loginPage.shouldHavePath(/\/auth\/login$/);
        await loginPage.expectUsernameInputFocused();
        await loginPage.expectUsernameRequiredValidationMessage();
    });

    test('Verify credentials with leading/trailing spaces are handled consistently.', { tag: ['@regression'] }, async ({ loginPage }) => {
        const usernameWithSpaces = `  ${ADMIN_USER.username}  `;
        const passwordWithSpaces = `  ${ADMIN_USER.password}  `;
        await loginPage.navigateTo();
        await loginPage.login(usernameWithSpaces, passwordWithSpaces);
        await loginPage.shouldHavePath(/\/auth\/login$/);
        await loginPage.expectInvalidCredentialsMessage();
    });
});
