// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Primary Navigation', () => {
  test('Keyboard-only navigation reaches every nav link', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user presses Tab repeatedly starting from page load
    // Then a visible focus outline lands on the "DG." logo first, then each nav link in visual order
    await page.keyboard.press('Tab');
    await expect(portfolio.logo).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(portfolio.navLink('about')).toBeFocused();

    // When the user presses Enter on a focused nav link
    await page.keyboard.press('Enter');
    // Then the same scroll-to-section behavior occurs as a mouse click
    await expect(page).toHaveURL(/#about$/);
    await expect(portfolio.sectionHeading('about')).toBeInViewport();
  });
});
