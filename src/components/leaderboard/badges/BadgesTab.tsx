
import React from "react";
import { BadgeDistribution } from "../BadgeDistribution";
import { UserBadgesCard } from "./UserBadgesCard";
import { RareBadgesGrid } from "./RareBadgesGrid";
import { User, BadgeData } from "../models";

interface BadgesTabProps {
  currentUser: User;
  badgeDistributionData: BadgeData[];
}

export const BadgesTab = ({ currentUser, badgeDistributionData }: BadgesTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <BadgeDistribution data={badgeDistributionData} />
        </div>
        <div>
          <UserBadgesCard user={currentUser} />
        </div>
      </div>
      
      <RareBadgesGrid badges={badgeDistributionData} />
    </>
  );
};
