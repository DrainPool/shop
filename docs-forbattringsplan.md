# Förbättringsplan Taggat-butiken (nov 2026)

## Läge
Butiken är LIVE på linsochlager.net/shop med 69 Shopify-produkter (Lovable-sandlåda —
Shopify-kontot ägs av Lovable, INGA admin-inloggningsuppgifter finns). Granskning 4/11.

## VAD JAG KAN GÖRA SJÄLV (kod i /home/drain/containers/tagat-shop, push till DrainPool/shop)

### Konvertering (störst värde)
1. **Koppla in döda komponenter** — ReviewSection, PaymentLogos, FreeShippingNudge,
   CartSuggestions, IdeaBand byggdes men importeras ALDRIG (0 träffar i routes).
   Betalloggor + gratisfraktnudge på produktsida = direkt konverteringslyft.
2. **Kontaktformulär** — kontaktsidan har bara mailto. Supabase-klienten finns i koden
   men SUPABASE_URL/KEY saknas i docker-bygget. Antingen: lägg till Fredriks Supabase
   (contact_submissions-tabellen lever) eller bygg server-funktion + Resend.
3. **Filter-UI på sortiment** — ProductFilters-komponent finns, renderas inte.

### SEO
4. **Canonical-fix** — renderas som <meta rel=canonical> (ogiltig). Kräver link-rel.
   Fix i TanStack-head-hantering (produkt.$handle.tsx + alla routes).
5. **Alt på galleribilder 2+** — ProductGallery sätter alt bara på bild 1.

### UX från Fredriks önskelista
6. Mörkt läge (dark mode toggle) — Tailwind v4, css-variabler finns troligen
7. Scroll-progress-bar + tillbaka-till-toppen-knapp
8. Skip-to-content-länk (a11y)

## VAD LOVABLE MÅSTE GÖRA (produktdatan lever i deras sandlåda)
Klistra in i Lovable-chatten:
- Lägg till 16 gamla butiksprodukter (se gamla_produkter-listan i migrate_old_products.py,
  kompletta med pris/beskrivning/bild/kategori-taggar)
- Betalningsmetoder i sandlådan (Klarna/Swish via Shopify checkout-config)
- Shopify-planval vid skarp drift: när butiken ska gå live på riktigt måste
  Shopify-prenumeration aktiveras (Lovable sandlåda → riktig butik)

## VAD FREDRIK BESTÄMMER
- Ska gamla /butik-länken i huvudmenyn (linsochlager.net Navbar.tsx) peka om till /shop?
  (3 ställen: rad 41, 225, 461)
- Ska gamla React-butiken (16 produkter) stängas av helt när migrering klar?
