
import React from "react";
import { CheckCircle, LockIcon, UnlockIcon } from "lucide-react";

interface StepIconProps {
  isCompleted: boolean;
  isLocked: boolean;
}

export const StepIcon = ({ isCompleted, isLocked }: StepIconProps) => {
  const getIconClass = () => {
    if (isCompleted) return "bg-primary/10 text-primary";
    if (isLocked) return "bg-muted text-muted-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <div className={`rounded-full p-2 mr-4 ${getIconClass()}`}>
      {isCompleted ? (
        <CheckCircle className="h-5 w-5" />
      ) : isLocked ? (
        <LockIcon className="h-5 w-5" />
      ) : (
        <UnlockIcon className="h-5 w-5" />
      )}
    </div>
  );
};
