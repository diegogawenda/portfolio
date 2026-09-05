// Created By AI
import { Page, Locator } from '@playwright/test';

// Page Object for the single-page portfolio site. Encapsulates locators and
// user interactions only — assertions belong in the spec files that use it.
export class PortfolioPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly qaLabSection: Locator;
  readonly contactSection: Locator;
  readonly workSection: Locator;
  readonly experienceSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.logo');
    this.qaLabSection = page.locator('#qa-lab');
    this.contactSection = page.locator('#contact');
    this.workSection = page.locator('#work');
    this.experienceSection = page.locator('#experience');
  }

  /** Navigate directly to a URL fragment, e.g. "#qa-lab". */
  async gotoAnchor(hash: string) {
    await this.page.goto(`https://diegogawenda.github.io/portfolio/${hash}`);
  }

  /** Computed font-family of the page body, to confirm web fonts applied. */
  async bodyFontFamily(): Promise<string> {
    return this.page.evaluate(() => getComputedStyle(document.body).fontFamily);
  }

  /** Computed font-family of the "DG." logo mark (set in JetBrains Mono). */
  async logoFontFamily(): Promise<string> {
    return this.logo.evaluate((el) => getComputedStyle(el).fontFamily);
  }

  /** Fetch a same-origin path from within the page and return its HTTP status. */
  async fetchStatus(path: string): Promise<number> {
    return this.page.evaluate(async (p) => {
      const res = await fetch(p);
      return res.status;
    }, path);
  }

  /** Whether a section locator is currently within the viewport bounds. */
  async isInViewport(locator: Locator): Promise<boolean> {
    return locator.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });
  }

  /** Content of the page's <meta name="description"> tag. */
  async metaDescriptionContent(): Promise<string | null> {
    return this.page.locator('meta[name="description"]').getAttribute('content');
  }

  /** Locator for a top-level section by its id, e.g. "contact" or "work". */
  section(id: string): Locator {
    return this.page.locator(`#${id}`);
  }
}
