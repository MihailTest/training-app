---
name: refactoring-and-cleanup
description: Use when doing minimal safe cleanup or local refactoring in touched areas without changing business logic, architecture, or repository conventions.
---

# Refactoring and cleanup

Use only for small, safe cleanup in the area already being changed.

Rules:
- Do not change behavior or architecture.
- Do not move files across layers unless explicitly asked.
- Keep changes local, minimal, and easy to review.

Allowed:
- Remove obvious duplication in the touched area.
- Improve naming when it clearly increases clarity.
- Extract a small helper when repetition is real.

Do not:
- Perform broad renames or large refactors.
- Add new abstractions without repeated need.
