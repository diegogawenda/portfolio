// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('QA Lab (Live Self-Test Panel)', () => {
  test('QA Lab degrades gracefully when qa-results.json is unavailable', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) {
        consoleErrors.push(msg.text());
      }
    });

    const portfolio = new PortfolioPage(page);
    // Given the request to qa-results.json is intercepted and forced to return a 404
    await portfolio.mockQaResults({}, 404);

    // When the page loads
    await page.goto('https://diegogawenda.github.io/portfolio/');
    await portfolio.qaLabSection.scrollIntoViewIfNeeded();

    // Then the stats show placeholder dashes instead of throwing a JS error or breaking the layout
    await expect(portfolio.qaTotal).toHaveText('—');
    await expect(portfolio.qaBrowsers).toHaveText('—');
    await expect(portfolio.qaPassRate).toHaveText('—');
    // And the test list shows the fallback message
    await expect(portfolio.qaTestList).toHaveText(
      'Results publish after the first CI run on GitHub Actions.'
    );
    // And no uncaught JS errors appear in the console as a result of the failed fetch
    expect(consoleErrors).toEqual([]);
  });
});
