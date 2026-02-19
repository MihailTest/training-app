import { step } from '@config/steps-configuration';
import type { Locator, Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';
import type { UICredentials } from '@ui/test-data/ui-credentials.ts';
import { createStorageStateFileIfNotExist } from '@utils/utility-functions';

/**
 * Login Page Object
 * Handles user authentication and login page interactions
 */
export default class LoginPage extends BasePage {
  private readonly loginForm: Locator;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly rememberMe: Locator;
  private readonly loginBtn: Locator;
  private readonly loginHeading: Locator;
  private readonly logoutBtn: Locator;
  private readonly sideMenu: Locator;
  private readonly invalidCredentialsMessage: Locator;

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
    this.loginForm = page.getByTestId('form-login');
    this.username = page.getByLabel(/username/i);
    this.password = page.getByLabel(/password/i);
    this.rememberMe = page.getByLabel(/remember me/i);
    this.loginBtn = page.getByRole('button', { name: /login/i });
    this.loginHeading = page.getByRole('heading', { level: 1, name: /welcome back/i });
    this.logoutBtn = page.getByTestId('button-logout-header');
    this.sideMenu = page.getByTestId('menu-side-container');
    this.invalidCredentialsMessage = page.getByText('Invalid credentials');
  }

  /**
   * Navigate to login page
   */
  @step('navigate to login page')
  async navigateTo(): Promise<void> {
    await super.navigateTo('auth/login');
    await expect(this.username, 'Username input should be visible').toBeVisible();
  }

  /**
   * Verify login page has loaded
   */
  @step('verify login page loaded')
  async toBeLoaded(): Promise<void> {
    await expect(this.loginHeading, 'Login page heading should be visible').toBeVisible();
    await expect(this.loginForm, 'Login form should be visible').toBeVisible();
    await expect(this.username, 'Username input should be visible').toBeVisible();
    await expect(this.password, 'Password input should be visible').toBeVisible();
    await expect(this.loginBtn, 'Login button should be visible').toBeVisible();
  }

  /**
   * Fill credentials and submit login form
   * @param username
   * @param password
   */
  @step('login with provided credentials')
  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.rememberMe.check();

    await expect(this.loginBtn, 'Login button should be enabled').toBeEnabled();

    await this.helpers.clickOnLocator(this.loginBtn);
  }

  /**
   * Login using credentials object
   * @param credentials - UICredentials object
   */
  @step('login using credentials object')
  async loginWithCredentials(credentials: UICredentials): Promise<void> {
    await this.login(credentials.username, credentials.password);
    await this.waitForPostLogin();
  }

  /**
   * Logout from the application
   */
  @step('logout from the application')
  async logout(): Promise<void> {
    await expect(this.logoutBtn, 'Logout button should be visible before logging out').toBeVisible();
    await this.helpers.clickOnLocator(this.logoutBtn);
    await this.page.waitForLoadState('load');
    await this.toBeLoaded();
  }

  /**
   * Assert invalid credentials message is visible
   */
  @step('assert invalid credentials message is visible')
  async expectInvalidCredentialsMessage(): Promise<void> {
    await expect(this.invalidCredentialsMessage, 'Invalid credentials message should appear').toBeVisible();
  }

  /**
   * Check if user is logged in
   * @returns True if logoutBtn is visible
   */
  @step('check if user is logged in')
  async isLoggedIn(): Promise<boolean> {
    return await this.logoutBtn.isVisible().catch(() => false);
  }

  /**
   * Save current storage state to file
   * @param targetPath - Path to save storage state
   */
  @step('save storage state')
  async saveStorageState(targetPath: string): Promise<void> {
    await createStorageStateFileIfNotExist(targetPath);
    await this.page.context().storageState({ path: targetPath });
  }

  /**
   * Wait for post-login actions to complete
   */
  @step('wait for post-login actions')
  async waitForPostLogin(): Promise<void> {
    await expect(this.logoutBtn, 'Logout button should be visible after login').toBeVisible();
    await expect(this.sideMenu, 'Side-menu should be enabled after login').toBeEnabled();
  }

  /**
   * Submit login form without changing current field values.
   */
  @step('submit login form')
  async submitLogin(): Promise<void> {
    await expect(this.loginBtn, 'Login button should be visible before submit').toBeVisible();
    await this.helpers.clickOnLocator(this.loginBtn);
  }

  /**
   * Assert username input is focused after failed form submission.
   */
  @step('assert username input is focused')
  async expectUsernameInputFocused(): Promise<void> {
    await expect(this.username, 'Username input should be focused').toBeFocused();
  }

  /**
   * Assert browser native required-field validation message for username input.
   */
  @step('assert username required-field validation message')
  async expectUsernameRequiredValidationMessage(): Promise<void> {
    const validationMessage = await this.username.evaluate((element) => {
      if (!(element instanceof HTMLInputElement)) {
        return '';
      }

      return element.validationMessage;
    });

    await expect(validationMessage, 'Username required field should display native browser validation message').toMatch(/please fill out this field\./i);
  }
}
