# Diego Gawenda Portfolio Test Plan

## Application Overview

https://diegogawenda.github.io/portfolio/ is a static one-page portfolio site for Diego Gawenda, a Staff QA Software Engineer. It presents a hero with a headshot and tagline, an animated impact-metrics band, four expertise cards, a live self-testing "QA Lab" panel that fetches real CI results from qa-results.json, a five-role experience timeline, three narrative case studies, an education section, a five-step process row, and a closing contact/CTA band. The site is plain HTML/CSS/JS deployed via GitHub Pages, with its own Playwright suite (tests/site.spec.js) already covering baseline functional checks. This plan extends coverage to full user journeys, responsive behavior, accessibility, and negative/edge-case scenarios.

Test cases are written in Given/When/Then (BDD) form.

## Test Scenarios

### 1. Page Load & Global Health

**Seed:** `tests/seed.spec.ts`

#### 1.1. Initial load renders core page shell
**File:** `tests/page-load/initial-load.spec.ts`

```gherkin
Given a fresh browser session
When the user navigates to https://diegogawenda.github.io/portfolio/
Then the HTTP response status is 200
And the page title is "Diego Gawenda — Staff QA Software Engineer"
And no console errors are logged, excluding the browser's implicit /favicon.ico probe
When all network requests fired during load are inspected
Then every request resolves with a status below 400
And the declared SVG favicon (assets/favicon.svg) loads successfully
When the loaded fonts and styles are inspected
Then css/style.css has loaded before first paint
And the Inter and JetBrains Mono Google Fonts are applied to visible text
```

#### 1.2. Direct navigation to a section anchor loads pre-scrolled
**File:** `tests/page-load/deep-link-anchor.spec.ts`

```gherkin
Given a fresh browser session
When the user navigates directly to https://diegogawenda.github.io/portfolio/#qa-lab
Then the QA Lab section (#qa-lab) is scrolled into view on initial load
And the page title and meta description are unchanged regardless of anchor
When the user navigates directly to a URL ending in #contact, #work, or #experience
Then the matching target section is the one visible in the viewport immediately after load
```

### 2. Primary Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Desktop nav links scroll to matching sections
**File:** `tests/navigation/desktop-nav.spec.ts`

```gherkin
Given the viewport is set to 1440x900
And the homepage has loaded
Then the nav bar shows six links in order: About, Expertise, QA Lab, Experience, Work, Contact
When the user clicks each nav link in order from About through Contact
Then after each click the URL hash matches the target section id
And that section's heading is within the viewport
When the user clicks the "DG." logo
Then the page scrolls back to the top of the hero (#top)
```

#### 2.2. Mobile nav hamburger opens, navigates, and closes
**File:** `tests/navigation/mobile-nav.spec.ts`

```gherkin
Given the viewport is set to 390x844
And the homepage has loaded
Then the six text nav links are hidden
And a hamburger toggle button is visible instead
When the user clicks the hamburger button
Then aria-expanded on the button becomes "true"
And the nav menu becomes visible with all six links stacked vertically
When the user clicks a nav link, for example "Work"
Then the page scrolls to #work
And the menu closes automatically
And aria-expanded returns to "false"
When the user clicks the hamburger button again without selecting a link
Then the menu closes
And aria-expanded returns to "false"
```

#### 2.3. Keyboard-only navigation reaches every nav link
**File:** `tests/navigation/keyboard-nav.spec.ts`

```gherkin
Given the homepage has loaded
When the user presses Tab repeatedly starting from page load
Then a visible focus outline lands on the "DG." logo first, then each nav link in visual order
When the user presses Enter on a focused nav link
Then the same scroll-to-section behavior occurs as a mouse click
```

### 3. Hero Section

**Seed:** `tests/seed.spec.ts`

#### 3.1. Hero renders identity and photo correctly
**File:** `tests/hero/hero-identity.spec.ts`

```gherkin
Given the viewport is set to 1440x900
When the homepage loads
Then the eyebrow text reads "Staff QA Software Engineer"
And the h1 reads "Diego Gawenda"
And the tagline reads "Quality is a system, not a checklist."
And the headshot image is visible, loads without error, and has non-empty alt text
When the photo container is inspected
Then the photo renders as a circle with the face centered, not cropped at an odd position
```

#### 3.2. Hero call-to-action buttons behave correctly
**File:** `tests/hero/hero-cta-buttons.spec.ts`

```gherkin
Given the homepage has loaded
When the user clicks "Get in touch"
Then the page scrolls to #contact
When the user clicks "LinkedIn"
Then a new tab opens to https://linkedin.com/in/diegogawenda
And the original tab remains on the portfolio
And the link has rel="noopener"
When the user clicks "Download CV"
Then a new tab opens loading assets/Diego-Gawenda-CV.pdf
And the response status is 200 with content-type application/pdf
```

#### 3.3. Hero layout holds at extreme viewport widths
**File:** `tests/hero/hero-extreme-viewports.spec.ts`

