
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PerformanceBadgeProps {
  name: string;
  user: string;
  avatar: string;
  value: string;
  icon: React.ReactNode;
}

export const PerformanceBadge = ({ name, user, avatar, value, icon }: PerformanceBadgeProps) => {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-background mr-3 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{name}</p>
          <div className="flex items-center">
            <Avatar className="h-4 w-4 mr-1">
              <AvatarImage src={avatar} alt={user} />
              <AvatarFallback>{user.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{user}</p>
          </div>
        </div>
      </div>
      <Badge variant="outline">{value}</Badge>
    </div>
  );
};
