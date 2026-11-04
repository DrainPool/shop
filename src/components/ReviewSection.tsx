import { useId } from "react";
import { Star, MessageSquareHeart } from "lucide-react";

/**
 * Omdömen visas ENDAST när verkliga, verifierbara omdömen finns.
 * Inga påhittade recensioner, betyg eller antal får läggas in här.
 * Koppla in en riktig omdömestjänst och skicka in datan via `reviews`.
 */
export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
};

/** Fem stjärnor fyllda enligt betyget – raderas aldrig upp, bara på riktigt. */
function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={
            i < Math.round(rating)
              ? "h-4 w-4 fill-gold text-gold"
              : "h-4 w-4 text-muted-foreground/40"
          }
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function ReviewSection({ reviews = [] }: { reviews?: Review[] }) {
  // useId i stället för hårdkodat id – flera sektioner på samma sida
  // fick dubblerade id:n och en trasig aria-labelledby-koppling.
  const headingId = useId();
  const hasReviews = reviews.length > 0;
  const average = hasReviews ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <section className="mt-12 border-t border-border pt-8" aria-labelledby={headingId}>
      <h2 id={headingId} className="font-serif text-2xl">
        Omdömen
      </h2>

      {!hasReviews ? (
        <div className="mt-4 rounded-3xl border-2 border-dashed border-border bg-cream p-8">
          <div className="flex items-center gap-1" aria-label="Inga omdömen ännu">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5 text-muted-foreground/40" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-3 font-semibold">Inga omdömen här än – ditt blir det första</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Här samlas riktiga ord från riktiga kunder, allteftersom de kommer in. Har du fått något
            av mig?
          </p>
          <a
            href="mailto:taggat@linsochlager.net?subject=Ber%C3%A4tta%20vad%20du%20fick"
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-deep transition-colors duration-300 hover:underline md:min-h-9"
          >
            <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
            Berätta vad du fick
          </a>
        </div>
      ) : (
        <>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Stars rating={average} label={`Snittbetyg ${average.toFixed(1)} av 5`} />
            <span className="text-muted-foreground">
              {average.toFixed(1)} av 5 · {reviews.length} omdömen
            </span>
          </p>
          <ul className="mt-5 space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="card-shop p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="font-semibold">{r.name}</p>
                  {r.date && <p className="text-xs text-muted-foreground">{r.date}</p>}
                </div>
                <div className="mt-1">
                  <Stars rating={r.rating} label={`Betyg ${r.rating} av 5`} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
