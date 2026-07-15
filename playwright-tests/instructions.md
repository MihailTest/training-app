# Codex Usage Guide (Playwright Showcase)

## Purpose

This workspace demonstrates maintainable Playwright automation, including page objects, fixtures, typed test data, multi-role storage state, boxed report steps, and executable known-defect coverage.

## Recommended Workflow

1. Inspect the target flow, nearby specs, page objects, fixtures, and test data.
2. Confirm the actual UI contract before adding selectors.
3. Make the smallest coherent change.
4. Keep business flow and assertions in specs.
5. Keep selector construction and reusable UI actions in page objects.
6. Run the required static checks and the smallest affected test.
7. Review the generated Playwright report for useful step names and attachments.

## Authentication And Roles

The `setup` project authenticates admin and QA users once and writes separate ignored files under `.state/`.

- `chromium` consumes admin state.
- `qa chromium` consumes QA state.
- both projects declare `dependencies: ['setup']`.
- login tests override project storage state with an empty state when they need to test authentication itself.

This is safe because the showcase does not mutate shared server-side account data. For stateful production tests running in parallel, provision one account and storage state per worker.

## Known Product Defects

Confirmed product defects remain executable:

```typescript
test('known defect: desired behavior', { tag: ['@regression', '@known-defect'] }, async ({ pageObject }) => {
  test.fail(true, 'Known application defect: concise explanation of the current product gap.');

  await pageObject.performAction();
  await expect(pageObject.outcome).toHaveText('Desired fixed behavior');
});
```

This produces an expected failure in Playwright reports while keeping the suite green. When the application is fixed, Playwright reports an unexpected pass and requires the annotation to be removed. Do not skip these tests and do not assert the broken behavior.

## Report Steps

Public page-object actions may use the typed `@step` decorator. It wraps the action in `test.step(..., { box: true })`, so the HTML report and traces show readable domain actions and attribute failures to the page-object call site.

Do not add step wrappers to trivial private implementation details. Step names should describe user-visible actions and may use `{0}`, `{1}`, and similar argument placeholders.

## Commands

```bash
pnpm run check
pnpm run test:setup
pnpm run admin-user-tests
pnpm run qa-user-tests
pnpm run test:smoke
pnpm run test:regression
pnpm exec playwright show-report
```

Run a focused test:

```bash
pnpm exec playwright test specs/ui/tests/login.spec.ts --project=chromium
```

## Verification Matrix

- TypeScript/test changes: typecheck, lint, format check, and the smallest affected Playwright test.
- Auth/config changes: also list tests and run an affected project with dependencies enabled.
- Documentation-only changes: run Prettier against the changed documentation.
- Known defect changes: confirm the result is an expected failure for the documented reason.

## Review Checklist

- No XPath, forced actions, arbitrary waits, focused tests, or skipped known defects.
- No selector construction in specs.
- Assertions use locator-based web-first matchers where possible.
- Fixtures prepare context without hiding business assertions.
- Page objects receive only required context.
- Shared test data and types are domain-focused and clearly named.
- Report steps are visible and useful.
- Default project commands complete successfully.
