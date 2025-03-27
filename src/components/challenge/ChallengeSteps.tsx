
import { useState } from "react";
import ChallengeStep from "./ChallengeStep";
import { ChallengeStep as StepType } from "@/utils/challenge/types";

interface ChallengeStepsProps {
  steps: StepType[];
  currentStep: number;
  totalSteps: number;
}

const ChallengeSteps = ({ steps, currentStep, totalSteps }: ChallengeStepsProps) => {
  const [activeStep, setActiveStep] = useState<number>(currentStep);
  
  const handleStepClick = (stepId: number) => {
    if (!steps.find(step => step.id === stepId)?.isLocked) {
      setActiveStep(stepId);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Étapes du challenge</h2>
      
      <div className="space-y-4">
        {steps.map(step => (
          <ChallengeStep 
            key={step.id}
            step={step}
            isActive={activeStep === step.id}
            totalSteps={totalSteps}
            onClick={handleStepClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeSteps;
