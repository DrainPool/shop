import { expect, test } from "bun:test";
import { filterCatalog } from "./catalogSearch";

const products = [
  {
    node: {
      id: "glas",
      title: "Whiskyglas med gravyr",
      description: "En personlig gåva",
      tags: ["glas", "brollop"],
    },
  },
  {
    node: {
      id: "brada",
      title: "Skärbräda i ek",
      description: "Med personlig gravyr",
      tags: ["skarbrada", "brollop"],
    },
  },
];

test("Sökfältet hittar svenska ord även när Shopify-taggar saknar åäö", () => {
  expect(filterCatalog(products, "bröllop").map((p) => p.node.id)).toEqual(["glas", "brada"]);
  expect(filterCatalog(products, "skarbrada").map((p) => p.node.id)).toEqual(["brada"]);
});
test("Sökning och kategorifilter kombineras utan produktdubletter", () => {
  expect(filterCatalog(products, "gravyr", "glas").map((p) => p.node.id)).toEqual(["glas"]);
  expect(filterCatalog(products, "whisky", "skarbrada")).toEqual([]);
  expect(filterCatalog(products, "")).toHaveLength(2);
});

test("Nyckelringarnas motiv och material hittas i samma produkt", () => {
  const keyring = { node: { title: "Nyckelring med gravyr", description: "ek, rostfritt stål eller läder, reg.nummer, foto", tags: ["nyckelring", "fotogravyr"] } };
  expect(filterCatalog([...products, keyring], "", "nyckelring")).toHaveLength(1);
  expect(filterCatalog([keyring], "reg.nummer", "nyckelring")).toHaveLength(1);
});

test("Akrylprodukter hittas via kategori och sökord", () => {
  const topper = { node: { title: "Tårttopper i akryl med namn och ålder", description: "", tags: ["akryl", "plexiglas", "tarttopper"] } };
  expect(filterCatalog([...products, topper], "", "akryl")).toHaveLength(1);
  expect(filterCatalog([topper], "plexiglas")).toHaveLength(1);
  expect(filterCatalog([topper], "tårttopper")).toHaveLength(1);
});

test("Mikrofiberdukar, födelsetavla och golftavla hittas", () => {
  const duk = { node: { title: "Mikrofiberduk med egen logga", description: "", tags: ["mikrofiber", "barberare", "bilvard", "foretag"] } };
  const tavla = { node: { title: "Födelsetavla med bebis och namnskylt", description: "", tags: ["dop", "fodelse", "till-barn", "vaggkonst"] } };
  const golf = { node: { title: "Golfare i golfboll – väggkonst eller pokal", description: "", tags: ["golfpresenter", "farsdag", "idrott"] } };
  expect(filterCatalog([...products, duk], "", "mikrofiber")).toHaveLength(1);
  expect(filterCatalog([duk], "barberare")).toHaveLength(1);
  expect(filterCatalog([tavla], "födelsetavla")).toHaveLength(1);
  expect(filterCatalog([golf], "", "golfpresenter")).toHaveLength(1);
});
