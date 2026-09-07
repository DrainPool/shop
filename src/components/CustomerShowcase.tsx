import { Camera, Instagram, Mail } from "lucide-react";

/**
 * UGC-vägg ("user generated content") – riktiga kundbilder med kundens
 * egna rader. Väcker förtroendet: presenter som visar sig fungera
 * hos riktiga människor, inte bara i verkstadsbilderna.
 *
 * Renderas som höger kolumn (3fr) bredvid "Så funkar det" på startsidan
 * – därför ingen egen <section>, bara innehållet.
 *
 * ÄRLIGHETS-RAM (viktigt!): SUBMISSIONS är tom tills riktiga bidrag
 * finns. Fyll i allteftersom bilder och rader kommer in via
 * Instagram (@linsochlager) eller mejl – hitta ALDRIG på inlägg,
 * namn eller citat.
 */

type Submission = {
  /** Kundens förnamn, t.ex. "Anna" */
  name: string;
  /** Valfri rad om tillfället, t.ex. "Bröllopsgåva till Elin" */
  occasion?: string;
  /** Kundens egna ord, ordagrant */
  text: string;
  /** Kundbild under /images/ugc/ */
  image: string;
};

const SUBMISSIONS: Submission[] = [
  // Exempel när första riktiga bidraget kommit in:
  // {
  //   name: "Anna",
  //   occasion: "Presentsökande till pappa",
  //   text: "Pappa använder den varje dag. Tack!",
  //   image: "/images/ugc/anna.webp",
  // },
];

export function CustomerShowcase() {
  return (
    <div>
      <p className="font-script text-2xl text-primary-deep">
        verkliga presenter, från riktiga människor
      </p>
      <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">Din bild kan hamna här</h2>
      <p className="mt-3 text-muted-foreground">
        När presenten packats upp tar den ett eget liv – och här sätter jag upp bilderna som kommer
        in, tillsammans med några rader om presenten.
      </p>

      {SUBMISSIONS.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SUBMISSIONS.map((s) => (
            <figure
              key={`${s.name}-${s.image}`}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <img
                src={s.image}
                alt={`Present från ${s.name}`}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="p-5">
                <blockquote className="text-sm text-muted-foreground">”{s.text}”</blockquote>
                <p className="mt-3 text-sm font-semibold">
                  {s.name}
                  {s.occasion ? ` · ${s.occasion}` : ""}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        // Dekorativa platshållare tills riktiga bilder finns – inte
        // klickbara, dolda för skärmläsare
        <div className="mt-8 grid grid-cols-2 gap-4" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-cream/60 text-center"
            >
              <Camera className="h-6 w-6 text-muted-foreground/60" />
              <span className="px-3 text-xs text-muted-foreground/80">Din bild här</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="https://www.instagram.com/linsochlager"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Tagga @linsochlager
        </a>
        <a
          href="mailto:hej@linsochlager.se?subject=Bild%20p%C3%A5%20min%20present"
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary-deep"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Mejla din bild
        </a>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Butiken är ny och väggen tom ännu – här sätter jag upp det första allteftersom era bilder
        kommer in. Inga påhittade inlägg, bara riktiga presenter.
      </p>
    </div>
  );
}
