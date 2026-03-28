import { expect } from '@playwright/test';
import { test } from '@utils/ui-fixtures';

test.describe('home hub automation', () => {
  test('renders hero, sections, and key cards', { tag: ['@smoke'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await expect(await homePage.getHeroTitleCopy(), 'welcome copy should match expectation').toContain('Welcome to');
    await expect(await homePage.getHeroDescriptionCopy(), 'hero description should match copy').toContain('UI playground');
    const cardVisibility = await homePage.getFormControlCardVisibility();
    for (const [name, isVisible] of Object.entries(cardVisibility)) {
      await expect(isVisible, `${name} card should be visible`).toBe(true);
    }
    const headerCopy = await homePage.getCategoryHeaderCopy();
    await expect(headerCopy.browser, 'browser interactions header should exist').toBe('Browser Interactions');
    await expect(headerCopy.interactive, 'interactive components header should exist').toBe('Interactive Components');
    await expect(headerCopy.dragDrop, 'drag & drop header should exist').toBe('Drag & Drop');
    await expect(await homePage.isStudentRegistrationCardVisible(), 'student registration card should be visible').toBe(true);
  });

  test('card navigation routes correctly and back restores home', { tag: ['@regression'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await homePage.clickCard('link-text-input', '/form-controls/text-input');
    await homePage.goBackToHome();
    await homePage.clickCard('link-window-management', '/browser-interactions/window-management');
    await homePage.goBackToHome();
  });

  test('unknown route recovery keeps the hub stable', { tag: ['@regression'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await homePage.navigateToInvalidRoute('/this-route-should-not-exist');
    await homePage.recoverFromBadRoute();
    await homePage.clickCard('link-data-table', '/form-controls/data-table');
  });

  test('responsive layout remains usable across viewports', { tag: ['@regression'] }, async ({ homePage }) => {
    await homePage.setMobileViewport();
    await homePage.navigateTo();
    await expect(await homePage.hasNoHorizontalOverflow(), 'page should not have horizontal overflow').toBe(true);
    await homePage.scrollCardIntoView('link-draggable-elements');
    await homePage.clickCard('link-draggable-elements', '/drag-drop/draggable-elements');
    await homePage.goBackToHome();

    await homePage.setDesktopViewport();
    const cardVisibility = await homePage.getFormControlCardVisibility();
    for (const [name, isVisible] of Object.entries(cardVisibility)) {
      await expect(isVisible, `${name} card should be visible`).toBe(true);
    }
    await expect(await homePage.getViewportWidth(), 'desktop viewport width should be greater than 1200').toBeGreaterThan(1200);
  });
});
