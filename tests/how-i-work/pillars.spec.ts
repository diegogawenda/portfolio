// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('How I Work', () => {
  test('Three pillars render', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to the "How I work" section
    await portfolio.howCards.first().scrollIntoViewIfNeeded();

    // Then exactly three cards render — "Strategy", "Execution", "Scaling" —
    // each with a heading and one paragraph of body copy
    await expect(portfolio.howCards).toHaveCount(3);
    await expect(portfolio.howCards.locator('h3')).toHaveText(['Strategy', 'Execution', 'Scaling']);
    for (let i = 0; i < 3; i++) {
      await expect(portfolio.howCards.nth(i).locator('p')).not.toBeEmpty();
    }
  });
});
