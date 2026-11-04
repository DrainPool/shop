import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";
import { SKETCH_TIME } from "@/lib/delivery";

/** Lugn puff till AI-presentguiden, direkt efter tillfällena. */
export function GuideTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12">
      <div className="card-shop flex flex-col gap-5 bg-cream p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="max-w-2xl">
          <Kicker>presentguiden</Kicker>
          <h2 className="mt-1 font-serif text-2xl tracking-tight md:text-3xl">
            Osäker på vad du ska ge?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Berätta om mottagaren, tillfället och din budget – så föreslår jag presenter och en
            personlig text. Tänk på julen i god tid – du får en skiss {SKETCH_TIME}.
          </p>
          <Link
            to="/presenttips/$slug"
            params={{ slug: "julklappstips-med-gravyr" }}
            className="mt-2 inline-block text-sm underline underline-offset-4"
          >
            Läs mina julklappstips
          </Link>
        </div>
        <Button asChild size="lg" className="shrink-0 rounded-full px-6">
          <Link to="/presentguide">
            Hitta rätt present <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
