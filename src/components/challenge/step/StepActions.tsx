
import React from "react";
import { Download, Check, Eye, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StepActionsProps {
  isCompleted: boolean;
  onDownload: () => void;
  onComplete?: () => void;
  onViewJournal?: () => void;
}

export const StepActions = ({ 
  isCompleted, 
  onDownload, 
  onComplete,
  onViewJournal
}: StepActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <TooltipProvider>
        {isCompleted ? (
          <Button 
            variant="outline" 
            className="sm:flex-1 group hover:bg-secondary"
            onClick={() => onComplete && onComplete()}
          >
            <Eye className="mr-2 h-4 w-4 group-hover:text-primary transition-colors duration-300" />
            Revoir l'étape
          </Button>
        ) : (
          <Button 
            className="sm:flex-1 group bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary"
            onClick={() => onComplete && onComplete()}
          >
            <Check className="mr-2 h-4 w-4" />
            Marquer comme terminé
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        )}
        
        <Button 
          variant="outline" 
          className="sm:flex-1 group hover:bg-secondary"
          onClick={() => onViewJournal && onViewJournal()}
        >
          <BookOpen className="mr-2 h-4 w-4 group-hover:text-primary transition-colors duration-300" />
          Ouvrir le journal de bord
        </Button>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="sm:flex-none hover:bg-secondary" 
              onClick={onDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Télécharger le guide en PDF</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
