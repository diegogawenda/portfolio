const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // The public QA Lab panel only reports this one suite. Everything else
  // under tests/ (the planner/generator seed file, and the feature-area
  // folders generated from test-artifacts/*.plan.md) targets the live
  // production URL directly and is a separate, manually-run regression
  // suite — it must not leak into this pre-deploy, localhost-targeted run.
  testMatch: 'site.spec.js',
  fullyParallel: true,
  reporter: [
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
  ],
});
