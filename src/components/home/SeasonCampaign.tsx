import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SKETCH_TIME } from "@/lib/delivery";
import { SEASONS, campaignFor, type Season } from "@/lib/seasons";

/**
 * Säsongskampanj på startsidan – styrs av schemat i lib/seasons.ts.
 * SSR visar julkampanjen; rätt säsong byts in efter hydrering.
 */
export function SeasonCampaign() {
  const [season, setSeason] = useState<Season>(SEASONS.jul);
  useEffect(() => setSeason(campaignFor()), []);

  return (
    <section aria-labelledby="kampanj-rubrik" className="mx-auto max-w-7xl px-5 pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-ink p-6 text-ink-foreground md:p-10">
        <div aria-hidden="true" className="cta-glow absolute inset-0" />
        <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="min-w-0">
            <p className="font-inscription text-sm text-gold">{season.kicker}</p>
            <h2 id="kampanj-rubrik" className="mt-1 font-serif text-3xl tracking-tight md:text-4xl">
              {season.title}
            </h2>
            <p className="mt-3 max-w-xl text-ink-foreground/85">
              {season.text} Du får en skiss {SKETCH_TIME}.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Button asChild size="lg" className="min-h-11 w-full rounded-full px-6 sm:w-auto">
                <Link to="/kategori/$slug" params={{ slug: season.slug }} hash="produkter">
                  {season.cta} <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 w-full rounded-full border-gold/50 bg-transparent px-6 text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground sm:w-auto"
              >
                <Link to="/presentguide" search={{ tillfalle: season.occasion }}>
                  Fråga presentguiden
                </Link>
              </Button>
            </div>
          </div>
          <ul className="grid min-w-0 grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-end" aria-label="Prisintervall">
            {season.priceRanges.map((r) => (
              <li key={r.label}>
                <Link
                  to="/presentguide"
                  search={{ tillfalle: season.occasion, budget: r.max }}
                  className="flex min-h-11 h-full items-center justify-center rounded-full border border-gold/40 px-3 py-2 text-center text-sm font-semibold hover:bg-ink-foreground/10"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
