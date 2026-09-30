// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';
import { SITE_URL } from '../helpers/site';

test.describe('Hero Section', () => {
  test('Hero call-to-action buttons behave correctly', async ({ page, context }) => {
    // Given the homepage has loaded
    await page.goto(SITE_URL);
    const portfolio = new PortfolioPage(page);

    // When the user clicks "Get in touch"
    await portfolio.ctaLinkWithin(portfolio.heroSection, 'Get in touch').click();
    // Then the page scrolls to #contact
    await expect(page).toHaveURL(/#contact$/);
    await expect(portfolio.contactSection).toBeInViewport();

    // When the user clicks "LinkedIn"
    const linkedin = portfolio.ctaLinkWithin(portfolio.heroSection, 'LinkedIn');
    await expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/diegogawenda');
    // And the link has rel="noopener"
    await expect(linkedin).toHaveAttribute('rel', /noopener/);
    const [linkedinPopup] = await Promise.all([context.waitForEvent('page'), linkedin.click()]);
    // Then a new tab opens to https://linkedin.com/in/diegogawenda
    await linkedinPopup.waitForLoadState('domcontentloaded').catch(() => {});
    expect(linkedinPopup.url()).toContain('linkedin.com/in/diegogawenda');
    // And the original tab remains on the portfolio
    expect(page.url()).toContain('diegogawenda.github.io/portfolio');
    await linkedinPopup.close();

    // And the hero no longer offers a "Download CV" button
    await expect(portfolio.heroSection.getByRole('link', { name: 'Download CV' })).toHaveCount(0);
  });
});
