# Radio Selection - Manual Test Cases

## Happy Path - Select a paid subscription plan

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/radio-selection`.

Steps:

1. Open `/form-controls/radio-selection`.
2. Verify default `Plan Summary` state is visible.
3. Select `Professional Plan` radio option.
4. Confirm only one plan option is selected.
5. Review the `Plan Summary` details.
6. Confirm price and included feature list are shown.

Expected result:

- `Plan Summary` updates for Professional plan.
- Plan-specific pricing and features are displayed.
- Selection state behaves as a single-choice group.

## Negative Path - No selection keeps neutral summary state

Preconditions:

- Page is loaded with no plan selected.

Steps:

1. Open `/form-controls/radio-selection`.
2. Do not select any plan.
3. Observe `Plan Summary` content.
4. Click `Reset` and re-check summary content.

Expected result:

- Summary remains in default state (`Select a plan to view details`).
- No plan-specific content appears until a radio option is selected.
