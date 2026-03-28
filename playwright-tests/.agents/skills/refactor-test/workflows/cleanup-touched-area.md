# Cleanup Touched Area Workflow

## IDENTITY
Playbook for small, safe cleanup in already touched areas.

## GUARD (prerequisites)
- [ ] The refactor is within files already being edited.
- [ ] No behavior or architectural changes are required.
ON_FAIL: Ask the user to clarify scope or avoid refactor.

## FLOW
1. Load refactor conventions and examples.
WITH: references/conventions.md
PRODUCING: refactor boundaries and constraints.

2. Identify local duplication or unclear naming.
WITH: the touched file scope.
PRODUCING: a small list of safe improvements.

3. Apply minimal cleanup.
WITH: local changes only.
PRODUCING: clearer code without behavior changes.

4. Verify the user flow remains unchanged.
WITH: updated code or tests.
PRODUCING: confidence the refactor is low risk.

## CHECKLIST (verification)
- [ ] Changes are local to touched files.
- [ ] Behavior and architecture are unchanged.
- [ ] Refactor is small and easy to review.

