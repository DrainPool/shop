import glas from "@/assets/ugc/glas-mobil.jpg";
import whisky from "@/assets/ugc/whisky-mobil.jpg";
import champagne from "@/assets/ugc/champagne-mobil.jpg";
import olsejdel from "@/assets/ugc/olsejdel-mobil.jpg";
import nyckelring from "@/assets/ugc/nyckelring-mobil.jpg";
import skarbrada from "@/assets/ugc/skarbrada-mobil.jpg";

export type LifestyleImage = { url: string; altText: string; visualization: true };

const photo = (url: string, altText: string): LifestyleImage => ({ url, altText, visualization: true });

const glassPhoto = photo(glas, "AI-visualisering: graverat glas på köksbordet");
const whiskyPhoto = photo(whisky, "AI-visualisering: två whiskyglas på vardagsrumsbordet");
const champagnePhoto = photo(champagne, "AI-visualisering: två champagneglas vid en dukad middag");
const beerPhoto = photo(olsejdel, "AI-visualisering: graverad ölsejdel på uteplatsen");
const keyPhoto = photo(nyckelring, "AI-visualisering: nyckelring i ek tillsammans med husnycklar");
const boardPhoto = photo(skarbrada, "AI-visualisering: graverad skärbräda i ett kök");

// Exakta produktkopplingar; riktiga Shopify-bilder ersätts aldrig.
export const MOBILE_PRODUCT_PHOTOS: Record<string, LifestyleImage> = {
  "graverat-glas-med-namn": glassPhoto,
  "whiskyglas-med-gravyr-2-pack": whiskyPhoto,
  "whiskyglas-med-gravyr": whiskyPhoto,
  "champagneglas-till-paret-2-pack": champagnePhoto,
  "olsejdel-med-namn": beerPhoto,
  "nyckelring-i-ek-med-eget-namn": keyPhoto,
  "skarbrada-i-ek-med-gravyr": boardPhoto,
  "skarbrada-mastarkocken": boardPhoto,
};

// Befintliga vardagsvisualiseringar för demokatalogen.
const everydayFiles = import.meta.glob("/public/images/products/v2/*_vardag.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function getProductLifestyle(handle: string, title: string): LifestyleImage | undefined {
  const mobile = MOBILE_PRODUCT_PHOTOS[handle];
  if (mobile) return mobile;
  const url = everydayFiles[`/public/images/products/v2/${handle}_vardag.webp`];
  return url ? photo(url, `AI-visualisering: ${title} i vardagsmiljö`) : undefined;
}

// Flera mobilbilder per produkt: src/assets/mobil/{handle}__{n}.jpg
// (samma produkt, olika vinklar och miljöer). Nya filer plockas upp automatiskt.
const mobileGalleryFiles = import.meta.glob("/src/assets/mobil/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const MOBILE_SCENES = ["i handen", "hemma på bordet", "närbild på gravyren", "som present"];

export function getProductMobileGallery(handle: string, title: string): LifestyleImage[] {
  return Object.entries(mobileGalleryFiles)
    .map(([path, url]) => {
      const m = path.match(/\/mobil\/(.+)__(\d+)\.jpg$/);
      return m && m[1] === handle ? { n: Number(m[2]), url } : null;
    })
    .filter((x): x is { n: number; url: string } => Boolean(x))
    .sort((a, b) => a.n - b.n)
    .map(({ n, url }) =>
      photo(url, `AI-visualisering i mobilkamerastil: ${title} ${MOBILE_SCENES[n - 1] || "i vardagen"}`),
    );
}