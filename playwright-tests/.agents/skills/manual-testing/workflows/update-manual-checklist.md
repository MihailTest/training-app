# Update Manual Checklist Workflow

## IDENTITY

Playbook for updating manual checks after a change or bug fix.

## GUARD (prerequisites)

- [ ] The change or bug fix scope is known.
- [ ] The existing manual checklist is available.
      ON_FAIL: Ask the user to provide the checklist and change details.

## FLOW

1. Load manual testing conventions and examples.
   WITH: references/conventions.md
   PRODUCING: update criteria and structure.

2. Identify impacted scenarios.
   WITH: change description and current checklist.
   PRODUCING: a list of scenarios to update.

3. Update steps and expected results.
   WITH: new or changed behavior.
   PRODUCING: revised manual scenarios.

4. Add a focused regression check if needed.
   WITH: risk area or previous bug.
   PRODUCING: a new scenario to prevent regressions.

## CHECKLIST (verification)

- [ ] Updated scenarios match new behavior.
- [ ] Regression risk is explicitly covered.
- [ ] Scenarios remain focused and clear.
