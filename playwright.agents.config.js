// Config used by the Playwright planner/generator/healer agents for
// interactive `--debug=cli` sessions. Unlike playwright.config.js (which
// powers the live site's public QA Lab report and excludes seed.spec.ts so
// it doesn't pollute that count), this config keeps the seed test and runs
// a single browser, matching the plan/generate/heal workflow.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: process.env.SITE_URL || 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  webServer: process.env.SITE_URL
    ? undefined
    : {
        command: 'python3 -m http.server 4173',
        url: 'http://localhost:4173',
        reuseExistingServer: true,
      },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
