# Button Interactions - Manual Test Cases

## Happy Path - Trigger double-click action log

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/button-interactions`.

Steps:

1. Open `/form-controls/button-interactions`.
2. Confirm `Action Log` starts in empty-state.
3. Double-click `Create Task (Dbl Click)`.
4. Observe action log update.
5. Verify new log entry includes task creation event.
6. Trigger one additional supported action (for example `Assign Task`) to verify log continues to append.

Expected result:

- Double-click action creates an entry in `Action Log`.
- Additional supported actions append new entries without clearing prior ones.

## Negative Path - Single click does not trigger double-click action

Preconditions:

- `Action Log` is in empty-state.

Steps:

1. Single-click `Create Task (Dbl Click)` once.
2. Wait briefly for any state update.
3. Review `Action Log` content.
4. Single-click again (not double-click cadence).
5. Re-check `Action Log`.

Expected result:

- No create-task event is logged from single clicks.
- Empty-state or unchanged log confirms double-click is required.
