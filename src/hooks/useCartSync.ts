import { useEffect, useRef } from "react";
import { useCartStore } from "@/stores/cartStore";

/**
 * Håller kundvagnen synkad mot Shopify (mount + när fliken kommer tillbaka
 * i förgrunden). Varje sync är ett API-anrop, så vi stryper: en sync per
 * minut räcker gott – snabba flikväxlingar ska inte generera en körbildning
 * av förfrågningar (och i demoläget gör syncCart ändå inga nätverksanrop).
 */
const SYNC_INTERVAL_MS = 60_000;

export function useCartSync() {
  const syncCart = useCartStore((state) => state.syncCart);
  const lastSyncRef = useRef(0);

  useEffect(() => {
    const maybeSync = () => {
      if (Date.now() - lastSyncRef.current < SYNC_INTERVAL_MS) return;
      lastSyncRef.current = Date.now();
      syncCart();
    };

    // Första mounten synkar alltid – ref börjar på 0.
    maybeSync();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") maybeSync();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [syncCart]);
}
