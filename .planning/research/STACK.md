# Technology Stack

**Project:** Youngbin Kim — Personal Portfolio Website
**Researched:** 2026-03-29

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | 5.x | Static Site Generator & Core Framework | The 2025 standard for content-heavy portfolios. "Zero-JS by default" ensures blazing fast load times, while "Islands Architecture" allows dropping in complex React components (like the waveform visualizations or terminal typing) exactly where needed without bloating the whole page. Fully compatible with GitHub Pages static hosting. |
| React | 19.x | UI Component Library (via Astro integration) | Used exclusively inside Astro Islands for interactive elements (terminal intro, complex state, visualizations) that require rich ecosystem libraries. |

### Styling & Theming
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first CSS framework | Industry standard for rapid UI development. Built-in dark mode support (`dark:` classes) makes implementing the "lab at night" vs "clinical clean" themes trivial. |
| next-themes (or standard DOM script) | latest | Dark/Light mode state management | Reliable theme toggling that prevents the "flash of inaccurate color" on initial page load by directly injecting a script in the `<head>`. |

### Animations & Interactions
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Framer Motion | 12.x | UI Animations & Transitions | The gold standard for React-based declarative animations. Perfect for page transitions, fade-ins, and the terminal typing sequence. |
| GSAP (Greensock) | 3.12+ | Complex scroll-driven animations | When Framer Motion isn't enough, GSAP excels at tying complex SVG or Canvas waveform animations directly to scroll progress (ScrollTrigger). |

### Visualizations & Visual Motifs
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Canvas API / WebGL | Native | Waveform and clinical data motifs | For custom, highly performant generative waveforms that react to mouse movement or scroll. Standard DOM elements are too slow for complex data visualizations. |
| d3-shape | 3.x | SVG path generation for waveforms | If using SVG instead of Canvas, D3 provides mathematical primitives to cleanly generate smooth bezier curves (cardiac signals) from data arrays. |

### Deployment & Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GitHub Pages | Native | Hosting | Required by project constraints. Native integration via GitHub Actions makes deployment of the Astro static build (`dist/`) frictionless. |
| GitHub Actions | v4 | CI/CD Pipeline | Standard way to automate the Astro build and push the resulting static files to the `gh-pages` branch or direct deployment. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Core Framework | Astro | Next.js (Static Export) | Next.js forces a heavier baseline JS bundle even for static pages. Astro's Islands architecture is better optimized for mostly-static portfolios with isolated interactive widgets. |
| Core Framework | Astro | Pure HTML/CSS/JS | Building a dark/light mode, routing, and complex React-based visualizers from scratch without a framework slows down development significantly and leads to messy code. |
| Animations | Framer Motion / GSAP | CSS Transitions | CSS is great for simple hovers, but orchestrating a multi-step terminal typing intro or complex scroll-linked waveforms is brittle and hard to maintain without an animation library. |
| Visualizations | Canvas API | Three.js / R3F | Three.js is overkill and heavily bloats the bundle size if the waveforms are only 2D. A simple Canvas 2D context or SVG is sufficient for "clinical data aesthetic" line graphs and signals. |

## Installation

```bash
# Core framework and integrations
npm create astro@latest
npx astro add react
npx astro add tailwind

# Dev dependencies for animations and visuals
npm install framer-motion gsap d3-shape
npm install -D @types/d3-shape
```

## Sources

- [Astro Documentation](https://docs.astro.build/) - HIGH CONFIDENCE (Official standard for static content sites)
- [Framer Motion](https://www.framer.com/motion/) - HIGH CONFIDENCE (Industry standard React animation library)
- [GitHub Pages Deployment for Astro](https://docs.astro.build/en/guides/deploy/github-pages/) - HIGH CONFIDENCE (Official documentation)
