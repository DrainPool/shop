import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  recipient: z.string().trim().min(2).max(300),
  occasion: z.string().trim().min(2).max(120),
  budget: z.number().int().min(50).max(20000),
});

export type AdvisorPick = {
  handle: string;
  title: string;
  price: string;
  currency: string;
  image: { url: string; altText: string | null } | null;
  reason: string;
  engraving: string;
};

export type AdvisorResponse =
  { ok: true; intro: string; picks: AdvisorPick[] } | { ok: false; error: string };

/** AI-presentguide: väljer bland butikens riktiga produkter, aldrig påhittade. */
export const recommendGifts = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<AdvisorResponse> => {
    const { fetchProducts } = await import("@/lib/shopify");
    const { runGiftAdvisor, AdvisorError } = await import("@/lib/giftAdvisor.server");

    let products: any[] = [];
    try {
      products = await fetchProducts(100);
    } catch {
      return { ok: false, error: "Kunde inte hämta sortimentet just nu." };
    }
    if (products.length === 0) return { ok: false, error: "Sortimentet fylls på just nu." };

    const catalog = products
      .map(
        (p) =>
          `${p.node.handle} | ${p.node.title} | ${Math.round(parseFloat(p.node.priceRange.minVariantPrice.amount))} | ${(p.node.tags || []).join(",")}`,
      )
      .join("\n");

    const { seasonByOccasion } = await import("@/lib/seasons");
    const season = seasonByOccasion(data.occasion);
    const seasonNote = season
      ? `\nVägledning: ${season.aiHint}\nExempel på gravyrtexter i butikens ton: ${season.textIdeas.join(" / ")}`
      : "";
    const description = `Mottagare: ${data.recipient}\nTillfälle: ${data.occasion}\nBudget: högst ${data.budget} kr${seasonNote}`;

    try {
      const ai = await runGiftAdvisor(description, catalog);
      const byHandle = new Map(products.map((p) => [p.node.handle, p]));
      const picks: AdvisorPick[] = ai.picks
        .filter((pick) => byHandle.has(pick.handle))
        .slice(0, 4)
        .map((pick) => {
          const p = byHandle.get(pick.handle);
          return {
            handle: pick.handle,
            title: p.node.title,
            price: p.node.priceRange.minVariantPrice.amount,
            currency: p.node.priceRange.minVariantPrice.currencyCode,
            image: p.node.images?.edges?.[0]?.node ?? null,
            reason: pick.reason.slice(0, 300),
            engraving: pick.engraving.slice(0, 40),
          };
        });
      if (picks.length === 0)
        return { ok: false, error: "Hittade inget som passade – prova att ändra budgeten." };
      return { ok: true, intro: ai.intro.slice(0, 300), picks };
    } catch (error: any) {
      return {
        ok: false,
        error:
          error instanceof AdvisorError ? error.message : "Kunde inte ta fram förslag just nu.",
      };
    }
  });
