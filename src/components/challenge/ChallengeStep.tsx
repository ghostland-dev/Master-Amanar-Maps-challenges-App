
import React from "react";
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { generatePdfFromData } from "@/utils/pdf";
import { StepIcon } from "./step/StepIcon";
import { StepBadge } from "./step/StepBadge";
import { StepDetails } from "./step/StepDetails";

interface StepProps {
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
  isActive: boolean;
  totalSteps: number;
  onClick: (stepId: number) => void;
  onCompleteStep: (stepId: number) => void;
}

const ChallengeStep = ({ step, isActive, totalSteps, onClick, onCompleteStep }: StepProps) => {
  const { toast } = useToast();

  const downloadStepGuide = () => {
    const data = {
      "Étape": {
        "Titre": step.title,
        "Description": step.description,
        "Difficulté": getDifficultyLabel(step.difficulty) || "Non spécifiée",
        "Temps estimé": step.estimatedTime || "Non spécifié"
      },
      "Instructions": {
        "Instructions détaillées": step.detailedInstructions || "Non spécifiées",
        "Résultat attendu": step.expectedOutcome || "Non spécifié",
        "Points clés": step.tips || [
          "Recherchez au moins 3 sources d'information sur le sujet",
          "Comparez les différentes approches et méthodologies",
          "Établissez un plan d'action personnalisé",
          "Fixez des objectifs spécifiques et mesurables"
        ]
      },
      "À éviter": {
        "Erreurs courantes": step.commonMistakes || ["Aucune erreur courante spécifiée"]
      },
      "Ressources recommandées": step.resources?.map(r => `${r.title}${r.description ? ` - ${r.description}` : ''}`) || ["Aucune ressource spécifiée"]
    };

    try {
      generatePdfFromData(data, {
        title: `Guide de l'étape ${step.id}: ${step.title}`,
        filename: `etape-${step.id}-guide.pdf`,
        subject: "Guide d'étape de challenge FinQuest"
      });
      
      toast({
        title: "Guide téléchargé",
        description: "Le guide complet de cette étape a été téléchargé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };

  const handleCompleteStep = () => {
    onCompleteStep(step.id);
  };

  // Helper function needed for PDF generation
  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "Facile";
      case "medium":
        return "Intermédiaire";
      case "hard":
        return "Avancé";
      default:
        return "";
    }
  };

  return (
    <div 
      className={`overflow-hidden rounded-xl transition-all duration-300 ${
        step.isLocked ? 'opacity-70' : isActive ? 'shadow-md' : 'hover:shadow-sm'
      }`}
      style={{ transform: isActive ? 'scale(1.01)' : 'scale(1)' }}
    >
      <Card
        className={`border overflow-hidden ${
          step.isLocked ? 'bg-muted/30' : 
          isActive ? 'border-primary/50 bg-primary/5' : 
          'hover:bg-secondary/10'
        }`}
        onClick={() => !step.isLocked && onClick(step.id)}
      >
        <div className="p-4 cursor-pointer">
          <div className="flex items-start">
            <StepIcon isCompleted={step.isCompleted} isLocked={step.isLocked} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{step.title}</h3>
                <span className="text-sm text-muted-foreground">Étape {step.id}/{totalSteps}</span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <StepBadge 
                  difficulty={step.difficulty} 
                  estimatedTime={step.estimatedTime}
                  isCompleted={step.isCompleted}
                />
              </div>
            </div>
          </div>
        </div>
        
        {isActive && !step.isLocked && (
          <StepDetails 
            step={step}
            onDownload={downloadStepGuide}
            onCompleteStep={handleCompleteStep}
          />
        )}
      </Card>
    </div>
  );
};

export default ChallengeStep;
