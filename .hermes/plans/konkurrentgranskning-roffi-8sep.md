# Konkurrentanalys — Roffi (roffi.se, 8 sep 2026)

**Uppdrag:** Tredje delen i konkurrentserien till frallan. Roffi är inte en gravyrbutik — de är en humortrycks-butik (print-on-demand på textil, muggar och glas) — men deras produktfamiljer överlappar TaggaDets kataloger på sju punkter (kepsar, t-shirts, hoodies, muggar, tumblers, nyckelringar, glas) och deras sätt att kommunicera humor, designa-själv och fri frakt innehåller direkt överförbara lärdomar. Dokumentet bygger vidare på `konkurrentgranskning-taggaklubban-expertprint-8sep.md` (ton och struktur) och `saljgranskning-del2-glas-smycken-skarbrador.md` (prismätning).

**Källor:**

- `.firecrawl/roffi-startsida.md`, `-om-oss.md`, `-profil.md`, `-designa-tshirt.md`, `-glasunderlagg.md`, `-nyckelringar.md`, `-map.json` — crawlad Shopify-butik, Roffi AB, Ulricehamn
- Jämförelseunderlag: `konkurrentgranskning-taggaklubban-expertprint-8sep.md`, `saljgranskning-del2-glas-smycken-skarbrador.md`
- TaggaDets aktuella katalog: `src/lib/categories.ts` (23 produkttyper/tjänster + 18 tillfällen) och `src/lib/demoProducts.ts` (29 demo-produkter)

Alla priser i dokumentet är **jämförelsedata från källorna** — inget ska skrivas in i butikscopy enligt konventionen.

---

## 1. Roffis affärsmodell & positionering

**Erbjudande.** Roffi AB (org.nr 559532-7080, Ulricehamn, byggd av byrån Wubs) är en Shopify-butik i två våningar: (1) B2C-humortryck — färdiga motiv med attityd på herr-/dam-/barn-t-shirts, hoodies, kepsar, muggar, glas, glasunderlägg och solglasögon, plus (2) en B2B-profillinje ("Roffi Profil" + "Team Merch"/VNEXS) med profilkläder, bulkpriser och ett eget e-sport-sortiment (kaffemugg, vattenflaska, ölglas, drinkglas under VNEXS-etiketten). Därutöver en "Designa"-linje: designa din egen t-shirt/hoodie/mugg med bilduppladdning och text, och en outlet-samling. Produktionen är print-on-demand i Sverige ("Vi trycker i Sverige efter beställning"), leverans 1–3 dagar (2–4 för designa-själv), MOQ ner till ett plagg, fri frakt över 550 kr.

**Katalogens bredd (källa: `roffi-map.json`).** Kartan listar ~200 produkt-URL:er och ~30 samlingar. Slaktande av den bruttolistan: en stor andel är dubbletter och testartiklar — `-1`/`-2`-suffix på nästan varje motiv (`adulthood` + `adulthood-1`, `golf-ar-en-hobby` + `-1` …), `kopia`-produkter rakt av i katalogen (`termosmugg-big-boss-kopia`, `battre-med-rott-4-pack-kopia`, `kopia-kopia-testprodukt`), en stavfelsslug (`old-peopple`), och interna samlingar som läcker ut i sajtkartan (`dina-jason`, `igen`, `upsell-tshirt`, `upsell-hoodie`, `upsell-cap`, `upsell-drinkware`, `muggar-kopia`, `bastsaljare-kopia`). Samlingar för produktfamiljer som inte syns i menyn men finns som URL:er: `skarbrador`, `planbok`, `kapsyloppnare` — planerade men aldrig fyllda. Nyckelringssamlingen innehåller exakt **en** produkt ("Långfinger", 169 kr). `srsltid`-parametrar på dussintals URL:er visar att de driver Google Shopping-annonser.

**Prisläge (källa: startsida + produkt-sidor):**

| Produktfamilj             | Pris            | Notering                     |
| ------------------------- | --------------- | ---------------------------- |
| T-shirt herr/dam          | 269 kr          | Unisex, OCS-ekologisk bomull |
| Hoodie                    | 549–599 kr      |                              |
| Barn-t-shirt/hoodie       | 349 kr (hoodie) |                              |
| Keps                      | 219 kr          |                              |
| Kaffemugg med tryck       | 149 kr          |                              |
| Termosmugg designa själv  | 229 kr          |                              |
| Glasunderlägg 4-pack      | 99 kr           | Sex humorvarianter           |
| Nyckelring (LED-kristall) | 169 kr          | Enda produkten i samlingen   |
| Designa själv: t-shirt    | 249 kr          |                              |
| Designa själv: hoodie     | 649 kr          |                              |

