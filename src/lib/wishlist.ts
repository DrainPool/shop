import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "onskelista";

export interface WishItem {
  handle: string;
  title: string;
  image?: string | undefined;
  price: string;
  currency: string;
}

function read(): WishItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: WishItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* localStorage kan vara blockerad – då hoppar vi över */
  }
  // Synka andra flikar
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

/**
 * Önskelista – sparar produktsnapshots i localStorage (samma mönster som
 * RecentlyViewed). Överlever sidladdning, synkas mellan flikar.
 */
export function useWishlist() {
  const [items, setItems] = useState<WishItem[]>(() => read());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isInWishlist = useCallback(
    (handle: string) => items.some((p) => p.handle === handle),
    [items],
  );

  const toggle = useCallback((item: WishItem) => {
    const current = read();
    const exists = current.some((p) => p.handle === item.handle);
    const next = exists
      ? current.filter((p) => p.handle !== item.handle)
      : [item, ...current].slice(0, 24);
    write(next);
    setItems(next);
    return !exists; // true = nu sparad
  }, []);

  const remove = useCallback((handle: string) => {
    const next = read().filter((p) => p.handle !== handle);
    write(next);
    setItems(next);
  }, []);

  return { items, isInWishlist, toggle, remove };
}
