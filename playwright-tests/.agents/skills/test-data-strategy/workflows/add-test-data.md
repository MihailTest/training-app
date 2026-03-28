# Add Test Data Workflow

## IDENTITY

Playbook for adding stable, reusable test data.

## GUARD (prerequisites)

- [ ] The scenario and data requirements are clear.
- [ ] Existing test data sources have been checked.
      ON_FAIL: Ask the user to clarify the scenario and data needs.

## FLOW

1. Load test data conventions and examples.
   WITH: references/conventions.md
   PRODUCING: data structure and placement guidance.

2. Reuse or extend existing data.
   WITH: current test data files.
   PRODUCING: a plan to reuse before adding new data.

3. Add a minimal data object.
   WITH: scenario-specific fields.
   PRODUCING: new or updated data in specs/ui/test-data.

4. Update specs to use the data.
   WITH: affected tests.
   PRODUCING: specs that reference shared data.

## CHECKLIST (verification)

- [ ] Data is minimal and deterministic.
- [ ] Data is stored in specs/ui/test-data.
- [ ] Specs reuse shared data when possible.
