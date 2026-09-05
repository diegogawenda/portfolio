// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Accessibility', () => {
  test.use({ reducedMotion: 'reduce' });

  test('Reduced-motion preference is respected', async ({ page }) => {
    // Given the browser emulates prefers-reduced-motion: reduce
    // When the page reloads and the metrics band is scrolled into view
    await page.setViewportSize({ width: 1280, height: 500 });
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);
    await portfolio.metricsSection.scrollIntoViewIfNeeded();

    // Then the metric counters either skip the count-up animation and
    // display final values immediately, or animate with a significantly
    // reduced duration.
    //
    // js/main.js's animateMetric() now checks
    // matchMedia('(prefers-reduced-motion: reduce)') and, when set, writes
    // the final value directly instead of running the 1000ms
    // requestAnimationFrame count-up — so the values are already correct
    // immediately after the section scrolls into view, with no wait.
    await expect(portfolio.metricValues).toHaveText(['15+', '75%', '80%', '50%', '12']);
  });
});
