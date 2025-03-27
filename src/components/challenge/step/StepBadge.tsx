
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Timer, CheckCircle } from "lucide-react";

interface StepBadgeProps {
  difficulty?: "easy" | "medium" | "hard";
  estimatedTime?: string;
  isCompleted: boolean;
}

export const StepBadge = ({ difficulty, estimatedTime, isCompleted }: StepBadgeProps) => {
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

  return (
    <>
      {difficulty && (
        <Badge variant="outline" className={`text-xs px-2 py-0 ${getDifficultyColor(difficulty)}`}>
          {getDifficultyLabel(difficulty)}
        </Badge>
      )}
      
      {estimatedTime && (
        <Badge variant="outline" className="text-xs px-2 py-0 bg-primary/5 text-primary">
          <Timer className="h-3 w-3 mr-1" />
          {estimatedTime}
        </Badge>
      )}
      
      {isCompleted && (
        <Badge variant="outline" className="text-xs px-2 py-0 bg-green-500/10 text-green-600 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Terminé
        </Badge>
      )}
    </>
  );
};
