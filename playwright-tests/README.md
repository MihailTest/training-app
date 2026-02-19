# Playwright Tests (Training App)

This folder is a **standalone Playwright test workspace**. It has its own `package.json` and uses **pnpm**.
This project lives in a GitHub repo so it can be referenced in a CV or portfolio.
Use this README when you want to run UI tests locally.

---

## 1) Prerequisites

- Node.js `20.19.1` (see root `.nvmrc`)
- pnpm `10.14.0` (see `package.json`)
- The training app running locally at `http://localhost:3000`

---

## Quickstart (two terminals)

Terminal 1 (app):

```bash
cd training-app
npm install
npm run dev
```

Terminal 2 (tests):

```bash
cd training-app/playwright-tests
pnpm install
pnpm exec playwright install
pnpm run test:setup
pnpm run admin-user-tests
```

---

## 2) Install (one-time setup)

From the repo root:

```bash
cd playwright-tests
pnpm install
pnpm exec playwright install
```

---

## 3) Configure environment

### NOTE: This .env is intentionally committed for this demo repo (non-production).

### Credentials are fake training defaults used by the sample app and tests.

There is already a local `.env` in this folder:

```
BASE_URL=http://localhost:3000
QA_USER=qa.user
QA_PASSWORD="Demo#123"
ADMIN_USER=admin.user
ADMIN_PASSWORD="Admin#123"
```

If your app runs somewhere else or you use different credentials, update `playwright-tests/.env`.

---

## 4) Start the app (required for UI tests)

Open a separate terminal at the repo root (the main `training-app/` folder):

```bash
cd training-app
npm install
npm run dev
```

The UI must be reachable at the `BASE_URL` from your `.env`.

---

## 5) Run tests

In another terminal, run the tests from the Playwright workspace folder:

```bash
cd training-app/playwright-tests
```

### A) Create login storage state (recommended first)

This logs in as admin + QA and saves session files under `.state/`:

```bash
pnpm run test:setup
```

### B) Run admin user UI tests

```bash
pnpm run admin-user-tests
```

### B1) Run admin smoke tests

```bash
pnpm run test:smoke
```

### B2) Run admin regression tests

```bash
pnpm run test:regression
```

### C) Run QA user UI tests (optional)

The QA project is **currently commented out** in `playwright-tests/playwright.config.ts`.
To enable QA tests:

1. Uncomment the QA project block.
2. Then run:

```bash
pnpm run qa-user-tests
```

### D) Run a single test file

```bash
pnpm exec playwright test specs/ui/tests/login.spec.ts --project=chromium
```

---

## 6) Reports & artifacts

- Test artifacts (screenshots, traces, videos):
  `playwright-tests/artifacts/<shard>/test-results-artifacts/` (default shard: `local`)
- HTML report:

```bash
pnpm exec playwright show-report
```

---

## 7) Common issues

**App not running**  
Make sure the UI is running and `BASE_URL` matches it.

**Login fails / stale sessions**  
Delete `.state/` and run `pnpm run test:setup` again.

**QA tests command fails**  
The QA project is disabled by default. Uncomment it in `playwright-tests/playwright.config.ts`.

---

## Helpful file locations

- Test config: `playwright-tests/playwright.config.ts`
- Test specs: `playwright-tests/specs/ui/tests/`
- Page objects: `playwright-tests/specs/ui/page-objects/`
- Fixtures/helpers: `playwright-tests/specs/utils/`
