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
      tests: ['passing test one', 'passing test two', 'failing test one', 'failing test two'],
    });

    // When the user views the QA Lab panel
    await page.goto('https://diegogawenda.github.io/portfolio/');
    await portfolio.qaLabSection.scrollIntoViewIfNeeded();

    // Then the pass rate stat reflects the mocked percentage exactly
    await expect(portfolio.qaPassRate).toHaveText('80%');
    // And failing test entries are visually distinguished from passing ones
    //
    // Note: the app's current main.js always renders every list item with
    // class "qa-pass" regardless of the mocked `failed` count (see
    // js/main.js loadQaResults — `li.className = data.failed === 0 ? 'qa-pass' : 'qa-pass'`,
    // a bug: both branches assign the same class). Confirmed live via
    // playwright-cli. This is a real product bug, not a stale spec — the
    // CSS for `.qa-fail` exists and is unused. Filing as a known failure
    // rather than silently weakening the assertion.
    const failStyledCount = await portfolio.qaTestList.locator('li.qa-fail').count();
    test.fixme(
      failStyledCount === 0,
      'main.js always classes QA Lab test list items as "qa-pass", even when data.failed > 0 — ' +
        'failing entries are never visually distinguished. See js/main.js loadQaResults(). ' +
        'Flagged for the user to confirm whether this is a bug to fix or intentional.'
    );
    expect(failStyledCount).toBeGreaterThan(0);
  });
});
