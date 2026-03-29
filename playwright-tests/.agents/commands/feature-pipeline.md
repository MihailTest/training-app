---
name: feature-pipeline
description: 'Run the multi-agent feature pipeline. Usage: .agents/commands/feature-pipeline.md <request>'
---

Run the feature pipeline defined in .agents/workflows/feature-pipeline.yaml.

Input: $ARGUMENTS

## FLOW

1. Load .agents/workflows/feature-pipeline.yaml.
2. Dispatch phases in order with star topology.
3. After each phase, enforce validation gates.
4. Apply context contracts between phases.
5. Stop on failure or retry once on validation failure.
6. Report a summary of each phase and final outcome.

## RULES

ALWAYS_DO:

- Use pm-agent as Phase 0 requirements.
- Enforce validation gates before starting next phase.
- Apply context contracts with max_lines limits.
- Keep the orchestrator read-only; dispatch workers for work.

NEVER_DO:

- Do worker tasks in the orchestrator.
- Let workers communicate directly.
- Pass full context when a contract specifies summary or file_manifest.
- Skip validation checks.

## OUTPUT

- Phase-by-phase summary with pass/fail and artifacts.
