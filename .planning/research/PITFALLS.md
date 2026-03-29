# Domain Pitfalls: Animation-Heavy Clinical Portfolio

**Domain:** Personal Portfolio Website (Static, Animation-Heavy, Themed)
**Researched:** 2026-03-29

## Critical Pitfalls

Mistakes that cause rewrites, poor professional impressions, or major accessibility issues.

### Pitfall 1: Waveform Animation Performance Destruction
**What goes wrong:** Continuous waveform animations (SVG/CSS/Canvas) consume excessive CPU/GPU, draining battery and making scrolling janky.
**Why it happens:** Animating complex SVG paths via JavaScript on every frame (`requestAnimationFrame`) or using unoptimized CSS filters.
**Consequences:** The site feels broken or slow on older devices and laptops unplugged from power. Visitors leave due to poor UX, directly contradicting the "high-performance engineer" persona.
**Prevention:** 
- Use WebGL/Canvas for complex particle/waveform animations instead of SVG manipulation if high node count.
- Pause animations when the element is not in the viewport using `IntersectionObserver`.
- Respect `prefers-reduced-motion` CSS media queries.
**Detection:** High CPU usage in Chrome DevTools Performance tab; laggy scrolling.
**Phase to Address:** Phase 2 (Core UI & Theming) & Phase 3 (Animations)

### Pitfall 2: Dark/Light Mode FOUC (Flash of Unstyled Content)
**What goes wrong:** When loading the page, the user sees a blinding white screen for a split second before the dark mode preference kicks in, or the "terminal" theme flashes generic styles first.
**Why it happens:** The dark mode preference is checked via JavaScript *after* the initial HTML/CSS has rendered, or hydration mismatches occur in SSG frameworks (like Next.js/Astro) when rendering static HTML.
**Consequences:** Jarring user experience, looks unpolished and amateurish.
**Prevention:** 
- Inject a blocking `<script>` tag in the `<head>` to check `localStorage` and `matchMedia` before the `<body>` renders.
- If using an SSG framework, ensure theme toggles are built to handle hydration correctly (e.g., `next-themes`).
**Detection:** Refreshing the page in dark mode shows a flash of white.
**Phase to Address:** Phase 2 (Core UI & Theming)

### Pitfall 3: Terminal/EHR Aesthetic Accessibility Failures
**What goes wrong:** The "clinical data" and "terminal" themes look cool but are completely illegible.
**Why it happens:** Using monospace fonts for long paragraphs, low-contrast neon colors on dark backgrounds (e.g., classic terminal green on black), or tiny "EHR-style" text.
**Consequences:** Recruiters and hiring managers cannot easily read the resume or project details, failing the primary goal of the site.
**Prevention:**
- Restrict monospace/terminal fonts to headings, code blocks, and the hero typing animation. Use a clean, readable sans-serif (e.g., Inter, Roboto) for body text.
- Verify contrast ratios meet WCAG AA standards (4.5:1 for normal text).
**Detection:** Lighthouse accessibility score < 90; visual squint test.
**Phase to Address:** Phase 2 (Core UI & Theming)

## Moderate Pitfalls

### Pitfall 4: Mobile Layout Breakage on "Dense" UI
**What goes wrong:** The clinical EHR-inspired UI or complex pipeline diagrams (like the BeatProfiler case study) require horizontal space and break completely on mobile.
**Prevention:** 
- Design mobile-first. For complex diagrams (BeatProfiler pipeline), provide a simplified stacked version for mobile or allow horizontal scrolling with clear visual cues.
- Don't force multi-column clinical dashboards onto small screens; serialize the data vertically.
**Phase to Address:** Phase 4 (Content & Layout)

### Pitfall 5: Broken Typing Animation SEO/Accessibility
**What goes wrong:** The terminal typing effect hides the actual text from screen readers and search engines until the JavaScript executes.
**Prevention:** 
- Put the full text in the HTML natively (for SEO and screen readers).
- Use CSS or JS to visually hide and reveal the text progressively, rather than injecting it character by character into an empty `div`.
**Phase to Address:** Phase 3 (Animations & Interactions)

## Minor Pitfalls

### Pitfall 6: Intrusive Easter Eggs
**What goes wrong:** Hobby easter eggs (choir, biking) overlap with clickable UI elements or trigger accidentally on mobile tap.
**Prevention:** Ensure interactive easter eggs are contained within specific non-critical bounding boxes and require explicit actions (like a specific hover pattern or clicking an obvious icon) rather than hijacking scroll or standard clicks.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Initialization | Choosing a heavy SPA framework for a simple static site | Use Astro, Next.js (SSG), or vanilla HTML/Vite for lightweight, fast GitHub Pages deployment. |
| Theming | Dark/Light mode FOUC | Inline blocking script in `<head>` to set theme class before body render. |
| Animations | Waveform draining CPU | `IntersectionObserver` to pause off-screen animations. |
| Content | Unreadable terminal text | Limit monospace to headers/accents; use high-contrast text. |

## Sources

- [GitHub Pages Deployment Best Practices](https://docs.github.com/en/pages)
- [Web Vitals & Performance (CLS, FCP)](https://web.dev/vitals/)
- [WCAG Accessibility Guidelines for Contrast and Motion](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)