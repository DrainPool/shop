import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

/**
 * Räknar ner till dagens tillverkningsstopp (vardagar kl 14:00 lokal tid).
 * Beställningar som kommer in innan dess läggs in i dagens tillverkning.
 * Efter stoppet – eller på helgen – pekar nedräkningen på nästa vardag 14:00.
 *
 * Kort fönster (timmar/minuter) i stället för dagar: det är ärligare mot
 * hur verkstaden faktiskt jobbar och känns inte som en påhittad kampanj.
 */
const CUTOFF_HOUR = 14;

function nextCutoff(now: Date) {
  const cutoff = new Date(now);
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  // Passerat dagens stopp, eller helg? Hoppa till nästa vardag.
  while (cutoff.getTime() <= now.getTime() || cutoff.getDay() === 0 || cutoff.getDay() === 6) {
    cutoff.setDate(cutoff.getDate() + 1);
    cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  }
  return cutoff;
}

type Countdown = { hours: number; minutes: number; today: boolean };

export function useCutdown(): Countdown | null {
  const [state, setState] = useState<Countdown | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const cutoff = nextCutoff(now);
      const totalSeconds = Math.floor((cutoff.getTime() - now.getTime()) / 1000);
      setState({
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        today: cutoff.getDate() === now.getDate(),
      });
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return state;
}

export function CutoffCountdown({ className = "" }: { className?: string }) {
  const t = useCutdown();
  if (!t) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className={`font-semibold tabular-nums ${className}`}>
      {pad(t.hours)}:{pad(t.minutes)}
    </span>
  );
}

/** Kompakt rad för den mörka trygghetslisten – ingen egen bård. */
export function CutoffInline({ className = "" }: { className?: string }) {
  const t = useCutdown();
  if (!t) return null;
  return (
    <span className={`flex items-center gap-1.5 ${className}`}>
      <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
      <span>
        {t.today ? "Beställ inom " : "Nästa tillverkningsstopp om "}
        <CutoffCountdown className="text-gold" /> {t.today ? "– med i dagens tillverkning" : ""}
      </span>
    </span>
  );
}

export function FomoBanner({ floating = false }: { floating?: boolean }) {
  return (
    <div
      className={
        floating ? "border-b border-gold/30 bg-gold/10" : "border-y border-gold/30 bg-gold/10"
      }
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center text-sm">
        <Clock className="h-4 w-4 shrink-0 text-primary-deep" />
        <p className="text-foreground">
          Jag tillverkar allt själv och tar in ett begränsat antal beställningar per dag. Lägg din
          order inom <CutoffCountdown className="text-primary-deep" /> så hinner den med i dagens
          tillverkning.
        </p>
      </div>
    </div>
  );
}
