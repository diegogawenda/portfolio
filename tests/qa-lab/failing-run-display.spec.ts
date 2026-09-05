// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('QA Lab (Live Self-Test Panel)', () => {
  test('QA Lab reflects a run containing failing tests', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    // Given the qa-results.json response is mocked with failed > 0, for example passRate 80 and failed 4
    await portfolio.mockQaResults({
      generatedAt: new Date().toISOString(),
      totalTests: 20,
      passed: 16,
      failed: 4,
      browsers: ['chromium', 'webkit'],
      passRate: 80,
      tests: [
        { title: 'passing test one', passed: true },
        { title: 'passing test two', passed: true },
        { title: 'failing test one', passed: false },
        { title: 'failing test two', passed: false },
      ],
    });

    // When the user views the QA Lab panel
    await page.goto('https://diegogawenda.github.io/portfolio/');
    await portfolio.qaLabSection.scrollIntoViewIfNeeded();

    // Then the pass rate stat reflects the mocked percentage exactly
    await expect(portfolio.qaPassRate).toHaveText('80%');
    // And failing test entries are visually distinguished from passing ones
    //
    // main.js originally classed every list item "qa-pass" regardless of
    // actual per-test outcome — a real bug, since qa-results.json only
    // stored test titles with no per-test pass/fail data at all. Fixed by
    // having generate-qa-summary.js emit {title, passed} pairs and main.js
    // use that to choose "qa-pass"/"qa-fail" per item.
    await expect(portfolio.qaTestList.locator('li.qa-fail')).toHaveCount(2);
    await expect(portfolio.qaTestList.locator('li.qa-pass')).toHaveCount(2);
  });
});
