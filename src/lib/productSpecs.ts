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
  mugg: {
    material: "Keramik i tung kvalitet med graverat eller tryckt motiv.",
    skotsel: "Tål diskmaskin, men handdisk skonar motivet längre.",
  },
  tumbler: {
    material:
      "Rostfritt stål med dubbelväggig isolering – gravyr eller lasermarkering direkt på metallen.",
    skotsel: "Handdisk rekommenderas; skölj ur direkt efter mjölk eller kaffe.",
  },
  keps: {
    material: "Bomullsbroscherad keps med broderat eller graverat märke.",
    skotsel: "Diska för hand i ljummet vatten; torka på huvudet så formen behålls.",
  },
  tshirt: {
    material: "Mjuk bomullstrikå med hållbart tryck som trycks först när du beställt.",
    skotsel: "Tvätta ut- och in på 40 grader; stryk på insidan om strykning behövs.",
  },
  hoodie: {
    material: "Tung, borstad bomullsblandning med tryck på beställning.",
    skotsel: "Tvätta på 40 grader och skaka ut plagget direkt ur maskinen.",
  },
  skarbrada: {
    material: "Massivt trä från svenska bördar, oljad med livsmedelsgodkänd olja.",
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
