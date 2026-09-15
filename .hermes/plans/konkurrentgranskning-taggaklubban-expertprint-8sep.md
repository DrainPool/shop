# Konkurrent- och gap-analys — Taggaklubban & Expertprint (8 sep 2026)

**Uppdrag:** Strategidokument till frallan inför produktsortimentet för TaggaDet. Två direkta konkurrenter i gravyr-nischen har crawlat och analyseras här mot TaggaDets demoläge (12 demo-produkter) och xTool F1 Ultras kapabilitet (fiber 20W: metall, djupgravyr; diod 20W: trä, plywood, läder, akryl, skiffer m.m.).

**Källor:**

- `.firecrawl/taggaklubban-startsida.md`, `-priser.md`, `-galleri.md`, `-om.md` — crawlad Wix-sajt, Taggaklubban, Haninge
- `.firecrawl/expertprint-shop.md`, `-champangeglas.md`, `-specialbestallning.md`, `-map.json` — crawlad WooCommerce-sajt, Expertprint, Vallentuna
- Egna tidigare insikter: `saljgranskning-del2-glas-smycken-skarbrador.md`, `saljgranskning-del3-firecrawl.md` (medgravyr, Rofa), `fiktiva-produkter-fas6.md`, `2026-09-02_090000-lanseringsplan.md`
- TaggaDets aktuella katalog: `src/lib/categories.ts` (15 produkttyper + 18 tillfällen, däribland tjänstekategorin golfklubbar med prislista) och `src/lib/demoProducts.ts` (12 demo-produkter)

Alla priser i dokumentet är **jämförelsedata från källorna** — inget av detta är butikscopy, och inget pris ska skrivas in i copy enligt butikens konvention.

---

## 1. Konkurrentsammanfattning

### 1.1 Taggaklubban (taggaklubban.se, Haninge)

**Erbjudande.** Renodlad nisch: lasergravyr på golfklubbor — namn, initialer, logotyper på klubbhuvuden i allt från smidda järn till kolstål och rostfritt stål. Fyra ben: (1) gravyr på kundens egna klubbor, (2) logogravyr till företagsevent, (3) **mobil laserenhet på golfbanan** — medlemsdagar och tävlingar, klubbor graveras "medan de spelar", (4) förmedling av inköp av nya klubbor (Titleist, TaylorMade, Callaway, Ping, Srixon, putters som Spider, Ai-One, Scotty Cameron). Expressläge "medan du väntar" (lämna in, ta en kaffe, hämta färdigt).

**Priser (källa: `taggaklubban-priser.md`):**

| Tjänst                  | Pris         |
| ----------------------- | ------------ |
| En klubba               | 595 kr       |
| Två klubbor             | 995 kr       |
| Tre klubbor             | 1 295 kr     |
| Helt klubbset           | Kontakta oss |
| Express medan du väntar | 495 kr       |

**USP.** Det mobila eventupplägget är deras enda verkliga differentiering — att graverat på plats vid första tee under medlemsdagen är något en butik utan mobila enheter inte kan kopiera lika enkelt. Teknikargumentet ("påverkar varken svingvikt eller balans", "tål extrema väderförhållanden och hårda slag") är dessutom korrekt och värt att låna i sak, inte i ordalydelse.

**Brister.**

- **Wix-mall-känsla genomgående:** sociala ikoner i footern länkar till `facebook.com`, `instagram.com` osv. — riktiga sajter länkar sina egna profiler, mallar länkar domänroten. Detta skriker "färdig mall som ingen byggt klart".
- **Ingen e-handel alls.** Allt går via intresseformulär ("Förfrågan") — ingen direktbeställning, inga priser per motiv, ingen personlisering inmatad online. Hela flödet är fördröjt via mejl.
- **Galleriet är AI-genererat** (bildfilerna heter bokstavligen `ai-generated-IMAGE.png`) med generiska etiketter — "Precision i Detalj: Laserskärare i arbete på lyxiga material" är lagerbildstext, inte hantverk från egen verkstad.
- **Omdömena ser mallgenererade ut:** sex omdömen med olika betyg (4,5/4,7/4,9/4,8/5,0/4,4 av 5) som var och en visar fel antal stjärnor mot betyget (★★★★☆ till "5,0 av 5") — klassiskt Wix-placerat innehåll, inte verifierade kundröster. Inga datum, ingen koppling till en riktig order.
- **Slarv i copy:** "veckstad" (för verkstad), dubbla mellanslag, tre olika formulärknappar i rad. Tunna textsidor; sidan "Om" är två stycken.
- **Enbens-tunn SEO:** hela sajten handlar om golfklubbor. Äger de sökorden "lasergravyr golfklubbor" kan de vinna där — men de täcker inget av allt annat gravyr efterfrågas på (presenter, skyltar, smycken). En Google-sökning på "gravyr Stockholm" ger dem ingen plats.

