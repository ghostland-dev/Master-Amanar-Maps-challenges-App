
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrophyIcon, Award } from "lucide-react";

interface LeaderboardTabsProps {
  view: string;
  onViewChange: (value: string) => void;
}

export const LeaderboardTabs = ({ view, onViewChange }: LeaderboardTabsProps) => {
  return (
    <Tabs defaultValue="general" value={view} onValueChange={onViewChange}>
      <TabsList className="w-full grid grid-cols-2 mb-6">
        <TabsTrigger 
          value="general" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <TrophyIcon className="h-4 w-4 mr-2" />
          Classement Général
        </TabsTrigger>
        <TabsTrigger 
          value="badges" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Award className="h-4 w-4 mr-2" />
          Distribution des Badges
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
