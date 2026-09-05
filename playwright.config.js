const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // This is the pre-deploy gate: it runs against the local build via the
  // webServer below, before that build goes live. Everything else under
  // tests/ (the planner/generator seed file, and the feature-area folders
  // generated from test-artifacts/*.plan.md) targets the live production
  // URL directly instead, so it can only run post-deploy — see
  // playwright.ci-full.config.js and .github/workflows/deploy.yml, which
  // merges both runs' blob reports into the QA Lab panel's combined count.
  testMatch: 'site.spec.js',
  fullyParallel: true,
  reporter: [
    ['blob', { outputDir: 'blob-report-site' }],
    ['html', { outputFolder: 'qa-report', open: 'never' }],
    ['json', { outputFile: 'qa-results-raw.json' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.SITE_URL || 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  webServer: process.env.SITE_URL
    ? undefined
    : {
        command: 'python3 -m http.server 4173',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
