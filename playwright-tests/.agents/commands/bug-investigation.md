---
name: bug-investigation
description: "Investigate flaky UI tests and identify root causes. Usage: /bug-investigation <test name or error>"
---

Investigate flaky tests and identify likely root causes with minimal fixes.

Input: $ARGUMENTS

## FLOW
1. Review the failure output and affected test files.
2. Check for timing issues, shared state, and unstable selectors.
3. Identify race conditions or missing waits on UI state.
4. Propose minimal stabilizations and verification steps.

## RULES
ALWAYS_DO:
- Tie hypotheses to specific lines and UI behavior.
- Prefer state-based waits over timeouts.
- Keep the user flow explicit in any proposed fix.

NEVER_DO:
- Mask failures with `waitForTimeout` or blanket retries.
- Propose large refactors as the first response.

## EDGE CASES
- No error output: ask for logs or trace.
- Flake not reproducible: propose instrumentation or retries with trace.
- Missing related files: note assumptions.

## OUTPUT
- Likely root causes, suggested fixes, and how to verify.
