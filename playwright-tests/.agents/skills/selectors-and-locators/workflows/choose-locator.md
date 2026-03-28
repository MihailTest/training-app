# Choose Locator Workflow

## IDENTITY

Playbook for selecting stable, semantic locators.

## GUARD (prerequisites)

- [ ] The target element and UI intent are known.
- [ ] The page object file is identified.
      ON_FAIL: Ask the user to clarify the element and page object.

## FLOW

1. Load locator strategy conventions and examples.
   WITH: references/conventions.md
   PRODUCING: prioritized locator options.

2. Attempt semantic locators first.
   WITH: role, label, or placeholder.
   PRODUCING: the most semantic locator possible.

3. Add minimal scoping if needed.
   WITH: parent region or container.
   PRODUCING: a stable, unique locator.

4. Add the locator to the page object.
   WITH: page object file.
   PRODUCING: locator stored near related actions or reads.

## CHECKLIST (verification)

- [ ] Locator follows priority order.
- [ ] Locator is scoped when multiple matches exist.
- [ ] Locator is defined in the page object.
