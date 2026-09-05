// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Page Load & Global Health', () => {
  test('Direct navigation to a section anchor loads pre-scrolled', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    // Capture the baseline title/meta description with no anchor, to compare
    // against below ("unchanged regardless of anchor").
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const baselineTitle = await page.title();
    const baselineDescription = await portfolio.metaDescriptionContent();

    // Given a fresh browser session
    // When the user navigates directly to https://diegogawenda.github.io/portfolio/#qa-lab
    await page.goto('https://diegogawenda.github.io/portfolio/#qa-lab');

    // Then the QA Lab section (#qa-lab) is scrolled into view on initial load
    await expect(portfolio.qaLabSection).toBeInViewport();
    // And the page title and meta description are unchanged regardless of anchor
    await expect(page).toHaveTitle(baselineTitle);
    expect(await portfolio.metaDescriptionContent()).toBe(baselineDescription);

    // When the user navigates directly to a URL ending in #contact, #work, or #experience
    // Then the matching target section is the one visible in the viewport immediately after load
    for (const id of ['contact', 'work', 'experience']) {
      await page.goto(`https://diegogawenda.github.io/portfolio/#${id}`);
      await expect(portfolio.section(id)).toBeInViewport();
    }
  });
});
