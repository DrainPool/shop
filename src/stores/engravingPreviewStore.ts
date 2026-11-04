import { create } from "zustand";
import type { CSSProperties } from "react";

/**
 * Delar gravyrtexten från formuläret med produktbilden, så att kunden ser
 * texten direkt på produkten medan den skrivs. Ingen persist – rensas per sida.
 */
interface EngravingPreviewState {
  line1: string;
  line2: string;
  fontStyle: CSSProperties | undefined;
  set: (p: Partial<Omit<EngravingPreviewState, "set">>) => void;
}

export const useEngravingPreview = create<EngravingPreviewState>((set) => ({
  line1: "",
  line2: "",
  fontStyle: undefined,
  set: (p) => set(p),
}));
