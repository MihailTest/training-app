# Add API Endpoint Test Workflow

## IDENTITY

Playbook for adding API test coverage for a new endpoint.

## GUARD (prerequisites)

- [ ] Endpoint path and HTTP method are known.
- [ ] Expected status codes and response shape are defined.
- [ ] Required auth context is understood.
      ON_FAIL: Ask the user to clarify before proceeding.

## FLOW

1. Load API testing conventions and examples.
   WITH: references/conventions.md
   PRODUCING: agreed test structure and coverage targets.

2. Create or extend the endpoint test file.
   WITH: endpoint path, method, and auth needs.
   PRODUCING: a test that hits the endpoint and asserts status and payload.

3. Add field-level validation assertions.
   WITH: required fields and data types.
   PRODUCING: assertions that validate response shape and critical fields.

4. Add happy path coverage.
   WITH: valid request inputs.
   PRODUCING: passing test for the primary scenario.

## CHECKLIST (verification)

- [ ] Test asserts response shape and key fields.
- [ ] Happy path is covered with deterministic data.
- [ ] Auth requirements are honored.
