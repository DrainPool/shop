# Designpass 9 sep 2026 — sektioner, social proof, skrivspråk, kategorilayout

**Uppdrag (frallan):** designpass över _alla_ kategorier och undersidor — inte bara startsidan.
Golfkategorin ska ha en egen menygrupp (inte gömmas under "Till bilen").

## 1. Frisk crawl av taggaklubban.se (9 sep, via WebFetch — ingen Firecrawl-nyckel i .env)

Sektionsstruktur på startsidan (topp → botten):

1. Hero "Tagga din klubba!" + tre bilder
2. Introduktionstext med CTA
3. "Våra Tjänster" — fyra tjänstekort (namn på klubbor, företagslogga, mobil besök på banan, inköpshjälp)
4. Process 01–04 (Förfrågan → Bokning → Inlämning → Återhämtning) + alternativ "medan du väntar"
5. Prislista (tabell)
6. Material & teknik (tre block)
7. Kundomdömen (sex st, se nedan)
8. Avslutande CTA + footer

**Social proof:** sex namngivna omdömen med stjärnor — men betygen matchar stjärnorna inte (★★★★☆ till "5,0 av 5"), klassisk mall-data från Wix. Ingen Trustpilot/ordersiffror. Indirekt bevis: varumärkeslistning (Titleist, TaylorMade, Callaway, Ping, Srixon).
**Röst:** "vi"-röst + du-tilltal, premium-adjektiv ("exklusiv", "knivskarp", "oslagbar"). Ej förstaperson.
**Kategorilayout:** fyra bildkort (foto + rubrik + text). CTA-tungt: "Skicka in din förfrågan här!" upprepas ~7 gånger.

**Slutsats för passet:** deras svaghet är fortfarande mall-omdömen + AI-galleri + ingen köpflöde. Vår styrka: ärlig social proof-scaffolding, jag-röst, riktigt köpflöde. Inget behöver ändras _mot_ deras modell — tvärtom skiljer vi oss medvetet.

## 2. Genomförda ändringar (alla sidor, inte bara startsidan)

- **Megameny — golfen fri:** "Till bilen & Banan" delad i "Till bilen" (bil) och egen grupp "Golfklubbor" (tint `steel`, som stod oanvänd sedan textil-gruppen togs bort). 6 grupper = exakt 3+3-ruta; dubbelbredden på "Foto & 3D" (`md:col-span-2`) togs bort. CategoryBento bekräftad fri från golf/bil-koppling (grupperar per tillfälle).
- **Omdömen på produktsidor:** `ReviewSection` fanns men renderades ingenstans. Kopplad in på `produkt.$handle.tsx` före RelatedProducts. Ärlighetsramen gäller: bara riktiga omdömen; tom-läget bjuder in ("ditt blir det första") i stället för att hitta på — exakt motsatsen till taggaklubbans mall-stjärnor.
- **Dublett bort på kategorisidor:** det kompakta trust-bandet (Fri frakt/Digital skiss/Tillverkas här) upprepade ordagrant den globala löfte-raden under menyn (TrustPromises, flyttad hit samma dag). Bandet borttaget — färre sektioner, ingen dublett.
- **Röst-svep:** grep över src efter "vi/vår/ert/era"-glappar. Resultat: kvarvarande "vi" är kodkommentarer eller naturligt gemensamhets-svenska ("bokar vi in nästa tillverkning", villkorens legala "vi"). "era/ert" i bröllops-/företags-copy är pluralt kundtilltal, korrekt. Inga copy-ändringar behövdes — copyagentens tidigare pass höll.
- **Gallerimanifestets gräns:** `src/lib/galleryManifest.json` är AI-genererade produktbilder — får aldrig användas som "kundbilder" i CustomerShowcase (det var TaggaKlubbans svaghet: AI-galleri som ser ut att vara riktigt). Kundväggen förblir ärligt tom tills riktiga bilder/mejl kommer in.
- **21st.dev-inspiration:** `get_inspiration` gav enbart irrelevanta bookmarks (footer/map/confetti) — inget tredjepartskod hämtat, inga nya beroenden.

## 3. Efterslänt

- Kundväggen (CustomerShowcase) fylls när frallan får första bilderna (Instagram @linsochlager / mejl).
- Omdömes-data kopplas till en riktig tjänst senare; ReviewSection tar datan via props.
