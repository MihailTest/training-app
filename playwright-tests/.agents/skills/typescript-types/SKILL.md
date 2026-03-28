---
name: typescript-types
description: Use when creating, reviewing, or refining TypeScript types and safe typing decisions in this repository.
---

# TypeScript types

Use when changing shared types or function signatures.

Rules:
- No `any`.
- Exported functions must have explicit return types.
- Add reusable domain types to `specs/utils/types.ts` when appropriate.

Do:
- Prefer narrow, readable types.
- Reuse existing domain types.

Do not:
- Add complex generics without clear benefit.
- Use type assertions to bypass real typing issues.
