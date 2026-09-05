// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Footer', () => {
  test('Footer renders dynamic year and source link', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to the footer
    await portfolio.footer.scrollIntoViewIfNeeded();

    // Then the copyright year equals the current year, set dynamically via JS
    const currentYear = new Date().getFullYear();
    await expect(portfolio.footer).toContainText(`© ${currentYear}`);
    // And the "source on GitHub" link points to https://github.com/diegogawenda/portfolio and opens in a new tab
    await expect(portfolio.footerGithubLink).toHaveAttribute(
      'href',
      'https://github.com/diegogawenda/portfolio'
    );
    await expect(portfolio.footerGithubLink).toHaveAttribute('target', '_blank');
    await expect(portfolio.footerGithubLink).toHaveAttribute('rel', /noopener/);
  });
});
