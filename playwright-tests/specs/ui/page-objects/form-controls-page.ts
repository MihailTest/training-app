import { step } from '@config/steps-configuration';
import type { Locator, Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';
import type { EmployeeFormData, FormControlsRoute, ReviewFormData } from '@utils/types.ts';

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
  private readonly enterprisePlanRadio: Locator;
  private readonly tableSearchInput: Locator;
  private readonly employeeRows: Locator;
  private readonly nextPageButton: Locator;
  private readonly paginationSection: Locator;
  private readonly addEmployeeButton: Locator;
  private readonly firstEmployeeEditButton: Locator;
  private readonly employeeDialog: Locator;
  private readonly employeeDialogTitle: Locator;
  private readonly employeeFirstNameInput: Locator;
  private readonly employeeLastNameInput: Locator;
  private readonly employeeDepartmentInput: Locator;
  private readonly employeePositionInput: Locator;
  private readonly employeeSalaryInput: Locator;
  private readonly employeeStatusSelect: Locator;
  private readonly doubleClickActionButton: Locator;
  private readonly assignActionButton: Locator;
  private readonly rightClickDeleteButton: Locator;
  private readonly archiveTaskButton: Locator;
  private readonly completeTaskButton: Locator;
  private readonly brokenLink: Locator;
  private readonly externalDocsLink: Locator;
  private readonly homeLink: Locator;
  private readonly mediaUploadInput: Locator;
  private readonly documentUploadInput: Locator;
  private readonly downloadSampleButton: Locator;
  private readonly dynamicStatusPanel: Locator;
  private readonly enableDisableButton: Locator;
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
    this.enterprisePlanRadio = page.getByRole('radio', { name: /enterprise/i });
    this.tableSearchInput = page.getByPlaceholder(/search/i);
    this.employeeRows = page.locator('[data-testid^="table-row-"]');
    this.nextPageButton = page.getByTestId('button-pagination-next');
    this.paginationSection = page.getByTestId('section-pagination');
    this.addEmployeeButton = page.getByTestId('button-add-record');
    this.firstEmployeeEditButton = page.getByTestId('button-edit-1');
    this.employeeDialog = page.getByRole('dialog');
    this.employeeDialogTitle = this.employeeDialog.getByText(/add new employee|edit employee/i).first();
    this.employeeFirstNameInput = this.employeeDialog.locator('input[name="firstName"]');
    this.employeeLastNameInput = this.employeeDialog.locator('input[name="lastName"]');
    this.employeeDepartmentInput = this.employeeDialog.locator('input[name="email"]');
    this.employeePositionInput = this.employeeDialog.locator('input[name="age"]');
    this.employeeSalaryInput = this.employeeDialog.locator('input[name="salary"]');
    this.employeeStatusSelect = this.employeeDialog.locator('select[name="department"]');
    this.doubleClickActionButton = page.getByTestId('button-double-click');
    this.assignActionButton = page.getByRole('button', { name: /assign/i });
    this.rightClickDeleteButton = page.getByTestId('button-right-click');
    this.archiveTaskButton = page.getByTestId('button-archive');
    this.completeTaskButton = page.getByTestId('button-complete');
    this.brokenLink = page.getByTestId('link-not-found');
    this.externalDocsLink = page.getByTestId('link-external-docs');
    this.homeLink = page.getByRole('link', { name: /^home$/i });
    this.mediaUploadInput = page.getByLabel(/upload.*media|media.*upload|media file/i);
    this.documentUploadInput = page.getByTestId('input-file-upload');
    this.downloadSampleButton = page.getByTestId('button-download-sample');
    this.dynamicStatusPanel = page.getByTestId('result-panel-property-status');
    this.enableDisableButton = page.getByTestId('button-enable-disable');
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
   * Fill the review form without submitting it.
   */
  @step('fill review form without submitting')
  async fillReviewDraft(reviewData: ReviewFormData): Promise<void> {
    await this.fillReviewForm(reviewData);
    await this.ratingInput.fill(reviewData.rating ?? '');
    await this.releaseYearInput.fill(reviewData.releaseYear ?? '');
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
   * Select the enterprise plan and return updated summary text.
   */
  @step('select enterprise plan')
  async selectEnterprisePlan(): Promise<string> {
    await this.enterprisePlanRadio.click();
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
   * Move the employee table to the next page.
   */
  @step('go to next employee table page')
  async goToNextEmployeeTablePage(): Promise<void> {
    await this.nextPageButton.click();
  }

  /**
   * Read the table pagination summary text.
   */
  @step('read employee table pagination summary')
  async getEmployeeTablePaginationSummary(): Promise<string> {
    return this.paginationSection.innerText();
  }

  /**
   * Open the add employee dialog and return its title.
   */
  @step('open add employee dialog')
  async openAddEmployeeDialog(): Promise<string> {
    await this.addEmployeeButton.click();
    return this.employeeDialogTitle.innerText();
  }

  /**
   * Read visible label text inside the employee dialog.
   */
  @step('read employee dialog field labels')
  async getEmployeeDialogFieldLabels(): Promise<string[]> {
    const labels = this.employeeDialog.locator('label');
    return (await labels.allInnerTexts()).map((text) => text.trim());
  }

  /**
   * Open the first employee edit dialog and return its title.
   */
  @step('open first employee edit dialog')
  async openFirstEmployeeEditDialog(): Promise<string> {
    await this.firstEmployeeEditButton.click();
    return this.employeeDialogTitle.innerText();
  }

  /**
   * Read the current editable values from the employee dialog.
   */
  @step('read employee dialog values')
  async getEmployeeDialogValues(): Promise<EmployeeFormData> {
    return {
      firstName: await this.employeeFirstNameInput.inputValue(),
      lastName: await this.employeeLastNameInput.inputValue(),
      department: await this.employeeDepartmentInput.inputValue(),
      position: await this.employeePositionInput.inputValue(),
      salary: await this.employeeSalaryInput.inputValue(),
      status: (await this.employeeStatusSelect.inputValue()) as EmployeeFormData['status'],
    };
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
   * Trigger a right-click delete action and return action log text.
   */
  @step('right-click delete task action')
  async rightClickDeleteTaskAction(): Promise<string> {
    await this.rightClickDeleteButton.click({ button: 'right' });
    return this.getResultPanelText();
  }

  /**
   * Click archive task action and return action log text.
   */
  @step('click archive task action')
  async clickArchiveTaskAction(): Promise<string> {
    await this.archiveTaskButton.click();
    return this.getResultPanelText();
  }

  /**
   * Click complete task action and return action log text.
   */
  @step('click complete task action')
  async clickCompleteTaskAction(): Promise<string> {
    await this.completeTaskButton.click();
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
   * Follow the external docs link, then return whether a new page opened and the updated access history.
   */
  @step('follow external docs link')
  async followExternalDocsLink(): Promise<{ openedNewPage: boolean; accessHistory: string }> {
    const newPagePromise = this.page
      .context()
      .waitForEvent('page')
      .catch(() => null);
    await this.externalDocsLink.click();
    const newPage = await newPagePromise;
    if (newPage) {
      await newPage.close().catch(() => {});
    }

    return {
      openedNewPage: !!newPage,
      accessHistory: await this.getResultPanelText(),
    };
  }

  /**
   * Return from the not-found page to the Link Navigation route and return the current URL.
   */
  @step('return from not-found route to link navigation')
  async returnFromBrokenLink(): Promise<string> {
    await this.page.goBack({ waitUntil: 'load' });
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
   * Read the full visible Form Controls page content.
   */
  @step('read form controls main content text')
  async getMainContentText(): Promise<string> {
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
   * Trigger the PDF template download and return the suggested filename.
   */
  @step('download sample pdf template')
  async downloadSampleTemplate(): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadSampleButton.click();
    const download = await downloadPromise;
    return download.suggestedFilename();
  }

  /**
   * Read dynamic form status panel text.
   */
  @step('read dynamic status panel')
  async getDynamicStatus(): Promise<string> {
    return this.dynamicStatusPanel.innerText();
  }

  /**
   * Toggle advanced dynamic form options and return the updated status text.
   */
  @step('toggle advanced dynamic form options')
  async toggleAdvancedOptions(): Promise<string> {
    await this.enableDisableButton.click();
    return this.getDynamicStatus();
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
