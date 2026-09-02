const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
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
