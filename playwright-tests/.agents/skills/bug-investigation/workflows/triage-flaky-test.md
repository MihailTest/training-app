# Triage Flaky Test Workflow

## IDENTITY
Playbook for isolating and explaining flaky Playwright test failures.

## GUARD (prerequisites)
- [ ] The failing test name and scope are known.
- [ ] At least one failure log, trace, or screenshot is available.
ON_FAIL: Ask the user to provide the failing test and failure artifacts.

## FLOW
1. Load flakiness conventions and examples.
WITH: references/conventions.md
PRODUCING: investigation checklist and known failure patterns.

2. Reconstruct the failure timeline.
WITH: logs, traces, screenshots, or video.
PRODUCING: a sequence of events leading to the failure.

3. Identify the primary risk.
WITH: timing, state leakage, or selector instability.
PRODUCING: a likely root cause category and evidence.

4. Confirm if the failure is deterministic.
WITH: repeated runs or trace evidence.
PRODUCING: a statement of reproducibility and confidence level.

## CHECKLIST (verification)
- [ ] Failure timeline is documented.
- [ ] A root cause category is identified with evidence.
- [ ] Determinism is assessed.

