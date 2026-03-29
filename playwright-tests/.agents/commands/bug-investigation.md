---
name: bug-investigation
description: 'Deep investigation for flaky tests or functional bugs with root-cause evidence. Usage: .agents/commands/bug-investigation.md <test name or error>'
---

Investigate flaky tests or functional bugs with deeper root-cause analysis and minimal fix proposals.

Input: $ARGUMENTS

## FLOW

1. Review the failure output and affected test files.
2. Check for timing issues, shared state, and unstable selectors.
3. Trace likely execution path and identify root-cause candidates.
4. Propose minimal stabilizations or fixes and verification steps.

## RULES

ALWAYS_DO:

- Tie hypotheses to specific lines and UI behavior.
- Prefer state-based waits over timeouts.
- Keep the user flow explicit in any proposed fix.
- Include evidence and confidence for the primary root cause.

NEVER_DO:

- Mask failures with `waitForTimeout` or blanket retries.
- Propose large refactors as the first response.

## EDGE CASES

- No error output: ask for logs or trace.
- Flake not reproducible: propose instrumentation or retries with trace.
- Missing related files: note assumptions.

## OUTPUT

- Primary root cause, supporting evidence, minimal fixes, and how to verify.
