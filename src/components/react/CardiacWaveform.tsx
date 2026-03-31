import { motion, useReducedMotion } from 'motion/react';

/**
 * Generate a synthetic calcium transient waveform.
 * Mimics real cardiac signal: rapid upstroke → plateau → exponential decay → baseline.
 */
function generateCardiacSignal(numBeats: number, samplesPerBeat: number): number[] {
  const data: number[] = [];
  const baseline = 0.08;

  for (let beat = 0; beat < numBeats; beat++) {
    for (let i = 0; i < samplesPerBeat; i++) {
      const t = i / samplesPerBeat; // 0..1 within each beat

      let value: number;
      if (t < 0.05) {
        // Resting baseline before upstroke
        value = baseline;
      } else if (t < 0.15) {
        // Rapid upstroke (depolarization) — steep rise
        const phase = (t - 0.05) / 0.1;
        value = baseline + (1 - baseline) * Math.pow(phase, 0.6);
      } else if (t < 0.22) {
        // Brief plateau at peak
        value = 1.0 - (t - 0.15) * 0.3;
      } else if (t < 0.8) {
        // Gradual exponential decay (repolarization)
        const phase = (t - 0.22) / 0.58;
        value = (0.79) * Math.exp(-3.5 * phase) + baseline;
      } else {
        // Return to baseline
        value = baseline;
      }

      data.push(Math.max(0, Math.min(1, value)));
    }
  }

  return data;
}

/**
 * Convert a numeric data array to an SVG path string.
 * Maps data indices to x-coords linearly; data values (0–1) to y-coords (inverted).
 */
function dataToSvgPath(data: number[], width: number, height: number): string {
  const padY = 16;
  const usableHeight = height - padY * 2;

  return data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = padY + usableHeight * (1 - val); // invert: 0 at bottom, 1 at top
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

// Generate waveform data once at module level — 3 beats × 100 samples = 300 points
const SIGNAL_DATA = generateCardiacSignal(3, 100);
const SVG_WIDTH = 600;
const SVG_HEIGHT = 200;
const WAVEFORM_PATH = dataToSvgPath(SIGNAL_DATA, SVG_WIDTH, SVG_HEIGHT);

// Grid line y-positions at 25%, 50%, 75%
const GRID_LINES = [0.25, 0.5, 0.75].map((frac) => 16 + (SVG_HEIGHT - 32) * (1 - frac));

export default function CardiacWaveform() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full"
      style={{ maxHeight: '200px' }}
      role="img"
      aria-label="Cardiac calcium transient waveform showing 3 heartbeat cycles with characteristic rapid upstroke and gradual decay phases"
    >
      {/* Grid background */}
      {GRID_LINES.map((y) => (
        <line
          key={y}
          x1={0}
          y1={y}
          x2={SVG_WIDTH}
          y2={y}
          stroke="var(--color-border)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      ))}

      {/* Axis labels */}
      <text
        x={8}
        y={SVG_HEIGHT / 2}
        fill="var(--color-text-muted)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        textAnchor="middle"
        transform={`rotate(-90, 8, ${SVG_HEIGHT / 2})`}
      >
        Amplitude
      </text>
      <text
        x={SVG_WIDTH / 2}
        y={SVG_HEIGHT - 4}
        fill="var(--color-text-muted)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        textAnchor="middle"
      >
        Time
      </text>

      {/* Glow effect — blurred duplicate behind main path */}
      {prefersReducedMotion ? (
        <path
          d={WAVEFORM_PATH}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          opacity="0.3"
          filter="url(#waveform-glow)"
        />
      ) : (
        <motion.path
          d={WAVEFORM_PATH}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          opacity="0.3"
          filter="url(#waveform-glow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Main waveform path */}
      {prefersReducedMotion ? (
        <path
          d={WAVEFORM_PATH}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <motion.path
          d={WAVEFORM_PATH}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Blur filter for glow */}
      <defs>
        <filter id="waveform-glow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
    </svg>
  );
}
