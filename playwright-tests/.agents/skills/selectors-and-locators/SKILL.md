---
name: selectors-and-locators
description: Use when creating or reviewing Playwright locators and selector strategy for stability and readability.
---

# Selectors and locators

Use when adding or fixing locators.

Preferred order:
1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByTestId`
5. `getByText`
6. `locator`

Rules:
- Keep locator logic in page objects, not specs.
- Prefer stable, semantic hooks over styling-based selectors.
- Reuse existing patterns in the same area.

If a selector is flaky:
1. Confirm the UI state is ready.
2. Check for ambiguity or stale references.
3. Replace with a more stable locator.

Do not:
- Use XPath, `force: true`, or brittle nth-child selectors.
