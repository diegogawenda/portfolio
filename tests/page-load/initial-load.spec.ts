// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Page Load & Global Health', () => {
  test('Initial load renders core page shell', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) {
        consoleErrors.push(msg.text());
      }
    });
    page.on('response', (res) => {
      if (res.status() >= 400 && !res.url().endsWith('/favicon.ico')) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    });

    // Given a fresh browser session
    // When the user navigates to https://diegogawenda.github.io/portfolio/
    const response = await page.goto('https://diegogawenda.github.io/portfolio/');

    // Then the HTTP response status is 200
    expect(response?.status()).toBe(200);
    // And the page title is "Diego Gawenda — Staff QA Software Engineer"
    await expect(page).toHaveTitle('Diego Gawenda — Staff QA Software Engineer');
    // And no console errors are logged, excluding the browser's implicit /favicon.ico probe
    expect(consoleErrors).toEqual([]);

    // When all network requests fired during load are inspected
    // Then every request resolves with a status below 400
    expect(failedRequests).toEqual([]);

    const portfolio = new PortfolioPage(page);
    // And the declared SVG favicon (assets/favicon.svg) loads successfully
    expect(await portfolio.fetchStatus('assets/favicon.svg')).toBe(200);

    // When the loaded fonts and styles are inspected
    // Then css/style.css has loaded before first paint
    // And the Inter and JetBrains Mono Google Fonts are applied to visible text
    expect(await portfolio.bodyFontFamily()).toContain('Inter');
    expect(await portfolio.logoFontFamily()).toContain('JetBrains Mono');
  });
});
