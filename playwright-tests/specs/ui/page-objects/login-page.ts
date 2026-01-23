import type { Locator, Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';
import type { UICredentials } from '@ui/test-data/ui-credentials.ts';
import { step } from '@config/steps-configuration'
import { createStorageStateFileIfNotExist } from '@utils/utility-functions';

/**
 * Login Page Object
 * Handles user authentication and login page interactions
 */
export default class LoginPage extends BasePage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly rememberMe: Locator;
    private readonly loginBtn: Locator;
    private readonly logoutBtn: Locator;
    private readonly sideMenu: Locator

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.username = page.getByTestId('input-username');
        this.password = page.getByTestId('input-password');
        this.rememberMe = page.getByRole('checkbox', { name: /remember/i });
        this.loginBtn = page.getByRole('button', { name: /login/i });
        this.logoutBtn = page.getByTestId('button-logout-header');
        this.sideMenu = page.getByTestId('menu-side-container');
    }

    /**
     * Navigate to login page
     */
    @step('navigate to login page')
    async navigateTo(): Promise<void> {
        await super.navigateTo('auth/login');
        await expect(this.username, 'Email input should be visible').toBeVisible();
    }

    /**
     * Verify login page has loaded
     */
    @step('verify login page loaded')
    async toBeLoaded(): Promise<void> {
        await expect(this.username, 'Email input should be visible').toBeVisible();
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
    async waitForPostLogin(): Promise<void> {
        await expect(this.logoutBtn, 'Logout button should be visible after login').toBeVisible();
        await expect(this.sideMenu, 'Side-menu should be enabled after login').toBeEnabled();
    }
}
