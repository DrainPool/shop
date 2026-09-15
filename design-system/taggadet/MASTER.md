# TaggaDet — designsystem

Detta är butikens globala sanning för form, färg, typografi och rörelse. Läs den
här innan du bygger eller ändrar en sida. Avvikelser för en enskild sida hör
hemma i `design-system/taggadet/pages/<sida>.md`, som **överordnar** denna fil.

Koden är källan: allt nedan speglar `src/styles.css`. Om de två går isär är det
en bugg i den här filen.

---

## 1. Identiteten

TaggaDet säljer graverade och personliga presenter, gjorda för hand i Småland.
Formen ska kännas som **graverad platta och varmt papper** — inte som en
teknikbutik. Sepia, mässing och cream; mjuka former, mjuka skuggor, inga
skrikiga accenter.

Rösten är frallans egen: första person, varm, torr värme. Butiken är jag, inte
"vi". Läs även `CLAUDE.md` (Conventions) och konkurrentgranskningarna i
`.hermes/plans/`.

### Märket

Koncept **B, "Puns"** — gravörens stämpel: en grov ring med ett geometriskt T i
öppningen. Valdes september 2026 bland tre koncept; de andra två ligger kvar i
`design-system/taggadet/logo/` som `koncept-a-tagg.svg` och
`koncept-c-tagg-t.svg` för historikens skull, men är inte i bruk.

`BrandMark.tsx` är den enda källan till formen. Den ritas som **streck och ytor
för hand** — inget font→kontur-verktyg finns i repot, och ett märke ska inte
hänga på att Marcellus hunnit laddas.

| Fil                                                    | Roll                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------- |
| `src/components/BrandMark.tsx`                         | Märket. `fill="currentColor"`, `aria-hidden` om ingen `label` ges.  |
| `src/components/Wordmark.tsx`                          | Märke + "TaggaDet". Används i header och footer — kopiera den inte. |
| `public/favicon.svg`                                   | Flikikonen. Explicit fyllning, inte `currentColor` (se nedan).      |
| `public/favicon-32.png`, `public/apple-touch-icon.png` | Rasterreserv. Byggs via `logo/ikon.html`.                           |
| `public/og-default.png`                                | Delningsbild 1200×630. Byggs via `logo/og-default.html`.            |

**Färgen kommer från `currentColor`.** Märket har ingen egen färg — sätt
`text-gold` i footern och det ärver papprets sepia i headern. Det är därför
header och footer ser olika ut utan att vara olika komponenter.

**16 px är märkets prov.** Ett märke som inte går att känna igen i flikens
storlek är inte ett märke. Måtten är mätta, inte gissade — ändra dem inte utan
att först köra `preview.html#closeup`, som ritar märket i 16 px och förstorar
**rastret** (att förstora vektorn säger ingenting om hur fliken ser ut).

**`currentColor` löser till svart i en fristående SVG som laddas via `<img>`.**
Därför har `favicon.svg` literala fyllningar och en `prefers-color-scheme: dark`-
variant. Samma sak gäller varje framtida fristående SVG-märkesfil.

**Hjärtat betyder nu bara en sak: önskelistan.** Det var tidigare både
varumärkesornament och önskeliste-ikon. Ornamentplatsen tar märket, så `Heart`
från lucide ska bara förekomma i önskeliste-sammanhang.

---

## 2. Färg

Allt definieras i `:root` (ljust) och `.dark` (mörkt) i `src/styles.css`, och
registreras i `@theme inline` som `--color-<namn>` → `bg-<namn>`, `text-<namn>`,
`border-<namn>`.

**Regel: alla färger ska vara `oklch`.** Ingen hex, ingen rgb. Lägg aldrig en
färg direkt i en komponent — `grep` efter literala färgvärden i `src/**/*.tsx`
ska ge noll träffar, och gör det i dag.

### Hex-kommentarerna i `styles.css` är fel — lita inte på dem

