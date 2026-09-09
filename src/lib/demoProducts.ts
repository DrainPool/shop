import type { ShopifyProduct } from "@/lib/shopify";

/**
 * Demo-produkter för Fas 6 (QA + visning innan riktiga Shopify-produkter finns).
 * Aktiveras när VITE_DEMO_MODE=1 — då mockar fetchProducts/fetchProductByHandle
 * dessa data i stället för att anropa Shopify (som kräver aktiv plan + produkter).
 *
 * Allt är FIKTIVT: priser följer prismätningen (säljgranskning del 1-3),
 * bilder pekar på de AI-genererade miljöbilderna i /images/products/.
 */

const img = (file: string) => `/images/products/${file}`;

type DemoProduct = {
  title: string;
  handle: string;
  description: string;
  tags: string[];
  price: string;
  image: string;
  extraImages?: string[];
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    title: "Nyckelring i ek med eget namn",
    handle: "nyckelring-i-ek-med-eget-namn",
    description:
      "Massiv ek, lasergraverad med namn eller din egen text. Rymmer upp till 40 tecken. Handgjord i Småland — du får en digital skiss att godkänna innan jag graverar.",
    tags: ["nyckelring", "tra", "gravyr", "fodelsedag", "bastsaljare", "nytt-hem", "jul"],
    price: "179.00",
    image: img("nyckelringar_bord_H13eab.webp"),
    extraImages: [
      img("nyckelringar_hall_H13eab.webp"),
      img("nyckelringar_handla_H13eab.webp"),
      img("nyckelringar_hem_H13eab.webp"),
    ],
  },
  {
    title: "Nyckelring med reg.nummer",
    handle: "nyckelring-med-regnummer",
    description:
      "Din bil eller motorcykel — reg.numret graverat i skyltformat. 12 tecken. Observera: dekorativ gåva, inte godkänd för bruk i trafik.",
    tags: ["nyckelring", "bil", "farsdag", "tra"],
    price: "199.00",
    image: img("nyckelringar_bord_H63402.webp"),
    extraImages: [
      img("nyckelringar_hall_H63402.webp"),
      img("nyckelringar_handla_H63402.webp"),
      img("nyckelringar_hem_H63402.webp"),
    ],
  },
  {
    title: "Kors-hänge dop — silver",
    handle: "kors-hange-dop-silver",
    description:
      "Fint kors-hänge i silver med barnets namn och dopdatum graverade. Levereras i smyckesask, presentklart.",
    tags: ["smycken", "dop", "barn", "bastsaljare", "konfirmation"],
    price: "449.00",
    image: img("kors_bord_H0586.webp"),
    extraImages: [
      img("kors_hall_H0586.webp"),
      img("kors_handla_H0586.webp"),
      img("kors_hem_H0586.webp"),
    ],
  },
  {
    title: "Minnesask i trä med namn",
    handle: "minnesask-i-tra-med-namn",
    description:
      "Liten ask i ek till det första tandglaset, det första håret, det första armbandet. Graverad med namn och födelsedatum.",
    tags: ["smycken", "dop", "barn", "nyhet", "tra", "jul"],
    price: "399.00",
    image: img("minnesaskar_bord_H83f8f.webp"),
    extraImages: [
      img("minnesaskar_hall_H83f8f.webp"),
      img("minnesaskar_handla_H83f8f.webp"),
      img("minnesaskar_hem_H83f8f.webp"),
    ],
  },
  {
    title: "Namnhalsband — handgraverat",
    handle: "namnhalsband-handgraverat",
    description:
      "Klassiskt namnhalsband graverat för hand med namnet du väljer. Äkta silver eller förgyllt. Levereras i smyckesask.",
    tags: ["smycken", "fodelsedag", "bastsaljare", "hjartansdag", "konfirmation", "jul"],
    price: "449.00",
    image: img("halshalsband_bord_H1880.webp"),
    extraImages: [
      img("halshalsband_hall_H1880.webp"),
      img("halshalsband_handla_H1880.webp"),
      img("halshalsband_hem_H1880.webp"),
    ],
  },
  {
    title: "Parsmycke — två halsband",
    handle: "parsmycke-tva-halsband",
    description:
      "Två matchande halsband graverade med era namn, era koordinater eller ert datum. För er som är två — eller bästa vännerna.",
    tags: ["smycken", "brollop", "hjartansdag", "arsdag", "jul"],
    price: "890.00",
    image: img("halshalsband_bord_Hbc72d.webp"),
    extraImages: [
      img("halshalsband_hall_Hbc72d.webp"),
      img("halshalsband_handla_Hbc72d.webp"),
      img("halshalsband_hem_Hbc72d.webp"),
    ],
  },
  {
    title: "Hjärta — dopminne",
    handle: "hjarta-dopminne",
    description:
      "Graverat hjärta i ek med dopets namn, datum och en liten hälsning. Ett minne som får ta plats i barnrummet.",
    tags: ["smycken", "dop", "tra", "nyhet"],
    price: "429.00",
    image: img("hjartan_bord_H23b2.webp"),
    extraImages: [
      img("hjartan_hall_H23b2.webp"),
      img("hjartan_handla_H23b2.webp"),
      img("hjartan_hem_H23b2.webp"),
    ],
  },
  {
    title: "Armband i läder med initialer",
    handle: "armband-i-lader-med-initialer",
    description:
      "Äkta läder med rostfri detalj, graverade initialer (3 tecken). Åldras vackert — perfekt till jägaren, hunden eller den du tänker på.",
    tags: ["smycken", "lader", "farsdag", "jul"],
    price: "399.00",
    image: img("armband_bord_Heddb6.webp"),
    extraImages: [
      img("armband_hall_Heddb6.webp"),
      img("armband_handla_Heddb6.webp"),
      img("armband_hem_Heddb6.webp"),
    ],
  },
  {
    title: "Charm — personlig berlock",
    handle: "charm-personlig-berlock",
    description:
      "Liten berlock i silver att kombinera med ditt halsband eller armband. Graverad med bokstav, siffra eller liten symbol.",
    tags: ["smycken", "fodelsedag", "nyhet", "halloween", "hjartansdag", "konfirmation", "jul"],
    price: "249.00",
    image: img("charms_bord_H60ab2.webp"),
    extraImages: [
      img("charms_hall_H60ab2.webp"),
      img("charms_handla_H60ab2.webp"),
      img("charms_hem_H60ab2.webp"),
    ],
  },
  {
    title: "Korg i ek med gravyr",
    handle: "korg-i-ek-med-gravyr",
    description:
      "Handgjord korg i ek, graverad med familjenamn eller en hälsning. Till nycklarna, brödet eller som gåva.",
    tags: ["foretag", "tra", "gravyr", "halloween", "nytt-hem", "pension", "jul"],
    price: "349.00",
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
  {
    title: "Barhalsband — dopgåva",
    handle: "barhalsband-dopgava",
    description:
      "Mjukt barhalsband i äkta silver med namn eller dopdatum. Säker storlek för de minsta. Levereras presentklart.",
    tags: ["smycken", "dop", "barn", "bastsaljare"],
    price: "429.00",
    image: img("barhalsband_bord_H5b004.webp"),
    extraImages: [
      img("barhalsband_hall_H5b004.webp"),
      img("barhalsband_handla_H5b004.webp"),
      img("barhalsband_hem_H5b004.webp"),
    ],
  },
  {
    title: "Kedja — halsband med gravyr",
    handle: "kedja-halsband-med-gravyr",
    description:
      "Fin kedja i stål med graverad berlock — namn, initialer eller ett datum. Till honom, henne eller er båda.",
    tags: ["smycken", "brollop", "arsdag", "pension", "jul"],
    price: "549.00",
    image: img("kedjor_bord_Hb408a.webp"),
    extraImages: [
      img("kedjor_hall_Hb408a.webp"),
      img("kedjor_handla_Hb408a.webp"),
      img("kedjor_hem_Hb408a.webp"),
    ],
  },
  {
    // Oskyddat gap enligt konkurrentgranskningen – fiberlasern märker
    // plattan på sekunder och namn + telefon är precis det flödet redan klarar.
    title: "Pet tag i rostfritt stål — namn och telefon",
    handle: "pet-tag-rostfritt-stal",
    description:
      "Hundens eller kattens namn och ditt telefonnummer, graverat med fiberlaser i rostfritt stål — gravyren sitter i metallen och nöts inte bort, hur många skogspass och badturer den än följer med i. Namn upp till 12 tecken plus nummer. Du får en digital skiss att godkänna innan jag graverar.",
    tags: ["husdjur", "bastsaljare", "nyhet", "fodelsedag", "jul"],
    price: "179.00",
    // Platsmarkör i metall-familjen tills riktig pet tag-bild finns.
    image: img("barhalsband_bord_H90ec1.webp"),
    extraImages: [
      img("barhalsband_hall_H90ec1.webp"),
      img("barhalsband_handla_H90ec1.webp"),
      img("barhalsband_hem_H90ec1.webp"),
    ],
  },
  {
    title: "Hundpaket — läderhalsband med pet tag",
    handle: "hundpaket-laderhalsband-pet-tag",
    description:
      "Äkta läderhalsband graverat med hundens namn, plus matchande pet tag i rostfritt stål med ditt telefonnummer. Namnet bränns in i skinnet och taggen tål regn, lera och bad. Lädret blir bara vackrare av att användas. Namn upp till 12 tecken — levereras presentklart.",
    tags: ["husdjur", "lader", "jul", "nyhet", "fodelsedag"],
    price: "299.00",
    // Platsmarkör i läder-familjen tills riktig hundpaket-bild finns.
    image: img("armband_bord_Heddb6.webp"),
    extraImages: [
      img("armband_hall_Heddb6.webp"),
      img("armband_handla_Heddb6.webp"),
      img("armband_hem_Heddb6.webp"),
    ],
  },
  {
    title: "Julgranskula i trä med namn",
    handle: "julgranskula-tra-med-namn",
    description:
      "Kula i trä, graverad med namn och årtal — en egen kula för varje i familjen, som plockas fram och hängs upp varje jul. Namn upp till 20 tecken. Jag skickar en skiss på text och placering innan lasern startar, och kulorna levereras presentklart.",
    tags: ["jul", "barn", "nyhet", "bastsaljare"],
    price: "199.00",
    // Platsmarkör i trä-familjen tills riktig julkula-bild finns.
    image: img("hjartan_bord_H883c3.webp"),
    extraImages: [
      img("hjartan_hall_H883c3.webp"),
      img("hjartan_handla_H883c3.webp"),
      img("hjartan_hem_H883c3.webp"),
    ],
  },
  {
    title: "Ölglas med gravyr",
    handle: "olglas-med-gravyr",
    description:
      "Robust ölglas med din egen text graverad — namnet, klubbmärket eller en rad som bara gänget fattar. Gravyren sitter i glaset, inte i ett tryck som slits, och den tål maskindisk år efter år. Upp till 30 tecken. Till hemmabaren, farsdagen eller studenten.",
    tags: ["glas", "farsdag", "fodelsedag", "student", "bastsaljare", "jul"],
    price: "299.00",
    // Platsmarkör i trä-familjen tills riktig glasbild finns.
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
  {
    title: "Vinglas par med datum",
    handle: "vinglas-par-med-datum",
    description:
      "Två vinglas, graverade med era namn, ert datum eller en liten rad till middagen. Gravyren tål maskindisk och glasen levereras presentklart packade — till bröllopet, årsdagen eller det första gemensamma hemmet. Upp till 25 tecken per glas.",
    tags: ["glas", "brollop", "arsdag", "nytt-hem", "bastsaljare"],
    price: "329.00",
    // Platsmarkör i trä-familjen tills riktig glasbild finns.
    image: img("minnesaskar_bord_H83f8f.webp"),
    extraImages: [
      img("minnesaskar_hall_H83f8f.webp"),
      img("minnesaskar_handla_H83f8f.webp"),
      img("minnesaskar_hem_H83f8f.webp"),
    ],
  },
  {
    title: "Whiskyglas med gravyr",
    handle: "whiskyglas-med-gravyr",
    description:
      "Whiskyglas med din egen text graverad i glaset — initialer, namnet eller årtalet som ska sitta kvar. Tål maskindisk, och gravyren slits aldrig. Upp till 25 tecken. Till hon som tar sina drinkar på allvar — eller till dig som förtjänar ett eget glas.",
    tags: ["glas", "farsdag", "pension", "jul", "nyhet"],
    price: "249.00",
    // Platsmarkör i metall-familjen tills riktig glasbild finns.
    image: img("barhalsband_bord_H78735.webp"),
    extraImages: [
      img("barhalsband_hall_H78735.webp"),
      img("barhalsband_handla_H78735.webp"),
      img("barhalsband_hem_H78735.webp"),
    ],
  },
  {
    title: "Skärbräda i ek — Grillmästaren",
    handle: "skarbrada-ek-grallmastaren",
    description:
      "Massiv ek med djup gravyr — färdigt motiv med titeln, eller din egen text om ni har en egen husregel i grillvakteln. Upp till 40 tecken. Brädan oljas med livsmedelsgodkänd olja och du godkänner en skiss på texten innan jag graverar.",
    tags: ["skarbrada", "farsdag", "bastsaljare", "jul", "nytt-hem", "gravyr"],
    price: "449.00",
    // Platsmarkör i trä-familjen tills riktig skärbräde-bild finns.
    image: img("hjartan_bord_H7d33c.webp"),
    extraImages: [
      img("hjartan_hall_H7d33c.webp"),
      img("hjartan_handla_H7d33c.webp"),
      img("hjartan_hem_H7d33c.webp"),
    ],
  },
  {
    title: "Skärbräda med favoritreceptet",
    handle: "skarbrada-med-favoritreceptet",
    description:
      "Mormors kanelbullare, pappas BBQ-rub eller farmors pajdeg — receptet graveras djupt i eken och blir kökets permanenta minne. Skriv eller klistra in receptet i beställningen, upp till 200 tecken, så skickar jag en skiss på placeringen innan lasern startar.",
    tags: ["skarbrada", "morsdag", "fodelsedag", "nytt-hem", "gravyr"],
    price: "549.00",
    // Platsmarkör i trä-familjen tills riktig skärbräde-bild finns.
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
  {
    title: "Plånbok i läder med monogram",
    handle: "planbok-i-lader-med-monogram",
    description:
      "Plånbok i äkta läder med initialer eller monogram brända in i skinnet — gravyren följer med hela plånbokens liv, och lädret blir bara vackrare av att användas. Upp till 3 tecken. Julklappen som plockas fram varje morgon, eller examenpresenten som håller.",
    tags: ["lader", "jul", "farsdag", "konfirmation", "nyhet"],
    price: "449.00",
    // Platsmarkör i läder-familjen tills riktig plånbok-bild finns.
    image: img("armband_bord_Heddb6.webp"),
    extraImages: [
      img("armband_hall_Heddb6.webp"),
      img("armband_handla_Heddb6.webp"),
      img("armband_hem_Heddb6.webp"),
    ],
  },
  {
    title: "Dörrskylt i mässing med namn",
    handle: "dorrskylt-i-massing-med-namn",
    description:
      "Mässingsskylt med djup, mörk gravering — namnet på huset, lägenheten eller firman. Fiberlasern bränner in texten i metallen, inte på ytan, så den väderkas aldrig bort. Upp till 25 tecken. Till dörren, brevlådan eller garageporten, och du godkänner en skiss först som alltid.",
    tags: ["skylt", "nytt-hem", "bastsaljare", "nyhet", "foretag"],
    price: "349.00",
    // Platsmarkör i metall-familjen (beslag) tills riktig mässingsskylt-bild finns.
    image: img("beslag_bord_Ha7f65.webp"),
    extraImages: [
      img("beslag_hall_Ha7f65.webp"),
      img("beslag_handla_Ha7f65.webp"),
      img("beslag_hem_Ha7f65.webp"),
    ],
  },
  {
    title: "Namnskylt i ek till barnrummet",
    handle: "namnskylt-i-ek-till-barnrummet",
    description:
      "Namnskylt i oljad ek med barnets namn graverat — till rummet, sängen eller lekhörnan. Namn upp till 15 tecken, och du väljer om det ska vara bara namnet eller namnet med födelse- eller dopdatum. Ett dop- eller babyshower-minne som hänger med genom hela uppväxten.",
    tags: ["skylt", "barn", "dop", "nytt-hem", "nyhet"],
    price: "299.00",
    // Platsmarkör i trä-familjen tills riktig namnskylt-bild finns.
    image: img("hjartan_bord_H1e2e7.webp"),
    extraImages: [
      img("hjartan_hall_H1e2e7.webp"),
      img("hjartan_handla_H1e2e7.webp"),
      img("hjartan_hem_H1e2e7.webp"),
    ],
  },
  {
    title: "Presentask i plywood med monogram",
    handle: "presentask-i-plywood-med-monogram",
    description:
      "Ask i plywood med locket graverat i monogram, namn eller en kort rad — asken som gör klappen presentklar innan den ens är inslagen, och som sedan återanvändas år efter år. Upp till 20 tecken. Perfekt till bröllopspresenten, förlovningsringen eller julklappen som ska kännas extra.",
    tags: ["askar", "jul", "brollop", "nyhet", "gravyr"],
    price: "299.00",
    // Platsmarkör i trä-familjen (askar) tills riktig presentask-bild finns.
    image: img("minnesaskar_bord_H83f8f.webp"),
    extraImages: [
      img("minnesaskar_hall_H83f8f.webp"),
      img("minnesaskar_handla_H83f8f.webp"),
      img("minnesaskar_hem_H83f8f.webp"),
    ],
  },
  {
    title: "Golfpresentask i plywood med plakett i ek",
    handle: "golfpresentask-i-plywood-med-plakett",
    description:
      "Presentask i plywood med graverad plakett i ek — 'Till golfaren som har allt', hans namn och hemklubbens årtal, eller vad du nu vill att den ska säga. Upp till 30 tecken på plaketten. Och är det dags att märka upp klubborna också, gör jag det i samma svep.",
    tags: ["golfpresenter", "farsdag", "jul", "nyhet"],
    price: "349.00",
    // Platsmarkör i trä-familjen tills riktig golfpresentask-bild finns.
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
  {
    title: "Ball markers i metall med initialer",
    handle: "ball-markers-i-metall-med-initialer",
    description:
      "Ball markers i rostfritt stål, graverade med initialer eller ett litet motiv — märket sätts med fiberlaser direkt i metallen och slits aldrig. Upp till 3 tecken. Säljs i par: en att ge bort och en att behålla själv.",
    tags: ["golfpresenter", "farsdag", "nyhet", "bastsaljare"],
    price: "199.00",
    // Platsmarkör i metall-familjen (charms) tills riktig ball marker-bild finns.
    image: img("charms_bord_Hd6a05.webp"),
    extraImages: [
      img("charms_hall_Hd6a05.webp"),
      img("charms_handla_Hd6a05.webp"),
      img("charms_hem_Hd6a05.webp"),
    ],
  },
  {
    title: "Idrottspokal — träfot med metallplakett",
    handle: "idrottspokal-trafot-med-metallplakett",
    description:
      "Pokal med fot i massivt trä och plakett i metall, graverad med tävlingens namn, placeringen och årtalet — en enkel, hantverksnära pokal som skiljer sig från glasstatyetterna. Upp till 40 tecken per plakett. Ska hela prisbordet graveras? Skriv antal klasser, så räknar jag fram offert.",
    tags: ["idrott", "foretag", "student", "nyhet"],
    price: "349.00",
    // Platsmarkör i metall-familjen (beslag) tills riktig pokal-bild finns.
    image: img("beslag_bord_Ha7f65.webp"),
    extraImages: [
      img("beslag_hall_Ha7f65.webp"),
      img("beslag_handla_Ha7f65.webp"),
      img("beslag_hem_Ha7f65.webp"),
    ],
  },
  {
    title: "Dash-plakett i aluminium till bilträffen",
    handle: "dash-plakett-i-aluminium",
    description:
      "Dash-plakett i graverad aluminium till bilträffen, raggen eller moteet — träffens namn, år och klass på en bricka som syns i hyllan. Upp till 30 tecken. Volym vid 25 exemplar och uppåt: hör av dig, så räknar jag fram pris.",
    tags: ["bil", "foretag", "idrott", "nyhet"],
    price: "99.00",
    // Platsmarkör i metall-familjen (beslag) tills riktig dash-plakett-bild finns.
    image: img("beslag_bord_Ha7f65.webp"),
    extraImages: [
      img("beslag_hall_Ha7f65.webp"),
      img("beslag_handla_Ha7f65.webp"),
      img("beslag_hem_Ha7f65.webp"),
    ],
  },
  {
    // Roffi-pass (sep 2026): roffi säljer glasunderlägg i 4-pack som ren
    // standardvara – ek och naturkork med lasergravyr är TaggaDets egen vinkel
    // (diodlasern bränner permanent i båda materialen, och personaliseringen
    // skrivs in i beställningen, inte i ett mejl efteråt).
    title: "Glasunderlägg i ek — 4-pack med initialer",
    handle: "glasunderlagg-ek-4-pack-initialer",
    description:
      "Fyra glasunderlägg i massiv ek, graverade med varsin initial eller ett litet monogram — ett underlägg per person vid bordet, inga fler förväxlingar. Lasern bränner in bokstaven djupt i träet, så den syns kalas efter kalas. Upp till 3 tecken per underlägg, gärna olika på alla fyra. Du godkänner en skiss på hela setet innan jag graverar.",
    tags: ["glasunderlagg", "nytt-hem", "brollop", "jul", "nyhet"],
    price: "249.00",
    // Platsmarkör i trä-familjen tills riktig glasunderläggs-bild finns.
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
  {
    title: "Glasunderlägg i kork — 4-pack med glimten",
    handle: "glasunderlagg-kork-4-pack-med-glimten",
    description:
      "Fyra underlägg i naturkork, varsin graverad med en liten rad om livets drycker — bubbel, rött, vitt och ölet, alla fyra med glimten i ögat. Korken är mjuk mot både glas och bord, och gravyren bränns in i materialet, inte tryckt på ytan. Välj färdiga rader eller egna: upp till 25 tecken per underlägg, alltid med en skiss att godkänna först.",
    tags: ["glasunderlagg", "nytt-hem", "student", "jul", "nyhet"],
    price: "199.00",
    // Platsmarkör i trä-familjen tills riktig kork-bild finns.
    image: img("minnesaskar_bord_H83f8f.webp"),
    extraImages: [
      img("minnesaskar_hall_H83f8f.webp"),
      img("minnesaskar_handla_H83f8f.webp"),
      img("minnesaskar_hem_H83f8f.webp"),
    ],
  },
  {
    // Komboprodukt som fångar "nytt hem"-taggen – underläggen i kombination
    // med ett ställ ger högre ordervärde än enskilda 4-pack.
    title: "Bar-set i ek — 4 glasunderlägg med ställ",
    handle: "bar-set-ek-glasunderlagg-med-stall",
    description:
      "Fyra glasunderlägg i ek med tillhörande ställ i plywood — hemmabarens nya fasta punkt, graverad med monogram, familjenamn eller vad baren nu ska heta. Underläggen plockas fram när gästerna kommer och ställs tillbaka när kvällen är slut. Text upp till 20 tecken på stället, och du godkänner en skiss på hela setet innan lasern startar. Inflyttningspresenten som får stå framme.",
    tags: ["glasunderlagg", "nytt-hem", "brollop", "jul", "nyhet"],
    price: "349.00",
    // Platsmarkör i trä-familjen tills riktig bar-set-bild finns.
    image: img("hjartan_bord_H883c3.webp"),
    extraImages: [
      img("hjartan_hall_H883c3.webp"),
      img("hjartan_handla_H883c3.webp"),
      img("hjartan_hem_H883c3.webp"),
    ],
  },
  {
    // Humorgravyr-linjen (sep 2026): roffis humor säljer – TaggaDet behåller
    // sepia-tonen men lägger varm retur i färdiga gravyrtexter, aldrig grovt.
    title: "Skärbräda i ek — Mästarkocken (enligt honom själv)",
    handle: "skarbrada-mastarkocken",
    description:
      "Massiv ek med djup gravyr: 'Mästarkocken' i stora bokstäver — och '(enligt honom själv)' i fin stil under. För den som lagar mat med större självförtroende än teknik. Titeln går att vända åt båda hållen, och egen text ryms upp till 40 tecken. Brädan oljas med livsmedelsgodkänd olja och du godkänner en skiss på texten innan lasern startar.",
    tags: ["skarbrada", "farsdag", "nytt-hem", "jul", "nyhet"],
    price: "449.00",
    // Platsmarkör i trä-familjen, samma som Grillmästaren, tills riktig skärbräde-bild finns.
    image: img("hjartan_bord_H7d33c.webp"),
    extraImages: [
      img("hjartan_hall_H7d33c.webp"),
      img("hjartan_handla_H7d33c.webp"),
      img("hjartan_hem_H7d33c.webp"),
    ],
  },
  {
    title: "Ölglas — En till, sedan lugnar det sig",
    handle: "olglas-en-till-sedan-lugnar-det-sig",
    description:
      "Robust ölglas med raden 'En till, sedan lugnar det sig' graverad i glaset — ett löfte som håller ungefär lika länge som ölen. Gravyren sitter i glaset, inte i ett tryck som slits, och den tål maskindisk år efter år. Egen rad går lika bra, upp till 30 tecken, alltid med en skiss att godkänna först. Till farsdagen, studenten eller gänget som känner varandra lite för väl.",
    tags: ["glas", "farsdag", "student", "jul", "nyhet"],
    price: "299.00",
    // Platsmarkör i trä-familjen, samma som övriga glas, tills riktig glasbild finns.
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
  {
    title: "Nyckelring i ek — Om jag tappar den är den inte min",
    handle: "nyckelring-om-jag-tappar-den-ar-den-inte-min",
    description:
      "Nyckelring i massiv ek med den självklara husregeln 'Om jag tappar den är den inte min' graverad i träet — för den som letat nycklar i soffkuddarna en gång för många. Egen text går lika bra, upp till 40 tecken. Du får en skiss att godkänna innan jag graverar, och ringen levereras presentklart.",
    tags: ["nyckelring", "fodelsedag", "jul", "nyhet"],
    price: "179.00",
    // Platsmarkör i trä-familjen, samma som eknöckelringen, tills riktig bild finns.
    image: img("nyckelringar_bord_H13eab.webp"),
    extraImages: [
      img("nyckelringar_hall_H13eab.webp"),
      img("nyckelringar_handla_H13eab.webp"),
      img("nyckelringar_hem_H13eab.webp"),
    ],
  },
  {
    // Fångar besökaren som inte kan bestämma – konverterar i stället för
    // att lämna sajten. Bilden är platsmarkör tills riktiga finns.
    title: "Presentkort — 500 kr",
    handle: "presentkort-500",
    description:
      "Digitalt presentkort på 500 kr, giltigt i hela butiken. Mottagaren väljer själv present och text – och du slipper gissa fel.",
    tags: ["presentkort", "fodelsedag", "jul"],
    price: "500.00",
    image: img("korgar_bord_H0a665.webp"),
    extraImages: [
      img("korgar_hall_H0a665.webp"),
      img("korgar_handla_H0a665.webp"),
      img("korgar_hem_H0a665.webp"),
    ],
  },
];

/** ShopifyProduct-shapad demo-produkt (exakt de fält UI:t läser). */
function toShopifyShape(p: DemoProduct): ShopifyProduct {
  const images = [p.image, ...(p.extraImages ?? [])];
  return {
    node: {
      id: `demo-${p.handle}`,
      title: p.title,
      description: p.description,
      handle: p.handle,
      productType: p.tags[0] ?? "demo",
      tags: p.tags,
      availableForSale: true,
      priceRange: { minVariantPrice: { amount: p.price, currencyCode: "SEK" } },
      images: {
        edges: images.map((url) => ({ node: { url, altText: p.title } })),
      },
      variants: {
        edges: [
          {
            node: {
              id: `demo-variant-${p.handle}`,
              title: "Standard",
              price: { amount: p.price, currencyCode: "SEK" },
              availableForSale: true,
              selectedOptions: [{ name: "Storlek", value: "Standard" }],
            },
          },
        ],
      },
      options: [{ name: "Storlek", values: ["Standard"] }],
    },
  } as unknown as ShopifyProduct;
}

export function isDemoMode(): boolean {
  return import.meta.env["VITE_DEMO_MODE"] === "1";
}

export function demoFetchProducts(first: number, query?: string): ShopifyProduct[] {
  let list = DEMO_PRODUCTS.map(toShopifyShape);
  if (query?.startsWith("tag:")) {
    const tag = query.slice(4).trim();
    list = list.filter((p) => p.node.tags?.includes(tag));
  }
  return list.slice(0, first);
}

export function demoFetchProductByHandle(handle: string): ShopifyProduct | null {
  const found = DEMO_PRODUCTS.find((p) => p.handle === handle);
  return found ? toShopifyShape(found) : null;
}

/**
 * Fritextsök i demoläget (searchProducts grenar hit) – titel,
 * beskrivning och taggar, alla ord i termen måste träffa.
 */
export function demoSearchProducts(term: string, first: number): ShopifyProduct[] {
  const words = term
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
  if (words.length === 0) return [];
  return DEMO_PRODUCTS.map(toShopifyShape)
    .filter((p) => {
      const hay =
        `${p.node.title} ${p.node.description} ${(p.node.tags || []).join(" ")}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    })
    .slice(0, first);
}
