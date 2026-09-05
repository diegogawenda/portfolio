// Runs the full regression suite generated from
// test-artifacts/portfolio.plan.md against the live production site
// (every spec here hardcodes the production URL) as a second, post-scope
// pass alongside playwright.config.js's pre-deploy site.spec.js run. Their
// blob reports get merged into one combined qa-results.json/qa-report —
// see .github/workflows/deploy.yml.
//
// Chromium only: this suite (network mocking, JS-disabled contexts, an
// axe-core scan) has only ever been developed and verified on chromium: see
// playwright.agents.config.js, the config used for the playwright-cli
// generation sessions. Running it on webkit here for the first time, with
// no local verification, would risk introducing untested cross-browser
// flakiness into the deploy pipeline.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testIgnore: ['**/seed.spec.ts', '**/site.spec.js'],
  fullyParallel: true,
  reporter: [['blob', { outputDir: 'blob-report-full' }], ['list']],
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
