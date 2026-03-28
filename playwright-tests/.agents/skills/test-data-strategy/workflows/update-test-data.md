# Update Test Data Workflow

## IDENTITY

Playbook for updating existing test data without breaking other scenarios.

## GUARD (prerequisites)

- [ ] The existing test data file is identified.
- [ ] The update is scoped to a known scenario.
      ON_FAIL: Ask the user to clarify the data change and scope.

## FLOW

1. Load test data conventions and examples.
   WITH: references/conventions.md
   PRODUCING: update constraints and scope.

2. Update the data object minimally.
   WITH: required new fields or values.
   PRODUCING: a focused data change.

3. Check other consumers.
   WITH: specs using the data.
   PRODUCING: confirmation that other scenarios still make sense.

4. Adjust tests if needed.
   WITH: updated data behavior.
   PRODUCING: specs aligned to the updated data.

## CHECKLIST (verification)

- [ ] Update is minimal and scoped.
- [ ] Other tests remain valid.
- [ ] Data remains deterministic.
