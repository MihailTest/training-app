# Review API Tests Workflow

## IDENTITY
Playbook for reviewing API test quality and stability.

## GUARD (prerequisites)
- [ ] API tests or changes are available to review.
ON_FAIL: Ask the user to provide the tests or PR scope.

## FLOW
1. Load API testing conventions and examples.
WITH: references/conventions.md
PRODUCING: review checklist aligned to repo standards.

2. Verify response assertions.
WITH: test cases and expected payloads.
PRODUCING: confirmation that shape and fields are validated.

3. Verify negative and permission coverage.
WITH: auth rules and expected failures.
PRODUCING: confirmation that errors and permission paths are covered.

4. Check determinism and data stability.
WITH: test data setup and inputs.
PRODUCING: notes on flakiness risks or data dependency issues.

## CHECKLIST (verification)
- [ ] Tests assert response shape and critical fields.
- [ ] Negative and permission cases are present when applicable.
- [ ] Data inputs are deterministic and stable.

