# Playwright TypeScript Training Repository

This is a standard setup for Playwright with TypeScript, designed for training purposes. It follows the Page Object Model (POM) design pattern.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install Playwright Browsers:**
   ```bash
   npx playwright install
   ```

## Project Structure

- `src/pages`: Page Object Models (POM) - verifying UI elements and behavior per page.
- `src/tests`: Test specifications (`.spec.ts` files).
- `src/utils`: Utilities and fixtures (e.g., custom test fixture).
- `playwright.config.ts`: Main configuration file.

## Running Tests

- **Run all tests:**

  ```bash
  npm test
  ```

- **Run with UI Mode (Interactive):**

  ```bash
  npm run test:ui
  ```

- **Debug tests:**

  ```bash
  npm run test:debug
  ```

- **View Report:**
  ```bash
  npm run report
  ```

## Writing Tests

We use a custom fixture in `src/utils/fixtures.ts` to inject Page Objects directly into tests.

**Example:**

```typescript
import { test, expect } from "../utils/fixtures";

test("example test", async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login("user", "pass");
});
```