`styles.css` har hex-värden i kommentarer bredvid varje token (rad 152–177).
**Alla åtta stämmer inte.** De beskriver en äldre palett, inte stavfel — avrundning
förklarar inte skillnaden. Uppmätt september 2026:

| Token                    | Kommentaren påstår | Faktiskt värde |
| ------------------------ | ------------------ | -------------- |
| `--primary`              | `#C8A96E`          | `#A38043`      |
| `--primary-deep`         | `#806027`          | `#735520`      |
| `--muted-foreground`     | `#6B6259`          | `#554F47`      |
| `--foreground` / `--ink` | `#141010`          | `#17100E`      |
| `--background`           | `#F8F5F0`          | `#F6F4EE`      |
| `--gold`                 | `#C8A96E-aktig`    | `#C69E58`      |
| `--border`               | `#E2DDD8`          | `#E1DDD8`      |
| `--cream`                | —                  | `#F1EEE7`      |
| `--background` (mörkt)   | —                  | `#19120F`      |
| `--primary-deep` (mörkt) | —                  | `#D4B273`      |
| `--gold` (mörkt)         | —                  | `#CFA761`      |

Raden 152 ("ink #141010, paper #F8F5F0, sepia #C8A96E…") är alltså en **gammal
palett**, inte en sammanfattning av den nuvarande. Behöver du ett hex-värde —
för en favicon, en delningsbild, ett mejl — räkna om `oklch`-värdet, eller läs av
det ur webbläsaren. Skriv inte av kommentaren.

Verktyget finns i repot:

```sh
node design-system/taggadet/rakna-om-oklch.cjs
```

Det skriver ut varje token med verkligt hexvärde och markerar vilka kommentarer
som inte stämmer.

### Sepians tre nivåer — den vanligaste fallgropen

| Token                                  | Roll                                                                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `--gold` `oklch(0.72 0.1 80)`          | Dekorativ accent. Guldtext på sepia-papper klarar **inte** 4.5:1 — använd den för ytor, ramar och ikoner, inte för brödtext.                  |
| `--primary` `oklch(0.62 0.09 80)`      | Sepian som **yta**: knappbakgrunder, badges, paneler.                                                                                         |
| `--primary-deep` `oklch(0.47 0.08 78)` | Sepian som **text**. Mörkt rostguld, kontrastsäkrat mot papper. Detta är butikens de facto-textfärg (179 användningar mot `text-primary`s 1). |
| `--ring`                               | Identisk med `--primary-deep`. Fokusringen ska alltid vara den mörka sepian.                                                                  |

Behöver du sepia i text: `text-primary-deep`, aldrig `text-primary`.

### Ytor

| Token                                  | Roll                                                                       |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `--background` `oklch(0.967 0.008 85)` | Papper. Sidans botten.                                                     |
| `--card` / `--popover`                 | Något ljusare än pappret — kort och paneler.                               |
| `--cream`                              | Dämpad varm yta för band och sektioner som ska skilja sig mjukt.           |
| `--ink`                                | Mörk sektion (hero, final-CTA). Använd `--ink-foreground` för text ovanpå. |

### Text, kant och semantik

| Token                                       | Roll                                                                         |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| `--foreground`                              | Nästan-svart, brödtext på papper.                                            |
| `--muted-foreground` `oklch(0.43 0.015 75)` | Dämpad text. Medvetet mörkare än den ursprungliga muted för att klara 4.5:1. |
| `--border` / `--input`                      | `oklch(0.9 0.008 80)`. Appliceras globalt via `* { border-color: … }`.       |
| `--destructive`                             | Fel och destruktiva handlingar.                                              |

### Megameny-färger

Sex tint per produktgrupp: `--menu-rose`, `--menu-wood`, `--menu-teal`,
`--menu-steel` (golf), `--menu-forest`, `--menu-plum`. Dämpad kroma så de smälter
in i sepia-världen. **De måste finnas i både `:root` och `.dark`** — filens egen
regel är att custom-färger följer med till mörkt läge.

