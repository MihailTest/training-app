# Add UI Spec Workflow

## IDENTITY
Playbook for adding a new Playwright UI spec.

## GUARD (prerequisites)
- [ ] The user journey and expected outcomes are known.
- [ ] Existing specs or page objects have been checked.
ON_FAIL: Ask the user to clarify the user journey and expected outcomes.

## FLOW
1. Load UI test writing conventions and examples.
WITH: references/conventions.md
PRODUCING: a consistent spec structure.

2. Identify the page objects and fixtures.
WITH: required pages or components.
PRODUCING: the fixtures and page objects to use.

3. Write the spec flow.
WITH: step-by-step user journey.
PRODUCING: a readable spec with clear sequencing.

4. Add assertions in the spec.
WITH: expected UI outcomes.
PRODUCING: assertions tied to user-visible behavior.

## CHECKLIST (verification)
- [ ] Spec uses fixtures and page object methods.
- [ ] Assertions are in the spec by default.
- [ ] The user journey is readable.

