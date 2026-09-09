import { Link } from "@tanstack/react-router";
import { ArrowRight, Gift, PackageCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Presentpaket – höjer snittordern genom att föreslå kombinationer
 * i stället för en ensam liten produkt.
 *
 * ÄRLIGHETS-RAM: inga påhittade fasta paketpriser. Varje paket pekar på
 * riktiga kategorier i butiken; slutpriset sätter jag i offerten (eller
 * som en riktig paketprodukt i Shopify när den finns).
 */

type Bundle = {
  icon: typeof Gift;
  kicker: string;
  title: string;
  text: string;
  includes: string[];
  slug: string;
};

const BUNDLES: Bundle[] = [
  {
    icon: Sparkles,
    kicker: "till stora dagen",
    title: "Bröllopspaketet",
    text: "Allt det graverade till bröllopet i en och samma beställning – samma stil och typsnitt hela vägen.",
    includes: ["Graverade tostglas", "Ringask i trä", "Namnbrickor till borden"],
    slug: "brollop",
  },
  {
    icon: Gift,
    kicker: "till den nya lilla",
    title: "Doppaketet",
    text: "Smycket att spara, asken att förvara minnena i och namnskylten till rummet.",
    includes: ["Graverat smycke", "Minnesask", "Namnskylt"],
    slug: "dop",
  },
  {
    icon: PackageCheck,
    kicker: "till kontoret",
    title: "Företagspaketet",
    text: "Namnbrickor till personalen och personliga gåvor till kunderna – med din logotyp graverad.",
    includes: ["Namnbrickor", "Kundgåvor med logotyp", "Skyltar"],
    slug: "foretag",
  },
];

export function GiftBundles() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-script text-2xl text-primary-deep">enklare att ge bort flera</p>
          <h2 className="mt-1 font-serif text-4xl font-bold tracking-tight">Presentpaket</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Ska du överraska ordentligt blir det oftast finare – och billigare – att ta flera saker i
            samma beställning. Jag håller ihop typsnitt och gravyr så allt hör ihop, och packar det
            som ett paket.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BUNDLES.map((b) => (
          <div
            key={b.title}
            className="flex flex-col rounded-3xl border-2 border-ink/10 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift"
          >
            <b.icon className="h-6 w-6 text-primary-deep" aria-hidden="true" />
            <p className="mt-3 font-script text-xl text-primary-deep">{b.kicker}</p>
            <h3 className="mt-1 font-serif text-2xl font-bold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {b.includes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2 pt-2">
              <Button asChild size="sm" className="rounded-full px-5">
                <Link to="/kategori/$slug" params={{ slug: b.slug }}>
                  Se produkterna <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full px-5">
                <Link to="/kontakt">Be om paketpris</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
