import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrollSection({ children, className = "", id }: ScrollSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      }}
    >
      {children}
    </motion.section>
  );
}

