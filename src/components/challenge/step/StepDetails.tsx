
import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { StepActions } from "./StepActions";
import { StepTips } from "./StepTips";
import { StepResources } from "./StepResources";
import { StepCommonMistakes } from "./StepCommonMistakes";

interface StepDetailsProps {
  step: {
    id: number;
    title: string;
    isCompleted: boolean;
    estimatedTime?: string;
    difficulty?: "easy" | "medium" | "hard";
    tips?: string[];
    detailedInstructions?: string;
    prerequisites?: string[];
    expectedOutcome?: string;
    commonMistakes?: string[];
    resources?: {
      title: string;
      url: string;
      type: string;
      description?: string;
    }[];
  };
  onDownload: () => void;
}

export const StepDetails = ({ step, onDownload }: StepDetailsProps) => {
  const [instructionsExpanded, setInstructionsExpanded] = useState(false);
  
  const toggleInstructions = () => {
    setInstructionsExpanded(!instructionsExpanded);
  };
  
  return (
    <div className="px-4 pb-4 pt-1 border-t border-border/50">
      {/* Detailed instructions section */}
      {step.detailedInstructions && (
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="w-full justify-between p-0 h-auto mb-3 hover:bg-transparent"
            onClick={toggleInstructions}
          >
            <span className="flex items-center text-sm font-medium">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              Instructions détaillées
            </span>
            {instructionsExpanded ? (
              <ChevronUp className="h-4 w-4 text-primary" />
            ) : (
              <ChevronDown className="h-4 w-4 text-primary" />
            )}
          </Button>
          
          {instructionsExpanded && (
            <div className="text-sm text-muted-foreground bg-secondary/30 p-4 rounded-md border border-border/50 mb-4">
              <p className="whitespace-pre-line">{step.detailedInstructions}</p>
              
              {step.expectedOutcome && (
                <div className="mt-4">
                  <p className="font-medium text-foreground mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1.5 text-primary" />
                    Résultat attendu:
                  </p>
                  <p className="text-sm pl-6">{step.expectedOutcome}</p>
                </div>
              )}
              
              {step.prerequisites && step.prerequisites.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-foreground mb-2">Prérequis pour cette étape:</p>
                  <ul className="list-disc pl-8 space-y-1">
                    {step.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="text-sm">{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {step.estimatedTime && (
                <div className="mt-4 flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-primary" />
                  <span>Temps estimé: <Badge variant="outline" className="ml-1 font-normal">{step.estimatedTime}</Badge></span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <Separator className="my-4" />
      
      {/* Tips section */}
      {step.tips && step.tips.length > 0 && (
        <StepTips tips={step.tips} />
      )}
      
      {/* Common mistakes section */}
      {step.commonMistakes && step.commonMistakes.length > 0 && (
        <StepCommonMistakes mistakes={step.commonMistakes} />
      )}
      
      {/* Resources section */}
      {step.resources && step.resources.length > 0 && (
        <StepResources resources={step.resources} />
      )}
      
      {/* Actions section */}
      <StepActions isCompleted={step.isCompleted} onDownload={onDownload} />
    </div>
  );
};
