// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
//
// Uses a short viewport (500px tall) so the metrics band genuinely starts
// outside the initial viewport — at common viewport heights (e.g. 720px)
// the band is already partially visible on load and the count-up animation
// starts immediately, which would make the "Given...outside the initial
// viewport" precondition untestable.
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Impact Metrics', () => {
  test('Metric counters animate to correct target values on scroll', async ({ page }) => {
    // Given the homepage has loaded
    await page.setViewportSize({ width: 1280, height: 500 });
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // And the metrics band is outside the initial viewport
    await expect(portfolio.metricsSection).not.toBeInViewport();
    // Then all five metric values render at their initial/zero state
    await expect(portfolio.metricValues).toHaveText(['0', '0', '0', '0', '0']);

    // When the user scrolls the metrics band into view
    await portfolio.metricsSection.scrollIntoViewIfNeeded();

    // Then each value animates upward and settles on 15+, 75%, 80%, 50%, 12
    // And the animation completes within roughly one second
    await expect(portfolio.metricValues).toHaveText(['15+', '75%', '80%', '50%', '12'], {
      timeout: 2000,
    });
  });
});
