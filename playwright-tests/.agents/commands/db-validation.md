---
name: db-validation
description: "Design read-only DB validation checks tied to a test. Usage: /db-validation <scenario>"
---

Design safe, read-only DB checks and explain what each proves.

Input: $ARGUMENTS

## FLOW
1. Identify the entities and expected data changes.
2. Propose read-only queries tied to test steps.
3. Explain what each query proves and any isolation risks.
4. Note required credentials or environment constraints.

## RULES
ALWAYS_DO:
- Use read-only queries and explain what they prove.
- Tie checks to expected outcomes and data setup.
- Consider parallel test isolation.

NEVER_DO:
- Propose write or destructive queries.
- Require DB changes without explicit approval.

## EDGE CASES
- Empty input: ask for the scenario and expected data.
- Unknown schema: request table names or ERD.

## OUTPUT
- Proposed queries and validation rationale.
