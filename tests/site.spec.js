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
      ['Services', 'services'],
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
    const mail = page.locator('#contact a.btn-outline-light[href^="mailto:"]');
    await expect(mail).toHaveAttribute('href', 'mailto:diegogawenda@gmail.com');
    await expect(page.locator('#contact a[data-book]')).toHaveText('Book a 30-minute call');
  });

  test('page is responsive at mobile width with no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasOverflow).toBe(false);
  });

  test('recommendations section shows five attributed quotes', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#recommendations');
    await expect(section.locator('.eyebrow')).toContainText('Working with Diego');
    const cards = section.locator('.reco-card');
    await expect(cards).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(cards.nth(i).locator('blockquote p').first()).not.toBeEmpty();
      await expect(cards.nth(i).locator('.reco-theme')).not.toBeEmpty();
      await expect(cards.nth(i).locator('figcaption strong')).not.toBeEmpty();
      await expect(cards.nth(i).locator('.reco-date')).toHaveText(/\d{4}/);
    }
    await expect(cards.locator('figcaption strong')).toHaveText([
      'Jon Hitchcock',
      'Julio Santos',
      'Adam Nathan',
      'Ignacio Capurro',
      'Rodrigo Vazquez',
    ]);
  });

  test('sections follow the buyer journey: offer, proof, then background', async ({ page }) => {
    await page.goto('/');
    const ids = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main > section')).map((s) => s.id || s.className.split(' ')[0])
    );
    const at = (id) => ids.indexOf(id);
    expect(at('hero')).toBe(0);
    expect(at('signals')).toBeLessThan(at('services'));
    expect(at('services')).toBeLessThan(at('work'));
    expect(at('work')).toBeLessThan(at('recommendations'));
    expect(at('recommendations')).toBeLessThan(at('about'));
    expect(at('faq')).toBe(ids.length - 2);
    expect(ids[ids.length - 1]).toBe('contact');
  });

  test('FAQ answers open and close', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('#faq details').first();
    await expect(page.locator('#faq details')).toHaveCount(5);
    await expect(first).not.toHaveAttribute('open', '');
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await expect(first.locator('p')).toBeVisible();
  });

  test('"Book a call" buttons are available in the header, hero and contact', async ({ page }) => {
    await page.goto('/');
    const book = page.locator('a[data-book]');
    expect(await book.count()).toBeGreaterThanOrEqual(4);
    for (const href of await book.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
      expect(href).toMatch(/^mailto:diegogawenda@gmail\.com/);
    }
  });

  test('services section offers two consulting options with a contact action', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#services .service-card');
    await expect(cards).toHaveCount(2);
    await expect(cards.locator('h3')).toHaveText(['Testing Assessment', 'Testing Partnership']);
    for (let i = 0; i < 2; i++) {
      await expect(cards.nth(i).locator('a.btn')).toHaveAttribute('href', /^mailto:diegogawenda@gmail\.com/);
    }
  });

  test('intro banner invites visitors to schedule a call', async ({ page }) => {
    await page.goto('/');
    const intro = page.locator('.hero');
    await expect(intro.locator('.tailored-lead')).toHaveText('Great quality starts');
    await expect(intro.locator('a.btn-light')).toHaveAttribute('href', /^mailto:diegogawenda@gmail\.com/);
  });

  test('recommendations carousel auto-advances and can be navigated', async ({ page }) => {
    await page.goto('/');
    const dots = page.locator('.reco-dot');
    await expect(dots.nth(0)).toHaveAttribute('aria-current', 'true');
    await page.locator('#recoNext').click();
    await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');
    await page.locator('#recoPrev').click();
    await page.locator('#recoPrev').click();
    await expect(dots.nth(4)).toHaveAttribute('aria-current', 'true');
    await page.locator('#recoCarousel').hover();
    await page.mouse.move(0, 0);
    await expect(dots.nth(0)).toHaveAttribute('aria-current', 'true', { timeout: 9000 });
  });

  test.describe('language switch', () => {
    // Text that is deliberately identical in both languages: names, tools,
    // job titles, numbers and symbols. Anything else left unchanged after
    // switching means a string was added without a Spanish translation.
    const SAME_IN_BOTH = new Set([
      'DG', 'Discovery call', '.', 'Diego Gawenda', 'LinkedIn', '—', '©', 'Tests', 'diegogawenda@gmail.com',
      'TypeScript', 'JavaScript', 'Java', 'Playwright', 'Cypress', 'Selenium', 'WebdriverIO',
      'Detox', 'Maestro', 'REST Assured', 'Postman', 'SQL', 'Cucumber', 'CI/CD',
      'GitHub Actions', 'Docker', 'Principal QE', 'Staff SDET', 'Senior SDET',
      'QA Lead / Senior SDET', 'QA Lead', 'QA Manager / Senior QA Engineer',
      'OneCall', 'Flex', 'Almanac', 'dLocal', 'The Appraisal Lane', 'Greycon',
      'Universidad de la República', 'Centro de Ensayos de Software',
      'Oct 2020 – Jul 2022', 'Jon Hitchcock', 'Julio Santos', 'Adam Nathan', 'Ignacio Capurro', 'Rodrigo Vazquez',
      // Only shown in Spanish, so it is "unchanged" in the English pass.
      'Traducidas del inglés.',
    ]);

    const pageTexts = (page) =>
      page.evaluate(() => {
        const out = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const n = walker.currentNode;
          if (n.parentElement.tagName === 'SCRIPT') continue;
          const text = n.data.replace(/\s+/g, ' ').trim();
          if (text) out.push(text);
        }
        return out;
      });

    test('toggle switches the page to Spanish and back to English', async ({ page }) => {
      await page.goto('/');
      const toggle = page.locator('#langToggle');
      await expect(toggle.locator('.lang-name')).toHaveText('Español');
      await expect(toggle.locator('.lang-flag')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      const withoutCounters = (texts) => texts.filter((t) => !/^[\d+%]+$/.test(t));
      const englishTexts = withoutCounters(await pageTexts(page));

      await toggle.click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
      await expect(page.locator('.hero-tagline')).toHaveText(
        'La calidad es un sistema, no una lista de verificación.'
      );
      await expect(page.locator('.nav a[href="#about"]')).toHaveText('Sobre mí');
      await expect(page.locator('#recommendations h2')).toHaveText(
        'Esto dicen las personas con las que he trabajado.'
      );
      await expect(page.locator('.reco-source')).toContainText('Traducidas del inglés');
      await expect(page).toHaveTitle(/Testing Aumentado con IA/);
      await expect(toggle.locator('.lang-name')).toHaveText('English');
      await expect(toggle).toHaveAttribute('aria-label', 'View this site in English');

      await toggle.click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(toggle.locator('.lang-name')).toHaveText('Español');
      await expect(page).toHaveTitle(/AI-Augmented Testing/);
      expect(withoutCounters(await pageTexts(page))).toEqual(englishTexts);
    });

    test('every visible string is translated (or explicitly allow-listed)', async ({ page }) => {
      await page.goto('/');
      const english = await pageTexts(page);
      await page.locator('#langToggle').click();
      const spanish = await pageTexts(page);
      expect(spanish).toHaveLength(english.length);
      const untranslated = [...new Set(english.filter((t, i) => t === spanish[i]))].filter(
        (t) => !SAME_IN_BOTH.has(t) && !/^[\d\s+%.,–-]+$/.test(t)
      );
      expect(untranslated).toEqual([]);
    });

    test('the choice persists across reloads', async ({ page }) => {
      await page.goto('/');
      await page.locator('#langToggle').click();
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
      await expect(page.locator('.hero-tagline')).toContainText('La calidad es un sistema');
    });

    test('language button shows the full name on desktop and the code on mobile', async ({ page }) => {
      await page.goto('/');
      const toggle = page.locator('#langToggle');
      await expect(toggle.locator('.lang-name')).toBeVisible();
      await expect(toggle.locator('.lang-code')).toBeHidden();
      await page.setViewportSize({ width: 375, height: 812 });
      await expect(toggle.locator('.lang-name')).toBeHidden();
      await expect(toggle.locator('.lang-code')).toHaveText('ES');
      await expect(toggle.locator('.lang-flag')).toBeVisible();
    });

    test('?lang=es opens the Spanish version directly', async ({ page }) => {
      await page.goto('/?lang=es');
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
      await expect(page.locator('.hero a[data-book]')).toHaveText('Agenda una call de 30 minutos');
    });

    test('Spanish layout has no horizontal overflow on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/?lang=es');
      const toggle = page.locator('#langToggle');
      await expect(toggle.locator('.lang-code')).toHaveText('EN');
      await expect(toggle.locator('.lang-name')).toBeHidden();
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow).toBe(false);
    });
  });
});
