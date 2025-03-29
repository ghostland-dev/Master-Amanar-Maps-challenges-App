
import React from "react";
import { Lock, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LibraryItemProps {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number | null;
  progress: number;
  completed: boolean;
  premium: boolean;
  hasPremiumAccess: boolean;
  onPremiumClick: () => void;
}

export function LibraryItem({
  id,
  title,
  description,
  category,
  duration,
  progress,
  completed,
  premium,
  hasPremiumAccess,
  onPremiumClick
}: LibraryItemProps) {
  const isLocked = premium && !hasPremiumAccess;

  return (
    <Card className={`overflow-hidden h-full transition-all hover:shadow-md ${
      isLocked ? 'opacity-90' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          {premium && (
            <Badge 
              variant={hasPremiumAccess ? "default" : "secondary"} 
              className={`${!hasPremiumAccess 
                ? 'bg-muted-foreground/40 text-background' 
                : 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'}`
              }
            >
              {hasPremiumAccess ? (
                <><Star className="h-3 w-3 mr-1 fill-current" /> Premium</>
              ) : (
                <><Lock className="h-3 w-3 mr-1" /> Premium</>
              )}
            </Badge>
          )}
        </div>
        <Badge variant="outline" className="bg-secondary/20 text-xs mt-1">
          {category}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3 text-muted-foreground">{description}</p>
        <div className="mt-4">
          {duration && (
            <div className="flex items-center text-xs text-muted-foreground">
              <span>Durée estimée: {duration} min</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className={`border-t ${isLocked ? 'bg-muted/40' : 'bg-muted/30'} p-3 flex flex-col gap-2`}>
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1">
            <span>Progression</span>
            <span>{completed ? "Terminé" : `${progress}%`}</span>
          </div>
          <Progress 
            value={progress} 
            className={`h-1.5 ${isLocked ? 'bg-muted' : ''}`}
          />
        </div>
        <button 
          onClick={() => isLocked ? onPremiumClick() : null}
          className={`w-full py-1.5 text-sm rounded-md text-center transition-all duration-200 ${
            isLocked 
              ? 'bg-muted-foreground/40 text-background hover:bg-muted-foreground/50 cursor-pointer' 
              : 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary hover:to-primary'
          }`}
        >
          {isLocked ? "Débloquer" : completed ? "Revoir" : "Continuer"}
        </button>
      </CardFooter>
    </Card>
  );
}
