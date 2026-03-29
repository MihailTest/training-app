# Dynamic Elements - Manual Test Cases

## Happy Path - Add custom field to dynamic form preview

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/dynamic-elements`.

Steps:

1. Open `/form-controls/dynamic-elements`.
2. Confirm initial `Form State (JSON)` is visible.
3. Click `Add Custom Field` once.
4. Verify `Custom Field 1` appears in preview area.
5. Verify JSON state contains one field entry.
6. Click `Add Custom Field` again.
7. Verify second field is appended in JSON state.

Expected result:

- Dynamic preview and JSON state update per click.
- Field entries increment predictably without resetting existing data.

## Negative Path - Baseline state stays empty before adding fields

Preconditions:

- Page freshly opened.

Steps:

1. Open `/form-controls/dynamic-elements`.
2. Do not interact with `Add Custom Field`.
3. Inspect `Form State (JSON)` section.
4. Confirm `fields` array remains empty.

Expected result:

- Initial state is stable and empty (`fields: []`).
- No custom field appears until explicit add action is triggered.
