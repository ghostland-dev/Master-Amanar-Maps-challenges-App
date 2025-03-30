
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItemType {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItemType[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger className="text-left font-medium">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FaqAccordion;
