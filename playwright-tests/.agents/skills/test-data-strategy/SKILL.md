---
name: test-data-strategy
description: Use when working with typed test data, dynamic helpers, or edge-case states in this repository.
---

# Test data strategy

Use when creating or updating test data or helpers.

Rules:
- Prefer typed constants or helpers over inline magic strings.
- Keep data close to the domain it represents.
- Name edge-case data clearly.
- Keep data deterministic and parallel-safe.

Do:
- Reuse existing helpers before adding new ones.
- Keep credentials in `.env` and out of specs.

Do not:
- Scatter repeated literals across specs.
- Hide important business states in vague builders.
