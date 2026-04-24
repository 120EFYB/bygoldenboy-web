"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FEATURED_DESIGNERS, DESIGNERS, CATEGORIES } from "@/types/product";

interface MegaMenuProps {
  type: string;
  onClose: () => void;
}

/**
 * MegaMenu component for high-end navigation
 * As per CLAUDE.md: 3 columns for categories, 2 for designers
 */
export const MegaMenu = ({ type, onClose }: MegaMenuProps) => {
  const locale = useLocale();

  if (type === "designers") {
    // Designer Panel (2 columns)
    return (
      <div className="grid grid-cols-2 gap-12 max-h-[70vh]">
        {/* Col 1: Featured Designers */}
        <div>
          <h3 className="label-decorative mb-10 border-b border-brand-stone pb-2">Featured</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {FEATURE_DESIGNERS_LIST.map((designer) => (
              <Link
                key={designer}
                href={`/${locale}/shop?designer=${designer}`}
                className="text-xs hover:text-brand-gold transition-colors font-medium tracking-wide"
                onClick={onClose}
              >
                {designer}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 2: A-Z Full List */}
        <div className="border-l border-brand-stone/30 pl-12 overflow-y-auto scrollbar-hide pr-4">
          <h3 className="label-decorative mb-10 border-b border-brand-stone pb-2">All Brands A-Z</h3>
          <div className="grid grid-cols-3 gap-y-4 gap-x-4">
            {DESIGNERS.sort((a, b) => a.name.localeCompare(b.name)).map((designer) => (
              <Link
                key={designer.name}
                href={`/${locale}/shop?designer=${designer.name}`}
                className="text-[10px] hover:text-brand-gold transition-colors opacity-70 hover:opacity-100 tracking-wider"
                onClick={onClose}
              >
                {designer.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Category Panels (Women, Men, Kids) - 3 columns
  return (
    <div className="grid grid-cols-3 gap-12">
      {/* Col 1: Categories */}
      <div>
        <h3 className="label-decorative mb-10 border-b border-brand-stone pb-2">Categories</h3>
        <ul className="space-y-5">
          {CATEGORIES.slice(1).map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/${locale}/shop?cat=${cat.id}`}
                className="text-sm hover:text-brand-gold transition-colors font-body tracking-wide"
                onClick={onClose}
              >
                {locale === "es" ? cat.label.es : cat.label.en}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 2: Featured Brands in this category */}
      <div>
        <h3 className="label-decorative mb-10 border-b border-brand-stone pb-2">Featured Brands</h3>
        <ul className="space-y-5">
          {FEATURED_DESIGNERS.slice(0, 6).map((designer) => (
            <li key={designer}>
              <Link
                href={`/${locale}/shop?designer=${designer}`}
                className="text-sm hover:text-brand-gold transition-colors font-body tracking-wide"
                onClick={onClose}
              >
                {designer}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 3: Editorial CTA */}
      <div className="bg-brand-stone/10 p-12 flex flex-col justify-center items-center text-center border border-brand-stone/20">
        <span className="label-decorative mb-3 text-[8px] opacity-70">Editorial</span>
        <h2 className="text-3xl font-display font-light mb-8 leading-tight">
          Modern <br /> Heritage
        </h2>
        <Link 
          href={`/${locale}/shop?cat=${type}`}
          className="px-10 py-4 bg-brand-black text-brand-off-white text-[9px] tracking-[5px] uppercase hover:bg-brand-gold transition-all duration-500 shadow-md transform hover:-translate-y-1"
          onClick={onClose}
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
};

// Helper list for featured designers in the menu
const FEATURE_DESIGNERS_LIST = [
  "Golden Goose", "Saint Laurent", "Maison Margiela", "Valentino Garavani", 
  "Goyard", "Bottega Veneta", "Alexander McQueen", "Off-White", "Jacquemus", "The Row"
];
