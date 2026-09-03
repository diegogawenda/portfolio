import { test } from '@playwright/test';

// Seed file for the Playwright Test Planner / Generator agents.
// Boots the page under test: the live portfolio site.
test('seed', async ({ page }) => {
  await page.goto('https://diegogawenda.github.io/portfolio/');
});