### Lägga till en ny semantisk färg

1. Lägg variabeln i `:root` (ljust värde) **och** i `.dark` (mörkt värde).
2. Registrera den i `@theme inline` som `--color-<namn>: var(--<namn>)`.
3. Kontrollera kontrasten mot den yta den ska ligga på — 4.5:1 för text.

---

## 3. Typografi

Två familjer, båda självhostade i `public/fonts` som woff2. **Inga anrop till
Google Fonts** — skälet är GDPR (ingen tredjeparts-IP-läcka), och det ska inte
ändras. `latin-ext` täcker åäö. Endast latin-subsetten preloadas
(`src/routes/__root.tsx`).

| Token          | Familj        | Roll                                                 |
| -------------- | ------------- | ---------------------------------------------------- |
| `--font-serif` | **Marcellus** | Rubriker och kickers.                                |
| `--font-sans`  | **Work Sans** | Brödtext. Sätts aldrig per element — den är default. |

**Marcellus finns bara i vikt 400.** Det är inskrifts-typsnittet i sig, byggt på
romerska inskriptioner — huggna bokstäver, inga fetter. `.font-serif` tvingar
därför `font-weight: 400` så webbläsaren inte syntetiserar en utsmetad fetstil.

> **Lägg aldrig `font-bold`, `font-semibold` eller `font-medium` på ett element
> som har `font-serif`.** De är död vikt — regeln slår ut dem. Se § 10.

**Handstilsfonten är borttagen och ska inte tillbaka.** Sneda accentrader lästes
billiga i stället för hantverkade.

### Kickers (accentraderna)

Accentraderna under rubriker — "Bra att veta", "Mitt löfte", "från verkstaden" —
renderas som **romerska inskrifter**: versaler med bred spärrning i Marcellus.
Klassen heter `.font-inscription` (hette tidigare `.font-script`, ett
vilseledande namn). Den ligger oskiktad i `styles.css` och sätter familj,
versaler och spärrning; storlek och färg sätts per användning.

Kanonisk kicker: `font-inscription text-sm text-primary-deep md:text-base`.
Varianter som finns och är avsiktliga: `text-gold` på mörk botten,
`text-xs`/`text-[11px]` i trånga kort.

**Använd `<Kicker>`** (`src/components/Kicker.tsx`) i stället för att skriva
strängen. Den stod ordagrant på 34 ställen och bor nu på ett. Sätt radavstånd
och marginal via `className` — `<Kicker className="mt-6">` — för komponenten har
ingen egen åsikt om var den sitter.

Skriv texten i **vanlig mening**: `font-inscription` visar den redan versal, och
sätt ingen `tracking-*` (spärrningen är satt; en `tracking-*` vore död). Det
gäller även de tio avvikarna, som medvetet står kvar för hand: fem med
`text-gold` på mörk botten, tre med `text-xs`/`text-[11px]` i trånga kort,
`HomeHero` (färg via `.gold-accent`, plus `hero-rise`) och `CategoryBento` (en
`<h3>` som råkar bära klassen, inte en accentrad).

### Skalan

| Roll              | Klasser                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| Hero-h1           | `font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.06] tracking-tight` |
| Sidans h1         | `font-serif text-4xl tracking-tight md:text-5xl`                           |
| Sektionsrubrik h2 | `font-serif text-2xl md:text-3xl`                                          |
| Underrubrik h3    | `font-serif text-xl`                                                       |
| Kicker            | `font-inscription text-sm text-primary-deep md:text-base`                  |
| Brödtext          | `text-sm` (dominant) / `text-base`                                         |
| Liten text        | `text-xs`                                                                  |
| Radavstånd        | `leading-relaxed` för löptext; `leading-[1.06]` för stora rubriker         |

`tracking-tight` hör till serif-rubriker. Kickers får sin spärrning från klassen
och ska inte ha `tracking-*`.

---

## 4. Form

