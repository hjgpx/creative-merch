import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
  };
}

interface StoreState {
  sessionId: string;
  cartItems: CartItem[];
  cartOpen: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  sortBy: string;
  
  setSessionId: (sessionId: string) => void;
  setCartItems: (items: CartItem[]) => void;
  setCartOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSortBy: (sortBy: string) => void;
  
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      sessionId: Math.random().toString(36).substring(7),
      cartItems: [],
      cartOpen: false,
      searchQuery: '',
      selectedCategory: null,
      sortBy: '',
      
      setSessionId: (sessionId) => set({ sessionId }),
      setCartItems: (cartItems) => set({ cartItems }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSortBy: (sortBy) => set({ sortBy }),
      
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => 
          total + (parseFloat(item.product.price) * item.quantity), 0
        );
      },
      
      getCartItemCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'creative-store',
      partialize: (state) => ({ 
        sessionId: state.sessionId,
        searchQuery: state.searchQuery,
        selectedCategory: state.selectedCategory,
        sortBy: state.sortBy
      }),
    }
  )
);
