import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import PipelinePanel from './PipelinePanel';

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
    name: 'Final Pipeline',
    description:
      'A validated extraction pipeline is ready to run, whether it ships directly from workbench review or after optimization.',
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
      <path d="M4,10 Q16,24 28,10" />
      <polyline points="21,11 28,10 24,17" />
    </svg>
  );
}

function StepNode({
  step,
  isExpanded,
  onToggle,
}: {
  step: WorkflowStep;
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
      <div className="mb-2 flex items-center justify-center">
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
}: {
  step: WorkflowStep;
}) {
  return (
    <div
      className="flex flex-col items-center p-3 rounded-lg border w-full"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="mb-2 flex items-center justify-center">
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

function VerticalArrow({ direction = 'down' }: { direction?: 'down' | 'up' }) {
  return (
    <svg
      viewBox="0 0 12 24"
      className="h-6 w-3 shrink-0"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="6" y1={direction === 'down' ? '2' : '6'} x2="6" y2="20" />
      {direction === 'down' ? <polyline points="2,16 6,20 10,16" /> : <polyline points="2,8 6,4 10,8" />}
    </svg>
  );
}

function HorizontalArrow({ dashed = false }: { dashed?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 16"
      className="h-4 w-12 shrink-0"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="40" y2="8" strokeDasharray={dashed ? '5 3' : undefined} />
      <polyline points="36,4 40,8 36,12" />
    </svg>
  );
}

function DiagonalArrow() {
  return (
    <svg
      viewBox="0 0 84 56"
      className="h-14 w-24 shrink-0"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8C26 8 43 14 59 30L76 47" strokeDasharray="5 3" />
      <polyline points="68,46 76,47 75,39" />
    </svg>
  );
}

function LoopCard({
  loop,
  activeLoop,
  expandedStep,
  onStepToggle,
  prefersReducedMotion,
}: {
  loop: Loop;
  activeLoop: 'design' | 'workbench' | 'optimize' | null;
  expandedStep: string | null;
  onStepToggle?: (stepId: string) => void;
  prefersReducedMotion: boolean;
}) {
  const steps = STEPS.filter((step) => loop.steps.includes(step.id));
  const isActive = prefersReducedMotion || activeLoop === loop.id;

  const body = (
    <>
      <span
        className="mb-3 block font-mono text-xs transition-all duration-200"
        style={{
          color: 'var(--color-accent)',
          fontWeight: isActive ? 700 : 400,
        }}
      >
        {loop.label}
      </span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 items-start">
        {steps.map((step) => {
          if (prefersReducedMotion || !onStepToggle) {
            return <StaticStepNode key={step.id} step={step} />;
          }

          return (
            <StepNode
              key={step.id}
              step={step}
              isExpanded={expandedStep === step.id}
              onToggle={() => onStepToggle(step.id)}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-center">
        <CycleArrow />
      </div>
    </>
  );

  if (prefersReducedMotion) {
    return (
      <section
        aria-label={loop.label}
        className="rounded-lg border border-dashed p-4"
        style={{ borderColor: 'var(--color-accent)' }}
      >
        {body}
      </section>
    );
  }

  return (
    <motion.section
      aria-label={loop.label}
      className="rounded-lg border border-dashed p-4 transition-colors duration-300"
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
    >
      {body}
    </motion.section>
  );
}

function FinalPipelineCard() {
  return (
    <div
      className="rounded-lg border p-4 md:p-5"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-accent)',
      }}
    >
      <div className="mb-4 space-y-2 text-center md:text-left">
        <p className="font-mono text-xs uppercase tracking-[0.08em]" style={{ color: 'var(--color-accent)' }}>
          Final Pipeline
        </p>
        <p className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Example generated DAG
        </p>
      </div>
      <PipelinePanel />
    </div>
  );
}

export default function BuilderWorkflow() {
  const prefersReducedMotion = useReducedMotion();
  const [activeLoop, setActiveLoop] = useState<'design' | 'workbench' | 'optimize' | null>('design');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  // Auto-cycle through loops
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveLoop((prev) => {
        const idx = prev ? LOOP_ORDER.indexOf(prev) : -1;
        return LOOP_ORDER[(idx + 1) % LOOP_ORDER.length];
      });
    }, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const toggleStep = useCallback((stepId: string) => {
    setExpandedStep((prev) => (prev === stepId ? null : stepId));
  }, []);

  // Reduced motion: show all loops highlighted statically, all descriptions visible
  if (prefersReducedMotion) {
    return (
      <figure
        aria-label="ChartExtract pipeline builder workflow showing three iterative development loops"
        className="flex flex-col gap-4 w-full"
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.95fr)] md:grid-rows-[auto_auto_1fr] md:items-start">
          <div className="space-y-4 md:col-start-1 md:row-start-1">
            <LoopCard loop={LOOPS[0]} activeLoop="design" expandedStep={null} prefersReducedMotion />
            <div className="grid gap-3 px-2 sm:grid-cols-2">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Test edge</span>
                <VerticalArrow />
              </div>
              <div className="flex items-center justify-center gap-2">
                <VerticalArrow direction="up" />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Revision edge</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 md:col-start-1 md:row-start-2">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <LoopCard loop={LOOPS[1]} activeLoop="workbench" expandedStep={null} prefersReducedMotion />
              <div className="hidden md:flex flex-col items-center justify-center gap-2 pt-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Skip optimization</span>
                <HorizontalArrow dashed />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Optimize path</span>
              <VerticalArrow />
            </div>
          </div>
          <div className="md:col-start-2 md:row-span-3 md:row-start-1">
            <FinalPipelineCard />
          </div>
          <div className="space-y-4 md:col-start-1 md:row-start-3">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <LoopCard loop={LOOPS[2]} activeLoop="optimize" expandedStep={null} prefersReducedMotion />
              <div className="hidden md:flex flex-col items-center justify-center gap-2 pt-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Improved pipeline</span>
                <HorizontalArrow />
              </div>
            </div>
          </div>
          <div className="space-y-3 md:hidden">
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Skip optimization</span>
              <DiagonalArrow />
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Improved pipeline</span>
              <HorizontalArrow />
            </div>
          </div>
        </div>
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
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.95fr)] md:grid-rows-[auto_auto_1fr] md:items-start">
        <div className="space-y-4 md:col-start-1 md:row-start-1">
          <LoopCard
            loop={LOOPS[0]}
            activeLoop={activeLoop}
            expandedStep={expandedStep}
            onStepToggle={toggleStep}
            prefersReducedMotion={false}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            <div className="grid gap-3 px-2 sm:grid-cols-2">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Test edge</span>
                <VerticalArrow />
              </div>
              <div className="flex items-center justify-center gap-2">
                <VerticalArrow direction="up" />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Revision edge</span>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="md:col-start-2 md:row-span-3 md:row-start-1"
          variants={{
            hidden: { opacity: 0, x: 16 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
          }}
        >
          <FinalPipelineCard />
        </motion.div>
        <div className="space-y-4 md:col-start-1 md:row-start-2">
          <motion.div
            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            <LoopCard
              loop={LOOPS[1]}
              activeLoop={activeLoop}
              expandedStep={expandedStep}
              onStepToggle={toggleStep}
              prefersReducedMotion={false}
            />
            <div className="hidden md:flex flex-col items-center justify-center gap-2 pt-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Skip optimization</span>
              <HorizontalArrow dashed />
            </div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Optimize path</span>
              <VerticalArrow />
            </div>
          </motion.div>
        </div>
        <div className="space-y-4 md:col-start-1 md:row-start-3">
          <motion.div
            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            <LoopCard
              loop={LOOPS[2]}
              activeLoop={activeLoop}
              expandedStep={expandedStep}
              onStepToggle={toggleStep}
              prefersReducedMotion={false}
            />
            <div className="hidden md:flex flex-col items-center justify-center gap-2 pt-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Improved pipeline</span>
              <HorizontalArrow />
            </div>
          </motion.div>
          <motion.div
            className="space-y-3 md:hidden"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Skip optimization</span>
              <DiagonalArrow />
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)]">Improved pipeline</span>
              <HorizontalArrow />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.figure>
  );
}
