# Requirements: Youngbin Kim Portfolio Website

**Defined:** 2025-03-29
**Core Value:** Visitors immediately understand who Youngbin is professionally and walk away remembering a site that felt distinctly personal — not a generic template.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Layout & Navigation

- [x] **LAYOUT-01**: Site is fully responsive across mobile, tablet, and desktop viewports
- [x] **LAYOUT-02**: User can navigate between sections via clear anchor links with smooth scrolling
- [x] **LAYOUT-03**: Header/nav remains accessible (sticky or scroll-to-top) on all pages
- [x] **LAYOUT-04**: Sections have scroll-triggered entrance transitions

### Hero

- [x] **HERO-01**: Hero displays name "Youngbin Kim" and title "LLM Engineer / Data Scientist (Clinical AI)"
- [x] **HERO-02**: Terminal-style typing animation reveals professional identity on page load
- [x] **HERO-03**: Animated waveform background element in hero section
- [x] **HERO-04**: Hero includes a call-to-action to scroll down or view work
- [x] **HERO-05**: Terminal typing content is accessible to screen readers and search engines (CSS animation, not DOM injection)

### About

- [x] **ABOUT-01**: Professional background summary covering current role at NYP, Columbia PhD, and expertise areas
- [x] **ABOUT-02**: Personality woven into professional narrative (hobbies mentioned naturally, not as a separate section)
- [x] **ABOUT-03**: Clinical data aesthetic typography (EHR-inspired fonts/spacing) applied to about section

### Projects

- [ ] **PROJ-01**: BeatProfiler presented as a deep-dive case study (not just a card)
- [ ] **PROJ-02**: Case study includes pipeline/workflow diagram showing how BeatProfiler works
- [ ] **PROJ-03**: Cardiac waveform visualizations displayed in the case study (SVG-based for v1)
- [ ] **PROJ-04**: Impact metrics displayed visually (521+ downloads, Harvard/MIT/Cornell/Columbia adoption, IEEE published)
- [ ] **PROJ-05**: Links to beatprofiler.github.io and IEEE paper included

### Experience

- [x] **EXP-01**: Timeline displays roles at NYP (Senior Data Scientist), Columbia (PhD), and Genentech (ML Intern)
- [x] **EXP-02**: Each role shows title, dates, and key achievements
- [x] **EXP-03**: Timeline styled with clinical data aesthetic consistent with site design

### Contact

- [x] **CONTACT-01**: Email link (youngbin.kim@columbia.edu) displayed and functional
- [x] **CONTACT-02**: LinkedIn profile link displayed and functional
- [x] **CONTACT-03**: Clean footer with contact info and optional copyright

### Theming

- [x] **THEME-01**: Dark mode ("lab at night" aesthetic) implemented as default or user-preferred
- [x] **THEME-02**: Light mode ("clinical clean" aesthetic) available as alternative
- [x] **THEME-03**: Theme toggle allows user to switch between dark and light modes
- [x] **THEME-04**: Inline blocking script prevents flash of unstyled content (FOUC) on load
- [x] **THEME-05**: Theme preference persists across page reloads (localStorage)

### Design System

- [x] **DESIGN-01**: Clinical data aesthetic applied as unified design DNA (EHR-inspired typography, monospace accents, data visualization motifs)
- [x] **DESIGN-02**: Waveform motif used as section dividers throughout the site
- [x] **DESIGN-03**: Consistent color palette across both dark and light themes
- [x] **DESIGN-04**: Typography hierarchy established (headings, body, code/terminal, accent text)

### Easter Eggs

- [ ] **EASTER-01**: YNYC choir link (ynyc.org) discoverable through subtle interaction (not prominently displayed)
- [ ] **EASTER-02**: Biking or travel visual touch discoverable somewhere on the site
- [ ] **EASTER-03**: Easter eggs are non-intrusive — site functions fully without discovering them

### Performance & Accessibility

- [ ] **PERF-01**: Site meets WCAG AA contrast and typography standards
- [ ] **PERF-02**: Animations respect `prefers-reduced-motion` media query (paused/reduced when set)
- [ ] **PERF-03**: SEO meta tags and Open Graph tags configured for social sharing
- [x] **PERF-04**: Page loads under 2 seconds on a typical connection
- [x] **PERF-05**: Site deploys correctly to GitHub Pages via GitHub Actions

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
| LAYOUT-01 | Phase 1 | Complete |
| LAYOUT-02 | Phase 1 | Complete |
| LAYOUT-03 | Phase 1 | Complete |
| LAYOUT-04 | Phase 4 | Complete |
| HERO-01 | Phase 4 | Complete |
| HERO-02 | Phase 4 | Complete |
| HERO-03 | Phase 4 | Complete |
| HERO-04 | Phase 4 | Complete |
| HERO-05 | Phase 4 | Complete |
| ABOUT-01 | Phase 3 | Complete |
| ABOUT-02 | Phase 3 | Complete |
| ABOUT-03 | Phase 3 | Complete |
| PROJ-01 | Phase 5 | Pending |
| PROJ-02 | Phase 5 | Pending |
| PROJ-03 | Phase 5 | Pending |
| PROJ-04 | Phase 5 | Pending |
| PROJ-05 | Phase 5 | Pending |
| EXP-01 | Phase 3 | Complete |
| EXP-02 | Phase 3 | Complete |
| EXP-03 | Phase 3 | Complete |
| CONTACT-01 | Phase 3 | Complete |
| CONTACT-02 | Phase 3 | Complete |
| CONTACT-03 | Phase 3 | Complete |
| THEME-01 | Phase 2 | Complete |
| THEME-02 | Phase 2 | Complete |
| THEME-03 | Phase 2 | Complete |
| THEME-04 | Phase 2 | Complete |
| THEME-05 | Phase 2 | Complete |
| DESIGN-01 | Phase 1 | Complete |
| DESIGN-02 | Phase 4 | Complete |
| DESIGN-03 | Phase 1 | Complete |
| DESIGN-04 | Phase 1 | Complete |
| EASTER-01 | Phase 6 | Pending |
| EASTER-02 | Phase 6 | Pending |
| EASTER-03 | Phase 6 | Pending |
| PERF-01 | Phase 6 | Pending |
| PERF-02 | Phase 6 | Pending |
| PERF-03 | Phase 6 | Pending |
| PERF-04 | Phase 1 | Complete |
| PERF-05 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 40 total
- Mapped to phases: 40
- Unmapped: 0

---
*Requirements defined: 2025-03-29*
*Last updated: 2025-03-29 after initial definition*
