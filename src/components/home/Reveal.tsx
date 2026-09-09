import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useReveal } from "@/components/home/useReveal";

/**
 * Wrappar innehåll som ska åka in synligt när det skrollas fram.
 * `as` styr semantiken (t.ex. "li" i en <ol>) – div är standard.
 * `delay` förskjuter starten (ms) för staggerade kort.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const { ref, state } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
        state === "hidden" && "motion-safe:opacity-0 motion-safe:translate-y-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
