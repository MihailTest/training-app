# Agents (Codex)

Each agent is a standalone markdown file in `.agents/` with YAML frontmatter
defining name, description, model, tools, and skills. The body defines identity,
steps, and explicit ALWAYS_DO/NEVER_DO rules.

## Model Routing (Codex)

- Use `gpt-5.4-mini` for narrow tasks, classification, or quick checks.
- Use `gpt-5.4` for implementation, refactors, reviews, and multi-file reasoning.
- Escalate model tier only when a lower tier fails with a clear reasoning gap.

## Tool Scoping

- Reviewer agents should be read-only: `Read`, `Grep`, `Glob`, optional `Bash` for diff.
- Writer agents may use `Write` and `Edit` in addition to read tools.

## Anti-patterns to avoid

- Vague trigger phrases with no concrete examples.
- Over-permissioned tools for review-only agents.
- Missing ALWAYS_DO/NEVER_DO rules.
- One agent doing everything.
- Agents without skills for domain knowledge.

## Working Together (Feature Lifecycle)

1. /plan <request>
   - Produces a phased plan and explicit acceptance criteria.
2. Implement the approved plan (use the relevant writer agent).
3. /review
   - Reviews changes for quality, stability, and boundary violations.

Optional: /feature-pipeline <request>

- Runs the multi-phase pipeline with validation gates and context contracts.

## Guardrails

- Hooks are configured in .codex/settings.json and run automatically.
