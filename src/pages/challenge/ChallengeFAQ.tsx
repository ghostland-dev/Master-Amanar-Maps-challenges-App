
import React, { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ChallengeFAQProps {
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const ChallengeFAQ = ({ faqs }: ChallengeFAQProps) => {
  if (!faqs || faqs.length === 0) return null;
  
  return (
    <div className="mt-8">
      <Card className="glass transition-all duration-300 hover:shadow-md border-border/30 hover:border-border/50">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Questions fréquentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-b border-border/50 last:border-0">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="text-left font-medium text-sm">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pt-1 pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Card>
    </div>
  );
};
