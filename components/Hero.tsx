"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Cinematic Hero Section
 * As per CLAUDE.md: centered, B&W background (grayscale), staggered text reveal
 * Phase 10: Integrated Parallax and Opacity Scroll
 */
export const Hero = () => {
  const t = useTranslations("Home");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Animation variants for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Image with Parallax & Opacity Fade */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop"
          alt="By Goldenboy Editorial"
          fill
          priority
          className="object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-off-white/20 via-transparent to-brand-off-white" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-20 text-center px-6 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="label-decorative text-[9px] tracking-[6px] opacity-70">
            Premium Fashion Import
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-[clamp(3.5rem,10vw,7rem)] font-display text-white leading-[0.9] tracking-[-0.03em] mb-8"
        >
          {t("title")}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="font-accent italic text-brand-gold text-[clamp(1rem,2vw,1.15rem)] tracking-[8px] uppercase mb-16"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div variants={itemVariants}>
          <button className="group relative px-14 py-5 bg-white text-brand-black text-[10px] tracking-[6px] uppercase overflow-hidden transition-all duration-700 shadow-2xl transform hover:-translate-y-1">
            <span className="relative z-10">{t("discover")}</span>
            <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-premium" />
          </button>
        </motion.div>
      </motion.div>

      {/* Premium Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="label-decorative text-[7px] rotate-90 mb-8 opacity-40">Scroll</span>
        <div className="w-[0.5px] h-20 bg-gradient-to-b from-brand-gold to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-brand-gold"
            animate={{ 
              y: ["0%", "100%"],
              opacity: [1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "linear" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
