import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  size: string;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  addItems: (items: CartItem[]) => void;
  removeItem: (id: number, size: string) => void;
  updateQty: (id: number, size: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.id === newItem.id && item.size === newItem.size
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === newItem.id && item.size === newItem.size
                ? { ...item, qty: item.qty + newItem.qty }
                : item
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },
      addItems: (newItems) => {
        const currentItems = get().items;
        let updatedItems = [...currentItems];
        
        newItems.forEach(newItem => {
            const existing = updatedItems.find(i => i.id === newItem.id && i.size === newItem.size);
            if (existing) {
                updatedItems = updatedItems.map(i => 
                    i.id === newItem.id && i.size === newItem.size ? { ...i, qty: i.qty + newItem.qty } : i
                );
            } else {
                updatedItems.push(newItem);
            }
        });
        
        set({ items: updatedItems });
      },
      removeItem: (id, size) => {
        set({
          items: get().items.filter((item) => !(item.id === id && item.size === size)),
        });
      },
      updateQty: (id, size, qty) => {
        if (qty < 1) {
          get().removeItem(id, size);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size ? { ...item, qty } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.qty, 0);
      },
      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.qty, 0);
      },
    }),
    {
      name: 'bg-cart-storage',
    }
  )
);
