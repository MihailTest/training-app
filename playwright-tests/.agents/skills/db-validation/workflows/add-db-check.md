# Add DB Validation Check Workflow

## IDENTITY
Playbook for proposing safe, read-only DB validation checks.

## GUARD (prerequisites)
- [ ] The test step and expected outcome are known.
- [ ] The target table or entity is identified.
ON_FAIL: Ask the user to clarify expected DB state.

## FLOW
1. Load DB validation conventions and examples.
WITH: references/conventions.md
PRODUCING: constraints for safe, read-only checks.

2. Define the minimal query.
WITH: entity name and stable identifiers.
PRODUCING: a read-only query tied to a single test outcome.

3. Explain what the query proves.
WITH: expected rows and fields.
PRODUCING: a clear assertion statement for the test.

4. Note isolation risks.
WITH: parallel runs and shared data.
PRODUCING: any mitigations or scoping recommendations.

## CHECKLIST (verification)
- [ ] Query is read-only and minimal.
- [ ] Query ties directly to a test step.
- [ ] Isolation risks are documented.

