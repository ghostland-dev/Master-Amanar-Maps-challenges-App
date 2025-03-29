
import React, { useState } from "react";
import { HelpCircle, MessageSquare, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssistanceQuestion {
  id: string;
  question: string;
  answer: string;
}

interface StepAssistanceProps {
  questions: AssistanceQuestion[];
  stepId: number;
}

const StepAssistance = ({ questions, stepId }: StepAssistanceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  
  const toggleQuestion = (id: string) => {
    if (expandedQuestions.includes(id)) {
      setExpandedQuestions(expandedQuestions.filter(q => q !== id));
    } else {
      setExpandedQuestions([...expandedQuestions, id]);
    }
  };
  
  if (questions.length === 0) return null;
  
  return (
    <div className="mt-6">
      <Button
        variant="outline"
        className="w-full flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <HelpCircle className="h-4 w-4 mr-2 text-primary" />
          <span>Besoin d'assistance?</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      
      {isOpen && (
        <Card className="mt-2 border-dashed">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              <h4 className="text-sm font-medium">Questions fréquentes</h4>
            </div>
            
            {questions.map((q) => (
              <div key={q.id} className="border border-border/50 rounded-lg overflow-hidden">
                <div
                  className="p-3 bg-secondary/30 flex justify-between items-center cursor-pointer hover:bg-secondary/50"
                  onClick={() => toggleQuestion(q.id)}
                >
                  <span className="text-sm font-medium">{q.question}</span>
                  {expandedQuestions.includes(q.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {expandedQuestions.includes(q.id) && (
                  <div className="p-3 bg-card text-sm text-muted-foreground border-t border-border/50">
                    {q.answer}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-2 flex justify-end">
              <Button variant="link" size="sm" className="text-xs group">
                Contacter un mentor
                <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepAssistance;
