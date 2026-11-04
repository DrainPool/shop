import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";
import { SKETCH_TIME } from "@/lib/delivery";

/** Lyfter fotogravyr – verkstadens specialitet – med länk till kategorin. */
export function PhotoEngravingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12">
      <div className="card-shop flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="max-w-2xl">
          <Kicker>fotogravyr</Kicker>
          <h2 className="mt-1 font-serif text-2xl tracking-tight md:text-3xl">
            Ditt foto, graverat i hög upplösning
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Husdjuret, barnen eller er plats – min maskin graverar så skarpt att hårstrån och
            ansiktsdrag syns. Ladda upp bilden på produktsidan så får du en skiss {SKETCH_TIME}.
          </p>
        </div>
        <Button asChild size="lg" variant="outline" className="shrink-0 rounded-full px-6">
          <Link to="/kategori/$slug" params={{ slug: "fotogravyr" }}>
            Se fotogravyr <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
