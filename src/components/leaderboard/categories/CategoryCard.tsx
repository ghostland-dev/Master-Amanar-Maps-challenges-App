
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";

interface CategoryStats {
  participants: number;
  challengesCompleted: number;
  avgXp: number;
}

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  stats: CategoryStats;
  isSelected: boolean;
  onClick: () => void;
}

export const CategoryCard = ({ 
  id, 
  name, 
  icon: CategoryIcon, 
  stats, 
  isSelected, 
  onClick 
}: CategoryCardProps) => {
  return (
    <Card 
      className={`hover:shadow-md transition-all cursor-pointer ${
        isSelected ? "border-primary bg-primary/5" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CategoryIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {stats.participants} participants
            </p>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-2 gap-3 text-center mt-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Challenges</p>
            <p className="font-medium">{stats.challengesCompleted}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">XP Moyenne</p>
            <p className="font-medium">{stats.avgXp}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
