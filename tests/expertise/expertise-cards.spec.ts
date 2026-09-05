// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Expertise Section', () => {
  test('All four expertise cards render complete content', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to #expertise
    await portfolio.expertiseCards.first().scrollIntoViewIfNeeded();

    // Then exactly four cards are present, numbered 01–04
    await expect(portfolio.expertiseCards).toHaveCount(4);
    const titles = ['Test Strategy & Leadership', 'Automation Engineering', 'API, Data & Contracts', 'Delivery & Quality Gates'];
    await expect(portfolio.expertiseCards.locator('h3')).toHaveText(titles);
    // And each card has a description paragraph and a non-empty list of tag chips
    for (let i = 0; i < 4; i++) {
      const card = portfolio.expertiseCards.nth(i);
      await expect(card.locator('p')).not.toBeEmpty();
      expect(await card.locator('.tag-list li').count()).toBeGreaterThan(0);
    }

    // When the tag counts are checked against current content
    // Then "Test Strategy & Leadership" lists 8 tags
    await expect(portfolio.expertiseCards.nth(0).locator('.tag-list li')).toHaveCount(8);
    // And "Automation Engineering" lists 9 tags
    await expect(portfolio.expertiseCards.nth(1).locator('.tag-list li')).toHaveCount(9);
  });
});
