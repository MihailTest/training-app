# Add Domain Type Workflow

## IDENTITY

Playbook for adding or refining a shared TypeScript type.

## GUARD (prerequisites)

- [ ] The domain concept and fields are known.
- [ ] Existing types have been checked.
      ON_FAIL: Ask the user to clarify the type shape and usage.

## FLOW

1. Load TypeScript type conventions and examples.
   WITH: references/conventions.md
   PRODUCING: type design constraints.

2. Identify reuse opportunities.
   WITH: existing types in specs/utils/types.ts or nearby files.
   PRODUCING: decision to reuse or add a new type.

3. Add or update the type.
   WITH: minimal fields and narrow unions.
   PRODUCING: a clear, reusable type.

4. Apply the type in the touched area.
   WITH: affected functions or objects.
   PRODUCING: typed usage without any.

## CHECKLIST (verification)

- [ ] Type is narrow and readable.
- [ ] Existing types were reused when possible.
- [ ] No new any usage was added.
