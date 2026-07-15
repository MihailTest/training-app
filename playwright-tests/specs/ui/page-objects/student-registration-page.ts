import { step } from '@config/steps-configuration';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@ui/page-objects/globals/base-page';
import type { StudentRegistrationFormData } from '@utils/types.ts';

export default class StudentRegistrationPage extends BasePage {
  readonly successDialog: Locator;
  readonly successDialogTitle: Locator;
  readonly successDialogBody: Locator;
  readonly validationMessages: readonly Locator[];
  private readonly mainContent: Locator;
  private readonly formContainer: Locator;
  private readonly pageTitle: Locator;
  private readonly registrationForm: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly mobileInput: Locator;
  private readonly courseSelect: Locator;
  private readonly beginnerExperienceRadio: Locator;
  private readonly intermediateExperienceRadio: Locator;
  private readonly advancedExperienceRadio: Locator;
  private readonly termsCheckbox: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.mainContent = page.getByRole('main');
    this.formContainer = page.getByTestId('section-form-container');
    this.pageTitle = this.mainContent.getByRole('heading', { level: 1, name: /online course enrollment/i });
    this.registrationForm = page.getByTestId('form-practice');
    this.firstNameInput = page.getByLabel(/first name/i);
    this.lastNameInput = page.getByLabel(/last name/i);
    this.emailInput = page.getByLabel(/email address/i);
    this.mobileInput = page.getByLabel(/phone number/i);
    this.courseSelect = page.getByLabel(/select course/i);
    this.beginnerExperienceRadio = page.getByRole('radio', { name: /beginner/i });
    this.intermediateExperienceRadio = page.getByRole('radio', { name: /intermediate/i });
    this.advancedExperienceRadio = page.getByRole('radio', { name: /advanced/i });
    this.termsCheckbox = page.getByLabel(/i agree to the terms and conditions/i);
    this.submitButton = page.getByRole('button', { name: /complete enrollment/i });
    this.successDialog = page.getByTestId('modal-form-success');
    this.successDialogTitle = this.successDialog.getByRole('heading', { level: 2, name: /enrollment confirmed/i });
    this.successDialogBody = this.successDialog.getByTestId('modal-body-content');
    this.validationMessages = [
      this.registrationForm.getByTestId('error-first-name'),
      this.registrationForm.getByTestId('error-last-name'),
      this.registrationForm.getByTestId('error-email'),
      this.registrationForm.getByTestId('error-mobile'),
      this.registrationForm.getByText(/^Please select a course$/i),
      this.registrationForm.getByTestId('error-gender'),
      this.registrationForm.getByText(/^You must agree to the terms$/i),
    ];
  }

  /**
   * Navigate to the student registration page and verify readiness.
   */
  @step('navigate to student registration page')
  async navigateTo(): Promise<void> {
    await super.navigateTo('user-registration/student-form');
    await this.toBeLoaded();
  }

  /**
   * Verify the student registration page core containers are visible.
   */
  @step('verify student registration page is loaded')
  async toBeLoaded(): Promise<void> {
    await expect(this.mainContent, 'main content should be visible').toBeVisible();
    await expect(this.formContainer, 'registration form container should be visible').toBeVisible();
    await expect(this.pageTitle, 'page title should be visible').toBeVisible();
  }

  /**
   * Fill the required enrollment fields except the terms checkbox.
   */
  @step('fill required enrollment fields')
  async fillRequiredEnrollmentFields(formData: StudentRegistrationFormData): Promise<void> {
    await this.firstNameInput.fill(formData.firstName);
    await this.lastNameInput.fill(formData.lastName);
    await this.emailInput.fill(formData.email);
    await this.mobileInput.fill(formData.mobile);
    await this.courseSelect.selectOption(formData.course);
    await this.selectExperienceLevel(formData.experience);
  }

  /**
   * Accept the student registration terms checkbox.
   */
  @step('accept student registration terms')
  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  /**
   * Submit the student registration form.
   */
  @step('submit student registration form')
  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  private async selectExperienceLevel(level: StudentRegistrationFormData['experience']): Promise<void> {
    const experienceRadio = level === 'Beginner' ? this.beginnerExperienceRadio : level === 'Intermediate' ? this.intermediateExperienceRadio : this.advancedExperienceRadio;

    await experienceRadio.check();
  }
}
