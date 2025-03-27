
import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepResourcesProps {
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
}

export const StepResources = ({ resources }: StepResourcesProps) => {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2 flex items-center">
        <BookOpen className="h-4 w-4 mr-1.5 text-primary" />
        Ressources recommandées:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {resources.map((resource, idx) => (
          <Button 
            key={idx} 
            variant="outline" 
            size="sm" 
            className="justify-start text-xs h-auto py-1.5"
            asChild
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-3.5 w-3.5 mr-1.5" />
              {resource.title}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};
