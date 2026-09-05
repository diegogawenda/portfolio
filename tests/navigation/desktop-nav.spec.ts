// Created By AI
// spec: test-artifacts/portfolio.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../../page_objects/PortfolioPage';

test.describe('Primary Navigation', () => {
  test('Desktop nav links scroll to matching sections', async ({ page }) => {
    // Given the viewport is set to 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    // And the homepage has loaded
    await page.goto('https://diegogawenda.github.io/portfolio/');
    const portfolio = new PortfolioPage(page);

    // Then the nav bar shows six links in order: About, Expertise, QA Lab, Experience, Work, Contact
    const labels = ['About', 'Expertise', 'QA Lab', 'Experience', 'Work', 'Contact'];
    await expect(portfolio.navLinks).toHaveText(labels);

    // When the user clicks each nav link in order from About through Contact
    // Then after each click the URL hash matches the target section id
    // And that section's heading is within the viewport
    for (const id of ['about', 'expertise', 'qa-lab', 'experience', 'work', 'contact']) {
      await portfolio.navLink(id).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(portfolio.sectionHeading(id)).toBeInViewport();
    }

    // When the user clicks the "DG." logo
    await portfolio.logo.click();
    // Then the page scrolls back to the top of the hero (#top)
    await expect(page).toHaveURL(/#top$/);
    await expect(portfolio.heroHeading).toBeInViewport();
  });
});
