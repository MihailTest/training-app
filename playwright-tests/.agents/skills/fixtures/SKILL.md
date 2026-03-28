---
name: fixtures
description: Use when working with Playwright fixtures, injected page objects, setup helpers, or shared test context.
---

# Fixtures

Use when creating or updating fixtures in `specs/utils/ui-fixtures.ts`.

Rules:
- Reuse existing fixtures before adding a new one.
- Keep fixture names short and domain-meaningful.
- Add a new fixture only when it removes repeated setup across tests.
- Pass `TestInfo` into page objects through fixtures when needed.

Do not:
- Create one-off fixtures for a single test.
- Build deep fixture chains that are hard to follow.
