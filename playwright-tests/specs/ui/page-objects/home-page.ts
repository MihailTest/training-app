import type { Locator, Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';
import { step } from '@config/steps-configuration';

export default class HomePage extends BasePage {
    private readonly mainContent: Locator;
    private readonly homeContainer: Locator;
    private readonly heroSection: Locator;
    private readonly welcomeText: Locator;
    private readonly heroDescription: Locator;
    private readonly formControlCards: Record<string, Locator>;
    private readonly studentRegistrationCard: Locator;
    private readonly categoryHeaders: Record<'browser' | 'interactive' | 'dragDrop', Locator>;
    private readonly recoveryLink: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.mainContent = page.getByTestId('main-content-container');
        this.homeContainer = page.getByTestId('page-home-container');
        this.heroSection = page.getByTestId('section-hero');
        this.welcomeText = page.getByTestId('text-welcome');
        this.heroDescription = page.getByTestId('text-hero-description');
        this.formControlCards = {
            textInput: page.getByTestId('link-text-input'),
            nestedCheckboxes: page.getByTestId('link-nested-checkboxes'),
            radioSelection: page.getByTestId('link-radio-selection'),
            dataTable: page.getByTestId('link-data-table'),
            buttonInteractions: page.getByTestId('link-button-interactions'),
            linkNavigation: page.getByTestId('link-link-navigation'),
            mediaValidation: page.getByTestId('link-media-validation'),
            fileOperations: page.getByTestId('link-file-operations'),
            dynamicElements: page.getByTestId('link-dynamic-elements'),
        };
        this.studentRegistrationCard = page.getByTestId('link-student-registration');
        this.categoryHeaders = {
            browser: page.locator('#browser-interactions h2'),
            interactive: page.locator('#interactive-components h2'),
            dragDrop: page.locator('#drag-drop h2'),
        };
        this.recoveryLink = page.getByRole('link', { name: /home/i }).first();
    }

    /**
     * Navigate to the application home hub.
     */
    @step('navigate to the home hub')
    async navigateTo(): Promise<void> {
        await super.navigateTo('');
        await this.toBeLoaded();
    }

    /**
     * Verify the home page core containers are loaded and visible.
     */
    @step('verify home hub is loaded')
    async toBeLoaded(): Promise<void> {
        await expect(this.mainContent, 'main container should be visible').toBeVisible();
        await expect(this.homeContainer, 'home container should be visible').toBeVisible();
        await expect(this.heroSection, 'hero section should be visible').toBeVisible();
    }

    /**
     * Validate hero section title and description copy.
     */
    @step('verify hero section copy and cards')
    async verifyHeroCopy(): Promise<void> {
        await expect(this.welcomeText, 'welcome copy should match expectation').toHaveText(
            'Welcome to rotaru.qa-ui-practice-hub'
        );
        await expect(this.heroDescription, 'hero description should match copy').toHaveText(
            'UI playground to exercise complex interaction scenarios and edge cases'
        );
    }

    /**
     * Verify that all core Form Controls cards are visible.
     */
    @step('verify form control cards exist')
    async verifyFormControlCards(): Promise<void> {
        for (const [name, locator] of Object.entries(this.formControlCards)) {
            await expect(locator, `${name} card should be visible`).toBeVisible();
        }
    }

    /**
     * Verify all top-level category headers are rendered with expected text.
     */
    @step('verify category headers render')
    async verifyCategoryHeaders(): Promise<void> {
        await expect(this.categoryHeaders.browser, 'browser interactions header should exist').toHaveText(
            'Browser Interactions'
        );
        await expect(this.categoryHeaders.interactive, 'interactive components header should exist').toHaveText(
            'Interactive Components'
        );
        await expect(this.categoryHeaders.dragDrop, 'drag & drop header should exist').toHaveText('Drag & Drop');
    }

    /**
     * Click a home card and wait until the target route is loaded.
     * @param dataTestId - The card `data-testid` locator key to click.
     * @param expectedPath - The expected URL path suffix after navigation.
     */
    @step('click selected card and wait for expected route')
    async clickCard(dataTestId: string, expectedPath: string): Promise<void> {
        const card = this.page.getByTestId(dataTestId);
        await expect(card, `${dataTestId} should be visible`).toBeVisible();
        await Promise.all([
            this.page.waitForURL(new RegExp(`${expectedPath}$`)),
            this.helpers.clickOnLocator(card),
        ]);
    }

    /**
     * Navigate to an invalid path and wait for route change.
     * @param path - Invalid path used to simulate not-found route handling.
     */
    @step('navigate to an invalid route')
    async navigateToInvalidRoute(path: string): Promise<void> {
        await this.page.goto(`${process.env.BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });
    }

    /**
     * Return to home from browser history and verify page readiness.
     */
    @step('go back and verify home loaded')
    async goBackToHome(): Promise<void> {
        await this.page.goBack({ waitUntil: 'load' });
        await this.toBeLoaded();
    }

    /**
     * Set viewport to a mobile profile used in responsive checks.
     */
    @step('set mobile viewport')
    async setMobileViewport(): Promise<void> {
        await this.page.setViewportSize({ width: 390, height: 844 });
    }

    /**
     * Set viewport to a desktop profile used in responsive checks.
     */
    @step('set desktop viewport')
    async setDesktopViewport(): Promise<void> {
        await this.page.setViewportSize({ width: 1440, height: 900 });
    }

    /**
     * Ensure the page has no horizontal overflow at current viewport.
     */
    @step('verify no horizontal overflow')
    async expectNoHorizontalOverflow(): Promise<void> {
        const hasNoOverflow = await this.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
        await expect(hasNoOverflow, 'page should not have horizontal overflow').toBe(true);
    }

    /**
     * Scroll a specific card into view before interaction.
     * @param dataTestId - Card `data-testid` to scroll into viewport.
     */
    @step('scroll selected card into view')
    async scrollCardIntoView(dataTestId: string): Promise<void> {
        const card = this.page.getByTestId(dataTestId);
        await expect(card, `${dataTestId} should be visible before scrolling`).toBeVisible();
        await card.scrollIntoViewIfNeeded();
    }

    /**
     * Verify desktop viewport width is above a minimum threshold.
     * @param minWidth - Minimum expected width in pixels.
     */
    @step('verify desktop viewport minimum width')
    async expectViewportWidthGreaterThan(minWidth: number): Promise<void> {
        const viewportWidth = await this.page.evaluate(() => document.documentElement.clientWidth);
        await expect(viewportWidth, `desktop viewport width should be greater than ${minWidth}`).toBeGreaterThan(minWidth);
    }

    /**
     * Recover from bad route by returning to Home and validating readiness.
     */
    @step('recover via home link')
    async recoverFromBadRoute(): Promise<void> {
        if (await this.recoveryLink.count()) {
            await expect(this.recoveryLink, 'home recovery link should be visible').toBeVisible();
            await Promise.all([
                this.page.waitForURL(/\/$/),
                this.helpers.clickOnLocator(this.recoveryLink),
            ]);
        } else {
            await this.page.goto('/', { waitUntil: 'load' });
        }
        await this.toBeLoaded();
    }

    /**
     * Verify student registration card visibility on home hub.
     */
    @step('ensure student registration card is visible')
    async verifyStudentRegistrationCard(): Promise<void> {
        await expect(this.studentRegistrationCard, 'student registration card should be visible').toBeVisible();
    }
}