**Målgrupp.** Vuxna 25–50 som köper hårt skämtmande presenter — arbetsplats­humor ("My boss is a clown", "Kunde varit ett mejl", "Meltdown manager"), föräldraliv ("Motherhood", "Adulthood", "Society"), träning ("Träningskompis", "Tar sats", "Redan trött"), golf ("Golf är en hobby") och syskon-/barnfamiljen ("Storebror", "Sladdis", "Kissar i poolen"). Tonen vågar det de flesta svenska presentbutiker inte våga: "Hey F\*ckface", "Zero F\*cks Given", "F\*ck this shit" är startsidans mest exponerade motiv. Affärsmodellen är volym i färdiga motiv — personaliseringen finns bara i designa-själv-linjen och är då kundens egen fil, inte butikens hantverk.

**Brister.**

- **Ingen egentlig personalisering i huvudsortimentet.** Produkterna är tryckta med färdiga motiv; det enda "egna" är att kunden laddar upp en bild själv. Det är POD-standard, inte hantverk.
- **Kataloghygien.** Test- och kopia-produkter live i den publika katalogen skriker halvfärdig drift — sökbar, annonslänkad och därmed kundsynlig.
- **Copy är mall på flera nivåer.** Om-oss-sidan ("där passion blir till kreativt hantverk", "började som en hobby", "genuint hantverk") är generisk tema-text — orden låtsas om hantverk som sajten aldrig visar. B2B-sidans svenska håller inte: "Skräddarsydd design **for** alla verksamheter", "**Vara** profilkläder anpassas", "MOQ"-jargong.
- **Hjältebilden är bokstavligen AI-genererad** — hero-filén heter `ChatGPT_Image_5_mars_2026_...png` och produktbilderna `image-gen_24.jpg`, `image-gen_71.png`. För en butik som säljer tryckkvalitet är det en ironi: produkten de säljer (trycket) är den enda som aldrig syntes förrän kunden öppnar paketet.
- **Tunna kategorier bakom bred meny.** Nyckelringar: 1 produkt. Glasunderlägg: 6 produkter. Samma produkt-motiv upprepas över t-shirt/hoodie/keps/mugg — bredden är illusorisk, det är ~60 motiv i ~8 bearbetningar.

**Slutsats.** Roffi är en **kommerciellt rak, digitalt hörbar humor-POD-butik** — betydligt mer "riktig butik" än Taggaklubban och Expertprint (fungerande kassa, annonser på, tydligt varumärke) men utan det TaggaDet säljer: permanent gravering, personlig text i flödet, en hantverkare. De är den farligaste av de tre granskade konkurrenterna på _kommunikation_ och den minst farliga på _produkt_.

---

## 2. Designspråk & budskapsanalys

**Produktnamnen är varumärket.** "Hey F\*ckface", "Zero F\*cks Given", "Kunde varit ett mejl", "Bättre med lite bubbel 4-pack", "Korkad." — namnen är hela produkten, och censurstrecken (\*) är ett medvetet grepp: det låter motiverade vara ännu mer tillåtna och delbara samtidigt som butiken tekniskt sett är "familjevänlig". Budskapet till kunden: _köp skämtet, inte plagget_. Det fungerar för presentjägaren som vill få ett skratt på kalaset — men det lämnar inget efter sig: plagget är utbytbart, motivet daterat, och om mottagaren inte fattar skämtet är presenten ett misslyckande.

**Struktur och trust.** Sajten är säljtekniskt vass: fri-frakt-tröskeln ("Fri frakt över 550 kr") syns i headern på _varje_ sida och som kvar-att-shoppa-räknare i varukorgen ("550 kr kvar till fri frakt"); varukorgslådan har "ANDRA KÖPER ÄVEN"-upsell med färdiga LÄGG TILL-knappar; produktsidor har draget "Snabb leverans (1–3 dagar) • Enkla byten", leveranstid, MOQ 1 och tre puffar ovanför köpknappen ("Scrollade du hit? Då är den här nog för dig"). FAQ-dragspillet på produktsidan besvarar de köpnära frågorna (tvätt, leverans, retur) direkt i beslutsmomentet. Detta är den mest mogna konverteringsmaskin vi granskat — och den kommunicerar _bekvämlighet och snabbhet_, inte varaktighet.

