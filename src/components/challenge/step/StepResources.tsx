
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
    thumbnail?: string;
  }[];
}

export const StepResources = ({ resources }: StepResourcesProps) => {
  if (!resources || resources.length === 0) return null;

  // Default Pexels thumbnails for resources
  const defaultThumbnails = {
    video: "https://images.pexels.com/photos/7709086/pexels-photo-7709086.jpeg?auto=compress&cs=tinysrgb&w=300",
    pdf: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=300",
    article: "https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=300",
    tutorial: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=300",
    default: "https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=300",
  };

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

  const getResourceThumbnail = (resource: {type: string, thumbnail?: string}) => {
    if (resource.thumbnail) return resource.thumbnail;
    
    const type = resource.type.toLowerCase();
    return defaultThumbnails[type as keyof typeof defaultThumbnails] || defaultThumbnails.default;
  };

  return (
    <div className="mb-6">
      <p className="text-sm font-medium mb-3 flex items-center">
        <BookOpen className="h-4 w-4 mr-1.5 text-primary" />
        Ressources recommandées:
      </p>
      <div className="grid grid-cols-1 gap-3">
        <TooltipProvider>
          {resources.map((resource, idx) => (
            <div key={idx} className="bg-background/80 rounded-md p-3 border border-border hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="w-16 h-12 rounded overflow-hidden shrink-0">
                  <img 
                    src={getResourceThumbnail(resource)}
                    alt={resource.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center">
                    {getResourceIcon(resource.type)}
                    <span className="text-sm font-medium truncate">{resource.title}</span>
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {resource.type}
                    </span>
                  </div>
                  {resource.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {resource.description}
                    </p>
                  )}
                </div>
                
                {/* Action */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0 shrink-0"
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
