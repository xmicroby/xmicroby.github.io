import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  loop: 'design' | 'workbench' | 'optimize' | null;
}

interface Loop {
  id: 'design' | 'workbench' | 'optimize';
  label: string;
  color: string;
  steps: string[];
}

const LOOPS: Loop[] = [
  { id: 'design', label: 'Design Loop', color: 'var(--color-accent)', steps: ['chat', 'generate'] },
  { id: 'workbench', label: 'Workbench Loop', color: 'var(--color-accent)', steps: ['test', 'review'] },
  { id: 'optimize', label: 'Optimize Loop', color: 'var(--color-accent)', steps: ['label', 'optimize'] },
];

const STEPS: WorkflowStep[] = [
  {
    id: 'chat',
    name: 'Chat with AI',
    description:
      'Upload a clinical registry spec document and describe your extraction needs. The AI agent reads the spec and proposes a pipeline.',
    loop: 'design',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="16" height="11" rx="2" />
        <polyline points="6,17 10,14 14,17" />
        <line x1="6" y1="7" x2="14" y2="7" />
        <line x1="6" y1="10" x2="11" y2="10" />
      </svg>
    ),
  },
  {
    id: 'generate',
    name: 'Generated Pipeline',
    description:
      'The AI produces a validated pipeline definition as a directed acyclic graph (DAG) — each node is an LLM extraction step with typed inputs and outputs.',
    loop: 'design',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="5" cy="5" r="2.5" />
        <circle cx="15" cy="5" r="2.5" />
        <circle cx="10" cy="15" r="2.5" />
        <line x1="7" y1="6" x2="8.5" y2="13" />
        <line x1="13" y1="6" x2="11.5" y2="13" />
      </svg>
    ),
  },
  {
    id: 'test',
    name: 'Run Ad-Hoc Test',
    description:
      'Upload a sample clinical document and run the pipeline against it. See extracted values for each field in real time.',
    loop: 'workbench',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="7,4 7,16 16,10" />
      </svg>
    ),
  },
  {
    id: 'review',
    name: 'Review Output',
    description:
      'Inspect extracted values alongside the source text. Accept correct results or flag errors for correction.',
    loop: 'workbench',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="9" r="5" />
        <line x1="13" y1="13" x2="17" y2="17" />
        <polyline points="7,9 8.5,10.5 11,7.5" />
      </svg>
    ),
  },
  {
    id: 'label',
    name: 'Label Corrections',
    description:
      'Corrected extractions automatically become labeled training examples — no manual annotation workflow needed.',
    loop: 'optimize',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3,10 L10,3 L17,3 L17,10 L10,17 Z" />
        <circle cx="14" cy="6" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'optimize',
    name: 'DSPy Optimize',
    description:
      'Labeled corrections feed into DSPy GEPA optimization, which refines each extraction node\'s prompt and few-shot examples.',
    loop: 'optimize',
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10,2 L11.5,7 L17,7 L12.5,10.5 L14,16 L10,12.5 L6,16 L7.5,10.5 L3,7 L8.5,7 Z" />
      </svg>
    ),
  },
  {
    id: 'deploy',
    name: 'Improved Pipeline',
    description:
      'The optimized pipeline version is saved with full audit trail. Accuracy improves incrementally with each correction cycle.',
    loop: null,
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10,2 L10,14" />
        <polyline points="6,10 10,14 14,10" />
        <line x1="4" y1="18" x2="16" y2="18" />
      </svg>
    ),
  },
];

const LOOP_ORDER: Array<'design' | 'workbench' | 'optimize'> = ['design', 'workbench', 'optimize'];
const CYCLE_INTERVAL = 3000;