**Radie.** Bas `--radius: 0.9rem`, med sju derivat `--radius-sm` … `--radius-4xl`.
I praktiken används tre: `rounded-full` (knappar, chips, badges — butikens
pill-språk), `rounded-2xl` och `rounded-3xl` (kort).

**Skuggor.** Exakt två, båda varma och med låg opacitet:

- `--shadow-soft` — standard på kort och knappar.
- `--shadow-lift` — lyftet vid hover.

`shadow-sm/md/lg` hör inte hemma i butikens egna komponenter.

**Kortytan.** `.card-shop` i `styles.css` är den avsedda enda kortytan:
`--radius-3xl`, kantlinje, `--card`, `--shadow-soft`, och en hover som lyfter
4 px med `--shadow-lift` och guld-kant. Övergången animerar bara `transform`,
`border-color` och `box-shadow` — aldrig `all`.

**`.card-shop` vinner över Tailwinds utilities — även `rounded-none`.** Klassen
ligger i `@layer utilities` men _efter_ Tailwinds genererade utilities i
källordningen, och källordningen avgör inom ett lager. Mätt på riktiga element
(`design-system/taggadet/skiktprov.html`, Tailwind 4.3.3):

| Klasser                      | Radie   | Skugga          |
| ---------------------------- | ------- | --------------- |
| `card-shop` + `rounded-2xl`  | 26,4 px | `--shadow-soft` |
| `rounded-2xl` ensam          | 22,4 px | —               |
| `card-shop` + `rounded-none` | 26,4 px | —               |
| `card-shop` + `shadow-none`  | —       | ligger kvar     |

Två konsekvenser: **`rounded-none` och `shadow-none` kan inte stänga av** ett
`.card-shop`, så ett kort som behöver annan radie får inte bära klassen alls.
Och en samtidig `rounded-*`/`shadow-*` på ett `.card-shop`-element är
verkningslös — den gör ingen skada men **ljuger om vad som styr**, och ska
därför inte skrivas. Använd `card-shop` + padding, inget mer.

**Sektionsrytmen — skalan (dokumenterad 2026-09-15, ännu inte tillämpad).**
Mätt med `design-system/taggadet/rytminventering.cjs`: **32 fullbreddsytor**
bär vertikal padding, och mobilvärdet har **fem** steg. Det här är den kanoniska
skalan. Ingen befintlig `py-*`/`mt-*` ändrades när den skrevs ned — ett eget pass
får lägga om rytmen med tabellen som facit.

| Roll                     | Mobil   | Desktop    | Exempel                                               |
| ------------------------ | ------- | ---------- | ----------------------------------------------------- |
| Hero                     | `py-24` | `md:py-36` | `HomeHero` — bara en yta, ska förbli ensam            |
| Stort band               | `py-16` | `md:py-24` | `FinalCta`, `ProcessSection`                          |
| Sektionsband (editorial) | `py-16` | `md:py-20` | `CategoryBento`, `StorySection`                       |
| Standardsection          | `py-16` | `= mobil`  | `<main>` i `__root`, `retur`, `garanti`, `onskelista` |
| Kompakt section          | `py-12` | `= mobil`  | `IdeaBand`, `TrustFaq`, `foretag`, `om-mig`           |
| Smal / utility           | `py-10` | `= mobil`  | `SiteFooter`, `produkt.$handle` (relaterat)           |

**`py-14` är drift, inte en roll.** Fem ytor bär den (`GiftBundles`,
`integritetspolicy`, `kontakt`, `tillverkningsprocessen`, `villkor`), och den
ligger mitt emellan `py-12` och `py-16` utan att någon av dem skiljer sig från
den i uppgift. Vid omläggningen ska var och en av dem väljas in i `py-12` eller
`py-16` efter innehållsvikt — inte flyttas mekaniskt.

**Två saker skalan avslöjar som skalan inte själv löser:**

