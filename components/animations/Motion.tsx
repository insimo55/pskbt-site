// components/animations/Motion.tsx
'use client';

import React, { PropsWithChildren } from 'react';
import { motion, Variants } from 'framer-motion';

type BaseProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

export function StaggerContainer({ className, children }: BaseProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function FadeInUp({ className, children, delay }: BaseProps) {
  const customVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.35, ease: 'easeOut', delay: delay || 0 } 
    }
  };
  
  return (
    <motion.div className={className} variants={customVariants}>
      {children}
    </motion.div>
  );
}







