// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Primary Navigation', () => {
  test('Mobile nav hamburger opens, navigates, and closes', async ({ page }) => {
    // Given the viewport is set to 390x844
    await page.setViewportSize({ width: 390, height: 844 });
    // And the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // Then the six text nav links are hidden
    await expect(portfolio.navMenu).not.toBeVisible();
    // And a hamburger toggle button is visible instead
    await expect(portfolio.navToggle).toBeVisible();

    // When the user clicks the hamburger button
    await portfolio.navToggle.click();
    // Then aria-expanded on the button becomes "true"
    await expect(portfolio.navToggle).toHaveAttribute('aria-expanded', 'true');
    // And the nav menu becomes visible with all six links stacked vertically
    await expect(portfolio.navMenu).toBeVisible();
    await expect(portfolio.navMenu.locator('a')).toHaveCount(6);

    // When the user clicks a nav link, for example "Work"
    await portfolio.navLink('work').click();
    // Then the page scrolls to #work
    await expect(page).toHaveURL(/#work$/);
    // And the menu closes automatically
    // And aria-expanded returns to "false"
    await expect(portfolio.navMenu).not.toBeVisible();
    await expect(portfolio.navToggle).toHaveAttribute('aria-expanded', 'false');

    // When the user clicks the hamburger button again without selecting a link
    await portfolio.navToggle.click();
    await expect(portfolio.navMenu).toBeVisible();
    await portfolio.navToggle.click();
    // Then the menu closes
    // And aria-expanded returns to "false"
    await expect(portfolio.navMenu).not.toBeVisible();
    await expect(portfolio.navToggle).toHaveAttribute('aria-expanded', 'false');
  });
});
