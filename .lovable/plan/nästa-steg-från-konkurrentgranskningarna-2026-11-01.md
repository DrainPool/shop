# Nästa steg från konkurrentgranskningarna

Det mesta från Roffi, Rofa, Gravyrbutiken, Medgravyr, Bynia, Stoor of Lappland och Personlignyckelring är redan gjort. Det här är det som återstår och som går att bygga utan påhittade omdömen, lager eller priser.

## 1. Fotogravyr i hela butiken (Personlignyckelring, Bynia)
- Ett kort avsnitt på startsidan: "Ditt foto, graverat i hög upplösning" med länk till produkter som tar foto.
- Märket "Fotogravyr möjlig" på produktkort och i sortimentsfiltret, styrt av en tagg i Shopify (`fotogravyr`).
- Egen sida "Fotogravyr" med hur det går till: ladda upp, skiss inom 48 timmar, godkänn.

## 2. Mängdrabatt för företag och bröllop (Gravyrbutiken, Rofa)
- Tydlig ruta på produktsidan: "Beställer du 10 eller fler? Begär offert." Länk till kontakt med produkten förifylld.
- Själva rabatten läggs i Shopify som automatisk rabatt när du bestämt nivåerna.

## 3. Akryl lyfts fram (Bynia, Stoor)
- Akryl som kort i kategoriraden och menyn, plus presenttipssida "Bröllop i akryl" (tårttopp, välkomstskylt, bordsplaceringar).
- Färg-/tjockleksinfo (3 mm standard, upp till 18 mm, alla färger på beställning) på akrylprodukterna.

## 4. Presenttips för fler sökord (Stoor, Gravyrbutiken)
- Nya sidor: "Present till pappa", "Present till mamma", "Present till husdjursägare", "Minnespresent". Länkar bara till riktiga produkter.

## 5. Specialbeställning med eget foto/skiss (Stoor, Medgravyr)
- Formulär för helt egen idé: beskrivning, mått inom 600×300 mm, valfri bild (använder samma privata uppladdning). Skickas till taggat@linsochlager.net.

## Väntar på dig
- Presentpaketens priser och innehåll.
- Riktiga verkstadsfoton och omdömen.
- Rabattnivåer för mängdköp.

## Tekniskt
- Tagg-baserade märken via befintlig `catalogSearch`/produktkort; nya presenttips i `giftTips.ts` + sitemap.
- Specialbeställning: server-funktion som skickar mejl, återanvänder fotouppladdningen.
- Ingen claim av Shopify, ingen provperiod.

Säg gärna vilka nummer du vill börja med, annars kör jag 1 → 5 i ordning.
