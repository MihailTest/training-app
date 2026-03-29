# Nested Checkboxes - Manual Test Cases

## Happy Path - Select skills across nested categories

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/nested-checkboxes`.

Steps:

1. Open `/form-controls/nested-checkboxes`.
2. Expand skill groups if collapsed.
3. Select `React` under Frontend Skills.
4. Select `TypeScript` under Frontend Skills.
5. Select one additional skill from another group (for example Backend or DevOps).
6. Review `Selected Skills` panel.
7. Verify selected tags correspond to checked boxes.

Expected result:

- `Selected Skills` panel lists all checked skills.
- Selection state remains consistent across nested groups.

## Negative Path - Reset clears selected skills

Preconditions:

- At least two skills are selected.

Steps:

1. Confirm `Selected Skills` panel currently contains entries.
2. Click `Reset`.
3. Re-check previously selected checkboxes.
4. Review `Selected Skills` panel again.

Expected result:

- All selected checkboxes are cleared.
- Summary panel returns to empty-state (`No skills selected`).
- No stale skill tags remain.
