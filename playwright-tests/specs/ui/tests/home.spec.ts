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
    expect(await homePage.getPageTitle(), 'text input card should land on the text input practice page').toBe('rotaru.qa-ui-practice-hub | Movie Review Submission');
    await homePage.goBackToHome();
    await homePage.clickCard('link-window-management', '/browser-interactions/window-management');
    expect(await homePage.getPageTitle(), 'window management card should land on the window management practice page').toBe('Multi-Window Chat Application - UI Practice Hub');
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

  test('draggable elements card opens the intended practice page instead of a not-found route', { tag: ['@regression'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await homePage.scrollCardIntoView('link-draggable-elements');
    await homePage.clickCard('link-draggable-elements', '/drag-drop/draggable-elements');
    expect(await homePage.getPageTitle(), 'draggable elements card should not resolve to the 404 page').not.toBe('404 - Page Not Found');
  });
});
