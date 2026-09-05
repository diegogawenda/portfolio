// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Selected Work / Case Studies', () => {
  test('Three case studies each present challenge, approach, and outcome', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to #work
    await portfolio.workSection.scrollIntoViewIfNeeded();

    // Then exactly three case study cards render, for Flex, Almanac, and dLocal
    await expect(portfolio.caseStudies).toHaveCount(3);
    const tags = ['Case study — Flex', 'Case study — Almanac', 'Case study — dLocal'];
    await expect(portfolio.caseStudies.locator('.case-tag')).toHaveText(tags);
    // And each card contains a tag, a title, a Challenge/Approach/Outcome paragraph, and a metric line
    for (let i = 0; i < 3; i++) {
      const card = portfolio.caseStudies.nth(i);
      await expect(card.locator('h3')).not.toBeEmpty();
      await expect(card.locator('p')).toHaveCount(3);
      await expect(card.locator('p').nth(0)).toContainText('Challenge:');
      await expect(card.locator('p').nth(1)).toContainText('Approach:');
      await expect(card.locator('p').nth(2)).toContainText('Outcome:');
      await expect(card.locator('.case-metric')).not.toBeEmpty();
    }

    // When the outcome metrics are cross-checked against the Experience section
    // Then the metrics quoted in each case study match the corresponding bullet
    // in the Experience timeline for the same company
    await portfolio.experienceSection.scrollIntoViewIfNeeded();
    const flexBullets = await portfolio.timelineItems.nth(0).locator('ul li').allTextContents();
    expect(flexBullets.some((b) => b.includes('75%') && b.includes('daily release'))).toBe(true);
    const almanacBullets = await portfolio.timelineItems.nth(1).locator('ul li').allTextContents();
    expect(almanacBullets.some((b) => b.includes('50%'))).toBe(true);
    // The case study's metric line synthesizes two separate dLocal bullets
    // (automation ROI and team size), so check them independently.
    const dLocalBullets = await portfolio.timelineItems.nth(2).locator('ul li').allTextContents();
    expect(dLocalBullets.some((b) => b.includes('80%'))).toBe(true);
    expect(dLocalBullets.some((b) => b.includes('12 engineers'))).toBe(true);
  });
});
