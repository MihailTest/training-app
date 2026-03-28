import type { Page, TestInfo } from '@playwright/test';
import Helpers from '@ui/page-objects/globals/helpers';

/**
 * Base Page class providing common functionality for all page objects
 * Follows the Page Object Model pattern with helper composition
 */
export abstract class BasePage {
  readonly helpers: Helpers;

  constructor(
    public page: Page,
    // TestInfo gives per-test metadata for logging, attachments, and artifact naming.
    // Keep this available so future helpers can write per-test artifacts (screenshots, logs, traces).
    public testInfo: TestInfo
  ) {
    this.helpers = new Helpers(page, testInfo);
  }

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
}
