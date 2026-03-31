import { useState, useEffect, useRef } from 'react';

const NAME = 'Youngbin Kim';
const TITLE = 'LLM Engineer / Data Scientist (Clinical AI)';
const CHAR_DELAY = 80;
const VARIANCE = 20;
const LINE_PAUSE = 400;

export default function TerminalHero() {
  const [nameIndex, setNameIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [phase, setPhase] = useState<'name' | 'pause' | 'title' | 'done'>('name');
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect prefers-reduced-motion on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setNameIndex(NAME.length);
      setTitleIndex(TITLE.length);
      setPhase('done');
    }
  }, []);

  // Typing animation
  useEffect(() => {
    if (reducedMotion) return;

    if (phase === 'name') {
      if (nameIndex < NAME.length) {
        const delay = CHAR_DELAY + (Math.random() * 2 - 1) * VARIANCE;
        timerRef.current = setTimeout(() => setNameIndex((i) => i + 1), delay);
      } else {
        setPhase('pause');
      }
    } else if (phase === 'pause') {
      timerRef.current = setTimeout(() => setPhase('title'), LINE_PAUSE);
    } else if (phase === 'title') {
      if (titleIndex < TITLE.length) {
        const delay = CHAR_DELAY + (Math.random() * 2 - 1) * VARIANCE;
        timerRef.current = setTimeout(() => setTitleIndex((i) => i + 1), delay);
      } else {
        setPhase('done');
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [nameIndex, titleIndex, phase, reducedMotion]);

  const showCta = phase === 'done';

  return (
    <section
      className="text-center md:text-left"
      aria-label={`${NAME} — ${TITLE}`}
    >
      {/* Visually hidden full text for SEO/screen readers */}
      <h1 className="sr-only">{NAME}</h1>
      <p className="sr-only">{TITLE}</p>

      {/* Animated visual (hidden from screen readers) */}
      <div aria-hidden="true">
        <p className="text-[var(--color-text)] text-[28px] md:text-[32px] lg:text-[40px] font-bold leading-[1.15] tracking-[-0.02em]">
          <span>{NAME.slice(0, nameIndex)}</span>
          {phase === 'name' && (
            <span
              className="inline-block animate-blink"
              style={{ color: 'var(--color-accent)' }}
            >
              █
            </span>
          )}
        </p>

        <p className="font-mono text-sm md:text-base text-[var(--color-text-muted)] mt-4 tracking-[0.04em]">
          <span>{TITLE.slice(0, titleIndex)}</span>
          {(phase === 'title' || phase === 'pause' || phase === 'done') && (
            <span
              className="inline-block animate-blink"
              style={{ color: 'var(--color-accent)' }}
            >
              █
            </span>
          )}
        </p>
      </div>

      {/* CTA button */}
      <a
        href="#projects"
        className="inline-block mt-8 font-mono text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-200 border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)] px-6 py-3 rounded"
        style={{
          opacity: showCta ? 1 : 0,
          transition: reducedMotion ? 'none' : 'opacity 500ms ease',
        }}
        tabIndex={showCta ? 0 : -1}
      >
        View my work
      </a>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.06s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blink {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
