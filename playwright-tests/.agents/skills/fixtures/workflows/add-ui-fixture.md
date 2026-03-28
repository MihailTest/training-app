# Add UI Fixture Workflow

## IDENTITY

Playbook for adding a new Playwright UI fixture.

## GUARD (prerequisites)

- [ ] The repeated setup is used by multiple tests.
- [ ] The fixture name is clear and domain-specific.
      ON_FAIL: Ask the user to clarify the repeated setup and scope.

## FLOW

1. Load fixture conventions and examples.
   WITH: references/conventions.md
   PRODUCING: naming and placement guidance.

2. Identify the shared setup.
   WITH: tests that repeat the same setup steps.
   PRODUCING: a clear fixture responsibility statement.

3. Add the fixture to specs/utils/ui-fixtures.ts.
   WITH: page object or setup logic.
   PRODUCING: a new fixture wired into test.extend.

4. Update affected specs to use the fixture.
   WITH: tests that currently duplicate setup.
   PRODUCING: cleaner specs with shared setup.

## CHECKLIST (verification)

- [ ] Fixture is used by more than one test.
- [ ] Fixture name is clear and aligned with domain.
- [ ] Specs use the fixture without extra setup duplication.
