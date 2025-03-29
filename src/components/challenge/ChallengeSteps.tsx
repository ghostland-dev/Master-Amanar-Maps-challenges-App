import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ChallengeStep from "./ChallengeStep";
import { ChallengeStep as StepType } from "@/utils/challenge/types";

interface ChallengeStepsProps {
  steps: StepType[];
  currentStep: number;
  totalSteps: number;
  onProgressUpdate?: (currentStep: number, progress: number) => void;
}

const ChallengeSteps = ({ steps, currentStep, totalSteps, onProgressUpdate }: ChallengeStepsProps) => {
  const [activeStep, setActiveStep] = useState<number>(currentStep);
  const [stepsState, setStepsState] = useState<StepType[]>(steps);
  const { toast } = useToast();
  
  const handleStepClick = (stepId: number) => {
    if (!stepsState.find(step => step.id === stepId)?.isLocked) {
      setActiveStep(stepId);
    }
  };
  
  const handleCompleteStep = (stepId: number) => {
    // Marquer l'étape comme complétée
    const updatedSteps = stepsState.map(step => {
      if (step.id === stepId) {
        return { ...step, isCompleted: true };
      }
      return step;
    });
    
    // Débloquer l'étape suivante si elle existe
    const nextStepIndex = updatedSteps.findIndex(step => step.id === stepId) + 1;
    if (nextStepIndex < updatedSteps.length) {
      updatedSteps[nextStepIndex] = { 
        ...updatedSteps[nextStepIndex],
        isLocked: false 
      };
    }
    
    setStepsState(updatedSteps);
    
    // Calculer la progression
    const completedSteps = updatedSteps.filter(step => step.isCompleted).length;
    const progressPercentage = Math.round((completedSteps / updatedSteps.length) * 100);
    
    // Notification à l'utilisateur
    toast({
      title: "Étape complétée !",
      description: `Félicitations ! Vous avez complété l'étape ${stepId}. Votre progression: ${progressPercentage}%`,
    });
    
    // Si c'était la dernière étape
    if (stepId === totalSteps) {
      toast({
        title: "Challenge terminé !",
        description: "Félicitations ! Vous avez terminé toutes les étapes de ce challenge.",
        variant: "default", // Changed from 'success' to 'default'
      });
    } else {
      // Passer automatiquement à l'étape suivante
      const nextStep = updatedSteps.find(step => step.id === stepId + 1);
      if (nextStep && !nextStep.isLocked) {
        setActiveStep(nextStep.id);
      }
    }
    
    // Notifier le parent du changement de progression
    if (onProgressUpdate) {
      const newCurrentStep = Math.min(stepId + 1, totalSteps);
      onProgressUpdate(newCurrentStep, progressPercentage);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Étapes du challenge</h2>
      
      <div className="space-y-4">
        {stepsState.map(step => (
          <ChallengeStep 
            key={step.id}
            step={step}
            isActive={activeStep === step.id}
            totalSteps={totalSteps}
            onClick={handleStepClick}
            onCompleteStep={handleCompleteStep}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeSteps;
