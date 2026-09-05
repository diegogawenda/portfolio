// Used only by `npx playwright merge-reports` in .github/workflows/deploy.yml
// to combine playwright.config.js's pre-deploy blob report (site.spec.js,
// against the local build) with playwright.ci-full.config.js's post-deploy
// one (the full plan-derived suite, against production) into a single
// qa-report/ and qa-results-raw.json for scripts/generate-qa-summary.js.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [
    ['html', { outputFolder: 'qa-report', open: 'never' }],
    ['json', { outputFile: 'qa-results-raw.json' }],
  ],
});
