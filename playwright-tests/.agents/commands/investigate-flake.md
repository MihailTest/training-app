---
name: investigate-flake
description: 'Quick flaky-test triage with fast hypotheses and next checks. Usage: .agents/commands/investigate-flake.md <test>'
---

Run a quick flaky-test triage: identify likely causes, confidence level, and next verification checks.

Input: $ARGUMENTS

## FLOW

1. Review the failure output and affected test files.
2. Check for timing issues, shared state, and unstable selectors.
3. Identify race conditions or missing waits on UI state.
4. Rank top hypotheses by confidence and list fastest checks to confirm.

## RULES

ALWAYS_DO:

- Tie hypotheses to specific lines and UI behavior.
- Keep output short and triage-first.
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

- Top likely causes, confidence, and quickest next checks.
