# UI Test Writing Conventions

## Examples
- Add a login.spec.ts happy-path test using loginPage.login().
- Add a home.spec.ts test that verifies the dashboard loads.
- Refactor a spec to use page object methods instead of locators.
- Add an assertion for an error banner after invalid login.
- Add a test that verifies logout returns to the login screen.

## Conventions
- Specs own the user journey and assertions.
- Use fixtures from specs/utils/ui-fixtures.ts.
- Call toBeLoaded() before deeper interactions.
- Keep locators in page objects.
- Prefer locator-based expects with messages, e.g. await expect(locator, 'main container should be visible').toBeVisible().

## Notes
- Avoid hiding business flows inside page objects.
