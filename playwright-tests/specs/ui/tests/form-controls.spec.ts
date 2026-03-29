import path from 'node:path';

import { expect } from '@playwright/test';
import { SHORT_REVIEW_FORM_DATA, TABLE_SEARCH_TERMS, VALID_REVIEW_FORM_DATA } from '@ui/test-data/form-controls/form-controls-data.ts';
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
      expect(selectedSummary, 'selected summary should include monthly price').toContain('');
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

      const matchedRows = await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.match);
      expect(matchedRows, 'search by existing keyword should return rows').toBeGreaterThan(0);

      const clearedRows = await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.clear);
      expect(clearedRows, 'clearing search should restore initial rows').toBe(initialRows);
    });

    test('negative: no-match search returns empty rows', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('data-table');

      const noMatchRows = await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.noMatch);
      expect(noMatchRows, 'search by unknown keyword should return zero rows').toBe(0);

      const clearedRows = await formControlsPage.searchEmployeeTable(TABLE_SEARCH_TERMS.clear);
      expect(clearedRows, 'rows should return after clearing search').toBeGreaterThan(0);
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
  });

  test.describe('link navigation', () => {
    test('happy: internal home link routes to root', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('link-navigation');

      const homeUrl = await formControlsPage.followHomeLink();
      expect(homeUrl, 'home link should route to root').toMatch(/\/$/);
    });

    test('negative: broken link routes to not-found and back recovers', { tag: ['@regression'] }, async ({ formControlsPage }) => {
      await formControlsPage.navigateToRoute('link-navigation');

      const brokenUrl = await formControlsPage.followBrokenLink();
      expect(brokenUrl, 'broken link should route to not-found page').toMatch(/\/not-found$/);

      await formControlsPage.page.goBack({ waitUntil: 'load' });
      const recoveredUrl = await formControlsPage.getCurrentUrl();
      expect(recoveredUrl, 'browser back should recover to link-navigation route').toMatch(/\/form-controls\/link-navigation$/);
    });
  });

  test.describe('media validation', () => {
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
  });

  test.describe('dynamic elements', () => {
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
