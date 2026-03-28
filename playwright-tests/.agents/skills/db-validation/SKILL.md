---
name: db-validation
description: Use when supporting tests with read-only database validation or explaining what DB checks prove.
---

# DB validation

Use for read-only DB checks that support UI or API assertions.

Rules:
- Read-only queries only.
- Tie each query to a business outcome.
- Explain what the query proves.
- State assumptions if schema details are unknown.

Workflow:
1. Define the business result to prove.
2. Identify minimal evidence (row/field) to verify it.
3. Write the read-only query.
4. Explain the evidence in plain language.

Do not:
- Suggest destructive operations.
- Replace business validation with trivial counts.