1. **`py-24` betyder två olika saker.** `FinalCta` och `ProcessSection` skriver
   `py-16 md:py-24` — alltså "stort på desktop". `fotografering`,
   `kategori.$slug:105` och `produkt.$handle:126` skriver `py-24` utan
   brytpunkt — alltså "stort även på mobil". Samma tal, två avsikter. Den som
   lägger om rytmen måste avgöra vilken av dem som gäller, för klassnamnet gör
   det inte.
2. **Bara 8 av 32 ytor andas olika på mobil och desktop.** Resten bär samma
   `py-16` i 400 px som i 1440 px. Det är den enskilt största rytmfrågan, och
   den syns inte i en tabell över värden — bara i hur sidan känns på telefon.

**Inbäddade sektioner** (en `<section>` inuti en yta som redan har padding) styrs
av `mt-*`, inte `py-*`: **42 stycken** bär `mt-10` eller mer, med `mt-14` som
standard och `mt-10` som kompakt variant. `mt-12` och `mt-16` är mellanlägen utan
egen roll. Hårlinjevarianten (`border-t border-border`) tar samma `mt-*` som en
vanlig sektion och lägger `pt-8`/`pt-10` inuti — den är en variant, inte en egen
roll.

**De två mekanismerna sitter på olika element**
(`design-system/taggadet/elementfordelning.cjs`, klammer-medveten skanner):

| Rytm             | Element                                              |
| ---------------- | ---------------------------------------------------- |
| `py-10`+ (32 st) | `<div>` 17 · `<section>` 8 · `<article>` 4 · `<p>` 3 |
| `mt-10`+ (42 st) | `<section>` 21 · `<div>` 12 · `<p>` 4 · övriga 5     |

Fullbreddsrytmen bor alltså mest på `<div>` — det finns inget element att haka
regler på — medan den inbäddade rytmen mest bor på `<section>`. Det är därför
`rg '<section'` ger en missvisande bild av hur många ytor som faktiskt andas.

Därför normaliseras inte rytmen här. Ett svep över `py-*` skulle träffa 32 ytor
och lämna de 42 `mt-*`-sektionerna orörda — och luften mellan sektioner är den
som bär sidan. Ett svep över båda samtidigt är ett eget pass, med skalan ovan
som facit.

---

## 5. Rörelse

| Token             | Värde                          | Roll                                              |
| ----------------- | ------------------------------ | ------------------------------------------------- |
| `--duration-fast` | 150 ms                         | Färg- och kantbyten (hover).                      |
| `--duration-base` | 300 ms                         | Kort, paneler, det dominerande värdet i markupen. |
| `--duration-slow` | 500 ms                         | Sektionsavslöjanden.                              |
| `--ease-soft`     | `cubic-bezier(.22, 1, .36, 1)` | Butikens kurva. Även `ease-soft` som utility.     |

Tailwind 4 har **ingen** `--duration-*`-namnrymd (`duration-*` tar bara bara
tal), så tiderna lever som CSS-variabler. Projektets egna klasser konsumerar dem;
i markup används Tailwind-klasserna (`duration-300` = `--duration-base`).

**Animera bara `transform` och `opacity`.** Aldrig `width`, `height`, `top`
eller `left`. `transition-all` är förbjudet i butikens klasser.

`tw-animate-css` ger `animate-in`/`animate-out` för Radix-överlägg — används
flitigt och ska vara kvar.

### Rörelse ska kunna stängas av

Tre nivåer finns redan och ska hållas vid liv:

1. CSS-media queries för projektets klasser (`.hero-rise`, `.card-shop`,
   `.marquee-track`, `.liquid-loader-blob`).
2. Tailwind-varianten `motion-reduce:` i komponenter.
3. `matchMedia("(prefers-reduced-motion: reduce)")` i JS för scroll-reveal.

All ny rörelse behöver en av dessa.

---

## 6. Ikoner

**`lucide-react` är det enda ikonbiblioteket.** Inga emojis som strukturella
ikoner — emojis är fontberoende och går inte att styra med tokens.

