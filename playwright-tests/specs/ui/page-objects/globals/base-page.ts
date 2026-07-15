import type { Page } from '@playwright/test';

/**
 * Base Page class providing common functionality for all page objects
 * Keeps shared navigation and page metadata behavior in one place.
 */
export abstract class BasePage {
  constructor(public readonly page: Page) {}

  /**
   * Abstract method that must be implemented by all page objects
   * to verify that the page has loaded successfully
   */
  abstract toBeLoaded(): Promise<void>;

  /**
   * Navigate to a specific path relative to the base URL
   * @param path - Optional path to navigate to (e.g., 'jobs', 'tickets')
   * @param options - Navigation options
   */
  async navigateTo(path?: string, options: { waitUntil?: 'commit' | 'domcontentloaded' | 'load' | 'networkidle' } = { waitUntil: 'commit' }): Promise<void> {
    const normalizedPath = path ? `/${path.replace(/^\//, '')}` : '/';
    await this.page.goto(normalizedPath, options);
  }

  /**
   * Read the current page URL.
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Read the current document title.
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
