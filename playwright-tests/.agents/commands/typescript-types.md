---
name: typescript-types
description: 'Review or propose TypeScript types for a change. Usage: .agents/commands/typescript-types.md <target>'
---

Review or propose TypeScript types for the requested change.

Input: $ARGUMENTS

## FLOW

1. Clarify the types needed and target files.
2. Review existing type patterns in the repo.
3. Propose minimal, safe types with strictness preserved.
4. Note any type-level edge cases.

## RULES

ALWAYS_DO:

- Prefer explicit types for public interfaces.
- Avoid `any` unless explicitly required.

NEVER_DO:

- Loosen strictness without approval.
- Add types that obscure runtime behavior.

## EDGE CASES

- Empty input: ask for the target and intended shape.
- No existing patterns: document chosen approach.

## OUTPUT

- Proposed types and where to place them.
