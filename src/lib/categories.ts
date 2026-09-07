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
  /** Unik "Om {kategori}"-text för SEO-blocket – saknas den används generisk fallback */
  about?: string;
  /** Ikon för produkttyp-raden */
  icon?: string;
  /** Kort etikett i ikonraden */
  short?: string;
  /** Underkategorier (occasion-grupper, länkar till andra kategorisidor) */
  subcategories?: { slug: string; label: string }[];
  /** "Passar också till"-pills i Om-sektionen – bygger intern länkflod */
  related?: string[];
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
    about:
      "En nyckelring med namn eller eget motiv är en av de presenter som verkligen används – varje dag, i fickan, i handväskan, i bilen. Här hittar du nyckelringar i massiv ek, läder och rostfritt stål, alla graverade med precis den text du vill ha: ett namn, ett datum, era koordinater eller nåt som bara ni två fattar. Gravyren ingår alltid i priset och du får en digital skiss att godkänna innan jag graverar. Populärt som present till hon som har allt, till nycklarna till det nya hemmet och till födelsedagen.",
    related: ["fodelsedag", "nytt-hem", "farsdag"],
  },
  {
    slug: "glas",
    tag: "glas",
    short: "Glas",
    icon: ikonGlas,
    title: "Graverade glas",
    kicker: "skål för det ni firar",
    description:
      "Ölglas, vinglas, champagneglas och whiskyglas med sandblästrad gravyr som tål maskindisk. Perfekt till toastmastern, brudparet, studenten eller kollegan som fyller jämnt.",
    about:
      "Graverade glas är klassikern som aldrig går ur tiden – ölglaset med hans namn, vinglaset med årtalen, whiskyglasset med jaktsällskapets signatur. Jag sandblästrar gravyren på riktigt (inte bara tryck som slits), så den tål maskindisk och håller lika länge som glaset. Beställ ett par glas till brudparet, en uppsättning till studenten eller det enskilda glaset till födelsedagen – texten är alltid din egen, och du får en skiss på exakt hur den kommer att se ut innan jag blästrar.",
    related: ["brollop", "student", "pension"],
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
    about:
      "En keps med broderad text eller logga är presenten som syns – på golfbanan, vid svensexan, på jobbet. Jag trycker och broderar i små upplagor, från en enda keps och uppåt, så laget, företaget eller poliskullen får något som inte finns i någon butikshylla. Skicka din text eller er logotyp, så skickar jag en skiss på placering och storlek innan jag sätter igång.",
    related: ["foretag", "student"],
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
    about:
      "En t-shirt med eget tryck gör sig fin på kalaset, i laget och som present med en insida bara ni förstår. Jag trycker i mjuk bomull från ett enda plagg – namn, datum, ett foto eller ett citat – och du godkänner en skiss på motivet innan trycket körs. Större upplagor till företaget eller föreningen? Skriv några rader om antal och datum, så räknar jag fram ett pris.",
    related: ["foretag", "student"],
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
    about:
      "En hoodie med eget tryck håller varmt länge efter att festen är över. Jag trycker och broderar precis din text eller ditt motiv – familjens slogan, lagets namn, föreningens logga – i mjuka plagg från ett enda stycke. Beställ en till dig och matchande till resten av gänget, eller hör av dig om personalen ska ha samma. Du får en skiss på trycket att godkänna innan jag börjar.",
    related: ["foretag"],
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
      "En graverad tumbler är presenten som följer med – i bilen, på jobbet, vid jaktpasset och på paddlingsturen. Namnet eller logotypen graveras i det isolerade stålet, så den håller drycken kall (eller varm) genom hela dagen, år efter år. Enkel upplaga till förmannen, ett helt gäng till laget eller en med hans jaktlag – texten är alltid din egen och gravyren ingår i priset.",
    related: ["foretag", "farsdag", "student"],
  },
  {
    slug: "smycken",
    tag: "smycken",
    short: "Smycken",
    icon: ikonSmycke,
    title: "Personliga smycken",
    kicker: "gravyr i silver & guld",
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
      "Bilentusiasten är inte svår att handla till – bara svår att överraska. Här samlar jag det som gör bilen, garaget och dragkrogen lite mer hans: nyckelringen med registreringsnumret, garageskylten med namnet och plaketten till bilträffen. Gravyren skickas som skiss först som alltid, så nummerplåten och årtalen blir exakt rätt.",
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
      "Läder är materialet som blir vackrare ju mer det används – och med gravyr blir det dessutom helt ditt eget. Här hittar du nyckelbrickor, hundtaggar, remmar och plånboksdetaljer, allt graverat med namn, initialer eller en kort rad. Jägarens hundtagg med jaktklubbens märke och hennes nyckelbricka med initialerna är två av favoriterna. Gravyren bränns in i skinnet, så den följer med hela läderets liv.",
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
      "Stickers låter dig trycka ditt motiv på precis det du vill – datorlocket, dricksglasen på kalaset, paketet som ska öppnas eller lådan med företagets varor. Jag skär dem i verkstaden i vinyl som tål både sol och diskbänk, från ett enda exemplar och uppåt. Skicka din text, ditt motiv eller er logotyp, så skickar jag en skiss på storlek och utförande först.",
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
    slug: "3d-utskrifter",
    tag: "3d",
    short: "3D-print",
    icon: ikon3d,
    title: "3D-utskrifter",
    kicker: "egen design, lager för lager",
    description:
      "Namnskyltar, figurer och detaljer utskrivna i egen design. Har du en idé printar jag den.",
    about:
      "3D-printern tar idéer som inte finns i någon hylla – namnskylten i exakt rätt mått till barnrummet, en lös detalj som slutar tillverkas, trofén till tävlingen eller figuren av ditt eget hus. Jag designar och skriver ut i verkstaden, i mått och färger du bestämmer. Skriv några rader om idén (gärna med mått), så svarar jag med ett förslag och en bedömning om vad som går att printa.",
    related: ["barn", "foretag", "nytt-hem"],
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
      "Födelsedagspresenter med personlig gravyr – 30-, 50- och 60-årspresenter, till studenten, pappa, mamma, barnet som fyller år eller vännen som har allt. Välj underkategori och gör presenten unik.",
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
      "Studenten är en av de där dagarna som ska firas med något som lever längre än mottagningen. Här hittar du presenter att gravera med namn, skola och årstal – eller en liten text som bara klassen förstår. Skriv vilken student det gäller, så föreslår jag något som passar hen.",
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
      "Jubileumet förtjänar mer än ett presentkort – det är ett årtal som betyder något. Ett parsmycke med datumet, två glas med era namn eller en berlock per gemensamt år är det som bärs framåt. Berätta hur många år ni firar, så skissar jag något som fångar just era.",
  },
  {
    slug: "halloween",
    tag: "halloween",
    title: "Till halloween",
    kicker: "läskigt personligt",
    description:
      "Graverade dekorer, charms och stickers till årets läskigaste kväll – med din egen text, era namn eller en symbol som bara gänget förstår. Beställ i god tid, allt tillverkas för hand.",
    about:
      "Halloween växer för varje år – och de allra flesta dekorationerna köps i butikshyllan, samma som grannen har. Här samlar jag det som går att gravera med namn, årstal eller en egen tvist: charmen till kostymen, dekoren till kalaset och presenten till värden. Berätta om kalaset, så föreslår jag något som passar – och något som håller till nästa år också.",
  },
  {
    slug: "jul",
    tag: "jul",
    title: "Till julen",
    kicker: "julklappar med ett eget namn",
    description:
      "Personliga julklappar som inte finns i hyllan: graverade detaljer, julgranskulor med namn och gåvor till hela listan. Beställ i god tid – allt tillverkas för hand inför jul.",
    about:
      "Julen är verkstadens största vecka – allt tillverkas för hand efter beställning, så ju tidigare du beställer desto lugnare blir december. Här hittar du klappar som går att gravera med namn, datum eller en rad ur familjens egen historia, från nyckelringen i strumpan till presenten under granen. Har du många att handla till skriver du listan i en mejl till mig, så föreslår jag ett upplägg.",
  },
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
      "Konfirmationspresenter med gravyr – kors i silver med namnet, halsband med datumet och muggen till lunchen. Klassiska presenter, gjort personliga.",
    about:
      "Konfirmationen är ett av de tillfällen där presenten verkligen ska hålla – den sparas och hittas igen om tjugo år. Ett graverat kors, ett smycke med namn och dopdatum eller något med konfirmationsåret är det jag gör oftast. Berätta om den unga, så föreslår jag något som passar.",
  },
  {
    slug: "foretag",
    tag: "foretag",
    title: "Till företaget",
    kicker: "personligt på jobbet",
    description:
      "Namnbrickor, graverade skyltar och stickers med er logotyp – till personal, kunder och mässan.",
    about:
      "Företagssidan av verkstaden: namnbrickor till personalen, presenter till kunder som stöttat genom året och profilprodukter till mässan. Från tio enheter får du offert med staffelpris, och faktura är ingen fjärrsikt. Skriv några rader om er logotyp och era datum, så svarar jag med ett upplägg.",
  },
  {
    slug: "pension",
    tag: "pension",
    title: "Till pensionen",
    kicker: "tack för alla år",
    description:
      "Presenter med gravyr till pensionen och avskedet – graverade glas, plaketter och minnen från åren på jobbet. Fast pris och leverans i tid till sista dagen.",
    about:
      "En pensionär förtjänar mer än en blomma från närmaste Statoil. En graverad plakett med årtalen, glaset med namnet eller något som fångar yrket och åren är det som står kvar på hyllan långt efter avskedstalet. Skriv om personen och sista dagen, så hinner jag med tid till avskedet.",
  },
  {
    slug: "farsdag",
    tag: "farsdag",
    title: "Presenter till fars dag",
    kicker: "till pappa som har allt",
    description:
      "Presenter till fars dag och jakt: skärbrädor i ek, läderdetaljer med gravyr och fototavlor med en personlig hälsning.",
    about:
      "Pappa som har allt har ändå inte sitt eget namn i eken. Skärbrädan med favoritreceptet, läderdetaljen till jaktpasset och fototavlan från ett gammalt fotografi är klassikerna som landar rätt på farsdagen. Berätta en mening om honom, så skissar jag på förslag.",
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
    about:
      "Presenter till barn ska hålla för lek, åldras med värdighet och betyda något när de hittas i en låda om tjugo år. Namnskylten till rummet, smycket med namnet och asken för de första tandarna är sådant jag gör oftast. Berätta om barnet, så föreslår jag något som passar åldern.",
  },
  {
    slug: "presentkort",
    tag: "presentkort",
    title: "Presentkort",
    kicker: "när du låter mottagaren välja",
    description:
      "Presentkort på hela butiken – den som får det väljer själv present och text, och du slipper gissa fel på storlek eller stil.",
    about:
      "Ibland är det ärligaste svaret: den som ska få presenten väljer bäst själv. Ett presentkort är inget ofullgånget presentkort här – mottagaren får hela verkstadens sortiment att välja bland, samma skiss och samma omsorg som vid en vanlig beställning. Skriv att det är present i beställningen, så skickar jag det presentklart med en liten hälsning.",
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

export const categories: Category[] = [...productTypes, ...occasions];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
