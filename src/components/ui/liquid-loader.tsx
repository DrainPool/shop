import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const SIZES = { sm: 28, md: 48, lg: 88 } as const;

export type LiquidLoaderSize = keyof typeof SIZES;
export type LiquidLoaderVariant = "sepia" | "light" | "dark";

export interface LiquidLoaderProps {
  size?: LiquidLoaderSize;
  variant?: LiquidLoaderVariant;
  label?: string;
  className?: string;
}

/**
 * Flytande "blob"-laddindikator, klädd i butikens sepia-palett.
 * Anpassad från "Morphing Blob Loader" (21st.dev / elements-, MIT-licens):
 * motion/react-animationen är omskriven till ren CSS (keyframes i styles.css,
 * .liquid-loader-blob) och respekterar prefers-reduced-motion där.
 */
const VARIANT_VARS: Record<LiquidLoaderVariant, Record<string, string>> = {
  // sepia är standardton och sätts i styles.css
  sepia: {},
  light: {
    // för gula/mörka ytor, t.ex. Till kassan-knappen
    "--liquid-loader-a": "var(--color-cream)",
    "--liquid-loader-b": "color-mix(in oklab, var(--color-cream) 75%, var(--color-muted))",
  },
  dark: {
    "--liquid-loader-a": "var(--color-ink)",
    "--liquid-loader-b": "color-mix(in oklab, var(--color-ink) 70%, var(--color-gold))",
  },
};

export function LiquidLoader({
  size = "md",
  variant = "sepia",
  label = "Laddar",
  className,
}: LiquidLoaderProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      data-slot="liquid-loader"
      className={cn("relative inline-block shrink-0", className)}
      style={
        {
          width: SIZES[size],
          height: SIZES[size],
          ...VARIANT_VARS[variant],
        } as CSSProperties
      }
    >
      <span className="sr-only">{label}</span>
      <span className="liquid-loader-blob absolute inset-0" aria-hidden="true" />
    </span>
  );
}

export default LiquidLoader;