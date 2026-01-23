import { test, expect } from '@utils/ui-fixtures';
import { ADMIN_USER, QA_USER } from '@ui/test-data/ui-credentials.ts';

test.describe('Login', () => {
    test.use({
        storageState: { cookies: [], origins: [] }, // run login.spec.ts with a clean storage state
    });

    test('Verify admin can log in with valid credentials and reach the authenticated area', { tag: ['@smoke'] }, async ({ loginPage }) => {

        await loginPage.navigateTo();
        await loginPage.loginWithCredentials(ADMIN_USER);

        expect(await loginPage.shouldHavePath('/'))
        expect(await loginPage.waitForPostLogin())
    });

    test('Verify qa user can log in with valid credentials and reach the authenticated area', { tag: ['@regression'] }, async ({ loginPage }) => {

        await loginPage.navigateTo();
        await loginPage.loginWithCredentials(QA_USER);

        expect(await loginPage.shouldHavePath('/'))
        expect(await loginPage.waitForPostLogin())
    });

    test('Verify login fails when password is incorrect for a valid username.', { tag: ['@smoke'] }, async ({ page, loginPage }) => {
        const invalidPassword = `${ADMIN_USER.password}-invalid`;

        await loginPage.navigateTo();
        await loginPage.login(ADMIN_USER.username, invalidPassword);

        expect(await loginPage.shouldHavePath('auth/login'))
        await expect(page.getByText('Invalid credentials')).toBeVisible()
    });

    test('Verify validation prevents login with missing credentials.', { tag: ['@regression'] }, async ({ page, loginPage }) => {
        const username = page.getByTestId('input-username')

        await loginPage.navigateTo();
        await page.getByRole('button', { name: /login/i }).click();

        expect(await loginPage.shouldHavePath('auth/login'))
        await expect(username).toBeFocused() // Ensures the Locator points to a focused DOM node.

        const msg = await username.evaluate(el => (el as HTMLInputElement).validationMessage); // error validation message is native browser form validation
        expect(msg).toMatch(/please fill out this field./i);

    });

    test('Verify credentials with leading/trailing spaces are handled consistently.', { tag: ['@regression'] }, async ({ page, loginPage }) => {

        const usernameWithSpaces = `  ${ADMIN_USER.username}  `;
        const passwordWithSpaces = `  ${ADMIN_USER.password}  `;

        await loginPage.navigateTo();
        await loginPage.login(usernameWithSpaces, passwordWithSpaces);
        await expect(page.getByText('Invalid credentials')).toBeVisible()
    });
});