```gherkin
Given the viewport is set to 320x568, the smallest common mobile width
When the homepage loads
Then no horizontal scrollbar appears
And the photo and name remain on the same row without text overlapping the photo
Given the viewport is set to 2560x1440, a large desktop width
When the homepage loads
Then the hero content stays capped at its max-width
And the hero content remains left-aligned rather than stretching full-bleed
```

### 4. Impact Metrics

**Seed:** `tests/seed.spec.ts`

#### 4.1. Metric counters animate to correct target values on scroll
**File:** `tests/metrics/counter-animation.spec.ts`

```gherkin
Given the homepage has loaded
And the metrics band is outside the initial viewport
Then all five metric values render at their initial/zero state
When the user scrolls the metrics band into view
Then each value animates upward and settles on 15+, 75%, 80%, 50%, 12
And the animation completes within roughly one second
```

#### 4.2. Counters do not re-animate on repeated scroll in and out
**File:** `tests/metrics/counter-no-retrigger.spec.ts`

```gherkin
Given the metrics band has been scrolled into view once
And its count-up animation has finished, settling on 15+, 75%, 80%, 50%, 12
When the user scrolls away from the band and then scrolls back into view
Then the values remain static at their final numbers
And the count-up animation does not restart
```

### 5. Expertise Section

**Seed:** `tests/seed.spec.ts`

#### 5.1. All four expertise cards render complete content
**File:** `tests/expertise/expertise-cards.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to #expertise
Then exactly four cards are present, numbered 01–04: "Test Strategy & Leadership", "Automation Engineering", "API, Data & Contracts", "Delivery & Quality Gates"
And each card has a description paragraph and a non-empty list of tag chips
When the tag counts are checked against current content
Then "Test Strategy & Leadership" lists 8 tags
And "Automation Engineering" lists 9 tags
```

### 6. QA Lab (Live Self-Test Panel)

**Seed:** `tests/seed.spec.ts`

#### 6.1. QA Lab loads and displays live CI results
**File:** `tests/qa-lab/live-results.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to #qa-lab and the qa-results.json fetch resolves
Then the "Tests", "Browsers", and "Pass rate" stats are populated with real values, not placeholder dashes
And the test name list is non-empty, with each entry prefixed by a pass/fail indicator consistent with the reported pass rate
And "Last run" shows a valid, recent timestamp
When the user clicks "View full report ↗"
Then the browser navigates to qa-report/index.html
And the real Playwright HTML report loads, titled "Playwright Test Report"
When the user clicks "View suite on GitHub ↗"
Then a new tab opens to https://github.com/diegogawenda/portfolio/blob/main/tests/site.spec.js
```

#### 6.2. QA Lab degrades gracefully when qa-results.json is unavailable
**File:** `tests/qa-lab/results-fetch-failure.spec.ts`

```gherkin
Given the request to qa-results.json is intercepted and forced to return a 404
When the page loads
Then the stats show placeholder dashes instead of throwing a JS error or breaking the layout
And the test list shows the fallback message "Results publish after the first CI run on GitHub Actions."
And no uncaught JS errors appear in the console as a result of the failed fetch
```

#### 6.3. QA Lab reflects a run containing failing tests
**File:** `tests/qa-lab/failing-run-display.spec.ts`

```gherkin
Given the qa-results.json response is mocked with failed > 0, for example passRate 80 and failed 4
When the user views the QA Lab panel
Then the pass rate stat reflects the mocked percentage exactly
And failing test entries are visually distinguished from passing ones
```

### 7. How I Work

**Seed:** `tests/seed.spec.ts`

#### 7.1. Three pillars render
**File:** `tests/how-i-work/pillars.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to the "How I work" section
Then exactly three cards render — "Strategy", "Execution", "Scaling" — each with a heading and one paragraph of body copy
```

### 8. Experience Timeline

**Seed:** `tests/seed.spec.ts`

#### 8.1. All five roles render in reverse-chronological order
**File:** `tests/experience/timeline-order.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to #experience
Then five entries appear in this order: Flex (Feb 2024–Present), Almanac (Jul 2022–Dec 2023), dLocal (Oct 2020–Jul 2022), The Appraisal Lane (Jun 2016–Aug 2020), Greycon (Aug 2007–Jun 2016)
And each entry shows role, company, date range, and at least two bullet achievements
When the date ranges are checked in sequence
Then each entry's end date is on or after the following entry's end date
```

### 9. Selected Work / Case Studies

**Seed:** `tests/seed.spec.ts`

#### 9.1. Three case studies each present challenge, approach, and outcome
**File:** `tests/work/case-studies.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to #work
Then exactly three case study cards render, for Flex, Almanac, and dLocal
And each card contains a "Case study — {Company}" tag, a title, a Challenge paragraph, an Approach paragraph, an Outcome paragraph, and a highlighted metric line
When the outcome metrics are cross-checked against the Experience section
Then the metrics quoted in each case study match the corresponding bullet in the Experience timeline for the same company
```

### 10. Education & Languages

**Seed:** `tests/seed.spec.ts`

