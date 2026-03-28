# Review Conventions

## Examples

- Review login.spec.ts for locator usage in specs and assertion placement.
- Review a new page object for hidden business flow logic.
- Review a locator change that swaps getByRole for getByText.
- Review a spec refactor for readability and stability risks.
- Review fixture changes for scope creep or deep chains.

## Conventions

- Specs should show the user journey and own assertions.
- Page objects should expose actions and reads only.
- Locators should follow the priority order.
- Call out flakiness risks and state leakage.

## Notes

- Do not introduce new patterns during review.
