import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";

/**
 * Ordmärket: märket + "TaggaDet" i Marcellus.
 *
 * Ersätter de två kopior som fanns i SiteHeader och SiteFooter. De hade
 * divergerat i tre parametrar — baseline mot center, gap-1 mot gap-2, sepia mot
 * guld — utan någon delad källa, så varje ändring måste göras två gånger och
 * blev lätt olika.
 *
 * Hjärtat är borta härifrån med flit. Det bar två betydelser samtidigt,
 * varumärkesornament och önskelista, och är nu enbart önskelistans ikon.
 *
 * font-semibold är också borta: Marcellus finns bara i vikt 400, och
 * .font-serif sätter font-weight: 400 oskiktat i styles.css. Klassen gjorde
 * alltså ingenting — men satt på sajtens mest sedda element.
 *
 * Storleken är en prop och inte en className, eftersom två Tailwind-klasser för
 * samma egenskap avgörs av ordningen i stilmallen och inte i klassattributet —
 * en överskrivning via className vore opålitlig.
 */
const SIZES = {
  md: { text: "text-2xl", mark: "h-6 w-6" },
  lg: { text: "text-3xl", mark: "h-7 w-7" },
} as const;

export function Wordmark({
  size = "md",
  className,
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    // items-center, inte items-baseline: märket är symmetriskt, och med baseline
    // hamnar dess underkant på textbaslinjen så att det sticker upp ovanför
    // versalhöjden i stället för att sitta optiskt centrerat.
    <span className={cn("flex items-center gap-2", className)}>
      <BrandMark className={cn("shrink-0", s.mark)} />
      <span className={cn("font-serif tracking-tight", s.text)}>TaggaDet</span>
    </span>
  );
}
