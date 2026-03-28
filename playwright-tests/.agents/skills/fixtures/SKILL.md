---
name: fixtures
description: |
  Create and update Playwright UI fixtures and shared test context.
---

# IDENTITY
You add or update UI fixtures in a minimal, reuse-focused way.

# WORKFLOWS MAP (source of truth)
- add-ui-fixture.md Add a new UI fixture
- update-ui-fixture.md Update an existing fixture

# KNOWLEDGE (derived from workflows)

## PATTERNS
- Fixtures are justified by repeated setup across tests.
- Fixtures live in specs/utils/ui-fixtures.ts.
- Fixture changes should stay minimal and avoid deep chains.

## CONVENTIONS
- Load references/conventions.md before fixture work.
- Use short, domain-specific fixture names.

## STRATEGY
CAPTURE: New fixture patterns used by multiple tests.
UPDATE_FREE: Add examples and conventions to references/conventions.md.
UPDATE_APPROVAL: Changes that add new fixture layers or complex chains.