**Slutsats.** Taggaklubban är en _tjänstekonkurrent i en enda nisch_ och ett bevis på att golfgravyr är ett betalande segment (595 kr för en klubba är en hälsosam tjänstemarginal). De är dock lätta att slå på: inget köpflöde, inga riktiga bilder, mall-omdömen, och ingen produktkatalog alls. TaggaDets golfklubbs-sida (`src/lib/categories.ts`, slug `golfklubbor`) ligger redan utsatt med priser ~5 % under (565/945/1 230/470) och ett starkare flöde (skiss först, express, mobil graverat på banan, Aneby-inlämning).

### 1.2 Expertprint (expertprint.se, Vallentuna)

**Erbjudande.** WordPress/WooCommerce-butik med ~50 produkter i sju huvudkategorier (källa: `expertprint-shop.md` + `expertprint-map.json`): Accessoarer (4), Glas (5), Golfbollstryck (2), Idrottspriser (11), Namnskyltar (4), Skyltar (24 — därunder industriskyltar, informationsskyltar, "ingen reklam"-skyltar, mässings/dörrskyltar, parkeringsskyltar), Tavlor (1). Splittrad profil: dels B2B-skyltprodukt (maskinskyltar, ventilbrickor, varningsskyltar), dels B2C-presenter (graverade glas, glasstatyetter, golfpresenter). Specialbeställningssida med formulär ("Skräddarsydda Skyltar & Gravyr" på trä, metall, akryl, glas eller läder).

**Prisexempel (källa: `expertprint-shop.md`, `-champangeglas.md`):**

| Produkt                                               | Pris   |
| ----------------------------------------------------- | ------ |
| Aluminiumskylt industri                               | 90 kr  |
| Glasstatyett "Runsten"                                | 85 kr  |
| Diana – stående glasskylt med gravyr                  | 165 kr |
| Driver/Wedge/Putter (koppar)                          | 198 kr |
| Whiskeyglas rund botten med gravyr                    | 199 kr |
| Glasplakett utan sockel                               | 199 kr |
| Aluminiumtavlor                                       | 199 kr |
| Fickplunta med UV-tryck                               | 275 kr |
| Graverad dörrskylt i mässing                          | 399 kr |
| Carmen – glasstatyett                                 | 435 kr |
| Öl-/vin-/whisky-/champagneglas-set (2 st, med gravyr) | 499 kr |
| Golfboxen (present med golfbollar)                    | 795 kr |
| Golfbollstryck                                        | 835 kr |

**USP.** Bredd och lokalt fotfäste: fysisk adress i Vallentuna, personlig telefon på sidan ("Telefon: Filip: 0708802556"), 14 dagars returpolicy, och en imponerande mängd lokala landningssidor (`gravyr-stockholm`, `gravyr-vallentuna`, `gravyr-taby`, `gravyr-norrtalje` osv. i `expertprint-map.json`) som sannolikt rankar på geo-sökningar i Stockholmsområdet. Idrottspriser (11 produkter — pokaler, glasstatyetter, utskurna siffror) är en kategori TaggaDet i dag saknar helt.

**Brister.**

