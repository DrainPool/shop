import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";
import { getGiftTip, giftTips } from "@/lib/giftTips";

export const Route = createFileRoute("/presenttips/$slug")({
  loader: ({ params }) => {
    const tip = getGiftTip(params.slug);
    if (!tip) throw notFound();
    return { tip };
  },
  head: ({ params, loaderData }) => {
    const tip = loaderData?.tip;
    if (!tip) return { meta: [{ title: "Presenttips | Taggat" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${tip.title} | Taggat` },
        { name: "description", content: tip.description },
        { property: "og:title", content: tip.title },
        { property: "og:description", content: tip.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/presenttips/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/presenttips/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: tip.title,
            description: tip.description,
            author: { "@type": "Person", name: "Fredrik" },
            publisher: { "@type": "Organization", name: "Taggat" },
          }),
        },
      ],
    };
  },
  component: GiftTipPage,
});

function GiftTipPage() {
  const { tip } = Route.useLoaderData();
  const others = giftTips.filter((t) => t.slug !== tip.slug);
  return (
    <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <Kicker>presenttips</Kicker>
      <h1 className="mt-1 font-serif text-3xl tracking-tight md:text-5xl">{tip.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{tip.intro}</p>

      <div className="mt-10 space-y-8">
        {tip.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-serif text-2xl tracking-tight">{s.heading}</h2>
            <p className="mt-2 leading-relaxed">{s.body}</p>
            {s.link && (
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/kategori/$slug" params={{ slug: s.link.slug }} hash="produkter">
                  {s.link.label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            )}
          </section>
        ))}
      </div>

      <div className="card-shop mt-12 bg-cream p-6">
        <h2 className="font-serif text-xl">Har du en egen idé?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Berätta vad du tänkt dig, så återkommer jag med en skiss och ett förslag.
        </p>
        <Button asChild className="mt-4 rounded-full">
          <Link to="/kontakt">Skicka din idé</Link>
        </Button>
      </div>

      <nav aria-label="Fler presenttips" className="mt-12">
        <h2 className="font-serif text-xl">Fler presenttips</h2>
        <ul className="mt-3 space-y-2">
          {others.map((t) => (
            <li key={t.slug}>
              <Link to="/presenttips/$slug" params={{ slug: t.slug }} className="underline underline-offset-4">
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
