# .agents Overview

Purpose: keep Codex prompts and skills practical for this Playwright UI repo.

## What Lives Here

- `commands/`
  - Reusable prompt templates for common tasks (plan, write-test, review, etc.).
- `skills/`
  - Domain-focused guidance (`SKILL.md` + repo conventions + workflows).

Runtime subagents are defined in `.codex/agents/*.toml`.

## Core Workflow

1. Plan scoped work:
   - `.agents/commands/plan.md <request>`
2. Implement with the relevant command/skill.
3. Review changes:
   - `.agents/commands/review-changes.md`
   - or `.agents/commands/review.md <scope>`

## Principles

- Keep one file per clear responsibility.
- Prefer repo-specific guidance over generic text.
- Avoid duplicated guidance across many files.
- Keep commands/skills concise and actionable.
