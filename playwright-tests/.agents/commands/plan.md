---
name: plan
description: 'Create a phased implementation plan for a request (new work or broad task). Usage: .agents/commands/plan.md <request>'
---

Create a phased plan for the request, with risks and acceptance criteria.

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

## OUTPUT

- Short plan with 2-5 steps and a risk note.
