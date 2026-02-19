Login Manual Test Cases

These manual scenarios match current automated coverage in:

- specs/ui/tests/login.spec.ts
- specs/ui/tests/home.spec.ts

---

## Login

1. Admin user logs in successfully
   Summary:
   Confirm that an admin user can sign in and land on the authenticated home route.

Preconditions:

- App is running and reachable at BASE_URL.
- Valid admin credentials are configured.
- Browser session is clean.

Steps:

1. Open `/auth/login`.
2. Enter valid admin username.
3. Enter valid admin password.
4. Click Login.

Expected:

- Login succeeds.
- User is redirected to `/`.

2. QA user logs in successfully
   Summary:
   Confirm that a QA user can sign in and reach the same authenticated landing route.

Preconditions:

- App is running and reachable at BASE_URL.
- Valid QA credentials are configured.
- Browser session is clean.

Steps:

1. Open `/auth/login`.
2. Enter valid QA username.
3. Enter valid QA password.
4. Click Login.

Expected:

- Login succeeds.
- User is redirected to `/`.

3. Login fails with incorrect password
   Summary:
   Verify failed authentication for a valid username with an invalid password.

Preconditions:

- App is running and reachable at BASE_URL.
- Admin username exists.
- Browser session is clean.

Steps:

1. Open `/auth/login`.
2. Enter valid admin username.
3. Enter invalid password (for example, append `-invalid`).
4. Click Login.

Expected:

- Login fails.
- User remains on `/auth/login`.
- `Invalid credentials` message is visible.

4. Empty credentials trigger native validation
   Summary:
   Verify browser-native required-field behavior when the user submits an empty login form.

Preconditions:

- App is running and reachable at BASE_URL.
- Browser session is clean.

Steps:

1. Open `/auth/login`.
2. Leave username and password empty.
3. Click Login.

Expected:

- Submission is blocked.
- User remains on `/auth/login`.
- Username field receives focus.
- Browser native message appears for the username field (for example, `Please fill out this field.`).

5. Credentials with leading/trailing spaces are rejected
   Summary:
   Validate current behavior when credentials include leading and trailing spaces.

Preconditions:

- App is running and reachable at BASE_URL.
- Valid admin credentials are configured.
- Browser session is clean.

Steps:

1. Open `/auth/login`.
2. Enter username with leading and trailing spaces.
3. Enter password with leading and trailing spaces.
4. Click Login.

Expected:

- Login fails.
- User remains on `/auth/login`.
- `Invalid credentials` message is visible.

---

## Home

1. Home page renders key content
   Summary:
   Check that core home sections and cards are visible after loading the app root.

Preconditions:

- App is running and reachable at BASE_URL.

Steps:

1. Open `/`.
2. Verify hero copy is visible.
3. Verify form-control cards are visible.
4. Verify category headers are visible.
5. Verify student registration card is visible.

Expected:

- Main home content loads without errors.
- Key cards and section headers are present.

2. Card navigation and browser back work correctly
   Summary:
   Validate route navigation from home cards and return flow with browser Back.

Preconditions:

- App is running and reachable at BASE_URL.

Steps:

1. Open `/`.
2. Click `link-text-input` and confirm route `/form-controls/text-input`.
3. Go Back and verify home is loaded.
4. Click `link-window-management` and confirm route `/browser-interactions/window-management`.
5. Go Back and verify home is loaded.

Expected:

- Both card routes open correctly.
- Returning with Back restores a usable home page each time.

3. Unknown route recovery returns user to a stable home page
   Summary:
   Validate recovery behavior from an invalid route.

Preconditions:

- App is running and reachable at BASE_URL.

Steps:

1. Open `/`.
2. Navigate to `/this-route-should-not-exist`.
3. Trigger recovery to home (link or fallback behavior).
4. Click `link-data-table` and confirm route `/form-controls/data-table`.

Expected:

- Invalid route does not break the app.
- Recovery returns to home successfully.
- Normal card navigation still works after recovery.

4. Responsive behavior remains usable on mobile and desktop
   Summary:
   Verify core navigation and layout behavior at mobile and desktop viewport sizes.

Preconditions:

- App is running and reachable at BASE_URL.

Steps:

1. Set viewport to `390x844`.
2. Open `/` and confirm no horizontal overflow.
3. Scroll to `link-draggable-elements` and open `/drag-drop/draggable-elements`.
4. Go Back and verify home is loaded.
5. Set viewport to `1440x900`.
6. Verify form-control cards are visible.
7. Verify viewport width is greater than `1200`.

Expected:

- Mobile view remains usable with no horizontal overflow.
- Desktop view renders correctly and keeps navigation stable.
