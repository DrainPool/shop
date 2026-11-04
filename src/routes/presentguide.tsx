import { useState } from "react";
import { cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";
import { formatPrice } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";
import { recommendGifts, type AdvisorResponse } from "@/lib/giftAdvisor.functions";
import { GENERIC_RANGES, seasonByOccasion } from "@/lib/seasons";

export const Route = createFileRoute("/presentguide")({
  component: Presentguide,
  validateSearch: (
    s: Record<string, unknown>,
  ): { tillfalle?: string | undefined; budget?: number | undefined } => {
    const b = Number(s["budget"]);
    return {
      tillfalle: typeof s["tillfalle"] === "string" ? s["tillfalle"].slice(0, 40) : undefined,
      budget: Number.isFinite(b) && b >= 100 && b <= 2500 ? Math.round(b) : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Presentguide – hitta rätt personliga present | Taggat" },
      { rel: "canonical", href: `${SITE_URL}/presentguide` },
      {
        name: "description",
        content:
          "Beskriv mottagaren, tillfället och din budget – så föreslår jag graverade presenter ur sortimentet med förslag på personlig text.",
      },
      { property: "og:title", content: "Presentguide – hitta rätt personliga present | Taggat" },
      {
        property: "og:description",
        content:
          "Få förslag på graverade presenter och personlig text utifrån mottagare, tillfälle och budget.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const OCCASIONS = [
  "Födelsedag",
  "Bröllop",
  "Dop",
  "Jul",
  "Mors dag",
  "Farsdag",
  "Årsdag",
  "Student",
  "Tack",
  "Företag",
];

function Presentguide() {
  const search = Route.useSearch();
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState(
    search.tillfalle && OCCASIONS.includes(search.tillfalle) ? search.tillfalle : "Födelsedag",
  );
  const [budget, setBudget] = useState(search.budget ?? 500);
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResponse | null>(null);
  const [texts, setTexts] = useState<Record<string, string>>({});
  const season = seasonByOccasion(occasion);
  const ranges = season?.priceRanges ?? GENERIC_RANGES;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipient.trim().length < 2 || loading) return;
    setLoading(true);
    setResult(null);
    const full = wish.trim()
      ? `${recipient.trim().slice(0, 240)}. Önskad gravyrtext: ${wish.trim().slice(0, 40)}`
      : recipient;
    try {
      setResult(await recommendGifts({ data: { recipient: full, occasion, budget } }));
    } catch {
      setResult({ ok: false, error: "Något gick fel. Försök igen om en stund." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:py-16">
      <Kicker>presentguide</Kicker>
      <h1 className="mt-1 font-serif text-4xl tracking-tight">Hjälp mig hitta rätt present</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Berätta lite om vem presenten är till, så föreslår jag passande saker ur sortimentet – med
        förslag på vad som kan graveras. Förslagen tas fram med AI och du kan alltid ändra texten.
      </p>

      <form
        onSubmit={submit}
        className="mt-6 space-y-5 rounded-3xl border border-border bg-card p-4 shadow-soft sm:mt-8 sm:p-6"
      >
        <div>
          <label htmlFor="pg-recipient" className="text-sm font-semibold">
            Vem är mottagaren?
          </label>
          <textarea
            id="pg-recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            maxLength={300}
            rows={3}
            placeholder="T.ex. min syster Anna, 34 år, älskar kaffe och sin hund Molly"
            className="mt-2 w-full rounded-2xl border border-border bg-background p-3 text-sm"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pg-occasion" className="text-sm font-semibold">
              Tillfälle
            </label>
            <select
              id="pg-occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="mt-2 h-11 w-full rounded-full border border-border bg-background px-4 text-sm"
            >
              {OCCASIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Snabbval för tillfälle">
              {["Farsdag", "Jul", "Bröllop", "Dop"].map((o) => (
                <Button
                  key={o}
                  type="button"
                  variant="outline"
                  aria-pressed={occasion === o}
                  onClick={() => setOccasion(o)}
                  className={cn(
                    "min-h-11 rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
                    occasion === o
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary",
                  )}
                >
                  {o}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="pg-budget" className="text-sm font-semibold">
              Budget: högst {budget} kr
            </label>
            <input
              id="pg-budget"
              type="range"
              min={100}
              max={2500}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-4 w-full accent-primary"
            />
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Prisintervall">
              {ranges.map((r) => (
                <Button
                  key={r.label}
                  type="button"
                  variant="outline"
                  aria-pressed={budget === r.max}
                  onClick={() => setBudget(r.max)}
                  className={cn(
                    "min-h-11 whitespace-normal rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
                    budget === r.max
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary",
                  )}
                >
                  {r.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {season && (
          <div>
            <label htmlFor="pg-wish" className="text-sm font-semibold">
              Gravyrtext (valfritt)
            </label>
            <input
              id="pg-wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              maxLength={40}
              placeholder="Välj ett förslag nedan eller skriv eget"
              className="mt-2 h-11 w-full rounded-full border border-border bg-background px-4 text-sm"
            />
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Textförslag">
              {season.textIdeas.map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant="outline"
                  aria-pressed={wish === t}
                  onClick={() => setWish(t)}
                  className={cn(
                    "h-auto min-h-11 max-w-full whitespace-normal rounded-full border px-3 py-2 text-xs hover:border-primary",
                    wish === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-cream",
                  )}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Button
          type="submit"
          size="lg"
          className="min-h-11 w-full rounded-full px-8 sm:w-auto"
          disabled={loading || recipient.trim().length < 2}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Letar i
              verkstaden…
            </>
          ) : (
            "Ge mig förslag"
          )}
        </Button>
      </form>

      <div id="pg-result" aria-live="polite" className="mt-10">
        {result && !result.ok && (
          <p className="text-center text-muted-foreground">{result.error}</p>
        )}
        {result?.ok && (
          <section>
            <h2 className="font-serif text-2xl">Mina förslag</h2>
            <p className="mt-2 text-muted-foreground">{result.intro}</p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {result.picks.map((p) => (
                <li
                  key={p.handle}
                  className="overflow-hidden rounded-3xl border border-border bg-card"
                >
                  {p.image && (
                    <img
                      src={p.image.url}
                      alt={p.image.altText || p.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                      <h3 className="min-w-0 break-words font-serif text-lg">{p.title}</h3>
                      <span className="shrink-0 whitespace-nowrap text-sm tabular-nums text-muted-foreground">
                        {formatPrice(p.price, p.currency)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">{p.reason}</p>
                    <label
                      htmlFor={`gravyr-${p.handle}`}
                      className="mt-4 block text-xs font-semibold text-muted-foreground"
                    >
                      Gravyrtext – ändra fritt
                    </label>
                    <input
                      id={`gravyr-${p.handle}`}
                      value={texts[p.handle] ?? p.engraving}
                      onChange={(e) => setTexts((t) => ({ ...t, [p.handle]: e.target.value }))}
                      maxLength={40}
                      className="mt-1 h-11 w-full rounded-xl border border-border bg-cream px-3 text-sm font-medium"
                    />
                    <Button asChild className="mt-4 h-auto min-h-11 w-full whitespace-normal rounded-full py-3 text-center">
                      <Link
                        to="/produkt/$handle"
                        params={{ handle: p.handle }}
                        search={
                          (texts[p.handle] ?? p.engraving).trim()
                            ? { gravyr: (texts[p.handle] ?? p.engraving).trim() }
                            : {}
                        }
                        hash="personalisering"
                      >
                        Välj present med den här texten
                      </Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
