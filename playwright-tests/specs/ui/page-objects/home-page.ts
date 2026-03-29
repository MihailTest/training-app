import { step } from '@config/steps-configuration';
import type { Locator, Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';

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
    this.mainContent = page.getByRole('main');
    this.homeContainer = page.getByTestId('page-home-container');
    this.heroSection = page.getByTestId('section-hero');
    this.welcomeText = this.heroSection.getByRole('heading', { level: 1 });
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
   * Click a home card and wait until the target route is loaded.
   * @param dataTestId - The card `data-testid` locator key to click.
   * @param expectedPath - The expected URL path suffix after navigation.
   */
  @step('click selected card and wait for expected route')
  async clickCard(dataTestId: string, expectedPath: string): Promise<void> {
    const card = this.formControlCards[dataTestId] ?? this.page.getByTestId(dataTestId);
    await card.waitFor({ state: 'visible' });
    await Promise.all([this.page.waitForURL(new RegExp(`${expectedPath}$`)), this.helpers.clickOnLocator(card)]);
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
   * Read hero section title copy.
   */
  @step('read hero title copy')
  async getHeroTitleCopy(): Promise<string> {
    return await this.welcomeText.innerText();
  }

  /**
   * Read hero section description copy.
   */
  @step('read hero description copy')
  async getHeroDescriptionCopy(): Promise<string> {
    return await this.heroDescription.innerText();
  }

  /**
   * Check visibility for all core Form Controls cards.
   */
  @step('read form control card visibility')
  async getFormControlCardVisibility(): Promise<Record<string, boolean>> {
    const entries = await Promise.all(Object.entries(this.formControlCards).map(async ([name, locator]) => [name, await locator.isVisible()] as const));
    return Object.fromEntries(entries);
  }

  /**
   * Assert all Form Controls cards are visible.
   */
  @step('verify form control cards are visible')
  async expectFormControlCardsVisible(): Promise<void> {
    for (const [name, locator] of Object.entries(this.formControlCards)) {
      await expect(locator, `${name} card should be visible`).toBeVisible();
    }
  }

  /**
   * Read top-level category header text.
   */
  @step('read category header copy')
  async getCategoryHeaderCopy(): Promise<Record<'browser' | 'interactive' | 'dragDrop', string>> {
    const [browser, interactive, dragDrop] = await Promise.all([this.categoryHeaders.browser.innerText(), this.categoryHeaders.interactive.innerText(), this.categoryHeaders.dragDrop.innerText()]);
    return { browser, interactive, dragDrop };
  }

  /**
   * Read the User Registration section header text.
   */
  @step('read user registration header copy')
  async getUserRegistrationHeaderCopy(): Promise<string> {
    return await this.page.getByRole('heading', { level: 2, name: /user registration/i }).innerText();
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
      await Promise.all([this.page.waitForURL(/\/$/), this.helpers.clickOnLocator(this.recoveryLink)]);
    } else {
      await this.page.goto('/', { waitUntil: 'load' });
    }
    await this.toBeLoaded();
  }

  /**
   * Check student registration card visibility on home hub.
   */
  @step('check student registration card visibility')
  async isStudentRegistrationCardVisible(): Promise<boolean> {
    return await this.studentRegistrationCard.isVisible();
  }

  /**
   * Assert student registration card is visible.
   */
  @step('verify student registration card visibility')
  async expectStudentRegistrationCardVisible(): Promise<void> {
    await expect(this.studentRegistrationCard, 'student registration card should be visible').toBeVisible();
  }
}
