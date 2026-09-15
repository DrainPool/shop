import { PricingBlock } from "@/components/PricingBlock";
import type { Category } from "@/lib/categories";
import { Kicker } from "@/components/Kicker";

/**
 * Tjänstekategorier (t.ex. lasergravyr på golfklubbor) har ingen
 * produktgrid – deras sida är about-texten + prislistan. Den här
 * sektionen ger tjänstesidorna samma informationshierarki som en
 * produktsida: berättelsen till vänster, priset och nästa steg
 * (offert-länken i PricingBlock) till höger.
 *
 * Prislistan renderas av befintlig PricingBlock – data ägs av
 * kategorikartan (categories.ts), det är medvetet inte produktcopy.
 */
export function ServicePricingSection({ category }: { category: Category }) {
  const block = category.pricing?.[0];
  if (!block) return null;

  // about-texten är flerstyckes (radbrytningar i data) – dela upp den
  // i läsbara stycken; fall tillbaka på beskrivningen om about saknas.
  const paragraphs = (category.about ?? category.description)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      aria-labelledby="tjanst-heading"
      className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-12"
    >
      <div>
        <Kicker>så går det till</Kicker>
        <h2 id="tjanst-heading" className="mt-1 font-serif text-3xl tracking-tight">
          Om tjänsten
        </h2>
        <div className="mt-5 space-y-4 text-muted-foreground">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {/* sticky-offset harmoniserad med produktsidans galleri (md:top-24):
          den klistrade headern är ~69 px (py-4 + h-9-knappar på md och uppåt),
          top-24 = 96 px ger ~27 px luft – samma luft som galleriet har. */}
      <div className="lg:sticky lg:top-24">
        <PricingBlock block={block} />
      </div>
    </section>
  );
}
