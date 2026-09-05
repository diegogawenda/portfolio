// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Contact / CTA', () => {
  test('Contact links work and content is correct', async ({ page, context }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to #contact
    await portfolio.contactSection.scrollIntoViewIfNeeded();

    // Then the headline reads "Let's fix your testing problem — for good."
    await expect(portfolio.ctaHeadline).toHaveText("Let's fix your testing problem — for good.");
    // And the subtext reads "From flaky test suites to shift-left strategy, I help teams ship faster with fewer surprises."
    await expect(portfolio.ctaSub).toHaveText(
      'From flaky test suites to shift-left strategy, I help teams ship faster with fewer surprises.'
    );

    // When the email button's href is inspected
    // Then it is exactly "mailto:diegogawenda@gmail.com" with no malformed encoding or extra parameters
    await expect(portfolio.mailtoLink).toHaveAttribute('href', 'mailto:diegogawenda@gmail.com');

    // When the user clicks "LinkedIn"
    const linkedin = portfolio.ctaLinkWithin(portfolio.contactSection, 'LinkedIn');
    await expect(linkedin).toHaveAttribute('rel', /noopener/);
    const [popup] = await Promise.all([context.waitForEvent('page'), linkedin.click()]);
    // Then a new tab opens to https://linkedin.com/in/diegogawenda with rel="noopener"
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
    expect(popup.url()).toContain('linkedin.com/in/diegogawenda');
    await popup.close();

    // Then the italicized quote "Quality is not the last step. It's part of how you build." is visible
    await expect(portfolio.ctaQuote).toBeVisible();
    await expect(portfolio.ctaQuote).toContainText("Quality is not the last step");
  });
});
