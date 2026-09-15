import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/Reveal";

/**
 * Action-steget: avslutande mörkt kapitel som bokmärke till heron – kontrast-
 * riktigt, med en enda stor pill-CTA. Guld-glowen i toppen (.cta-glow) är
 * dekorativ radial, aldrig textbotten, och en tunn guld-lina markerar
 * övergången in i kapitlet.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-gold/20 bg-ink py-16 text-ink-foreground md:py-24">
      <div aria-hidden="true" className="cta-glow absolute inset-0" />
      {/* Mjuk övergång ner mot pappret och footern – samma fadespråk som
          heron och processkapitlet, de mörka kapitlen klipps aldrig hårt. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background md:h-36"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="font-inscription text-sm text-gold md:text-base">börja med en rad</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-6xl">
            Vad vill du gravera in?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/85">
            Berätta om tillfället, namnet och känslan du vill fånga – så svarar jag med en digital
            skiss och ett förslag. Det som finns i butiken är bara en början.
          </p>

          <div className="mt-10">
            <Button asChild size="lg">
              <Link to="/kontakt">Skicka din graveringsidé</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-ink-foreground/70">
            Jag svarar alltid själv – skriv några rader, så börjar jag skissa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
