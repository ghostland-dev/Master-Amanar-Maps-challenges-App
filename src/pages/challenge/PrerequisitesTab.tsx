
import React from "react";
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PrerequisitesTabProps {
  prerequisites?: string[];
  setActiveTab: (tab: string) => void;
}

export const PrerequisitesTab = ({ prerequisites, setActiveTab }: PrerequisitesTabProps) => {
  if (!prerequisites || prerequisites.length === 0) return null;
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Prérequis du challenge</h2>
      <p className="text-muted-foreground mb-6">
        Avant de commencer ce challenge, assurez-vous de disposer des éléments suivants:
      </p>
      
      <ul className="space-y-2 mb-6">
        {prerequisites.map((prerequisite, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
            <span>{prerequisite}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-end">
        <Button onClick={() => setActiveTab("steps")}>
          Commencer les étapes
        </Button>
      </div>
    </Card>
  );
};
