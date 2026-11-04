import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface UnsplashImage {
  url: string;
  thumb: string;
  alt: string;
  creditName: string;
  creditLink: string;
}

// Enkel minnescache så vi inte slösar Unsplash-kvoten på samma sökningar.
const cache = new Map<string, UnsplashImage | null>();

/**
 * Hämtar en relevant bild från Unsplash för en produkt som ännu saknar egna bilder.
 * Körs endast på servern — nyckeln exponeras aldrig i webbläsaren.
 */
export const getUnsplashImage = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ query: z.string().min(1).max(120) }).parse(data))
  .handler(async ({ data }): Promise<UnsplashImage | null> => {
    const key = process.env["UNSPLASH_ACCESS_KEY"];
    if (!key) return null;

    const query = data.query.trim().toLowerCase();
    if (cache.has(query)) return cache.get(query) ?? null;

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`,
        { headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" } },
      );
      if (!res.ok) {
        cache.set(query, null);
        return null;
      }
      const json: any = await res.json();
      const photo = json?.results?.[0];
      if (!photo) {
        cache.set(query, null);
        return null;
      }
      const image: UnsplashImage = {
        url: photo.urls.regular,
        thumb: photo.urls.small,
        alt: photo.alt_description || query,
        creditName: photo.user?.name ?? "Unsplash",
        creditLink: photo.user?.links?.html ?? "https://unsplash.com",
      };
      cache.set(query, image);
      return image;
    } catch {
      return null;
    }
  });
