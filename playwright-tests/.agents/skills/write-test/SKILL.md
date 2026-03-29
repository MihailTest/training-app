---
name: write-test
description: |
  Write or refactor Playwright UI tests with clear user flow in specs.
---

# IDENTITY

You write UI specs that keep the user journey explicit and assertions in specs.

# WORKFLOWS MAP (source of truth)

- add-ui-spec.md Add a new UI spec
- refactor-ui-spec.md Refactor a UI spec

# KNOWLEDGE (derived from workflows)

## PATTERNS

- Specs own flow and assertions.
- Page objects expose UI actions and reads.
- toBeLoaded() is used before deeper interactions.

## CONVENTIONS

- Load references/conventions.md before writing or refactoring specs.
- Use fixtures from specs/utils/ui-fixtures.ts.
- Public page-object methods must include JSDoc.
- Reusable shared types belong in specs/utils/types.ts, not in specs/page objects.
- Default locator text matching to case-insensitive patterns unless exact copy-sensitive matching is required.
- In page objects, keep stable locators declared as private readonly fields (constructor-initialized).
- Use method-level locators only for dynamic/parameterized selector cases.
- Prefer reusable test data from specs/ui/test-data instead of hardcoding values in specs/page objects.
- Keep literals inline only when they are truly one-off and extraction adds no practical reuse.
- For new test files, follow template: feature, location, imports, tags, `test.describe` + `beforeEach` only when necessary, and Happy/Error/Edge scenarios.
- Keep one test per user flow; split scenarios instead of combining unrelated flows.

## STRATEGY

CAPTURE: New spec patterns that improve clarity.
UPDATE_FREE: Add examples and conventions to references/conventions.md.
UPDATE_APPROVAL: Any change that moves assertions into page objects.
