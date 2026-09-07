import type { ShopifyProduct } from "@/lib/shopify";

/**
 * Demo-produkter för Fas 6 (QA + visning innan riktiga Shopify-produkter finns).
 * Aktiveras när VITE_DEMO_MODE=1 — då mockar fetchProducts/fetchProductByHandle
 * dessa data i stället för att anropa Shopify (som kräver aktiv plan + produkter).
 *
 * Allt är FIKTIVT: priser följer prismätningen (säljgranskning del 1-3),
 * bilder pekar på de AI-genererade miljöbilderna i /images/products/.
 */

const img = (file: string) => `/images/products/${file}`;

type DemoProduct = {
  title: string;
  handle: string;
  description: string;
  tags: string[];
  price: string;
  image: string;
  extraImages?: string[];
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    title: "Nyckelring i ek med eget namn",
    handle: "nyckelring-i-ek-med-eget-namn",
    description:
      "Massiv ek, lasergraverad med namn eller din egen text. Rymmer upp till 40 tecken. Handgjord i Småland — du får en digital skiss att godkänna innan jag graverar.",
    tags: ["nyckelring", "tra", "gravyr", "fodelsedag", "bastsaljare", "nytt-hem"],
    price: "179.00",
    image: img("nyckelringar_bord_H13eab.webp"),
    extraImages: [
      img("nyckelringar_hall_H13eab.webp"),
      img("nyckelringar_handla_H13eab.webp"),
      img("nyckelringar_hem_H13eab.webp"),
    ],
  },
  {
    title: "Nyckelring med reg.nummer",
    handle: "nyckelring-med-regnummer",
    description:
      "Din bil eller motorcykel — reg.numret graverat i skyltformat. 12 tecken. Observera: dekorativ gåva, inte godkänd för bruk i trafik.",
    tags: ["nyckelring", "bil", "farsdag", "tra"],
    price: "199.00",
    image: img("nyckelringar_bord_H63402.webp"),
    extraImages: [
      img("nyckelringar_hall_H63402.webp"),
      img("nyckelringar_handla_H63402.webp"),
      img("nyckelringar_hem_H63402.webp"),
    ],
  },
  {
    title: "Kors-hänge dop — silver",
    handle: "kors-hange-dop-silver",
    description:
      "Fint kors-hänge i silver med barnets namn och dopdatum graverade. Levereras i smyckesask, presentklart.",
    tags: ["smycken", "dop", "barn", "bastsaljare", "konfirmation"],
    price: "449.00",
    image: img("kors_bord_H0586.webp"),
    extraImages: [
      img("kors_hall_H0586.webp"),
      img("kors_handla_H0586.webp"),
      img("kors_hem_H0586.webp"),
    ],
  },
  {
    title: "Minnesask i trä med namn",
    handle: "minnesask-i-tra-med-namn",
    description:
      "Liten ask i ek till det första tandglaset, det första håret, det första armbandet. Graverad med namn och födelsedatum.",
    tags: ["smycken", "dop", "barn", "nyhet", "tra"],
    price: "399.00",
    image: img("minnesaskar_bord_H83f8f.webp"),
    extraImages: [
      img("minnesaskar_hall_H83f8f.webp"),
      img("minnesaskar_handla_H83f8f.webp"),
      img("minnesaskar_hem_H83f8f.webp"),
    ],
  },
  {
    title: "Namnhalsband — handgraverat",
    handle: "namnhalsband-handgraverat",
    description:
      "Klassiskt namnhalsband graverat för hand med namnet du väljer. Äkta silver eller förgyllt. Levereras i smyckesask.",
    tags: ["smycken", "fodelsedag", "bastsaljare", "hjartansdag", "konfirmation"],
    price: "449.00",
    image: img("halshalsband_bord_H18804.webp"),
    extraImages: [
      img("halshalsband_hall_H18804.webp"),
      img("halshalsband_handla_H18804.webp"),
      img("halshalsband_hem_H18804.webp"),
    ],
  },
  {
    title: "Parsmycke — två halsband",
    handle: "parsmycke-tva-halsband",
    description:
      "Två matchande halsband graverade med era namn, era koordinater eller ert datum. För er som är två — eller bästa vännerna.",
    tags: ["smycken", "brollop", "hjartansdag", "arsdag"],
    price: "890.00",
    image: img("halshalsband_bord_Hbc72de.webp"),
    extraImages: [
      img("halshalsband_hall_Hbc72de.webp"),
      img("halshalsband_handla_Hbc72de.webp"),
      img("halshalsband_hem_Hbc72de.webp"),
    ],
  },
  {
    title: "Hjärta — dopminne",
    handle: "hjarta-dopminne",
    description:
      "Graverat hjärta i ek med dopets namn, datum och en liten hälsning. Ett minne som får ta plats i barnrummet.",
    tags: ["smycken", "dop", "tra", "nyhet"],
    price: "429.00",
    image: img("hjartan_bord_H23b20.webp"),
    extraImages: [
      img("hjartan_hall_H23b20.webp"),
      img("hjartan_handla_H23b20.webp"),
      img("hjartan_hem_H23b20.webp"),
    ],
  },
  {
    title: "Armband i läder med initialer",
    handle: "armband-i-lader-med-initialer",
    description:
      "Äkta läder med rostfri detalj, graverade initialer (3 tecken). Åldras vackert — perfekt till jägaren, hunden eller den du tänker på.",
    tags: ["smycken", "lader", "farsdag"],
    price: "399.00",
    image: img("armband_bord_Heddb6.webp"),
    extraImages: [
      img("armband_hall_Heddb6.webp"),
      img("armband_handla_Heddb6.webp"),
      img("armband_hem_Heddb6.webp"),
    ],
  },
  {
    title: "Charm — personlig berlock",
    handle: "charm-personlig-berlock",
    description:
      "Liten berlock i silver att kombinera med ditt halsband eller armband. Graverad med bokstav, siffra eller liten symbol.",
    tags: ["smycken", "fodelsedag", "nyhet", "halloween", "hjartansdag", "konfirmation"],
    price: "249.00",
    image: img("charms_bord_H60ab2.webp"),
    extraImages: [
      img("charms_hall_H60ab2.webp"),
      img("charms_handla_H60ab2.webp"),
      img("charms_hem_H60ab2.webp"),
    ],
  },
  {
    title: "Korg i ek med gravyr",
    handle: "korg-i-ek-med-gravyr",
    description:
      "Handgjord korg i ek, graverad med familjenamn eller en hälsning. Till nycklarna, brödet eller som gåva.",
    tags: ["foretag", "tra", "gravyr", "halloween", "nytt-hem", "pension"],
    price: "349.00",
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
  {
    title: "Barhalsband — dopgåva",
    handle: "barhalsband-dopgava",
    description:
      "Mjukt barhalsband i äkta silver med namn eller dopdatum. Säker storlek för de minsta. Levereras presentklart.",
    tags: ["smycken", "dop", "barn", "bastsaljare"],
    price: "429.00",
    image: img("barhalsband_bord_H5b004.webp"),
    extraImages: [
      img("barhalsband_hall_H5b004.webp"),
      img("barhalsband_handla_H5b004.webp"),
      img("barhalsband_hem_H5b004.webp"),
    ],
  },
  {
    title: "Kedja — halsband med gravyr",
    handle: "kedja-halsband-med-gravyr",
    description:
      "Fin kedja i stål med graverad berlock — namn, initialer eller ett datum. Till honom, henne eller er båda.",
    tags: ["smycken", "brollop", "arsdag", "pension"],
    price: "549.00",
    image: img("kedjor_bord_Hb408a.webp"),
    extraImages: [
      img("kedjor_hall_Hb408a.webp"),
      img("kedjor_handla_Hb408a.webp"),
      img("kedjor_hem_Hb408a.webp"),
    ],
  },
  {
    // Fångar besökaren som inte kan bestämma – konverterar i stället för
    // att lämna sajten. Bilden är platsmarkör tills riktiga finns.
    title: "Presentkort — 500 kr",
    handle: "presentkort-500",
    description:
      "Digitalt presentkort på 500 kr, giltigt i hela butiken. Mottagaren väljer själv present och text – och du slipper gissa fel.",
    tags: ["presentkort", "fodelsedag", "jul"],
    price: "500.00",
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
];

/** ShopifyProduct-shapad demo-produkt (exakt de fält UI:t läser). */
function toShopifyShape(p: DemoProduct): ShopifyProduct {
  const images = [p.image, ...(p.extraImages ?? [])];
  return {
    node: {
      id: `demo-${p.handle}`,
      title: p.title,
      description: p.description,
      handle: p.handle,
      productType: p.tags[0] ?? "demo",
      tags: p.tags,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: p.price, currencyCode: "SEK" } },
      images: {
        edges: images.map((url) => ({ node: { url, altText: p.title } })),
      },
      variants: {
        edges: [
          {
            node: {
              id: `demo-variant-${p.handle}`,
              title: "Standard",
              price: { amount: p.price, currencyCode: "SEK" },
              availableForSale: true,
              selectedOptions: [{ name: "Storlek", value: "Standard" }],
            },
          },
        ],
      },
      options: [{ name: "Storlek", values: ["Standard"] }],
    },
  } as unknown as ShopifyProduct;
}

export function isDemoMode(): boolean {
  return import.meta.env["VITE_DEMO_MODE"] === "1";
}

export function demoFetchProducts(first: number, query?: string): ShopifyProduct[] {
  let list = DEMO_PRODUCTS.map(toShopifyShape);
  if (query?.startsWith("tag:")) {
    const tag = query.slice(4).trim();
    list = list.filter((p) => p.node.tags?.includes(tag));
  }
  return list.slice(0, first);
}

export function demoFetchProductByHandle(handle: string): ShopifyProduct | null {
  const found = DEMO_PRODUCTS.find((p) => p.handle === handle);
  return found ? toShopifyShape(found) : null;
}

/**
 * Fritextsök i demoläget (searchProducts grenar hit) – titel,
 * beskrivning och taggar, alla ord i termen måste träffa.
 */
export function demoSearchProducts(term: string, first: number): ShopifyProduct[] {
  const words = term
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
  if (words.length === 0) return [];
  return DEMO_PRODUCTS.map(toShopifyShape)
    .filter((p) => {
      const hay =
        `${p.node.title} ${p.node.description} ${(p.node.tags || []).join(" ")}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    })
    .slice(0, first);
}
