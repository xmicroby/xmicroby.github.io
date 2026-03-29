# Requirements: Youngbin Kim Portfolio Website

**Defined:** 2025-03-29
**Core Value:** Visitors immediately understand who Youngbin is professionally and walk away remembering a site that felt distinctly personal — not a generic template.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Layout & Navigation

- [ ] **LAYOUT-01**: Site is fully responsive across mobile, tablet, and desktop viewports
- [ ] **LAYOUT-02**: User can navigate between sections via clear anchor links with smooth scrolling
- [ ] **LAYOUT-03**: Header/nav remains accessible (sticky or scroll-to-top) on all pages
- [ ] **LAYOUT-04**: Sections have scroll-triggered entrance transitions

### Hero

- [ ] **HERO-01**: Hero displays name "Youngbin Kim" and title "LLM Engineer / Data Scientist (Clinical AI)"
- [ ] **HERO-02**: Terminal-style typing animation reveals professional identity on page load
- [ ] **HERO-03**: Animated waveform background element in hero section
- [ ] **HERO-04**: Hero includes a call-to-action to scroll down or view work
- [ ] **HERO-05**: Terminal typing content is accessible to screen readers and search engines (CSS animation, not DOM injection)

### About

- [ ] **ABOUT-01**: Professional background summary covering current role at NYP, Columbia PhD, and expertise areas
- [ ] **ABOUT-02**: Personality woven into professional narrative (hobbies mentioned naturally, not as a separate section)
- [ ] **ABOUT-03**: Clinical data aesthetic typography (EHR-inspired fonts/spacing) applied to about section

### Projects

- [ ] **PROJ-01**: BeatProfiler presented as a deep-dive case study (not just a card)
- [ ] **PROJ-02**: Case study includes pipeline/workflow diagram showing how BeatProfiler works
- [ ] **PROJ-03**: Cardiac waveform visualizations displayed in the case study (SVG-based for v1)
- [ ] **PROJ-04**: Impact metrics displayed visually (521+ downloads, Harvard/MIT/Cornell/Columbia adoption, IEEE published)
- [ ] **PROJ-05**: Links to beatprofiler.github.io and IEEE paper included

### Experience

- [ ] **EXP-01**: Timeline displays roles at NYP (Senior Data Scientist), Columbia (PhD), and Genentech (ML Intern)
- [ ] **EXP-02**: Each role shows title, dates, and key achievements
- [ ] **EXP-03**: Timeline styled with clinical data aesthetic consistent with site design

### Contact

- [ ] **CONTACT-01**: Email link (youngbin.kim@columbia.edu) displayed and functional
- [ ] **CONTACT-02**: LinkedIn profile link displayed and functional
- [ ] **CONTACT-03**: Clean footer with contact info and optional copyright

### Theming

- [ ] **THEME-01**: Dark mode ("lab at night" aesthetic) implemented as default or user-preferred
- [ ] **THEME-02**: Light mode ("clinical clean" aesthetic) available as alternative
- [ ] **THEME-03**: Theme toggle allows user to switch between dark and light modes
- [ ] **THEME-04**: Inline blocking script prevents flash of unstyled content (FOUC) on load
- [ ] **THEME-05**: Theme preference persists across page reloads (localStorage)

### Design System

- [ ] **DESIGN-01**: Clinical data aesthetic applied as unified design DNA (EHR-inspired typography, monospace accents, data visualization motifs)
- [ ] **DESIGN-02**: Waveform motif used as section dividers throughout the site
- [ ] **DESIGN-03**: Consistent color palette across both dark and light themes
- [ ] **DESIGN-04**: Typography hierarchy established (headings, body, code/terminal, accent text)

### Easter Eggs

- [ ] **EASTER-01**: YNYC choir link (ynyc.org) discoverable through subtle interaction (not prominently displayed)
- [ ] **EASTER-02**: Biking or travel visual touch discoverable somewhere on the site
- [ ] **EASTER-03**: Easter eggs are non-intrusive — site functions fully without discovering them

### Performance & Accessibility

- [ ] **PERF-01**: Site meets WCAG AA contrast and typography standards
- [ ] **PERF-02**: Animations respect `prefers-reduced-motion` media query (paused/reduced when set)
- [ ] **PERF-03**: SEO meta tags and Open Graph tags configured for social sharing
- [ ] **PERF-04**: Page loads under 2 seconds on a typical connection
- [ ] **PERF-05**: Site deploys correctly to GitHub Pages via GitHub Actions

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Interactivity

- **INTER-01**: Custom cursor or hover micro-interactions
- **INTER-02**: Interactive/expandable experience timeline with detail panels
- **INTER-03**: Canvas/WebGL-based animated waveforms (upgrade from static SVG)
- **INTER-04**: Parallax scroll effects on hero or section backgrounds

### Content Expansion

- **CONTENT-01**: Additional project case studies (if non-proprietary projects become available)
- **CONTENT-02**: Blog or writing section
- **CONTENT-03**: Photo gallery for travel/hobbies

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form with backend | No server-side processing on GitHub Pages; email/LinkedIn links sufficient |
| Blog/CMS | Portfolio-focused for v1; adds complexity without core value |
| Registry Agent case study | Proprietary NYP project, cannot be shared publicly |
| Facebook/social media links beyond LinkedIn | Not requested; LinkedIn + email sufficient |
| Authentication or user accounts | Public portfolio site, no need |
| Analytics dashboard | Can add via simple GA/Plausible script later, not a v1 requirement |
| Mobile app or PWA | Web-first, static site is the right scope |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAYOUT-01 | TBD | Pending |
| LAYOUT-02 | TBD | Pending |
| LAYOUT-03 | TBD | Pending |
| LAYOUT-04 | TBD | Pending |
| HERO-01 | TBD | Pending |
| HERO-02 | TBD | Pending |
| HERO-03 | TBD | Pending |
| HERO-04 | TBD | Pending |
| HERO-05 | TBD | Pending |
| ABOUT-01 | TBD | Pending |
| ABOUT-02 | TBD | Pending |
| ABOUT-03 | TBD | Pending |
| PROJ-01 | TBD | Pending |
| PROJ-02 | TBD | Pending |
| PROJ-03 | TBD | Pending |
| PROJ-04 | TBD | Pending |
| PROJ-05 | TBD | Pending |
| EXP-01 | TBD | Pending |
| EXP-02 | TBD | Pending |
| EXP-03 | TBD | Pending |
| CONTACT-01 | TBD | Pending |
| CONTACT-02 | TBD | Pending |
| CONTACT-03 | TBD | Pending |
| THEME-01 | TBD | Pending |
| THEME-02 | TBD | Pending |
| THEME-03 | TBD | Pending |
| THEME-04 | TBD | Pending |
| THEME-05 | TBD | Pending |
| DESIGN-01 | TBD | Pending |
| DESIGN-02 | TBD | Pending |
| DESIGN-03 | TBD | Pending |
| DESIGN-04 | TBD | Pending |
| EASTER-01 | TBD | Pending |
| EASTER-02 | TBD | Pending |
| EASTER-03 | TBD | Pending |
| PERF-01 | TBD | Pending |
| PERF-02 | TBD | Pending |
| PERF-03 | TBD | Pending |
| PERF-04 | TBD | Pending |
| PERF-05 | TBD | Pending |

**Coverage:**
- v1 requirements: 40 total
- Mapped to phases: 0
- Unmapped: 40

---
*Requirements defined: 2025-03-29*
*Last updated: 2025-03-29 after initial definition*
