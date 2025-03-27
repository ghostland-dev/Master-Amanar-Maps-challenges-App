
import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PrerequisitesTabProps {
  prerequisites?: string[];
  setActiveTab: (tab: string) => void;
}

export const PrerequisitesTab = ({ prerequisites, setActiveTab }: PrerequisitesTabProps) => {
  if (!prerequisites || prerequisites.length === 0) return null;
  
  return (
    <Card className="p-6 border-border/30 hover:border-border/50 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Prérequis du challenge</h2>
      <p className="text-muted-foreground mb-6">
        Avant de commencer ce challenge, assurez-vous de disposer des éléments suivants:
      </p>
      
      <ul className="space-y-3 mb-6">
        {prerequisites.map((prerequisite, index) => (
          <li key={index} className="flex items-start bg-card/50 p-3 rounded-lg hover:bg-card/80 transition-colors duration-300">
            <CheckCircle className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{prerequisite}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-end">
        <Button onClick={() => setActiveTab("steps")} className="group">
          Commencer les étapes
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  );
};
