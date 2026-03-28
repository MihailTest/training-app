# Codex Usage Guide (Playwright Tests)

## 1. Overview

This is a **human-focused guide** for using Codex in this repo. The setup helps with Playwright test work (planning, implementation, review, flaky investigation, API checks, DB validation). It is not full automation. You still decide scope and approve changes; Codex helps execute and review within repo rules.

High-level layout:

- **Agents**: specialist roles in `.agents/*.md`
- **Commands**: workflow shortcuts in `.agents/commands/*.md`
- **Skills**: domain knowledge in `.agents/skills/*`
- **Pipelines**: multi-phase orchestration in `.agents/workflows/feature-pipeline.yaml`
- **Hooks**: guardrails in `.codex/settings.json`

## 2. Files That Control Codex Behavior

- `AGENTS.md`: repo-wide rules and boundaries. This is the top-level source of truth.
- `.codex/config.toml`: Codex configuration, models, profiles, and agent registrations.
- `.agents/*.md`: agent definitions (writer/reviewer/PM/architect/security).
- `.agents/skills/*/SKILL.md`: skill summaries; workflows and references live alongside each skill.
- `.agents/workflows/feature-pipeline.yaml`: pipeline definition for multi-phase orchestration.
- `.agents/commands/*.md`: slash commands that Codex can run as workflow shortcuts.
- `.codex/settings.json`: hooks/guardrails (e.g., block destructive flags).
- `.codex/mcp.json` and `.vscode/mcp.json`: MCP server configuration.

## 3. How Codex Works In This Repo

Simple, real flow:

1. Codex reads **`AGENTS.md`** and obeys repo rules and boundaries.
2. It loads the **Codex config** from `.codex/config.toml` (model selection, profiles, agent registry).
3. **Skills** are used on demand by agents to apply domain guidance.
4. **Commands** (e.g., `/plan`, `/review`, `/tdd`) are manual entry points; they are not automatic.
5. **Workflows** (`feature-pipeline.yaml`) define a multi-phase pipeline but do not run unless you call `/feature-pipeline`.

Automatic vs manual:

- **Automatic**: Codex rules (AGENTS.md) and hooks in `.codex/settings.json` (when using Codex).
- **Manual**: Running commands, selecting agents, choosing profiles, and running tests.

Profiles:

- Defined in `.codex/config.toml` (`development`, `review`, `conservative`).
- They are **not auto-selected**. You choose them in the Codex UI/session.

## 4. Day-to-Day Usage

Typical entry points:

- **Start work**: `/plan <request>` for any change touching multiple files.
- **Implement**: ask for a change directly or use `/tdd <scope>`.
- **Review**: `/review <scope>` to run quality + security review.

Use specialized help:

- **Flaky investigation**: “Investigate flake in `specs/ui/tests/login.spec.ts`.”
- **API help**: “Add API test coverage for X and include negative cases.”
- **DB validation**: “Propose read-only DB checks after Y.”

## 5. What To Run And When

- **Use `review` profile** for code review or audit tasks (read-only behavior).
- **Use `development` profile** for implementation or refactors.
- **After changes**: run `pnpm run typecheck`, `pnpm run lint`, and `pnpm run format:check`.
- **After UI changes**: run a targeted Playwright test:
  - For UI tests: `pnpm run admin-user-tests` or a single spec.
  - For setup: `pnpm run test:setup` if auth state is stale.
- **Use workflows** when the change is multi-step or involves multiple roles.
- **Skip workflows** for small edits or single-file tweaks.
- **Explicit agent selection** is useful when you need a specialist:
  - `playwright-review-agent` for test reviews
  - `security-reviewer-agent` for OWASP checks
  - `bug-investigation` skill for flake analysis
  - `db-validation-agent` for DB checks

## 6. Prompt-Writing Guide

Be direct and specific. Include:

- **Scope** (files or areas)
- **Desired outcome**
- **Constraints** (e.g., “no refactor”, “minimal changes”)

Good prompts:

- “Add a new UI test for login failure in `specs/ui/tests/login.spec.ts`. Keep locators in page objects.”
- “Review `specs/ui/page-objects/home-page.ts` for boundary violations and flaky risks.”
- “Refactor `specs/ui/tests/home.spec.ts` to remove locators from the spec.”

Assertion style:

- Prefer locator-based expects with messages, e.g. `await expect(locator, 'main container should be visible').toBeVisible();`.

Weak prompts (why they’re weak):

- “Fix tests.” (No target or failure context)
- “Make it better.” (No clear outcome)
- “Add API tests” (No endpoint or expected behavior)

## 7. Examples (Copy/Paste)

Architecture review:

- “Review the structure of `specs/ui/page-objects/` and call out boundary violations or duplication.”

Playwright test review:

- “/review `specs/ui/tests/login.spec.ts`”

Write a new Playwright test:

- “Add a new test in `specs/ui/tests/home.spec.ts` that verifies the dashboard loads. Use page object methods only.”

Refactor a page object or spec:

- “Refactor `specs/ui/page-objects/login-page.ts` to add a `toBeLoaded()` check and update specs to use it.”

Flaky test investigation:

- “Investigate flake in `specs/ui/tests/login.spec.ts` around the submit step. Focus on timing/state issues.”

API automation help:

- “Add API test coverage for `GET /api/v1/users` with pagination, filtering, and a 401 case.”

DB validation help:

- “Propose read-only DB checks to validate a user is created after signup.”

## 8. Limitations / What Not To Expect

- Pipelines and commands are **not automatic**; you must invoke them.
- Hooks run only when using Codex; they are not git hooks.
- No automatic test execution unless you ask for it.
- Codex cannot infer missing requirements; you must be explicit.
- Security review is best-effort and depends on visible changes.

## 9. Recommended Usage Flow

1. Start with `/plan <request>` for any multi-file change.
2. Implement using a direct request or `/tdd <scope>`.
3. Run `pnpm run typecheck`, `pnpm run lint`, and `pnpm run format:check`.
4. Run a relevant Playwright command for the touched scope.
5. Run `/review <scope>` for quality and security.
6. Adjust and finalize.
