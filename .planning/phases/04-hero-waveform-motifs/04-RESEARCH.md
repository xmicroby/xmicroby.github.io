# Phase 4: Hero & Motifs — Research

**Researched:** 2026-03-30
**Discovery Level:** 2 (Standard Research)
**Topics:** Accessible typewriter patterns, Astro React integration, scroll entrance animations

---

## 1. Accessible Typewriter Animation Patterns

### The Accessibility Problem

Most typewriter libraries (typed.js, react-typist, etc.) inject text character-by-character into the DOM via JavaScript. This creates two critical issues:
- **Screen readers** see an empty element or get disrupted by rapid DOM mutations
- **Search engines** may index an empty element since content is JS-injected at runtime

### Recommended Pattern: CSS-Revealed Full Text

The accessible approach keeps the **full text in the DOM at all times** and uses CSS/JS to *reveal* it visually:

1. **Full text in markup** — `<h1>Youngbin Kim</h1>` renders in the HTML (SSR/SSG), so screen readers and crawlers see it immediately
2. **Visual clipping** — CSS `clip-path`, `max-width`, or `overflow: hidden` with a growing `width`/`ch` unit hides overflow characters
3. **JS stepping** — A timer increments a character count that controls the visible width, creating the "typing" visual
4. **`aria-label`** — Place the full text as an `aria-label` on the container; use `aria-hidden="true"` on the animated visual span so screen readers skip the mid-animation state

### Implementation Approach: Custom React Component

**Why not a library?**
- `typed.js` / `react-typed`: DOM-injection, not accessible, not SSR-friendly
- Motion `Typewriter`: Paid (Motion+ exclusive, $99+ one-time)
- Custom is lightweight (~50 lines) and gives full control over accessibility

**Architecture:**
```tsx
// TerminalHero.tsx (React island, client:load)
function TerminalHero() {
  const [charIndex, setCharIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCharIndex(prev => {
        if (prev >= totalChars) { clearInterval(timer); return prev; }
        return prev + 1;
      });
    }, 80); // ~80ms per character = natural typing speed
    return () => clearInterval(timer);
  }, []);

  return (
    <div aria-label="Youngbin Kim, LLM Engineer / Data Scientist (Clinical AI)">
      <h1 aria-hidden="true">
        <span style={{ /* clip to charIndex characters */ }}>
          Youngbin Kim
        </span>
        <span className="cursor">█</span>
      </h1>
    </div>
  );
}
```

**Cursor:** Blinking block cursor (`█`) using CSS `@keyframes` with `opacity` toggle at 530ms interval (standard terminal blink rate). Uses existing teal accent color (`var(--color-accent)`).

**Reduced Motion:** When `prefers-reduced-motion: reduce` is active, skip the typing animation entirely — show all text immediately. The existing global.css already has `animation-duration: 0ms !important` for reduced motion.

### Decision: Build Custom (~50 LOC)

Lightweight, fully accessible, SSR-compatible. No external dependency needed.

---

## 2. Astro React Integration (@astrojs/react)

### Setup

Astro has first-class React integration via `@astrojs/react`. Installation:

```bash
npx astro add react
```

This automatically:
1. Installs `@astrojs/react`, `react`, `react-dom`
2. Updates `astro.config.mjs` with `import react from '@astrojs/react'` and adds `integrations: [react()]`
3. Updates `tsconfig.json` with `"jsx": "react-jsx"` and `"jsxImportSource": "react"`

### Client Directives (Islands Architecture)

React components in Astro are **static by default** (rendered at build time, no JS shipped). To make them interactive, use client directives:

| Directive | Behavior | Use Case |
|-----------|----------|----------|
| `client:load` | Hydrate immediately on page load | Hero typing animation (needs to start ASAP) |
| `client:visible` | Hydrate when scrolled into viewport | Scroll-triggered animations (lazy) |
| `client:idle` | Hydrate when browser is idle | Lower-priority interactive elements |

**For this phase:**
- `TerminalHero` → `client:load` (animation starts on page load)
- `ScrollReveal` wrapper → `client:visible` (activates when section enters viewport)

### Usage in Astro

```astro
---
import TerminalHero from '../components/react/TerminalHero';
---

<TerminalHero client:load />
```

### File Organization

Per Astro conventions and the existing codebase pattern (`src/components/*.astro`):
- React components: `src/components/react/*.tsx`
- Astro components remain: `src/components/*.astro`

### Dependencies to Install

```
@astrojs/react  (integration)
react           (peer dep)
react-dom       (peer dep)
motion          (Framer Motion v12, for scroll animations — see section 3)
```

Note: `@types/react` and `@types/react-dom` are optional with Astro's built-in TypeScript but recommended for strict mode.

---

