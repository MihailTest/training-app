---
name: api-automation
description: 'Create or update API tests with validation and negative cases. Usage: /api-automation <endpoint or scenario>'
---

Create or update API tests with shared validation, auth coverage, and negative cases.

Input: $ARGUMENTS

## FLOW

1. Clarify the endpoint, auth context, and expected responses.
2. Locate existing API test patterns and shared validators.
3. Add or update tests for success, negative, and permission cases.
4. Reuse shared helpers/validators when available.
5. Run targeted tests if requested.

## RULES

ALWAYS_DO:

- Cover auth and permission boundaries when relevant.
- Include negative cases for invalid inputs.
- Keep assertions in tests unless reuse is strong.

NEVER_DO:

- Create one-off helpers with no reuse.
- Skip validation coverage for public endpoints.

## EDGE CASES

- Empty input: ask for an endpoint or scenario.
- No existing patterns: document the chosen approach.
- Missing auth details: request credentials/roles.

## OUTPUT

- What was added/changed, where, and how to run the tests.
