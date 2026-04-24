"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "./Reveal";
import { DESIGNERS, FEATURED_DESIGNERS } from "@/types/product";
import { cn } from "@/lib/utils";

/**
 * DesignersContent Component
 * A-Z Directory with Alphabet Navigation and Featured Brands
 */
export const DesignersContent = () => {
  const t = useTranslations("Designers");
  const locale = useLocale();

  // Group designers by first letter
  const groupedDesigners = useMemo(() => {
    const groups: Record<string, string[]> = {};
    
    DESIGNERS.sort((a, b) => a.name.localeCompare(b.name)).forEach((designer) => {
      const firstLetter = designer.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(designer.name);
    });
    
    return groups;
  }, []);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const activeLetters = Object.keys(groupedDesigners);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      const offset = 120; // Navbar + Alphabet Nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="pb-40">
      {/* 1. Hero Section */}
      <section className="pt-40 pb-20 text-center border-b border-brand-stone/20">
        <Reveal>
          <span className="label-decorative text-brand-gold mb-6 block tracking-[8px]">Curaduría</span>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tight mb-8">
            {t("heroTitle")}
          </h1>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-accent italic text-brand-graphite/60 tracking-[4px] uppercase max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </Reveal>
      </section>

      {/* 2. Featured Designers Grid */}
      <section className="container mx-auto px-8 py-32 border-b border-brand-stone/10">
        <Reveal>
          <h2 className="label-decorative text-center mb-24 opacity-40 tracking-[8px] uppercase text-xs">
            {t("featured")}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-24 gap-x-12">
          {FEATURED_DESIGNERS.map((brand, idx) => (
            <Reveal key={brand} delay={idx * 0.1}>
              <Link 
                href={`/${locale}/shop?brand=${encodeURIComponent(brand)}`}
                className="group block text-center"
              >
                <div className="mb-6 relative aspect-square bg-white border border-brand-stone/20 overflow-hidden flex items-center justify-center p-8 transition-all duration-700 group-hover:border-brand-gold/50">
                   {/* Placeholder for brand logo or initials since we don't have all assets */}
                   <span className="text-3xl font-display opacity-10 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000">
                     {brand.charAt(0)}
                   </span>
                </div>
                <span className="text-[10px] tracking-[4px] uppercase font-bold group-hover:text-brand-gold transition-colors duration-500">
                  {brand}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Alphabet Navigation Bar (Sticky) */}
      <nav className="sticky top-20 z-30 bg-brand-off-white/90 backdrop-blur-md border-b border-brand-stone/30 py-6 transition-all duration-500">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {alphabet.map((letter) => {
              const hasDesigners = activeLetters.includes(letter);
              return (
                <button
                  key={letter}
                  onClick={() => hasDesigners && scrollToLetter(letter)}
                  disabled={!hasDesigners}
                  className={cn(
                    "text-[10px] font-bold tracking-[2px] transition-all duration-300",
                    hasDesigners 
                      ? "text-brand-black hover:text-brand-gold cursor-pointer" 
                      : "text-brand-stone opacity-20 cursor-not-allowed"
                  )}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 4. Full A-Z List */}
      <section className="container mx-auto px-8 py-32">
        <Reveal>
          <h2 className="label-decorative mb-24 opacity-40 tracking-[8px] uppercase text-xs">
            {t("all")}
          </h2>
        </Reveal>
        
        <div className="space-y-32">
          {activeLetters.sort().map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-40">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-brand-stone/30 pt-16">
                <div className="md:col-span-2">
                  <span className="text-7xl font-display text-brand-gold opacity-30 select-none">{letter}</span>
                </div>
                <div className="md:col-span-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                    {groupedDesigners[letter].map((name) => (
                      <Reveal key={name}>
                        <Link 
                          href={`/${locale}/shop?brand=${encodeURIComponent(name)}`}
                          className="group flex items-center space-x-4 py-2"
                        >
                          <span className="w-0 group-hover:w-4 h-[1px] bg-brand-gold transition-all duration-300" />
                          <span className="text-sm font-light uppercase tracking-widest group-hover:text-brand-gold transition-colors duration-300">
                            {name}
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
