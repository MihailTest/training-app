# Playwright Tests (Training App)

## 1. Overview

This folder is a **standalone Playwright test workspace** for the training app UI. It uses page objects, fixtures, and typed test data to keep tests stable and readable.

Core principles:

- Specs show the user journey.
- Page objects expose reusable UI actions/reads.
- Assertions stay in specs by default.
- Locators are semantic and live in page objects.

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

Create auth storage state (recommended before running UI tests):

```bash
pnpm run test:setup
```

Run admin UI tests:

```bash
pnpm run admin-user-tests
```

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

QA tests:
The QA project is commented out in `playwright.config.ts`. Uncomment it and then run:

```bash
pnpm run qa-user-tests
```

## 6. How Tests Should Be Written Here

Follow these repo conventions (based on current code and `AGENTS.md`):

- **Specs own the flow and assertions.**
- **Page objects own locators** and reusable UI actions/reads.
- **Assertions** stay in specs by default.
- **Locator order**: `getByRole` -> `getByLabel` -> `getByPlaceholder` -> `getByTestId` -> `getByText` -> `locator`.
- **Avoid** XPath, `force: true`, and `waitForTimeout`.
- Use fixtures from `@utils/ui-fixtures` (`specs/utils/ui-fixtures.ts`).
- Call `toBeLoaded()` before deep interactions.
- Prefer locator-based expects with messages:
  `await expect(locator, 'main container should be visible').toBeVisible();`

## 7. Debugging & Troubleshooting

Common issues:

- **App not running**: ensure the app is running and `BASE_URL` matches.
- **Stale sessions**: delete `.state/` and re-run `pnpm run test:setup`.
- **Flaky tests**: inspect trace and artifacts in `artifacts/` and look for timing/state/locator issues.

Useful locations:

- Auth setup: `specs/config/global.setup.ts`
- Storage state paths: `specs/utils/constants.ts`
- Helpers: `specs/ui/page-objects/globals/helpers.ts`

## 8. CI

This workspace is intended to be run from the repo root CI. The workflow file is **not** inside `playwright-tests/`. If present in your full repo, look under `.github/workflows/` (e.g., a scheduled UI workflow). Align local runs with CI by:

- Running `pnpm run test:setup` before UI tests.
- Using the same Playwright version as in `package.json`.

## 9. Day-to-Day Contribution Flow

1. Understand the change and scope.
2. Update or add tests in `specs/ui/tests/`.
3. Add or adjust page object methods in `specs/ui/page-objects/`.
4. Run `pnpm run typecheck` and a targeted test command.
5. Review for boundary violations and locator quality.

## 10. Codex / Agentic Usage (Brief)

Codex is configured for this workspace, but usage is manual.
Use instructions.md as the primary operational guide.

Quick entry points:

- Built-in CLI checks: /status, /permissions, /review
- Repo prompt templates: .agents/commands/plan.md <request>, .agents/commands/tdd.md <scope>, .agents/commands/review.md <scope>

## 11. Maintenance Guidance

- Keep page objects small and focused on a single page or component area.
- Avoid helper/utility sprawl; prefer page object methods.
- Refactor only when repetition is real and the change stays local.
- Keep docs and CI expectations in sync with actual scripts in `package.json`.
