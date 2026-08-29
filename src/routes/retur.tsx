import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert, Ban, MessageCircleHeart } from "lucide-react";

export const Route = createFileRoute("/retur")({
  head: () => ({
    meta: [
      { title: "Retur & reklamation – Lins & Lager" },
      {
        name: "description",
        content:
          "Eftersom alla produkter är personligt tillverkade gäller inget öppet köp – men full reklamationsrätt vid fel. Läs våra villkor.",
      },
      { property: "og:title", content: "Retur & reklamation – Lins & Lager" },
      {
        property: "og:description",
        content: "Personliga produkter omfattas inte av ångerrätt, men du har alltid reklamationsrätt vid fel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-hand text-2xl text-primary">Våra villkor</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">Retur & reklamation</h1>

      <section className="mt-8 rounded-2xl border border-primary/40 bg-primary/5 p-6">
        <div className="flex items-start gap-3">
          <Ban className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-serif text-xl font-semibold">Inga returer på personliga produkter</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Alla våra produkter tillverkas specifikt för dig – med ditt namn, din text, ditt
              foto eller ditt motiv. Enligt lag (13 § i lagen om distansavtal och avtal utanför
              affärslokaler) gäller <strong>inte ångerrätten</strong> för varor som tillverkats
              enligt dina anvisningar eller fått en tydlig personlig prägel. Därför kan vi
              tyvärr inte ta emot returer eller erbjuda öppet köp.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-serif text-xl font-semibold">Reklamationsrätt – alltid</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Skulle det vara något fel på din produkt – till exempel fel gravyr mot vad du
              angav, transportskada eller tillverkningsfel – har du alltid rätt att reklamera
              enligt konsumentköplagen (upp till 3 år). Vi åtgärdar felet, tillverkar om
              produkten eller återbetalar, beroende på situationen.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Så reklamerar du:</strong> Maila{" "}
              <a href="mailto:hej@linsochlager.se" className="text-primary underline">
                hej@linsochlager.se
              </a>{" "}
              inom rimlig tid (senast 2 månader efter att du upptäckt felet) med ditt
              ordernummer, en beskrivning av felet och gärna ett foto. Vi återkommer inom 2
              arbetsdagar.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MessageCircleHeart className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-serif text-xl font-semibold">Kontrollera alltid din text</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Innan du slutför köpet får du alltid se en sammanfattning av exakt den text och
              det material du valt. Kontrollera stavning noggrant – vi graverar exakt det du
              skriver. Har du skrivit fel? Hör av dig så fort som möjligt; har vi inte börjat
              tillverka än kan vi nästan alltid ändra.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        Läs även om{" "}
        <Link to="/frakt-leverans" className="text-primary underline">
          frakt & leveranstid
        </Link>{" "}
        och vår{" "}
        <Link to="/garanti" className="text-primary underline">
          garanti
        </Link>
        .
      </p>
    </article>
  );
}
