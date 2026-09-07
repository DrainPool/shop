import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "sweet-savvy-shop-qfxf9-bktz9kkn.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN =
  import.meta.env["VITE_SHOPIFY_STOREFRONT_TOKEN"] || "DIN_SHOPIFY_STOREFRONT_TOKEN";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType?: string;
    tags?: string[];
    availableForSale?: boolean;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    compareAtPriceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          compareAtPrice?: { amount: string; currencyCode: string } | null;
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Betalning krävs", {
      description:
        "Shopify-API:et kräver en aktiv Shopify-plan. Uppgradera butiken på admin.shopify.com.",
    });
    return;
  }

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(", ")}`);
  }
  return data;
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  productType
  tags
  availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function fetchProducts(first = 50, query?: string): Promise<ShopifyProduct[]> {
  const { isDemoMode, demoFetchProducts } = await import("@/lib/demoProducts");
  if (isDemoMode()) return demoFetchProducts(first, query);
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const { isDemoMode, demoFetchProductByHandle } = await import("@/lib/demoProducts");
  if (isDemoMode()) return demoFetchProductByHandle(handle);
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const node = data?.data?.productByHandle;
  return node ? { node } : null;
}

/**
 * Gränsen för fri frakt inom Sverige (kr). ALL copy som nämner gränsen
 * ska läsa härifrån – ändras fraktregeln i Shopify ändras den på en plats.
 * Kontrollera att den stämmer med Shopify-inställningarna vid lansering.
 */
export const FREE_SHIPPING_LIMIT = 800;

export function formatPrice(amount: string | number, currencyCode = "SEK") {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Fritextsök mot Shopify (titel, beskrivning, tagg). */
export async function searchProducts(term: string, first = 8): Promise<ShopifyProduct[]> {
  const q = term.trim();
  if (!q) return [];
  // Demo-läge: sök lokalt mot demo-produkterna i stället för Storefront-API:t
  const { isDemoMode, demoSearchProducts } = await import("@/lib/demoProducts");
  if (isDemoMode()) return demoSearchProducts(q, first);
  const escaped = q.replace(/["\\]/g, "");
  const query = `title:*${escaped}* OR tag:*${escaped}* OR product_type:*${escaped}*`;
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query });
  return data?.data?.products?.edges ?? [];
}

/** Rabatterat pris om jämförelsepris finns i Shopify. */
export function getPricing(product: ShopifyProduct) {
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const compareRaw = product.node.compareAtPriceRange?.minVariantPrice?.amount;
  const compare = compareRaw ? parseFloat(compareRaw) : 0;
  const onSale = compare > price;
  return {
    price,
    compare,
    onSale,
    currency: product.node.priceRange.minVariantPrice.currencyCode,
    discountPercent: onSale ? Math.round(((compare - price) / compare) * 100) : 0,
  };
}
