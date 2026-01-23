import type { Locator, Page, TestInfo } from '@playwright/test';

/**
 * Helpers class providing common utility functions for page interactions
 * These methods are composed into BasePage and available to all page objects
 */
export default class Helpers {
    constructor(
        public page: Page,
        // TestInfo is stored for future per-test attachments/logging helpers.
        public testInfo: TestInfo
    ) { }

    /**
     * Click on a locator with optional configuration
     * @param locator - The locator to click
     * @param options - Click options including delay and number of times
     */
    async clickOnLocator(locator: Locator, options?: { noWaitAfter?: boolean; times?: number; delay?: number }): Promise<void> {
        const times = options?.times || 1;
        for (let i = 0; i < times; i++) {
            await locator.click({
                noWaitAfter: options?.noWaitAfter,
                delay: options?.delay,
            });
        }
    }

    /**
     * Scroll to the bottom of the page
     */
    async scrollPageToBottom(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }
}