## 3. Scroll Entrance Animations — Options Evaluated

### Option A: Pure CSS (IntersectionObserver + CSS classes)

**How:** JavaScript IntersectionObserver adds a `.visible` class when elements enter viewport. CSS transitions handle the animation.

```css
.reveal { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

**Pros:**
- Zero JS bundle cost for animation logic
- Already have IntersectionObserver in `index.astro` (for nav highlighting)
- Works without React (Astro `<script>` tag)
- Best performance — CSS animations are compositor-thread

**Cons:**
- Staggering children requires manual `transition-delay` per child
- No orchestration API for complex sequences
- Callback timing is imprecise for "data loading" stagger effect (D-04/D-05)

### Option B: Framer Motion (now "Motion" v12)

**How:** React `<motion.div>` with `whileInView` prop. Stagger via `staggerChildren` in `transition` variants.

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ staggerChildren: 0.1 }}
>
```

**Pros:**
- `whileInView` prop handles viewport detection automatically (uses pooled IntersectionObserver internally)
- `staggerChildren` makes "data loading" stagger trivial (D-04/D-05)
- Declarative API — easy to read and maintain
- Hardware-accelerated where possible (ScrollTimeline)
- Handles `prefers-reduced-motion` via `useReducedMotion()` hook
- Already in project roadmap's recommended stack

**Cons:**
- Adds ~15-20KB to the JS bundle (tree-shaken)
- Requires React integration (which we're adding anyway)
- Each animated section becomes a React island

**Bundle impact:** Motion v12 tree-shakes aggressively. Using only `motion`, `whileInView`, `staggerChildren`, and `useReducedMotion` results in ~15KB gzipped. Acceptable for a portfolio site.

### Option C: CSS Scroll-Driven Animations (animation-timeline)

**How:** Native CSS `animation-timeline: view()` ties keyframes to element viewport visibility.

**Pros:**
- Zero JavaScript, fully native
- Best possible performance

**Cons:**
- **Not supported in Firefox** (as of March 2026 — "Limited availability" per MDN)
- Not supported in Safari < 18.4
- Cannot do staggered children easily
- No graceful degradation story for the "data loading" effect

### Recommendation: Framer Motion (Option B)

**Rationale:**
1. React integration is already being added for the typewriter hero — zero additional setup cost
2. `whileInView` + `staggerChildren` directly implements D-04/D-05 ("data loading staggered reveal")
3. `useReducedMotion()` hook handles PERF-02 accessibility requirement
4. The bundle cost (~15KB) is acceptable for a portfolio site with few pages
5. CSS scroll animations lack browser support and can't easily do stagger
6. Pure CSS + IntersectionObserver can work but requires significantly more manual code for the stagger effect

**Package:** `motion` (npm package name for Framer Motion v12+)

---

## 4. Architecture Summary

### New Dependencies
| Package | Version | Size (gzipped) | Purpose |
|---------|---------|----------------|---------|
| `@astrojs/react` | ^5.0 | ~5KB | Astro-React integration |
| `react` | ^19.0 | ~6KB | React runtime |
| `react-dom` | ^19.0 | ~40KB | React DOM renderer |
| `motion` | ^12.0 | ~15KB (tree-shaken) | Scroll animations |

### New Files
| File | Type | Purpose |
|------|------|---------|
| `src/components/react/TerminalHero.tsx` | React | Typewriter hero with cursor |
| `src/components/react/ScrollReveal.tsx` | React | Staggered viewport reveal wrapper |

### Modified Files
| File | Change |
|------|--------|
| `astro.config.mjs` | Add React integration |
| `tsconfig.json` | Add JSX compiler options |
| `package.json` | New dependencies |
| `src/pages/index.astro` | Replace static hero with `<TerminalHero>`, wrap sections in `<ScrollReveal>` |

### What We Are NOT Building (Tabled per D-06)
- ❌ Animated waveform backgrounds
- ❌ Waveform section dividers  
- ❌ HERO-03 (waveform in hero)
- ❌ DESIGN-02 (waveform motif dividers)

---

## Sources

- [Astro @astrojs/react integration docs](https://docs.astro.build/en/guides/integrations-guide/react/) — HIGH CONFIDENCE
- [Motion (Framer Motion) scroll animations](https://motion.dev/docs/react-scroll-animations) — HIGH CONFIDENCE
- [Motion Typewriter (Motion+ paid)](https://motion.dev/docs/react-typewriter) — confirmed paid/unavailable
- [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) — confirmed limited browser support
- WCAG 2.1 SC 1.3.1 (Info and Relationships), SC 4.1.2 (Name, Role, Value) — accessible animation patterns

---
*Phase: 04-hero-waveform-motifs*
*Research completed: 2026-03-30*
