# AGENTS instructions for automation showcase project

## Scope
- Applies to all repository code under `playwright-tests/**/*`.
- Applies to changes in `specs/`, `ui/`, and `utils/`.

## Enforcement level
- Strict compliance is required.
- Block any pull request that violates mandatory rules.
- Non-compliance means no merge.

## Purpose
This repository is a Playwright Test + TypeScript automation project.
Keep all changes production-ready, stable, and maintainable.

## Non-negotiable operating rules
1. Do not edit any file until the user explicitly requests it.
2. Confirm requested scope (UI tests, shared tooling, docs, etc.) before modifying anything unless it is an obvious fix.
3. Do not refactor architecture unless explicitly requested.
4. Avoid brittle stability hacks (`waitForTimeout`, `force: true`, XPath, deep selectors, positional selectors) unless explicitly justified and approved.
5. Prefer deterministic artifacts and evidence written via `testInfo.outputPath(...)`.

## Project context
- Stack: Playwright Test + TypeScript (strict) + pnpm + ESLint
- Test runner: Playwright Test
- Authentication: storage state/global setup where available
- Evidence: trace/screenshot/video on failure and deterministic exports

## Repository structure
Respect existing layers and patterns.

```
playwright-tests/
  specs/
    config/
      global.setup.ts
      steps-configuration.ts
    ui/
      page-objects/
        globals/
          base-page.ts
          helpers.ts
        components/
          *.component.ts
        [domain folders]/
          [page objects]
      test-data/
        *.ts
      tests/
        *.spec.ts
      test-cases.md
    utils/
      ui-fixtures.ts
      types.ts
      constants.ts
      utility-functions.ts
```

Rules:
- Do not move files between areas unless explicitly requested.
- Add code in the correct layer (page object, component, utils, config).
- Add shared types to `specs/utils/types.ts` when applicable.
- Register new page objects in fixtures and consume them via fixtures in tests.

## TypeScript rules
- Strict typing only; `any` is forbidden.
- Exported functions require explicit return types.
- Use `interface` for complex structured data.
- Page/Component constructors must include `Page` and `TestInfo`.
- Type assertions (`as Type`) require explicit justification.

## Playwright best practices
### Locator strategy (priority)
1. `getByTestId()`
2. `getByRole()`
3. `getByLabel()`
4. `getByPlaceholder()`, `getByText()`, `getByAltText()`, `getByTitle()` (only when justified)
5. `locator()` as last resort (stable and scoped)

Rules:
- XPath is not allowed unless explicitly justified.
- Avoid deep CSS and position-based selectors unless structure/order is guaranteed and documented.
- Scope locators to stable containers.

### Assertions and waits
- Use web-first assertions and locator auto-waiting.
- Do not use fixed waits for stability.
- Every assertion must include a descriptive message.

Assertion pattern:

```ts
await expect(locator, 'Expected element to be visible.').toBeVisible();
```

### Steps and logging
- All public user-facing page/component methods must use `@step`.
- Logging should be structured and minimal.
- No debug-noise logging.

## Page object standards
Mandatory:
- Extend `BasePage`.
- Implement assertion-based `toBeLoaded()`.
- Use composition for reusable UI areas.
- Keep assertions in page/component methods (no direct `expect()` in tests).
- Use helper click wrapper (`helpers.clickOnLocator(...)`) instead of direct `page.click()`.

Constructor contract:

```ts
constructor(public readonly page: Page, public readonly testInfo: TestInfo) {
  super(page, testInfo);
}
```

Locators:
- `private readonly` by default.
- `public readonly` only for composed components/shared stable areas.

JSDoc:
- Every public method must include JSDoc with clear purpose and `@param` descriptions.

## Base page contract
`BasePage` must enforce readiness via:

```ts
public abstract toBeLoaded(): Promise<void>;
```

## Component standards
- Components should extend `BaseComponent` (when available) or be composed in pages.
- Standalone components should implement `toBeLoaded()`.
- Component locators must be container-scoped.
- Public component methods must use `@step`.
- Component files use `.component.ts` suffix.

## Fixtures and tests
- Import `test` from fixture entrypoint (`@ui/ui-fixtures.ts`).
- Fixtures must be strongly typed and centralized.
- Do not manually instantiate page objects in tests if fixture exists.
- Tests must be independent and parallel-safe.
- Use `test.describe()` for grouping and proper tags for suite organization.

Test design rules:
- One test validates one user goal/scenario.
- Single primary reason to fail.
- Test names should describe business outcomes.
- No hardcoded test data in tests; use typed factories/helpers.
- No direct `expect()` in test files.

## Artifacts and evidence
- Keep Playwright failure artifacts enabled.
- Write custom artifacts via `testInfo.outputPath(...)`.
- Use stable, traceable filenames.

## Quality bar (automatic blockers)
Block or reject changes that introduce:
- `waitForTimeout` used for stability
- `force: true` without explicit approval
- XPath without explicit approval
- deep/fragile selectors without justification
- hardcoded credentials/secrets
- hardcoded test data in tests
- `any`, missing exported return types, unjustified type assertions
- empty catch blocks or swallowed errors
- direct `expect()` in tests
- assertions without custom messages
- missing `@step` on public action methods
- mutable/public non-readonly locators
- manual page object construction in tests where fixtures exist
- noisy debug logging

## Code review checklist
Before review:
- Page/component readiness methods exist where required (`toBeLoaded()`).
- Public methods include `@step` and JSDoc.
- Assertions stay in page/component methods and include messages.
- Locators follow visibility and stability rules.
- Tests use fixtures and scenario-focused naming.
- No prohibited waits/force/XPath/debug noise.

## Pre-merge gates
Must pass:
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run format:check`
- Affected Playwright tests (at minimum targeted scope)

## Resources
- Playwright best practices: https://playwright.dev/docs/best-practices
- Playwright page object model: https://playwright.dev/docs/pom
- TypeScript handbook: https://www.typescriptlang.org/docs/
