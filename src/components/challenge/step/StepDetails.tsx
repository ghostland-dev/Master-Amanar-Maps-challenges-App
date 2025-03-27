
import React from "react";
import { StepTips } from "./StepTips";
import { StepResources } from "./StepResources";
import { StepActions } from "./StepActions";

interface StepDetailsProps {
  step: {
    id: number;
    title: string;
    isCompleted: boolean;
    tips?: string[];
    resources?: {
      title: string;
      url: string;
      type: string;
    }[];
  };
  onDownload: () => void;
}

export const StepDetails = ({ step, onDownload }: StepDetailsProps) => {
  return (
    <div className="bg-secondary/50 p-4 border-t border-border">
      <StepTips tips={step.tips} />
      <StepResources resources={step.resources} />
      <StepActions isCompleted={step.isCompleted} onDownload={onDownload} />
    </div>
  );
};
