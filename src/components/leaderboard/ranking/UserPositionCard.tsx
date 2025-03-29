
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { User } from "../models";

interface UserPositionCardProps {
  currentUser: User;
  nextRankUser: User;
}

export const UserPositionCard = ({ currentUser, nextRankUser }: UserPositionCardProps) => {
  return (
    <div className="md:col-span-2">
      <h3 className="text-lg font-medium mb-3">Votre position</h3>
      <div className="bg-background/80 rounded-lg p-4 flex items-center">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-4">
          <Trophy className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{currentUser.name}</span>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Rang {currentUser.rank}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500">{currentUser.xp} XP</Badge>
              <Badge variant="outline" className="flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +120 cette semaine
              </Badge>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground mb-1">
              {currentUser.xp} XP sur {nextRankUser.xp} XP pour atteindre le rang {currentUser.rank - 1}
            </div>
            <Progress value={70} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
