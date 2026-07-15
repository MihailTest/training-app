# Playwright Tests (Training App)

## Project Overview

Standalone Playwright UI test workspace for the training app.
Uses pnpm, fixtures, and page objects for stable user-journey tests.

## Critical Rules

### 1. Code Organization

- Protect scope: change only files required for the task.
- Keep changes small, localized, and aligned with existing patterns.
- Avoid unnecessary refactors or file moves.

### 2. Architecture Boundaries

- Spec: owns user journey, sequencing, and assertions; no locators.
- Page object: reusable UI actions/reads and readiness checks; no full business flows.
- Fixture: constructs page objects and shared context; no business assertions.
- Helper: thin UI interaction support; no layered abstractions.
- Utility: general-purpose, non-UI helpers; keep minimal and logic-light.

### 3. Locator Strategy

Prefer user-facing locators and explicit UI contracts. Choose `getByRole`, `getByLabel`, or `getByTestId` based on the element's semantics and stability instead of applying a rigid global ranking. Use `getByPlaceholder` or `getByText` when they are the clearest stable contract, and use `locator` only when no stronger contract exists.

Avoid: XPath, styling-only selectors, deep DOM chains, broad text matches, and `force: true`.

- Keep implementation locators as `private readonly` fields at the top of page objects and initialize them in the constructor.
- Assertion surfaces may be intentionally exposed as public `readonly Locator` fields or getters so specs can use Playwright web-first assertions.
- Exception: dynamic/parameterized locators may be created in dedicated helper methods when constructor field declaration is not practical.
- For page-object creation/refactor, run discovery first on the target route(s): roles/labels/accessible names, form structure, and button actions.
- Do not guess locator names; keep only selectors validated from the actual page.

### 4. Assertions

- Business assertions stay in specs.
- Page objects may include reusable UI-specific checks (e.g., `toBeLoaded()`).
- Prefer locator-based, web-first assertions with messages, e.g. `await expect(locator, 'main container should be visible').toBeVisible();`.
- Avoid manual DOM assertions such as `expect(await locator.isVisible()).toBe(true)` when a retrying locator assertion exists.

### 5. Anti-patterns

- Hidden business flow inside page objects.
- `waitForTimeout`, XPath, or forced clicks.
- Logic graveyards in helpers/utilities.
- Wrapper-on-wrapper abstractions without clear value.

### 6. Type & Documentation Rules

- Add JSDoc to public page-object methods only when the contract, side effect, parameter meaning, or synchronization behavior is not obvious from the name and types.
- Put reusable types in the closest domain-specific type module. Keep `specs/utils/types.ts` for types shared across domains.
- Do not declare reusable domain/page types inside spec files or page-object files.
- Prefer reusable test data from specs/ui/test-data over hardcoded test values in specs/page objects.
- Keep only truly scenario-specific literals inline when extracting to test data adds no practical value.

### 7. Text Convention Rules

- Prefer exact accessible names when the UI contract is stable. Use case-insensitive patterns only when case or surrounding copy is intentionally flexible.

### 8. Showcase Defect Rules

- The default suite must remain green even when the showcase intentionally includes known application defects.
- Represent a confirmed product defect with `test.fail(true, 'Known application defect: ...')` and the `@known-defect` tag.
- The test must assert the desired product behavior, not the broken behavior.
- Do not use `test.skip` for a known product defect. An unexpected pass must fail the run so the annotation is removed when the application is fixed.
- Keep timeout-sensitive expected failures short and deterministic.
Implementation rules:

- Keep one test per user flow.
- Keep assertions in specs; keep locators in page objects.
- Prefer reusable test data from `specs/ui/test-data` instead of hardcoded values.
- Reuse existing fixtures/page objects/helpers before adding new ones.

## File Structure

```
playwright-tests/
|-- specs/ui/tests/         # UI specs
|-- specs/ui/page-objects/  # Page objects
|-- specs/utils/            # Fixtures and helpers
|-- .agents/workflows/      # Repeatable task guides (reference)
|-- .agents/                # Commands, skills, and workflow references
|-- .codex/                 # Codex config
```

## Build & Test

```
pnpm install
pnpm run typecheck
pnpm run lint
pnpm run format:check
pnpm run test:setup
pnpm run admin-user-tests
```

## Verification Rule (Required)

- TypeScript/test code: run `pnpm run typecheck`, `pnpm run lint`, `pnpm run format:check`, and the smallest affected Playwright test.
- Playwright config/auth changes: also run `pnpm exec playwright test --list` and an affected project test.
- Documentation-only changes: run Prettier against the changed documentation files; typecheck and UI tests are not required.
- If a targeted test fails because of a test implementation defect, diagnose and make a bounded correction. Stop when the application contract is unclear or the failure is external to the requested scope.

## Key Patterns

### Storage State Setup

The admin and QA projects depend on the setup project, so normal project runs create role-specific state automatically. Run setup directly only when refreshing or debugging state:

```
pnpm run test:setup
```

### Multi-Role Showcase

- `setup` authenticates one admin and one QA account and writes separate ignored state files.
- `chromium` uses admin state; `qa chromium` uses QA state.
- Shared states are appropriate here because the showcase does not mutate shared account data.
- A production suite that mutates server-side state should provision a unique account and storage state per parallel worker.

### Locator Placement

Locators belong in page objects, not specs.

## Environment

`.env` lives in `playwright-tests/.env` and is committed as this is a demo repo.

```
BASE_URL=http://localhost:3000
QA_USER=qa.user
QA_PASSWORD="Demo#123"
ADMIN_USER=admin.user
ADMIN_PASSWORD="Admin#123"
```

## Commands

Commands are markdown files in `.agents/commands/` with YAML frontmatter:

- `name`: command name (must match filename).
- `description`: include a concrete usage example with arguments.

Run commands using file-path invocation (not slash menu discovery):

- Provide the command file path and the target file path(s) in your request.
- Example: `.agents/commands/review.md specs/ui/page-objects/home-page.ts`.
- If arguments are needed, append them after the command path.

The body should use `Input: $ARGUMENTS`, a numbered `FLOW`, and `RULES`
with `ALWAYS_DO` and `NEVER_DO`.
