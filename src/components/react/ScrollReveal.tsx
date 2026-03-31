import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(2px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // Reduced motion: render children directly with no animation wrappers
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: itemVariants.hidden,
        visible: {
          ...itemVariants.visible,
          transition: {
            ...itemVariants.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
