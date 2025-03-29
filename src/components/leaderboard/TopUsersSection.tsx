
import React from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, Award, ArrowUp } from "lucide-react";

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

interface TopUsersSectionProps {
  users: User[];
}

export const TopUsersSection = ({ users }: TopUsersSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-16 pt-10 md:pt-8 relative">
      {users.slice(1, 2).map((user) => (
        <div key={user.id} className="top-user-card bg-muted/50 hover:bg-muted/80 rounded-xl p-4 flex flex-col items-center order-2 border border-border/30 shadow-sm transition-all hover:shadow-md h-full">
          <div className="relative">
            <UserAvatar
              user={{ name: user.name, avatar: user.avatar }}
              size="lg"
              border
              className="ring-2 ring-offset-2 ring-gray-400/50 transition-transform hover:scale-105"
              borderColor="border-gray-400"
            />
            <div className="absolute -top-2 -right-2 bg-gray-400 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
              <Medal className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">#{user.rank}</div>
            <div className="mt-1 flex items-center justify-center">
              <span className="font-bold">{user.points.toLocaleString()}</span>
              <span className="text-xs ml-1 text-muted-foreground">pts</span>
            </div>
            {user.previousRank < user.rank && (
              <div className="mt-1 text-xs flex items-center justify-center text-red-500">
                <ArrowUp className="h-3 w-3 mr-0.5 rotate-180" />
                <span>{Math.abs(user.previousRank - user.rank)}</span>
              </div>
            )}
            {user.previousRank > user.rank && (
              <div className="mt-1 text-xs flex items-center justify-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>{user.previousRank - user.rank}</span>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {users.slice(0, 1).map((user) => (
        <div key={user.id} className="top-user-card bg-gradient-to-b from-yellow-50 to-yellow-100/50 dark:from-yellow-900/10 dark:to-yellow-900/5 rounded-xl p-5 flex flex-col items-center relative order-1 border border-yellow-200 dark:border-yellow-700/30 shadow-md hover:shadow-lg transition-all h-full z-10 md:transform md:scale-110">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Crown className="h-10 w-10 text-yellow-500 drop-shadow-md" />
          </div>
          <div className="relative pt-4">
            <UserAvatar
              user={{ name: user.name, avatar: user.avatar }}
              size="xl"
              border
              className="ring-4 ring-offset-2 ring-yellow-500/50 transition-transform hover:scale-105"
              borderColor="border-yellow-500"
            />
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
              1
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="font-semibold text-lg">{user.name}</div>
            <div className="text-sm text-muted-foreground">#{user.rank}</div>
            <div className="mt-2 flex items-center justify-center">
              <span className="font-bold text-xl">{user.points.toLocaleString()}</span>
              <span className="text-xs ml-1 text-muted-foreground">pts</span>
            </div>
            <div className="mt-1 space-x-1 flex flex-wrap justify-center gap-1">
              {user.badges.map((badge, idx) => (
                <Badge key={idx} variant={badge.type} className="mt-1">
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {users.slice(2, 3).map((user) => (
        <div key={user.id} className="top-user-card bg-muted/50 hover:bg-muted/80 rounded-xl p-4 flex flex-col items-center order-3 border border-border/30 shadow-sm transition-all hover:shadow-md h-full">
          <div className="relative">
            <UserAvatar
              user={{ name: user.name, avatar: user.avatar }}
              size="lg"
              border
              className="ring-2 ring-offset-2 ring-amber-700/50 transition-transform hover:scale-105"
              borderColor="border-amber-700"
            />
            <div className="absolute -top-2 -right-2 bg-amber-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">#{user.rank}</div>
            <div className="mt-1 flex items-center justify-center">
              <span className="font-bold">{user.points.toLocaleString()}</span>
              <span className="text-xs ml-1 text-muted-foreground">pts</span>
            </div>
            {user.previousRank < user.rank && (
              <div className="mt-1 text-xs flex items-center justify-center text-red-500">
                <ArrowUp className="h-3 w-3 mr-0.5 rotate-180" />
                <span>{Math.abs(user.previousRank - user.rank)}</span>
              </div>
            )}
            {user.previousRank > user.rank && (
              <div className="mt-1 text-xs flex items-center justify-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>{user.previousRank - user.rank}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
