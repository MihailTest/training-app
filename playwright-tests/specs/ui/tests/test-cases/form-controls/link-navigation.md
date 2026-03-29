# Link Navigation - Manual Test Cases

## Happy Path - Navigate back to Home via internal link

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/link-navigation`.

Steps:

1. Open `/form-controls/link-navigation`.
2. Verify page header and link cards are visible.
3. Click internal `Home` link.
4. Confirm route changes to `/`.
5. Verify home hub cards are visible.

Expected result:

- Internal link routes correctly to home.
- User lands on a stable, usable home screen.

## Negative Path - Broken route link opens not-found page

Preconditions:

- App is running at `BASE_URL`.

Steps:

1. Open `/form-controls/link-navigation`.
2. Click `Broken Link`.
3. Confirm route changes to `/not-found`.
4. Verify not-found page content is shown.
5. Navigate back to previous page using browser back.

Expected result:

- Broken link routes to not-found page instead of a valid module page.
- Back navigation can recover prior location.