- **Personliseringen är ett mejl:** champagneglas-sidans viktigaste stycke lyder _"Önskas gravyr? Efter din beställning – glöm inte att skicka den text/bild/logo du vill ha graverad till info@expertprint.se. Skriv gärna ditt ordernummer."_ Hela personliseringsupplevelsen — det som är hela poängen med en graverad gåva — ligger utanför köpflödet och bygger på att kunden kommer ihåg att mejla. TaggaDets ProductCustomizer (text inmatad i kassflödet, sparas som line attributes) slår detta med råge.
- **Inga fungerande köpknappar:** varje produktkort visar "Kontakta oss"-knapp i stället för lägg-i-varukorg i crawl-datan — butiken är mer katalog än butik.
- **Noll social proof:** "0 customer reviews" på produktsidor, "Det finns inga recensioner än" på samtliga produkter.
- **Trasigt specialbeställningsflöde:** formuläret på specialbeställningssidan visar "Aktivera JavaScript i din webbläsare för att fylla i formuläret" — den enda vägen in för skräddarsydda beställningar är defekt.
- **Blogg-spam av värsta sort:** `expertprint-map.json` avslöjar 100+ artiklar med serienummerade dubbletter (`graverade-armband`, `graverade-armband-2`, `graverade-ringar` + `-2` …), läckta temademosidor (`/blogg/thembay-block/new-header`, `/blogg/hello-world`, `/h2-inner`, `/om-oss-old`) och sidor med trasiga URL-slugs ("hallbarhe", "hantverk" i `saljgranskning`-stil). Detta är AI-genererat SEO-innehåll som Google kan slå ner på — och det doftar inte hantverk.
- **Inkonsekvent teknik:** en del produkter är UV-tryck (fickplunta), inte gravyr — kunden vet inte alltid vad den får. "Ingen reklam"-skyltar och parkeringsskyltar är lågmarginal-standardvara som drar ner varumärket mot byggmarknad.
- **Splittrad berättelse:** B2B-maskinskyltar och B2C-bröllopsglas i samma butik ger ingen känsla av hantverk och ingen person bakom (utom "Filip" i telefonlistan). Ingen förstaperson, ingen process, inga processbilder.

**Slutsats.** Expertprint är en _katalog-konkurrent med bred sortiment men trasigt flöde_. De bevisar att det finns efterfrågan och prisnivåer på glas, idrottspriser, namnskyltar och golfpresenter — men deras svagaste punkter (personliseringsflödet, social proof, berättelsen) är exakt TaggaDets starkaste.

---

## 2. Prisjämförelse mot TaggaDets demoläge

TaggaDets demo-produkter (`src/lib/demoProducts.ts`, priser enligt tidigare prismätning i `saljgranskning-del2/3`):

| Produkt/kategori (TaggaDet)                          | TaggaDet (demo)                       | Konkurrent                             | Konkurrentens pris                     | Bedömning                                                   |
| ---------------------------------------------------- | ------------------------------------- | -------------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| Nyckelring i ek med namn                             | 179 kr                                | medgravyr (spann del 1–3)              | 58–239 kr                              | Mitt i spannet ✓                                            |
| Nyckelring med reg.nummer                            | 199 kr                                | —                                      | —                                      | Unikt ✓                                                     |
| Kors-hänge silver (dop)                              | 449 kr                                | expertprint har inga smycken i butiken | —                                      | Lucka ✓                                                     |
| Namnhalsband handgraverat                            | 449 kr                                | namnsmycken.com                        | 690–1 390 kr                           | Konkurrenskraftigt ✓                                        |
| Armband i läder med initialer                        | 399 kr                                | —                                      | —                                      | ✓                                                           |
| Charm/berlock                                        | 249 kr                                | silvermama (spann)                     | 249–690 kr                             | Botten av spannet ✓                                         |
| Parsmycke — två halsband                             | 890 kr                                | expertprint saknar                     | —                                      | Unikt ✓                                                     |
| Kedja med berlock                                    | 549 kr                                | —                                      | —                                      | ✓                                                           |
| Minnesask i ek                                       | 399 kr                                | —                                      | —                                      | Unikt ✓                                                     |
| Korg i ek med gravyr                                 | 349 kr                                | —                                      | —                                      | Unikt ✓                                                     |
| Glas (kategori finns, inga demo-produkter)           | 249–349 kr (planerat spann, fas6-dok) | expertprint glas-set (2 st) / rofa     | 499 kr / 269–379 kr                    | Under expertprint, i paritet med rofa ✓                     |
| Skärbräda i ek (kategori finns, inga demo-produkter) | 349–549 kr (planerat spann)           | AskYunik / Robro                       | 299 / 950 kr                           | Mitt emellan ✓                                              |
| **Golfklubbor (tjänst, `categories.ts`)**            | 565 / 945 / 1 230 / express 470 kr    | **Taggaklubban**                       | **595 / 995 / 1 295 / express 495 kr** | ~5 % under på alla rader ✓                                  |
| Mässing dörrskylt (idé, se § 4)                      | 299–399 kr (förslag)                  | expertprint                            | 399 kr                                 | Paritet ✓                                                   |
| Pet tag i metall (idé, se § 4)                       | 149–199 kr (förslag)                  | ej noterad hos någon av de två         | —                                      | Lucka ✓                                                     |
| Idrottspris/pokal (idé, se § 4)                      | 249–449 kr (förslag)                  | expertprint glasstatyetter             | 85–435 kr                              | Övre halvan — motiverat med metall/trä i stället för glas ✓ |

