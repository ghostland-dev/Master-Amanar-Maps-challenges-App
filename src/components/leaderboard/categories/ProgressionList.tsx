
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "../models";

interface ProgressionListProps {
  title: string;
  users: User[];
  badgeType: "xp" | "challenges";
}

export const ProgressionList = ({ title, users, badgeType }: ProgressionListProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.slice(0, 5).map((user, idx) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 mr-3 flex items-center justify-center text-primary font-medium">
                  {idx + 1}
                </div>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              {badgeType === 'xp' ? (
                <Badge className="bg-green-500">+{50 + Math.floor(Math.random() * 200)} XP</Badge>
              ) : (
                <Badge variant="outline">{3 + Math.floor(Math.random() * 12)} challenges</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
