---
name: refactor-test
description: 'Refactor tests for readability without behavior changes. Usage: .agents/commands/refactor-test.md <target>'
---

Improve test readability and boundaries without changing behavior.

Input: $ARGUMENTS

## FLOW

1. Identify the current flow and assertions.
2. Map what belongs in spec vs page object vs helper.
3. Reduce hidden logic and duplicated steps.
4. Simplify naming and flow while preserving behavior.
5. Run targeted checks if requested.

## RULES

ALWAYS_DO:

- Preserve existing behavior and assertions.
- Keep user journey visible in specs.
- Extract only reusable UI actions/reads to page objects.

NEVER_DO:

- Change business logic or test intent.
- Add new features while refactoring.

## EDGE CASES

- No clear target: ask for the desired improvement.
- Widespread duplication: propose phased refactor.
- Missing related files: flag probable dependency.
- Failed analysis: state what could not be determined.

## OUTPUT

- Summary of refactor and files touched, with risk notes.
