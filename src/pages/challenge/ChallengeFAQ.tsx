
import React from "react";
import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

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
      <Card className="glass transition-all duration-300 hover:shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <h3 className="font-medium mb-1">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
