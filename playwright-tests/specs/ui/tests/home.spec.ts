import { expect } from '@playwright/test';
import { test } from '@utils/ui-fixtures';

test.describe('home hub automation', () => {
  test('renders hero, sections, and key cards', { tag: ['@smoke'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    expect(await homePage.getHeroTitleCopy(), 'welcome copy should match expectation').toContain('Welcome to');
    expect(await homePage.getHeroDescriptionCopy(), 'hero description should match copy').toContain('UI playground');
    await homePage.expectFormControlCardsVisible();
    const headerCopy = await homePage.getCategoryHeaderCopy();
    expect(headerCopy.browser, 'browser interactions header should exist').toBe('Browser Interactions');
    expect(headerCopy.interactive, 'interactive components header should exist').toBe('Interactive Components');
    expect(headerCopy.dragDrop, 'drag & drop header should exist').toBe('Drag & Drop');
    expect(await homePage.getUserRegistrationHeaderCopy(), 'user registration header should exist').toBe('User Registration');
    await homePage.expectStudentRegistrationCardVisible();
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
    expect(await homePage.hasNoHorizontalOverflow(), 'page should not have horizontal overflow').toBe(true);
    await homePage.scrollCardIntoView('link-draggable-elements');
    await homePage.clickCard('link-draggable-elements', '/drag-drop/draggable-elements');
    await homePage.goBackToHome();

    await homePage.setDesktopViewport();
    await homePage.expectFormControlCardsVisible();
    expect(await homePage.getViewportWidth(), 'desktop viewport width should be greater than 1200').toBeGreaterThan(1200);
  });
});
