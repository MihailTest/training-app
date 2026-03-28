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

## STRATEGY

CAPTURE: New spec patterns that improve clarity.
UPDATE_FREE: Add examples and conventions to references/conventions.md.
UPDATE_APPROVAL: Any change that moves assertions into page objects.