**Designa-själv-linjen.** Produktsidan låter kunden ladda upp bild (PNG/JPG/SVG, minst 2 000 px), skriva text, välja typsnitt, båge och rotation — med förhandsvisning "innan du beställer". Det är exakt den funktionalitet TaggaDets skiss-godkännande löser på ett annat sätt: Roffi låter kunden designersig själv (allt ansvar hos kunden, inga rättighetsproblem utöver en varningsrad), TaggaDet låter frallan skissa och kunden godkänna. Roffis version är snabb och självbetjänande; vår är varm och hantverksnära — men deras FAQ ("Kan ni hjälpa mig att justera designen?") avslöjar att kunder ändå vill ha hjälp, vilket är exakt det vårt flöde gör till huvudspår.

**B2B-sidorna.** Roffi Profil löftar utan startavgifter, bulkrabatt upp till 40 %, dedikerad kundansvarig och prioriterad frakt — fyra konkreta, mätbara löften i prydliga kort. Team Merch-sidan (med VNEXS e-sport) visar att de jagar förenings- och laggkunder med egen identitet. Svagheten är copyn (mallsvenskan ovan) och att löftena är opersonliga: "dedikerad kundansvarig" i en liten AB doftar mer callcenter än hos-mig-i-verkstaden.

**Sammanfattande budskapsbedömning.** Roffi signalerar: _roligt, snabbt, smidigt, lite upproriskt_. Det som sviktar: beständighet (tryck slits — FAQ:t tvättar plagget in i 30° för att trycket ska överleva), äkthet (AI-bilder, mallcopy), och djup i sortimentet. Varje svaghet är en TaggaDet-styrka — men bara om vi vågar vara deras motsats i stället för deras blekare kusin.

---

## 3. Överlappning med TaggaDet — sju gemensamma kategorier

Fyra av Roffis nav-kategorier finns redan som TaggaDet-kategorier i `categories.ts`, och tre till finns i katalogens periferi:

| Kategori (Roffi)  | TaggaDet-motsvarighet (`categories.ts`)           | Roffis pris                                                     | Teknisk skillnad                                           |
| ----------------- | ------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- |
| Kepsar            | `kepsar` (tryck/broderi)                          | 219 kr                                                          | Ingen — vi trycker också                                   |
| T-shirt / hoodies | `t-shirt`, `hoodies`                              | 269 / 549–599 kr                                                | Ingen — samma teknik                                       |
| Kaffemugg         | `muggar`                                          | 149 kr                                                          | Ingen                                                      |
| Tumblers/termos   | `tumblers` — **gravyr i stålet**                  | 229 kr                                                          | **Vi graverar, han trycker**                               |
| Glas              | `glas` — lasergraverad text                       | 99 kr/4-pack (underlägg), vinglas finns som URL men ej lanserad | **Vi graverar, han trycker/säljer glas med tryck**         |
| Nyckelringar      | `nyckelringar` (ek/läder/stål, graverad)          | 169 kr, 1 produkt                                               | **Vi graverar personligt, han säljer tryckt LED-kristall** |
| Solglasögon       | ingen — **struntprodukter för lasern, låt ligga** | —                                                               | —                                                          |

**Hur konkurrerar vi?** I textil-kategorierna (keps, t-shirt, hoodie, mugg) är vi tekniskt identiska med Roffi och prissatta i samma spann — där är vi en mindre, varmare version av samma sak och vinner bara på berättelsen och skiss­flödet. I **tumblers, glas och nyckelringar är det tekniska gapet avgörande**: Roffis text sitter i ett tryck som slits (deras egna FAQ rekommenderar 30° tvätt och "stryk inte på trycket"), TaggaDets gravyr sitter _i_ materialet — stålet, glaset, eken, skinnet — och deras motsvarande produkt blir aldrig personligare än det förtryckta motivet. Det är argumentet "gravyren slits aldrig" som redan finns i glas- och husdjur-copyn, och det ska skärpas just mot tryck-butikerna. Strategisk slutsats: textil-kategorierna är TaggaDets bredaste men svagaste terräng — vi bör inte försöka slå Roffi på humortryck, utan använda textilerna som sällskapsprodukter (matchande plagg till det graverade) och låta metall/trä/läder/glas bära differentieringen.

---

## 4. Produktgap vi kan fylla (det viktigaste)

Alla förslag anpassade för xTool F1 Ultra (fiber: metall; diod: trä, plywood, kork, läder, akryl, skiffer). Prisnivåer är förslag enligt tidigare prismätning — data till frallan, inte copy.

