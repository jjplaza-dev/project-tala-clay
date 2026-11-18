"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface AccordionEntry {
  id: string;
  title: string;
  body: string;
}

export function AccordionGroup({ items, ariaLabel }: { items: AccordionEntry[]; ariaLabel: string }) {
  return (
    <Accordion aria-label={ariaLabel} className="bg-background">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="min-h-11 text-base">{item.title}</AccordionTrigger>
          <AccordionContent className="max-w-[62ch] text-base leading-relaxed">
            <p>{item.body}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
