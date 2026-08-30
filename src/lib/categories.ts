import ikonNyckelring from "@/assets/ikon-nyckelring.png";
import ikonGlas from "@/assets/ikon-glas.png";
import ikonKeps from "@/assets/ikon-keps.png";
import ikonTshirt from "@/assets/ikon-tshirt.png";
import ikonHoodie from "@/assets/ikon-hoodie.png";
import ikonMugg from "@/assets/ikon-mugg.png";
import ikonTumbler from "@/assets/ikon-tumbler.png";
import ikonSmycke from "@/assets/ikon-smycke.png";
import ikonSkarbrada from "@/assets/ikon-skarbrada.png";
import ikonLader from "@/assets/ikon-lader.png";
import ikonSticker from "@/assets/ikon-sticker.png";
import ikonFototavla from "@/assets/ikon-fototavla.png";
import ikon3d from "@/assets/ikon-3d.png";

export interface Category {
  slug: string;
  tag: string;
  title: string;
  kicker: string;
  description: string;
  /** Ikon för produkttyp-raden */
  icon?: string;
  /** Kort etikett i ikonraden */
  short?: string;
}

/** Produkttyper – primär navigation, visas som ikonrad */
export const productTypes: Category[] = [
  {
    slug: "nyckelringar",
    tag: "nyckelring",
    short: "Nyckelring",
    icon: ikonNyckelring,
    title: "Nyckelringar med gravyr",
    kicker: "något att bära med sig varje dag",
    description:
      "Nyckelringar i trä, läder och stål – graverade med namn, koordinater eller en hälsning som bara ni två förstår.",
  },
  {
    slug: "glas",
    tag: "glas",
    short: "Glas",
    icon: ikonGlas,
    title: "Graverade glas",
    kicker: "skål för det ni firar",
    description:
      "Ölglas, vinglas och whiskyglas med sandblästrad gravyr. Perfekt till toastmastern, brudparet eller kollegan som fyller jämnt.",
  },
  {
    slug: "kepsar",
    tag: "keps",
    short: "Keps",
    icon: ikonKeps,
    title: "Personliga kepsar",
    kicker: "med er text eller logga",
    description:
      "Broderade och tryckta kepsar till laget, företaget eller svensexan. Små upplagor går utmärkt.",
  },
  {
    slug: "t-shirt",
    tag: "tshirt",
    short: "T-shirt",
    icon: ikonTshirt,
    title: "T-shirt med eget tryck",
    kicker: "din text, min press",
    description:
      "Mjuka bomullst-shirts med tryck du bestämmer – namn, datum, bild eller ett citat. Från ett enda plagg och uppåt.",
  },
  {
    slug: "hoodies",
    tag: "hoodie",
    short: "Hoodie",
    icon: ikonHoodie,
    title: "Hoodies med tryck",
    kicker: "varmt och personligt",
    description:
      "Sköna hoodies med personligt tryck eller broderi. Populärt till familjen, laget och personalen.",
  },
  {
    slug: "muggar",
    tag: "mugg",
    short: "Muggar",
    icon: ikonMugg,
    title: "Personliga muggar",
    kicker: "morgonens finaste present",
    description:
      "Muggar med namn, foto eller en liten hälsning. Diskmaskinssäkert tryck som håller.",
  },
  {
    slug: "tumblers",
    tag: "tumbler",
    short: "Tumbler",
    icon: ikonTumbler,
    title: "Tumblers med gravyr",
    kicker: "kallt länge, personligt alltid",
    description:
      "Isolerade termosmuggar graverade med namn eller logga – till bilen, jobbet och jaktpasset.",
  },
  {
    slug: "smycken",
    tag: "smycken",
    short: "Smycken",
    icon: ikonSmycke,
    title: "Personliga smycken",
    kicker: "gravyr i silver & stål",
    description: "Halsband och hängen graverade med namn, datum eller initialer.",
  },
  {
    slug: "skarbrador",
    tag: "skarbrada",
    short: "Skärbräda",
    icon: ikonSkarbrada,
    title: "Skärbrädor i ek",
    kicker: "till köket och grillplatsen",
    description:
      "Massiv ek med djup gravyr – familjenamn, recept eller en hälsning till farsdagen.",
  },
  {
    slug: "bil",
    tag: "bil",
    short: "Till bilen",
    // Ikon: lägg in egen bild som src/assets/ikon-bil.png så swappen sker automatiskt
    title: "Till bilen",
    kicker: "för den som buffar på motorn",
    description:
      "Nyckelring med registreringsnummer, garageskylt med eget namn och plaketter till bilträffen – graverade detaljer för bilentusiasten som redan har allt.",
  },
  {
    slug: "lader",
    tag: "lader",
    short: "Läder",
    icon: ikonLader,
    title: "Lädergravyr",
    kicker: "åldras vackert",
    description:
      "Läderdetaljer, brickor och remmar med gravyr – till jägaren, hunden och den som gillar hantverk.",
  },
  {
    slug: "stickers",
    tag: "stickers",
    short: "Stickers",
    icon: ikonSticker,
    title: "Stickers från Cricut",
    kicker: "skurna för hand i verkstaden",
    description:
      "Dekaler och stickers i eget motiv – till bilen, laptopen, förpackningen eller kalaset.",
  },
  {
    slug: "fototavlor",
    tag: "foto",
    short: "Fototavla",
    icon: ikonFototavla,
    title: "Fototavlor",
    kicker: "minnen att hänga upp",
    description: "Dina bilder på tavla med graverad text – ett minne som får ta plats på väggen.",
  },
  {
    slug: "3d-utskrifter",
    tag: "3d",
    short: "3D-print",
    icon: ikon3d,
    title: "3D-utskrifter",
    kicker: "egen design, lager för lager",
    description:
      "Namnskyltar, figurer och detaljer utskrivna i egen design. Har du en idé printar jag den.",
  },
];

