const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, '..', 'qa-results-raw.json');
const outPath = path.join(__dirname, '..', 'qa-results.json');

const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

const browsers = new Set();
const tests = [];
let passed = 0;
let failed = 0;

function walk(suite) {
  for (const spec of suite.specs || []) {
    for (const t of spec.tests || []) {
      browsers.add(t.projectName);
      const ok = t.results.every((r) => r.status === 'passed');
      if (ok) passed++;
      else failed++;
      tests.push({ title: spec.title, project: t.projectName, passed: ok });
    }
  }
  for (const child of suite.suites || []) walk(child);
}

for (const s of raw.suites || []) walk(s);

// A title can run under multiple browser projects; it only counts as passed
// overall if every project run for that title passed.
const byTitle = new Map();
for (const t of tests) {
  byTitle.set(t.title, (byTitle.get(t.title) ?? true) && t.passed);
}
const testList = [...byTitle.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([title, ok]) => ({ title, passed: ok }));

const summary = {
  generatedAt: new Date().toISOString(),
  totalTests: passed + failed,
  passed,
  failed,
  browsers: [...browsers].sort(),
  passRate: passed + failed === 0 ? 0 : Math.round((passed / (passed + failed)) * 100),
  tests: testList,
};

fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
console.log(`QA summary written: ${summary.totalTests} tests, ${summary.passRate}% pass rate`);
