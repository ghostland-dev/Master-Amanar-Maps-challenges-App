
import React from "react";
import { BookOpen, Link, FileText, Video, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StepResourcesProps {
  resources?: {
    title: string;
    url: string;
    type: string;
    description?: string;
  }[];
}

export const StepResources = ({ resources }: StepResourcesProps) => {
  if (!resources || resources.length === 0) return null;

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="h-3.5 w-3.5 mr-1.5 text-red-500" />;
      case 'pdf':
        return <FileText className="h-3.5 w-3.5 mr-1.5 text-amber-500" />;
      case 'article':
        return <BookOpen className="h-3.5 w-3.5 mr-1.5 text-green-500" />;
      case 'tutorial':
        return <Play className="h-3.5 w-3.5 mr-1.5 text-primary" />;
      default:
        return <Link className="h-3.5 w-3.5 mr-1.5 text-blue-500" />;
    }
  };

  return (
    <div className="mb-6">
      <p className="text-sm font-medium mb-3 flex items-center">
        <BookOpen className="h-4 w-4 mr-1.5 text-primary" />
        Ressources recommandées:
      </p>
      <div className="grid grid-cols-1 gap-2">
        <TooltipProvider>
          {resources.map((resource, idx) => (
            <div key={idx} className="bg-background/80 rounded-md p-2 border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    {getResourceIcon(resource.type)}
                    <span className="text-sm font-medium">{resource.title}</span>
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {resource.type}
                    </span>
                  </div>
                  {resource.description && (
                    <p className="text-xs text-muted-foreground mt-1 ml-5">
                      {resource.description}
                    </p>
                  )}
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      asChild
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ouvrir la ressource</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};
