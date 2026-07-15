import path from 'node:path';

import { expect } from '@playwright/test';
import { EMPLOYEE_DIALOG_FIELD_LABELS, FIRST_EMPLOYEE_FORM_DATA, SHORT_REVIEW_FORM_DATA, TABLE_SEARCH_TERMS, VALID_REVIEW_FORM_DATA } from '@ui/test-data/form-controls/form-controls-data.ts';
import { test } from '@utils/ui-fixtures';

const invalidMediaPath = path.resolve('specs/ui/test-data/form-controls/invalid-format.txt');
const validMediaPath = path.resolve('specs/ui/test-data/form-controls/valid-image.png');

test.describe('form controls', () => {
  test.describe('text input', () => {
    test('happy: submits a valid movie review', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('text-input');

      const validReviewPanel = await formControlsPage.submitValidReview(VALID_REVIEW_FORM_DATA);
      expect(validReviewPanel, 'valid review should include movie title').toContain(VALID_REVIEW_FORM_DATA.movieTitle);
      expect(validReviewPanel, 'valid review should include director').toContain(VALID_REVIEW_FORM_DATA.reviewerEmail);
      expect(validReviewPanel, 'valid review should include rating details').toContain(`Rating: ${VALID_REVIEW_FORM_DATA.rating}/10`);
      expect(validReviewPanel, 'valid review should include release year details').toContain(`Year: ${VALID_REVIEW_FORM_DATA.releaseYear}`);
    });

    test('negative: rejects review below minimum text length', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('text-input');

      const initialPanel = await formControlsPage.getResultPanelText();
      expect(initialPanel, 'initial state should show no review').toContain('No review submitted yet');

      const shortReviewPanel = await formControlsPage.submitShortReview(SHORT_REVIEW_FORM_DATA);
      expect(shortReviewPanel, 'short review should keep empty-state summary').toContain('No review submitted yet');
    });

    test('reset restores the default review summary after entering draft details', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('text-input');

      await formControlsPage.fillReviewDraft(VALID_REVIEW_FORM_DATA);
      await formControlsPage.resetState();

      const resetPanel = await formControlsPage.getResultPanelText();
      expect(resetPanel, 'reset should restore the default empty review summary').toContain('No review submitted yet');
    });

    test('negative: empty submit shows required-field validation', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('text-input');

      const validationMessages = await formControlsPage.submitEmptyReview();
      const emptySubmitPanel = await formControlsPage.getResultPanelText();

      expect(validationMessages, 'empty submit should show all required-field validation messages').toEqual(
        expect.arrayContaining(['Movie Title is required', 'Director Name is required', 'Review must be at least 20 characters'])
      );
      expect(validationMessages, 'empty submit should surface three validation messages').toHaveLength(3);
      expect(emptySubmitPanel, 'empty submit should keep the default empty review summary').toContain('No review submitted yet');
    });
  });

  test.describe('nested checkboxes', () => {
    test('happy: selects skills across nested groups', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('nested-checkboxes');

      const selectedPanel = await formControlsPage.selectNestedSkills();
      expect(selectedPanel, 'selected panel should include React').toContain('React');
      expect(selectedPanel, 'selected panel should include TypeScript').toContain('TypeScript');
    });

    test('negative: reset clears selected skills', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('nested-checkboxes');

      await formControlsPage.selectNestedSkills();
      const resetPanel = await formControlsPage.resetNestedSkills();
      expect(resetPanel, 'reset should clear all selected skills').toContain('No skills selected');
    });
  });

  test.describe('radio selection', () => {
    test('happy: selecting professional plan updates summary', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('radio-selection');

      const selectedSummary = await formControlsPage.selectProfessionalPlan();
      expect(selectedSummary, 'selected summary should include Professional plan').toContain('Professional Plan');
      expect(selectedSummary, 'selected summary should include monthly price').toContain('$79/mo');
      expect(selectedSummary, 'selected summary should include core feature details').toContain('25 Projects');
    });

    test('happy: selecting enterprise plan updates summary with enterprise details', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('radio-selection');

      const selectedSummary = await formControlsPage.selectEnterprisePlan();
      expect(selectedSummary, 'selected summary should include Enterprise plan').toContain('Enterprise Plan');
      expect(selectedSummary, 'selected summary should include enterprise monthly price').toContain('$299/mo');
      expect(selectedSummary, 'selected summary should include enterprise feature details').toContain('Unlimited Projects');
    });

    test('negative: no selection keeps default summary state', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('radio-selection');

      const initialSummary = await formControlsPage.getRadioSummary();
      expect(initialSummary, 'initial summary should prompt plan selection').toContain('Select a plan');

      await formControlsPage.resetState();
      const resetSummary = await formControlsPage.getRadioSummary();
      expect(resetSummary, 'reset should return to default summary').toContain('Select a plan');
    });
  });

  test.describe('data table', () => {
    test('happy: filters table by valid employee keyword', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('data-table');

      const initialRows = await formControlsPage.getVisibleEmployeeRowsCount();
      expect(initialRows, 'table should show initial records').toBeGreaterThan(0);

      await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.match);
      await expect(formControlsPage.employeeRows, 'search by existing keyword should return rows').not.toHaveCount(0);

      await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.clear);
      await expect(formControlsPage.employeeRows, 'clearing search should restore initial rows').toHaveCount(initialRows);
    });

    test('negative: no-match search returns empty rows', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('data-table');

      await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.noMatch);
      await expect(formControlsPage.employeeRows, 'search by unknown keyword should return zero rows').toHaveCount(0);

      await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.clear);
      await expect(formControlsPage.employeeRows, 'rows should return after clearing search').not.toHaveCount(0);
    });

    test('known defect: search resets pagination to the first matching page', { tag: ['@regression', '@known-defect'] }, async ({ formControlsPage }) => {
      test.fail(true, 'Known application defect: filtering on page two keeps the stale page index and hides otherwise matching rows.');

      await formControlsPage.navigateToRoute('data-table');

      await formControlsPage.goToNextEmployeeTablePage();
      await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.match);
      await expect(formControlsPage.employeeRows, 'search should reset pagination and show matching rows').not.toHaveCount(0);

      const paginationSummary = await formControlsPage.getEmployeeTablePaginationSummary();
      expect(paginationSummary, 'pagination summary should reflect a non-empty filtered result').not.toContain('Showing 0 of');
    });

    test('add employee dialog exposes the expected editable fields', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('data-table');

      const dialogTitle = await formControlsPage.openAddEmployeeDialog();
      expect(dialogTitle, 'add employee action should open the create dialog').toBe('Add New Employee');

      const fieldLabels = await formControlsPage.getEmployeeDialogFieldLabels();
      expect(fieldLabels, 'employee dialog should expose the expected editable fields').toEqual(EMPLOYEE_DIALOG_FIELD_LABELS);
    });

    test('edit employee dialog is prefilled with the selected employee values', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('data-table');

      const dialogTitle = await formControlsPage.openFirstEmployeeEditDialog();
      expect(dialogTitle, 'edit action should open the employee edit dialog').toBe('Edit Employee');

      const dialogValues = await formControlsPage.getEmployeeDialogValues();
      expect(dialogValues, 'edit dialog should preload the selected employee values').toEqual(FIRST_EMPLOYEE_FORM_DATA);
    });
  });

  test.describe('button interactions', () => {
    test('happy: double click logs create action and append works', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('button-interactions');

      const doubleClickLog = await formControlsPage.doubleClickCreateAction();
      expect(doubleClickLog, 'double click should create a task log entry').toContain('Task Created');

      const assignLog = await formControlsPage.clickAssignTaskAction();
      expect(assignLog, 'assign action should append additional entry').toContain('Task Assigned');
    });

    test('negative: single click does not trigger double-click action', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('button-interactions');

      const singleClickLog = await formControlsPage.singleClickDoubleAction();
      expect(singleClickLog, 'single click should not trigger double-click action').toContain('No actions performed yet');
    });

    test('happy: right click delete and archive actions append expected task events', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('button-interactions');

      const deleteLog = await formControlsPage.rightClickDeleteTaskAction();
      expect(deleteLog, 'right click should create a delete task log entry').toContain('Task Deleted');

      const archiveLog = await formControlsPage.clickArchiveTaskAction();
      expect(archiveLog, 'archive action should append an archive task log entry').toContain('Task Archived');
    });

    test('happy: complete task action appends a completed task log entry', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('button-interactions');

      const completedLog = await formControlsPage.clickCompleteTaskAction();
      expect(completedLog, 'complete action should append a completed task log entry').toContain('Task Completed');
    });
  });

  test.describe('link navigation', () => {
    test('happy: internal home link routes to root', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('link-navigation');

      const homeUrl = await formControlsPage.followHomeLink();
      expect(homeUrl, 'home link should route to root').toMatch(/\/$/);
    });

    test('happy: external docs link opens a new page and records access history', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('link-navigation');

      const externalDocsResult = await formControlsPage.followExternalDocsLink();
      expect(externalDocsResult.openedNewPage, 'external docs link should open a new page').toBe(true);
      expect(externalDocsResult.accessHistory, 'external docs link should append access history').toContain('Accessed Community Forum (External)');
    });

    test('negative: broken link routes to not-found and back recovers', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('link-navigation');

      const brokenUrl = await formControlsPage.followBrokenLink();
      expect(brokenUrl, 'broken link should route to not-found page').toMatch(/\/not-found$/);

      const recoveredUrl = await formControlsPage.returnFromBrokenLink();
      expect(recoveredUrl, 'browser back should recover to link-navigation route').toMatch(/\/form-controls\/link-navigation$/);
    });
  });

  test.describe('media validation', () => {
    test('negative: baseline state shows no files validated yet', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('media-validation');

      const initialState = await formControlsPage.getMainContentText();
      expect(initialState, 'media validation should start with an empty validation state').toContain('No files validated yet');
    });

    test('happy: accepts supported media extension', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('media-validation');

      const validUploadState = await formControlsPage.uploadMediaFile(validMediaPath);
      expect(validUploadState, 'valid upload should include valid file name').toContain('valid-image.png');
      expect(validUploadState, 'valid upload should show Valid status').toContain('Valid');
      expect(validUploadState, 'valid upload should be marked as ready').toContain('Ready for portfolio');
    });

    test('negative: rejects unsupported media format', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('media-validation');

      const invalidUploadState = await formControlsPage.uploadMediaFile(invalidMediaPath);
      expect(invalidUploadState, 'invalid upload should include invalid file name').toContain('invalid-format.txt');
      expect(invalidUploadState, 'invalid upload should show Invalid status').toContain('Invalid');
      expect(invalidUploadState, 'invalid upload should explain format issue').toContain('Invalid file format');
    });
  });

  test.describe('file operations', () => {
    test('happy: uploads documents and lists both files', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('file-operations');

      const uploadedState = await formControlsPage.uploadDocumentFile(invalidMediaPath);
      expect(uploadedState, 'uploaded document should be listed by file name').toContain('invalid-format.txt');

      const secondUploadState = await formControlsPage.uploadDocumentFile(validMediaPath);
      expect(secondUploadState, 'second uploaded file should also be listed').toContain('valid-image.png');
    });

    test('negative: empty-state is shown before uploads', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('file-operations');

      const initialState = await formControlsPage.getResultPanelText();
      expect(initialState, 'result panel should start with empty upload state').toContain('No documents uploaded');
    });

    test('known defect: pdf template action starts a file download', { tag: ['@regression', '@known-defect'] }, async ({ formControlsPage }) => {
      test.fail(true, 'Known application defect: the PDF action currently displays a toast but does not create a browser download.');

      await formControlsPage.navigateToRoute('file-operations');

      const suggestedFilename = await formControlsPage.downloadSampleTemplate();
      expect(suggestedFilename, 'pdf template action should start a download with a pdf filename').toMatch(/\.pdf$/i);
    });
  });

  test.describe('dynamic elements', () => {
    test('happy: enabling advanced options updates the preview and json state', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('dynamic-elements');

      const toggledState = await formControlsPage.toggleAdvancedOptions();
      expect(toggledState, 'advanced mode should expose additional preview fields').toContain('ADVANCED OPTIONS');
      expect(toggledState, 'advanced mode should update json state to true').toContain('"advancedMode": true');
    });

    test('happy: add custom field updates preview and json state', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('dynamic-elements');

      const firstUpdateState = await formControlsPage.addCustomField();
      expect(firstUpdateState, 'first custom field should appear in preview state').toContain('Custom Field 1');

      const secondUpdateState = await formControlsPage.addCustomField();
      expect(secondUpdateState, 'second custom field should also be added').toContain('Custom Field 2');
    });

    test('negative: baseline stays empty before adding fields', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('dynamic-elements');

      const initialState = await formControlsPage.getDynamicStatus();
      expect(initialState, 'initial state should have empty fields collection').toContain('"fields": []');
    });
  });
});
