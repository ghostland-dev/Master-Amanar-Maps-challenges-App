
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

interface User {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  badges: { name: string; type: "default" | "secondary" | "destructive" | "outline" }[];
  progress: number;
  challenges: number;
  previousRank?: number;
  pointsHistory?: number[];
}

interface UserProgressCardProps {
  currentUser: User;
  nextRankUser: User;
}

export const UserProgressCard = ({ currentUser, nextRankUser }: UserProgressCardProps) => {
  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Votre Progression</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Position Actuelle</span>
              <span className="text-sm font-medium">#{currentUser.rank}</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full" 
                style={{ width: `${currentUser.progress}%` }} 
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                Prochain niveau: #{currentUser.rank - 1}
              </span>
              <span className="text-xs text-muted-foreground">
                +{nextRankUser.points - currentUser.points} pts
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/20">
              <div className="text-xl font-bold text-primary">{currentUser.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Points totaux</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/20">
              <div className="text-xl font-bold text-primary">{currentUser.progress}%</div>
              <div className="text-xs text-muted-foreground">Progression</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/20">
              <div className="text-xl font-bold text-primary">{currentUser.challenges}</div>
              <div className="text-xs text-muted-foreground">Défis complétés</div>
            </div>
          </div>
          
          <Button className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary">
            <ChevronUp className="h-4 w-4" />
            <span>Améliorer mon classement</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
