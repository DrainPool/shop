/** Ett enda leveranslöfte för hela butiken. Ändra tiderna här – ingen annanstans. */
export const SKETCH_TIME = "inom 48 timmar";
export const SPECIAL_ORDER_TIME = "inom 72 timmar efter godkänd skiss";
export const STOCK_ITEM_TIME = "omgående";

export const DELIVERY_SHORT = `Skiss ${SKETCH_TIME} · specialbeställning ${SPECIAL_ORDER_TIME}`;

export const DELIVERY_PROMISE =
  `Du får en digital skiss ${SKETCH_TIME}. Specialbeställningar tillverkas ${SPECIAL_ORDER_TIME}. ` +
  `Lagervaror med namn eller enkel gravyr hanteras ${STOCK_ITEM_TIME}.`;
