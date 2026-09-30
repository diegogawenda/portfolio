// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';
import { SITE_URL } from '../helpers/site';

test.describe('Page Load & Global Health', () => {
  test('Direct navigation to a section anchor loads pre-scrolled', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    // Capture the baseline title/meta description with no anchor, to compare
    // against below ("unchanged regardless of anchor").
    await page.goto(SITE_URL);
    const baselineTitle = await page.title();
    const baselineDescription = await portfolio.metaDescriptionContent();

    // Given a fresh browser session
    // When the user navigates directly to https://diegogawenda.github.io/portfolio/#qa-lab
    await page.goto(`${SITE_URL}#qa-lab`);

    // Then the QA Lab section (#qa-lab) is scrolled into view on initial load
    //
    // Using expect.poll() over the built-in toBeInViewport() here: the CSS
    // scroll-behavior: smooth anchor animation takes ~1-2s to settle, and
    // toBeInViewport() reliably reported "ratio 0" for the *second* and
    // later same-page hash navigation in a chain (base -> #qa-lab passed;
    // #qa-lab -> #contact then failed deterministically for the full
    // timeout, confirmed with an unpaused diagnostic script logging
    // getBoundingClientRect() every 200ms — the element demonstrably does
    // scroll into view within ~2s in that exact sequence). Root cause not
    // fully pinned down (something about toBeInViewport's own tracking
    // across back-to-back navigations on the same page), but the
    // getBoundingClientRect()-based check below is proven reliable for
    // this exact scenario.
    await expect.poll(() => portfolio.isInViewport(portfolio.qaLabSection), { timeout: 10000 }).toBe(true);
    // And the page title and meta description are unchanged regardless of anchor
    await expect(page).toHaveTitle(baselineTitle);
    expect(await portfolio.metaDescriptionContent()).toBe(baselineDescription);

    // When the user navigates directly to a URL ending in #contact, #work, or #experience
    // Then the matching target section is the one visible in the viewport immediately after load
    for (const id of ['contact', 'work', 'experience']) {
      await page.goto('about:blank');
      await page.goto(`${SITE_URL}#${id}`);
      await expect.poll(() => portfolio.isInViewport(portfolio.section(id)), { timeout: 10000 }).toBe(true);
    }
  });
});
