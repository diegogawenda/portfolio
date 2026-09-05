// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Negative & Edge Cases', () => {
  test('Invalid or unknown URL paths', async ({ page }) => {
    // Given a URL path that does not exist on the site
    // When the user navigates to https://diegogawenda.github.io/portfolio/does-not-exist
    const response = await page.goto('https://diegogawenda.github.io/portfolio/does-not-exist');

    // Then GitHub Pages returns its standard 404 page rather than a broken blank page
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).not.toBeEmpty();
  });
});
