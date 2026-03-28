---
name: plan-change
description: 'Analyze a requested change and produce a phased plan. Usage: /plan-change <request>'
---

Analyze a requested change, identify risks and dependencies, and propose a phased approach.

Input: $ARGUMENTS

## FLOW

1. Restate the request in repo terms (specs, page objects, fixtures, utils).
2. Identify impacted areas and dependencies.
3. Call out risks (test stability, shared state, boundaries).
4. Propose a phased plan with smallest safe first step.
5. Ask for missing info only if needed to proceed safely.
6. Present the plan and wait for explicit approval before implementation.

## RULES

ALWAYS_DO:

- Tie plan steps to specific repo areas.
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

- Short plan with 2-5 steps and a risk note.
