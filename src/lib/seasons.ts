/**
 * Säsongsschemat – enda källan för vilken högtid butiken lyfter när.
 * Används av startsidans kampanj, tillfälles-bento och presentguiden.
 * Datum räknas i webbläsarens lokala tid (efter hydrering).
 */
export type PriceRange = { label: string; max: number };

export type Season = {
  id: string;
  /** Kategorislug som kampanjen länkar till */
  slug: string;
  /** Tillfällesnamnet i presentguiden */
  occasion: string;
  kicker: string;
  title: string;
  text: string;
  cta: string;
  priceRanges: PriceRange[];
  textIdeas: string[];
  /** Extra vägledning till presentguidens AI */
  aiHint: string;
};

const DEFAULT_RANGES: PriceRange[] = [
  { label: "Under 300 kr", max: 300 },
  { label: "300–600 kr", max: 600 },
  { label: "600–1 000 kr", max: 1000 },
  { label: "Över 1 000 kr", max: 2500 },
];

export type SeasonId = "jul" | "farsdag" | "morsdag" | "brollop" | "foretag";
export const SEASONS: Record<SeasonId, Season> = {
  jul: {
    id: "jul",
    slug: "jul",
    occasion: "Jul",
    kicker: "julklappar 2026",
    title: "Julklappar med namn – graverade för hand",
    text: "Ge något som inte går att köpa i varuhuset. Beställ i god tid så hinner du godkänna skissen innan jul.",
    cta: "Se julklapparna",
    priceRanges: [
      { label: "Klapp under 200 kr", max: 200 },
      { label: "200–500 kr", max: 500 },
      { label: "500–1 000 kr", max: 1000 },
      { label: "Den stora klappen", max: 2500 },
    ],
    textIdeas: [
      "God Jul önskar familjen",
      "Jul hos mormor 2026",
      "Från tomten, med kärlek",
      "Vår första jul tillsammans",
    ],
    aiHint:
      "Det är julklapp. Föreslå gärna en blandning av mindre klappar och en större present. Gravyrförslagen ska kännas juliga men tidlösa.",
  },
  farsdag: {
    id: "farsdag",
    slug: "farsdag",
    occasion: "Farsdag",
    kicker: "fars dag – andra söndagen i november",
    title: "Till pappa som har allt",
    text: "Skärbrädor, läder och metall med hans namn, barnens namn eller en rad bara ni förstår.",
    cta: "Se farsdagspresenter",
    priceRanges: [
      { label: "Under 300 kr", max: 300 },
      { label: "300–700 kr", max: 700 },
      { label: "700–1 200 kr", max: 1200 },
    ],
    textIdeas: [
      "Världens bästa pappa",
      "Pappa sedan 2019",
      "Grillmästare & hjälte",
      "Älskar dig, pappa",
    ],
    aiHint:
      "Det är farsdag. Prioritera trä, läder, metall, kök, jakt och golf om det finns. Gravyrförslagen ska vara varma och gärna lite humoristiska.",
  },
  morsdag: {
    id: "morsdag",
    slug: "morsdag",
    occasion: "Mors dag",
    kicker: "mors dag – sista söndagen i maj",
    title: "Smycken och minnen till mamma",
    text: "Barnens namn på ett smycke eller en ask för minnena – det hon aldrig skulle köpa själv.",
    cta: "Se presenter till mors dag",
    priceRanges: DEFAULT_RANGES,
    textIdeas: ["Världens bästa mamma", "Alltid med dig", "Mamma ❤ barnens namn"],
    aiHint: "Det är mors dag. Prioritera smycken och personliga minnessaker.",
  },
  brollop: {
    id: "brollop",
    slug: "brollop",
    occasion: "Bröllop",
    kicker: "bröllopssäsong",
    title: "Era namn och ert datum – för alltid",
    text: "Glas, ringaskar och detaljer till brudpar, tärnor och gäster.",
    cta: "Se bröllopspresenter",
    priceRanges: DEFAULT_RANGES,
    textIdeas: ["Anna & Erik 2026-06-20", "För alltid", "Mr & Mrs"],
    aiHint: "Det är bröllop. Föreslå gärna par- eller setpresenter.",
  },
  foretag: {
    id: "foretag",
    slug: "foretag",
    occasion: "Företag",
    kicker: "för företag",
    title: "Gåvor till kunder och personal",
    text: "Graverat med logotyp eller namn – jag tar fram en skiss och ett förslag på upplaga.",
    cta: "Se företagsgåvor",
    priceRanges: DEFAULT_RANGES,
    textIdeas: ["Tack för i år!", "Tack för gott samarbete", "Välkommen till teamet"],
    aiHint: "Det är företagsgåva. Föreslå produkter som passar logotyp och större upplagor.",
  },
};

/** n:te söndagen i en månad (månad 0-indexerad). */
function nthSunday(year: number, month: number, n: number) {
  const first = new Date(year, month, 1).getDay();
  return new Date(year, month, 1 + ((7 - first) % 7) + 7 * (n - 1));
}
function lastSunday(year: number, month: number) {
  const last = new Date(year, month + 1, 0);
  return new Date(year, month, last.getDate() - last.getDay());
}

/**
 * Schemat, i ordning. Varje rad gäller till och med sitt slutdatum.
 * Ändra här för att flytta en kampanj – inget annat behöver röras.
 */
export function seasonFor(now: Date = new Date()): Season {
  const y = now.getFullYear();
  const d = new Date(y, now.getMonth(), now.getDate());
  const until = (end: Date, id: SeasonId) => (d <= end ? SEASONS[id] : null);
  return (
    until(new Date(y, 2, 15), "foretag") ?? // jan – mitten av mars: kick-off & personal
    until(new Date(y, 3, 19), "brollop") ?? // vår: bröllopsplanering
    until(lastSunday(y, 4), "morsdag") ?? // 20 apr – mors dag
    until(new Date(y, 8, 15), "brollop") ?? // sommarens bröllop
    until(new Date(y, 8, 30), "foretag") ?? // höst: julgåvor till kunder beställs tidigt
    until(nthSunday(y, 10, 2), "farsdag") ?? // 1 okt – fars dag
    until(new Date(y, 11, 20), "jul") ?? // efter fars dag – 20 dec
    SEASONS.foretag // mellandagar: tack för i år
  );
}

export function seasonByOccasion(occasion: string): Season | undefined {
  return Object.values(SEASONS).find((s) => s.occasion === occasion);
}

export const GENERIC_RANGES = DEFAULT_RANGES;

/**
 * Startsidans kampanj: julklappskampanjen går 1 okt – 20 dec (folk planerar
 * julklappar tidigt), annars följer den säsongsschemat ovan.
 */
export function campaignFor(now: Date = new Date()): Season {
  const y = now.getFullYear();
  const d = new Date(y, now.getMonth(), now.getDate());
  if (d >= new Date(y, 9, 1) && d <= new Date(y, 11, 20)) return SEASONS.jul;
  return seasonFor(now);
}
