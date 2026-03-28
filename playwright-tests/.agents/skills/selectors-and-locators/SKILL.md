---
name: selectors-and-locators
description: |
  Preferred locator order and anti-patterns for selectors.
---

# IDENTITY

You choose stable, semantic locators and keep them inside page objects.

# WORKFLOWS MAP (source of truth)

- choose-locator.md Choose a new locator
- update-locator.md Update an unstable locator

# KNOWLEDGE (derived from workflows)

## PATTERNS

- Use semantic locators in priority order.
- Scope locators only as needed for uniqueness.
- Keep locators in page objects, not specs.

## CONVENTIONS

- Load references/conventions.md before selecting locators.
- Avoid XPath, force clicks, and brittle text-only selectors.

## STRATEGY

CAPTURE: Locator patterns that improve stability.
UPDATE_FREE: Add examples to references/conventions.md.
UPDATE_APPROVAL: Any proposal to add data-testid just to satisfy a test.
