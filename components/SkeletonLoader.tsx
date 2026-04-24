"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Premium Shimmer Skeleton for Product Cards
 */
export const ProductSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Image box */}
      <div className="relative aspect-[3/4] bg-brand-stone/10 border border-brand-stone/20 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </div>
      
      {/* Brand & Name placeholders */}
      <div className="space-y-3">
        <div className="h-2 w-1/4 bg-brand-stone/20 rounded-full overflow-hidden relative">
           <motion.div
             animate={{ x: ["-100%", "100%"] }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.1 }}
             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
           />
        </div>
        <div className="h-4 w-3/4 bg-brand-stone/10 rounded-sm overflow-hidden relative">
           <motion.div
             animate={{ x: ["-100%", "100%"] }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
           />
        </div>
        <div className="h-3 w-1/3 bg-brand-stone/10 rounded-sm overflow-hidden relative">
           <motion.div
             animate={{ x: ["-100%", "100%"] }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.3 }}
             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
           />
        </div>
      </div>
    </div>
  );
};

/**
 * Grid of skeletons to match the shop layout
 */
export const ShopSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};
