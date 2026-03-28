# Extract Small Helper Workflow

## IDENTITY

Playbook for extracting a small helper when repetition is real.

## GUARD (prerequisites)

- [ ] The same logic repeats at least twice in the touched area.
- [ ] The helper would reduce duplication without new abstraction layers.
      ON_FAIL: Ask the user to confirm the repetition and scope.

## FLOW

1. Load refactor conventions and examples.
   WITH: references/conventions.md
   PRODUCING: constraints for helper extraction.

2. Define the helper responsibility.
   WITH: repeated logic and usage points.
   PRODUCING: a narrow helper signature.

3. Extract and replace repetitions.
   WITH: local scope only.
   PRODUCING: a helper used in the touched area.

4. Re-check readability and flow.
   WITH: updated code.
   PRODUCING: confirmation that the code is simpler, not more abstract.

## CHECKLIST (verification)

- [ ] Helper has a narrow responsibility.
- [ ] Repetition is reduced in the touched area.
- [ ] No new abstraction layers were introduced.
