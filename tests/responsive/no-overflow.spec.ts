// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Responsive & Cross-Viewport Behavior', () => {
  test('No horizontal overflow at common breakpoints', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    // Given the homepage is loaded at 320, 375, 390, 768, 1024, 1440, and 1920px widths in turn
    // Then the document's scrollWidth never exceeds clientWidth at any width
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('https://diegogawenda.github.io/portfolio/');
      expect(await portfolio.hasHorizontalOverflow(), `overflow at ${width}px`).toBe(false);
    }

    // Given the viewport is set to 899px and then 901px, either side of the layout breakpoint
    // Then the expertise, case-study, education, and process grid layouts switch cleanly
    // between column counts without visual overlap
    await page.setViewportSize({ width: 899, height: 900 });
    await page.goto('https://diegogawenda.github.io/portfolio/');
    expect(await portfolio.gridColumnCount(portfolio.cardGrid)).toBe(1);
    expect(await portfolio.gridColumnCount(portfolio.caseGrid)).toBe(1);
    expect(await portfolio.gridColumnCount(portfolio.eduGrid)).toBe(1);

    await page.setViewportSize({ width: 901, height: 900 });
    await page.goto('https://diegogawenda.github.io/portfolio/');
    expect(await portfolio.gridColumnCount(portfolio.cardGrid)).toBe(2);
    expect(await portfolio.gridColumnCount(portfolio.caseGrid)).toBe(3);
    expect(await portfolio.gridColumnCount(portfolio.eduGrid)).toBe(2);
    expect(await portfolio.hasHorizontalOverflow()).toBe(false);
  });
});
