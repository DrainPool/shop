/**
 * TaggaDet-märket — koncept B, "Puns": en gravörs stämpel. En grov ring med ett
 * geometriskt T i öppningen. T:et är ritat av streck och inte en typsnittsglyf,
 * så märket är inte beroende av att Marcellus hunnit laddas.
 *
 * MÅTTEN ÄR MÄTTA, INTE GISSADE. Ringens 5,5 enheter är 2,2 px vid 16 px och
 * T:ets streck 5 enheter är 1,8 px. Den första versionen hade en hårfin ring på
 * 0,4 px, som nedsamplingen gjorde till en suddig halo i stället för en ring.
 * Ändra inte måtten utan att köra 16 px-provet igen:
 * design-system/taggadet/logo/preview.html#closeup
 *
 * viewBox är "4 4 40 40" och inte "0 0 48 48" av samma skäl: konsten spänner
 * 34 enheter, och med den vidare boxen gick 2,3 px av flikens 16 åt till tom
 * marginal.
 *
 * currentColor → färgen sätts av omgivningen, precis som Tape i TrustPromises.
 */
export function BrandMark({ className, label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="4 4 40 40"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": "true" })}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M24 7 A17 17 0 1 0 24 41 A17 17 0 1 0 24 7 Z
           M24 12.5 A11.5 11.5 0 1 0 24 35.5 A11.5 11.5 0 1 0 24 12.5 Z
           M18 18.5 L30 18.5 L30 23.5 L26.5 23.5 L26.5 31 L21.5 31 L21.5 23.5 L18 23.5 Z"
      />
    </svg>
  );
}