Ikonstorlek i butikens egna komponenter: `h-4 w-4` / `h-5 w-5` (och `h-3.5 w-3.5`
för små). `ui/`-primitiverna använder `size-4`.

**Dekorativa ikoner ska ha `aria-hidden="true"`.** Ikoner som bär egen mening
(magniförstoringsglaset i sökfältet, hjärtat i enbart-ikon-knappar) behöver en
tillgänglig namnskälla — `aria-label` på knappen, eller synlig text intill.

**Varje ikon ska ha ett beslut, inte ett antagande.** En lucide-ikon intill
synlig text är dekor och ska ha `aria-hidden="true"`; en ikon som är enda
innehållet i en kontroll behöver `aria-label` **på kontrollen**, och ikonen
inuti blir då dekor. Är ikonen redan dold av en förälder med `aria-hidden` ska
den **inte** ha ett eget — det blir dubbelt.

**`Heart` är förbehållet önskelistan.** Se § 1 — varumärkesornamentet är märket.

Kategori-ikonerna i `src/assets/ikon-*` är egna line-art-tillgångar, inte lucide.
En kategori utan ikon får en lucide-fallback i `CategoryIconRow`.

---

## 7. Tillgänglighet

Butiken ligger bra till här — behåll nivån.

- Global fokusring i bas-lagret: `:focus-visible { outline: 2px solid
var(--primary-deep); outline-offset: 2px }`. Den täcker även element som
  saknar egna ring-klasser. **Sätt inte `focus-visible:outline-none` utan att
  ersätta den med något minst lika tydligt.**
- Skip-link till huvudinnehållet finns i `__root.tsx`.
- Live-regioner (`role="status" aria-live="polite"`) för varukorg, filter och
  sökresultat.
- Tryckytor: mönstret `h-11 w-11 md:h-9 md:w-9` ger 44 px på pekskärm och
  kompaktare med mus.
- Bilder: beskrivande `alt` för meningsbärande bilder, `alt=""` +
  `aria-hidden="true"` för dekor.

---

## 8. Röst och copy

- **Allt på svenska.** Första person, "jag" — aldrig "vi".
- **Aldrig priser i copy.** Priser ändras. Formatering går via `formatPrice()`
  i `src/lib/shopify.ts` (sv-SE, utan decimaler). Undantaget är
  servicekategoriernas `pricing`-block (t.ex. golfklubbor), där priserna är data
  i `categories.ts` by design — tjänster är inte Shopify-produkter.
- Presentpaket länkar till riktiga kategorisidor. Inga påhittade paketpriser.
- Torr värme. Vi skämtar **med** mottagaren, inte **åt** hen.
- Undvik "marketingsvenska" och premium-adjektiv-stackar.

---

## 9. Anti-patterns

Uttalat förbjudna — de flesta är hämtade ur konkurrentgranskningarna, där just
de här greppen är varför konkurrenterna ser billiga ut.

