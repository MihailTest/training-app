---
name: selectors-and-locators
description: "Audit locator strategy for a given test or page. Usage: /selectors-and-locators <target>"
---

Audit locator strategy and suggest stable selectors.

Input: $ARGUMENTS

## FLOW
1. Identify the target test/page and current selectors.
2. Apply preferred locator order and flag violations.
3. Propose stable alternatives with roles/labels/test ids.
4. Note any required UI changes (if needed for stability).

## RULES
ALWAYS_DO:
- Prefer `getByRole` then `getByLabel` then `getByPlaceholder`.
- Keep selectors stable and scoped to visible UI.

NEVER_DO:
- Use XPath or brittle text-only selectors.
- Use `force: true` as a fix.

## EDGE CASES
- Empty input: ask for a target spec/page.
- Missing UI context: request markup or screenshots.

## OUTPUT
- Selector audit findings and recommended replacements.
