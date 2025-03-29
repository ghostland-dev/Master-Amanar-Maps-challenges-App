
import React from "react";
import { UserOverviewCard } from "./UserOverviewCard";
import { LeaderboardCard } from "./LeaderboardCard";
import { UserProgressCard } from "../UserProgressCard";
import { UserAchievementsCard } from "../UserAchievementsCard";
import { PerformancesCard } from "./PerformancesCard";
import { User, BadgeData } from "../models";

interface SpecialBadge {
  name: string;
  user: string;
  avatar: string;
  value: string;
  icon: React.ReactNode;
}

interface RankingTabProps {
  users: User[];
  currentUser: User;
  badgeDistributionData: BadgeData[];
  specialBadges: SpecialBadge[];
}

export const RankingTab = ({ 
  users, 
  currentUser, 
  badgeDistributionData,
  specialBadges 
}: RankingTabProps) => {
  const nextRankUser = users.find(u => u.rank === currentUser.rank - 1) || users[0];

  return (
    <>
      <UserOverviewCard currentUser={currentUser} nextRankUser={nextRankUser} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeaderboardCard 
            users={users}
            currentUserId={currentUser.id}
            badgeDistributionData={badgeDistributionData}
          />
        </div>
        
        <div className="space-y-6">
          <UserProgressCard 
            currentUser={currentUser} 
            nextRankUser={nextRankUser}
          />
          
          <UserAchievementsCard currentUser={currentUser} />
          
          <PerformancesCard specialBadges={specialBadges} />
        </div>
      </div>
    </>
  );
};
