import { Droplets, Layers } from "lucide-react";
import type { ProductSpec } from "@/lib/productSpecs";

/**
 * Material- och skötselband på produktsidan. Texterna kommer från
 * PRODUCT_SPECS via produkttypens tagg – ärlighetsprincipen gäller:
 * typnivåtext, inga påhittade mått per produkt (exakta mått står i
 * varje produktbeskrivning, vilket raden under bandet påminner om).
 */
export function SpecBand({ spec }: { spec: ProductSpec }) {
  return (
    <div className="mt-8 grid grid-flow-dense gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-border/70 bg-cream p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <Layers className="h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
          Material
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">{spec.material}</p>
      </div>
      <div className="rounded-xl border border-border/70 bg-cream p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <Droplets className="h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
          Skötsel
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">{spec.skotsel}</p>
      </div>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        Texterna gäller hela produktgruppen – exakta mått för just din variant står i
        produktbeskrivningen. Skriv till mig om du undrar, så mäter jag efter.
      </p>
    </div>
  );
}
