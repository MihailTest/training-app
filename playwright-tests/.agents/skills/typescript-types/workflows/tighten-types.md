# Tighten Types Workflow

## IDENTITY
Playbook for tightening types without changing behavior.

## GUARD (prerequisites)
- [ ] The current type usage is known.
- [ ] The change is scoped to the touched area.
ON_FAIL: Ask the user to clarify the scope and target types.

## FLOW
1. Load TypeScript type conventions and examples.
WITH: references/conventions.md
PRODUCING: acceptable tightening patterns.

2. Replace broad types with narrow ones.
WITH: actual runtime shape.
PRODUCING: stricter types or unions.

3. Add explicit return types to exported functions.
WITH: function signatures.
PRODUCING: explicit return types.

4. Validate downstream usage.
WITH: impacted call sites.
PRODUCING: type-safe usage without assertions.

## CHECKLIST (verification)
- [ ] Types are narrower and clearer.
- [ ] Exported functions have explicit return types.
- [ ] No type assertions hide real issues.

