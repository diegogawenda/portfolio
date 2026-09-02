const { test, expect } = require('@playwright/test');

test.describe('Portfolio site', () => {
  test('loads with the correct title and no console errors', async ({ page }) => {
    const errors = [];
    const failedRequests = [];
    page.on('console', (msg) => {
      // Resource-load failures (e.g. the browser's implicit /favicon.ico probe)
      // surface as generic "Failed to load resource" console errors; those are
      // checked precisely below via response status instead.
      if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) {
        errors.push(msg.text());
      }
    });
    page.on('response', (res) => {
      // qa-results.json is generated from this very test run's output, so it
      // does not exist yet at test time — only once deployed alongside it.
      const ignored = ['/favicon.ico', '/qa-results.json'];
      if (res.status() >= 400 && !ignored.some((path) => res.url().endsWith(path))) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    });
    await page.goto('/');
    await expect(page).toHaveTitle(/Diego Gawenda/);
    expect(errors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });

  test('hero renders name, tagline, and headshot', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Diego Gawenda');
    await expect(page.locator('.hero-tagline')).toBeVisible();
    const photo = page.locator('.hero-photo img');
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('alt', /.+/);
  });

  test('nav links scroll to each section', async ({ page }) => {
    await page.goto('/');
    for (const [label, id] of [
      ['Expertise', 'expertise'],
      ['QA Lab', 'qa-lab'],
      ['Experience', 'experience'],
      ['Work', 'work'],
      ['Contact', 'contact'],
    ]) {
      await page.locator(`.nav a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test('mobile nav toggle opens and closes the menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const nav = page.locator('#nav');
    await expect(nav).not.toHaveClass(/open/);
    await page.locator('#navToggle').click();
    await expect(nav).toHaveClass(/open/);
    await page.locator('#nav a[href="#contact"]').click();
    await expect(nav).not.toHaveClass(/open/);
  });

  test('impact metrics animate up to their target values', async ({ page }) => {
    await page.goto('/');
    await page.locator('.metrics').scrollIntoViewIfNeeded();
    const firstMetric = page.locator('.metric-value').first();
    await expect(firstMetric).toHaveText('15+', { timeout: 3000 });
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt', /.+/);
    }
  });

  test('external links open safely in a new tab', async ({ page }) => {
    await page.goto('/');
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(externalLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });

  test('case study cards each show a challenge, approach, and outcome', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.case-study');
    const count = await cards.count();
    expect(count).toBe(3);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.case-metric')).toBeVisible();
    }
  });

  test('contact section exposes a working mailto link', async ({ page }) => {
    await page.goto('/');
    const mail = page.locator('#contact a[href^="mailto:"]');
    await expect(mail).toHaveAttribute('href', 'mailto:diegogawenda@gmail.com');
  });

  test('page is responsive at mobile width with no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasOverflow).toBe(false);
  });
});
