# Add Page Object Workflow

## IDENTITY
Playbook for adding a new page object for a page or feature area.

## GUARD (prerequisites)
- [ ] The page or feature area is clearly scoped.
- [ ] Reusable UI actions or reads are identified.
ON_FAIL: Ask the user to clarify the page scope and actions.

## FLOW
1. Load page object conventions and examples.
WITH: references/conventions.md
PRODUCING: boundaries for page object responsibilities.

2. Create the page object file.
WITH: page scope and primary actions.
PRODUCING: a class with locators and UI methods.

3. Add toBeLoaded() readiness check.
WITH: stable UI elements that indicate readiness.
PRODUCING: a reusable readiness method.

4. Update specs or fixtures to use the page object.
WITH: affected tests or fixtures.
PRODUCING: specs that call page object methods instead of locators.

## CHECKLIST (verification)
- [ ] Locators are contained in the page object.
- [ ] Specs use page object methods.
- [ ] toBeLoaded() exists when readiness checks are needed.

