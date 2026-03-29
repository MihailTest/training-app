# Data Table - Manual Test Cases

## Happy Path - Filter table by valid employee keyword

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/data-table`.

Steps:

1. Open `/form-controls/data-table`.
2. Note the number of visible rows before filtering.
3. Enter `John` in the search field.
4. Wait for the table to refresh.
5. Verify visible rows are reduced to matching records.
6. Inspect first visible row and verify it contains `John`.
7. Clear the search field.
8. Verify the full row set is restored.

Expected result:

- Search filters data set correctly for matching keyword.
- Clearing search restores original table state.

## Negative Path - No-match search returns empty rows

Preconditions:

- Data table page is loaded.

Steps:

1. Enter a non-existent keyword like `zzzzzz` in search.
2. Wait for filtering to apply.
3. Verify no table rows are visible.
4. Clear search input.
5. Verify rows return after clearing.

Expected result:

- Non-matching search yields an empty table state.
- No stale row remains visible during no-match condition.
