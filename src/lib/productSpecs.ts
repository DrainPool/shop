/**
 * Statisk typnivåkarta: produkttypens tagg → material- och skötseltext.
 * Ärlighetsprincipen: vi uppger inga påhittade millimeter per produkt –
 * exakta mått står i varje produktbeskrivning. Texterna hålls på typnivå.
 */
export interface ProductSpec {
  /** Vad den görs av – i klartext */
  material: string;
  /** Hur du håller den fin år efter år */
  skotsel: string;
}

export const PRODUCT_SPECS: Record<string, ProductSpec> = {
  nyckelring: {
    material:
      "Rostfritt stål med detaljer i ek eller vegetabiliskt garvat läder – gravyren bränns in i ytan, den nöts inte bort.",
    skotsel: "Torka av med en torr trasa; trädetaljen mår bra av en droppe olja då och då.",
  },
  smycken: {
    material:
      "Rostfritt stål eller silver. Gravyren sitter i själva metallen, inte i ett ytligt lager.",
    skotsel: "Undvik parfym, klor och att sova med smycket på – då håller glansen längre.",
  },
  glas: {
    material: "Glas som graveras med laser direkt i materialet – inga dekaler eller kemikalier.",
    skotsel: "Diska för hand eller i maskin; gravyren tål båda lika bra.",
  },
  glasunderlagg: {
    material:
      "Massiv ek eller naturkork – diodlasern bränner in gravyren direkt i materialet, inte på ytan.",
    skotsel: "Torka av med lätt fuktig trasa; ekmaterialet mår bra av en droppe olja då och då.",
  },
  mugg: {
    material: "Keramik i tung kvalitet med graverat eller tryckt motiv.",
    skotsel: "Tål diskmaskin, men handdisk skonar motivet längre.",
  },
  tumbler: {
    material:
      "Rostfritt stål med dubbelväggig isolering – gravyr eller lasermarkering direkt på metallen.",
    skotsel: "Handdisk rekommenderas; skölj ur direkt efter mjölk eller kaffe.",
  },
  skarbrada: {
    material: "Massivt trä från svenska skogar, oljad med livsmedelsgodkänd olja.",
    skotsel: "Skölj i ljummet vatten och olja in då och då – aldrig i diskmaskinen.",
  },
  lader: {
    material: "Vegetabiliskt garvat läder som graveras och fräses för hand i verkstaden.",
    skotsel: "Lädret blir vackrare med åren; håll det torrt och smörj in vid behov.",
  },
  stickers: {
    material: "Vinyl med laminat som tål sol, regn och diskmaskin.",
    skotsel: "Fäst på ren, torr yta vid plusgrader – då sitter den kvar i åratal.",
  },
  foto: {
    material: "Tryck på kvalitetspapper eller akryl, monterat med syrefria ramar.",
    skotsel: "Häng borta från direkt sol för att bevara färgerna.",
  },
  "3d": {
    material: "3D-utskrift i PLA eller PETG, formsäkrad och graverad med laser.",
    skotsel: "Torkas av med fuktig trasa; undvik långvarig värme, som i en bil i solen.",
  },
  husdjur: {
    material:
      "Rostfritt stål eller mässing – fiberlasern graverar in namnet i metallen, inte på ytan.",
    skotsel: "Tål regn, bad och lerplogar; skölj av och torka torrt så glansen sitter kvar.",
  },
  idrott: {
    material:
      "Fot i massivt trä med plakett i metall – eller helplakett i aluminium, allt graverat i verkstaden.",
    skotsel: "Torka av med torr trasa; träfoten mår bra av en droppe möbelfett då och då.",
  },
  skylt: {
    material:
      "Mässing eller aluminium märkt med fiberlaser, eller namnskylt i oljad ek graverad med diodlaser.",
    skotsel:
      "Metallen tål väder och vind; ek-skylten håller sig finast om den oljas in när den börjar se torr ut.",
  },
  askar: {
    material: "Plywood eller massivt trä, med locket graverat direkt i materialet.",
    skotsel: "Torka av torrt eller lätt fuktigt; olja in locket om det börjar torka.",
  },
  golfpresenter: {
    material:
      "Rostfritt stål och plywood – ball markers märks med fiberlaser, askar och plaketter med diodlaser.",
    skotsel: "Metallen tål väder och slag; trääskan torkas av och oljas in vid behov.",
  },
};

/** Lägg till n arbetsdagar (måndag–fredag) från ett datum. */
export function addWorkdays(from: Date, days: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}

/**
 * Tillverkningsstoppet: vardagar kl 14:00 lokal tid. Beställningar innan
 * stoppet är "med i dagens tillverkning" (FomoBanner-nedräkningen lovar
 * detsamma) – efter stoppet börjar batchen nästa vardag. Konstanten och
 * nästa-stopp-beräkningen bor här så att leverans-ETA:n på produktsidan
 * och nedräkningen i headern räknar från samma källa.
 */
export const CUTOFF_HOUR = 14;

/** Nästa tillverkningsstopp efter `now` (passerat stopp/helg hoppas över). */
export function nextCutoff(now: Date): Date {
  const cutoff = new Date(now);
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  // Passerat dagens stopp, eller helg? Hoppa till nästa vardag.
  while (cutoff.getTime() <= now.getTime() || cutoff.getDay() === 0 || cutoff.getDay() === 6) {
    cutoff.setDate(cutoff.getDate() + 1);
    cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  }
  return cutoff;
}
