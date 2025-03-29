
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserPositionCard } from "./UserPositionCard";
import { RecentBadgesCard } from "./RecentBadgesCard";
import { User } from "../models";

interface UserOverviewCardProps {
  currentUser: User;
  nextRankUser: User;
}

export const UserOverviewCard = ({ currentUser, nextRankUser }: UserOverviewCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UserPositionCard currentUser={currentUser} nextRankUser={nextRankUser} />
          <RecentBadgesCard user={currentUser} />
        </div>
      </CardContent>
    </Card>
  );
};
