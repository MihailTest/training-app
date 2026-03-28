# Refactor Test Conventions

## Examples

- Remove duplicated locator usage in a spec by using a page object method.
- Rename a variable in login.spec.ts to clarify intent.
- Extract a small helper for repeated assertions within one spec file.
- Inline a helper that is only used once.
- Replace a hardcoded string with a shared constant already in use.

## Conventions

- Keep refactors local to touched files.
- Do not change behavior or architecture.
- Avoid large renames or file moves.
- Extract helpers only when repetition is real.

## Notes

- Refactors should be easy to review and low risk.
