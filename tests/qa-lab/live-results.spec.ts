// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('QA Lab (Live Self-Test Panel)', () => {
  test('QA Lab loads and displays live CI results', async ({ page, context }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to #qa-lab and the qa-results.json fetch resolves
    await portfolio.qaLabSection.scrollIntoViewIfNeeded();

    // Then the "Tests", "Browsers", and "Pass rate" stats are populated with real values, not placeholder dashes
    await expect(portfolio.qaTotal).not.toHaveText('—');
    await expect(portfolio.qaBrowsers).not.toHaveText('—');
    await expect(portfolio.qaPassRate).not.toHaveText('—');
    await expect(portfolio.qaTotal).toHaveText(/^\d+$/);
    await expect(portfolio.qaPassRate).toHaveText(/^\d+%$/);
    // And the test name list is non-empty, with each entry prefixed by a pass/fail indicator
    // consistent with the reported pass rate
    const itemCount = await portfolio.qaTestList.locator('li').count();
    expect(itemCount).toBeGreaterThan(0);
    const passRateText = await portfolio.qaPassRate.textContent();
    if (passRateText === '100%') {
      await expect(portfolio.qaTestList.locator('li.qa-fail')).toHaveCount(0);
    }
    // And "Last run" shows a valid, recent timestamp
    await expect(portfolio.qaUpdated).toHaveText(/Last run: \d/);

    // When the user clicks "View full report ↗"
    // (this link has no target="_blank" — it navigates the current tab, unlike the GitHub link below)
    await portfolio.ctaLinkWithin(portfolio.qaLabSection, 'View full report ↗').click();
    await page.waitForURL(/qa-report\/index\.html$/);
    // Then the browser navigates to qa-report/index.html
    expect(page.url()).toContain('qa-report/index.html');
    // And the real Playwright HTML report loads, titled "Playwright Test Report"
    await expect(page).toHaveTitle('Playwright Test Report');
    await page.goBack();
    await portfolio.qaLabSection.scrollIntoViewIfNeeded();

    // When the user clicks "View suite on GitHub ↗"
    const [githubPopup] = await Promise.all([
      context.waitForEvent('page'),
      portfolio.ctaLinkWithin(portfolio.qaLabSection, 'View suite on GitHub ↗').click(),
    ]);
    // Then a new tab opens to the site.spec.js source on GitHub
    await githubPopup.waitForLoadState().catch(() => {});
    expect(githubPopup.url()).toBe(
      'https://github.com/diegogawenda/portfolio/blob/main/tests/site.spec.js'
    );
    await githubPopup.close();
  });
});
