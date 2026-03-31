import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';

interface PipelineStep {
  id: number;
  name: string;
  description: string;
  icon: JSX.Element;
}

const steps: PipelineStep[] = [
  {
    id: 0,
    name: 'Video Input (Optional)',
    description: 'Extract time-series signal directly from cardiomyocyte video recordings',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="16" height="10" rx="1" />
        <circle cx="10" cy="10" r="2" />
        <line x1="6" y1="5" x2="6" y2="15" />
        <line x1="14" y1="5" x2="14" y2="15" />
      </svg>
    ),
  },
  {
    id: 1,
    name: 'Raw Signal Input',
    description: 'Calcium transient & field potential recordings',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1,14 4,10 6,14 8,6 10,12 12,4 14,10 16,8 19,14" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Signal Processing',
    description: 'Noise filtering, baseline correction, normalization',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="10,2 18,18 2,18" />
        <line x1="10" y1="8" x2="10" y2="18" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Beat Detection',
    description: 'Automated peak detection & beat segmentation',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1,15 5,15 7,5 10,15 13,5 16,15 19,15" />
        <circle cx="7" cy="4" r="1.5" fill="currentColor" />
        <circle cx="13" cy="4" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Feature Extraction',
    description: 'Duration, amplitude, frequency, morphology metrics',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="10" width="3" height="8" rx="0.5" />
        <rect x="7" y="6" width="3" height="12" rx="0.5" />
        <rect x="12" y="3" width="3" height="15" rx="0.5" />
        <rect x="17" y="8" width="2" height="10" rx="0.5" />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'ML Classification',
    description: 'Disease phenotype prediction & drug response analysis',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="4" r="2.5" />
        <circle cx="4" cy="16" r="2.5" />
        <circle cx="16" cy="16" r="2.5" />
        <line x1="8.2" y1="6" x2="5.5" y2="13.8" />
        <line x1="11.8" y1="6" x2="14.5" y2="13.8" />
        <line x1="6.5" y1="16" x2="13.5" y2="16" />
      </svg>
    ),
  },
];

function Arrow({ direction, index }: { direction: 'right' | 'down'; index: number }) {
  if (direction === 'right') {
    return (
      <svg
        viewBox="0 0 24 12"
        className="w-6 h-3 shrink-0 hidden md:block"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="0" y1="6" x2="20" y2="6" />
        <polyline points="16,2 20,6 16,10" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 12 24"
      className="w-3 h-6 shrink-0 md:hidden"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="6" y1="0" x2="6" y2="20" />
      <polyline points="2,16 6,20 10,16" />
    </svg>
  );
}

export default function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleStep = (id: number) => {
    setActiveStep((prev) => (prev === id ? null : id));
  };

  // Reduced motion: show all steps expanded, no animations
  if (prefersReducedMotion) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-2 w-full md:justify-center flex-wrap">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col md:flex-row items-center gap-3 md:gap-2">
            <div
              className="flex flex-col items-center p-4 rounded-lg border max-w-[160px] w-full"
              style={{
                backgroundColor: 'var(--color-surface-elevated)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {String(step.id).padStart(2, '0')}
                </span>
                <span style={{ color: 'var(--color-accent)' }}>{step.icon}</span>
              </div>
              <p className="font-mono text-xs text-center leading-snug" style={{ color: 'var(--color-text)' }}>
                {step.name}
              </p>
              <p className="text-xs mt-2 text-center leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {step.description}
              </p>
            </div>
            {i < steps.length - 1 && (
              <>
                <Arrow direction="right" index={i} />
                <Arrow direction="down" index={i} />
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-2 w-full md:justify-center flex-wrap"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          className="flex flex-col md:flex-row items-center gap-3 md:gap-2"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
          }}
        >
          <button
            type="button"
            aria-expanded={activeStep === step.id}
            onClick={() => toggleStep(step.id)}
            className="flex flex-col items-center p-4 rounded-lg border cursor-pointer max-w-[160px] w-full transition-colors duration-200"
            style={{
              backgroundColor: 'var(--color-surface-elevated)',
              borderColor: activeStep === step.id ? 'var(--color-accent)' : 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-mono text-xs font-bold"
                style={{ color: 'var(--color-accent)' }}
              >
                {String(step.id).padStart(2, '0')}
              </span>
              <span style={{ color: activeStep === step.id ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                {step.icon}
              </span>
            </div>
            <p className="font-mono text-xs text-center leading-snug" style={{ color: 'var(--color-text)' }}>
              {step.name}
            </p>
            <AnimatePresence>
              {activeStep === step.id && (
                <motion.p
                  className="text-xs mt-2 text-center leading-relaxed overflow-hidden"
                  style={{ color: 'var(--color-text-muted)' }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  aria-live="polite"
                >
                  {step.description}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
          {i < steps.length - 1 && (
            <>
              <Arrow direction="right" index={i} />
              <Arrow direction="down" index={i} />
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