/** Tillfällen och urval – sekundär navigation */
export const occasions: Category[] = [
  {
    slug: "bastsaljare",
    tag: "bastsaljare",
    title: "Mest älskade just nu",
    kicker: "de som beställs om och om igen",
    description:
      "Favoriterna som flest väljer att göra personliga. Har du fastnat för någon av dem – beställ i god tid, de tar plats i veckans tillverkning snabbt.",
  },
  {
    slug: "nyheter",
    tag: "nyhet",
    title: "Nytt i verkstaden",
    kicker: "färskt från arbetsbänken",
    description:
      "Nya idéer jag precis börjat tillverka. Små serier – när materialet är slut tar det några veckor innan nästa omgång.",
  },
  {
    slug: "brollop",
    tag: "brollop",
    title: "Till bröllopet",
    kicker: "för dagen ni minns hela livet",
    description:
      "Graverade tostglas till toasten, glas- och flaskeetiketter till gästerna, ringaskar och placeringsdetaljer – allt med era namn och ert datum, i samma stil genom hela bröllopet.",
  },
  {
    slug: "dop",
    tag: "dop",
    title: "Till dopet",
    kicker: "till den nya lilla",
    description:
      "Graverade dopsmycken, minnesask och namnskylt till barnrummet. Levereras presentklart.",
  },
  {
    slug: "foretag",
    tag: "foretag",
    title: "Till företaget",
    kicker: "personligt på jobbet",
    description:
      "Namnbrickor, graverade skyltar och stickers med er logotyp – till personal, kunder och mässan.",
  },
  {
    slug: "farsdag",
    tag: "farsdag",
    title: "Farsdag & jakt",
    kicker: "till honom som har allt",
    description:
      "Skärbrädor i ek, läderdetaljer med gravyr och fototavlor med en personlig hälsning.",
  },
  {
    slug: "gravyr",
    tag: "gravyr",
    title: "Gravyr i trä & läder",
    kicker: "handgjort i verkstaden",
    description: "Skärbrädor, askar, skyltar och läderdetaljer graverade efter dina önskemål.",
  },
  {
    slug: "barn",
    tag: "barn",
    title: "Till barnen",
    kicker: "små saker med stort värde",
    description: "Namnskyltar, dopsmycken och minnessaker som följer med genom uppväxten.",
  },
];

export const categories: Category[] = [...productTypes, ...occasions];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