**Mönstret är tydligt:** TaggaDet ligger i dag _under eller i paritet med_ samtliga jämförbara prisnivåer, medan golftjänsten medvetet hålls strax under Taggaklubban. Marginalutrymme finns i glas (expertprint tar 499 kr för ett 2-pack där rofa tar ~300 kr/st) och i metallprodukter där råvaran är billig och graveringen bär priset. Ingen prissänkning behövs — nästa steg är att fylla luckorna som konkurrenterna bevisat finns betalande efterfrågan på (glas, idrottspriser, namnskyltar, golfpresenter).

---

## 3. Gap-analys — vad xTool F1 Ultra klarar som konkurrenterna inte erbjuder

### 3.1 Två lasrar i en verkstad — ingen av konkurrenterna spänner båda materialgrupperna

TaggaDets maskin kombinerar **fiberlaser (metall: rostfritt, aluminium, mässing, silver, koppar, anodiserad aluminium, djupgravyr)** och **diodlaser (trä, plywood, kork, läder, akryl, skiffer, belagd keramik)** i samma arbetspass. Taggaklubban graverar bara metall (golfklubbor) — deras Om-sida nämner "andra metalldetaljer och tillbehör" men butiken visar inga. Expertprint blandar glasgravyr, UV-tryck och skyltar men har inget trä-/lädersortiment att tala om. **Gapet:** en kund som vill ge ett _samlat personligt paket_ — metall + trä + läder i matchande stil (t.ex. bröllop: graverade ringaskar i trä, metallhängen till bröllopspartet, läder nyckelring till toastmastern) kan bara få det hos en verkstad med båda modulerna. Detta är ett positionerings-gap, inte bara produkt-gap (se § 5).

### 3.2 Metallgravyr på smycken — djup och permanent, inte yta

Expertprint har bloggposter om "graverade armband" och "graverade ringar" (dock utan produkter i butiken — kategori Accessoarer har 4 produkter, ingen smycken). Fiberlasern gör **permanent mörk gravering och djupgravyr i rostfritt stål och silver** — billigare råvara, högre upplevt värde, och gravyren slits aldrig. TaggaDet har redan smycken som största demokategori; det som saknas är _metallvarianterna_: rostfritt armband med gravering, mässingshängen, pet tags. Ingen av de två konkurrenterna säljer metallmärkta smycken i dag.

### 3.3 Pet tags — helt oskyddad kategori hos båda

Etsy-insikterna (branschen) rankar personliga djurprodukter som bestseller-nummer 2, men **varken Taggaklubban (endast golf) eller Expertprint (4 accessoarer, inga djurskyltar) har pet tags i sortimentet.** Rostfri/mässing-plattor är den billigaste råvaran i hela verkstaden, fiberlasern märker dem på sekunder, och namn + telefonnummer är exakt den personalisering TaggaDets flöde redan hanterar. Kombinera med diodmodulen: läderhalsband med graverat namn + metalltagg = komplett hundpaket.

### 3.4 Idrottspriser och pokaler — Expertprint bevisat marknad, svag täckning

Expertprint har 11 idrottspris-produkter (glasstatyetter 85–435 kr, Sendai-pokal, utskurna siffror/bokstäver, idrottsmotiv) och en bloggguide "idrottspriser med gravyr". **Gapet:** de är glas- och plast-tunga — inga pokaler med _metallplakett med djupgravyr_, inga träfotstycken graverade med föreningens namn, inga akrylpriser (diodlaser skär och graverar akryl fint). Lag och föreningar beställer sällan en — de beställer hela prisbordet till turneringen, volym som passar TaggaDets /foretag-offertflöde. Samma logik gäller **dash-plaketten till bilträffen** (finns redan i fas6-listan till 89 kr).

### 3.5 Golf: klubbgravyr + presenter — Taggaklubban har tjänsten, Expertprint har produkterna, ingen har båda

