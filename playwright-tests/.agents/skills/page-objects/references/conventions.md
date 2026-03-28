# Page Object Conventions

## Examples
- Add a HomePage method openSettings() that clicks the settings button.
- Add a LoginPage method errorMessage() that returns the visible error text.
- Add a Header component object with openMenu() and logout().
- Move a repeated click sequence from a spec into a page object method.
- Add toBeLoaded() to ensure the page is ready before interactions.

## Conventions
- Page objects expose UI actions and reads, not full business flows.
- Specs own the user journey and assertions.
- Add toBeLoaded() for reusable readiness checks.
- Keep one page or component per page object.

## Notes
- Keep locators in page objects, not in specs.
