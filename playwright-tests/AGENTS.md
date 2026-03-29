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

### 4. Assertions

- Assertions stay in specs by default.
- Page objects may include reusable UI-specific checks (e.g., `toBeLoaded()`).
- Prefer locator-based assertions with messages, e.g. `await expect(locator, 'main container should be visible').toBeVisible();`.

### 5. Anti-patterns

- Hidden business flow inside page objects.
- `waitForTimeout`, XPath, or forced clicks.
- Logic graveyards in helpers/utilities.
- Wrapper-on-wrapper abstractions without clear value.

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
