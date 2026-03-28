# Review DB Validation Workflow

## IDENTITY

Playbook for reviewing proposed DB validations for safety and relevance.

## GUARD (prerequisites)

- [ ] DB validation queries are available.
      ON_FAIL: Ask the user to provide the proposed queries.

## FLOW

1. Load DB validation conventions and examples.
   WITH: references/conventions.md
   PRODUCING: review checklist for DB checks.

2. Verify query safety.
   WITH: query text or description.
   PRODUCING: confirmation of read-only and minimal scope.

3. Verify linkage to test steps.
   WITH: test flow and expected outcomes.
   PRODUCING: confirmation each query proves a specific outcome.

4. Check isolation and determinism.
   WITH: shared data or parallel risks.
   PRODUCING: notes on stability or collisions.

## CHECKLIST (verification)

- [ ] Queries are read-only and minimal.
- [ ] Each query ties to a specific test outcome.
- [ ] Isolation risks are addressed.
