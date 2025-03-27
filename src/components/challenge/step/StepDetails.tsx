
import React from "react";
import { StepTips } from "./StepTips";
import { StepResources } from "./StepResources";
import { StepActions } from "./StepActions";
import { AlertCircle, FileText, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface StepDetailsProps {
  step: {
    id: number;
    title: string;
    isCompleted: boolean;
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
  return (
    <div className="bg-secondary/50 p-4 border-t border-border">
      {step.detailedInstructions && (
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-1.5 text-primary" />
            Instructions détaillées:
          </h4>
          <div className="text-sm text-muted-foreground p-3 bg-background/80 rounded-md">
            {step.detailedInstructions}
          </div>
        </div>
      )}
      
      {step.prerequisites && step.prerequisites.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2">Prérequis:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {step.prerequisites.map((prereq, idx) => (
              <li key={idx}>{prereq}</li>
            ))}
          </ul>
        </div>
      )}
      
      <StepTips tips={step.tips} />
      
      {step.expectedOutcome && (
        <div className="mb-4">
          <Alert className="bg-primary/5 border-primary/20">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium ml-2">Résultat attendu</AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground ml-6">
              {step.expectedOutcome}
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {step.commonMistakes && step.commonMistakes.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1.5 text-red-500" />
            Erreurs courantes à éviter:
          </h4>
          <ul className="text-sm space-y-2">
            {step.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start p-2 bg-red-50 rounded-md text-red-800 border border-red-200">
                <XCircle className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Separator className="my-4" />
      
      <StepResources resources={step.resources} />
      <StepActions isCompleted={step.isCompleted} onDownload={onDownload} />
    </div>
  );
};
