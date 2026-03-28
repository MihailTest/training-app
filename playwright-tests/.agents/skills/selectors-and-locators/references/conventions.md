# Locator Strategy Conventions

## Examples

- Use getByRole('button', { name: 'Sign in' }) for the login button.
- Use getByLabel('Email') for the email input.
- Use getByPlaceholder('Search') when label and role are absent.
- Use getByTestId('user-row') only when semantic locators fail.
- Use locator('table >> tr') as a last resort with scoped context.

## Conventions

- Preferred order: getByRole, getByLabel, getByPlaceholder, getByTestId, getByText, locator.
- Keep locators inside page objects.
- Scope locators when multiple matches exist.

## Notes

- Avoid XPath, force clicks, and brittle text-only selectors.
