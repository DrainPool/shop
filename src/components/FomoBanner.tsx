import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

/**
 * Räknar ner till veckans produktionsstopp (söndag 23:59 lokal tid).
 * Allt som beställs innan dess går in i nästa veckas tillverkning.
 */
function msUntilCutoff() {
  const now = new Date();
  const cutoff = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7;
  cutoff.setDate(now.getDate() + daysUntilSunday);
  cutoff.setHours(23, 59, 59, 999);
  if (cutoff.getTime() <= now.getTime()) cutoff.setDate(cutoff.getDate() + 7);
  return cutoff.getTime() - now.getTime();
}

export function useCutdown() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    setMs(msUntilCutoff());
    const id = setInterval(() => setMs(msUntilCutoff()), 1000);
    return () => clearInterval(id);
  }, []);
  if (ms === null) return null;
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function CutoffCountdown({ className = "" }: { className?: string }) {
  const t = useCutdown();
  if (!t) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className={`font-semibold tabular-nums ${className}`}>
      {t.days > 0 ? `${t.days} d ` : ""}
      {pad(t.hours)}:{pad(t.minutes)}:{pad(t.seconds)}
    </span>
  );
}

export function FomoBanner({ floating = false }: { floating?: boolean }) {
  return (
    <div
      className={
        floating
          ? "border-b border-gold/30 bg-gold/10"
          : "border-y border-gold/30 bg-gold/10"
      }
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center text-sm">
        <Clock className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-foreground">
          Jag tillverkar allt själv och tar in ett begränsat antal beställningar per vecka.
          Lägg din order inom <CutoffCountdown className="text-primary" /> så hinner den med i
          veckans tillverkning.
        </p>
      </div>
    </div>
  );
}
