# Write Manual Scenario Workflow

## IDENTITY
Playbook for writing a manual test scenario with clear steps and expected results.

## GUARD (prerequisites)
- [ ] The feature or risk area is defined.
- [ ] Preconditions or data requirements are known.
ON_FAIL: Ask the user to clarify the scenario scope and preconditions.

## FLOW
1. Load manual testing conventions and examples.
WITH: references/conventions.md
PRODUCING: a consistent scenario structure.

2. Write the scenario title and intent.
WITH: feature and risk focus.
PRODUCING: a one-sentence goal.

3. List preconditions.
WITH: required data, user role, or state.
PRODUCING: explicit setup steps.

4. Write action steps and expected results.
WITH: clear, observable outcomes.
PRODUCING: a step-by-step manual scenario.

## CHECKLIST (verification)
- [ ] Steps are in business language.
- [ ] Expected results are observable.
- [ ] Scenario focuses on a single outcome.

