# Genomför förbättringarna i sekvens

Arbetet görs i den ordning som ger mest effekt, en punkt i taget, med kontroll efter varje steg.

## Sekvens 1 – Live-förhandsvisning av gravyren (produktsidan)

- När kunden skriver text i formuläret visas den direkt ovanpå produktbilden, i valt typsnitt.
- Texten ligger i en diskret "graverad" ton (mörk bränd ton på trä/läder, ljus frostad ton på glas/metall) baserat på produktens typ.
- Texten skalas ner automatiskt om den är lång, radbrytningar följer formuläret.
- Tydlig rad under bilden: "Förhandsvisning – den exakta skissen får du innan jag graverar."
- Visas bara på första bilden och bara när det finns text; mobil och dator.

## Sekvens 2 – Säsongsstyrt tillfälleskort på startsidan

- Det stora kortet i tillfällesrutnätet väljs efter datum:
  - jan–feb: Alla hjärtans dag / företag
  - mar–jun: Konfirmation, student, bröllop, mors dag
  - jul–aug: Bröllop
  - sep–okt: Företagsgåvor, fars dag
  - nov–dec: Jul
- Övriga tillfällen ligger kvar som mindre kort, inga länkar försvinner (SEO oförändrat).
- Säsongen räknas ut så att sidan inte blinkar vid inladdning.

## Sekvens 3 – Ett enda leveranslöfte över hela sajten

- Samla leveranstexten på ett ställe och använd den på produktsidan, i varukorgen, på frakt-, villkors-, kontakt- och frågesidan.
- Dagens texter säger emot varandra (3–7 arbetsdagar kontra veckovis tillverkning). Jag hittar inte på nya tider – jag behöver dina riktiga siffror innan det här steget slutförs (se frågor nedan). Tills dess förbereds allt och den nuvarande texten "3–7 arbetsdagar" används överallt.

## Väntar på dig (kan inte göras av mig)

- Riktiga verkstadsfoton att byta ut de genererade bilderna mot.
- Dina första 5–10 skarpa produkter i Shopify och beslut om att stänga av demoläget.
- Bekräftade leveranstider: hur snabbt skissen kommer, tillverkningstid och om veckovis tillverkning gäller.

## Tekniska detaljer

- Ny `EngravingPreview` i `src/components/product/`; `ProductCustomizer` delar text/typsnitt via en liten zustand-slice eller callback till `ProductGallery`. Materialton från befintlig materialdetektering.
- `CategoryBento`: säsongsval i `useEffect` efter hydrering med stabil standard vid SSR.
- Ny `src/lib/delivery.ts` med konstanter som alla sidor läser.
- Efter varje sekvens: typkontroll, bygglogg och skärmdump av mobil + dator. `roadmap.md` uppdateras.
