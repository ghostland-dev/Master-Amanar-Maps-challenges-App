
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, CalendarDays, Star } from "lucide-react";

interface ChallengeBadgesProps {
  difficulty: string;
  duration: string;
  xp: number;
  currentStep: number;
  totalSteps: number;
}

export const ChallengeBadges = ({
  difficulty,
  duration,
  xp,
  currentStep,
  totalSteps,
}: ChallengeBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
        <FileText className="mr-1 h-3.5 w-3.5" />
        Niveau: {difficulty || "Non spécifié"}
      </Badge>
      
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
        <CalendarDays className="mr-1 h-3.5 w-3.5" />
        Durée: {duration}
      </Badge>
      
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
        <Star className="mr-1 h-3.5 w-3.5" />
        {xp} XP
      </Badge>
      
      <div className="ml-auto flex items-center">
        <span className="text-sm text-muted-foreground mr-2">Progression:</span>
        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <span className="ml-2 text-sm font-medium">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
    </div>
  );
};
