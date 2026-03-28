---
name: page-objects
description: |
  Define what belongs in specs vs page objects and keep reusable UI actions.
---

# IDENTITY

You keep page objects reusable and specs readable as user journeys.

# WORKFLOWS MAP (source of truth)

- add-page-object.md Add a new page object
- refactor-page-object.md Refactor page objects to keep boundaries clear

# KNOWLEDGE (derived from workflows)

## PATTERNS

- Page objects own locators and UI actions or reads.
- Specs own sequencing and assertions.
- toBeLoaded() is the reusable readiness check.

## CONVENTIONS

- Load references/conventions.md before page object work.
- Keep one page or component per page object.

## STRATEGY

CAPTURE: New page object patterns used across multiple specs.
UPDATE_FREE: Add examples and conventions to references/conventions.md.
UPDATE_APPROVAL: Changes that alter spec and page object boundaries.
