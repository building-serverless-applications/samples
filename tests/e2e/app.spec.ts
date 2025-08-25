import { test, expect } from '@playwright/test';

test.describe('React App E2E Tests', () => {
  test('loads the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads
    await expect(page).toHaveTitle(/React App/);
    
    // Wait for React to load
    await page.waitForSelector('.MuiGrid-container');
    
    // Check that the dashboard container is present
    const dashboardGrid = page.locator('.MuiGrid-container');
    await expect(dashboardGrid).toBeVisible();
  });

  test('renders dashboard with mocked data', async ({ page }) => {
    // Mock the API call
    await page.route('/my/dashboard', async route => {
      const mockData = {
        items: [
          {
            title: 'E2E Test Card 1',
            content: 'E2E test content 1',
            image: {
              url: 'https://knative.dev/docs/images/logo/rgb/knative-logo-rgb.png',
              alt: 'Test image 1'
            }
          },
          {
            title: 'E2E Test Card 2',
            content: 'E2E test content 2',
            image: {
              url: 'https://knative.dev/docs/images/logo/rgb/knative-logo-rgb.png',
              alt: 'Test image 2'
            }
          }
        ]
      };
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    });

    await page.goto('/');
    
    // Wait for the cards to appear
    await expect(page.locator('text=E2E Test Card 1')).toBeVisible();
    await expect(page.locator('text=E2E Test Card 2')).toBeVisible();
    
    // Check card content
    await expect(page.locator('text=E2E test content 1')).toBeVisible();
    await expect(page.locator('text=E2E test content 2')).toBeVisible();
    
    // Check that images are loaded
    const images = page.locator('img[alt="Test image 1"]');
    await expect(images.first()).toBeVisible();
  });

  test('handles API errors gracefully', async ({ page }) => {
    // Mock API to return an error
    await page.route('/my/dashboard', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('/');
    
    // Wait for the page to load and handle the error
    await page.waitForSelector('.MuiGrid-container');
    
    // The grid should still be visible but empty
    const dashboardGrid = page.locator('.MuiGrid-container');
    await expect(dashboardGrid).toBeVisible();
    
    // Should not have any cards displayed
    const cards = page.locator('.MuiCard-root');
    await expect(cards).toHaveCount(0);
  });

  test('cards have interactive elements', async ({ page }) => {
    // Mock the API call with card data
    await page.route('/my/dashboard', async route => {
      const mockData = {
        items: [
          {
            title: 'Interactive Card',
            content: 'This card should be interactive',
            image: {
              url: 'https://knative.dev/docs/images/logo/rgb/knative-logo-rgb.png',
              alt: 'Interactive image'
            }
          }
        ]
      };
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    });

    await page.goto('/');
    
    // Wait for the card to appear
    await expect(page.locator('text=Interactive Card')).toBeVisible();
    
    // Check that the "Get Info" button is present and clickable
    const getInfoButton = page.locator('text=Get Info');
    await expect(getInfoButton).toBeVisible();
    await expect(getInfoButton).toBeEnabled();
    
    // Check that the card action area is clickable
    const cardActionArea = page.locator('.MuiCardActionArea-root').first();
    await expect(cardActionArea).toBeVisible();
  });

  test('responsive design works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mock API with data
    await page.route('/my/dashboard', async route => {
      const mockData = {
        items: [
          {
            title: 'Mobile Card',
            content: 'This should display well on mobile',
          }
        ]
      };
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    });

    await page.goto('/');
    
    // Wait for content to load
    await expect(page.locator('text=Mobile Card')).toBeVisible();
    
    // Check that the grid is still visible and functional
    const dashboardGrid = page.locator('.MuiGrid-container');
    await expect(dashboardGrid).toBeVisible();
    
    // Cards should be visible on mobile
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('polling updates content automatically', async ({ page }) => {
    let callCount = 0;
    
    await page.route('/my/dashboard', async route => {
      callCount++;
      
      const mockData = {
        items: [
          {
            title: `Polling Card ${callCount}`,
            content: `Updated content ${callCount}`,
          }
        ]
      };
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    });

    await page.goto('/');
    
    // Wait for first load
    await expect(page.locator('text=Polling Card 1')).toBeVisible();
    
    // Wait for automatic polling (2 seconds + some buffer)
    await page.waitForTimeout(3000);
    
    // Should have updated content
    await expect(page.locator('text=Polling Card 2')).toBeVisible({ timeout: 10000 });
  });
});