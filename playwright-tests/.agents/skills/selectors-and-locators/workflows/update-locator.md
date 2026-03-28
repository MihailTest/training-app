# Update Locator Workflow

## IDENTITY

Playbook for updating an unstable locator without breaking flows.

## GUARD (prerequisites)

- [ ] The current locator is flaky or invalid.
- [ ] The target element and intent are confirmed.
      ON_FAIL: Ask the user to clarify the target element and failure.

## FLOW

1. Load locator strategy conventions and examples.
   WITH: references/conventions.md
   PRODUCING: replacement priorities and patterns.

2. Replace with a more semantic locator.
   WITH: role, label, or placeholder.
   PRODUCING: a stable replacement.

3. Update dependent methods.
   WITH: methods using the locator.
   PRODUCING: updated page object actions or reads.

4. Review affected specs.
   WITH: specs that call the updated methods.
   PRODUCING: assurance that flows remain intact.

## CHECKLIST (verification)

- [ ] Replacement uses the most semantic locator available.
- [ ] Specs continue to use page object methods.
- [ ] No XPath or force clicks were added.
