
import React from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, Award, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface UserRankCardProps {
  user: User;
  highlight?: boolean;
}

export const UserRankCard = ({ user, highlight = false }: UserRankCardProps) => {
  const rankChange = user.previousRank ? user.previousRank - user.rank : 0;
  
  return (
    <div className={`p-4 rounded-lg transition-all ${highlight 
      ? "bg-primary/10 border border-primary/20 shadow-md" 
      : "hover:bg-accent border border-transparent hover:border-border/50"}`}
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-8 mr-3 font-medium flex items-center justify-center 
          ${user.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}
        >
          {user.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
          {user.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
          {user.rank === 3 && <Award className="h-5 w-5 text-amber-700" />}
          {user.rank > 3 && <span>#{user.rank}</span>}
        </div>
        <UserAvatar 
          user={{ name: user.name, avatar: user.avatar }}
          border
          className="transition-transform hover:scale-110"
          borderColor={
            user.rank === 1 ? "border-yellow-500" :
            user.rank === 2 ? "border-gray-400" :
            user.rank === 3 ? "border-amber-700" :
            highlight ? "border-primary" : "border-muted"
          }
        />
        <div className="ml-4 flex-1">
          <div className="font-medium flex items-center gap-2">
            {user.name}
            {rankChange > 0 && (
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                {rankChange}
              </span>
            )}
            {rankChange < 0 && (
              <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-full flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5 rotate-180" />
                {Math.abs(rankChange)}
              </span>
            )}
          </div>
          <div className="flex mt-1 space-x-1 flex-wrap">
            {user.badges.map((badge, idx) => (
              <Badge key={idx} variant={badge.type} className="mt-1">
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center ml-2">
          <div className="font-semibold text-lg">{user.points.toLocaleString()}</div>
          <div className="text-xs ml-1 text-muted-foreground">pts</div>
        </div>
      </div>
      
      {/* Point history visualization (mini sparkline) */}
      {user.pointsHistory && (
        <div className="mt-3 flex items-end h-6 gap-0.5 pl-16">
          {user.pointsHistory.map((point, idx) => {
            const normalizedHeight = 
              ((point - Math.min(...user.pointsHistory!)) / 
              (Math.max(...user.pointsHistory!) - Math.min(...user.pointsHistory!))) * 24;
            
            return (
              <div 
                key={idx}
                className={`w-1 ${
                  highlight ? "bg-primary/60" : 
                  user.rank <= 3 ? "bg-primary/40" : "bg-muted-foreground/20"
                } rounded-t`}
                style={{ height: `${Math.max(4, normalizedHeight)}px` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
