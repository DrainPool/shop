/** Presenttips-artiklar (SEO-guider). Länkar bara till riktiga kategorier, inga priser. */
export type GiftTip = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string; link?: { slug: string; label: string } }[];
};

export const giftTips: GiftTip[] = [
  {
    slug: "julklappstips-med-gravyr",
    title: "Julklappstips med gravyr – personliga klappar som håller",
    description:
      "Mina bästa julklappstips med gravyr: glas, skärbrädor, smycken och nyckelringar med namn eller egen text. Beställ i god tid – du får en skiss innan jag graverar.",
    intro:
      "En julklapp med ett namn, ett datum eller en rad som bara ni förstår blir sällan bortglömd. Här är presenterna jag själv tycker fungerar bäst under granen.",
    sections: [
      {
        heading: "Till den som gillar att laga mat",
        body: "En graverad skärbräda med efternamn eller ett familjemotto används varje dag – och blir snyggare ju mer den används.",
        link: { slug: "skarbrador", label: "Se skärbrädor" },
      },
      {
        heading: "Till den som har allt",
        body: "Ett glas med eget namn eller ett inside-skämt är en liten sak som ofta blir den mest omtalade klappen.",
        link: { slug: "glas", label: "Se graverade glas" },
      },
      {
        heading: "Den lilla klappen",
        body: "Nyckelringar och underlägg passar som hårda paket, i adventskalendern eller som tillägg till en större present.",
        link: { slug: "nyckelringar", label: "Se nyckelringar" },
      },
      {
        heading: "Beställ i god tid",
        body: "Jag skickar alltid en digital skiss först. Ju tidigare du beställer, desto lugnare hinner vi justera texten tillsammans.",
      },
    ],
  },
  {
    slug: "presenter-till-honom-med-gravyr",
    title: "Presenter till honom med gravyr – idéer som känns personliga",
    description:
      "Presenttips till pappa, partnern eller kompisen: graverade glas, läder, tumblers och skärbrädor med namn eller egen text. Handgjort i Småland.",
    intro:
      "Det är svårt att hitta något till den som säger att han inte vill ha något. Min erfarenhet: välj något han redan använder – och gör det till hans.",
    sections: [
      {
        heading: "För kvällen på altanen",
        body: "Whisky- eller ölglas med initialer, ett årtal eller en rad som påminner om något ni gjort tillsammans.",
        link: { slug: "glas", label: "Se graverade glas" },
      },
      {
        heading: "För vardagen",
        body: "En termosmugg eller tumbler i stål följer med till jobbet, jakten eller golfrundan. Gravyren sitter i stålet och nöts inte bort.",
        link: { slug: "tumblers", label: "Se tumblers" },
      },
      {
        heading: "För den praktiske",
        body: "Läderprodukter åldras vackert och blir mer personliga för varje år.",
        link: { slug: "lader", label: "Se läder" },
      },
      {
        heading: "För golfaren",
        body: "Golfpresenter med namn eller klubbens logga blir en fin gåva till både vän och kollega.",
        link: { slug: "golfpresenter", label: "Se golfpresenter" },
      },
    ],
  },
  {
    slug: "varfor-graverat-glas-haller",
    title: "Varför graverat glas håller – och hur du sköter det",
    description:
      "Så fungerar lasergravyr i glas, varför den inte bleknar som tryck och hur du sköter ditt graverade glas så det håller i många år.",
    intro:
      "Ett tryck sitter ovanpå glaset. En gravyr sitter i det. Det är den stora skillnaden – och anledningen till att jag graverar i stället för att trycka.",
    sections: [
      {
        heading: "Gravyren är en del av glaset",
        body: "Lasern matterar själva glasytan. Det finns ingen färg som kan flagna eller tvättas bort, så motivet ser likadant ut efter hundra disk som efter den första.",
      },
      {
        heading: "Skötsel",
        body: "Handdisk är alltid skonsammast för glaset i sig. Undvik slipande svampar på den graverade ytan, så håller glaset sin lyster längst.",
      },
      {
        heading: "Välj rätt glas till tillfället",
        body: "Vin- och champagneglas för bröllop och jubileum, öl- och whiskyglas till honom eller till fars dag.",
        link: { slug: "glas", label: "Se graverade glas" },
      },
    ],
  },
  {
    slug: "doppresent-med-gravyr",
    title: "Doppresent med gravyr – en gåva som får följa med genom livet",
    description:
      "Tips på doppresenter med gravyr: namn, datum och en hälsning i trä, silver eller glas. Du får alltid en digital skiss innan jag graverar.",
    intro:
      "En doppresent köps för ett barn som inte kommer ihåg dagen. Därför tycker jag att den ska kunna sparas – och berätta om dagen när barnet blir stort.",
    sections: [
      {
        heading: "Ett minne att spara",
        body: "Namn, dopdatum och kanske en kort rad från dig. Enkelt, tydligt och tidlöst.",
        link: { slug: "dop", label: "Se dopgåvor" },
      },
      {
        heading: "Något för väggen eller hyllan",
        body: "Tavlor och skyltar med barnets namn blir en del av rummet redan från början.",
        link: { slug: "dop", label: "Se dopgåvor" },
      },
      {
        heading: "Stava rätt – jag dubbelkollar",
        body: "Namn stavas på många sätt. Skissen jag skickar gör att du kan kontrollera varje bokstav innan något graveras.",
      },
    ],
  },
  {
    slug: "studentpresent-med-gravyr",
    title: "Studentpresent med gravyr – personligt till den stora dagen",
    description:
      "Studentpresenter med gravyr: glas, smycken och nyckelringar med namn, årtal eller ett inside-skämt från klassen. Beställ i god tid före utspringet.",
    intro:
      "Studenten får mycket blommor och kuvert. En sak med namnet och årtalet blir ofta den som finns kvar när champagnen är slut.",
    sections: [
      {
        heading: "Till festen",
        body: "Ett glas med namn och examensår – används på flaket och står kvar i skåpet i många år.",
        link: { slug: "glas", label: "Se graverade glas" },
      },
      {
        heading: "Att bära med sig",
        body: "Ett smycke eller en nyckelring följer med till nästa stad, nya jobbet eller första egna lägenheten.",
        link: { slug: "student", label: "Se studentpresenter" },
      },
      {
        heading: "Beställ före maj",
        body: "Juni är min mest intensiva månad. Beställer du tidigt hinner vi justera skissen i lugn och ro.",
      },
    ],
  },
  {
    slug: "brollopspresent-med-gravyr",
    title: "Bröllopspresent med gravyr – för brudparet och dagen",
    description:
      "Bröllopspresenter med gravyr: glas, skärbrädor och skyltar med brudparets namn och datum. Personligt, hållbart och tillverkat i Småland.",
    intro:
      "Den bästa bröllopspresenten är något brudparet använder ofta och som påminner om dagen varje gång. Namnen och datumet gör resten.",
    sections: [
      {
        heading: "För skålen",
        body: "Ett par glas med namn och bröllopsdatum – lika fint på dagen som på tioårsdagen.",
        link: { slug: "glas", label: "Se graverade glas" },
      },
      {
        heading: "För det nya hemmet",
        body: "En skärbräda med efternamnet används varje dag och blir vackrare med tiden.",
        link: { slug: "skarbrador", label: "Se skärbrädor" },
      },
      {
        heading: "Allt för bröllopet",
        body: "Jag samlar presenter och detaljer till bröllopet på ett ställe.",
        link: { slug: "brollop", label: "Se bröllopspresenter" },
      },
    ],
  },
  {
    slug: "present-till-pappa-med-gravyr",
    title: "Present till pappa med gravyr – personligt och användbart",
    description:
      "Presenttips till pappa: graverade glas, nyckelringar med foto, skärbrädor och läder med namn eller egen text. Digital skiss innan jag graverar.",
    intro:
      "Pappor säger ofta att de inte behöver något. Därför väljer jag saker han redan använder – och gör dem till hans med ett namn, ett datum eller ett foto.",
    sections: [
      {
        heading: "Med barnens foto",
        body: "En nyckelring eller fotoplatta med barnen eller barnbarnen graverade följer med honom överallt.",
        link: { slug: "fotogravyr", label: "Se fotogravyr" },
      },
      {
        heading: "För kvällen",
        body: "Ett whisky- eller ölglas med initialer är en klassiker som aldrig blir fel.",
        link: { slug: "glas", label: "Se graverat glas" },
      },
      {
        heading: "Till Fars dag",
        body: "Jag samlar mina bästa presenter till Fars dag på ett ställe.",
        link: { slug: "farsdag", label: "Se Fars dag" },
      },
    ],
  },
  {
    slug: "present-till-mamma-med-gravyr",
    title: "Present till mamma med gravyr – idéer med känsla",
    description:
      "Presenttips till mamma: smycken med namn, fotogravyr i trä eller akryl och skärbrädor med familjens namn. Handgjort i Småland.",
    intro:
      "Det som brukar betyda mest för en mamma är det som påminner om familjen. Ett namn, ett datum eller en bild – graverat så det håller.",
    sections: [
      {
        heading: "Familjen i bild",
        body: "Ett foto graverat i trä eller akryl blir en tavla som står framme i många år.",
        link: { slug: "fotogravyr", label: "Se fotogravyr" },
      },
      {
        heading: "Nära hjärtat",
        body: "Ett smycke med barnens namn eller initialer bärs varje dag.",
        link: { slug: "smycken", label: "Se smycken" },
      },
      {
        heading: "Till Mors dag",
        body: "Här samlar jag presenterna som passar extra bra till Mors dag.",
        link: { slug: "morsdag", label: "Se Mors dag" },
      },
    ],
  },
  {
    slug: "present-till-husdjursagare",
    title: "Present till husdjursägare – ditt djur graverat",
    description:
      "Presenter med husdjursporträtt: nyckelringar, akrylskyltar och minnesskyltar där din hund eller katt graveras i hög upplösning.",
    intro:
      "För många är hunden eller katten en i familjen. Med fotogravyr i hög upplösning syns pälsen och blicken – det blir verkligen deras djur.",
    sections: [
      {
        heading: "Alltid med i fickan",
        body: "En nyckelring med djurets porträtt är en liten present som används varje dag.",
        link: { slug: "nyckelringar", label: "Se nyckelringar" },
      },
      {
        heading: "För hemmet och husdjuret",
        body: "Skyltar, skålar och detaljer med djurets namn.",
        link: { slug: "husdjur", label: "Se husdjur" },
      },
      {
        heading: "Så går det till",
        body: "Du laddar upp ett skarpt foto på produktsidan, jag skickar en skiss och graverar först när du har godkänt.",
        link: { slug: "fotogravyr", label: "Läs om fotogravyr" },
      },
    ],
  },
  {
    slug: "minnespresent-med-gravyr",
    title: "Minnespresent med gravyr – för det som inte ska glömmas",
    description:
      "Minnespresenter med gravyr: minnesskyltar i akryl, fotogravyr i trä och askar med namn och datum. Jag hanterar varje beställning varsamt.",
    intro:
      "Ibland är en present ett sätt att minnas. Ett namn, ett datum eller en bild som får en fin plats hemma. Jag tar extra varsamt hand om de här beställningarna.",
    sections: [
      {
        heading: "En bild att behålla",
        body: "Fotogravyr i trä eller akryl ger en bild som håller i många år.",
        link: { slug: "fotogravyr", label: "Se fotogravyr" },
      },
      {
        heading: "Minnesskylt i akryl",
        body: "En tjock akrylskylt med porträtt och egen text – för en människa eller ett husdjur.",
        link: { slug: "akryl", label: "Se akryl" },
      },
      {
        heading: "För de små sakerna",
        body: "En ask med namn och datum för brev, smycken eller minnessaker.",
        link: { slug: "askar", label: "Se askar" },
      },
    ],
  },
  {
    slug: "brollop-i-akryl",
    title: "Bröllop i akryl – tårttopper, välkomstskylt och bordsplaceringar",
    description:
      "Bröllopsdetaljer i akryl: tårttopper, välkomstskylt och bordsplaceringar, laserskurna och graverade med era namn. Alla färger på beställning.",
    intro:
      "Akryl gör att jag kan skära ut exakt den form och text ni vill ha. Allt görs i samma stil, så dagen hänger ihop – från tårtan till bordet.",
    sections: [
      {
        heading: "Tårttopper och välkomstskylt",
        body: "Era namn och datum utskurna i akryl, i den färg som passar dagen. Skivor upp till 600×300 mm.",
        link: { slug: "akryl", label: "Se akryl" },
      },
      {
        heading: "Bordsplaceringar",
        body: "Varje gäst får sitt namn graverat – och en liten sak att ta med hem.",
        link: { slug: "akryl", label: "Se bordsplaceringar" },
      },
      {
        heading: "Fler bröllopspresenter",
        body: "Glas, skärbrädor och presenter till brudparet.",
        link: { slug: "brollop", label: "Se bröllop" },
      },
    ],
  },
];

export const getGiftTip = (slug: string) => giftTips.find((t) => t.slug === slug);
