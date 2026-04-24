"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations("Nav");
  const locale = useLocale();

  const menuLinks = [
    { id: "women", href: "/shop?cat=women", labelKey: "women" },
    { id: "men", href: "/shop?cat=men", labelKey: "men" },
    { id: "kids", href: "/shop?cat=kids", labelKey: "kids" },
    { id: "designers", href: "/designers", labelKey: "designers" },
    { id: "styling", href: "/styling", labelKey: "styling" },
    { id: "about", href: "/about", labelKey: "us" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-brand-off-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-brand-stone/20">
              <span className="font-display text-xl tracking-[4px]">BY GOLDENBOY</span>
              <button onClick={onClose} className="p-2">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-12 space-y-12">
              <div className="space-y-8">
                {menuLinks.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link 
                      href={`/${locale}${link.id === 'about' ? '/about' : link.id === 'designers' ? '/designers' : link.id === 'styling' ? '/styling' : '/shop' + (link.href.includes('?') ? link.href.split('/shop')[1] : '')}`}
                      onClick={onClose}
                      className="text-3xl font-display uppercase tracking-tight hover:text-brand-gold transition-colors block"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-20 border-t border-brand-stone/20 space-y-8 mt-auto">
                 <div className="flex space-x-8">
                    <a href="#" className="label-decorative text-[10px] tracking-[4px] uppercase font-bold">Instagram</a>
                    <a href="#" className="label-decorative text-[10px] tracking-[4px] uppercase font-bold">WhatsApp</a>
                 </div>
                 <p className="text-[10px] font-body text-brand-graphite opacity-50 uppercase tracking-[2px]">
                   © 2026 BY GOLDENBOY CONCEPT STORE
                 </p>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
