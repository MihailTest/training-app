# Codex Usage Guide (Playwright Tests)

## Executive Summary

This repository is configured for OpenAI Codex CLI with project rules, project config, hooks, skills, and custom subagents.
Use this file as the primary operational guide.

Core operating rule:

- Start with scoped analysis.
- Approve minimal implementation.
- Run required validation commands.
- Finish with review.

## Current Codex Setup In This Repo

### Codex-relevant files and purpose

- `AGENTS.md`
  - Repo instruction source of truth for boundaries, locator strategy, assertions, and required checks.
- `.codex/config.toml`
  - Project config for model, sandbox and approval policy, profiles, MCP servers, and subagent thread limits.
- `.codex/hooks.json`
  - Command guardrails and session logging hooks.
- `.codex/agents/*.toml`
  - Custom subagent definitions used by Codex.
- `.agents/skills/*/SKILL.md`
  - Domain-specific skill packs and workflows.
- `.agents/commands/*.md`
  - Repo prompt templates invoked by file path in user prompts.
- `.agents/workflows/feature-pipeline.yaml`
  - Reference workflow design; guidance only.
- `.vscode/mcp.json`
  - IDE-local MCP config; optional and separate from CLI config.

## Step-by-Step User Guide

### 1. Start Codex in the repo root

```bash
cd D:\projects\training-app\playwright-tests
codex
```

### 2. Confirm session settings before work

- Run `/status` to confirm active model, approval policy, and writable roots.
- Run `/permissions` if you need stricter or looser approval behavior.

### 3. Build codebase understanding first

- Ask for analysis-only mapping before edits.
- Point Codex to explicit folders or files.

Example:

- `Analyze specs/ui/tests, specs/ui/page-objects, and specs/utils. Explain boundaries and risks. Analysis only, no edits.`

### 4. Ask for safe analysis first

- Explicitly say: `analysis only`, `no file changes`, `propose options`.
- Ask Codex to validate assumptions first.

Example:

- `Validate these assumptions before editing: [list assumptions]. If unsupported by official Codex docs, mark as not verified.`

### 5. Ask for implementation

- Provide concrete scope, target files, and constraints.
- Require minimal changes and boundary compliance.

Example:

- `Implement a new login failure test in specs/ui/tests/login.spec.ts with minimal changes. Keep locators in page objects and assertions in specs.`

### 6. Ask for review-only

- Use built-in `/review` for working tree review.
- Or use scope review prompt with no edits.

Examples:

- `/review`
- `Review specs/ui/page-objects/home-page.ts for boundary and locator issues. Findings only, no edits.`

### 7. Ask for refactoring

- Require behavior-preserving refactor and local scope.

Example:

- `Refactor specs/ui/tests/home.spec.ts for readability only. No behavior change, no cross-folder refactor.`

### 8. Ask for test creation

- State test intent, setup assumptions, and assertion expectations.

Example:

- `Add a UI test for invalid password in specs/ui/tests/login.spec.ts. Reuse existing fixtures and page-object patterns.`

### 9. Ask for flaky test investigation

- Choose quick triage or deep investigation template.

Examples:

- `.agents/commands/investigate-flake.md specs/ui/tests/login.spec.ts`
- `.agents/commands/bug-investigation.md specs/ui/tests/login.spec.ts`

### 10. Ask for cleanup and deduplication

- Start with candidate list only, then approve edits in a second pass.

Example:

- `Find dead files or duplicate templates under .agents. Analysis only, include safe-delete candidates.`

### 11. Validate assumptions before editing

- Require Codex support verification and explicit uncertainty labels.

Example:

- `Before any changes, verify whether this pattern is supported by official OpenAI Codex docs. If unclear, mark not verified and stop.`

## Template Usage (Repo Convention)

Use these file-path templates directly in your prompt:

- `.agents/commands/plan.md <request>`
  - General planning for new work or broad tasks.
- `.agents/commands/plan-change.md <request>`
  - Change planning for existing behavior with current-vs-target delta.
- `.agents/commands/investigate-flake.md <test>`
  - Quick flaky triage.
- `.agents/commands/bug-investigation.md <test or error>`
  - Deep investigation with root-cause evidence.
- `.agents/commands/review.md <scope>`
  - Review explicit file/folder scope.
- `.agents/commands/review-changes.md`
  - Review current uncommitted working tree.

## CLI Quickstart (Built-in Commands)

- `/status`
  - Verify model, sandbox, approval policy, writable roots.
