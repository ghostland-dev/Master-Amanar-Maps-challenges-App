
import React from "react";
import { Star, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
  description: string;
  objective?: string;
  learningOutcomes?: string[];
  setActiveTab: (tab: string) => void;
}

export const OverviewTab = ({ 
  description, 
  objective, 
  learningOutcomes,
  setActiveTab 
}: OverviewTabProps) => {
  return (
    <Card className="p-6 border-border/30 hover:border-border/50 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">À propos de ce challenge</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      {objective && (
        <div className="mb-6 bg-card/50 p-4 rounded-lg hover:bg-card/80 transition-colors duration-300">
          <h3 className="font-semibold mb-2 flex items-center">
            <Star className="mr-2 h-4 w-4 text-primary" />
            Objectif principal
          </h3>
          <p className="text-sm pl-6">{objective}</p>
        </div>
      )}
      
      {learningOutcomes && learningOutcomes.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center">
            <BookOpen className="mr-2 h-4 w-4 text-primary" />
            Ce que vous allez apprendre
          </h3>
          <ul className="space-y-2 pl-0">
            {learningOutcomes.map((outcome, index) => (
              <li key={index} className="text-sm flex items-start bg-card/50 p-3 rounded-lg hover:bg-card/80 transition-colors duration-300">
                <CheckCircle className="h-4 w-4 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button onClick={() => setActiveTab("steps")} className="group">
          Commencer les étapes
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  );
};
