/*
 * Den ENDA badge-tonkartan för butiken. Ersätter de duplicerade
 * klasskartorna som tidigare låg i ProductCard och ProductGallery —
 * ny badge-kod ska importera härifrån, inte skriva egna klasssträngar.
 * Literaler (inte sammansättning) så att Tailwind hittar klasserna.
 */
export const badgeTone = {
  primary: "bg-primary/15 text-primary-deep",
  gold: "border border-gold/50 bg-gold/15 text-primary-deep",
  ink: "bg-ink/90 text-ink-foreground",
} as const;

export type BadgeTone = keyof typeof badgeTone;
