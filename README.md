# Training App

For full automation setup, conventions, and CI workflow details, start here:
- `playwright-tests/README.md`

---

## How to Run Locally

```bash
npm install
npm run dev
```

Open:
- `http://localhost:3000`

---


A small, intentionally designed training and demo application used to practice and demonstrate modern frontend integration and end-to-end test automation patterns.

This repository is intended for technical recruiters, hiring managers, and engineers who want to quickly understand:
- what the app is
- how it is used
- how automated tests are applied
- and what the focus of the work is

---

## Purpose of this repository

This project is not a production product.

It exists primarily to:
- provide predictable UI surfaces for automated testing
- support Playwright-based UI and E2E test development
- demonstrate clean project structure and tooling choices
- act as a sandbox for automation and QA experimentation

### Note on frontend implementation

The frontend application was built with the assistance of AI tools and is used strictly for personal training and testing purposes.

I do not position this project as a showcase of advanced frontend engineering skills.
Instead, the frontend serves as:
- a stable target for test automation
- a controlled environment for validating UI behavior
- a realistic surface for end-to-end testing scenarios

The primary ownership and expertise demonstrated in this repository are in test automation, tooling, and quality practices, not UI design or frontend architecture.

---

## Tech stack

Frontend:
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion

Tooling:
- ESLint + Prettier
- Node.js (see `.nvmrc`)
- npm (application)
- pnpm (Playwright test workspace)

---

## Prerequisites

- Node.js `20.19.1` (recommended via `.nvmrc`)
- npm (for the application)
- pnpm (used only for the Playwright tests)

---

## Getting the project locally

Clone:
```bash
git clone https://github.com/MihailTest/training-app.git
cd training-app
```

Optional (open in VS Code Web from GitHub):
```
On the GitHub repo page, press the "." key.
Press . = VS Code Web in browser
```

Install and run locally:
```bash
npm install
npm run dev
```

Open:
```
http://localhost:3000
```

---

## Quickstart (two terminals)

Terminal 1 (app):
```bash
cd training-app
npm install
npm run dev
```

Terminal 2 (tests):
```bash
cd training-app/playwright-tests
pnpm install
pnpm exec playwright install
```



For full test instructions, see `playwright-tests/README.md`.

---

## Automated testing (high level)

This repository includes a separate Playwright test workspace located in `playwright-tests/`.
The test suite is intentionally isolated to:
- keep frontend dependencies minimal
- allow independent tooling (pnpm, Playwright, strict ESLint rules)
- mirror real-world automation project setups

At a high level, the tests:
- validate user-facing UI behavior
- use accessibility-first, role-based locators
- avoid hard waits and flaky patterns
- follow Playwright-recommended best practices

Detailed test setup, conventions, and architecture are documented in `playwright-tests/README.md`.

---

## Project structure (high level)

```
training-app/
|-- src/                 # React application source
|-- public/              # Static assets
|-- playwright-tests/    # Playwright test workspace (separate project)
|-- package.json
|-- vite.config.js
`-- README.md
```


---

## What this repository demonstrates

- Clean separation between application code and test automation
- Realistic UI surfaces designed for testing
- Professional Playwright automation practices
- Tooling and structure aligned with production environments

---

## What this repository is not

- Not a backend system
- Not a production-ready product
- Not a frontend skills showcase

The focus is testability, automation quality, and maintainability, not feature completeness or visual design.
