---
name: investigate-flake
description: "Investigate flaky tests and propose minimal fixes. Usage: /investigate-flake <test>"
---

Identify likely causes of flaky tests and propose minimal fixes.

Input: $ARGUMENTS

## FLOW
1. Review the failure output and affected test files.
2. Check for timing issues, shared state, and unstable selectors.
3. Identify race conditions or missing waits on UI state.
4. Propose minimal stabilizations and verification steps.

## RULES
ALWAYS_DO:
- Tie hypotheses to specific lines and UI behavior.
- Suggest fixes that keep the user flow explicit.
- Prefer state-based waits over timeouts.

NEVER_DO:
- Mask failures with `waitForTimeout` or blanket retries.
- Propose large refactors as first response.

## EDGE CASES
- No error output: ask for logs or trace.
- Flake not reproducible: propose instrumentation or retries with trace.
- Missing related files: note assumptions.
- Failed analysis: state what could not be determined.

## OUTPUT
- Likely root causes, suggested fixes, and how to verify.