function DownArrow() {
  return (
    <svg
      viewBox="0 0 12 24"
      className="w-3 h-6 shrink-0 mx-auto"
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

function CycleArrow() {
  return (
    <svg
      viewBox="0 0 32 20"
      className="w-8 h-5 shrink-0"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4,10 Q16,-4 28,10" />
      <polyline points="24,7 28,10 24,13" />
    </svg>
  );
}

function StepNode({
  step,
  index,
  isExpanded,
  onToggle,
}: {
  step: WorkflowStep;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex flex-col items-center p-3 rounded-lg border cursor-pointer w-full transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: isExpanded ? 'var(--color-accent)' : 'var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="font-mono text-xs font-bold"
          style={{ color: 'var(--color-accent)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ color: isExpanded ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
          {step.icon}
        </span>
      </div>
      <p className="font-mono text-xs text-center leading-snug" style={{ color: 'var(--color-text)' }}>
        {step.name}
      </p>
      <AnimatePresence>
        {isExpanded && (
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
  );
}

function StaticStepNode({
  step,
  index,
}: {
  step: WorkflowStep;
  index: number;
}) {
  return (
    <div
      className="flex flex-col items-center p-3 rounded-lg border w-full"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="font-mono text-xs font-bold"
          style={{ color: 'var(--color-accent)' }}
        >
          {String(index + 1).padStart(2, '0')}
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
  );
}

export default function BuilderWorkflow() {
  const prefersReducedMotion = useReducedMotion();
  const [activeLoop, setActiveLoop] = useState<'design' | 'workbench' | 'optimize' | null>('design');
  const [userSelected, setUserSelected] = useState(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  // Auto-cycle through loops
  useEffect(() => {
    if (prefersReducedMotion || userSelected) return;
    const interval = setInterval(() => {
      setActiveLoop((prev) => {
        const idx = prev ? LOOP_ORDER.indexOf(prev) : -1;
        return LOOP_ORDER[(idx + 1) % LOOP_ORDER.length];
      });
    }, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, [userSelected, prefersReducedMotion]);

  const handleLoopClick = useCallback((loopId: 'design' | 'workbench' | 'optimize') => {
    if (activeLoop === loopId && userSelected) {
      // Clicking the same loop again restarts auto-cycle
      setUserSelected(false);
    } else {
      setActiveLoop(loopId);
      setUserSelected(true);
    }
  }, [activeLoop, userSelected]);

  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target;
    if (target instanceof Element && target.closest('[data-loop-root="true"]')) {
      return;
    }

    if (userSelected) {
      setUserSelected(false);
    }
  }, [userSelected]);

  const toggleStep = useCallback((stepId: string) => {
    setExpandedStep((prev) => (prev === stepId ? null : stepId));
  }, []);

  const getStepGlobalIndex = (stepId: string) => STEPS.findIndex((s) => s.id === stepId);

  // Reduced motion: show all loops highlighted statically, all descriptions visible
  if (prefersReducedMotion) {
    return (
      <figure
        aria-label="ChartExtract pipeline builder workflow showing three iterative development loops"
        className="flex flex-col gap-4 w-full"
      >
        {LOOPS.map((loop) => (
          <section
            key={loop.id}
            aria-label={loop.label}
            className="border border-dashed rounded-lg p-4"
            style={{ borderColor: 'var(--color-accent)' }}
          >
            <span
              className="font-mono text-xs font-bold mb-3 block"
              style={{ color: 'var(--color-accent)' }}
            >
              {loop.label}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              {loop.steps.map((stepId) => {
                const step = STEPS.find((s) => s.id === stepId)!;
                const globalIdx = getStepGlobalIndex(stepId);
                return (
                  <StaticStepNode key={stepId} step={step} index={globalIdx} />
                );
              })}
            </div>
            <div className="flex justify-center mt-2">
              <CycleArrow />
            </div>
          </section>
        ))}
        <DownArrow />
        {/* Deploy node */}
        {(() => {
          const deployStep = STEPS.find((s) => s.id === 'deploy')!;
          const deployIdx = getStepGlobalIndex('deploy');
          return (
            <div className="max-w-[200px] mx-auto w-full">
              <StaticStepNode step={deployStep} index={deployIdx} />
            </div>
          );
        })()}
      </figure>
    );
  }

  return (
    <motion.figure
      aria-label="ChartExtract pipeline builder workflow showing three iterative development loops"
      className="flex flex-col gap-4 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      onClick={handleContainerClick}
    >
      {LOOPS.map((loop) => {
        const isActive = activeLoop === loop.id;
        return (
          <motion.div
            key={loop.id}
            data-loop-root="true"
            aria-label={loop.label}
            className="border border-dashed rounded-lg p-4 cursor-pointer transition-colors duration-300"
            style={{
              borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
            }}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
            animate={
              isActive
                ? { opacity: [0.85, 1, 0.85], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }
                : { opacity: 1 }
            }
            onClick={() => handleLoopClick(loop.id)}
          >
            <span
              className="font-mono text-xs mb-3 block transition-all duration-200"
              style={{
                color: 'var(--color-accent)',
                fontWeight: isActive ? 700 : 400,
              }}
            >
              {loop.label}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              {loop.steps.map((stepId) => {
                const step = STEPS.find((s) => s.id === stepId)!;
                const globalIdx = getStepGlobalIndex(stepId);
                return (
                  <StepNode
                    key={stepId}
                    step={step}
                    index={globalIdx}
                    isExpanded={expandedStep === stepId}
                    onToggle={() => toggleStep(stepId)}
                  />
                );
              })}
            </div>
            <div className="flex justify-center mt-2">
              <CycleArrow />
            </div>
          </motion.div>
        );
      })}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        }}
      >
        <DownArrow />
      </motion.div>
      {/* Deploy node — outside any loop */}
      <motion.div
        className="max-w-[200px] mx-auto w-full"
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        }}
      >
        <StepNode
          step={STEPS.find((s) => s.id === 'deploy')!}
          index={getStepGlobalIndex('deploy')}
          isExpanded={expandedStep === 'deploy'}
          onToggle={() => toggleStep('deploy')}
        />
      </motion.div>
    </motion.figure>
  );
}
