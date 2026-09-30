import { test } from '@playwright/test';
import { SITE_URL } from './helpers/site';

// Seed file for the Playwright Test Planner / Generator agents.
// Boots the page under test: the live portfolio site.
test('seed', async ({ page }) => {
  await page.goto(SITE_URL);
});
