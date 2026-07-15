import { step } from '@config/steps-configuration';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';

export default class HomePage extends BasePage {
  readonly welcomeText: Locator;
  readonly heroHeading: Locator;
  readonly heroDescription: Locator;
  readonly formControlCards: Readonly<Record<string, Locator>>;
  readonly studentRegistrationCard: Locator;
  readonly categoryHeaders: Readonly<Record<'browser' | 'interactive' | 'dragDrop', Locator>>;
  readonly userRegistrationHeader: Locator;
  readonly pageHeading: Locator;
  private readonly mainContent: Locator;
  private readonly homeContainer: Locator;
  private readonly heroSection: Locator;
  private readonly recoveryLink: Locator;

  constructor(page: Page) {
    super(page);
    this.mainContent = page.getByRole('main');
    this.homeContainer = page.getByTestId('page-home-container');
    this.heroSection = page.getByTestId('section-hero');
    this.welcomeText = this.heroSection.getByTestId('text-welcome');
    this.heroHeading = this.heroSection.getByRole('heading', { level: 1 });
    this.heroDescription = this.heroSection.getByText(/UI playground to exercise/i);
    this.formControlCards = {
      'link-text-input': page.getByRole('link', { name: /text input/i }),
      'link-nested-checkboxes': page.getByRole('link', { name: /nested checkboxes/i }),
      'link-radio-selection': page.getByRole('link', { name: /radio selection/i }),
      'link-data-table': page.getByRole('link', { name: /data table/i }),
      'link-button-interactions': page.getByRole('link', { name: /button interactions/i }),
      'link-link-navigation': page.getByRole('link', { name: /link navigation/i }),
      'link-media-validation': page.getByRole('link', { name: /media validation/i }),
      'link-file-operations': page.getByRole('link', { name: /file operations/i }),
      'link-dynamic-elements': page.getByRole('link', { name: /dynamic elements/i }),
      'link-window-management': page.getByRole('link', { name: /window management/i }),
      'link-draggable-elements': page.getByRole('link', { name: /draggable elements/i }),
    };
    this.studentRegistrationCard = page.getByRole('link', { name: /student registration/i });
    this.categoryHeaders = {
      browser: page.getByRole('heading', { level: 2, name: /browser interactions/i }),
      interactive: page.getByRole('heading', { level: 2, name: /interactive components/i }),
      dragDrop: page.getByRole('heading', { level: 2, name: /drag & drop/i }),
    };
    this.userRegistrationHeader = page.getByRole('heading', { level: 2, name: /user registration/i });
    this.pageHeading = this.mainContent.getByRole('heading', { level: 1 });
    this.recoveryLink = page.getByRole('link', { name: /back to home/i });
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
   * Click a home card and wait until the target route is loaded.
   * @param dataTestId - The card `data-testid` locator key to click.
   * @param expectedPath - The expected URL path suffix after navigation.
   */
  @step('click selected card and wait for expected route')
  async clickCard(dataTestId: string, expectedPath: string): Promise<void> {
    const card = this.formControlCards[dataTestId] ?? this.page.getByTestId(dataTestId);
    await card.waitFor({ state: 'visible' });
    await Promise.all([this.page.waitForURL(new RegExp(`${expectedPath}$`)), card.click()]);
  }

  /**
   * Navigate to an invalid path and wait for route change.
   * @param path - Invalid path used to simulate not-found route handling.
   */
  @step('navigate to an invalid route')
  async navigateToInvalidRoute(path: string): Promise<void> {
    const normalizedPath = path.replace(/^\//, '');
    await super.navigateTo(normalizedPath, { waitUntil: 'domcontentloaded' });
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
   * Read whether the page has horizontal overflow at the current viewport.
   */
  @step('read horizontal overflow state')
  async hasNoHorizontalOverflow(): Promise<boolean> {
    return await this.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  }

  /**
   * Scroll a specific card into view before interaction.
   * @param dataTestId - Card `data-testid` to scroll into viewport.
   */
  @step('scroll selected card into view')
  async scrollCardIntoView(dataTestId: string): Promise<void> {
    const card = this.formControlCards[dataTestId] ?? this.page.getByTestId(dataTestId);
    await card.waitFor({ state: 'visible' });
    await card.scrollIntoViewIfNeeded();
  }

  /**
   * Read current viewport width.
   */
  @step('read viewport width')
  async getViewportWidth(): Promise<number> {
    return await this.page.evaluate(() => document.documentElement.clientWidth);
  }

  /**
   * Recover from bad route by returning to Home and validating readiness.
   */
  @step('recover via home link')
  async recoverFromBadRoute(): Promise<void> {
    if (await this.recoveryLink.count()) {
      await this.recoveryLink.waitFor({ state: 'visible' });
      await Promise.all([this.page.waitForURL(/\/$/), this.recoveryLink.click()]);
    } else {
      await this.page.goto('/', { waitUntil: 'load' });
    }
    await this.toBeLoaded();
  }
}
