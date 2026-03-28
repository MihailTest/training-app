---
name: write-test
description: 'Write a new UI test for a given scenario. Usage: /write-test <scenario>'
---

Create a new UI test with clear user flow and stable assertions.

Input: $ARGUMENTS

## FLOW

1. Clarify the scenario and acceptance criteria.
2. Find similar specs and reuse patterns.
3. Identify required page object methods or data helpers.
4. Implement spec with user journey and assertions.
5. Add or extend page object methods only for reusable UI actions/reads.
6. Run targeted tests if requested.

## DISPATCH

If the task is complex, delegate to the Playwright writer agent:

```text
spawn_agent(
  agent_type="worker",
  message="Write a new UI test for: $ARGUMENTS\n\nFollow repo rules in AGENTS.md."
)
```

## RULES

ALWAYS_DO:

- Keep the user journey readable in the spec.
- Place assertions in specs by default.
- Use fixtures and existing test data helpers.

NEVER_DO:

- Put locators in specs.
- Hide full scenarios inside page objects.

## EDGE CASES

- Unclear scenario: request expected outcome and inputs.
- Missing page object: create minimal, reusable methods.
- No similar pattern: document chosen approach.
- Failed analysis: state what blocked progress.

## OUTPUT

- What was added/changed, where, and how to run relevant tests.