- Taggaklubban: graverar _dina_ klubbor (595 kr/st) — men säljer ingen enda fysisk produkt.
- Expertprint: säljer Golfboxen (795 kr) och golfbollstryck (835 kr) — men trycker bollar, graverar inte klubbor.
- **Gapet för TaggaDet:** hela kedjan. Fiberlaser märker klubbhuvudena (tjänstekategorin finns redan med priser), diodlasern gör _träpresentaskar, träfotstycken, ekplaketter med golfmotiv_ och plywood-golfboxar till presenten till golfspelaren som har allt, och metallen gör ball markers och divot-verktyg med initialer. En kategori-sida "Till golfaren" kan sälja tjänsten (gravyr på dina klubbor) + produkterna (presentask, plakett, ball markers) i samma svep — något ingen av de två kan.

### 3.6 Namnskyltar i mässing och aluminium — Expertprints 399 kr-dörrskylt utan hantverksnivå

Expertprint säljer graverad dörrskylt i mässing (399 kr) och namnskyltar i aluminium/förnicklad mässing/plast (4 st) — B2B-tunga, standardiserade, utan skiss-godkännande och med personliseringen via mejl. **Gapet:** fiberlasern gör samma mässingsskylt med djupare, skarpare gravering, och diodmodulen tillför trävarianter (ek-nyckelbricka till brevlådan, plywood-skylt till barnrummet — namnskylt till barnrummet är redan nämnd i TaggaDets kategoricopy men saknar produkt). Matchning mot befintliga tillfälle-sidor (nytt-hem, barn, dop) gör varje skylt säljbar på flera vägar in.

### 3.7 Specialbeställningsflödet — Expertprints största svaghet

Expertprints specialbeställningssida är deras enda väg in för skräddarsytt — och formuläret är trasigt (JS-varning i crawl). Deras glasprodukter kräver att kunden _mejlar gravyrtexten efter köpet_. TaggaDets motsvarighet: personliseringsfältet i ProductCustomizer, graveringstexten följer med ordern som line attributes (`cartStore.ts`), skiss-godkännande före laser ("du får en digital skiss att godkänna" — copy som redan finns på varenda kategorisida), och /kontakt + /foretag för volym. **Gapet är processmässigt:** "skiss först, personlig text i beställningen, aldrig mejl efteråt" är en kapabilitet ingen av konkurrenterna har — den ska synas i copy och struktur (se § 5).

### 3.8 Express medan du väntar — Taggaklubban tar betalt för det TaggaDet kan ge gratis

Taggaklubban prissätter expressläget till 495 kr som tillval. För små produkter (pet tag, nyckelring, charm) är graveringen ett minuter; en fibre-diod-verkstad kan positionera "graverat medan du väntar i verkstaden" som _ingår_ för vissa produkter och som rimligt tillval för klubbor — utan att kopiera deras 495-kronorskälvning. Notera: TaggaDets golf-prislista har redan en expressrad (470 kr, strax under), vilket är korrekt för klubbor — men för småprodukter är gratis-express ett konverteringsgrepp konkurrenterna saknar.

---

## 4. Rekommendationer — 15 produkt-/kategori-idéer

Sorterade: först tre topplistor per kriterium (marginal, bildkomplexitet, jul 2026), sedan sammanvägning. Prisnivåer är förslag enligt prismätningen (§ 2 + saljgranskning del 2/3) — **data till frallan, inte copy**.

### (a) Hög marginal (billig råvara, graveringen bär priset)

1. **Pet tag i rostfritt stål/mässing — namn + telefon** — 149–199 kr. Oskyddad hos båda konkurrenterna, fiberlaser sekundjobb, råvara ~noll. Kanske butikens bästa margin/krona-timme. (gap 3.3)
2. **Charm/berlock i metall** — 249 kr (demo-produkt finns) — utöka med djupgravering i rostfritt som premium-variant.
3. **Ball markers / divot-verktyg i metall med initialer** — 199–249 kr, golfflödet (gap 3.5).
4. **Namnbricka/dash-plakett i aluminium** — 89–129 kr (expertprint-paritet), volym till bilträffar och företag.
5. **Mässing dörrskylt med namn** — 299–399 kr mot expertprints 399 (gap 3.6).

### (b) Låg bildkomplexitet (platta objekt på neutral bakgrund — enkla att AI-generera eller fota, namngivning `{kategori}_{plats}_{hash}.webp`)

