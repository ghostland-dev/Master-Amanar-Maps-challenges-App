
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info, Filter } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { UserRankCard } from "../UserRankCard";
import { User } from "../models";

interface CategoryLeaderboardProps {
  categoryName: string;
  users: User[];
  currentUserId: number;
}

export const CategoryLeaderboard = ({ categoryName, users, currentUserId }: CategoryLeaderboardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>
            Top 10 - {categoryName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="week">
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
                <SelectItem value="all">Tout le temps</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Classement basé sur les XP gagnés</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {users.slice(0, 10).map((user) => (
            <div key={user.id} className="rank-card">
              <UserRankCard user={user} highlight={user.id === currentUserId} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