### 4.1 Glasunderlägg i ek/kork/skiffer — Roffis mest kopierbara produkt och graveringens idealobjekt

Roffi säljer glasunderlägg som 4-pack med tryck för 99 kr (`roffi-glasunderlagg.md`: "Bättre med lite bubbel/vitt/sprit/rött/öl", "Korkad."). Detta är **den enskilt bästa produktidén i hela deras sortiment att göra bättre**: platt, billigt råvara, diodlasern graverar sekundsnabbt i ek, kork och skiffer, graveringen sliter aldrig (tryckta filtkantare slits i diskmaskinen), och bildproduktion är trivial (platta objekt, `glasunderlagg_{plats}_{hash}.webp`).

- **4-pack glasunderlägg i ek med gravering** — namn, monogram eller dryckes­typen graverad — prisförslag **179–249 kr** (Roffi tar 99 kr för tryck; gravering + massivt trä motiverar premium).
- **Matchande set per dryck** — Roffis grepp "Bättre med lite öl/vitt/bubbel" är i sak ett _per-dryckestyp_-argument, exakt det saljgranskning del 2 lyfte för glas ("ölglas till fars dag = kraftigt sökord"). TaggaDet kan slå ihop det: glasunderlägg + glas i matchande 4-pack-per-dryck ("ölpaketet", "vinpaketet") — något Roffi inte kan, eftersom de inte graverar.
- **Skiffer-varianten** som premium (349–449 kr/4-pack) — svart skiffer, mörkergravyr, "husregler"-motivet.

### 4.2 "Med en blinkning" — humorgravyr som egen linje (inte kopia av Roffis ton)

Roffis strongestaste insikt är inte deras produkter utan deras **målgrupps­träff**: presenter med attityd säljer. Men deras humor är censurerad engelska importton ("Zero F\*cks Given") — det finns en lucka för **svensk, varm, torr humor graverad permanent**, i TaggaDets sepia-stämning. Konkret en tagg/kategori ("roliga texter" eller hellre: "med en blinkning") som samlar befintliga produktfamiljer med färdiga skämtmotiv att välja + egen text:

- **Kontorsskylten i ek** — Roffi säljer "Kunde varit ett mejl" och "My boss is a clown" på t-shirts; vi graverar samma känsla i en skrivbordsskylt i ek/mässing som står kvar år efter år. 249–349 kr.
- **Tumblern/hydrationen med torr svensk text** — gravering i stålet, 249–299 kr. Roffis termosmugg med tryck kostar 229 kr — vi tar drygt över med "den håller livet ut".
- **Pet tag-humorn** — Roffi har motiv som heter bokstavligen "Husse", "Matte", "Beast friend" och "Favorit" (`roffi-map.json`). Vår husdjurs-kategori kan låna _känslan_ (inte texterna): pet tag med "Husse" + telefonnumret graverat i rostfritt — 149–199 kr, redan delvis på plats (`demoProducts.ts` pet tag 179 kr), men saknar de färdiga "rollerna" som sänker valtröskeln.
- **Syskonserien** — Roffi säljer barnplagg med "Storebror/Storasyster/Mellanbarn/Sladdis/Lillebror/Lillasyster". På TaggaDet-sidan blir detta graverade syskonpjunk i ek eller matchande armband/pet tags per roll i familjen — dop- och barn-tillfällena finns redan som kategorisidor. 199–299 kr.

Ton-regeln: vi skämtar _med_ mottagaren, inte _åt_ honom — "pensionären som redan har allt", "grillmästaren" (finns redan), "toastmastern". Roffis "F\*ck"-register lämnar vi osrört: sepia-tonen är vår marginal mot deras volym.

### 4.3 Golfhumorn — de har trycket, vi har hela golflinjen

Roffis populära-motiv "Golf är en hobby" (269 kr t-shirt) bekräftar golf-humor som säljande segment — och TaggaDet har redan en unik golfposition (klubbgravyr med fiberlaser + golfpresenter). Gapet: **ball markers och divotverktyg i metall med roliga graverade texter** (torr småländsk ton) som lågpris-ingång till golfskåpet — 199–249 kr, redan delvis täckt av demo-produkten "Ball markers i metall med initialer" (199 kr). Deras humor-t-shirt blir vår humor-gravyr: trycket bleker, gravyren följer klubbsäcken i tio år.

### 4.4 Graverade logotyper på Roffis produktfamiljer — B2B-gapet

