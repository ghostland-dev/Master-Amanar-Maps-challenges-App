
import React from "react";
import { Download, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import StepTips from "./StepTips";
import StepResources from "./StepResources";
import StepCommonMistakes from "./StepCommonMistakes";
import StepActions from "./StepActions";
import StepChecklist from "./StepChecklist";
import StepAssistance from "./StepAssistance";

interface StepDetailsProps {
  step: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isLocked: boolean;
    estimatedTime?: string;
    difficulty?: "easy" | "medium" | "hard";
    tips?: string[];
    detailedInstructions?: string;
    prerequisites?: string[];
    expectedOutcome?: string;
    commonMistakes?: string[];
    checklist?: {
      id: string;
      text: string;
      isCompleted: boolean;
    }[];
    assistanceQuestions?: {
      id: string;
      question: string;
      answer: string;
    }[];
    resources?: {
      title: string;
      url: string;
      type: string;
      description?: string;
    }[];
  };
  onDownload: () => void;
  onCompleteStep?: () => void;
}

const StepDetails = ({ step, onDownload, onCompleteStep }: StepDetailsProps) => {
  // Créer une fonction par défaut si onCompleteStep n'est pas fourni
  const handleCompleteStep = () => {
    if (onCompleteStep) {
      onCompleteStep();
    }
  };

  return (
    <div className="border-t p-4">
      {step.detailedInstructions && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Instructions détaillées</h3>
          <div className="bg-card p-4 rounded-md text-sm whitespace-pre-wrap">
            {step.detailedInstructions}
          </div>
        </div>
      )}

      {step.expectedOutcome && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Résultat attendu</h3>
          <div className="bg-primary/10 border border-primary/20 p-3 rounded-md text-sm">
            {step.expectedOutcome}
          </div>
        </div>
      )}

      <StepChecklist 
        items={step.checklist || []}
        stepId={step.id}
        onComplete={handleCompleteStep}
        isStepCompleted={step.isCompleted}
      />

      {step.tips && step.tips.length > 0 && (
        <>
          <Separator className="my-4" />
          <StepTips tips={step.tips} />
        </>
      )}

      {step.commonMistakes && step.commonMistakes.length > 0 && (
        <>
          <Separator className="my-4" />
          <StepCommonMistakes mistakes={step.commonMistakes} />
        </>
      )}

      <StepAssistance 
        questions={step.assistanceQuestions || []}
        stepId={step.id}
      />

      {step.resources && step.resources.length > 0 && (
        <>
          <Separator className="my-4" />
          <StepResources resources={step.resources} />
        </>
      )}
      
      <Separator className="my-4" />
      
      <StepActions isCompleted={step.isCompleted} onDownload={onDownload} />
    </div>
  );
};

export default StepDetails;
