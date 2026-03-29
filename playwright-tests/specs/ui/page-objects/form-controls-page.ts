import { step } from '@config/steps-configuration';
import type { Locator, Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';
import type { FormControlsRoute, ReviewFormData } from '@utils/types.ts';

export default class FormControlsPage extends BasePage {
  private readonly mainContent: Locator;
  private readonly pageTitle: Locator;
  private readonly resultPanelContent: Locator;
  private readonly movieTitleInput: Locator;
  private readonly emailInput: Locator;
  private readonly reviewTextInput: Locator;
  private readonly ratingInput: Locator;
  private readonly releaseYearInput: Locator;
  private readonly submitFormButton: Locator;
  private readonly nestedReactLabel: Locator;
  private readonly nestedTypescriptLabel: Locator;
  private readonly resetButton: Locator;
  private readonly professionalPlanRadio: Locator;
  private readonly tableSearchInput: Locator;
  private readonly employeeRows: Locator;
  private readonly doubleClickActionButton: Locator;
  private readonly assignActionButton: Locator;
  private readonly brokenLink: Locator;
  private readonly homeLink: Locator;
  private readonly mediaUploadInput: Locator;
  private readonly documentUploadInput: Locator;
  private readonly dynamicStatusPanel: Locator;
  private readonly addCustomFieldButton: Locator;

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
    this.mainContent = page.getByRole('main');
    this.pageTitle = this.mainContent.getByRole('heading', { level: 1 });
    this.resultPanelContent = page.getByTestId('result-panel-content');
    this.movieTitleInput = page.getByTestId('input-full-name');
    this.emailInput = page.getByTestId('input-email');
    this.reviewTextInput = page.getByTestId('input-current-address');
    this.ratingInput = page.getByLabel(/rating/i);
    this.releaseYearInput = page.getByLabel(/year/i);
    this.submitFormButton = page.getByRole('button', { name: /submit/i });
    this.nestedReactLabel = page.getByRole('checkbox', { name: /react/i });
    this.nestedTypescriptLabel = page.getByRole('checkbox', { name: /typescript/i });
    this.resetButton = page.getByRole('button', { name: /reset/i });
    this.professionalPlanRadio = page.getByRole('radio', { name: /professional/i });
    this.tableSearchInput = page.getByPlaceholder(/search/i);
    this.employeeRows = page.locator('[data-testid^="table-row-"]');
    this.doubleClickActionButton = page.getByTestId('button-double-click');
    this.assignActionButton = page.getByRole('button', { name: /assign/i });
    this.brokenLink = page.getByTestId('link-not-found');
    this.homeLink = page.getByRole('link', { name: /^home$/i });
    this.mediaUploadInput = page.getByLabel(/upload.*media|media.*upload|media file/i);
    this.documentUploadInput = page.getByTestId('input-file-upload');
    this.dynamicStatusPanel = page.getByTestId('result-panel-property-status');
    this.addCustomFieldButton = page.getByRole('button', { name: /add custom field/i });
  }

  /**
   * Navigate to a specific Form Controls page and verify readiness.
   */
  @step('navigate to form controls route')
  async navigateToRoute(route: FormControlsRoute): Promise<void> {
    await super.navigateTo(`form-controls/${route}`);
    await this.toBeLoaded();
  }

  /**
   * Verify common Form Controls containers are visible.
   */
  @step('verify form controls page is loaded')
  async toBeLoaded(): Promise<void> {
    await expect(this.mainContent, 'main content should be visible').toBeVisible();
    await expect(this.pageTitle, 'page title should be visible').toBeVisible();
  }

  /**
   * Submit a valid review payload and return resulting summary text.
   */
  @step('submit valid review data')
  async submitValidReview(reviewData: ReviewFormData): Promise<string> {
    await this.fillReviewForm(reviewData);
    await this.ratingInput.fill(reviewData.rating ?? '');
    await this.releaseYearInput.fill(reviewData.releaseYear ?? '');
    await this.submitFormButton.click();
    return this.getResultPanelText();
  }

  /**
   * Submit a review payload that violates minimum text length and return summary text.
   */
  @step('submit short review data')
  async submitShortReview(reviewData: ReviewFormData): Promise<string> {
    await this.fillReviewForm(reviewData);
    await this.submitFormButton.click();
    return this.getResultPanelText();
  }

  /**
   * Select representative nested skills and return summary text.
   */
  @step('select nested skill tags')
  async selectNestedSkills(): Promise<string> {
    await this.nestedReactLabel.click();
    await this.nestedTypescriptLabel.click();
    return this.getResultPanelText();
  }

  /**
   * Reset nested skills state and return summary text.
   */
  @step('reset nested skills')
  async resetNestedSkills(): Promise<string> {
    await this.resetButton.click();
    return this.getResultPanelText();
  }

  /**
   * Read current radio-plan summary text.
   */
  @step('read radio plan summary')
  async getRadioSummary(): Promise<string> {
    return this.getResultPanelText();
  }

  /**
   * Select the professional plan and return updated summary text.
   */
  @step('select professional plan')
  async selectProfessionalPlan(): Promise<string> {
    await this.professionalPlanRadio.click();
    return this.getResultPanelText();
  }

  /**
   * Search employee table and return visible row count.
   */
  @step('search employee table')
  async searchEmployeeTable(term: string): Promise<number> {
    await this.tableSearchInput.fill(term);
    return this.employeeRows.count();
  }

  /**
   * Read visible employee table row count without changing filters.
   */
  @step('read visible employee rows count')
  async getVisibleEmployeeRowsCount(): Promise<number> {
    await this.employeeRows.first().waitFor({ state: 'visible' });
    return this.employeeRows.count();
  }

  /**
   * Trigger a single click on the double-click action button and return action log text.
   */
  @step('single-click double-click action')
  async singleClickDoubleAction(): Promise<string> {
    await this.doubleClickActionButton.click();
    return this.getResultPanelText();
  }

  /**
   * Trigger a double click on the create action and return action log text.
   */
  @step('double-click create action')
  async doubleClickCreateAction(): Promise<string> {
    await this.doubleClickActionButton.dblclick();
    return this.getResultPanelText();
  }

  /**
   * Click assign task action and return action log text.
   */
  @step('click assign task action')
  async clickAssignTaskAction(): Promise<string> {
    await this.assignActionButton.click();
    return this.getResultPanelText();
  }

  /**
   * Follow the broken link and return destination URL.
   */
  @step('follow broken navigation link')
  async followBrokenLink(): Promise<string> {
    await Promise.all([this.page.waitForURL(/\/not-found$/), this.brokenLink.click()]);
    return this.page.url();
  }

  /**
   * Follow the home link and return destination URL.
   */
  @step('follow home navigation link')
  async followHomeLink(): Promise<string> {
    await Promise.all([this.page.waitForURL(/\/$/), this.homeLink.click()]);
    return this.page.url();
  }

  /**
   * Upload a media file and return full main-content text for validation checks.
   */
  @step('upload media file')
  async uploadMediaFile(filePath: string): Promise<string> {
    await this.mediaUploadInput.setInputFiles(filePath);
    return this.mainContent.innerText();
  }

  /**
   * Upload a file in document operations and return summary panel text.
   */
  @step('upload file operation input')
  async uploadDocumentFile(filePath: string): Promise<string> {
    await this.documentUploadInput.setInputFiles(filePath);
    return this.getResultPanelText();
  }

  /**
   * Read dynamic form status panel text.
   */
  @step('read dynamic status panel')
  async getDynamicStatus(): Promise<string> {
    return this.dynamicStatusPanel.innerText();
  }

  /**
   * Add one custom field and return updated dynamic status text.
   */
  @step('add a custom dynamic field')
  async addCustomField(): Promise<string> {
    await this.addCustomFieldButton.click();
    return this.getDynamicStatus();
  }

  /**
   * Reset current page state using visible Reset action.
   */
  @step('reset current form control state')
  async resetState(): Promise<void> {
    await this.resetButton.click();
  }

  /**
   * Read shared result panel text and trim whitespace.
   */
  @step('read result panel text')
  async getResultPanelText(): Promise<string> {
    return (await this.resultPanelContent.innerText()).trim();
  }

  private async fillReviewForm(reviewData: ReviewFormData): Promise<void> {
    await this.movieTitleInput.fill(reviewData.movieTitle);
    await this.emailInput.fill(reviewData.reviewerEmail);
    await this.reviewTextInput.fill(reviewData.reviewText);
  }
}
