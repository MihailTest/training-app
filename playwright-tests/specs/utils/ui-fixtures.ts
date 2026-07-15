import { test as baseTest } from '@playwright/test';
import FormControlsPage from '@ui/page-objects/form-controls-page.ts';
import HomePage from '@ui/page-objects/home-page.ts';
import LoginPage from '@ui/page-objects/login-page.ts';
import StudentRegistrationPage from '@ui/page-objects/student-registration-page.ts';

/**
 * Extended fixtures interface for UI testing
 * Provides page objects as fixtures for easy access in tests
 */
interface TrainingFixtures {
  loginPage: LoginPage;
  homePage: HomePage;
  formControlsPage: FormControlsPage;
  studentRegistrationPage: StudentRegistrationPage;
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
export const test = baseTest.extend<TrainingFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  formControlsPage: async ({ page }, use) => {
    await use(new FormControlsPage(page));
  },
  studentRegistrationPage: async ({ page }, use) => {
    await use(new StudentRegistrationPage(page));
  },
});
