# Test Data Strategy Conventions

## Examples

- Add a stable user fixture in specs/ui/test-data/users.ts.
- Add a course test data object in specs/ui/test-data/courses.ts.
- Use environment credentials for login instead of hardcoded values.
- Add a minimal data object for a single scenario.
- Reuse an existing data factory when adding a new test.

## Conventions

- Prefer specs/ui/test-data for reusable data.
- Keep data minimal and scoped to a single scenario.
- Use environment-backed data for credentials or secrets.
- Ensure data is deterministic and parallel-safe.

## Notes

- Avoid large, shared data blobs that become dumping grounds.