Roffi Profil trycker logotyper på textil och muggar. Fiberlasern ger TaggaDet en logotyp-tjänst de inte kan matcha: **företagets logga graverad i rostfritt stål och metall** — tumblers, presentaskar, dash-plaketter, idrottspokaler, pet tags. "Profilprodukten som inte tappar logotypen i diskmaskinen" är ett B2B-argument deras tryck aldrig kan säga. Konkret i vår struktur: utöka `/foretag`-sidans erbjudande (`categories.ts`, tagg `foretag`) med en "graverad logotyp i metall"-rad utöver staffeln — och lär av deras B2B-sidas fyra konkreta löpptext (bulkrabatt, dedikerad kontaktperson, prioriterad leverans) som redan ligger i vårt om-mig-format. VNEXS visar dessutom att e-sport-/förenings­lag är ett betalande segment — idrottspris-kategorin (trähjul + metallplakett, 349 kr i demoläge) riktar sig redan mot samma föreningar.

### 4.5 Presenter med Roffis present-tänk men graveringens permanens

Roffis copy säljer "roliga att bära och enkla att ge bort". Vi översätter det till graveringens språk: _gåvan som säger samma sak om tjugo år_. Konkreta luckor i demoläget (`demoProducts.ts`) som deras sortiment bevisat efterfrågan på:

1. **Glasunderlägg** (4.1) — störst gap, enklast att producera.
2. **Tumbler-demo-produkt** — kategorin `tumblers` finns, ingen demo-produkt än; Roffi tar 229 kr för tryckt termosmugg, vår graverade bör ligga 299–349 kr.
3. **Kaffemuggen** — kategorin `muggar` finns, ingen demo; Roffis 149 kr är prismätarens golv (tryck), graverad/motivmugg 179–229 kr.
4. **Syskon-gåvorna** (4.2) — barn/dop-tillfällena finns, produkterna saknas.

Prioriterad sekvens för jul-2026-fönstret: glasunderlägg → tumbler → mugg → kontorsskylt → syskonserie.

---

## 5. Vad vi lär oss av deras sajt (och vad vi låter ligga)

**Värt att låna (i TaggaDets ton):**

1. **Fri-frakt-kommunikationen.** Tröskeln syns på varje sida och som "550 kr kvar till fri frakt" i varukorgen — det är det enskilt mest effektiva greppet i deras kassa. TaggaDet bör (a) bestämma en tröskel som matchar vårt medelköp (Roffis 550 kr pressar upp varukorgen: två muggar räcker inte, man lägger till en tredje) och (b) visa kvar-att-shoppa-räknaren i CartDrawer. Formuleringen i vår ton: hantverks-argument ("slå ihop flera gravyrer i samma paket") i stället för Roffis logistik-ton.
2. **Upsell i varukorgen.** "ANDRA KÖPER ÄVEN" med färdiga LÄGG TILL-knappar direkt i CartDrawer — TaggaDets varukorg saknar rekommendationer idag; en "matchar din gravyr"-rad (t.ex. vinglas → matchande underlägg, pet tag → läderhalsband) passar både kundnytta och paket-logik.
3. **Köpnära FAQ.** Deras produktsides-FAQ (tvätt, leverans, retur) sitter i beslutsmomentet. TaggaDet har `vanliga-fragor.tsx` men inga FAQ-block på produktsidor — material/skötsel-copy från `productSpecs.ts` skulle kunna visas som dragspel under köpknappen.
4. **"MOQ 1"-budskapet.** Roffi skriver "MOQ på enbart 1 plagg" — vi har redan copyn ("från ett enda exemplar") men den ska vara lika tydligt synlig: personalisering är per definition enkelserie.
5. **Leveransdatum i realtid.** "Leverans 2–4 arbetsdagar" + "Normal leveranstid visas i kassan" — TaggaDets tillverknings-/leverans-copy finns på `frakt-leverans.tsx`; att visa datumet (inte antalet dagar) vid köpknappen är deras vassaste mikrodetalj och helt i vår "beställ i god tid"-andas.
6. **B2B-löptextens konkretion.** Fyra kort, fyra mätbara löften. Vår `/foretag` har staffeln; lägg till motsvarande kort ("offert inom ett dygn", "faktura", "fås i samma stil som era gravyrer") — med jag-form.

**Värt att notera men låta ligga:**

