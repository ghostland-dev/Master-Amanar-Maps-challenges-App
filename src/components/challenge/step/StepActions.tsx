
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepActionsProps {
  isCompleted: boolean;
  onDownload: () => void;
}

export const StepActions = ({ isCompleted, onDownload }: StepActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      {isCompleted ? (
        <Button variant="outline" className="sm:flex-1">Revoir l'étape</Button>
      ) : (
        <Button className="sm:flex-1">Marquer comme terminé</Button>
      )}
      <Button variant="outline" className="sm:flex-1">Ouvrir le journal de bord</Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="sm:flex-none" 
        onClick={onDownload}
        title="Télécharger le guide en PDF"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};
