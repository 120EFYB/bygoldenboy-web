"use client";

import React from "react";
import { Reveal } from "./Reveal";
import { useTranslations } from "next-intl";

/**
 * Brand Statement Section
 * As per CLAUDE.md: comilla decorativa gigante semi-transparente, editorial style
 */
export const Statement = () => {
  const t = useTranslations("Home");

  return (
    <section className="py-40 bg-brand-off-white overflow-hidden relative border-b border-brand-stone/10">
      {/* Giant Decorative Quote Mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.04] text-brand-gold font-display text-[600px] leading-none select-none">
        &ldquo;
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex flex-col items-center">
              <span className="label-decorative mb-12">Filosofía de Marca</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.4} duration={1.5} width="100%">
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-display text-brand-black leading-[1.1] tracking-tight">
              {t("statement")}
            </h2>
          </Reveal>
          
          <Reveal delay={0.7}>
            <div className="mt-20 flex flex-col items-center">
              <div className="w-24 h-[0.5px] bg-brand-gold" />
              <p className="mt-10 font-accent italic text-brand-graphite/40 text-xs tracking-widest uppercase">
                Established 2026
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
