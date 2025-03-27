
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
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'débutant':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'intermédiaire':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
      case 'avancé':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-primary/10 text-primary border-primary/30';
    }
  };
  
  const progressColor = (() => {
    const progress = (currentStep / totalSteps) * 100;
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-orange-500';
    if (progress < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  })();
  
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="outline" className={`${getDifficultyColor(difficulty)} transition-colors duration-300 hover:bg-opacity-70`}>
        <FileText className="mr-1 h-3.5 w-3.5" />
        Niveau: {difficulty || "Non spécifié"}
      </Badge>
      
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 transition-colors duration-300 hover:bg-primary/20">
        <CalendarDays className="mr-1 h-3.5 w-3.5" />
        Durée: {duration}
      </Badge>
      
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 transition-colors duration-300 hover:bg-primary/20">
        <Star className="mr-1 h-3.5 w-3.5" />
        {xp} XP
      </Badge>
      
      <div className="ml-auto flex items-center">
        <span className="text-sm text-muted-foreground mr-2">Progression:</span>
        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressColor} rounded-full transition-all duration-1000 ease-out`}
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
