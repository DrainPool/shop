import { getCategory } from "@/lib/categories";
import { CategoryCard } from "./CategoryCard";
import { Reveal } from "./Reveal";

/**
 * "Passar också till" – kategorins related-fält som visuella kort i
 * stället för piller, så det interna länkflödet får säljyta istället
 * för en rad textlänkar.
 *
 * Data-driven: slug:arna löses mot kategorikartan och sådana som inte
 * finns (ännu) hoppas tyst över. Renderar ingenting när ingen slug
 * löser upp – sektionen försvinner då helt.
 */
export function RelatedCategoryCards({
  slugs,
  currentSlug,
}: {
  slugs: string[];
  /** Undvik att länka tillbaka till sidan man står på */
  currentSlug?: string;
}) {
  const related = slugs
    .map((slug) => getCategory(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c && c.slug !== currentSlug));

  if (related.length === 0) return null;

  return (
    <section className="mt-16 md:mt-20" aria-labelledby="relaterade-heading">
      <Reveal>
        <p className="font-script text-2xl text-primary-deep">fortsätt titta</p>
        <h2 id="relaterade-heading" className="mt-1 font-serif text-3xl font-bold tracking-tight">
          Passar också till
        </h2>
      </Reveal>
      <div className="mt-8 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((c, i) => (
          <Reveal key={c.slug} className="h-full" delay={(i % 3) * 60}>
            <CategoryCard category={c} compact />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