#### 10.1. Education and languages render correctly
**File:** `tests/education/education-languages.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to the Education section
Then two education cards render: "Software Engineering — Universidad de la República" and "Software Testing Leader — Centro de Ensayos de Software"
And a Languages line lists exactly four languages: Spanish (native), English (professional working proficiency), Portuguese, German
```

### 11. Process Section

**Seed:** `tests/seed.spec.ts`

#### 11.1. Five-step process renders in order
**File:** `tests/process/process-steps.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to the "How quality moves" section
Then five steps render in order 01–05: Discover, Define, Automate, Monitor, Improve, each with a one-line description
```

### 12. Contact / CTA

**Seed:** `tests/seed.spec.ts`

#### 12.1. Contact links work and content is correct
**File:** `tests/contact/contact-links.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to #contact
Then the headline reads "Let's fix your testing problem — for good."
And the subtext reads "From flaky test suites to shift-left strategy, I help teams ship faster with fewer surprises."
When the email button's href is inspected
Then it is exactly "mailto:diegogawenda@gmail.com" with no malformed encoding or extra parameters
When the user clicks "LinkedIn"
Then a new tab opens to https://linkedin.com/in/diegogawenda with rel="noopener"
Then the italicized quote "Quality is not the last step. It's part of how you build." is visible
```

### 13. Footer

**Seed:** `tests/seed.spec.ts`

#### 13.1. Footer renders dynamic year and source link
**File:** `tests/footer/footer-content.spec.ts`

```gherkin
Given the homepage has loaded
When the user scrolls to the footer
Then the copyright year equals the current year, set dynamically via JS
And the "source on GitHub" link points to https://github.com/diegogawenda/portfolio and opens in a new tab
```

### 14. Responsive & Cross-Viewport Behavior

**Seed:** `tests/seed.spec.ts`

#### 14.1. No horizontal overflow at common breakpoints
**File:** `tests/responsive/no-overflow.spec.ts`

```gherkin
Given the homepage is loaded at 320, 375, 390, 768, 1024, 1440, and 1920px widths in turn
Then the document's scrollWidth never exceeds clientWidth at any width, meaning no horizontal scrollbar appears
Given the viewport is set to 899px and then 901px, either side of the layout breakpoint
Then the expertise, case-study, education, and process grid layouts switch cleanly between column counts without visual overlap
```

#### 14.2. Multi-column grids reflow correctly
**File:** `tests/responsive/grid-reflow.spec.ts`

```gherkin
Given the viewport width is 901px or more
When the expertise, case-study, and how-I-work grids are inspected
Then expertise renders as a 2-column grid
And case studies and how-I-work render as 3-column grids
And no card is clipped or overlapping
Given the viewport width is 900px or less
When the same grids are inspected
Then all of them collapse to a single column
And the content order still matches source/reading order
```

### 15. Accessibility

**Seed:** `tests/seed.spec.ts`

#### 15.1. Images and interactive elements meet baseline a11y requirements
**File:** `tests/accessibility/baseline-a11y.spec.ts`

```gherkin
Given the homepage has loaded
When all img elements on the page are queried
Then every image has non-empty alt text
When all a[target="_blank"] elements are queried
Then every one also has rel="noopener" or "noopener noreferrer"
When an automated accessibility scan, such as axe-core, is run against the full page
Then there are zero critical or serious violations for color contrast, landmark regions, and heading order
When the heading hierarchy is inspected
Then exactly one h1 exists, reading "Diego Gawenda"
And all section titles are h2, card/timeline titles are h3, and process steps are h4, with no level skipped
```

#### 15.2. Reduced-motion preference is respected
**File:** `tests/accessibility/reduced-motion.spec.ts`

```gherkin
Given the browser emulates prefers-reduced-motion: reduce
When the page reloads and the metrics band is scrolled into view
Then the metric counters either skip the count-up animation and display final values immediately, or animate with a significantly reduced duration
Note: flag as a known gap if the current implementation ignores this media query
```

### 16. Negative & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 16.1. Broken or slow network handling
**File:** `tests/edge-cases/slow-network.spec.ts`

```gherkin
Given the network is throttled to a slow 3G profile
When the page reloads
Then the page text remains readable before fonts and images finish loading
And no layout shift breaks readability
Given the request for assets/headshot.jpg is blocked
When the page reloads
Then the alt text "Portrait of Diego Gawenda" is shown in place of the image rather than a blank broken-image icon with no fallback
```

#### 16.2. JavaScript disabled
**File:** `tests/edge-cases/no-javascript.spec.ts`

```gherkin
Given JavaScript execution is disabled in the browser
When the page loads
Then the static content — text, links, and images — still renders, since the page is server-rendered HTML
And the mobile nav toggle and the QA Lab panel simply do nothing rather than throwing errors, since no JS runs at all
Note: this is expected degradation, not a defect
```

#### 16.3. Invalid or unknown URL paths
**File:** `tests/edge-cases/unknown-path.spec.ts`

```gherkin
Given a URL path that does not exist on the site
When the user navigates to https://diegogawenda.github.io/portfolio/does-not-exist
Then GitHub Pages returns its standard 404 page rather than a broken blank page
```
