---
name: page-objects
description: 'Review or design page object methods for reuse. Usage: .agents/commands/page-objects.md <target>'
---

Review or design page object methods for reusable UI actions and reads.

Input: $ARGUMENTS

## FLOW

1. Clarify target page, route URL, and create-vs-refactor scope.
2. Discover live page structure first:
   - element roles, labels, and accessible names
   - form field structure
   - button names and actions
3. Check existing page objects for overlap.
4. Define minimal reusable methods and readiness checks.
5. Ensure full business flows remain in specs.

## RULES

ALWAYS_DO:

- Keep locators inside page objects.
- Provide small, reusable UI actions/reads.
- Use locator priority order and keep stable locators constructor-declared as private readonly fields.
- Do not guess selectors; use only selectors validated from discovered page structure.

## UNIVERSAL TEMPLATE

`Create or refactor a page object for [Page Name].`
`First, navigate to [URL] and discover:`
`1) element roles, labels, and accessible names`
`2) form field structure`
`3) button names and actions`
`Then generate/update the page object following repo rules.`

NEVER_DO:

- Hide full business scenarios inside page objects.
- Add locators in specs.

## EDGE CASES

- Empty input: ask for page and action details.
- No existing page object: propose minimal new file and methods.

## OUTPUT

- Proposed page object methods and where they belong.
