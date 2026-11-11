import { Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";

export function NotFoundPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-md text-center">
        <Kicker>åh nej</Kicker>
        <h1 className="mt-1 font-serif text-6xl tracking-tight text-foreground">404</h1>
        <h2 className="mt-3 text-xl font-semibold text-foreground">Sidan hittades inte</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sidan du letar efter finns inte eller har flyttats.
        </p>

        {/* Sökfunktion */}
        <form
          role="search"
          aria-label="Sök på sajten"
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) {
              window.location.href = `/sortiment?q=${encodeURIComponent(query.trim())}`;
            }
          }}
        >
          <label htmlFor="notfound-search" className="sr-only">
            Sök produkter
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="notfound-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Vad letar du efter?"
              className="h-11 pl-10"
            />
          </div>
          <Button type="submit" className="mt-3 w-full">
            Sök i sortimentet
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </form>

        {/* Populära kategorier */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold text-muted-foreground">Populära kategorier</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { slug: "presenter", label: "Alla presenter" },
              { slug: "brollop", label: "Till bröllopet" },
              { slug: "dop", label: "Till dopet" },
              { slug: "bil", label: "Till bilen" },
            ].map((c) => (
              <Link
                key={c.slug}
                to="/kategori/$slug"
                params={{ slug: c.slug }}
                className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary-deep"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Gå till startsidan */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Gå till startsidan
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Hittar du inte det du söker? Skriv till{" "}
          <a
            href="mailto:taggat@linsochlager.net"
            className="font-medium text-primary-deep hover:underline"
          >
            taggat@linsochlager.net
          </a>{" "}
          så hjälper jag dig.
        </p>
      </div>
    </div>
  );
}
