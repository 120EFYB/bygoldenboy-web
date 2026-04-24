"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { FEATURED_DESIGNERS } from "@/types/product";

/**
 * AboutContent Component
 * Implements the 7 editorial sections described in CLAUDE.md
 */
export const AboutContent = () => {
  const t = useTranslations("About");

  return (
    <div className="space-y-40 pb-40">
      {/* 1. Hero Section - Fullwidth Typography */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-black">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Interior"
            fill
            className="object-cover grayscale"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="label-decorative text-brand-gold mb-6 block tracking-[10px]">By Goldenboy</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-8xl font-display text-brand-off-white uppercase tracking-tight max-w-5xl leading-[0.9]">
              {t("heroTitle")}
            </h1>
          </Reveal>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
           <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold to-transparent animate-scroll-line" />
        </div>
      </section>

      {/* 2. Mission Section - Editorial Text */}
      <section className="container mx-auto px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="label-decorative text-brand-gold mb-12 tracking-[6px]">{t("mission.title")}</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-3xl md:text-5xl font-display leading-[1.2] text-brand-black mb-16 italic">
              &quot;{t("mission.text")}&quot;
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="h-[0.5px] w-24 bg-brand-gold mx-auto" />
          </Reveal>
        </div>
      </section>

      {/* 3. Pillars - How it works */}
      <section className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {[
            { id: "01", title: t("pillars.01.title"), text: t("pillars.01.text") },
            { id: "02", title: t("pillars.02.title"), text: t("pillars.02.text") },
            { id: "03", title: t("pillars.03.title"), text: t("pillars.03.text") }
          ].map((pillar, idx) => (
            <Reveal key={pillar.id} delay={idx * 0.2}>
              <div className="space-y-8 group">
                <span className="text-6xl font-display text-brand-gold opacity-20 group-hover:opacity-100 transition-opacity duration-700">{pillar.id}</span>
                <h3 className="text-xl font-medium uppercase tracking-[4px]">{pillar.title}</h3>
                <p className="text-brand-graphite font-body leading-[1.8] text-sm">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Editorial Break - Image Overlay */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=1974&auto=format&fit=crop"
            alt="European Boutique"
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-brand-black/20" />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <Reveal>
            <div className="bg-brand-off-white/90 backdrop-blur-md p-12 md:p-20 max-w-2xl border-l-[6px] border-brand-gold">
               <h3 className="text-4xl font-display mb-8">Good taste. Imported style.</h3>
               <p className="text-sm font-body leading-relaxed opacity-70">
                 No vendemos ropa. Vendemos la versión de ti que siempre quisiste ser. By Goldenboy es el puente entre las pasarelas de Milán y tu armario personal.
               </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Metrics - Trust Signals */}
      <section className="container mx-auto px-8 bg-brand-cream py-32 border-y border-brand-stone/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <Reveal>
            <div className="space-y-4">
              <p className="text-6xl font-display">30+</p>
              <p className="label-decorative text-[10px] tracking-[4px] opacity-60 uppercase">{t("metrics.boutiques")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-4">
              <p className="text-6xl font-display">6+</p>
              <p className="label-decorative text-[10px] tracking-[4px] opacity-60 uppercase">{t("metrics.countries")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="space-y-4">
              <p className="text-6xl font-display">100%</p>
              <p className="label-decorative text-[10px] tracking-[4px] opacity-60 uppercase">{t("metrics.authentic")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Marcas que importamos - Logo Grid */}
      <section className="container mx-auto px-8">
        <Reveal>
          <h2 className="label-decorative text-center mb-24 opacity-40 tracking-[8px]">Curaduría de Diseñadores</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 sm:gap-20">
          {FEATURED_DESIGNERS.map((brand, idx) => (
            <Reveal key={brand} delay={idx * 0.1}>
              <div className="text-center grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-default">
                <span className="text-[10px] tracking-[4px] uppercase font-accent">{brand}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Vision Section - Dark */}
      <section className="bg-brand-black pt-40 pb-60 text-brand-off-white text-center px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-display mb-12 uppercase tracking-tight">{t("vision.title")}</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg md:text-2xl font-light leading-[2] opacity-80 mb-20 max-w-3xl mx-auto">
              {t("vision.text")}
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="relative inline-block px-12 py-6 border border-brand-gold/30 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 text-[9px] tracking-[6px] uppercase font-bold group-hover:text-brand-black transition-colors duration-700">
                Ecosistema 120+
              </span>
            </div>
          </Reveal>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-20 left-10 text-[200px] font-display opacity-[0.02] select-none text-brand-gold">BG</div>
        <div className="absolute top-40 right-10 text-[100px] font-display opacity-[0.02] select-none text-brand-gold italic">Luxe</div>
      </section>
    </div>
  );
};
