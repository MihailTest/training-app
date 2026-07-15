import { expect } from '@playwright/test';
import { STUDENT_REGISTRATION_REQUIRED_ERROR_MESSAGES, STUDENT_REGISTRATION_SUCCESS_TITLE, VALID_STUDENT_REGISTRATION_FORM_DATA } from '@ui/test-data/user-registration/student-registration-data.ts';
import { test } from '@utils/ui-fixtures';

test.describe('student registration', () => {
  test.beforeEach(async ({ studentRegistrationPage }) => {
    await studentRegistrationPage.navigateTo();
  });

  test('happy: completes enrollment with valid student details', { tag: ['@smoke'] }, async ({ studentRegistrationPage }) => {
    await studentRegistrationPage.fillRequiredEnrollmentFields(VALID_STUDENT_REGISTRATION_FORM_DATA);
    await studentRegistrationPage.acceptTerms();
    await studentRegistrationPage.submitForm();

    await expect(studentRegistrationPage.successDialog, 'enrollment confirmation dialog should be visible').toBeVisible();
    await expect(studentRegistrationPage.successDialogTitle, 'enrollment should confirm with a success title').toHaveText(STUDENT_REGISTRATION_SUCCESS_TITLE);
    await expect(studentRegistrationPage.successDialogBody, 'success modal should include the submitted student name').toContainText(
      `${VALID_STUDENT_REGISTRATION_FORM_DATA.firstName} ${VALID_STUDENT_REGISTRATION_FORM_DATA.lastName}`
    );
    await expect(studentRegistrationPage.successDialogBody, 'success modal should include the selected course').toContainText(`Course: ${VALID_STUDENT_REGISTRATION_FORM_DATA.course}`);
    await expect(studentRegistrationPage.successDialogBody, 'success modal should include the selected experience level').toContainText(`Level: ${VALID_STUDENT_REGISTRATION_FORM_DATA.experience}`);
    await expect(studentRegistrationPage.successDialogBody, 'success modal should keep the default start date when no date is provided').toContainText('Start Date: Immediate');
    await expect(studentRegistrationPage.successDialogBody, 'success modal should include the confirmation email').toContainText(
      `A confirmation email has been sent to ${VALID_STUDENT_REGISTRATION_FORM_DATA.email}.`
    );
  });

  test('negative: empty submit shows required validation and keeps confirmation hidden', { tag: ['@regression'] }, async ({ studentRegistrationPage }) => {
    await studentRegistrationPage.submitForm();

    for (const [index, validationMessage] of studentRegistrationPage.validationMessages.entries()) {
      await expect(validationMessage, `required validation message ${index + 1} should be visible`).toHaveText(STUDENT_REGISTRATION_REQUIRED_ERROR_MESSAGES[index]);
    }
    await expect(studentRegistrationPage.validationMessages, 'empty submit should surface exactly seven validation messages').toHaveLength(STUDENT_REGISTRATION_REQUIRED_ERROR_MESSAGES.length);
    await expect(studentRegistrationPage.successDialog, 'empty submit should not open the confirmation modal').toBeHidden();
  });
});
