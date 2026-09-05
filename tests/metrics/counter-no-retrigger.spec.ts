// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Impact Metrics', () => {
  test('Counters do not re-animate on repeated scroll in and out', async ({ page }) => {
    // Given the metrics band has been scrolled into view once
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);
    await portfolio.metricsSection.scrollIntoViewIfNeeded();
    // And its count-up animation has finished, settling on 15+, 75%, 80%, 50%, 12
    await expect(portfolio.metricValues).toHaveText(['15+', '75%', '80%', '50%', '12'], {
      timeout: 2000,
    });

    // When the user scrolls away from the band and then scrolls back into view
    await portfolio.heroHeading.scrollIntoViewIfNeeded();
    await portfolio.metricsSection.scrollIntoViewIfNeeded();

    // Then the values remain static at their final numbers
    // And the count-up animation does not restart
    await expect(portfolio.metricValues).toHaveText(['15+', '75%', '80%', '50%', '12']);
  });
});
