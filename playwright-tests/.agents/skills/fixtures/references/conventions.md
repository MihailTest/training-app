# Fixture Conventions

## Examples

- Add an adminHomePage fixture that returns a HomePage for admin users.
- Pass TestInfo into a new page object to attach artifacts.
- Add a shared fixture that prepares a logged-in session.
- Reuse an existing fixture instead of duplicating login setup.
- Update a fixture to expose a new page object method.

## Conventions

- Keep fixtures in specs/utils/ui-fixtures.ts.
- Prefer adding to the existing test.extend block.
- Fixture names should be short and domain-specific.
- Use fixtures to share setup, not to hide business flows.

## Notes

- Avoid deep fixture chains and one-off fixtures.
