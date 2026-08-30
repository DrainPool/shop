import { Star, MessageSquareHeart } from "lucide-react";
import { Link } from "@tanstack/react-router";

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

export function ReviewSection({ reviews = [] }: { reviews?: Review[] }) {
  const hasReviews = reviews.length > 0;
  const average = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="mt-12 border-t border-border pt-8" aria-labelledby="omdomen">
      <h2 id="omdomen" className="font-serif text-2xl font-bold">
        Omdömen
      </h2>

      {!hasReviews ? (
        <div className="mt-4 rounded-3xl border-2 border-dashed border-border bg-cream p-8">
          <div className="flex items-center gap-1" aria-label="Inga omdömen ännu">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5 text-muted-foreground/40" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-3 font-semibold">Inga omdömen ännu för den här produkten</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Har du köpt något av mig? Skriv några rader – riktiga ord från riktiga kunder är det
            enda jag vill visa här.
          </p>
          <Link
            to="/kontakt"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
            Lämna ett omdöme
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <span className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(average)
                      ? "h-4 w-4 fill-gold text-gold"
                      : "h-4 w-4 text-muted-foreground/40"
                  }
                />
              ))}
            </span>
            <span className="text-muted-foreground">
              {average.toFixed(1)} av 5 · {reviews.length} omdömen
            </span>
          </p>
          <ul className="mt-5 space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold">{r.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
