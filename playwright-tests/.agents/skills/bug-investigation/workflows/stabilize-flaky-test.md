# Stabilize Flaky Test Workflow

## IDENTITY

Playbook for applying minimal, targeted stabilizations.

## GUARD (prerequisites)

- [ ] A likely root cause has been identified.
- [ ] The change scope is limited to the affected test flow.
      ON_FAIL: Ask the user to clarify the root cause or scope.

## FLOW

1. Load flakiness conventions and examples.
   WITH: references/conventions.md
   PRODUCING: approved stabilization patterns.

2. Apply the smallest fix that addresses the root cause.
   WITH: updated wait conditions, scoped locators, or data isolation.
   PRODUCING: a focused change in the spec, fixture, or page object.

3. Add an assertion or readiness check if needed.
   WITH: a stable UI state indicator.
   PRODUCING: a deterministic wait or check without timeouts.

4. Re-run or reason through the stabilized flow.
   WITH: existing artifacts or local run if available.
   PRODUCING: confidence that the test is stable.

## CHECKLIST (verification)

- [ ] Fix addresses the identified root cause.
- [ ] No waitForTimeout or force clicks were added.
- [ ] Readiness checks are deterministic.