| Gör inte                                                     | Varför                                                                                                                                                                                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Påhittade omdömen, eller stjärnbetyg som inte matchar texten | `ReviewSection` förblir ärligt tom tills riktiga omdömen finns. Tom-läget bjuder in ("ditt blir det första") i stället för att hitta på.                                                                           |
| AI-bilder som utger sig för att vara kundverklighet          | `galleryManifest.json` är AI-genererade **produkt**bilder och får aldrig användas som kundvägg. `CustomerShowcase` är tom tills frallan har riktiga bilder. AI-genererade produktbilder i demoläget är däremot OK. |
| Påhittade mått per produkt                                   | Exakta mått bor i produktbeskrivningen. `productSpecs.ts` ger material- och skötselcopy per tagg, inga uppfunna siffror.                                                                                           |
| Outlet- eller rea-logik                                      | Signalerar överlager. Butikens linje är små serier — när materialet är slut är det slut.                                                                                                                           |
| Designa-själv med bilduppladdning                            | Flyttar ansvaret till kunden. Butikens flöde är att **du godkänner en skiss innan lasern startar**.                                                                                                                |
| Svordomar, censurstreck, chockerande motiv                   | Skulle skära av dop-, bröllops- och företagssegmenten, som är kärnan.                                                                                                                                              |
| Dubbla budskap mellan sektioner                              | Ett trust-band togs bort just för att det dubblade `TrustPromises`.                                                                                                                                                |
| Geo-landningssida-spam                                       | En ärlig position ("gravyr i Småland, beställt online, levererat i hela Sverige") slår tjugo tunna sidor.                                                                                                          |
| Emojis som strukturella ikoner                               | Använd lucide.                                                                                                                                                                                                     |
| Nya tredjepartsberoenden i onödan                            | Layouter bygger på `src/components/ui/`. Inga parallella komponentsystem.                                                                                                                                          |
| Att skriva in konkurrentpriser i butikscopy                  | Siffrorna i `.hermes/plans/` är jämförelsedata, inget annat.                                                                                                                                                       |

---

## 10. Kända avvägningar och efterslänt

Saker som är medvetet ogjorda eller som väntar på ett eget pass.

**`favicon.ico` är fortfarande scaffold-ikonen.** Den är en enda 256×256-PNG i en
ICO-container sedan `Initial release` och visar alltså **inte** TaggaDets märke.
Den kan inte ersättas utan ett bildverktyg som kan skriva ICO, och repot har
inget (och inga nya beroenden får läggas till). Därför ligger `favicon.svg` först
i `__root.tsx` och `.ico` kvar sist som sista utväg — varje webbläsare som klarar
SVG-favicon tar märket, och bara de riktigt gamla ser scaffold-ikonen. Att döpa om
en PNG till `.ico` vore att förfalska formatet och görs inte.

**Mörkt läge är förberett men oaktiverat.** `.dark`-blocket är komplett och
internt konsekvent, men ingenting aktiverar det — ingen toggle, ingen provider,
ingen `prefers-color-scheme`. Sajten är i praktiken light-only. Aktivera inte
halvvägs: det kräver ett eget pass där varje sida ses i båda lägena.

**Knapphöjder.** `h-9` (36 px), `h-8` (32 px) och `h-10` (40 px) klarar WCAG 2.2
AA:s 24 px-krav men inte Apples och Materials 44 px-rekommendation. Att höja dem
är en visuell omläggning av hela sajten, inte en städning — därför ogjort.

**Död vikt på serif-rubriker — ÅTGÄRDAT 2026-09-15.** Eftersom `.font-serif`
tvingar vikt 400 var `font-bold`/`font-semibold` verkningslösa på de elementen.
Svepet tog bort **78 förekomster i 26 filer** (0 `font-medium` fanns).
`font-bold` 57, `font-semibold` 21. `font-bold` finns kvar på element _utan_
`font-serif` — det är där den gör nytta. Kontrollkommando:

```sh
rg -n -e 'font-serif.*font-(bold|semibold)' -e 'font-(bold|semibold).*font-serif' src --glob '*.tsx'
# ska ge noll träffar
```

**Lärdom från svepet:** att ta bort en klass gör klass-strängen kortare, och då
vill prettier bryta om raden. Det gav formateringsfel i **åtta** filer som
regex-kontrollen ovan inte såg. Kör därför alltid `npx prettier --list-different
"src/**/*.{ts,tsx}"` efter ett mekaniskt svep — inte bara målkontrollen.

**Kortsystemet — de riktiga korten ÅTGÄRDADE 2026-09-15.** Tolv kort skrev
`rounded-2xl|3xl border border-border bg-card p-* shadow-soft` för hand och bär
nu `card-shop` + sin padding. Fjorton element som _inte_ är kort i
`.card-shop`-bemärkelse undantogs medvetet: popover-paneler (`MegaMenu`),
`<details>`-dragspel (`integritetspolicy`, `kontakt`), laddningsskelett
(`produkt.$handle`, `animate-pulse` krockar med kortets övergång), verktygsram
(`ProductFilters`), tom-lägespanel (`onskelista`), enstaka stor panel
(`foretag`), samt `frakt-leverans` och `garanti` — `<section>`-block i en lista
inuti `<article>`, ett gränsfall som väntar på ett eget pass.

