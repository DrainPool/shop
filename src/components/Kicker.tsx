import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Den kanoniska accentraden ("kickern") — den lilla versala raden ovanför en
 * rubrik, t.ex. "så jobbar jag" eller "bra att veta".
 *
 * Klassen `font-inscription` gör tre saker (se `styles.css`): sätter Marcellus,
 * versaler och spärrning. Den visas alltså redan versal, så texten skrivs i
 * vanlig mening — skriv inte VERSALER i koden, och sätt ingen `tracking-*`
 * (spärrningen är redan satt och en `tracking-*` vore död).
 *
 * Komponenten finns för att strängen `font-inscription text-sm text-primary-deep
 * md:text-base` stod ordagrant på 34 ställen. Avvikarna är avsiktliga och bor
 * kvar där de är: fem kickers på mörk botten använder `text-gold` i stället för
 * `text-primary-deep`, tre trånga kort använder `text-xs`/`text-[11px]`, och
 * `HomeHero` sätter färgen via `.gold-accent` och bär `hero-rise`.
 *
 * Radavstånd och marginal sätts av anroparen via `className` — kickern har
 * ingen egen åsikt om var den sitter.
 */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-inscription text-sm text-primary-deep md:text-base", className)}>
      {children}
    </p>
  );
}
