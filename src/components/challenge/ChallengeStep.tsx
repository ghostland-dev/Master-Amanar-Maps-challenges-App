import React from "react";
import { CheckCircle, LockIcon, UnlockIcon, Download, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { animate } from "motion";
import { useToast } from "@/components/ui/use-toast";
import { generatePdfFromData } from "@/utils/pdf";

interface StepProps {
  step: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isLocked: boolean;
    estimatedTime?: string;
    difficulty?: "easy" | "medium" | "hard";
    resources?: {
      title: string;
      url: string;
      type: string;
    }[];
  };
  isActive: boolean;
  totalSteps: number;
  onClick: (stepId: number) => void;
}

const ChallengeStep = ({ step, isActive, totalSteps, onClick }: StepProps) => {
  const { toast } = useToast();

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-600 border-green-300";
      case "medium":
        return "bg-amber-500/10 text-amber-600 border-amber-300";
      case "hard":
        return "bg-red-500/10 text-red-600 border-red-300";
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

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

  const downloadStepGuide = () => {
    const data = {
      "Étape": {
        "Titre": step.title,
        "Description": step.description,
        "Difficulté": getDifficultyLabel(step.difficulty) || "Non spécifiée",
        "Temps estimé": step.estimatedTime || "Non spécifié"
      },
      "Instructions": {
        "Points clés": [
          "Recherchez au moins 3 sources d'information sur le sujet",
          "Comparez les différentes approches et méthodologies",
          "Établissez un plan d'action personnalisé",
          "Fixez des objectifs spécifiques et mesurables"
        ]
      },
      "Ressources recommandées": step.resources?.map(r => r.title) || ["Aucune ressource spécifiée"]
    };

    try {
      generatePdfFromData(data, {
        title: `Guide de l'étape ${step.id}: ${step.title}`,
        filename: `etape-${step.id}-guide.pdf`,
        subject: "Guide d'étape de challenge FinQuest"
      });
      
      toast({
        title: "Guide téléchargé",
        description: "Le guide de cette étape a été téléchargé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
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
            <div className={`rounded-full p-2 mr-4 ${
              step.isCompleted 
                ? 'bg-primary/10 text-primary' 
                : step.isLocked 
                  ? 'bg-muted text-muted-foreground' 
                  : 'bg-secondary text-secondary-foreground'
            }`}>
              {step.isCompleted ? (
                <CheckCircle className="h-5 w-5" />
              ) : step.isLocked ? (
                <LockIcon className="h-5 w-5" />
              ) : (
                <UnlockIcon className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{step.title}</h3>
                <span className="text-sm text-muted-foreground">Étape {step.id}/{totalSteps}</span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {step.difficulty && (
                  <Badge variant="outline" className={`text-xs px-2 py-0 ${getDifficultyColor(step.difficulty)}`}>
                    {getDifficultyLabel(step.difficulty)}
                  </Badge>
                )}
                
                {step.estimatedTime && (
                  <Badge variant="outline" className="text-xs px-2 py-0 bg-primary/5 text-primary">
                    <Calendar className="h-3 w-3 mr-1" />
                    {step.estimatedTime}
                  </Badge>
                )}
                
                {step.isCompleted && (
                  <Badge variant="outline" className="text-xs px-2 py-0 bg-green-500/10 text-green-600 border-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Terminé
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {isActive && !step.isLocked && (
          <StepDetails 
            step={step} 
            totalSteps={totalSteps} 
            onDownload={downloadStepGuide}
          />
        )}
      </Card>
    </div>
  );
};

interface StepDetailsProps {
  step: {
    id: number;
    title: string;
    isCompleted: boolean;
    resources?: {
      title: string;
      url: string;
      type: string;
    }[];
  };
  totalSteps: number;
  onDownload: () => void;
}

const StepDetails = ({ step, onDownload }: StepDetailsProps) => {
  return (
    <div className="bg-secondary/50 p-4 border-t border-border">
      <div className="text-sm mb-4">
        <p className="mb-2 font-medium">Instructions détaillées :</p>
        <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
          <li>Recherchez au moins 3 sources d'information sur le sujet</li>
          <li>Comparez les différentes approches et méthodologies</li>
          <li>Établissez un plan d'action personnalisé</li>
          <li>Fixez des objectifs spécifiques et mesurables</li>
        </ul>
      </div>
      
      {step.resources && step.resources.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Ressources recommandées :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {step.resources.map((resource, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                className="justify-start text-xs h-auto py-1.5"
                asChild
              >
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  {resource.title}
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        {step.isCompleted ? (
          <Button variant="outline" className="sm:flex-1">Revoir l'étape</Button>
        ) : (
          <Button className="sm:flex-1">Marquer comme terminé</Button>
        )}
        <Button variant="outline" className="sm:flex-1">Ouvrir le journal de bord</Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="sm:flex-none" 
          onClick={onDownload}
          title="Télécharger le guide en PDF"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChallengeStep;
