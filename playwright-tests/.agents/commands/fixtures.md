---
name: fixtures
description: 'Plan or update shared fixtures and test context. Usage: /fixtures <need>'
---

Plan or update shared fixtures and test context for Playwright tests.

Input: $ARGUMENTS

## FLOW

1. Clarify the fixture need and target tests.
2. Review existing fixtures and shared setup helpers.
3. Propose minimal additions or changes.
4. Ensure fixture usage stays out of business assertions.
5. Run targeted tests if requested.

## RULES

ALWAYS_DO:

- Keep fixtures focused on setup and shared context.
- Avoid business assertions inside fixtures.

NEVER_DO:

- Create wrapper-on-wrapper abstractions.
- Hide full user flows inside fixtures.

## EDGE CASES

- Empty input: ask for the test area and desired fixture.
- Existing fixture overlap: propose reuse before adding new.

## OUTPUT

- Proposed fixture changes and where to apply them.
