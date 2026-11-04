import { cn } from "@/lib/utils";
import taggMark from "@/assets/tagg-mark.png";
import taggMarkGold from "@/assets/tagg-mark-gold.png";

/**
 * Ordmärket: taggmärket + "Taggat" i Marcellus.
 *
 * Märket är den graverade taggen (koncept 2, okt 2026). Sepia-versionen sitter
 * på ljusa ytor (headern), gulden på mörka (sidfotens ink-yta och hero:n) –
 * en bild kan inte ärva textfärg, därför väljs varianten med en prop i stället
 * för via CSS-färg.
 *
 * Hjärtat och font-semibold har borta sedan tidigare: hjärtat var bara
 * önskelistans ikon, och Marcellus finns bara i vikt 400.
 *
 * Storleken är en prop och inte en className, eftersom två Tailwind-klasser för
 * samma egenskap avgörs av ordningen i stilmallen och inte i klassattributet —
 * en överskrivning via className vore opålitlig.
 */
const SIZES = {
  md: { text: "text-2xl", mark: "h-8 w-8" },
  lg: { text: "text-3xl", mark: "h-10 w-10" },
} as const;

export function Wordmark({
  size = "md",
  tone = "sepia",
  className,
}: {
  size?: keyof typeof SIZES;
  tone?: "sepia" | "gold";
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <span className={cn("flex items-center gap-2", className)}>
      {/* Dekorativt: texten bredvid bär redan betydelsen, så bilden är alt-tom. */}
      <img
        src={tone === "gold" ? taggMarkGold : taggMark}
        alt=""
        width={512}
        height={512}
        decoding="async"
        loading="lazy"
        className={cn("shrink-0", s.mark)}
      />
      <span className={cn("font-serif tracking-tight", s.text)}>Taggat</span>
    </span>
  );
}
