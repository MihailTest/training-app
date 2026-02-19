import type { Page, TestInfo } from '@playwright/test';
import { test as baseTest } from '@playwright/test';
import HomePage from '@ui/page-objects/home-page.ts';
import LoginPage from '@ui/page-objects/login-page.ts';

/**
 * Extended fixtures interface for UI testing
 * Provides page objects as fixtures for easy access in tests
 */
interface TrainingFixtures {
  loginPage: LoginPage;
  homePage: HomePage;
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
  // Pass TestInfo through so page objects can attach per-test artifacts in the future.
  loginPage: async ({ page }: { page: Page }, use, testInfo: TestInfo) => {
    await use(new LoginPage(page, testInfo));
  },
  homePage: async ({ page }: { page: Page }, use, testInfo: TestInfo) => {
    await use(new HomePage(page, testInfo));
  },
});
