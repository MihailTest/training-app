# Text Input - Manual Test Cases

## Happy Path - Submit a valid movie review

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/text-input`.

Steps:

1. Open `/form-controls/text-input`.
2. Confirm page header is visible and the review form is enabled.
3. Enter `Inception` in Movie Title.
4. Enter `nolan@example.com` in Director Name.
5. Enter a review longer than 20 characters in Review Text.
6. Set Rating to `8`.
7. Set Release Year to `2010`.
8. Click `Submit Review`.
9. Read the `Review Summary` panel.

Expected result:

- Review summary is rendered in the `Review Summary` panel.
- Submitted values (title, director, review, rating, year) are visible.
- Empty-state text is no longer shown.

## Negative Path - Reject review text below minimum length

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/text-input`.

Steps:

1. Open `/form-controls/text-input`.
2. Confirm initial empty-state is shown in `Review Summary`.
3. Enter valid values in Movie Title and Director Name.
4. Enter a short review like `Too short` in Review Text.
5. Optionally set Rating to show mixed valid/invalid input state.
6. Click `Submit Review`.
7. Read `Review Summary` panel after submit.

Expected result:

- Submission is not accepted because review length is below rule threshold.
- Summary panel stays in empty-state (`No review submitted yet`).
- No partial review record is rendered.
