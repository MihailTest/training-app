# API Automation Conventions

## Examples
- Add a POST /api/v1/auth/login test that asserts a 200 response and a token field.
- Add a GET /api/v1/users test that verifies page=2 returns the next page of results.
- Add a GET /api/v1/courses?status=active test that verifies filtering is applied.
- Add a POST /api/v1/courses test that returns 401 when no auth token is provided.
- Add a GET /api/v1/profile test that validates required user fields.

## Conventions
- Assert response body shape and critical fields, not just status codes.
- Include at least one negative or permission case for each endpoint.
- Validate sorting, filtering, and pagination when the API supports them.
- Reuse shared request helpers or validators when they exist.
- Keep inputs deterministic and aligned with test data or fixtures.

## Notes
- Prefer stable inputs that do not depend on volatile data.
- If an API test location exists, follow that structure; otherwise mirror specs/ui/tests.
