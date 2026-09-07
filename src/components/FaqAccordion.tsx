import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  q: string;
  a: ReactNode;
}

/**
 * En mekanism för alla FAQ-listor – vanliga-fragor-sidan och
 * produktsidans "Bra att veta"-block. Copy ägs av respektive sida.
 */
export function FaqAccordion({
  items,
  className = "mt-3",
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <Accordion type="single" collapsible className={className}>
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`item-${i}`}>
          <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
