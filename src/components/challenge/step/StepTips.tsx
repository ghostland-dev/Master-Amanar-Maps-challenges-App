
import React from "react";
import { Star, Info, CheckSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepTipsProps {
  tips?: string[];
}

export const StepTips = ({ tips }: StepTipsProps) => {
  // Default tips if none are provided
  const defaultTips = [
    "Recherchez au moins 3 sources d'information sur le sujet pour avoir une vue d'ensemble complète",
    "Comparez les différentes approches et méthodologies pour choisir celle qui vous convient le mieux",
    "Établissez un plan d'action personnalisé avec des étapes concrètes et réalisables",
    "Fixez des objectifs spécifiques et mesurables pour suivre votre progression"
  ];

  const displayTips = tips || defaultTips;

  return (
    <div className="text-sm mb-6">
      <p className="mb-3 font-medium flex items-center">
        <Star className="h-4 w-4 mr-1.5 text-amber-500" />
        Conseils pour réussir cette étape:
      </p>
      
      <Alert className="bg-amber-50 border-amber-200 mb-4">
        <AlertDescription className="text-amber-800 text-sm">
          <Info className="h-4 w-4 inline mr-2 text-amber-600" />
          Suivez ces conseils étape par étape pour réussir facilement cette partie du challenge
        </AlertDescription>
      </Alert>
      
      <ul className="list-none space-y-3 text-muted-foreground">
        {displayTips.map((tip, index) => (
          <li key={index} className="flex items-start p-2 rounded-md bg-secondary/30 border border-border">
            <CheckSquare className="h-4 w-4 mr-2 mt-0.5 text-primary" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/10">
        <p className="text-xs text-muted-foreground">
          <strong>Astuce:</strong> Prenez des notes tout au long de cette étape pour faciliter votre progression. 
          N'hésitez pas à consulter les ressources recommandées pour approfondir votre compréhension.
        </p>
      </div>
    </div>
  );
};
