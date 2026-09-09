import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/Reveal";

/**
 * Action-steget: avslutande mörkt kapitel som bokmärke till heron – kontrast-
 * riktigt, med en tydlig primär CTA till kontakt och en sekundär till
 * sortimentet. Guld-tonen i toppen är dekorativ radial, aldrig textbotten.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 0%, oklch(0.72 0.1 80 / 0.16), transparent 70%)",
        }}
      />
      {/* Mjuk övergång ner mot pappret och footern – samma fadespråk som
          heron och processkapitlet, de mörka kapitlen klipps aldrig hårt. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background md:h-36"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="font-script text-2xl text-gold md:text-3xl">börja med en rad</p>
          <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight md:text-6xl">
            Vad vill du gravera in?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/85">
            Berätta om tillfället, namnet och känslan du vill fånga – så svarar jag med en digital
            skiss och ett förslag. Det som finns i butiken är bara en början.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-semibold">
              <Link to="/kontakt">Skicka din graveringsidé</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-ink-foreground/50 bg-transparent px-8 text-base font-semibold text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
            >
              <Link to="/sortiment">
                Utforska kategorier
                <ArrowRight className="ml-1 h-5 w-5" aria-hidden="true" />
              </Link>
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
