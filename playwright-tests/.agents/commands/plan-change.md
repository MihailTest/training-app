---
name: plan-change
description: 'Plan a change to existing behavior with current-vs-target analysis. Usage: .agents/commands/plan-change.md <request>'
---

Plan a requested change to existing behavior, with current-vs-target analysis and a phased approach.

Input: $ARGUMENTS

## FLOW

1. Restate the requested behavior change in repo terms (specs, page objects, fixtures, utils).
2. Summarize current behavior and likely implementation area.
3. Define target behavior and acceptance criteria deltas.
4. Identify impacted areas, dependencies, and migration or compatibility risks.
5. Propose a phased plan with smallest safe first step.
6. Present the plan and wait for explicit approval before implementation.

## RULES

ALWAYS_DO:

- Tie plan steps to specific repo areas.
- Call out current-vs-target behavior differences.
- Keep steps small and incremental.
- Call out any required setup or test runs.

NEVER_DO:

- Plan large refactors unless explicitly requested.
- Start implementation without explicit approval.
- Assume missing requirements.

## EDGE CASES

- Empty input: ask for a concrete goal or example.
- Unclear scenario: request clarification before planning.
- Missing related files: note assumption and provide alternative options.
- Failed analysis: state what could not be determined.

## OUTPUT

- Short plan with 2-5 steps, behavior delta, and risk note.
