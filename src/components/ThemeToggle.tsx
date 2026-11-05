import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Mörkt läge – växlar .dark-klassen på <html> och sparar valet i
 * localStorage. Systeminställningen (prefers-color-scheme) är startvärde
 * när inget val gjorts; väljer användaren explicit sparas det.
 * Tailwind-varianten (@custom-variant dark) följer .dark-klassen.
 */
const STORAGE_KEY = "taggat-theme";

function initialDark(): boolean {
  if (typeof document === "undefined") return false;
  if (document.documentElement.classList.contains("dark")) return true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
  } catch {
    /* localStorage kan vara låst (privatläge) – fall tyst vidare */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(initialDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    // theme-color följer med: mobilstatusfältet matchar bakgrunden
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#201b17" : "#F8F5F0");
  }, [dark]);

  function toggle() {
    setDark((d) => {
      const next = !d;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        /* spara misslyckades – valet gäller bara sessionen */
      }
      return next;
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Växla till ljust läge" : "Växla till mörkt läge"}
      aria-pressed={dark}
      className="h-10 w-10 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
    >
      {dark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}