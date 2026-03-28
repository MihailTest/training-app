---
name: review
description: "Review changes for quality and stability. Usage: /review <scope>"
---

Review the specified files or change scope for quality, stability, and security risks.

Input: $ARGUMENTS

## FLOW
1. Identify the files or scope to review.
2. Dispatch playwright-review-agent for test quality and boundary checks.
3. Dispatch security-reviewer-agent for OWASP Top 10 and critical patterns.
4. Consolidate findings and summarize by severity.

## RULES
ALWAYS_DO:
- Prioritize correctness and stability issues.
- Reference files in findings.
- Apply confidence filtering (>80%) before reporting.

NEVER_DO:
- Suggest changes outside the requested scope.
- Ignore locator or boundary violations.
- Report unchanged-code issues unless CRITICAL.

## OUTPUT
- Findings ordered by severity with file references.
