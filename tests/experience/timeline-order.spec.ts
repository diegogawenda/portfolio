// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Experience Timeline', () => {
  test('All five roles render in reverse-chronological order', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to #experience
    await portfolio.timelineItems.first().scrollIntoViewIfNeeded();

    // Then five entries appear in this order: Flex, Almanac, dLocal, The Appraisal Lane, Greycon
    await expect(portfolio.timelineItems).toHaveCount(5);
    const expected = [
      { role: 'Staff SDET', company: 'Flex', date: 'Feb 2024 – Present' },
      { role: 'Senior SDET', company: 'Almanac', date: 'Jul 2022 – Dec 2023' },
      { role: 'QA Lead / Senior SDET', company: 'dLocal', date: 'Oct 2020 – Jul 2022' },
      { role: 'QA Lead', company: 'The Appraisal Lane', date: 'Jun 2016 – Aug 2020' },
      { role: 'QA Manager / Senior QA Engineer', company: 'Greycon', date: 'Aug 2007 – Jun 2016' },
    ];
    await expect(portfolio.timelineItems.locator('.timeline-role')).toHaveText(
      expected.map((e) => e.role)
    );
    await expect(portfolio.timelineItems.locator('.timeline-company')).toHaveText(
      expected.map((e) => e.company)
    );
    // And each entry shows role, company, date range, and at least two bullet achievements
    await expect(portfolio.timelineItems.locator('.timeline-date')).toHaveText(
      expected.map((e) => e.date)
    );
    for (let i = 0; i < 5; i++) {
      const bulletCount = await portfolio.timelineItems.nth(i).locator('ul li').count();
      expect(bulletCount).toBeGreaterThanOrEqual(2);
    }

    // When the date ranges are checked in sequence
    // Then each entry's end date is on or after the following entry's end date
    const dateTexts = await portfolio.timelineItems.locator('.timeline-date').allTextContents();
    const currentYear = new Date().getFullYear();
    const endYears = dateTexts.map((text) =>
      text.includes('Present') ? currentYear : Number(text.match(/(\d{4})\s*$/)?.[1])
    );
    for (let i = 0; i < endYears.length - 1; i++) {
      expect(endYears[i]).toBeGreaterThanOrEqual(endYears[i + 1]);
    }
  });
});
