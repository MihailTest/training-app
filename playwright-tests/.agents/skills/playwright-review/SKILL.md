---
name: playwright-review
description: Use when reviewing existing Playwright specs, page objects, helpers, or fixtures for quality, stability, and repo-pattern alignment.
---

# Playwright review

Use when reviewing Playwright changes in this repo.

Focus on:
- Selector stability and locator placement.
- Page object boundaries and fixture usage.
- Business-meaningful assertions.
- One scenario per test and deterministic data.

Checklist:
- Specs use `@utils/ui-fixtures` and page object methods.
- Page objects implement `toBeLoaded()` and use `@step`.
- No locators or `expect()` in specs.
- No stability hacks (XPath, `force: true`, `waitForTimeout`).
