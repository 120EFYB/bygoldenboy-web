"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  y?: number;
}

/**
 * Reusable animation wrapper for scrolls
 * As per CLAUDE.md: opacity 0→1 and translateY 50→0
 */
export const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0.2,
  duration = 0.8,
  y = 50 
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: y },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ 
          duration, 
          delay, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
