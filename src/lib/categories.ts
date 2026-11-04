import ikonNyckelring from "@/assets/ikon-nyckelring.png";
import ikonGlas from "@/assets/ikon-glas.png";
import ikonMugg from "@/assets/ikon-mugg.png";
import ikonTumbler from "@/assets/ikon-tumbler.png";
import ikonSmycke from "@/assets/ikon-smycke.png";
import ikonSkarbrada from "@/assets/ikon-skarbrada.png";
import ikonLader from "@/assets/ikon-lader.png";
import ikonSticker from "@/assets/ikon-sticker.png";
import ikonFototavla from "@/assets/ikon-fototavla.png";
import ikon3d from "@/assets/ikon-3d.png";
import ikonDjupportratt from "@/assets/ikon-djupportratt.svg";
import ikonGolf from "@/assets/ikon-golf.svg";
import ikonSkylt from "@/assets/ikon-skylt.png";

export interface PricingRow {
  label: string;
  price: string;
}

export interface PricingBlock {
  title?: string;
  rows: PricingRow[];
  note?: string;
}

export interface Category {
  slug: string;
  tag: string;
  title: string;
  kicker: string;
  description: string;
  /** Prislistblock – valfritt, process-tjänster */
  about?: string;
  /** Ikon för produkttyp-raden */
  icon?: string;
  /** Kort etikett i ikonraden */
  short?: string;
  /** Underkategorier (occasion-grupper, länkar till andra kategorisidor) */
  subcategories?: { slug: string; label: string }[];
  /** "Passar också till"-pills i Om-sektionen – bygger intern länkflod */
  related?: string[];
  /** Prislistblock – valfritt, för process-/tjänstekategorier */
  pricing?: PricingBlock[];
}

