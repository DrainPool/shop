# Bynia.se – analys och vad som saknas hos Taggat

## Vad Bynia säljer (startsidan, okt 2026)

Bynia är en nischad träskylts- och trätavelbutik. Huvudgrupper:

- **Gårds- och husskyltar**: fräst furu med bets, ek med svart relief, 3D-relief (ek + björk), fasadskylt med ram, skylthållare.
- **Boxskyltar** (häst/stall): massiv ek, flerskikt, guld-/silvertext, två tjocklekar ("Elegant 1 mm" / "Exklusivt 2–4 mm").
- **Personliga trätavlor**: familjetavla (rund), födelsetavla till barnrummet, "Du & jag", "Our first home", klassikertavla, ordlek i trä, citat-tavlor i Beskow/Carl Larsson-stil.
- **Medaljtavla** (En Svensk Klassiker, löpning).
- **Övrigt**: diplom i trä, båtskylt, luffarschack med egen text, odlingsetiketter för kryddor, hundsiluett i björk.

Bilder: riktiga mobilfoton i hemmiljö (vägg, grind, stall), alltid en närbild på gravyren, samt instruktionsbilder som visar hur texten placeras på tavlan.

## Vad Taggat redan har som överlappar

Dörrskylt i mässing, namnskylt till barnrummet, husskylt i skiffer, fotogravyr på trä, idrottspokal. Inget av Bynias trätavel-sortiment i övrigt.

## Nya produkter att lägga till (8 st, ej textil)

1. Gårdsskylt i furu med fräst text (bets i två kulörer)
2. Husskylt i ek med relief
3. Födelsetavla i björk (namn, datum, tid, vikt, längd)
4. Familjetavla rund (namn på familjemedlemmar)
5. Medaljtavla i trä (löpning/klassiker)
6. Boxskylt för stall/hästar (två tjocklekar som varianter)
7. Odlingsetiketter för kryddor (set)
8. Luffarschack i trä med egen text

Alla med egen svensk text i jag-form, egna titlar (inga kopierade texter), preliminära priser markerade som förslag som du justerar.

## Bilder

- Två AI-visualiseringar per ny produkt (miljö + vardag) i samma stil som resten av katalogen, märkta som AI-visualisering.
- Inspiration från Bynia: placering i verklig miljö (husvägg, grind, stallbox, barnrum) och alltid en närbild på gravyren. Inga av deras foton kopieras. Använd img/img 

## Kategorier

- Ny produkttyp **Skyltar & tavlor** i ikonraden (ikon genereras), som samlar befintliga skyltar och nya tavlor.
- Nya produkter taggas även mot befintliga tillfällen: födelsetavla → dop/barn, familjetavla/"vårt första hem" → bröllop/nytt hem, medaljtavla → farsdag/företag.



Citat-tavlor i Beskow/Carl Larsson-stil (risk för upphovsrätt), har gått ut varar bara 40år. Alt gör Snarlik citat. 

## Tekniskt

- `src/lib/demoProducts.ts`: 8 nya produkter med handle, taggar, varianter och bilder.
- `src/lib/categories.ts`: ny produkttyp `skyltar-tavlor` med tagg, kort text och ikon `src/assets/ikon-skylt.png`.
- `public/images/products/v2/{handle}_miljo.webp` + `_vardag.webp` genereras.
- `src/lib/productSpecs.ts`: material-/skötseltext för furu/björk.
- Shopify-produkter skapas när butiken är aktiv (samma data), enligt Shopify-först-regeln.
- Verifiering: typkontroll, build och kontroll att kategorisidan visar alla 8 med bilder.