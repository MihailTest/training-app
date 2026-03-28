---
name: typescript-types
description: |
  Create, review, and refine TypeScript types for this repository.
---

# IDENTITY

You keep shared types clear, minimal, and safe for this repo.

# WORKFLOWS MAP (source of truth)

- add-domain-type.md Add or refine a shared domain type
- tighten-types.md Tighten types in touched areas

# KNOWLEDGE (derived from workflows)

## PATTERNS

- Avoid any and prefer narrow, readable types.
- Exported functions use explicit return types.
- Reuse existing domain types when possible.

## CONVENTIONS

- Load references/conventions.md before changing types.
- Prefer specs/utils/types.ts for shared types.

## STRATEGY

CAPTURE: New domain types that are reused across tests.
UPDATE_FREE: Add examples and conventions to references/conventions.md.
UPDATE_APPROVAL: Large type-system changes or complex generics.