/** Mottagare – en tredje ingång till samma produkter, utan dubbletter. */
export const recipients: Category[] = [
  {
    slug: "presenter",
    tag: "present",
    title: "Personliga presenter",
    kicker: "något som bara finns i ett exemplar",
    description:
      "Hitta en personlig present efter mottagare, tillfälle eller sak. Jag graverar namn, datum och egna hälsningar – och skickar en skiss att godkänna först.",
    about:
      "Här samlar jag presenter som blir personliga på riktigt: glas, smycken, trä, metall, askar och små detaljer med din egen text. Samma produkt kan passa flera människor och högtider, därför får du välja väg utan att mötas av kopior av samma sak.",
    subcategories: [
      { slug: "till-henne", label: "Till henne" },
      { slug: "till-honom", label: "Till honom" },
      { slug: "till-barn", label: "Till barn" },
      { slug: "till-mor-farforaldrar", label: "Till mor- och farföräldrar" },
      { slug: "till-paret", label: "Till paret" },
    ],
    related: ["fodelsedag", "brollop", "jul"],
  },
  {
    slug: "till-henne",
    tag: "till-henne",
    title: "Presenter till henne",
    kicker: "valt för just henne",
    description:
      "Personliga smycken, glas, minnesaskar och vardagsfavoriter med hennes namn, datum eller en hälsning från dig.",
    about:
      "En present till henne behöver inte vara stor för att kännas genomtänkt. Välj något hon faktiskt använder och gör det personligt med ett namn, ett datum eller en rad som bara ni förstår. Jag skickar alltid en skiss innan jag tillverkar.",
    related: ["morsdag", "alla-hjartans-dag", "arsdag"],
  },
  {
    slug: "till-honom",
    tag: "till-honom",
    title: "Presenter till honom",
    kicker: "till honom som redan har allt",
    description:
      "Graverade glas, läder, skärbrädor och detaljer till bilen, jakten eller golfen – personliga utan att bli tillgjorda.",
    about:
      "Till honom som redan har allt fungerar det egna namnet, initialerna eller den interna raden bättre än ännu en standardpryl. Jag hjälper dig hitta rätt placering och skickar en skiss innan gravyren blir permanent.",
    related: ["farsdag", "golfpresenter", "bil"],
  },
  {
    slug: "till-barn",
    tag: "till-barn",
    title: "Presenter till barn",
    kicker: "ett namn att växa med",
    description:
      "Namnskyltar, minnesaskar, dopsmycken och personliga detaljer som följer med från den första stora dagen.",
    about:
      "Till barn gör jag presenter som kan sparas länge: namnet till rummet, asken för de första minnena eller smycket från dopet. Du väljer texten och får se skissen innan jag börjar.",
    related: ["dop", "barn", "fodelsedag"],
  },
  {
    slug: "till-mor-farforaldrar",
    tag: "till-mor-farforaldrar",
    title: "Presenter till mor- och farföräldrar",
    kicker: "barnbarnen nära varje dag",
    description:
      "Smycken, fotominnen, muggar och trädetaljer med barnbarnens namn, ett recept eller ett viktigt datum.",
    about:
      "Mormor, morfar, farmor och farfar uppskattar ofta det som bär familjens egen historia. Barnbarnens namn, ett handskrivet recept eller ett gammalt foto blir en present som används och sparas.",
    related: ["morsdag", "farsdag", "jul"],
  },
  {
    slug: "till-paret",
    tag: "till-paret",
    title: "Presenter till paret",
    kicker: "två namn i samma berättelse",
    description:
      "Matchande glas, parsmycken, askar och detaljer till hemmet med namn, datum eller koordinater.",
    about:
      "Till paret håller jag ihop namn, datum och typsnitt genom hela presenten. Det passar lika fint till bröllopet som till årsdagen eller inflyttningen, och du godkänner alltid skissen först.",
    related: ["brollop", "arsdag", "nytt-hem"],
  },
];

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
      "Välj material – ek, stål eller läder – och vad jag ska gravera: namn, reg.nummer, koordinater eller ett foto i hög upplösning.",
    about:
      "En nyckelring med namn eller eget motiv är en av de presenter som verkligen används – varje dag, i fickan, i handväskan, i bilen. Här hittar du nyckelringar i massiv ek, läder och rostfritt stål, alla graverade med precis den text du vill ha: ett namn, ett datum, era koordinater eller nåt som bara ni två fattar. Mest stolt är jag över fotogravyren: skicka en bild på ditt husdjur, barnen eller er plats, så graverar min lasermaskin den i mycket hög upplösning – hårstrån och ansiktsdrag blir skarpa. Gravyren ingår alltid i priset och du får en digital skiss att godkänna innan jag graverar. Populärt som present till hon som har allt, till nycklarna till det nya hemmet och till födelsedagen.",
    related: ["fodelsedag", "nytt-hem", "farsdag"],
  },
  {
    slug: "mikrofiberdukar",
    tag: "mikrofiber",
    short: "Mikrofiber",
    title: "Mikrofiberdukar med logga",
    kicker: "din logga inbränd i duken",
    description:
      "Mikrofiberdukar med logga eller motiv inbränt med laser – för barberare, frisörer, bilvård, optiker, gym och företag.",
    about:
      "Jag bränner in din logga direkt i fibrerna med laser, så den varken flagnar eller tvättas bort som ett tryck kan göra. Dukarna passar barberare och frisörer vid stationen, bilvårdare som vill ge kunden något med sig hem, optiker, gym och företag som vill ha ett användbart profilmaterial. Ladda upp din logga på produktsidan, välj färg och antal – du får en digital skiss att godkänna innan jag bränner.",
    related: ["foretag", "bil"],
  },
  {
    slug: "akryl",
    tag: "akryl",
    short: "Akryl",
    title: "Akryl med gravyr",
    kicker: "utskuret och graverat i klar akryl",
    description:
      "Tårttoppers, bröllopsskyltar, bordsplaceringar, fotoplattor och julhängen – laserskurna och graverade i akryl (plexiglas) i min verkstad.",
    about:
      "Akryl låter mig skära ut precis den form och text du vill ha, och gravera foton i mycket hög upplösning. Materialet är lätt, klart och tål både sol och fukt – därför passar det lika bra till en tårttopper som till skylten vid ytterdörren. Jag skär i skivor upp till 600×300 mm. Standard är 3 mm, men jag kan gå upp till 18 mm för en gedignare känsla, och jag kan ta hem i princip alla färger – klar, frostad, svart, vit eller färgad. Du får alltid en digital skiss att godkänna innan jag skär och graverar.",
    related: ["brollop", "jul", "fodelsedag", "nytt-hem"],
  },
  {
    slug: "glas",
    tag: "glas",
    short: "Glas",
    icon: ikonGlas,
    title: "Graverat glas",
    kicker: "skål för det ni firar",
    description:
      "Ölglas, vinglas, champagneglas och whiskyglas med lasergraverad text som tål maskindisk. Till toastmastern, brudparet, studenten och farsdagen.",
    about:
      "Graverade glas är klassikern som aldrig går ur tiden – ölglaset med hans namn, vinglaset med årtalen, whiskyglaset med jaktsällskapets signatur. Jag lasergraverar direkt i glaset (inte ett tryck som slits), så texten tål maskindisk och håller lika länge som glaset. Texten är alltid din egen, och du får en skiss på exakt hur den ser ut innan jag graverar.",
    related: ["brollop", "student", "pension"],
  },
  {
    // Ny kategori (sep 2026) – roffi säljer glasunderlägg i 4-pack som ren
    // standardvara; ek och naturkork med lasergravyr och personlig text är
    // Taggats egen vinkel. Ikon: lägg in egen bild som
    // src/assets/ikon-glasunderlagg.png så swappen sker automatiskt.
    slug: "glasunderlagg",
    tag: "glasunderlagg",
    short: "Underlägg",
    title: "Glasunderlägg med gravyr",
    kicker: "ringar på bordet, aldrig på glaset",
    description:
      "Glasunderlägg i ek och naturkork, graverade med initialer, monogram eller en glimt i ögat – 4-pack som håller bordet fint och stilen personlig.",
    about:
      "Glasunderlägget är den där detaljen alla lägger märke till och ingen köper åt sig själv – perfekta förutsättningar för en present. Jag graverar underlägg i massiv ek och naturkork med diodlasern, direkt i materialet, så texten sitter kvar kalas efter kalas. Välj initialer så varje glas får sin ägare, monogram till bröllopssällskapet eller en rad med glimt i ögat till baren. Som alltid får du en digital skiss på text och placering att godkänna innan lasern startar, och setet levereras presentklart.",
    related: ["nytt-hem", "brollop", "jul"],
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
    about:
      "Muggen med namnet är morgonens finaste present – den används varje dag och påminner om dig varje fikapaus. Jag trycker med namn, foto eller en liten hälsning i tryck som tål maskindisk år efter år. Beställ en till mormor med barnbarnens namn, en till pappas skrivbord eller ett helt kaffe-set till företaget. Osäker på vilken text du vill ha? Skriv till mig, så hittar vi på något ihop.",
    related: ["morsdag", "foretag", "student"],
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
    about:
      "En graverad tumbler är presenten som följer med – i bilen, på jobbet, vid jaktpasset och på paddlingsturen. Namnet eller logotypen graveras i det isolerade stålet, så den håller drycken kall (eller varm) genom hela dagen, år efter år. Enkel upplaga till förmannen, ett helt gäng till laget eller en till jägaren – texten är alltid din egen och gravyren ingår i priset.",
    related: ["foretag", "farsdag", "student"],
  },
  {
    slug: "smycken",
    tag: "smycken",
    short: "Smycken",
    icon: ikonSmycke,
    title: "Personliga smycken",
    kicker: "gravyr i silver och stål",
    description:
      "Namnhalsband, hängen och armband graverade med namn, datum eller initialer – även som parsmycken. Levereras i smyckesask, klart att ge bort.",
    about:
      "Ett personligt smycke är presenten som bärs närmast – namnhalsbandet med barnens namn, armbandet med initialerna, berlocken med årtalen. All gravyr ingår alltid i priset och levereras i smyckesask, presentklart. Parsmycken gör jag som två matchande halsband med era namn, ert datum eller koordinaterna till platsen där allt började – populärt både till bröllop, årsdagar och Alla hjärtans dag. Osäker på längd eller stil? Skriv några rader om mottagaren, så föreslår jag något som landar rätt.",
    related: ["morsdag", "alla-hjartans-dag", "dop"],
  },
  {
    slug: "skarbrador",
    tag: "skarbrada",
    short: "Skärbräda",
    icon: ikonSkarbrada,
    title: "Skärbrädor i ek",
    kicker: "till köket och grillplatsen",
    description:
      "Massiv ek med djup gravyr – familjenamn, favoritreceptet eller en hälsning till farsdagen. Välj ett av mina färdiga motiv eller skriv din egen text.",
    about:
      "En graverad skärbräda i massiv ek är presenten som står framme i köket varje dag – med familjenamnet, favoritreceptet, en husregel eller grillmästarens titel. Jag graverar djupt i eken, så texten följer med även efter år av disk och skärslag. Välj ett av mina färdiga motiv – eller skicka in precis din egen text eller ett eget recept, du får alltid en skiss att godkänna först. Populärt till farsdagen, till det nya hemmet och som bröllopspresent med parets efternamn.",
    related: ["farsdag", "jul", "nytt-hem"],
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
    about:
      "Bilentusiasten är inte svår att handla till – bara svår att överraska. Här samlar jag det som gör bilen, garaget och dragkroken lite mer hans: nyckelringen med registreringsnumret, garageskylten med namnet och plaketten till bilträffen. Gravyren skickas som skiss först som alltid, så skylten och årtalen blir exakt rätt.",
    related: ["farsdag", "lader"],
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
    about:
      "Läder är materialet som blir vackrare ju mer det används – och med gravyr blir det dessutom helt ditt eget. Här hittar du nyckelbrickor, hundtaggar, remmar och plånboksdetaljer, allt graverat med namn, initialer eller en kort rad. Jägarens hundtagg med jaktklubbens märke och hennes nyckelbricka med initialerna är två av favoriterna. Gravyren bränns in i skinnet, så den följer med hela lädrets liv.",
    related: ["farsdag", "jul"],
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
    about:
      "Stickers sätter ditt motiv på precis det du vill – datorlocket, dricksglasen på kalaset, paketet som ska öppnas eller lådan med företagets varor. Jag skär dem i verkstaden i vinyl som tål både sol och diskbänk, från ett enda exemplar och uppåt. Skicka din text, ditt motiv eller er logotyp, så skickar jag en skiss på storlek och utförande först.",
    related: ["foretag", "student"],
  },
  {
    slug: "fototavlor",
    tag: "foto",
    short: "Fototavla",
    icon: ikonFototavla,
    title: "Fototavlor",
    kicker: "minnen att hänga upp",
    description: "Dina bilder på tavla med graverad text – ett minne som får ta plats på väggen.",
    about:
      "Fotot som ligger i mobilen förtjänar plats på väggen – och med en graverad text blir tavlan dessutom helt unik. Bröllopsfotot med era namn och datumet, farfars gamla porträtt med årtalen eller hundens bästa bild med dess namn: skicka bilden du vill ha, så skissar jag på tavlans text och form innan något graveras. Det började ju med fotograferingen, så bildhantering och retusch ingår alltid.",
    related: ["brollop", "morsdag", "alla-hjartans-dag"],
  },
  {
    // Djupporträtt (sep 2026): kundens eget djurfoto -> AI-porträtt i flera
    // "alter egos" -> skiss att godkänna -> graverad produkt. Själva
    // AI-genereringen sker i verkstaden (lokal SwarmUI), inte i webbläsaren –
    // kunden skickar fotot via kontakt/köp, jag skissar som vanligt.
    slug: "djupportratt",
    tag: "djupportratt",
    short: "Djupporträtt",
    icon: ikonDjupportratt,
    title: "Djupporträtt",
    kicker: "en bild på din bästis, en hel kollektion",
    description:
      "Skicka ett mobilfoto på ditt djur, så gör jag en kollektion personlighetsfyllda porträtt – och graverar din favorit på nyckelring, skylt eller hänge. Du godkänner skissen innan lasern startar.",
    about:
      "Du behöver inte det perfekta fotot – bara djuret du redan är besatt av. Skicka ett vanligt mobilfoto där ansiktet syns, så tar jag fram porträtt i flera stilar: den lekfulle, den ståtlige, den som sover med ena ögat öppet. Välj din favorit och få den graverad i ek, läder eller silver – eller ta hela kollektionen som digitala filer. Alltid en skiss att godkänna innan jag tillverkar, som med allt annat i verkstaden.",
    related: ["fototavlor", "nyckelringar", "smycken"],
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
    about:
      "3D-printern tar idéer som inte finns i någon hylla – namnskylten i exakt rätt mått till barnrummet, reservdelen som slutat tillverkas, trofén till tävlingen eller figuren av ditt eget hus. Jag designar och skriver ut i verkstaden, i mått och färger du bestämmer. Skriv några rader om idén (gärna med mått), så svarar jag med ett förslag och en bedömning om vad som går att printa.",
    related: ["barn", "foretag", "nytt-hem"],
  },
  {
    slug: "golfklubbar",
    tag: "golfklubbar",
    short: "Golfklubbar",
    icon: ikonGolf,
    title: "Lasergravyr på golfklubbor",
    kicker: "ditt namn, din logotyp, din klubba",
    description:
      "Gravyr på dina golfklubbor: namn, initialer och logotyper graveras permanent – utan påverkan på svängvikt eller balans. Inlämning i Aneby eller på banan.",
    about:
      "En graverad klubba plockas alltid fram först – namnet syns vid första tee, initialerna följer med genom hela setet och logotypen visar vilket gäng du spelar med. Med min fiberlaser (en xTool F1 Ultra) märker jag allt från smidda järn till rostfritt stål, med laserinställningar anpassade efter varje material så kontrasten blir skarp och ren. Gravyren är permanent och tål regn, sol och hårda slag – skillnaden mot tryck och klistermärken är att den aldrig slits.\n\nDu lämnar in klubborna hos mig i Aneby – och jag kommer även ut till banan: medlemsdagar, tävlingar, företagsevent och kickoff-kvällar graverar jag på plats, så spelarna får sina klubbor märkta medan ronden pågår. Brådskar det går det bra med express: lämna in klubborna, ta en fika här i stan, och hämta dem klara för spel.\n\nPrecis som allt annat hos mig börjar det med en skiss: skriv vad du vill ha graverat (namn, initialer eller logotyp) och hur många klubbor det gäller, så svarar jag med förslag och pris att godkänna innan lasern startar. Hela set och event på banan får du offert på direkt.",
    pricing: [
      {
        title: "Prislista – lasergravyr på golfklubbor",
        rows: [
          { label: "En klubba", price: "565 kr" },
          { label: "Två klubbor", price: "945 kr" },
          { label: "Tre klubbor", price: "1 230 kr" },
          { label: "Helt klubbset", price: "Kontakta mig" },
          { label: "Express – medan du väntar", price: "470 kr" },
        ],
        note: "Priser inkl. moms. Inlämning hos mig i Aneby eller graverat på plats ute på banan. Helt klubbset och större volymer → offert via kontaktsidan.",
      },
    ],
    related: ["foretag", "farsdag"],
  },
  {
    // Ny kategori (sep 2026) enligt gap-analysen – pet tags var helt oskyddat
    // hos båda granskade konkurrenterna och fiberlasern märker plattorna på sekunder.
    slug: "husdjur",
    tag: "husdjur",
    short: "Husdjur",
    title: "Till husdjuren",
    kicker: "namnet som sitter kvar i regnet",
    description:
      "Pet tags i rostfritt stål och mässing med namn och telefonnummer – märkningen som överlever skogen, badet och lerplogen. Läderhalsband också.",
    about:
      "Hundens eller kattens namn är det första alla frågar efter på rastplatsen – och det sista du vill läsa av en sliten hängande skylt. Här graverar jag pet tags i rostfritt stål och mässing med namnet och ditt telefonnummer, med fiberlasern direkt i metallen så märkningen aldrig nöts bort. Läderhalsbandet med namnet bränt in i skinnet blir dessutom bara vackrare av år med regn och koppel. Du godkänner en skiss innan jag graverar, och namnet rymmer upp till tolv tecken – resten hittar vi en lösning på ihop.",
    related: ["jul", "farsdag"],
  },
  {
    // Ny kategori (sep 2026) – Expertprint bevisar marknaden med 11 idrottspriser,
    // men är glas- och plasttungt. Träfot + metallplakett är gapet.
    slug: "idrottspriser",
    tag: "idrott",
    short: "Idrottspriser",
    title: "Idrottspriser med gravyr",
    kicker: "pokaler och plaketter för hela prisbordet",
    description:
      "Pokaler med fot i massivt trä och plakett i metall – graverade med tävlingens namn, placering och årtal, i samma stil genom hela prisbordet.",
    about:
      "Ett prisbord ska kännas som firat, inte som inköpt i farten. Därför gör jag idrottspriser med fot i massivt trä och plakett i metall som jag graverar med just er tävling, er klass och ert år – djupt och permanent, i samma stil genom hela bordet. Föreningen, firman eller byalaget som behöver ett helt prisbord till turneringen beställer sällan en enda: skriv hur många klasser det gäller, så räknar jag fram ett pris på hela uppsättningen, med en digital skiss att godkänna innan första plaketten graveras.",
    related: ["foretag", "student"],
  },
  {
    // Ny kategori (sep 2026) – mässings- och träskyltar mot Expertprints 399-kronors
    // dörrskylt, men med skiss-godkännande och personlig text i beställningen.
    slug: "skyltar",
    tag: "skylt",
    short: "Skyltar & tavlor",
    title: "Skyltar & trätavlor",
    kicker: "namnet i metall och trä",
    icon: ikonSkylt,
    description:
      "Gårdsskyltar, husskyltar, boxskyltar, födelsetavlor, familjetavlor och medaljtavlor – graverade med ditt namn, din text eller din vers. Metallen tål väder och vind, eken åldras vackert.",
    about:
      "En namnskylt är den present som tittas på oftast – varje morgon vid dörren, varje kväll i barnrummet. Jag graverar dörrskyltar i mässing med fiberlasern, djupt in i metallen, och namnskyltar i oljad ek där träets ådring blir en del av motivet. Namnet på huset till inflyttningspresenten, barnets namn till dopet eller rummet, familjens namn vid grinden – texten är alltid din egen och du godkänner en skiss på placering och storlek innan lasern startar.",
    related: ["nytt-hem", "dop"],
  },
  {
    // Ny kategori (sep 2026) – presentaskar i plywood, enkel bildproduktion och
    // jul-2026-relevant ("klapparna som redan är inslagna").
    slug: "askar",
    tag: "askar",
    short: "Askar",
    title: "Askar & presentaskar",
    kicker: "för det som är värt att spara",
    description:
      "Presentaskar i plywood med monogram, namn eller en kort rad graverad i locket – asken som gör klappen presentklar och som sedan återanvänds år efter år.",
    about:
      "Vissa saker förtjänar mer än en påse från närbutiken. En presentask i plywood med locket graverat i monogram, namn eller en liten rad gör klappen presentklar innan den ens är inslagen – och asken lever sedan sitt eget liv, till smycket, brevpapperet eller minnena. Jag graverar i plywood och massivt trä, du godkänner en skiss på text och placering först, och vill du ha en ask till förlovningsringen eller ett helt set till bröllopsfesten hittar vi upplägget ihop.",
    related: ["jul", "brollop", "dop"],
  },
  {
    // Ny kategori (sep 2026) – fyller gapet mellan klubbtjänsten (golfklubbor) och
    // golfpresenter: Taggaklubban har tjänsten, Expertprint produkterna – ingen båda.
    slug: "golfpresenter",
    tag: "golfpresenter",
    short: "Golf",
    title: "Golfpresenter",
    kicker: "till den som redan har allt",
    description:
      "Presentaskar i plywood med plakett i ek och ball markers i rostfritt stål med initialer – golfpresenter i samma stil som klubborna, om du så vill.",
    about:
      "Golfspelaren som har allt har ändå inte sitt eget namn på sakerna. Här hittar du presentasken i plywood med graverad ekplakett – till presenten som ska räckas över – och ball markers i rostfritt stål med initialer som slits aldrig. Och eftersom jag också graverar golfklubbor – namnet eller initialerna direkt i metallen – kan allt göras i en och samma stil: asken, markersna och namnet i klubborna, med en skiss på allt innan lasern startar. Perfekt till farsdagen, julklappen eller presenten till den som är svår att handla till.",
    related: ["farsdag", "jul"],
  },
  {
    // Ny tjänstekategori (sep 2026) – gravyr på kundens egna föremål. Samma
    // mönster som golfklubbor: about-copy + pricing-block, inga produkter.
    slug: "gravyr-egna-foremal",
    tag: "egna-foremal",
    short: "Egna föremål",
    title: "Gravyr på dina egna föremål",
    kicker: "lasern märker det du redan äger",
    description:
      "Nycklar, fickknivar, multiverktyg och metallaskar – du lämnar in det du redan äger, jag graverar ditt namn eller din text. Ofta klart medan du väntar.",
    about:
      "Vissa saker går inte att köpa nya – farfars fickkniv, verktyget du haft i tjugo år, asken du ärvt. Då är gravyr på själva föremålet det enda som fungerar. Med fiberlasern märker jag metall – rostfritt stål, aluminium, mässing – och med diodlasern bränner jag in text i trä och läder. Du skriver vad du vill ha graverat och lämnar in föremålet hos mig i Aneby; småsaker graveras ofta medan du tar en fika i stan. Som alltid får du en skiss på text och placering att godkänna innan lasern startar – vissa material (till exempel hardox och härdade ytor) kräver en testgravyr först, så hör av dig om du är osäker.",
    pricing: [
      {
        title: "Prislista – gravyr på egna föremål",
        rows: [
          { label: "Små metallföremål (nyckel, tagg, medalj)", price: "149 kr" },
          { label: "Fickkniv eller multiverktyg", price: "199 kr" },
          { label: "Större metallföremål (verktyg, askar)", price: "från 295 kr" },
          { label: "Trä- och läderföremål", price: "från 179 kr" },
          { label: "Flera föremål eller volym", price: "Kontakta mig" },
        ],
        note: "Priser inkl. moms. Text och placering godkänns som skiss innan lasern startar. Osäker om ditt föremål går att graverera? Skicka en bild, så bedömer jag det innan du åker hit.",
      },
    ],
    related: ["farsdag", "foretag"],
  },
];

