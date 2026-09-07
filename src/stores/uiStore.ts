import { create } from "zustand";

/**
 * Efemärt UI-tillstånd som delas mellan komponenter:
 * varukorg och sök kan öppnas inifrån andra komponenter
 * (t.ex. toastens "Öppna varukorgen" eller ⌘K för sök).
 */
interface UiStore {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
}));
