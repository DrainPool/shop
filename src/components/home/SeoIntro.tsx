import { Link } from "@tanstack/react-router";

/** Kort, ärlig SEO-text längst ner på startsidan med interna länkar. */
export function SeoIntro() {
  const cat = (slug: string, label: string) => (
    <Link to="/kategori/$slug" params={{ slug }} className="underline underline-offset-4 hover:text-primary-deep">
      {label}
    </Link>
  );
  const tip = (slug: string, label: string) => (
    <Link to="/presenttips/$slug" params={{ slug }} className="underline underline-offset-4 hover:text-primary-deep">
      {label}
    </Link>
  );
  return (
    <section className="mx-auto max-w-3xl px-5 pb-16 text-sm leading-relaxed text-muted-foreground">
      <h2 className="mb-3 font-serif text-xl text-foreground">Personliga presenter med gravyr</h2>
      <p>
        Jag graverar presenter för hand i min verkstad i Aneby, mitt i Småland: {cat("glas", "glas")},{" "}
        {cat("skarbrador", "skärbrädor")}, {cat("nyckelringar", "nyckelringar")} och andra saker i trä,
        metall och läder. Jag gör även {cat("fotokonst", "fotokonst")} och {cat("hem-inredning", "hem-inredning")} på
        beställning. Du väljer texten, jag skickar en skiss – och först när du säger ja börjar jag
        gravera.
      </p>
      <p className="mt-3">
        Letar du efter något till ett särskilt tillfälle? Läs mina tips om {tip("doppresent-med-gravyr", "doppresenter")},{" "}
        {tip("studentpresent-med-gravyr", "studentpresenter")} och{" "}
        {tip("brollopspresent-med-gravyr", "bröllopspresenter")}.
      </p>
    </section>
  );
}