/** Tillfällen och urval – sekundär navigation */
export const occasions: Category[] = [
  {
    slug: "fodelsedag",
    tag: "fodelsedag",
    title: "Till födelsedagen",
    kicker: "en present för just den personen",
    description:
      "Födelsedagspresenter med personlig gravyr – de runda åren, studenten, pappa, mamma, barnet som fyller år eller vännen som har allt. Gör presenten unik.",
    about:
      "En födelsedag är en bra ursäkt att göra något som bara finns i ett exemplar – och de runda åren som 30-, 50- och 60-årspresenter förtjänar något extra. Här samlar jag presenter som passar att gravera med namn, årtal eller ett litet skämt som bara ni förstår – och hittar du inget som känns rätt skissar jag gärna något efter en rad eller två om jubilaren.",
    subcategories: [
      { slug: "student", label: "Student" },
      { slug: "farsdag", label: "Fars dag" },
      { slug: "morsdag", label: "Mors dag" },
      { slug: "brollop", label: "Bröllop" },
      { slug: "dop", label: "Dop" },
    ],
  },
  {
    slug: "student",
    tag: "student",
    title: "Till studenten",
    kicker: "något att minnas sommaren med",
    description:
      "Studentpresenter med gravyr – mugg till mottagningen, nyckelring till resan och graverat glas till festen. Beställ i god tid, studentveckan är full.",
    about:
      "Studenten är en av de där dagarna som ska firas med något som lever längre än dagen. Här hittar du presenter som går att gravera med namn, skola och årtal – eller en liten text som bara klassen förstår. Skriv vilken student det gäller, så föreslår jag något som passar.",
  },
  {
    slug: "morsdag",
    tag: "morsdag",
    title: "Till mors dag",
    kicker: "till henne som sparar allt",
    description:
      "Presenter till mamma på mors dag – graverade smycken, fototavlor och minnessaker med namnet, ett datum eller ett par fina ord.",
    about:
      "Mors dag-handeln handlar oftast om att ge något hon inte skulle köpa själv. Ett smycke med barnens namn, tavlan av ett gammalt foto eller en ask med ett par rader är det som sparas längst. Berätta om din mamma, så hjälper jag dig hitta rätt.",
  },
  {
    slug: "alla-hjartans-dag",
    tag: "hjartansdag",
    title: "Alla hjärtans dag",
    kicker: "till den du tycker mest om",
    description:
      "Personliga presenter till Alla hjärtans dag – parsmycken med era namn, halsband med initialer och graverade hjärtan som säger det utan ord.",
    about:
      "Alla hjärtans dag-presenter håller längst när de bär på något som bara är ert – initialerna, koordinaterna till första träffen eller datumet ni aldrig glömmer. Här samlar jag det som går att gravera med just er berättelse. Osäker på stilen? Skriv några rader om personen, så föreslår jag något som landar rätt.",
  },
  {
    slug: "arsdag",
    tag: "arsdag",
    title: "Till årsdagen",
    kicker: "fira åren ihop",
    description:
      "Jubileumspresenter och årsdagspresenter med gravyr – parsmycken med ert datum, graverade glas till middagen och små minnen som markerar årtalet ni fyller.",
    about:
      "Jubileet förtjänar mer än ett presentkort – det är ett årtal som betyder något. Ett parsmycke med datumet, två glas med era namn eller en berlock per gemensamt år är det som bärs framåt. Berätta hur många år ni firar, så skissar jag något som fångar er berättelse.",
  },
  {
    slug: "halloween",
    tag: "halloween",
    title: "Till halloween",
    kicker: "läskigt fint, personligt graverat",
    description:
      "Halloweenpynt med gravyr – pumpor i trä, skyltar till dörren och muggar till varma drycker. Beställ senast i mitten av oktober.",
    about:
      "Halloween växer för varje år i Sverige, och det som graveras håller längre än plastpyntet. En träpumpa med familjenamnet, en skylt till dörren eller muggen till äppelmusten är sådant som åker fram år efter år. Skriv vad du funderar på, så skissar jag något lagom läskigt.",
  },
  {
    slug: "jul",
    tag: "jul",
    title: "Till julen",
    kicker: "julklappar med ett eget namn",
    description:
      "Personliga julklappar: graverade detaljer, julgranskulor med namn och gåvor till hela listan. Beställ i god tid – allt tillverkas för hand.",
    about:
      "December är verkstadens intensivaste tid – allt tillverkas för hand efter beställning, så ju tidigare du beställer desto lugnare blir december. Här hittar du klappar som går att gravera med namn, datum eller en rad ur familjens egen historia, från nyckelringen i strumpan till presenten under granen. Har du många att handla till skriver du listan i en mejl till mig, så föreslår jag ett upplägg.",
  },
  {
    slug: "bastsaljare",
    tag: "bastsaljare",
    title: "Mest älskade just nu",
    kicker: "de som beställs om och om igen",
    description:
      "Favoriterna som flest väljer att göra personliga. Har du fastnat för någon av dem – beställ i god tid, de tar snabbt platsen i veckans tillverkning.",
  },
  {
    slug: "nyheter",
    tag: "nyhet",
    title: "Nytt i verkstaden",
    kicker: "färskt från arbetsbänken",
    description:
      "Nya idéer jag precis har börjat tillverka. Små serier – när materialet är slut tar det några veckor innan nästa omgång.",
  },
  {
    slug: "brollop",
    tag: "brollop",
    title: "Till bröllopet",
    kicker: "för dagen ni minns hela livet",
    description:
      "Graverade toastglas till toasten, glas- och flasketiketter till gästerna, ringaskar och placeringsdetaljer – allt med era namn och ert datum i samma stil.",
    about:
      "Bröllop är det jag gillar allra bäst att jobba med – jag började ju med bröllopsfotografering. Här hittar du det mesta som går att gravera till bröllopsdagen, från toastens glas till ringasken. Berätta om antal gäster och ert datum så föreslår jag ett samlat paket i en och samma stil, med en digital skiss på allt innan något tillverkas.",
  },
  {
    slug: "dop",
    tag: "dop",
    title: "Till dopet",
    kicker: "till den nya lilla",
    description:
      "Graverade dopsmycken, minnesask och namnskylt till barnrummet. Levereras presentklart.",
    about:
      "Ett dop är ett fint tillfälle att göra något som sparas länge – en minnesask, ett smycke med namnet eller en skylt till barnrummet. Allt levereras presentklart, och passar det inte att vara på plats så skickar jag det direkt till familjen. Berätta gärna om barnet och datumet, så föreslår jag vad som passar.",
  },
  {
    slug: "konfirmation",
    tag: "konfirmation",
    title: "Till konfirmationen",
    kicker: "en present som följer med i livet",
    description:
      "Konfirmationspresenter med gravyr – kors i silver med namnet, halsband med datumet och muggen till lunchen. Klassiska presenter, gjorda personliga.",
    about:
      "Konfirmationen är ett av de tillfällen där presenten verkligen ska hålla – den sparas och hittas igen om tjugo år. Ett graverat kors, ett smycke med namn och dopdatum eller något med konfirmationsåret är det jag gör oftast. Berätta om den unga, så föreslår jag något som passar.",
  },
  {
    slug: "foretag",
    tag: "foretag",
    title: "Till företaget",
    kicker: "personligt på jobbet",
    description:
      "Färdiga företagspresenter med gravyr – namnbrickor, graverade skyltar och stickers med er logotyp, klara att beställa direkt.",
    about:
      "Färdiga företagspresenter att beställa direkt: namnbrickor till personalen, presenter till kunder som stöttat genom året och profilprodukter till mässan. Behöver ni en större serie med offert och faktura? Se sidan För företag, där jag beskriver upplägget för volymbeställningar.",
  },
  {
    slug: "pension",
    tag: "pension",
    title: "Till pensionen",
    kicker: "tack för alla år",
    description:
      "Presenter med gravyr till pensionen och avskedet – graverade glas, plaketter och minnen från åren på jobbet. Fast pris och leverans i tid till sista dagen.",
    about:
      "En pensionär förtjänar mer än en blomma från tankstället. En graverad plakett med årtalen, glaset med namnet eller något som fångar yrket och åren är det som står kvar på hyllan långt efter avskedstalet. Skriv om personen och sista dagen, så hinner jag med tid till avskedet.",
  },
  {
    slug: "farsdag",
    tag: "farsdag",
    title: "Presenter till fars dag",
    kicker: "till pappa som har allt",
    description:
      "Presenter till fars dag och jakt: skärbrädor i ek, läderdetaljer med gravyr och fototavlor med en personlig hälsning.",
    about:
      "Pappa som har allt har ändå inte sitt eget namn i eken. Skärbrädan med favoritreceptet, läderdetaljen till jaktpasset och fototavlan från ett gammalt fotografi är klassikerna som landar rätt på farsdagen. Berätta en mening om honom, så skissar jag på ett par förslag.",
  },
  {
    slug: "gravyr",
    tag: "gravyr",
    title: "Gravyr i trä & läder",
    kicker: "handgjort i verkstaden",
    description: "Skärbrädor, askar, skyltar och läderdetaljer graverade efter dina önskemål.",
    about:
      "Gravyr är verkstadens kärna – allt jag gör börjar med en skiss och slutar med texten bränd eller skuren in i trä, läder, glas eller metall. Här samlar jag det som går att beställa klart och personligt: skärbrädor, askar, skyltar och läderdetaljer med din egen text. Saknar du något särskilt skriver du några rader, så skissar jag på ett upplägg innan något graveras.",
  },
  {
    slug: "fotogravyr",
    tag: "fotogravyr",
    title: "Fotogravyr",
    kicker: "ditt foto, graverat i hög upplösning",
    description:
      "Husdjur, barn, bröllopsbilder eller er favoritplats – graverat i trä, stål eller akryl. Du laddar upp bilden och får en skiss innan jag graverar.",
    about:
      "Fotogravyr är det jag är mest stolt över. Min lasermaskin graverar i mycket hög upplösning, så hårstrån, ansiktsdrag och små detaljer blir skarpa. Så går det till: du väljer produkt och laddar upp ditt foto direkt på produktsidan. Jag ser över bilden, justerar kontrast och beskärning och skickar en digital skiss inom 48 timmar. Först när du har godkänt skissen graverar jag. Bäst resultat får du med en skarp bild med bra ljus där motivet syns tydligt.",
    related: ["husdjur", "akryl", "nyckelringar", "morsdag"],
  },
  {
    slug: "barn",
    tag: "barn",
    title: "Till barnen",
    kicker: "små saker med stort värde",
    description: "Namnskyltar, dopsmycken och minnessaker som följer med genom uppväxten.",
    about:
      "Presenter till barn ska hålla för lek, åldras med värdighet och betyda något när de hittas i en låda om tjugo år. Namnskylten till rummet, smycket med namnet och asken till de första tandarna är sådant jag gör oftast. Berätta om barnet, så föreslår jag något som passar åldern.",
  },
  {
    slug: "presentkort",
    tag: "presentkort",
    title: "Presentkort",
    kicker: "när du låter mottagaren välja",
    description:
      "Presentkort på hela butiken – den som får det väljer själv present och text, och du slipper gissa fel på storlek eller stil.",
    about:
      "Ibland är det ärligaste svaret: den som ska få presenten väljer bäst själv. Ett presentkort är inget andrahandsval här – mottagaren får hela verkstadens sortiment att välja bland, samma skiss och samma omsorg som vid en vanlig beställning. Skriv att det är en present i beställningen, så skickar jag den presentklart med en liten hälsning.",
  },
  {
    slug: "nytt-hem",
    tag: "nytt-hem",
    title: "Till nya hemmet",
    kicker: "något att hänga på väggen",
    description:
      "Inflyttningspresenter med gravyr – namnskylt till dörren, skärbräda till den första middagen och korg till nycklarna. Grattis på nya hemmet!",
    about:
      "Ett nytt hem behöver saker som gör det till deras. En graverad namnskylt till dörren, skärbrädan med familjenamnet eller en ask till nycklarna är presenter som används varje dag och påminner om flyttdagen. Skriv adressen eller familjenamnet, så graverar jag något som passar det nya.",
  },
];

export const categories: Category[] = [...productTypes, ...occasions, ...recipients];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
