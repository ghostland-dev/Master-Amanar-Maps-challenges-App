
import React from "react";
import { Trophy, Award, Shield, Medal } from "lucide-react";
import { User } from "../models";

interface RecentBadgesCardProps {
  user: User;
}

export const RecentBadgesCard = ({ user }: RecentBadgesCardProps) => {
  const getBadgeIcon = (iconName?: string) => {
    if (iconName === "Trophy") return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (iconName === "Award") return <Award className="h-5 w-5 text-primary" />;
    if (iconName === "Shield") return <Shield className="h-5 w-5 text-blue-500" />;
    return <Medal className="h-5 w-5 text-amber-500" />;
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Badges récents</h3>
      <div className="grid grid-cols-2 gap-2">
        {user.badges.slice(0, 4).map((badge) => (
          <div key={badge.id} className="bg-background/80 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className={`h-10 w-10 rounded-full bg-${badge.color || "primary"}/10 flex items-center justify-center mb-1`}>
              {getBadgeIcon(badge.icon)}
            </div>
            <p className="text-xs font-medium truncate w-full">{badge.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
