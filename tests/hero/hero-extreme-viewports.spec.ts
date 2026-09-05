// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
//
// Spec correction: the plan expected the hero to stay "left-aligned" at very
// wide viewports. Live exploration via playwright-cli showed it is actually
// centered (`.container { margin: 0 auto }`) — confirmed symmetric ~900px
// margins on each side at 2560px width. Centering, not left-alignment, is
// the site's intended behavior, so this test asserts that instead.
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Hero Section', () => {
  test('Hero layout holds at extreme viewport widths', async ({ page }) => {
    // Given the viewport is set to 320x568, the smallest common mobile width
    await page.setViewportSize({ width: 320, height: 568 });
    // When the homepage loads
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // Then no horizontal scrollbar appears
    expect(await portfolio.hasHorizontalOverflow()).toBe(false);
    // And the photo and name remain on the same row without text overlapping the photo
    const photoBox = await portfolio.heroPhoto.boundingBox();
    const headingBox = await portfolio.heroHeading.boundingBox();
    expect(photoBox && headingBox && photoBox.x + photoBox.width <= headingBox.x).toBe(true);

    // Given the viewport is set to 2560x1440, a large desktop width
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto('https://diegogawenda.github.io/portfolio/');

    // Then the hero content stays capped at its max-width
    const maxWidth = await portfolio.heroSection.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(maxWidth).not.toBe('none');
    const heroBox = await portfolio.heroSection.boundingBox();
    expect(heroBox && heroBox.width).toBeLessThan(2560);

    // And the hero content remains centered rather than stretching full-bleed
    const leftMargin = heroBox!.x;
    const rightMargin = 2560 - (heroBox!.x + heroBox!.width);
    expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(2);
  });
});
