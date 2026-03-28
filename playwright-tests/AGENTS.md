# AGENTS guide for Playwright tests

## Scope
- Applies to `playwright-tests/**` only.
- Top-level operating guide for this test workspace.

## Working rules
- Only change files the user asked for or that are required to complete the task.
- No architecture refactors or file moves unless explicitly requested.
- Keep diffs small, localized, and aligned with existing patterns.
- Inspect similar files before introducing a new pattern.

## Repo map (ownership)
- `specs/ui/tests/`: UI test specs.
- `specs/ui/page-objects/`: page objects and shared UI components.
- `specs/ui/test-data/`: typed test data and helpers.
- `specs/utils/`: shared fixtures, helpers, constants, types.
- `specs/config/`: global setup and step configuration.
- `.state/`: generated auth storage state.

## Core test rules
- Import `test` from `@utils/ui-fixtures`.
- Use fixtures for page objects; do not instantiate page objects in specs.
- One business scenario per test; tests must be deterministic and parallel-safe.
- Specs call page methods; assertions live in page objects.
- Call `toBeLoaded()` before deep interactions or reads.

## Locators & stability
- Prefer semantic locators in this order: `getByRole` -> `getByLabel` -> `getByPlaceholder` -> `getByTestId` -> `getByText` -> `locator`.
- No XPath, `force: true`, or `waitForTimeout`.
- Use `helpers.clickOnLocator(...)` for click actions from `BasePage`.

## Page objects
- Extend `BasePage` and implement `toBeLoaded()`.
- Public user-facing methods use `@step`.
- Keep locators `private readonly` unless intentionally shared.

## TypeScript
- No `any`.
- Exported functions require explicit return types.
- Shared domain types live in `specs/utils/types.ts`.

## Evidence
- Keep default Playwright artifacts enabled.
- Custom artifacts must use `testInfo.outputPath(...)`.

## Quality gates (when requested)
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run format:check`
- Targeted Playwright tests for the touched scope.

## Skills
- Task-specific guidance lives in `.agents/skills/*`.
