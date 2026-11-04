# Sortiment, marknad och tekniska förbättringar

## Läget idag

- 38 demoprodukter i 40+ kategorier. Fem kategorier är helt tomma: muggar, tumblers, stickers, fototavlor och 3D-utskrifter. Det ser ut som en halvfärdig butik och späder ut menyn. Webbshopen är ju inte live än därav dem produkter! 
- Starkast idag: nyckelringar, glas, skärbrädor, smycken (dop), golf, husdjur, glasunderlägg och djupporträtt.

## Marknaden (svensk gravyr- och presentmarknad, bedömning)

- Personliga presenter växer, men konkurrensen är hård (Personliga, Roffi, Rofa, Glimmer). De tävlar på bredd och pris – jag bör tävla på hantverk, skiss innan gravyr och snabb leverans.
- Toppsäsonger: jul (okt–dec, störst), bröllop/student (maj–jun), Fars/Mors dag, dop året runt. Företagsgåvor till jul är högmarginal och missas ofta av småsäljare.
- Det som säljer bäst i nischen: husdjursbrickor, skärbrädor, läderplånböcker, glas till bröllop, minnesprodukter.

## Produkter att lägga till (passar xTool F1 Ultra)

1. Graverade termosmuggar/tumblers i rostfritt – fyller två tomma kategorier, säljer året runt och till företag.
2. Korkunderlägg och serveringsbrickor i ek till nytt hem/bröllop.
3. Fotogravyr på trä eller skiffer (minnestavla) – fyller "Fototavlor" och knyter an till fotograferingen.
4. Pennor och visitkortshållare i metall – företagspaket till jul.
5. Julpynt utöver granskulan: namnbrickor till julstrumpor, adventsljusstake i trä.
6. Kattbricka och hundskål-skylt – bygger ut husdjur som är en bestsellernisch.
7. Läderetui till AirPods/kortfodral – billig instegsprodukt under 300 kr.

## Att ta bort eller dölja

- Dölj tomma kategorier (stickers, 3D-utskrifter, muggar, tumblers, fototavlor) tills produkter finns – automatiskt: en kategori utan produkter visas inte i meny/ikonrad.
- Överväg att slå ihop nära dubbletter: "Kedja", "Barhalsband" och "Namnhalsband" kan bli en produkt med varianter. Samma för de tre roliga textversionerna av nyckelring/ölglas/skärbräda (blir motivval).
- Halloween har få produkter och låg köpvilja för gravyr – ta bort som tillfälle.

## Tekniska förbättringar

1. Dölj tomma kategorier automatiskt (meny, ikonrad, sitemap) – undviker tunna sidor som skadar SEO.
2. Produkt-JSON-LD: kontrollera att pris, lager och varumärke skickas korrekt så Google Shopping kan visa produkterna.
3. Säsongsschemat läses från Shopify (metafält) så du kan ändra kampanjer själv utan kod.
4. Bildoptimering: färdiga storlekar och lazy loading på produktkort för snabbare mobil.
5. Nyhetsbrevsformuläret kopplas på riktigt (Shopify Customer API) så e-postadresser sparas.
6. Riktiga omdömen via Shopify-app när första ordrarna kommit.

## Förslag på genomförande nu

- Steg 1: Dölj tomma kategorier och ta bort Halloween (kod).
- Steg 2: Skapa 6–8 nya produkter i Shopify enligt listan ovan – jag behöver dina priser, annars lägger jag in förslag som du justerar.
- Steg 3: Slå ihop halsbandsdubbletterna till varianter.
- Steg 4: Tekniska punkter 2–4.

## Teknisk sammanfattning

- `src/lib/categories.ts` + `CategoryIconRow`, `MegaMenu`, `sitemap[.]xml.ts`: filtrera kategorier mot produkttaggar.
- Nya produkter via Shopify-verktygen (batch), med demo-motsvarighet i `demoProducts.ts`.
- Säsongsdata: läs Shopify-metafält med fallback till `seasons.ts`.