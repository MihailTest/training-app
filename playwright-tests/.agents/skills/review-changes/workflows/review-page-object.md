# Review Page Object Workflow

## IDENTITY

Playbook for reviewing page objects and locator usage.

## GUARD (prerequisites)

- [ ] Page object changes are available.
      ON_FAIL: Ask the user to provide the page object or PR scope.

## FLOW

1. Load review conventions and examples.
   WITH: references/conventions.md
   PRODUCING: review checklist for page objects.

2. Verify boundaries.
   WITH: page object methods and spec usage.
   PRODUCING: notes on actions and reads vs business flows.

3. Check locator strategy.
   WITH: locator definitions in the page object.
   PRODUCING: confirmation of priority order usage.

4. Identify reuse or duplication.
   WITH: similar methods or locators.
   PRODUCING: notes on reuse opportunities.

## CHECKLIST (verification)

- [ ] Page object avoids hidden business flows.
- [ ] Locator strategy follows priority order.
- [ ] Reuse opportunities are noted.