1. **Pet tag** (ovan) — platt metall, extremt enkel bild.
2. **Namnskylt i ek till barnrummet** — 249–349 kr; platt träyta, en bild per variant räcker.
3. **Gravörbricka i skiffer** — 349–449 kr; svart platta, mörkergravyr, fotografier sig själv.
4. **Julgranskula i plywood/trä med namn** — 199 kr (finns i fas6-listan); kulformat men enhetligt, en mall-bild per motiv.
5. **Presentask i plywood med monogram** — 249–349 kr; platt lockyta, graveringen är motivet.

### (c) Jul-2026-relevans (säljfönster november–december, "beställ i god tid"-copy finns redan på jul-sidan)

1. **Julgranskula med namn och årtal** — 199 kr; julkategori saknar demo-produkter i dag, kulorna är den klassiska jul-personaliseringen (rofa säljer julkulor 199 kr — exakt paritet).
2. **Julpaket: graverat glas + matchande kula** — 479 kr (fas6-idé redan formulerad); volym per order, glas-spannet 249–349 + kula 199 → paketpris.
3. **Läderplånbok med monogram** — 399–549 kr; Etsy-insikt nummer 3, julklapp till honom, diodlaser bränner permanent i skinnet.
4. **Presentask i plywood med monogram** (ovan) — "klapparna som redan är inslagna".
5. **Skärbräda i ek med julmotiv/favoritrecept** — 349–549 kr (befintlig kategori, fas6-copy klar, fattar bara demo-produkter); housewarming + jul i samma produkt.

### Sammanvägd prioritetslista (10–15 idéer, ordning = rekommenderad sekvens)

| #   | Idé                                                | Material/modul                  | Prisnivå | Marginal | Bild | Jul-26 | Motivering                                      |
| --- | -------------------------------------------------- | ------------------------------- | -------- | -------- | ---- | ------ | ----------------------------------------------- |
| 1   | Pet tag rostfritt/mässing, namn + telefon          | Fiber                           | 149–199  | ★★★      | ★★★  | ★★     | Oskyddat gap, snabbast att producera            |
| 2   | Julgranskula trä/plywood med namn                  | Diod                            | 199      | ★★       | ★★★  | ★★★    | Saknad jul-demo, paritet med rofa               |
| 3   | Skärbräda i ek (färdiga motiv + egen text)         | Diod                            | 349–549  | ★★       | ★★   | ★★★    | Kategori + copy finns, saknar produkter         |
| 4   | Graverat glas — öl/vin/whisky per dryck            | Diod (yta) / fiber (metallkant) | 249–349  | ★★       | ★★   | ★★★    | Under expertprints 499, paritet rofa            |
| 5   | Läderplånbok med monogram                          | Diod                            | 399–549  | ★★       | ★★   | ★★★    | Etsy-bestseller, "till honom"                   |
| 6   | Mässing dörrskylt till dörren/brevlådan            | Fiber                           | 299–399  | ★★       | ★★   | ★      | Paritet expertprint, bättre flöde               |
| 7   | Namnskylt i ek till barnrummet                     | Diod                            | 249–349  | ★★       | ★★★  | ★      | Trä-gap + barn/dop-tillfällena finns            |
| 8   | Plywood-presentask med monogram                    | Diod                            | 249–349  | ★★       | ★★★  | ★★★    | Julpresent-förpackning, enkel bild              |
| 9   | Idrottspokal: träfot + metallplakett med gravering | Båda                            | 249–449  | ★★       | ★★   | ★      | Expertprint bevisat marknad, glas-tungt där     |
| 10  | Ball markers/divot i metall med initialer          | Fiber                           | 199–249  | ★★★      | ★★★  | ★      | Golfkategorin saknar lågpris-ingång             |
| 11  | Läderhalsband + pet tag-paket till hunden          | Båda                            | 249–299  | ★★★      | ★★   | ★      | Bundling av #1, hund-presentflödet              |
| 12  | Gravörbricka i skiffer (husregel, hälsning)        | Diod                            | 349–449  | ★★       | ★★★  | ★★     | Enkel bild, gåva till hemmet                    |
| 13  | Dash-plakett aluminium till bilträffen             | Fiber                           | 89–129   | ★★       | ★★★  | ★      | Volym/B2B, expertprint-paritet                  |
| 14  | Golfpresentask i plywood + plakett i ek            | Diod                            | 299–449  | ★★       | ★★   | ★★     | Fyller gapet mellan klubbtjänst och golfpresent |
| 15  | Akryl-nattljus med namn (barnrum)                  | Diod                            | 249–299  | ★★       | ★★   | ★      | Etsy-insikt nummer 5, diodmodulen skär akryl    |

