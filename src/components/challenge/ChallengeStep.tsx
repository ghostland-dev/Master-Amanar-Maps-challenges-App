
import React from "react";
import { CheckCircle, LockIcon, UnlockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepProps {
  step: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isLocked: boolean;
  };
  isActive: boolean;
  totalSteps: number;
  onClick: (stepId: number) => void;
}

const ChallengeStep = ({ step, isActive, totalSteps, onClick }: StepProps) => {
  return (
    <div 
      className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
        step.isLocked ? 'opacity-60' : isActive ? 'ring-2 ring-primary' : 'hover:bg-secondary/10'
      }`}
      onClick={() => onClick(step.id)}
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
            <p className="text-muted-foreground mt-1">{step.description}</p>
          </div>
        </div>
      </div>
      
      {isActive && !step.isLocked && (
        <StepDetails step={step} totalSteps={totalSteps} />
      )}
    </div>
  );
};

interface StepDetailsProps {
  step: {
    id: number;
    title: string;
    isCompleted: boolean;
  };
  totalSteps: number;
}

const StepDetails = ({ step }: StepDetailsProps) => {
  return (
    <div className="bg-secondary/50 p-4 border-t border-border">
      <div className="text-sm mb-4">
        <p className="mb-2">Instructions détaillées :</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Recherchez au moins 3 sources d'information sur le sujet</li>
          <li>Comparez les différentes approches et méthodologies</li>
          <li>Établissez un plan d'action personnalisé</li>
          <li>Fixez des objectifs spécifiques et mesurables</li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        {step.isCompleted ? (
          <Button variant="outline" className="sm:flex-1">Revoir l'étape</Button>
        ) : (
          <Button className="sm:flex-1">Marquer comme terminé</Button>
        )}
        <Button variant="outline" className="sm:flex-1">Ouvrir le journal de bord</Button>
      </div>
    </div>
  );
};

export default ChallengeStep;
