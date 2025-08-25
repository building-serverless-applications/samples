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

### Test Files

- `src/App.test.tsx` - Tests for the main App component
- `src/components/Dashboard.test.tsx` - Comprehensive tests for Dashboard component including:
  - Network mocking for API calls
  - Polling behavior testing
  - Error handling
  - State management
- `src/components/DataCard.test.tsx` - Tests for DataCard component including:
  - Props handling
  - Image display
  - Interactive elements

### Features Tested

- **Network Mocking**: All API calls are mocked at the network level using Jest's `fetch` mock
- **Async Behavior**: Proper testing of polling and async operations
- **Error Handling**: Tests cover both network errors and API errors
- **Component Rendering**: Tests verify proper rendering of components with various props
- **User Interactions**: Tests check for interactive elements like buttons

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

### E2E Test Features

- **Network Mocking**: API calls are intercepted and mocked using Playwright's route handling
- **Multi-browser Testing**: Tests run on Chromium, Firefox, and WebKit
- **Mobile Testing**: Includes responsive design testing
- **Real User Scenarios**: Tests actual user interactions and workflows

### Test Coverage

The E2E tests cover:
- Application loading and initialization
- Dashboard functionality with mocked data
- Error handling scenarios
- Interactive elements (buttons, cards)
- Responsive design on mobile viewports
- Automatic polling updates

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
- Manual workflow dispatch

## Network Mocking Strategy

### Unit Tests
- Uses Jest's `global.fetch` mock
- Mocks at the JavaScript level
- Allows testing of error scenarios and edge cases

### E2E Tests  
- Uses Playwright's `page.route()` API
- Intercepts network requests at the browser level
- Tests realistic user scenarios with controlled data

## Coverage Reports

Unit tests generate coverage reports showing:
- Statement coverage
- Branch coverage  
- Function coverage
- Line coverage

Current coverage focuses on the main components (Dashboard and DataCard) with high coverage percentages.

## Best Practices

1. **Isolation**: Each test is isolated and doesn't depend on others
2. **Realistic Mocking**: Mocks simulate real API responses
3. **Error Testing**: Both happy path and error scenarios are tested
4. **Performance**: Tests are designed to run quickly in CI
5. **Maintainability**: Tests are well-organized and documented

## Running Tests Locally

1. Install dependencies: `npm install`
2. Run unit tests: `npm test`
3. Run E2E tests: `npm run test:e2e` (requires app to be running)
4. Build app: `npm run build`

The E2E tests will automatically start the development server if it's not running.