- `/permissions`
  - Adjust approval strictness for the current session.
- `/review`
  - Ask Codex to review current working tree.

Required validation after code/doc changes:

```bash
pnpm run typecheck
pnpm run lint
pnpm run format:check
```

## Analysis-Only First Examples

- `Map the current architecture for specs/page objects/fixtures. Analysis only, no edits.`
- `Find overlap between .agents/commands files and propose consolidation options. No edits.`
- `Audit .codex/config.toml and .codex/hooks.json for Codex compatibility. Analysis only.`
- `Compare plan.md and plan-change.md and recommend which to use for this request. No edits.`

## Skills In This Repo

Available skills:

- `api-automation`, `bug-investigation`, `db-validation`, `fixtures`, `manual-testing`, `page-objects`, `refactor-test`, `review-changes`, `selectors-and-locators`, `test-data-strategy`, `typescript-types`, `write-test`.

When to ask explicitly for skills:

- Use explicit skill naming when task intent is ambiguous.
- Name 1-2 skills max per prompt to avoid noisy context.

Examples:

- `Use write-test and page-objects skills to add a new UI spec.`
- `Use selectors-and-locators to improve locator stability in this file.`

## Subagents In This Repo

Subagents are configured in `.codex/agents/*.toml` and enabled by project config.

Good use cases:

- Parallel audits across quality, security, and architecture.
- Multi-part investigations where outputs can be combined.

Not needed:

- Small, single-file edits.
- Trivial formatting or one-line docs updates.

Prompt pattern:

- `Split into subagents: one for locator quality, one for flaky risk, one for security review. Return a consolidated report.`

## Hooks In This Repo

Hooks are configured in `.codex/hooks.json` and enabled via `features.codex_hooks = true`.

Current guardrails:

- Blocks shell use of `--no-verify`.
- Blocks destructive shell command patterns (`rm -rf`, `--force`, `--hard`).
- Logs session lifecycle events to `.codex/session.log`.

Expected workflow impact:

- Disallowed commands are blocked before execution.
- You may need to rephrase or choose safer alternatives.

## Config That Matters Daily

From `.codex/config.toml`:

- `model = "gpt-5.3-codex"`
- `sandbox_mode = "workspace-write"`
- `approval_policy = "on-request"`
- Profiles:
  - `development` (workspace-write)
  - `review` and `conservative` (read-only)
- MCP servers configured:
  - GitHub, Context7, sequential-thinking, Playwright
- Subagent limits:
  - `max_threads = 4`
  - `max_depth = 1`

Important note:

- Project config applies when the project is trusted.
- User-level config can still influence behavior outside project-scoped settings.

## Best Practices For This Repo

- Name exact files and expected outputs.
- Request analysis-first for risky or broad tasks.
- Ask for plan-first on multi-file changes.
- Constrain scope explicitly: `minimal changes`, `no broad refactor`.
- Reinforce AGENTS boundaries in your prompt.
- Split large work into smaller sequential prompts.

## Anti-Patterns

- `Fix everything in this repo.`
- Huge refactor request without file constraints.
- Mixing review-only and implementation in one prompt.
- Ignoring AGENTS boundaries for specs/page objects/fixtures.
- Assuming undocumented Codex behavior is supported.

## Codex Support Verification Rule

Always treat official OpenAI Codex documentation as source of truth.

If behavior is not clearly documented, label it:

- `not verified for Codex`

Then stop before implementing that pattern.

## Repo Executive Summary (Rewritten)

This repo is a Playwright test workspace with Codex configured for guided, scoped work.
`AGENTS.md` defines coding boundaries and validation requirements.
`.codex/config.toml`, `.codex/hooks.json`, `.codex/agents/`, and `.agents/skills/` are active and operational.
`.agents/commands/*.md` are useful prompt templates but remain conventions, not built-in slash commands.
Use analysis-first prompts, then minimal implementation, then required validation, then review.

## Step-by-Step Guide (Rewritten)

1. Start Codex at repo root and run `/status`.
2. Run `/permissions` if approval mode needs adjustment.
3. Ask for scoped analysis first with `no edits`.
4. If needed, request a plan (`.agents/commands/plan.md ...` or `plan-change.md ...`).
5. Approve minimal implementation with explicit file boundaries.
6. Run `pnpm run typecheck`, `pnpm run lint`, `pnpm run format:check`.
7. Run review (`/review` or `.agents/commands/review.md <scope>`).
8. If proposing new Codex behavior, require support verification first; if unclear, mark not verified.
