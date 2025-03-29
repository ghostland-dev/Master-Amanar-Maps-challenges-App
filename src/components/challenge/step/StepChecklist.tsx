
import React, { useState } from "react";
import { Check, ListTodo, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface StepChecklistProps {
  items: ChecklistItem[];
  stepId: number;
  onComplete: () => void;
  isStepCompleted: boolean;
}

const StepChecklist = ({ items, stepId, onComplete, isStepCompleted }: StepChecklistProps) => {
  const { toast } = useToast();
  const [checklist, setChecklist] = useState<ChecklistItem[]>(items);
  
  const toggleItem = (id: string) => {
    const updatedChecklist = checklist.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setChecklist(updatedChecklist);
  };
  
  const completedCount = checklist.filter(item => item.isCompleted).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;
  const allCompleted = completedCount === items.length && items.length > 0;
  
  const handleCompleteStep = () => {
    if (allCompleted) {
      onComplete();
      toast({
        title: "Étape complétée",
        description: `Vous avez terminé l'étape ${stepId}. Vous pouvez maintenant passer à la suivante.`,
      });
    } else {
      toast({
        title: "Liste incomplète",
        description: "Veuillez compléter toutes les tâches avant de marquer l'étape comme terminée.",
        variant: "destructive",
      });
    }
  };
  
  if (items.length === 0) return null;
  
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium flex items-center">
          <ListTodo className="mr-2 h-4 w-4 text-primary" />
          Liste des tâches
        </h4>
        <Badge variant={allCompleted ? "success" : "outline"} className="text-xs">
          {completedCount}/{items.length} tâches
        </Badge>
      </div>
      
      <div className="space-y-2">
        {checklist.map((item) => (
          <div 
            key={item.id}
            className={`flex items-center p-2 rounded-md hover:bg-secondary/30 cursor-pointer
              ${item.isCompleted ? 'bg-primary/10' : 'bg-card/60'}`}
            onClick={() => toggleItem(item.id)}
          >
            <div className={`h-5 w-5 rounded-md border flex items-center justify-center mr-3
              ${item.isCompleted ? 'bg-primary border-primary' : 'border-muted-foreground/30'}`}>
              {item.isCompleted && <Check className="h-4 w-4 text-white" />}
            </div>
            <span className={`text-sm ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span>Progression</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
      
      <div className="pt-2">
        {isStepCompleted ? (
          <Badge variant="success" className="text-xs">
            <Check className="mr-1 h-3 w-3" /> Étape complétée
          </Badge>
        ) : (
          <Button 
            className="w-full group" 
            onClick={handleCompleteStep}
            disabled={!allCompleted}
          >
            Marquer comme terminé
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepChecklist;
