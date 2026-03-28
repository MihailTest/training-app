---
name: bug-investigation
description: Use when a test fails, is flaky, or behaves inconsistently and root cause analysis is needed before code changes.
---

# Bug investigation

Use when a Playwright test fails or flakes.

Rules:
- Classify the failure before proposing a fix.
- Trace the failing step to the page object or helper.
- Check for data drift, missing preconditions, or stale locators.
- Explain the root cause first, then suggest the smallest safe fix.

Workflow:
1. Read the failure output or trace if available.
2. Identify the exact failing step and expected state.
3. Verify inputs, data, and timing assumptions.
4. Propose a minimal, targeted change.

Do not:
- Weaken assertions to make tests pass.
- Add stability hacks that mask real issues.
