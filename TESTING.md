# Testing Setup

This project includes comprehensive testing setup with both unit tests and end-to-end (E2E) tests.

## Unit Tests (Jest + React Testing Library)

Unit tests are located alongside the components they test and use Jest with React Testing Library.

### Running Unit Tests

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm run test:ci

# Run tests with coverage report
npm test -- --coverage --watchAll=false
```

## E2E Tests (Playwright)

End-to-end tests use Playwright to test the full application flow in real browsers.

### Running E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI mode (interactive)
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/app.spec.ts
```

## GitHub Actions Integration

The project includes GitHub Actions workflow (`.github/workflows/tests.yml`) that:

- Runs unit tests with coverage on every push and PR
- Runs E2E tests in CI environment
- Builds the application to ensure deployability
- Uploads test reports and coverage

### Workflow Triggers

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

## Running Tests Locally

1. Install dependencies: `npm install`
2. Run unit tests: `npm test`
3. Run E2E tests: `npm run test:e2e` (requires app to be running)
4. Build app: `npm run build`

The E2E tests will automatically start the development server if it's not running.