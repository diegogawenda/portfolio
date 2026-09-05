// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Negative & Edge Cases', () => {
  test('JavaScript disabled', async ({ browser }) => {
    // Given JavaScript execution is disabled in the browser
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const portfolio = new PortfolioPage(page);

    // When the page loads
    await page.goto('https://diegogawenda.github.io/portfolio/');

    // Then the static content — text, links, and images — still renders,
    // since the page is server-rendered HTML
    await expect(portfolio.heroHeading).toHaveText('Diego Gawenda');
    await expect(portfolio.heroTagline).toBeVisible();
    await expect(portfolio.heroPhotoImg).toBeVisible();
    await expect(portfolio.navLinks).toHaveCount(6);

    // And the mobile nav toggle and the QA Lab panel simply do nothing
    // rather than throwing errors, since no JS runs at all (expected
    // degradation, not a defect)
    await page.setViewportSize({ width: 390, height: 844 });
    await portfolio.navToggle.click();
    await expect(portfolio.navMenu).not.toBeVisible(); // no JS to add the "open" class
    await expect(portfolio.qaTotal).toHaveText('—'); // static placeholder, never replaced by the fetch

    await context.close();
  });
});
