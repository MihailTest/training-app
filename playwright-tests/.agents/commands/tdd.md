---
name: tdd
description: 'Run a test-driven implementation cycle. Usage: /tdd <phase or scope>'
---

Run a test-driven cycle for the requested phase or scope.

Input: $ARGUMENTS

## FLOW

1. Restate the scope and define the minimal acceptance criteria.
2. Add or update tests to express the expected behavior (RED).
3. Implement the minimal code changes to pass tests (GREEN).
4. Refactor for clarity with tests still green (REFACTOR).
5. Report what changed and what still needs coverage.

## RULES

ALWAYS_DO:

- Keep the test scope minimal and focused.
- Maintain spec and page object boundaries.
- Keep locators inside page objects.

NEVER_DO:

- Skip failing tests before implementation.
- Refactor beyond the current scope.

## OUTPUT

- Summary of RED/GREEN/REFACTOR and test status.
