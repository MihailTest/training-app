---
name: page-objects
description: Use when creating, reviewing, or updating Page Object Model code in this repository.
---

# Page objects

Use when working in `specs/ui/page-objects/`.

Rules:
- Extend `BasePage` and implement `toBeLoaded()`.
- Public methods represent user actions or page reads.
- Use `helpers.clickOnLocator(...)` for click actions.
- Add `@step` to public user-facing methods.
- Keep locators `private readonly` unless intentionally shared.

Do not:
- Put business calculations or test-data building in page objects.
- Put assertions or locators in specs.
