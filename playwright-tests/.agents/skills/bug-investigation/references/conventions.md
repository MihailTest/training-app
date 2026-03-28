# Flaky Test Investigation Conventions

## Examples
- login.spec.ts fails intermittently on submit due to slow navigation.
- home.spec.ts sometimes renders an empty list because data is not ready.
- A locator resolves multiple buttons after a UI change, causing random clicks.
- Tests share a user record and collide on cleanup in parallel runs.
- An assertion runs before the page finishes loading after redirect.

## Conventions
- Prefer waiting on UI state and network idle, not fixed timeouts.
- Inspect traces and screenshots to find timing or state mismatches.
- Check fixtures, storage state, and shared test data for collisions.
- Verify locators are stable and scoped to unique elements.
- Keep fixes minimal and local to the failing test path.

## Notes
- Avoid retries as a primary fix. Use them only after a root cause is addressed.
