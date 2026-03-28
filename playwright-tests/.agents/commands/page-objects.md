---
name: page-objects
description: "Review or design page object methods for reuse. Usage: /page-objects <target>"
---

Review or design page object methods for reusable UI actions and reads.

Input: $ARGUMENTS

## FLOW
1. Clarify the target pages and actions.
2. Check existing page objects for overlap.
3. Define minimal reusable methods and readiness checks.
4. Ensure full business flows remain in specs.

## RULES
ALWAYS_DO:
- Keep locators inside page objects.
- Provide small, reusable UI actions/reads.

NEVER_DO:
- Hide full business scenarios inside page objects.
- Add locators in specs.

## EDGE CASES
- Empty input: ask for page and action details.
- No existing page object: propose minimal new file and methods.

## OUTPUT
- Proposed page object methods and where they belong.
