# Playwright Tests (Training App)

## 1. Overview

This folder is a **standalone Playwright test workspace** for the training app UI. It uses page objects, fixtures, and typed test data to keep tests stable and readable.

Core principles:

- Specs show the user journey.
- Page objects expose reusable UI actions/reads.
- Assertions stay in specs by default.
- Locators are semantic and live in page objects.
- Confirmed application defects remain executable as expected failures instead of being skipped.

## 2. Tech Stack

- Playwright (`@playwright/test`)
- TypeScript
- pnpm (workspace-local `package.json`)
- ESLint + Prettier

## 3. Project Structure

Key folders and files:

- `specs/ui/tests/` UI test specs
- `specs/ui/page-objects/` page objects
- `specs/ui/page-objects/globals/` shared base page + helpers
- `specs/ui/test-data/` test data (credentials and helpers)
- `specs/utils/` fixtures, constants, types, utilities
- `specs/config/` global setup and step decorator
- `.state/` generated auth storage state files
- `artifacts/` test output (screenshots, traces, reports)

## 4. Setup

Prerequisites:

- Node.js `20.19.1`
- pnpm `10.14.0`
- Training app running at `BASE_URL` (default `http://localhost:3000`)

Install:

```bash
cd playwright-tests
pnpm install
pnpm exec playwright install
```

Environment:
`playwright-tests/.env` is committed for this demo repo.

```
BASE_URL=http://localhost:3000
QA_USER=qa.user
QA_PASSWORD="Demo#123"
ADMIN_USER=admin.user
ADMIN_PASSWORD="Admin#123"
```

## 5. Running Tests

Refresh both role-specific auth states directly when needed:

```bash
pnpm run test:setup
```

Run admin UI tests:

```bash
pnpm run admin-user-tests
```

Run the same suite with QA storage state:

```bash
pnpm run qa-user-tests
```

Both browser projects depend on the setup project, so a normal project run creates missing or refreshed storage state automatically.

Run smoke or regression:

```bash
pnpm run test:smoke
pnpm run test:regression
```

Run a single spec:

```bash
pnpm exec playwright test specs/ui/tests/login.spec.ts --project=chromium
```

Headed/debug runs (Playwright built-in):

```bash
pnpm exec playwright test specs/ui/tests/login.spec.ts --project=chromium --headed
```

## 6. How Tests Should Be Written Here

Follow these repo conventions (based on current code and `AGENTS.md`):

- **Specs own the flow and assertions.**
- **Page objects own locators** and reusable UI actions/reads.
- **Assertions** stay in specs by default.
- Prefer user-facing locators and explicit contracts. Choose role, label, or test id based on semantics and stability rather than a rigid ranking.
- Assertion-facing locators may be exposed as public `readonly Locator` fields so specs retain Playwright auto-retry behavior.
- **Avoid** XPath, `force: true`, and `waitForTimeout`.
- Use fixtures from `@utils/ui-fixtures` (`specs/utils/ui-fixtures.ts`).
- Call `toBeLoaded()` before deep interactions.
- Prefer locator-based expects with messages:
  `await expect(locator, 'main container should be visible').toBeVisible();`

### Known Defects As Executable Evidence

This repository is a technical showcase. It intentionally keeps several confirmed application defects under automation to demonstrate that the suite detects real behavior regressions:

- the Home hero has an empty level-one heading;
- the Draggable Elements card points to an unregistered route;
- employee search does not reset a stale pagination index;
- the PDF template action shows a toast but does not start a browser download.

These scenarios use `@known-defect` and `test.fail(true, reason)`. Playwright reports them as expected failures, so the default suite stays green. If the application is fixed, the unexpected pass fails the run and tells the contributor to remove the annotation. They must not be converted to `test.skip`.

### Authentication Design

The setup project creates separate ignored storage-state files for admin and QA users. The admin and QA Chromium projects consume the matching file through project dependencies. This demonstrates multi-role state reuse without logging in before every test.

The showcase tests do not mutate shared server-side account data, so one reusable state per role is safe. In a production suite where parallel tests change shared account state, use one provisioned account and storage state per worker.

## 7. Debugging & Troubleshooting

Common issues:

- **App not running**: ensure the app is running and `BASE_URL` matches.
- **Stale sessions**: delete `.state/` and re-run `pnpm run test:setup`.
- **Expected failures**: inspect the `@known-defect` annotation in the HTML report; an expected failure is documented product evidence, not a flaky retry target.
- **Flaky tests**: inspect trace and artifacts in `artifacts/` and look for timing/state/locator issues.

Useful locations:

- Auth setup: `specs/config/global.setup.ts`
- Storage state paths: `specs/utils/constants.ts`
- Helpers: `specs/ui/page-objects/globals/helpers.ts`

## 8. CI

This workspace is intended to be run from the repo root CI. The workflow file is **not** inside `playwright-tests/`. If present in your full repo, look under `.github/workflows/` (e.g., a scheduled UI workflow). Align local runs with CI by:

- Keeping setup-project dependencies enabled for every project that consumes storage state.
- Using the same Playwright version as in `package.json`.

## 9. Day-to-Day Contribution Flow

1. Understand the change and scope.
2. Update or add tests in `specs/ui/tests/`.
3. Add or adjust page object methods in `specs/ui/page-objects/`.
4. Run `pnpm run check` and a targeted test command.
5. Confirm `@known-defect` scenarios still fail for the documented product reason.
6. Review for boundary violations, locator quality, and report readability.

## 10. Maintenance Guidance

- Keep page objects small and focused on a single page or component area.
- Avoid helper/utility sprawl; prefer page object methods.
- Refactor only when repetition is real and the change stays local.
- Keep docs and CI expectations in sync with actual scripts in `package.json`.
