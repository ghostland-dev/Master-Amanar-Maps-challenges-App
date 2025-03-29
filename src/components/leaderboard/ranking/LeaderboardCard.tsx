
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TopUsersSection } from "../TopUsersSection";
import { UserRankCard } from "../UserRankCard";
import { LeaderboardPagination } from "../LeaderboardPagination";
import { LeaderboardFilters } from "../LeaderboardFilters";
import { BadgeDistribution } from "../BadgeDistribution";
import { LeaderboardTabs } from "../LeaderboardTabs";
import { User, BadgeData } from "../models";

interface LeaderboardCardProps {
  users: User[];
  currentUserId: number;
  badgeDistributionData: BadgeData[];
}

export const LeaderboardCard = ({ users, currentUserId, badgeDistributionData }: LeaderboardCardProps) => {
  const [view, setView] = useState("general");
  const [period, setPeriod] = useState("all-time");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 5;

  // Filter users based on selected category
  const filteredUsers = users.filter(user => {
    if (category === "all") return true;
    return user.badges.some(badge => 
      badge.name.toLowerCase().includes(category.toLowerCase())
    );
  });
  
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE, 
    currentPage * USERS_PER_PAGE
  );

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <CardTitle>
            {view === "general" ? "Classement Global" : "Distribution des Badges"}
          </CardTitle>
          {view === "general" && (
            <LeaderboardFilters 
              period={period}
              category={category}
              onPeriodChange={setPeriod}
              onCategoryChange={setCategory}
            />
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <div className="mb-8">
          <LeaderboardTabs view={view} onViewChange={setView} />
        </div>
        
        {view === "general" ? (
          <>
            {/* Top 3 users with medals */}
            <TopUsersSection users={filteredUsers.slice(0, 3)} />
            
            {/* Full Leaderboard */}
            <div className="space-y-1">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="rank-card">
                  <UserRankCard user={user} highlight={user.id === currentUserId} />
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <LeaderboardPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <BadgeDistribution data={badgeDistributionData} />
        )}
      </CardContent>
    </Card>
  );
};
