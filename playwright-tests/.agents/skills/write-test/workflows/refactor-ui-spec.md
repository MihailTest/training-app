# Refactor UI Spec Workflow

## IDENTITY

Playbook for refactoring UI specs without changing behavior.

## GUARD (prerequisites)

- [ ] The spec exists and is in scope.
- [ ] The refactor is limited to readability or reuse.
      ON_FAIL: Ask the user to clarify the refactor scope.

## FLOW

1. Load UI test writing conventions and examples.
   WITH: references/conventions.md
   PRODUCING: refactor boundaries.

2. Replace direct locators with page object methods.
   WITH: existing page object APIs.
   PRODUCING: a spec with no direct locators.

3. Improve flow readability.
   WITH: clear step sequencing and naming.
   PRODUCING: a more readable spec.

4. Keep assertions in the spec.
   WITH: existing expectations.
   PRODUCING: assertions that remain in the spec.

## CHECKLIST (verification)

- [ ] No locators exist in the spec.
- [ ] Flow is clearer without changing behavior.
- [ ] Assertions remain in the spec.
