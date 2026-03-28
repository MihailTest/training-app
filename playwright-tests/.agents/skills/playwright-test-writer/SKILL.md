---
name: playwright-test-writer
description: Use when creating or extending Playwright UI tests in this repository.
---

# Playwright test writer

Use when adding or updating UI specs in `specs/ui/tests/`.

Rules:
- Inspect similar specs first and follow their pattern.
- Use `test` from `@utils/ui-fixtures` and existing fixtures.
- Keep one business scenario per test.
- Use page object methods for actions and assertions.
- Use test data from `specs/ui/test-data/` or existing helpers.

Do:
- Name tests by business outcome.
- Call `toBeLoaded()` before deep interactions.

Do not:
- Put locators or `expect()` calls in specs.
- Hardcode unstable data when helpers exist.
