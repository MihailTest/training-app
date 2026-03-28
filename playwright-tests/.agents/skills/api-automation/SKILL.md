---
name: api-automation
description: Use when creating, reviewing, or fixing Playwright API tests and request validation in this repository.
---

# API automation

Use for API specs, request helpers, payload validation, response validation, and API test failures.

Rules:
- Reuse existing request utilities, fixtures, and shared types first.
- Assertions must validate business-relevant fields, not only status codes.
- Keep payloads and responses typed; no `any`.
- Avoid new abstractions unless repetition is real.

Workflow:
1. Inspect the target API spec or helper.
2. Find a similar test and follow its pattern.
3. Implement typed payload/response handling.
4. Add business assertions.
5. Run targeted checks if requested.

Do not:
- Duplicate request logic already present.
- Weaken assertions to hide failures.
