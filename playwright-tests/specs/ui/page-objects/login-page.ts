import { step } from '@config/steps-configuration';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';
import type { UICredentials } from '@ui/test-data/ui-credentials.ts';

/**
 * Login Page Object
 * Handles user authentication and login page interactions
 */
export default class LoginPage extends BasePage {
  private readonly loginForm: Locator;
  readonly usernameInput: Locator;
  readonly logoutButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  private readonly passwordInput: Locator;
  private readonly rememberMe: Locator;
  private readonly loginBtn: Locator;
  private readonly loginHeading: Locator;
  private readonly sideMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.loginForm = page.getByTestId('form-login');
    this.usernameInput = page.getByLabel(/username/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.rememberMe = page.getByLabel(/remember me/i);
    this.loginBtn = page.getByRole('button', { name: /login/i });
    this.loginHeading = page.getByRole('heading', { level: 1, name: /welcome back/i });
    this.logoutButton = page.getByTestId('button-logout-header');
    this.sideMenu = page.getByTestId('menu-side-container');
    this.invalidCredentialsMessage = page.getByText('Invalid credentials');
  }

  /**
   * Navigate to login page
   */
  @step('navigate to login page')
  async navigateTo(): Promise<void> {
    await super.navigateTo('auth/login');
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  /**
   * Navigate to login route without waiting for the login form.
   * Useful for redirect checks when the current session may already be authenticated.
   */
  @step('navigate to login route without form readiness check')
  async navigateToRoute(): Promise<void> {
    await super.navigateTo('auth/login');
  }

  /**
   * Verify login page has loaded
   */
  @step('verify login page loaded')
  async toBeLoaded(): Promise<void> {
    await expect(this.loginHeading, 'Login page heading should be visible').toBeVisible();
    await expect(this.loginForm, 'Login form should be visible').toBeVisible();
    await expect(this.usernameInput, 'Username input should be visible').toBeVisible();
    await expect(this.passwordInput, 'Password input should be visible').toBeVisible();
    await expect(this.loginBtn, 'Login button should be visible').toBeVisible();
  }

  /**
   * Fill credentials and submit login form
   * @param username
   * @param password
   */
  @step('login with provided credentials')
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.rememberMe.check();
    await this.loginBtn.waitFor({ state: 'visible' });
    await this.loginBtn.click();
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
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
    await this.page.waitForLoadState('load');
    await this.toBeLoaded();
  }

  /**
   * Wait for post-login actions to complete
   */
  @step('wait for post-login actions')
  async waitForPostLogin(): Promise<void> {
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.sideMenu.waitFor({ state: 'visible' });
  }

  /**
   * Submit login form without changing current field values.
   */
  @step('submit login form')
  async submitLogin(): Promise<void> {
    await this.loginBtn.waitFor({ state: 'visible' });
    await this.loginBtn.click();
  }

  /**
   * Check browser-native required-field validation state for username input.
   */
  @step('check username required-field validation')
  async isUsernameValueMissing(): Promise<boolean> {
    return await this.usernameInput.evaluate((element) => {
      if (!(element instanceof HTMLInputElement)) {
        return false;
      }

      return element.validity.valueMissing;
    });
  }
}
