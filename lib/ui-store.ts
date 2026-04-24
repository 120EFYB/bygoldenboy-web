import { create } from 'zustand';
import { Product } from '@/types/product';

interface UIState {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  wishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  
  quickViewOpen: boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  sizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),

  wishlistOpen: false,
  openWishlist: () => set({ wishlistOpen: true }),
  closeWishlist: () => set({ wishlistOpen: false }),

  quickViewOpen: false,
  quickViewProduct: null,
  openQuickView: (product) => set({ quickViewOpen: true, quickViewProduct: product }),
  closeQuickView: () => set({ quickViewOpen: false, quickViewProduct: null }),

  sizeGuideOpen: false,
  openSizeGuide: () => set({ sizeGuideOpen: true }),
  closeSizeGuide: () => set({ sizeGuideOpen: false }),
}));
