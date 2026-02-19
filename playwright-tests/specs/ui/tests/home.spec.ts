import { test } from '@utils/ui-fixtures';

test.describe('home hub automation', () => {
  test('renders hero, sections, and key cards', { tag: ['@smoke'] }, async ({ homePage }) => {
    await homePage.navigateTo();
    await homePage.verifyHeroCopy();
    await homePage.verifyFormControlCards();
    await homePage.verifyCategoryHeaders();
    await homePage.verifyStudentRegistrationCard();
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
    await homePage.expectNoHorizontalOverflow();
    await homePage.scrollCardIntoView('link-draggable-elements');
    await homePage.clickCard('link-draggable-elements', '/drag-drop/draggable-elements');
    await homePage.goBackToHome();

    await homePage.setDesktopViewport();
    await homePage.verifyFormControlCards();
    await homePage.expectViewportWidthGreaterThan(1200);
  });
});
