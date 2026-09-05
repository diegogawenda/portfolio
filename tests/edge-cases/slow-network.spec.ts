// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
//
// Note: Playwright has no built-in "Slow 3G" throttling profile (that's a
// DevTools/CDP-only feature). This approximates it by delaying every route's
// fulfillment, per the plan's advanced-scenario guidance.
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Negative & Edge Cases', () => {
  test('Broken or slow network handling', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    // Given the network is throttled to a slow 3G profile (approximated via
    // a per-request delay on every route)
    await page.route('**/*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      await route.continue();
    });

    // When the page reloads
    await page.goto('https://diegogawenda.github.io/portfolio/');

    // Then the page text remains readable before fonts and images finish loading
    await expect(portfolio.heroHeading).toHaveText('Diego Gawenda');
    // And no layout shift breaks readability
    expect(await portfolio.hasHorizontalOverflow()).toBe(false);

    await page.unroute('**/*');

    // Given the request for assets/headshot.jpg is blocked
    await page.route('**/assets/headshot.jpg', (route) => route.abort());

    // When the page reloads
    await page.goto('https://diegogawenda.github.io/portfolio/');

    // Then the alt text "Portrait of Diego Gawenda" is shown in place of the
    // image rather than a blank broken-image icon with no fallback
    await expect(portfolio.heroPhotoImg).toHaveAttribute('alt', 'Portrait of Diego Gawenda');
    expect(await portfolio.heroPhotoImg.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(0);
  });
});
