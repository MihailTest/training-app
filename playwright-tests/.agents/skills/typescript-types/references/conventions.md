# TypeScript Types Conventions

## Examples

- Add a LoginForm type with email and password fields.
- Add a UserRole union type for 'admin' | 'qa' | 'viewer'.
- Replace an any with a typed interface for a response object.
- Add explicit return types for exported functions.
- Move shared types into specs/utils/types.ts.

## Conventions

- Avoid any.
- Exported functions must have explicit return types.
- Reuse existing domain types before adding new ones.
- Keep types narrow and readable.

## Notes

- Prefer simple types over complex generics.
