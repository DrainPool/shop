import type { ShopifyProduct } from "@/lib/shopify";

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("sv")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-–—]/g, " ");

/** Sök i den kompletta Shopify-katalogen, med samma taggar som kategorisidorna. */
export function filterCatalog(products: ShopifyProduct[], query: string, categoryTag?: string) {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return products.filter(({ node }) => {
    if (categoryTag && !(node.tags || []).includes(categoryTag)) return false;
    const text = normalize(
      [node.title, node.description, node.productType, ...(node.tags || [])]
        .filter(Boolean)
        .join(" "),
    );
    return words.every((word) => text.includes(word));
  });
}
