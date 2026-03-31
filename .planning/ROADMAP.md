# Roadmap: Youngbin Kim Portfolio Website

## Overview

Transform youngbinkim.com from an "under construction" placeholder into a distinctive personal portfolio that communicates Youngbin's clinical AI / LLM engineering identity through a clinical data aesthetic. The journey starts with an Astro-powered foundation and design system, layers in theming, builds out professional content sections, adds the hero animation and waveform motifs that make the site memorable, deep-dives into the BeatProfiler case study, then polishes for accessibility and discoverable personality touches.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Design System** - Astro scaffolding, responsive layout shell, design tokens, and GitHub Pages deployment
- [ ] **Phase 2: Theming Engine** - Dark/light mode with distinct personalities, toggle, FOUC prevention, and persistence
- [x] **Phase 3: Core Content Sections** - About, Experience timeline, and Contact — the professional narrative (completed 2026-03-30)
- [ ] **Phase 4: Hero & Waveform Motifs** - Terminal typing animation, waveform backgrounds, section dividers, and scroll transitions
- [ ] **Phase 5: BeatProfiler Case Study** - Deep-dive project section with pipeline diagrams, cardiac visualizations, and impact metrics
- [ ] **Phase 6: Polish, Accessibility & Easter Eggs** - WCAG compliance, motion preferences, SEO, and discoverable hobby touches

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: A responsive, deployable site shell with the clinical data design DNA established — visitors see a polished empty structure that loads fast and works on any device
**Depends on**: Nothing (first phase)
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, DESIGN-01, DESIGN-03, DESIGN-04, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. Site deploys to GitHub Pages via GitHub Actions and is accessible at youngbinkim.com
  2. Page loads under 2 seconds on a typical connection with no content flash or layout shift
  3. Layout scales correctly across mobile, tablet, and desktop viewports
  4. Navigation links scroll smoothly between section anchors and remain accessible via sticky header
  5. Clinical data typography hierarchy (headings, body, monospace accents) is visually consistent across the site
**Plans:** 3 plans
Plans:
- [x] 01-01-PLAN.md — Astro scaffolding, Tailwind CSS 4.x, design tokens, BaseLayout
- [x] 01-02-PLAN.md — Reusable components (Container, Section, Header, MobileNav, Footer)
- [x] 01-03-PLAN.md — Page assembly, IntersectionObserver, GitHub Actions deployment, visual verification
**UI hint**: yes

### Phase 2: Theming Engine
**Goal**: Users can switch between a "lab at night" dark mode and a "clinical clean" light mode, with their preference remembered and no flash on reload
**Depends on**: Phase 1
**Requirements**: THEME-01, THEME-02, THEME-03, THEME-04, THEME-05
**Success Criteria** (what must be TRUE):
  1. Dark mode renders with a cohesive "lab at night" aesthetic (dark backgrounds, monitor-glow accents)
  2. Light mode renders with a cohesive "clinical clean" aesthetic (bright, sanitized palette)
  3. User can toggle between modes via a visible control, and the switch is instant with no FOUC
  4. Theme preference persists across page reloads (returning visitors see their last choice)
  5. Color palette is consistent across both themes — no broken or unreadable elements in either mode
**Plans:** 2 plans
Plans:
- [x] 02-01-PLAN.md — Theme infrastructure: CSS token inversion, FOUC-prevention script, sun/moon toggle
- [x] 02-02-PLAN.md — Visual QA of all components in both themes + human verification
**UI hint**: yes

### Phase 3: Core Content Sections
**Goal**: Visitors can read Youngbin's professional story — who he is, where he's worked, and how to reach him — with personality woven throughout
**Depends on**: Phase 2
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, EXP-01, EXP-02, EXP-03, CONTACT-01, CONTACT-02, CONTACT-03
**Success Criteria** (what must be TRUE):
  1. About section communicates current NYP role, Columbia PhD, and clinical AI expertise in a compelling narrative
  2. Hobbies and personality are woven naturally into the About narrative (not isolated in a separate block)
  3. Experience timeline displays NYP, Columbia, and Genentech roles with titles, dates, and key achievements
  4. Email link (youngbin.kim@columbia.edu) and LinkedIn link are visible, functional, and open correctly
  5. Footer presents contact information cleanly with optional copyright
**Plans:** 2/2 plans complete
Plans:
- [x] 03-01-PLAN.md — Nav cleanup (remove Contact) + About section with professional narrative
- [x] 03-02-PLAN.md — Experience timeline (horizontal data-viz) + visual verification
**UI hint**: yes

### Phase 4: Hero & Waveform Motifs
**Goal**: The site opens with a striking terminal-style typing animation that reveals Youngbin's identity, with staggered "data loading" scroll reveals on all content sections — waveform motifs tabled per user decision
**Depends on**: Phase 3
**Requirements**: HERO-01, HERO-02, HERO-04, HERO-05, LAYOUT-04 (HERO-03 and DESIGN-02 tabled — waveforms cancelled)
**Success Criteria** (what must be TRUE):
  1. Hero displays "Youngbin Kim" and "LLM Engineer / Data Scientist (Clinical AI)" via a terminal-style typing animation on page load
  2. Hero includes a clear call-to-action that invites the user to scroll down or jump to work
  3. Terminal typing content is readable by screen readers and indexed by search engines (not DOM-injected empty text)
  4. Sections have scroll-triggered staggered entrance transitions ("data loading" effect)
  5. All animations respect prefers-reduced-motion
**Plans:** 2 plans
Plans:
- [x] 04-01-PLAN.md — React integration setup + accessible TerminalHero typewriter component
- [x] 04-02-PLAN.md — ScrollReveal staggered entrance animations + visual verification
**UI hint**: yes

### Phase 5: BeatProfiler Case Study
**Goal**: Visitors experience BeatProfiler as a compelling technical story — understanding what it does, how it works, and its real-world impact — not just a project card
**Depends on**: Phase 4
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria** (what must be TRUE):
  1. BeatProfiler is presented as a deep-dive case study with narrative structure (not a generic project card)
  2. A pipeline/workflow diagram shows how BeatProfiler processes cardiac signals
  3. SVG-based cardiac waveform visualizations are displayed within the case study
  4. Impact metrics (521+ downloads, Harvard/MIT/Cornell/Columbia adoption, IEEE publication) are visually prominent
  5. Links to beatprofiler.github.io and the IEEE paper are functional and clearly accessible
**Plans**: TBD
**UI hint**: yes

### Phase 6: Polish, Accessibility & Easter Eggs
**Goal**: The site meets professional accessibility standards, is optimized for search/social sharing, and rewards curious visitors with subtle personality touches
**Depends on**: Phase 5
**Requirements**: EASTER-01, EASTER-02, EASTER-03, PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. Site meets WCAG AA contrast and typography standards in both dark and light modes
  2. All animations pause or reduce when user has `prefers-reduced-motion` enabled
  3. SEO meta tags and Open Graph tags produce correct previews when shared on social platforms
  4. YNYC choir link (ynyc.org) and a biking/travel touch are discoverable through subtle interactions but don't interfere with core site functionality
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 0/3 | Planned | - |
| 2. Theming Engine | 0/2 | Planned | - |
| 3. Core Content Sections | 2/2 | Complete   | 2026-03-30 |
| 4. Hero & Waveform Motifs | 0/2 | Planned | - |
| 5. BeatProfiler Case Study | 0/TBD | Not started | - |
| 6. Polish, Accessibility & Easter Eggs | 0/TBD | Not started | - |
