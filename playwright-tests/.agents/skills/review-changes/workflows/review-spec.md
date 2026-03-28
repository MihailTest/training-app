# Review Spec Workflow

## IDENTITY

Playbook for reviewing UI specs for readability and stability.

## GUARD (prerequisites)

- [ ] Spec changes are available.
      ON_FAIL: Ask the user to provide the spec or PR scope.

## FLOW

1. Load review conventions and examples.
   WITH: references/conventions.md
   PRODUCING: review checklist for specs.

2. Check user journey clarity.
   WITH: spec flow and sequencing.
   PRODUCING: notes on readability and flow.

3. Verify assertion placement.
   WITH: assertions in the spec or page object.
   PRODUCING: confirmation that assertions remain in specs by default.

4. Identify flaky risks.
   WITH: waits, locators, and shared state usage.
   PRODUCING: list of stability risks.

## CHECKLIST (verification)

- [ ] Spec shows the user journey clearly.
- [ ] Assertions are in specs by default.
- [ ] Flaky risks are identified.
