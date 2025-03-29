
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Shield, Medal } from "lucide-react";
import { User } from "../models";

interface UserBadgesCardProps {
  user: User;
}

export const UserBadgesCard = ({ user }: UserBadgesCardProps) => {
  const renderBadgeIcon = (iconName?: string) => {
    if (iconName === "Trophy") return <Trophy className="h-7 w-7 text-yellow-500" />;
    if (iconName === "Award") return <Award className="h-7 w-7 text-primary" />;
    if (iconName === "Shield") return <Shield className="h-7 w-7 text-blue-500" />;
    return <Medal className="h-7 w-7 text-amber-500" />;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Vos badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {user.badges.map((badge) => (
            <div key={badge.id} className="bg-card rounded-lg p-3 flex flex-col items-center text-center">
              <div className={`h-14 w-14 rounded-full bg-${badge.color || "primary"}/10 flex items-center justify-center mb-2`}>
                {renderBadgeIcon(badge.icon)}
              </div>
              <p className="font-medium text-sm">{badge.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-0">
        <Button variant="outline" size="sm">
          Voir tous mes badges
        </Button>
      </CardFooter>
    </Card>
  );
};