**Två av de tolv syns inte i dag.** `ReviewSection.tsx:79` ligger inuti
`reviews.map(...)` och `CustomerShowcase.tsx:55` inuti `SUBMISSIONS.map(...)` —
båda arrayerna är tomma, så grenen renderas aldrig. Konverteringen är gjord och
riktig (kortet får rätt yta den dag innehållet kommer), men den kan **inte
verifieras med ögat** förrän dess. Det ska inte påstås vara sett.

**Sektionsrytmen — skalan dokumenterad 2026-09-15, omläggningen skjuts upp.**
`py-12`, `py-14`, `py-16 md:py-20` och `py-16 md:py-24` blandas fortfarande, och
ingen befintlig `py-*`/`mt-*` rördes. Men rytmen är inte längre oreglerad: den
kanoniska skalan per roll står i **§ 4**, mätt med
`design-system/taggadet/rytminventering.cjs` och
`elementfordelning.cjs`. Tre saker som mätningen avgjorde och som en gissning
hade fått fel:

- Mobilvärdet har **fem** steg (10/12/14/16/24), inte tio — de tio kom av att
  även komponentpadding (`py-1`…`py-8`) räknades in.
- Rytmen bor mest på **`<div>`** (17 av 32 fullbreddsytor), inte på `<section>`
  (8). En `<section>`-räkning underskattar hur många ytor som andas.
- Den inbäddade rytmen är **42 sektioner** med `mt-10`+, alltså fler än de 32
  fullbreddsytorna. Det är därför ett `py-*`-svep inte räcker.

Kvar till omläggningen: `py-14` ska väljas in i `py-12` eller `py-16`, `py-24`
utan brytpunkt ska avgöras mot `py-16 md:py-24`, och de 24 ytor som inte byter
värde vid `md:` ska prövas mot mobilhöjden.

**Kicker-strängen duplicerades — ÅTGÄRDAT 2026-09-15.** Den kanoniska kickern
stod ordagrant på **34 ställen i 24 filer** och bor nu i `<Kicker>`
(`src/components/Kicker.tsx`). De tio avsiktliga avvikarna står kvar för hand.
Verifierat som ren refaktorering: skärmdumparna av `/villkor` före och efter är
pixelidentiska utom nedräkningen i annonseringsfältet (134 pixlar i ett 18×11-
område, klockan som slog om mellan tagningarna).

**Två badge-system.** `src/lib/badgeTone.ts` (tre toner, dokumenterad som den
enda) och `src/components/ui/badge.tsx` (åtta varianter, med råa palettfärger
och `rounded-md`) motsäger varandra. Nya badges ska importera `badgeTone`.

**`components.json` har `baseColor: "slate"`** — en färg som inte finns i
paletten. Det påverkar bara vad shadcn-CLI:t genererar i framtiden, inte den
byggda sajten. Ändra inte i förbigående; den som kör CLI:t bör veta.

---

## 11. Innan du är klar

1. `npx tsc --noEmit` och `npm run build` — båda ska gå igenom.
2. `npm run lint` — inga fel (varningar från `ui/`-primitiverna är kända).
3. Ingen hårdkodad färg: `rg 'oklch\(|#[0-9a-fA-F]{3,6}' src --glob '*.tsx'`.
4. Kontrollera med `prefers-reduced-motion: reduce` — rörelse ska stängas av.
5. Tabba genom sidan — fokusringen ska synas överallt.
6. Testa på 375 px bredd. Ingen horisontell scroll.
7. All copy på svenska, i jag-form, utan priser.
