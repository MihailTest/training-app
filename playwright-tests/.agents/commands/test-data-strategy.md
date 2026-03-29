---
name: test-data-strategy
description: 'Design stable test data for a scenario. Usage: .agents/commands/test-data-strategy.md <scenario>'
---

Design stable test data and setup for the requested scenario.

Input: $ARGUMENTS

## FLOW

1. Clarify entities, roles, and required states.
2. Review existing data helpers or fixtures.
3. Propose data setup steps and cleanup needs.
4. Address isolation and parallelism concerns.

## RULES

ALWAYS_DO:

- Prefer reusable data helpers.
- Keep data setup explicit and minimal.

NEVER_DO:

- Hardcode secrets or production data.
- Create global shared state without isolation.

## EDGE CASES

- Empty input: ask for the scenario and role.
- No helpers available: propose a minimal helper.

## OUTPUT

- Data setup plan and helper recommendations.