- **Outlet.** En outlet-samling signalerar överlag och volym — i TaggaDets tillverkning efter beställning finns inget lager att rea ut. Våra "små serier – när materialet är slut"-copy (`nyheter`-kategorin) är den hantverksriktiga versionen av samma knapphet.
- **Designa-själv-med bilduppladdning.** Roffis uppladdningsdesign med förhandsvisning är imponerande men (a) kräver ny teknik vi inte har, (b) flyttar ansvaret till kunden och (c) är deras schack-matt — vi konkurrerar inte där. Vår skiss-godkännande ("du får en digital skiss att godkänna") är den varma motsvarigheten och ska lyftas fram hårdare i stället, särskilt som Roffis egen FAQ visar att kunderna ändå ber om hjälp med designen.
- **Svordomsmotiven.** Säljer för dem; skulle skära av TaggaDet från dop-/bröllops-/företagssegmenten som är vår kärna. Torr värme, inte censurstreck.
- **Varningen i deras kataloghygien.** Kopia- och testprodukter, läckta upsell-samlingar och `ChatGPT_Image`-filnamn i produktion — allt TaggaDet redan gör bättre (riktiga demoläge, ärliga bilder i `public/images/products/`). Understryker: aldrig publicera halvfärdigt, aldrig låta "hantverk" stå i copy som inte kan backas.

---

## 6. Positioneringsråd — hur TaggaDet skiljer sig skarpt

Formeln som växt fram ur alla tre granskningarna: Taggaklubban har tekniken utan flöde, Expertprint har sortimentet utan berättelse — **Roffi har berättelsen (humorn) och flödet, men bara ett tryck som slits och en text som alla kan beställa**. TaggaDets position:

1. **"Trycket slits. Gravyren sitter."** Det skarpaste vapnet mot Roffi, och deras egna FAQ:t levererar beviset (30°, vänd ut och in, undvik torktumlare, stryk aldrig på trycket). TaggaDet behöver inte nämna dem — argumentet "det som graveras följer med hela livet" finns redan i vår copy och ska bli rubrik på startsidan-mötet med alla tryckbutiker.
2. **Personalisering är allt vi gör — hos Roffi är den en sidodörr.** Deras huvudsortiment är färdigtryckt; bara "Designa"-linjen låter kunden påverka. Hos TaggaDet är _varje_ produkt kundens egen text, inmatad i beställningen, med skiss-godkännande. Det är skillnaden mellan en butik som säljer skämt och en verkstad som gör _ditt_ minne.
3. **Humorn på våra villkor.** Roffi bevisar att attityd-presenter är en stor, betalande marknad. Vi tar marknaden med "med en blinkning"-linjen (4.2) — svensk, torr, varm humor graverad i material som står ut med tio år av skämt — i stället för att importera deras censurerade register. Presenten som fortfarande är rolig när tryck-t-shirten blivit trädgårdsduk.
4. **Metall, trä, läder, glas i samma beställning.** Roffis materialvärld är textil + tryckta ytor. Vårt spann (fiber + diod) låser paketen de inte kan offerta: bröllop, golf, husdjur, företag — matchande stil genom hela gåvan.
5. **Jag mot AB.** Roffi är "Roffi AB" och skriver "vi" i malltext om passion; TaggaDet är frallan som graverar i Aneby. Deras om-oss-sida använder ordet "hantverk" sju gånger utan att visa en verkstad — vår om-mig-sida visar processen och heter just det den är. Det är trovärdighetsgapet vi aldrig ska slösa.
6. **Same-sittning i textilerna — utan att förlora hantverket.** Vi behåller keps/t-shirt/hoodie/mugg som kategorier (de matchar Roffi på teknik och pris), men positionerar dem som sällskap till det graverade ("matchande plagg till laget"), aldrig som butikens mitt. Slaget mot Roffi står i tumblers, glas, nyckelringar, glasunderlägg — där graveringen gör deras tryck till gårdagens teknik.

---

## Avslutande not

Dokumentet ändrar ingen kod. Nästa steg för frallan: rangordna produktgapen i § 4 — glasunderlägg (ek/kork, 4-pack, per-dryck-set) är det tydligaste både-marginal-och-matchning-steget eftersom Roffi bevisat efterfrågan (99 kr tryckt 4-pack) och diodlasern producerar dem på sekunder. Därefter tumbler- och mugg-demo-produkter till de tomma kategorierna, och "med en blinkning"-taggen när det finns minst tre humorprodukter att fylla den med. Priser ovan är jämförelsedata; enda undantaget per konvention är serviceprislistorna i `categories.ts`.
