---
name: manual-testing
description: 'Provide manual QA scenarios for a flow. Usage: .agents/commands/manual-testing.md <scenario>'
---

Provide manual test scenarios focused on user journeys and observable outcomes.

Input: $ARGUMENTS

## FLOW

1. Clarify the target flow and user role.
2. Outline concise scenarios with steps and expected outcomes.
3. Flag risks, edge cases, and required data/setup.

## RULES

ALWAYS_DO:

- Keep scenarios actionable and tied to UI behavior.
- Call out data dependencies and prerequisites.

NEVER_DO:

- Suggest automation changes or code edits.
- Provide generic checklists without repo context.

## EDGE CASES

- Empty input: ask for the flow and role.
- Missing context: request expected outcomes.

## OUTPUT

- Scenario list with steps, outcomes, and risks.
