import { afterEach, expect, test } from "bun:test";
import { fetchProducts, SHOPIFY_API_VERSION } from "./shopify";
import { isDemoMode } from "./demoProducts";

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

test("Sandlådan använder Shopify, inte testkatalogen", () => {
  expect(isDemoMode()).toBe(false);
  expect(SHOPIFY_API_VERSION).toBe("2026-10");
});

test("Hela katalogen hämtas även efter första sidan", async () => {
  const inputs = [];
  globalThis.fetch = (async (_url, options) => {
    inputs.push(JSON.parse(options.body).variables);
    const second = inputs.length === 2;
    return Response.json({ data: { products: {
      edges: [{ node: { id: second ? "shopify-2" : "shopify-1" } }],
      pageInfo: { hasNextPage: !second, endCursor: second ? "end" : "next" },
    } } });
  });
  const products = await fetchProducts();
  expect(products.map((p) => p.node.id)).toEqual(["shopify-1", "shopify-2"]);
  expect(inputs[1].after).toBe("next");
});