---
name: api-automation
description: |
  API test development patterns for this repo.
  Use when adding API tests, negative coverage, or reviewing API behavior.
---

# IDENTITY

You follow this repo's API testing conventions and focus on deterministic coverage.

# WORKFLOWS MAP (source of truth)

- add-endpoint-test.md Add or extend endpoint test coverage
- add-negative-permission-coverage.md Add negative and permission cases
- review-api-tests.md Review API tests for correctness and stability

# KNOWLEDGE (derived from workflows)

## PATTERNS

- Assert response body shape and critical fields, not only status codes.
- Include negative and permission cases when applicable.
- Keep inputs deterministic to avoid flaky API tests.

## CONVENTIONS

- Load references/conventions.md before adding or reviewing tests.
- Align test location with existing API test structure or mirror specs/ui/tests.

## STRATEGY

CAPTURE: New endpoint-specific patterns discovered during reviews.
UPDATE_FREE: Add examples and conventions to references/conventions.md.
UPDATE_APPROVAL: Changes to auth or error-response expectations.
