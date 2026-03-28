---
name: review-changes
description: "Review uncommitted changes for quality and risk. Usage: /review-changes"
---

Inspect changed files, assess quality and risks, and summarize findings.

Input: $ARGUMENTS

## FLOW
1. Enumerate changed files and group by area (specs, page objects, utils, config).
2. Review for correctness, boundary violations, and stability risks.
3. Identify missing tests or verification gaps.
4. Summarize findings by severity with file references.

## RULES
ALWAYS_DO:
- Prioritize correctness and stability over style.
- Check assertion placement and locator usage.
- Call out risky changes and missing verification.

NEVER_DO:
- Suggest changes outside the requested scope.
- Approve changes without checking boundaries.

## EDGE CASES
- No changed files: state that nothing can be reviewed.
- Unclear intent: ask what behavior should change.
- Missing related files: flag likely impact area.
- Failed analysis: state what could not be determined.

## OUTPUT
- Findings list ordered by severity, plus test/verification notes.
