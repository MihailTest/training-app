# Refactor Page Object Workflow

## IDENTITY

Playbook for refactoring an existing page object to keep boundaries clear.

## GUARD (prerequisites)

- [ ] The page object contains repeated or unclear logic.
- [ ] The change is scoped to the page object and related specs.
      ON_FAIL: Ask the user to clarify the refactor goal and scope.

## FLOW

1. Load page object conventions and examples.
   WITH: references/conventions.md
   PRODUCING: refactor boundaries.

2. Identify methods that hide business flows.
   WITH: current page object methods.
   PRODUCING: candidates to move back into specs.

3. Extract reusable UI actions or reads.
   WITH: repeated UI sequences.
   PRODUCING: smaller, reusable methods.

4. Update affected specs.
   WITH: new method names or signatures.
   PRODUCING: specs that keep the user journey explicit.

## CHECKLIST (verification)

- [ ] Page object exposes actions and reads only.
- [ ] Specs still own flow and assertions.
- [ ] No business scenario is hidden in the page object.
