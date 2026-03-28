# DB Validation Conventions

## Examples
- Verify a user row exists after signup with matching email.
- Verify a course status is set to PUBLISHED after publish action.
- Verify a login attempt creates a session record for the user.
- Verify a task completion record exists after marking it done.
- Verify a deletion flag is set instead of a hard delete.

## Conventions
- Use read-only queries only.
- Keep queries minimal and tied to a single test step.
- Assert on stable identifiers, not volatile fields.
- Avoid broad queries that can be affected by parallel runs.

## Notes
- If DB access is not available, explain what query you would run and why.
