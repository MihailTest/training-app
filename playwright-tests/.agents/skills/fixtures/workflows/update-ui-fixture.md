# Update Existing Fixture Workflow

## IDENTITY
Playbook for updating an existing fixture without adding extra layers.

## GUARD (prerequisites)
- [ ] The current fixture is already used by tests.
- [ ] The update is required to reduce duplication or add needed context.
ON_FAIL: Ask the user to clarify the fixture change and affected tests.

## FLOW
1. Load fixture conventions and examples.
WITH: references/conventions.md
PRODUCING: boundaries for fixture updates.

2. Modify the fixture in specs/utils/ui-fixtures.ts.
WITH: the minimal change to support the new need.
PRODUCING: an updated fixture with scoped changes.

3. Update affected specs or page objects.
WITH: the new fixture behavior.
PRODUCING: tests that use the updated fixture without extra setup.

4. Review for fixture chain complexity.
WITH: fixture graph and usage.
PRODUCING: confirmation no deep chains were introduced.

## CHECKLIST (verification)
- [ ] Change is minimal and scoped.
- [ ] No new deep fixture chains were added.
- [ ] Updated fixtures are used consistently.

