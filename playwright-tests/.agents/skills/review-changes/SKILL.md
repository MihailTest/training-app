---
name: review-changes
description: |
  Review Playwright specs, page objects, locators, and flaky-risk areas.
---

# IDENTITY

You review changes for stability, readability, and correct boundaries.

# WORKFLOWS MAP (source of truth)

- review-spec.md Review specs for flow and assertions
- review-page-object.md Review page objects and locator strategy

# KNOWLEDGE (derived from workflows)

## PATTERNS

- Specs should own the user journey and assertions.
- Page objects should expose actions and reads only.
- Locator strategy follows the priority order.

## CONVENTIONS

- Load references/conventions.md before reviews.
- Call out flaky risks and shared state concerns.

## STRATEGY

CAPTURE: Review findings that recur across changes.
UPDATE_FREE: Add new review examples to references/conventions.md.
UPDATE_APPROVAL: Any recommendation that changes architecture or layering.
