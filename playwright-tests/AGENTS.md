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

Preferred order: `getByRole` -> `getByLabel` -> `getByPlaceholder` -> `getByTestId` -> `getByText` -> `locator`.
Avoid: XPath, brittle text-only selectors, and `force: true`.

- In page objects, declare locators/selectors (including button locators) as private readonly fields at the top and initialize them in the constructor.
- Exception: dynamic/parameterized locators may be created in dedicated helper methods when constructor field declaration is not practical.
- For page-object creation/refactor, run discovery first on the target route(s): roles/labels/accessible names, form structure, and button actions.
- Do not guess locator names; keep only selectors validated from the actual page.

### 4. Assertions

- Assertions stay in specs by default.
- Page objects may include reusable UI-specific checks (e.g., `toBeLoaded()`).
- Prefer locator-based assertions with messages, e.g. `await expect(locator, 'main container should be visible').toBeVisible();`.

### 5. Anti-patterns

- Hidden business flow inside page objects.
- `waitForTimeout`, XPath, or forced clicks.
- Logic graveyards in helpers/utilities.
- Wrapper-on-wrapper abstractions without clear value.

### 6. Type & Documentation Rules

- Public page-object methods must include JSDoc.
- Shared reusable types must live in `specs/utils/types.ts`.
- Do not declare reusable domain/page types inside spec files or page-object files.
- Prefer reusable test data from specs/ui/test-data over hardcoded test values in specs/page objects.
- Keep only truly scenario-specific literals inline when extracting to test data adds no practical value.

### 7. Text Convention Rules

- For locator text matching, default to case-insensitive patterns (for example `/create ticket/i`) unless exact copy-sensitive matching is explicitly required.

### 8. Universal POM Prompt Template

Use this template when asking Codex/skills/subagents to create or refactor a page object:

`Create or refactor a page object for [Page Name].`
`First, navigate to [URL] and discover:`
`1) element roles, labels, and accessible names`
`2) form field structure`
`3) button names and actions`
`Then generate/update the page object following repo rules:`
`- locator priority order`
`- constructor-declared private readonly locators`
`- one-page/object boundaries`
`- reusable UI actions/reads only (no full business flows)`
`- JSDoc on public methods`
`- reusable types in specs/utils/types.ts`
`- reusable test data in specs/ui/test-data`
`- no waits/force/XPath anti-patterns`

### 9. Universal Test Prompt Template

Use this template when asking Codex/skills/subagents to create or refactor tests:

`Template: Create Test File`
`Create tests for [FEATURE]`
`Location: [spec repo location]`
`Import from: [fixtures/page objects/test data modules]`
`Tags: @[smoke|regression] + @[functional|e2e|api] (second tag reserved for future)`
`Structure: test.describe + beforeEach`
`Scenarios:`
`- [Happy path]`
`- [Error case]`
`- [Edge case]`

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

After any code or doc changes, run:

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run format:check`

If a change only touches markdown or config, you may skip `pnpm run test:setup` and UI tests.

## Key Patterns

### Storage State Setup

Create auth state files in `.state/` before running UI tests:

```
pnpm run test:setup
```

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

## AI System Map (Pillars)

- Project brain: `AGENTS.md` (this file).
- Agents runtime config: `.codex/agents/*.toml`.
- Commands/skills/workflow references: `.agents/commands/`, `.agents/skills/`, `.agents/workflows/`.
- Skills: `.agents/skills/*/SKILL.md`.
- Commands: `.agents/commands/*.md`.
- Hooks and capability config: `.codex/hooks.json` and `.codex/config.toml`.
- IDE-local MCP (optional): `.vscode/mcp.json`.

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
