# ParaBank — Playwright + TypeScript E2E Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.44-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088ff?logo=github-actions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-grade, cross-browser end-to-end test automation framework built with **Playwright** and **TypeScript**, targeting the [ParaBank](https://parabank.parasoft.com) demo banking application.

ParaBank simulates a realistic financial services web application, making it an ideal target for validating test patterns applicable to fintech, banking, and enterprise-grade products — areas where reliability and correctness are non-negotiable.

---

## Table of Contents

- [Why ParaBank](#why-parabank)
- [Framework Architecture](#framework-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Test Coverage](#test-coverage)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Design Decisions](#design-decisions)
- [Author](#author)

---

## Why ParaBank

Unlike typical demo apps (e.g. SauceDemo), ParaBank models a real-world banking domain with:

- Multi-step registration with identity fields (SSN, address, contact)
- Credential recovery flows with data validation
- Contact and customer care forms with server-side validation
- A full authenticated banking suite (accounts, transfers, bill pay, transaction history)

This makes it an effective target for demonstrating mature test design including **Equivalence Partitioning**, **Boundary Value Analysis**, **negative path coverage**, and **contract-level validation** — techniques that matter in production QA.

---

## Framework Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Test Specs (.spec.ts)                │
│          login │ registration │ contact │ lookup         │
└──────────────────────────┬──────────────────────────────┘
                           │ import
┌──────────────────────────▼──────────────────────────────┐
│               Custom Fixtures (fixtures.ts)              │
│        Typed POM injection — zero boilerplate            │
└──────────────────────────┬──────────────────────────────┘
                           │ instantiate
┌──────────────────────────▼──────────────────────────────┐
│                  Page Objects (/pages)                   │
│    HomePage │ RegisterPage │ ContactPage │ LookupPage    │
│                  extends BasePage                        │
└──────────────────────────┬──────────────────────────────┘
                           │ uses
┌──────────────────────────▼──────────────────────────────┐
│               Test Data Layer (/data)                    │
│    Centralised constants for valid, invalid, boundary    │
└─────────────────────────────────────────────────────────┘
```

**Key patterns:**

- **Page Object Model (POM)** — every page has a dedicated class with typed locators and action methods. Tests never touch raw selectors.
- **Custom Fixtures** — all page objects are injected via Playwright's `test.extend()`. Tests receive pre-built objects with no constructor calls.
- **BasePage** — shared utilities (fill, click, assert, wait) live here. Page classes stay concise and focused.
- **Centralised test data** — all test inputs live in `src/data/testData.ts`. No magic strings scattered across specs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Test Runner | Playwright 1.44 |
| Language | TypeScript 5.4 |
| Runtime | Node.js 20 |
| CI/CD | GitHub Actions |
| Browsers | Chromium, Firefox, WebKit, Mobile Chrome |
| Reporting | Playwright HTML Report, JUnit XML |
| Linting | ESLint + TypeScript ESLint |

---

## Project Structure

```
parabank-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI pipeline — cross-browser matrix + smoke gate
├── src/
│   ├── data/
│   │   └── testData.ts             # Centralised test data (valid, invalid, boundary)
│   ├── fixtures/
│   │   └── fixtures.ts             # Custom Playwright fixtures — typed POM injection
│   ├── pages/
│   │   ├── BasePage.ts             # Shared utilities inherited by all page objects
│   │   ├── HomePage.ts             # Home page + login form
│   │   ├── RegisterPage.ts         # New user registration
│   │   ├── ContactPage.ts          # Customer care contact form
│   │   └── LookupPage.ts           # Forgot login / credential recovery
│   └── tests/
│       ├── login.spec.ts           # 10 login scenarios
│       ├── registration.spec.ts    # 10 registration scenarios
│       ├── contact.spec.ts         # 10 contact form scenarios
│       └── lookup.spec.ts          # 8 lookup/recovery scenarios
├── playwright.config.ts            # Multi-browser config, retries, reporters
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## Test Coverage

### Total: 38 test scenarios across 4 modules

| Module | Scenarios | Techniques Applied |
|---|---|---|
| **Login** | 10 | Positive flow, invalid credentials, empty fields, SQL injection, navigation |
| **Registration** | 10 | Required field validation, password mismatch, BVA, successful registration |
| **Contact Form** | 10 | Empty submission, invalid email, long message (BVA), successful submit, clear form |
| **Lookup (Forgot Login)** | 8 | Empty fields, missing SSN, non-existent user, input behaviour, URL validation |

### Test Tags

| Tag | Purpose | How to Run |
|---|---|---|
| `@smoke` | Critical path — fast gate before full suite | `npm run test:smoke` |
| `@regression` | Full coverage including edge cases | `npm run test:regression` |

### Test Design Techniques

- **Equivalence Partitioning** — valid inputs grouped and tested as one representative case per class
- **Boundary Value Analysis** — single-char inputs, max-length strings, 500-char message body
- **Negative Path Coverage** — empty fields, mismatched passwords, invalid email formats, non-existent users
- **Security Basics** — SQL injection attempt in login username field

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Vyronxoder/parabank-playwright.git
cd parabank-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

---

## Running Tests

```bash
# Run full suite (all browsers)
npm test

# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run on a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode (see the browser)
npm run test:headed

# View the HTML report after a run
npm run report

# Clean test output
npm run clean
```

---

## CI/CD Pipeline

The GitHub Actions pipeline runs on every push and pull request to `main` or `develop`.

### Jobs

**`smoke-gate`** — Runs `@smoke` tagged tests on Chromium first. Fast feedback (under 5 minutes) before the full matrix kicks in.

**`test` (matrix)** — Runs the full suite across Chromium, Firefox, and WebKit in parallel using a matrix strategy.

**Scheduled run** — Runs daily at 06:00 UTC via cron to detect environment drift from the ParaBank server.

**Manual trigger** — Supports `workflow_dispatch` with optional browser and tag filter inputs.

### Artifacts Published per Run

- Playwright HTML report (per browser)
- JUnit XML results (per browser)
- Failure traces, screenshots, and videos (on failure only)
- Retention: 14 days for reports, 7 days for failure artifacts

---

## Design Decisions

**Why Playwright over Selenium for this project?**
Playwright's built-in auto-waiting eliminates explicit `Thread.sleep` calls and reduces test flakiness significantly. It also ships with native cross-browser support, trace viewer, and video capture — all without additional configuration.

**Why TypeScript over JavaScript?**
TypeScript enforces type safety across page objects and fixture definitions, catching locator mismatches and data shape errors at compile time rather than at runtime during a CI run.

**Why custom Fixtures instead of `beforeEach` instantiation?**
Fixtures make page objects first-class parameters of the test function. This keeps test files clean, makes dependencies explicit, and scales better as the suite grows — no shared mutable state between tests.

**Why centralise test data?**
Magic strings scattered across 4 spec files create maintenance overhead. A single `testData.ts` file means one change propagates everywhere. It also makes data-driven extension straightforward.

**Why a Smoke Gate job separate from the matrix?**
Smoke tests should fail fast and loudly on the most critical paths. A dedicated job ensures developers get signal in under 5 minutes before waiting for the full 3-browser matrix to complete.

---

## Author

**Gaurav Chaubey**
SDET | QA Automation Engineer

- GitHub: [github.com/Vyronxoder](https://github.com/Vyronxoder)
- LinkedIn: [linkedin.com/in/gauravchaubey45](https://linkedin.com/in/gauravchaubey45)
- Email: gauravchb4@gmail.com

---

*Part of a broader QA automation portfolio. See also: [Selenium + TestNG Framework](https://github.com/Vyronxoder/selenium-testng-framework) | [RestAssured API Framework](https://github.com/Vyronxoder/api-testing-framework) | [Manual Testing Portfolio](https://github.com/Vyronxoder/manual-testing-portfolio)*
