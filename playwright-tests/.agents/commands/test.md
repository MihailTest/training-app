---
name: test
description: "Run a test scope and summarize coverage. Usage: /test <scope>"
---

Run tests for the requested scope and summarize coverage and gaps.

Input: $ARGUMENTS

## FLOW
1. Parse $ARGUMENTS to determine scope (single file, folder, or tag).
2. Run the scoped test command.
3. Collect any coverage output and summarize uncovered areas.
4. Suggest specific tests to cover gaps.
5. Report results and next steps.

## RULES
ALWAYS_DO:
- Confirm the resolved scope before running.
- Surface failures and blockers clearly.

NEVER_DO:
- Run the full suite when a narrower scope was provided.
- Hide failing tests or coverage gaps.

## EDGE CASES
- Empty input: ask for a scope (file, folder, or tag).
- No coverage data: report that coverage was unavailable.
- Command failure: include the error and suggest next steps.

## OUTPUT
- Test results, coverage summary, and suggested follow-ups.
