
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  ArrowRight, 
  CheckCircle 
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface LibraryItemProps {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number | null;
  progress: number;
  completed: boolean;
}

export function LibraryItem({ 
  id, 
  title, 
  description, 
  category, 
  duration, 
  progress, 
  completed 
}: LibraryItemProps) {
  return (
    <Card className="glass hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{category}</Badge>
          {duration && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>{duration} minutes</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {completed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ressource terminée</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : progress > 0 ? (
            <div className="text-sm text-muted-foreground">
              Progression: {progress}%
            </div>
          ) : null}
        </div>
        <Button asChild>
          <a href={`/library/${id}`}>
            Voir plus <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
