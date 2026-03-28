# Add Negative And Permission Coverage Workflow

## IDENTITY
Playbook for extending API tests with negative and permission cases.

## GUARD (prerequisites)
- [ ] Existing endpoint tests are present.
- [ ] Failure modes and permission rules are known.
ON_FAIL: Ask the user to clarify before proceeding.

## FLOW
1. Load API testing conventions and examples.
WITH: references/conventions.md
PRODUCING: consistent negative and permission coverage approach.

2. Add invalid input cases.
WITH: invalid payloads or missing required fields.
PRODUCING: tests that assert proper error responses.

3. Add permission or auth cases.
WITH: missing token, wrong role, or forbidden access.
PRODUCING: tests that assert 401 or 403 responses where expected.

4. Add boundary or edge cases.
WITH: empty lists, oversized inputs, or invalid query values.
PRODUCING: tests that assert stable error handling.

## CHECKLIST (verification)
- [ ] Negative cases assert error response shape and status.
- [ ] Permission cases cover missing or wrong auth.
- [ ] Edge cases are deterministic and reproducible.