**Notering om glas (rad 4):** diodlasern graverar vinvärdigt på glas yta; expertprints glas är kristall. TaggaDets vinkel är "tål maskindisk, permanent gravyr inte tryck" — det copy-blocket finns redan på kategorisidan och ska behållas.

---

## 5. Positioneringsråd — vad TaggaDet kan säga som konkurrenterna inte kan

Konkurrenternas gemensamma svaghet: Taggaklubban har tekniken men inget flöde, Expertprint har sortimentet men ingen berättelse och trasig personalisering. TaggaDets position ska sättas i skärningspunkten — allt nedan går att säga **själv Sant** utifrån vad verkstaden faktiskt gör, och i förstaperson enligt butikens copy-regler:

1. **"Från rostfritt stål till ek och läder — samma händer, samma laser."** Ingen konkurrent spänner båda materialgrupperna. En mening på startsidan som sammanfattar gap 3.1 och låser kombinerade paket (bröllop, dop, golf) som konkurrenterna inte ens kan offerta.

2. **"Du godkänner en skiss innan lasern startar."** Varken Taggaklubban (förfrågan→bokning→bok) eller Expertprint (mejla texten efter beställningen) har detta. Det är redan TaggaDets copy på varenda kategorisida — lyft upp det till startsidans löfte, för det är konkurrenternas enskilt största process-gap (3.7). Robro Design har liknande ("digital illustration innan tillverkning") men bara för skärbrädor — TaggaDet har det för _allt_.

3. **"Personlig text skrivs in här, i beställningen — inte i ett mejl efteråt."** Självklart inte den formuleringen mot kund, men strukturellt: det syns i flödet att graveringstexten är ett fält i köpet. Expertprints mejl-cirkus är det TaggaDet ska accentuera genom att helt enkelt aldrig nämna den.

4. **"Graverat medan du väntar — inga veckors väntan på en nyckelring."** Taggaklubban tar 495 kr för express på klubbor; TaggaDet kan positionera medan-du-väntar som _normalfallet_ för småprodukter i verkstaden och behålla expressraden (470 kr) endast för klubbservice. Det är ett service-löfte konkurrenterna inte matchar utan att ändra affärsmodell.

5. **"Jag gör det här själv, här i verkstaden."** Förstaperson-jag:et är borta hos båda konkurrenterna (Taggaklubban skriver "vi" om ett företag som verkar vara en person; Expertprint är "Filip" bara i en telefonrad). TaggaDet har redan hela jag-narrativet + verkstadsadressen i Aneby + xTool F1 Ultra namngiven på golfsidan. Konkret: behåll maskinnamnet där det är relevant (golfsidan — teknikkunnig målgrupp) och låt "jag" bära resten. Inga påhittade omdömen — båda konkurrenterna bränner sig på mall-testimonialer och noll recensioner; TaggaDets ReviewSection ska förbli tom tills riktiga omdömen finns, hellre det än expertprints "Det finns inga recensioner än".

6. **"En partner till hela golfen"** — tjänst _och_ produkter: "graverar dina klubbor och gör presenten till den som redan har allt". Taggaklubban kan inte sälja en fysisk gåva, Expertprint graverar inte klubbor. TaggaDets golfkategorisida är redan strukturerad för tjänsten — fyll den med produktlänkar (raderna 10 och 14 i § 4) när produkterna finns.

7. **Geo-anspråk utan spam.** Expertprints 20+ lokala landningssidor (`gravyr-taby`, `gravyr-norrtalje` …) fungerar i dag men är sårbara (dubblettbloggar, temademo-läckor). TaggaDet behöver inte 20 sidor — en ärlig "gravyr i Småland, beställt online, levererat i hela Sverige"-position plus Aneby-verkstaden täcker det lokal sök TaggaDet rimligen vill äga, utan att bygga det som Expertprint riskerar en Google-sanering av.

---

## Avslutande not

Dokumentet ändrar ingen kod — nästa steg för frallan är att rangordna listan i § 4 (t.ex. pet tag + julkula + skärbräda + glas som första kullen inför jul-2026), varpå produkter förs in i Shopify med matchande taggar enligt Fas 6 i lanseringsplanen. Priserna i § 2 och § 4 är jämförelsedata och ska aldrig skrivas in i copy; servicepriser i `categories.ts` (golfklubbor) är undantaget enligt konvention.
