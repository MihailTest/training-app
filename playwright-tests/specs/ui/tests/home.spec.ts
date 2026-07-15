import { expect } from '@playwright/test';
import { test } from '@utils/ui-fixtures';

test.describe('home hub automation', () => {
  test('renders hero, sections, and key cards', { tag: ['@smoke'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await expect(homePage.welcomeText, 'welcome copy should match expectation').toContainText('Welcome to');
    await expect(homePage.heroDescription, 'hero description should match copy').toContainText('UI playground');
    for (const [name, card] of Object.entries(homePage.formControlCards)) {
      await expect(card, `${name} card should be visible`).toBeVisible();
    }
    await expect(homePage.categoryHeaders.browser, 'browser interactions header should exist').toHaveText('Browser Interactions');
    await expect(homePage.categoryHeaders.interactive, 'interactive components header should exist').toHaveText('Interactive Components');
    await expect(homePage.categoryHeaders.dragDrop, 'drag & drop header should exist').toHaveText('Drag & Drop');
    await expect(homePage.userRegistrationHeader, 'user registration header should exist').toHaveText('User Registration');
    await expect(homePage.studentRegistrationCard, 'student registration card should be visible').toBeVisible();
  });

  test('known defect: hero exposes a meaningful level-one heading', { tag: ['@regression', '@known-defect'] }, async ({ homePage }) => {
    test.fail(true, 'Known application defect: the home hero renders an empty h1 while the visible welcome copy is placed in a span.');

    await homePage.navigateTo();
    await expect(homePage.heroHeading, 'the primary page heading should have an accessible name').toContainText(/\S+/);
  });

  test('card navigation routes correctly and back restores home', { tag: ['@regression'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await homePage.clickCard('link-text-input', '/form-controls/text-input');
    await expect(homePage.page, 'text input card should land on the text input practice page').toHaveTitle('rotaru.qa-ui-practice-hub | Movie Review Submission');
    await homePage.goBackToHome();
    await homePage.clickCard('link-window-management', '/browser-interactions/window-management');
    await expect(homePage.page, 'window management card should land on the window management practice page').toHaveTitle('Multi-Window Chat Application - UI Practice Hub');
    await homePage.goBackToHome();
  });

  test('unknown route recovery keeps the hub stable', { tag: ['@regression'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await homePage.navigateToInvalidRoute('/this-route-should-not-exist');
    await homePage.recoverFromBadRoute();
    await homePage.clickCard('link-data-table', '/form-controls/data-table');
    await expect(homePage.page, 'recovery should leave navigation usable').toHaveURL(/\/form-controls\/data-table$/);
  });

  test('responsive layout remains usable across viewports', { tag: ['@regression'] }, async ({ homePage }) => {
    await homePage.setMobileViewport();
    await homePage.navigateTo();
    expect(await homePage.hasNoHorizontalOverflow(), 'page should not have horizontal overflow').toBe(true);
    await homePage.scrollCardIntoView('link-draggable-elements');
    await homePage.clickCard('link-draggable-elements', '/drag-drop/draggable-elements');
    await homePage.goBackToHome();

    await homePage.setDesktopViewport();
    for (const [name, card] of Object.entries(homePage.formControlCards)) {
      await expect(card, `${name} card should be visible at desktop width`).toBeVisible();
    }
    expect(await homePage.getViewportWidth(), 'desktop viewport width should be greater than 1200').toBeGreaterThan(1200);
  });

  test('known defect: draggable elements card opens its intended practice page', { tag: ['@regression', '@known-defect'] }, async ({ homePage }) => {
    test.fail(true, 'Known application defect: the Home card is visible, but the /drag-drop/draggable-elements route is not registered.');

    await homePage.navigateTo();
    await homePage.scrollCardIntoView('link-draggable-elements');
    await homePage.clickCard('link-draggable-elements', '/drag-drop/draggable-elements');
    await expect(homePage.pageHeading, 'the card should open the Draggable Elements page').toHaveText('Draggable Elements');
  });
});
