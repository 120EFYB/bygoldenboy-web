"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/ui-store";
import { useCartStore } from "@/lib/cart";
import { useWishlistStore } from "@/lib/wishlist-store";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { id: "women", href: "/shop?cat=women", labelKey: "women" },
  { id: "men", href: "/shop?cat=men", labelKey: "men" },
  { id: "kids", href: "/shop?cat=kids", labelKey: "kids" },
  { id: "designers", href: "/designers", labelKey: "designers" },
  { id: "styling", href: "/styling", labelKey: "styling" },
  { id: "about", href: "/about", labelKey: "us" },
];

export const Navbar = () => {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openCart = useUIStore((state) => state.openCart);
  const openWishlist = useUIStore((state) => state.openWishlist);
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishItemCount = useWishlistStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logo transformation and backdrop
      setIsScrolled(currentScrollY > 80);

      // Hide/Show navbar logic
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleLocale = () => {
    const newLocale = locale === "es" ? "en" : "es";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath || `/${newLocale}`);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled ? "bg-brand-off-white/80 backdrop-blur-md border-b border-brand-stone/30" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* LEFT: Mobile Menu Toggle and Desktop Nav */}
        <div className="flex items-center space-x-6 lg:space-x-0">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1 hover:text-brand-gold transition-colors"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          
          <nav className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={`/${locale}${link.id === 'about' ? '/about' : link.id === 'designers' ? '/designers' : '/shop'}`}
              className="text-[11px] uppercase tracking-[2px] font-accent hover:text-brand-gold transition-colors"
              onMouseEnter={() => setActiveMenu(link.id)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          </nav>
        </div>

        {/* CENTER: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link href={`/${locale}`} className="relative h-12 flex items-center">
            <AnimatePresence mode="wait">
              {!isScrolled ? (
                <motion.span
                  key="full-logo"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-2xl tracking-[4px] whitespace-nowrap"
                >
                  BY GOLDENBOY
                </motion.span>
              ) : (
                <motion.span
                  key="short-logo"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-2xl tracking-[6px]"
                >
                  BG
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center space-x-6">
          <button className="p-1 hover:text-brand-gold transition-colors">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={openWishlist}
            className="relative hidden sm:block p-1 group transition-colors"
          >
            <HeartIcon className="w-5 h-5 group-hover:text-brand-gold" />
            {wishItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishItemCount}
              </span>
            )}
          </button>
          <button className="hidden sm:block p-1 hover:text-brand-gold transition-colors">
            <UserIcon className="w-5 h-5" />
          </button>
          
          <button 
            onClick={toggleLocale}
            className="text-[10px] font-accent tracking-widest hover:text-brand-gold transition-colors border border-brand-stone/60 px-2 py-1 rounded-sm"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>

          <button 
            onClick={openCart}
            className="relative p-1 group transition-colors"
          >
            <BagIcon className="w-5 h-5 group-hover:text-brand-gold" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {activeMenu && activeMenu !== 'about' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-brand-off-white border-b border-brand-stone/30 shadow-2xl z-40 overflow-hidden"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-12 py-16">
              <MegaMenu type={activeMenu} onClose={() => setActiveMenu(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

// Icons (SVG inline as requested in CLAUDE.md)
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="8" x2="20" y2="8" />
    <line x1="4" y1="16" x2="20" y2="16" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M9 10a3 3 0 0 0 6 0" />
  </svg>
);
