import { motion, useReducedMotion } from 'motion/react';

interface PipelineNode {
  id: string;
  name: string;
  type: 'ChainOfThought';
  description: string;
  inputs: string[];
  outputs: string[];
}

const NODES: PipelineNode[] = [
  {
    id: 'cancer_type',
    name: 'Cancer Type Extraction',
    type: 'ChainOfThought',
    description: 'Extracts cancer type from clinical text (pathology report, discharge summary).',
    inputs: ['clinical_text'],
    outputs: ['cancer_type'],
  },
  {
    id: 'biomarker',
    name: 'Biomarker Extraction',
    type: 'ChainOfThought',
    description: 'Extracts HER2, ER, PR receptor status from pathology report for breast cancer cases.',
    inputs: ['clinical_text', 'cancer_type'],
    outputs: ['her2_status', 'er_status', 'pr_status'],
  },
];

function FieldTags({ values }: { values: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span
          key={value}
          className="rounded-full border px-2 py-1 font-mono text-xs"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-accent)',
            backgroundColor: 'var(--color-bg)',
          }}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

function PipelineNodeCard({ node }: { node: PipelineNode }) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className="rounded border px-2 py-0.5 font-mono text-xs"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-muted)',
          }}
        >
          {node.type}
        </span>
        <p className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
          {node.name}
        </p>
      </div>
      <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        {node.description}
      </p>
      <div className="space-y-3">
        <div className="space-y-2">
          <p className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
            inputs
          </p>
          <FieldTags values={node.inputs} />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
            outputs
          </p>
          <FieldTags values={node.outputs} />
        </div>
      </div>
    </div>
  );
}

function ConditionalArrow() {
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <span className="font-mono text-xs italic" style={{ color: 'var(--color-accent)' }}>
        if cancer_type = &quot;breast cancer&quot;
      </span>
      <svg
        viewBox="0 0 24 56"
        className="h-14 w-6"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="2" x2="12" y2="46" strokeDasharray="6 3" />
        <polyline points="8,42 12,46 16,42" />
      </svg>
    </div>
  );
}

export default function PipelinePanel() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <figure
        aria-label="Sample pipeline: conditional cancer staging extraction with breast cancer biomarker branch"
        className="rounded-xl border p-5"
        style={{
          backgroundColor: 'var(--color-surface-elevated)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="space-y-4">
          <PipelineNodeCard node={NODES[0]} />
          <ConditionalArrow />
          <PipelineNodeCard node={NODES[1]} />
        </div>
      </figure>
    );
  }

  return (
    <motion.figure
      aria-label="Sample pipeline: conditional cancer staging extraction with breast cancer biomarker branch"
      className="rounded-xl border p-5"
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="space-y-4">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut', delay: 0 } },
          }}
        >
          <PipelineNodeCard node={NODES[0]} />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut', delay: 0.2 } },
          }}
        >
          <ConditionalArrow />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut', delay: 0.4 } },
          }}
        >
          <PipelineNodeCard node={NODES[1]} />
        </motion.div>
      </div>
    </motion.figure>
  );
}
