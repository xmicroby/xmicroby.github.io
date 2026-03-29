# Architecture Patterns

**Domain:** Personal Portfolio Website (Static/GitHub Pages)
**Researched:** 2026-03-29

## Recommended Architecture

A Static Site Generation (SSG) architecture using **Astro**, heavily leveraging component-based UI design. Astro is uniquely suited for content-focused portfolios, outputting zero JavaScript by default while allowing isolated interactive "islands" for specialized components like terminal animations and easter eggs.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **App Shell / Layout** | Manages global metadata, routing (if any), and the overall document structure. | Theming Engine, Page Components |
| **Theming Engine** | Handles Light ("Clinical Clean") vs Dark ("Lab at Night") mode transitions via CSS variables and local storage. | App Shell, UI Components |
| **Hero (Terminal)** | Manages the typing animation sequence, revealing the professional identity. | Theming Engine (for syntax highlighting colors) |
| **Waveform SVG Engine** | Generates or renders the recurring waveform motifs used as section dividers and backgrounds. | Page Layouts |
| **Experience Timeline** | Renders the chronological professional history (NYP, Columbia, Genentech). | Content Layer (JSON/Frontmatter) |
| **Case Study (BeatProfiler)** | Handles the deep-dive presentation, including pipeline diagrams and impact metrics. | Content Layer, Asset Manager |
| **Easter Egg Manager** | A lightweight client-side script listening for specific interactions (e.g., konami code, specific clicks) to trigger YNYC or biking/travel content. | App Shell (Window object) |

### Data Flow

1. **Build Time:** Content is authored in Markdown or JSON/YAML (Experience, BeatProfiler stats). Astro parses this data during the build step, passing it as props to the UI components.
2. **Build Output:** The build process generates pure, minified HTML, CSS, and highly optimized images, alongside minimal vanilla JavaScript bundles for interactive components.
3. **Client-Side:** 
   - Initial load serves static HTML.
   - The **Theming Engine** executes a tiny inline script in the `<head>` to prevent Flash of Unstyled Content (FOUC).
   - The **Terminal Animation** and **Easter Egg Manager** initialize via Astro client directives (e.g., `client:load` or `client:idle`), mounting only when necessary.

## Patterns to Follow

### Pattern 1: CSS Variable-Driven Theming
**What:** Define all clinical and "lab at night" colors as CSS custom properties at the `:root` level. Toggle a `data-theme="dark"` attribute on the `<html>` element.
**When:** Implementing the Dark/Light mode toggle.
**Example:**
```css
:root {
  --bg-color: #f8fafc; /* Clinical light */
  --text-color: #0f172a;
  --waveform-stroke: #0ea5e9;
}
[data-theme="dark"] {
  --bg-color: #020617; /* Lab at night */
  --text-color: #e2e8f0;
  --waveform-stroke: #38bdf8;
}
```

### Pattern 2: Component Islands for Interactivity
**What:** Keep the bulk of the site static HTML, using isolated JS components only where interactivity is strictly required (Terminal typing, Easter eggs).
**When:** Building the specialized interactive sections.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Heavy Single Page Application (SPA)
**What:** Using React/Next.js (in SPA mode) or Vue router for a purely content-driven portfolio.
**Why bad:** Unnecessary JavaScript bloat, slower time-to-interactive, overkill for a site with no dynamic backend.
**Instead:** Use an SSG (Astro or Eleventy) that ships HTML by default.

### Anti-Pattern 2: Hardcoded Content within Components
**What:** Writing paragraph text directly inside the React/Astro component files.
**Why bad:** Makes updating the portfolio (adding a new job or project) require code changes and hunting through UI files.
**Instead:** Separate content into a `src/content/` directory using Markdown or JSON data collections.

## Scalability Considerations

| Concern | Initial Launch | Future Updates |
|---------|--------------|----------------|
| **Content Management** | Markdown files for Experience and BeatProfiler. | Astro Content Collections provide type safety for new case studies. |
| **Asset Optimization** | BeatProfiler diagrams and SVGs optimized at build time. | Astro's built-in `<Image>` component handles resizing and WebP conversion. |
| **Maintainability** | CSS variables ensure the "Clinical Data" aesthetic is globally enforced. | Adding new themes or adjusting the motif requires editing only the global CSS registry. |

## Suggested Build Order

1. **Foundation:** Astro Setup, Global CSS variables (Theming Engine), Base Layout.
2. **Core UI & Motifs:** Typography system (EHR-inspired), Grid layout, Waveform SVG Component generation.
3. **Specialized Interactivity:** Terminal Animation Component (Hero).
4. **Content Integration:** Experience Timeline, BeatProfiler Case Study section.
5. **Polish:** Easter Egg Manager, CSS transitions, Mobile responsiveness checks, Light/Dark mode tuning.

## Sources

- Astro Documentation (docs.astro.build) - Best practices for static portfolios
- GitHub Pages limitations and SSG deployment patterns