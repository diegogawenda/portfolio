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
  readonly navMenu: Locator;
  readonly navToggle: Locator;
  readonly heroSection: Locator;
  readonly heroEyebrow: Locator;
  readonly heroHeading: Locator;
  readonly heroTagline: Locator;
  readonly heroPhoto: Locator;
  readonly heroPhotoImg: Locator;
  readonly metricsSection: Locator;
  readonly metricValues: Locator;
  readonly expertiseCards: Locator;
  readonly qaTotal: Locator;
  readonly qaBrowsers: Locator;
  readonly qaPassRate: Locator;
  readonly qaTestList: Locator;
  readonly qaUpdated: Locator;
  readonly howCards: Locator;
  readonly timelineItems: Locator;
  readonly caseStudies: Locator;
  readonly eduCards: Locator;
  readonly languagesLine: Locator;
  readonly processSteps: Locator;
  readonly ctaHeadline: Locator;
  readonly ctaSub: Locator;
  readonly ctaQuote: Locator;
  readonly mailtoLink: Locator;
  readonly footer: Locator;
  readonly footerGithubLink: Locator;
  readonly cardGrid: Locator;
  readonly caseGrid: Locator;
  readonly howGrid: Locator;
  readonly eduGrid: Locator;
  readonly processRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.logo');
    this.qaLabSection = page.locator('#qa-lab');
    this.contactSection = page.locator('#contact');
    this.workSection = page.locator('#work');
    this.experienceSection = page.locator('#experience');
    this.navMenu = page.locator('#nav');
    this.navToggle = page.locator('#navToggle');
    this.heroSection = page.locator('.hero');
    this.heroEyebrow = page.locator('.eyebrow').first();
    this.heroHeading = page.locator('h1');
    this.heroTagline = page.locator('.hero-tagline');
    this.heroPhoto = page.locator('.hero-photo');
    this.heroPhotoImg = page.locator('.hero-photo img');
    this.metricsSection = page.locator('.metrics');
    this.metricValues = page.locator('.metric-value');
    this.expertiseCards = page.locator('#expertise .card');
    this.qaTotal = page.locator('#qaTotal');
    this.qaBrowsers = page.locator('#qaBrowsers');
    this.qaPassRate = page.locator('#qaPassRate');
    this.qaTestList = page.locator('#qaTestList');
    this.qaUpdated = page.locator('#qaUpdated');
    this.howCards = page.locator('.how-grid .how-card');
    this.timelineItems = page.locator('.timeline .timeline-item');
    this.caseStudies = page.locator('.case-study');
    this.eduCards = page.locator('.edu-grid .edu-card');
    this.languagesLine = page.locator('.languages');
    this.processSteps = page.locator('.process-row .process-step');
    this.ctaHeadline = page.locator('.cta-headline');
    this.ctaSub = page.locator('.cta-sub');
    this.ctaQuote = page.locator('.cta-quote');
    this.mailtoLink = page.locator('#contact a[href^="mailto:"]');
    this.footer = page.locator('.site-footer');
    this.footerGithubLink = page.locator('.site-footer a');
    this.cardGrid = page.locator('.card-grid');
    this.caseGrid = page.locator('.case-grid');
    this.howGrid = page.locator('.how-grid');
    this.eduGrid = page.locator('.edu-grid');
    this.processRow = page.locator('.process-row');
  }

  /** Number of columns a CSS grid locator currently renders (via computed style). */
  async gridColumnCount(locator: Locator): Promise<number> {
    return locator.evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
    );
  }

  /** Count of <img> elements with no (or empty) alt attribute. */
  async imagesWithoutAltCount(): Promise<number> {
    return this.page.locator('img:not([alt]), img[alt=""]').count();
  }

  /** Count of target="_blank" links missing rel="noopener". */
  async externalLinksWithoutNoopenerCount(): Promise<number> {
    return this.page.evaluate(
      () =>
        Array.from(document.querySelectorAll('a[target="_blank"]')).filter(
          (a) => !(a.getAttribute('rel') || '').includes('noopener')
        ).length
    );
  }

  /** Number of heading elements at a given level (1-6). */
  headingLevel(level: number): Locator {
    return this.page.locator(`h${level}`);
  }

  /** Intercept the qa-results.json fetch with a mocked response body. */
  async mockQaResults(body: unknown, status = 200) {
    await this.page.route('**/qa-results.json', (route) =>
      route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })
    );
  }

  /** Locator for a nav bar link by its target section id, e.g. "expertise". */
  navLink(id: string): Locator {
    return this.page.locator(`.nav a[href="#${id}"]`);
  }

  /** All links currently rendered inside the nav menu. */
  get navLinks(): Locator {
    return this.navMenu.locator('a');
  }

  /** Heading element (h1 or h2) for a top-level section, e.g. "contact". */
  sectionHeading(id: string): Locator {
    return this.section(id).locator('h1, h2').first();
  }

  /** A link by its accessible name, anywhere on the page. */
  ctaLink(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  /** A link by its accessible name, scoped to a specific section/container locator. */
  ctaLinkWithin(container: Locator, name: string): Locator {
    return container.getByRole('link', { name });
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

  /** Whether the document is wider than the viewport (a horizontal scrollbar would appear). */
  async hasHorizontalOverflow(): Promise<boolean> {
    return this.page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
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
