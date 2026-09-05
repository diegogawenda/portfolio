// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Hero Section', () => {
  test('Hero renders identity and photo correctly', async ({ page }) => {
    // Given the viewport is set to 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    // When the homepage loads
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // Then the eyebrow text reads "Staff QA Software Engineer"
    await expect(portfolio.heroEyebrow).toHaveText('Staff QA Software Engineer');
    // And the h1 reads "Diego Gawenda"
    await expect(portfolio.heroHeading).toHaveText('Diego Gawenda');
    // And the tagline reads "Quality is a system, not a checklist."
    await expect(portfolio.heroTagline).toHaveText('Quality is a system, not a checklist.');
    // And the headshot image is visible, loads without error, and has non-empty alt text
    await expect(portfolio.heroPhotoImg).toBeVisible();
    await expect(portfolio.heroPhotoImg).toHaveAttribute('alt', /.+/);
    expect(await portfolio.heroPhotoImg.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);

    // When the photo container is inspected
    // Then the photo renders as a circle with the face centered, not cropped at an odd position
    const borderRadius = await portfolio.heroPhoto.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(borderRadius).toBe('50%');
    const objectPosition = await portfolio.heroPhotoImg.evaluate((el) => getComputedStyle(el).objectPosition);
    expect(objectPosition).not.toBe('50% 50%'); // deliberately offset to frame the face, not the image's midpoint
  });
});
