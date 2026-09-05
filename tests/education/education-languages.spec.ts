// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Education & Languages', () => {
  test('Education and languages render correctly', async ({ page }) => {
    // Given the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // When the user scrolls to the Education section
    await portfolio.eduCards.first().scrollIntoViewIfNeeded();

    // Then two education cards render
    await expect(portfolio.eduCards).toHaveCount(2);
    await expect(portfolio.eduCards.locator('h3')).toHaveText([
      'Software Engineering',
      'Software Testing Leader',
    ]);
    await expect(portfolio.eduCards.locator('p')).toHaveText([
      'Universidad de la República',
      'Centro de Ensayos de Software',
    ]);

    // And a Languages line lists exactly four languages
    await expect(portfolio.languagesLine).toContainText('Spanish (native)');
    await expect(portfolio.languagesLine).toContainText('English (professional working proficiency)');
    await expect(portfolio.languagesLine).toContainText('Portuguese');
    await expect(portfolio.languagesLine).toContainText('German');
    const languageCount = (await portfolio.languagesLine.textContent())!.split('·').length;
    expect(languageCount).toBe(4);
  });
});
