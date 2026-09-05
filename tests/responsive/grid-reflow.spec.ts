// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Responsive & Cross-Viewport Behavior', () => {
  test('Multi-column grids reflow correctly', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    // Given the viewport width is 901px or more
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto('https://diegogawenda.github.io/portfolio/');

    // When the expertise, case-study, and how-I-work grids are inspected
    // Then expertise renders as a 2-column grid
    expect(await portfolio.gridColumnCount(portfolio.cardGrid)).toBe(2);
    // And case studies and how-I-work render as 3-column grids
    expect(await portfolio.gridColumnCount(portfolio.caseGrid)).toBe(3);
    expect(await portfolio.gridColumnCount(portfolio.howGrid)).toBe(3);
    // And no card is clipped or overlapping
    const expertiseBoxes = await portfolio.expertiseCards.evaluateAll((cards) =>
      cards.map((c) => c.getBoundingClientRect().toJSON())
    );
    expect(expertiseBoxes[0].right).toBeLessThanOrEqual(expertiseBoxes[1].left + 1);

    // Given the viewport width is 900px or less
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto('https://diegogawenda.github.io/portfolio/');

    // When the same grids are inspected
    // Then all of them collapse to a single column
    expect(await portfolio.gridColumnCount(portfolio.cardGrid)).toBe(1);
    expect(await portfolio.gridColumnCount(portfolio.caseGrid)).toBe(1);
    expect(await portfolio.gridColumnCount(portfolio.howGrid)).toBe(1);
    // And the content order still matches source/reading order
    const titles = await portfolio.expertiseCards.locator('h3').allTextContents();
    expect(titles).toEqual([
      'Test Strategy & Leadership',
      'Automation Engineering',
      'API, Data & Contracts',
      'Delivery & Quality Gates',
    ]);
  });
});
