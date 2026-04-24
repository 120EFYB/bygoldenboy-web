"use client";

import React from "react";
import { FEATURED_DESIGNERS } from "@/types/product";

/**
 * Brand Marquee Section
 * Infinite scrolling marquee with brand names separated by diamonds
 */
export const BrandMarquee = () => {
  // Use a longer list to ensure the marquee fills the width and loops smoothly
  const brands = [...FEATURED_DESIGNERS, ...FEATURED_DESIGNERS, ...FEATURED_DESIGNERS];

  return (
    <section className="py-12 bg-white border-b border-brand-stone/20 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {brands.map((brand, idx) => (
          <div key={`${brand}-${idx}`} className="flex items-center">
            <span className="text-[10px] tracking-[6px] uppercase font-accent opacity-60 text-brand-black">
              {brand}
            </span>
            <span className="mx-16 text-brand-gold opacity-50 text-xs">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
};
