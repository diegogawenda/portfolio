// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Process Section', () => {
  test('Five-step process renders in order', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to the "How quality moves" section
    await portfolio.processSteps.first().scrollIntoViewIfNeeded();

    // Then five steps render in order 01–05, each with a one-line description
    await expect(portfolio.processSteps).toHaveCount(5);
    await expect(portfolio.processSteps.locator('h4')).toHaveText([
      'Discover',
      'Define',
      'Automate',
      'Monitor',
      'Improve',
    ]);
    for (let i = 0; i < 5; i++) {
      await expect(portfolio.processSteps.nth(i).locator('p')).not.toBeEmpty();
    }
  });
});
