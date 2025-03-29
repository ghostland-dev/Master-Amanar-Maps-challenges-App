
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Award } from "lucide-react";
import { BadgeData } from "../models";

interface RareBadgesGridProps {
  badges: BadgeData[];
}

export const RareBadgesGrid = ({ badges }: RareBadgesGridProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Badges les plus rares</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filtrer
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.slice(0, 8).map((badge, idx) => (
            <div key={idx} className="bg-card border rounded-lg p-4 text-center">
              <div className="h-12 w-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-sm">{badge.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {badge.value} utilisateurs ({badge.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
