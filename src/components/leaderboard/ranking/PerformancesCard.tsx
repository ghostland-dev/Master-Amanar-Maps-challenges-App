
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PerformanceBadge } from "./PerformanceBadge";

interface PerformanceBadgeData {
  name: string;
  user: string;
  avatar: string;
  value: string;
  icon: React.ReactNode;
}

interface PerformancesCardProps {
  specialBadges: PerformanceBadgeData[];
}

export const PerformancesCard = ({ specialBadges }: PerformancesCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performances de la semaine</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {specialBadges.map((badge, index) => (
            <PerformanceBadge
              key={index}
              name={badge.name}
              user={badge.user}
              avatar={badge.avatar}
              value={badge.value}
              icon={badge.icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
