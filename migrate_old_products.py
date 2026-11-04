# Migrera gamla /butik-produkter till Taggat/Shopify
# Kör: python3 migrate_old_products.py <ADMIN_API_TOKEN>
# Skapar 16 produkter via Shopify Admin GraphQL API med bild-URL:er (Shopify laddar ner bilderna själv).
import json, sys, urllib.request

TOKEN = sys.argv[1] if len(sys.argv) > 1 else ""
SHOP = "sweet-savvy-shop-qfxf9-bktz9kkn"
API = f"https://{SHOP}.myshopify.com/admin/api/2026-10/graphql.json"

if not TOKEN:
    sys.exit("Ge Admin API-token som argument")

def gql(query, variables):
    req = urllib.request.Request(API, data=json.dumps({"query": query, "variables": variables}).encode(),
        headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=60))

# Gamla produkter från Supabase (nov 2026) med ny kategori-mappning
PRODUKTER = json.load(open("gamla_produkter_shopify.json"))

MUTATION = """
mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
    product { id title handle }
    userErrors { field message }
  }
}
"""

ok, fel = 0, []
for p in PRODUKTER:
    variables = {
        "input": {
            "title": p["title"],
            "descriptionHtml": p["description"],
            "tags": p["tags"],
            "status": "ACTIVE",
            "variants": [{"price": str(p["price"]), "inventoryPolicy": "NOT_TRACK", "inventoryQuantities": []}],
            "media": [{"originalSource": p["image"], "contentType": p.get("mediaType", "IMAGE")}],
        }
    }
    try:
        res = gql(MUTATION, variables)
        errs = res["data"]["productCreate"]["userErrors"]
        if errs:
            fel.append((p["title"], errs)); print(f"FEL  {p['title']}: {errs}")
        else:
            ok += 1; print(f"OK   {p['title']} → {res['data']['productCreate']['product']['handle']}")
    except Exception as e:
        fel.append((p["title"], str(e))); print(f"FEL  {p['title']}: {e}")

print(f"\nKlart: {ok} skapade, {len(fel)} fel")