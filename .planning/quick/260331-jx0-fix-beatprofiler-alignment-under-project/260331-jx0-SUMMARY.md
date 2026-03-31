# Quick Task 260331-jx0 Summary

## What was built
- Fixed "Projects" heading alignment in `index.astro` to match the BeatProfiler case study container width.
- Added optional "Video Input" (Step 0) to `PipelineDiagram.tsx` to reflect full capability.
- Adjusted pipeline flexbox layout to support wrapping gracefully with the new 6th item.

## Key Files Modified
1. `src/pages/index.astro`
2. `src/components/react/PipelineDiagram.tsx`

## Issues/Notes
- The pipeline might wrap on very small desktop/tablet screens, but `flex-wrap` and `md:justify-center` were added to handle this cleanly.
