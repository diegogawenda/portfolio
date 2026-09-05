// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Hero Section', () => {
  test('Hero call-to-action buttons behave correctly', async ({ page, context }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
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

    // When the user clicks "Download CV"
    // Then a new tab opens loading assets/Diego-Gawenda-CV.pdf
    // And the response status is 200 with content-type application/pdf
    //
    // Note: Chromium's native PDF viewer popup reports an empty url()/title()
    // even once loaded (confirmed live via playwright-cli), so this asserts
    // on the actual network response instead of the popup page object.
    const downloadCv = portfolio.ctaLinkWithin(portfolio.heroSection, 'Download CV');
    const [cvPopup, cvResponse] = await Promise.all([
      context.waitForEvent('page'),
      context.waitForEvent('response', (res) => res.url().includes('Diego-Gawenda-CV.pdf')),
      downloadCv.click(),
    ]);
    expect(cvPopup).toBeTruthy();
    expect(cvResponse.status()).toBe(200);
    expect(cvResponse.headers()['content-type']).toContain('application/pdf');
    await cvPopup.close();
  });
});
