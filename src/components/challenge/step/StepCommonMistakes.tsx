
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepCommonMistakesProps {
  mistakes?: string[];
}

export const StepCommonMistakes = ({ mistakes }: StepCommonMistakesProps) => {
  // Default mistakes if none are provided
  const defaultMistakes = [
    "Ne pas prendre suffisamment de temps pour comprendre les concepts fondamentaux",
    "Essayer d'aller trop vite sans maîtriser les bases",
    "Négliger l'importance de la pratique régulière",
    "Ne pas demander d'aide quand on est bloqué"
  ];

  const displayMistakes = mistakes || defaultMistakes;

  return (
    <div className="text-sm mb-6">
      <p className="mb-3 font-medium flex items-center">
        <AlertTriangle className="h-4 w-4 mr-1.5 text-orange-500" />
        Erreurs courantes à éviter:
      </p>
      
      <Alert className="bg-orange-50 border-orange-200 mb-4">
        <AlertDescription className="text-orange-800 text-sm">
          <AlertTriangle className="h-4 w-4 inline mr-2 text-orange-600" />
          Attention à ces erreurs fréquentes qui peuvent ralentir votre progression
        </AlertDescription>
      </Alert>
      
      <ul className="list-none space-y-3 text-muted-foreground">
        {displayMistakes.map((mistake, index) => (
          <li key={index} className="flex items-start p-2 rounded-md bg-orange-50/50 border border-orange-100">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-orange-500" />
            <span>{mistake}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-4 p-3 bg-orange-50/30 rounded-md border border-orange-100">
        <p className="text-xs text-muted-foreground">
          <strong>Conseil:</strong> Prenez note de ces pièges courants et créez votre propre liste de vérification 
          à consulter régulièrement pendant votre progression dans cette étape.
        </p>
      </div>
    </div>
  );
};
