# Diego Gawenda Portfolio Test Plan

## Application Overview

https://diegogawenda.github.io/portfolio/ is a static one-page portfolio site for Diego Gawenda, a Staff QA Software Engineer. It presents a hero with a headshot and tagline, an animated impact-metrics band, four expertise cards, a live self-testing "QA Lab" panel that fetches real CI results from qa-results.json, a five-role experience timeline, three narrative case studies, an education section, a five-step process row, and a closing contact/CTA band. The site is plain HTML/CSS/JS deployed via GitHub Pages, with its own Playwright suite (tests/site.spec.js) already covering baseline functional checks. This plan extends coverage to full user journeys, responsive behavior, accessibility, and negative/edge-case scenarios.

## Test Scenarios

### 1. Page Load & Global Health

**Seed:** `tests/seed.spec.ts`

#### 1.1. Initial load renders core page shell
**File:** `tests/page-load/initial-load.spec.ts`

**Steps:**
  1. Navigate to https://diegogawenda.github.io/portfolio/
    - expect: HTTP response status is 200
    - expect: Page title is "Diego Gawenda — Staff QA Software Engineer"
    - expect: No console errors are logged (excluding the browser's implicit /favicon.ico probe)
  2. Inspect all network requests fired during load
    - expect: every request resolves with status < 400
    - expect: the declared SVG favicon (assets/favicon.svg) loads successfully
  3. Verify fonts and styles are applied
    - expect: css/style.css loads before first paint and the Inter / JetBrains Mono Google Fonts are applied to visible text

#### 1.2. Direct navigation to a section anchor loads pre-scrolled
**File:** `tests/page-load/deep-link-anchor.spec.ts`

**Steps:**
  1. Navigate directly to https://diegogawenda.github.io/portfolio/#qa-lab (not via in-page click)
    - expect: the QA Lab section (#qa-lab) is scrolled into view on initial load
    - expect: page title and meta description are unchanged regardless of anchor
  2. Repeat for #contact, #work, and #experience
    - expect: each target section is the one visible in the viewport immediately after load

### 2. Primary Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Desktop nav links scroll to matching sections
**File:** `tests/navigation/desktop-nav.spec.ts`

**Steps:**
  1. Set viewport to 1440x900 and load the homepage
    - expect: nav bar shows six links in order: About, Expertise, QA Lab, Experience, Work, Contact
  2. Click each nav link in order from About through Contact
    - expect: after each click, the URL hash matches the target section id and that section's heading is within the viewport
  3. Click the "DG." logo
    - expect: page scrolls back to the top of the hero (#top)

#### 2.2. Mobile nav hamburger opens, navigates, and closes
**File:** `tests/navigation/mobile-nav.spec.ts`

**Steps:**
  1. Set viewport to 390x844 and load the homepage
    - expect: the six text nav links are hidden; a hamburger toggle button is visible instead
  2. Click the hamburger button
    - expect: aria-expanded on the button becomes "true"
    - expect: the nav menu becomes visible with all six links stacked vertically
  3. Click a nav link (e.g. "Work")
    - expect: page scrolls to #work
    - expect: the menu closes automatically and aria-expanded returns to "false"
  4. Click the hamburger button again without selecting a link
    - expect: menu closes and aria-expanded returns to "false"

#### 2.3. Keyboard-only navigation reaches every nav link
**File:** `tests/navigation/keyboard-nav.spec.ts`

**Steps:**
  1. Load the homepage and press Tab repeatedly starting from page load
    - expect: a visible focus outline lands on the "DG." logo first, then each nav link in visual order
  2. Press Enter on a focused nav link
    - expect: same scroll-to-section behavior as a mouse click

### 3. Hero Section

**Seed:** `tests/seed.spec.ts`

#### 3.1. Hero renders identity and photo correctly
**File:** `tests/hero/hero-identity.spec.ts`

**Steps:**
  1. Load the homepage at 1440x900
    - expect: eyebrow text reads "Staff QA Software Engineer"
    - expect: h1 reads "Diego Gawenda"
    - expect: tagline reads "Quality is a system, not a checklist."
    - expect: the headshot image is visible, loads without error, and has non-empty alt text
  2. Inspect the photo container
    - expect: the photo renders as a circle with the face centered, not cropped at an odd position

#### 3.2. Hero call-to-action buttons behave correctly
**File:** `tests/hero/hero-cta-buttons.spec.ts`

**Steps:**
  1. Click "Get in touch"
    - expect: page scrolls to #contact
  2. Click "LinkedIn"
    - expect: a new tab opens to https://linkedin.com/in/diegogawenda
    - expect: the original tab remains on the portfolio
    - expect: the link has rel="noopener"
  3. Click "Download CV"
    - expect: a new tab opens loading assets/Diego-Gawenda-CV.pdf
    - expect: response status is 200 and content-type is application/pdf

#### 3.3. Hero layout holds at extreme viewport widths
**File:** `tests/hero/hero-extreme-viewports.spec.ts`

**Steps:**
  1. Set viewport to 320x568 (smallest common mobile)
    - expect: no horizontal scrollbar appears
    - expect: photo and name remain on the same row without text overlapping the photo
  2. Set viewport to 2560x1440 (large desktop)
    - expect: hero content stays capped at its max-width and remains left-aligned rather than stretching full-bleed

### 4. Impact Metrics

**Seed:** `tests/seed.spec.ts`

#### 4.1. Metric counters animate to correct target values on scroll
**File:** `tests/metrics/counter-animation.spec.ts`

**Steps:**
  1. Load the homepage keeping the metrics band out of the initial viewport
    - expect: all five metric values render at their initial/zero state before scrolling
  2. Scroll the metrics band into view
    - expect: each value animates upward and settles on 15+, 75%, 80%, 50%, 12
    - expect: animation completes within roughly one second

#### 4.2. Counters do not re-animate on repeated scroll in and out
**File:** `tests/metrics/counter-no-retrigger.spec.ts`

**Steps:**
  1. Scroll the metrics band into view and let the animation finish
    - expect: values settle on 15+, 75%, 80%, 50%, 12
  2. Scroll away from the band, then scroll back into view
    - expect: values remain static at their final numbers and the count-up animation does not restart

### 5. Expertise Section

**Seed:** `tests/seed.spec.ts`

#### 5.1. All four expertise cards render complete content
**File:** `tests/expertise/expertise-cards.spec.ts`

**Steps:**
  1. Scroll to #expertise
    - expect: exactly four cards are present, numbered 01–04: "Test Strategy & Leadership", "Automation Engineering", "API, Data & Contracts", "Delivery & Quality Gates"
    - expect: each card has a description paragraph and a non-empty list of tag chips
  2. Spot-check tag counts against current content
    - expect: "Test Strategy & Leadership" lists 8 tags
    - expect: "Automation Engineering" lists 9 tags

### 6. QA Lab (Live Self-Test Panel)

**Seed:** `tests/seed.spec.ts`

#### 6.1. QA Lab loads and displays live CI results
**File:** `tests/qa-lab/live-results.spec.ts`

**Steps:**
  1. Scroll to #qa-lab and wait for the qa-results.json fetch to resolve
    - expect: "Tests", "Browsers", and "Pass rate" stats are populated with real values, not placeholder dashes
    - expect: the test name list is non-empty and each entry is prefixed with a pass/fail indicator consistent with the reported pass rate
    - expect: "Last run" shows a valid, recent timestamp
  2. Click "View full report ↗"
    - expect: navigates to qa-report/index.html and the real Playwright HTML report loads (title "Playwright Test Report")
  3. Click "View suite on GitHub ↗"
    - expect: opens https://github.com/diegogawenda/portfolio/blob/main/tests/site.spec.js in a new tab

#### 6.2. QA Lab degrades gracefully when qa-results.json is unavailable
**File:** `tests/qa-lab/results-fetch-failure.spec.ts`

**Steps:**
  1. Intercept the request to qa-results.json to force a 404, then load the page
    - expect: stats show placeholder dashes instead of throwing a JS error or breaking the layout
    - expect: the test list shows the fallback message "Results publish after the first CI run on GitHub Actions."
    - expect: no uncaught JS errors appear in the console as a result of the failed fetch

#### 6.3. QA Lab reflects a run containing failing tests
**File:** `tests/qa-lab/failing-run-display.spec.ts`

**Steps:**
  1. Mock the qa-results.json response with failed > 0 (e.g. passRate 80, failed 4)
    - expect: the pass rate stat reflects the mocked percentage exactly
    - expect: failing test entries are visually distinguished from passing ones

### 7. How I Work

**Seed:** `tests/seed.spec.ts`

#### 7.1. Three pillars render
**File:** `tests/how-i-work/pillars.spec.ts`

**Steps:**
  1. Scroll to the "How I work" section
    - expect: exactly three cards render — "Strategy", "Execution", "Scaling" — each with a heading and one paragraph of body copy

### 8. Experience Timeline

**Seed:** `tests/seed.spec.ts`

#### 8.1. All five roles render in reverse-chronological order
**File:** `tests/experience/timeline-order.spec.ts`

**Steps:**
  1. Scroll to #experience
    - expect: five entries appear in this order: Flex (Feb 2024–Present), Almanac (Jul 2022–Dec 2023), dLocal (Oct 2020–Jul 2022), The Appraisal Lane (Jun 2016–Aug 2020), Greycon (Aug 2007–Jun 2016)
    - expect: each entry shows role, company, date range, and at least two bullet achievements
  2. Verify date ranges are in strictly descending order
    - expect: each entry's end date is on or after the following entry's end date

### 9. Selected Work / Case Studies

**Seed:** `tests/seed.spec.ts`

#### 9.1. Three case studies each present challenge, approach, and outcome
**File:** `tests/work/case-studies.spec.ts`

**Steps:**
  1. Scroll to #work
    - expect: exactly three case study cards render, for Flex, Almanac, and dLocal
    - expect: each card contains a "Case study — {Company}" tag, a title, a Challenge paragraph, an Approach paragraph, an Outcome paragraph, and a highlighted metric line
  2. Cross-check outcome metrics against the Experience section
    - expect: metrics quoted in each case study match the corresponding bullet in the Experience timeline for the same company

### 10. Education & Languages

**Seed:** `tests/seed.spec.ts`

#### 10.1. Education and languages render correctly
**File:** `tests/education/education-languages.spec.ts`

**Steps:**
  1. Scroll to the Education section
    - expect: two education cards render: "Software Engineering — Universidad de la República" and "Software Testing Leader — Centro de Ensayos de Software"
    - expect: a Languages line lists exactly four languages: Spanish (native), English (professional working proficiency), Portuguese, German

### 11. Process Section

**Seed:** `tests/seed.spec.ts`

#### 11.1. Five-step process renders in order
**File:** `tests/process/process-steps.spec.ts`

**Steps:**
  1. Scroll to the "How quality moves" section
    - expect: five steps render in order 01–05: Discover, Define, Automate, Monitor, Improve, each with a one-line description

### 12. Contact / CTA

**Seed:** `tests/seed.spec.ts`

#### 12.1. Contact links work and content is correct
**File:** `tests/contact/contact-links.spec.ts`

**Steps:**
  1. Scroll to #contact
    - expect: headline reads "Let's fix your testing problem — for good."
    - expect: subtext reads "From flaky test suites to shift-left strategy, I help teams ship faster with fewer surprises."
  2. Inspect the email button
    - expect: href is exactly "mailto:diegogawenda@gmail.com" with no malformed encoding or extra parameters
  3. Click "LinkedIn"
    - expect: opens https://linkedin.com/in/diegogawenda in a new tab with rel="noopener"
  4. Verify the closing quote
    - expect: the italicized quote "Quality is not the last step. It's part of how you build." is visible

### 13. Footer

**Seed:** `tests/seed.spec.ts`

#### 13.1. Footer renders dynamic year and source link
**File:** `tests/footer/footer-content.spec.ts`

**Steps:**
  1. Scroll to the footer
    - expect: copyright year equals the current year, set dynamically via JS
    - expect: "source on GitHub" link points to https://github.com/diegogawenda/portfolio and opens in a new tab

### 14. Responsive & Cross-Viewport Behavior

**Seed:** `tests/seed.spec.ts`

#### 14.1. No horizontal overflow at common breakpoints
**File:** `tests/responsive/no-overflow.spec.ts`

**Steps:**
  1. Load the homepage at 320, 375, 390, 768, 1024, 1440, and 1920px widths
    - expect: document scrollWidth never exceeds clientWidth at any width (no horizontal scrollbar)
  2. Check the 900px breakpoint boundary specifically at 899px and 901px
    - expect: grid/card layouts (expertise, case studies, education, process) switch cleanly between column counts without visual overlap

#### 14.2. Multi-column grids reflow correctly
**File:** `tests/responsive/grid-reflow.spec.ts`

**Steps:**
  1. At widths of 901px or more, inspect the expertise, case-study, and how-I-work grids
    - expect: expertise renders as a 2-column grid; case studies and how-I-work render as 3-column; no card is clipped or overlapping
  2. At widths of 900px or less, inspect the same grids
    - expect: all collapse to a single column and content order still matches source/reading order

### 15. Accessibility

**Seed:** `tests/seed.spec.ts`

#### 15.1. Images and interactive elements meet baseline a11y requirements
**File:** `tests/accessibility/baseline-a11y.spec.ts`

**Steps:**
  1. Query all img elements on the page
    - expect: every image has non-empty alt text
  2. Query all a[target="_blank"] elements
    - expect: every one also has rel="noopener" (or "noopener noreferrer")
  3. Run an automated accessibility scan (e.g. axe-core) against the full page
    - expect: zero critical or serious violations (color contrast, landmark regions, heading order)
  4. Verify heading hierarchy
    - expect: exactly one h1 ("Diego Gawenda"); all section titles are h2; card/timeline titles are h3; process steps are h4; no level is skipped

#### 15.2. Reduced-motion preference is respected
**File:** `tests/accessibility/reduced-motion.spec.ts`

**Steps:**
  1. Emulate prefers-reduced-motion: reduce and reload the page, then scroll the metrics band into view
    - expect: metric counters either skip the count-up animation and display final values immediately, or animate with a significantly reduced duration — flag as a known gap if the current implementation ignores this media query

### 16. Negative & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 16.1. Broken or slow network handling
**File:** `tests/edge-cases/slow-network.spec.ts`

**Steps:**
  1. Throttle the network to a slow 3G profile and reload
    - expect: page text remains readable before fonts and images finish loading; no layout shift breaks readability
  2. Block the request for assets/headshot.jpg and reload
    - expect: the alt text "Portrait of Diego Gawenda" is shown in place of the image rather than a blank broken-image icon with no fallback

#### 16.2. JavaScript disabled
**File:** `tests/edge-cases/no-javascript.spec.ts`

**Steps:**
  1. Disable JavaScript execution and load the page
    - expect: static content (text, links, images) still renders since the page is server-rendered HTML
    - expect: the mobile nav toggle and the QA Lab panel simply do nothing rather than throwing errors, since no JS runs at all — this is expected degradation, not a defect

#### 16.3. Invalid or unknown URL paths
**File:** `tests/edge-cases/unknown-path.spec.ts`

**Steps:**
  1. Navigate to https://diegogawenda.github.io/portfolio/does-not-exist
    - expect: GitHub Pages returns its standard 404 page rather than a broken blank page
