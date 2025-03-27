
import React from "react";
import { Star } from "lucide-react";

interface StepTipsProps {
  tips?: string[];
}

export const StepTips = ({ tips }: StepTipsProps) => {
  return (
    <div className="text-sm mb-4">
      <p className="mb-2 font-medium flex items-center">
        <Star className="h-4 w-4 mr-1.5 text-amber-500" />
        Conseils pour réussir cette étape:
      </p>
      <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
        {tips ? (
          tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))
        ) : (
          <>
            <li>Recherchez au moins 3 sources d'information sur le sujet</li>
            <li>Comparez les différentes approches et méthodologies</li>
            <li>Établissez un plan d'action personnalisé</li>
            <li>Fixez des objectifs spécifiques et mesurables</li>
          </>
        )}
      </ul>
    </div>
  );
};
