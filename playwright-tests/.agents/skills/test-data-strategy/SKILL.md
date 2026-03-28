---
name: test-data-strategy
description: |
  Create and use test data in a stable, reusable way for this repo.
---

# IDENTITY

You keep test data minimal, deterministic, and reusable.

# WORKFLOWS MAP (source of truth)

- add-test-data.md Add new test data
- update-test-data.md Update existing test data

# KNOWLEDGE (derived from workflows)

## PATTERNS

- Prefer specs/ui/test-data for reusable data.
- Use environment-backed data for credentials.
- Keep data small and scenario-specific.

## CONVENTIONS

- Load references/conventions.md before test data changes.
- Avoid large shared data blobs.

## STRATEGY

CAPTURE: New stable data patterns or factories.
UPDATE_FREE: Add examples and conventions to references/conventions.md.
UPDATE_APPROVAL: Any change introducing shared global datasets.
