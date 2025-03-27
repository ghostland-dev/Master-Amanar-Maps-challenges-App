
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, TrophyIcon, Medal } from "lucide-react";
import { Achievement } from "./Achievement";

interface User {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  badges: { name: string; type: "default" | "secondary" | "destructive" | "outline" }[];
  progress: number;
  challenges: number;
  previousRank?: number;
  pointsHistory?: number[];
}

interface UserAchievementsCardProps {
  currentUser: User;
}

export const UserAchievementsCard = ({ currentUser }: UserAchievementsCardProps) => {
  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Vos Accomplissements</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="recent" className="flex-1">Récents</TabsTrigger>
            <TabsTrigger value="badges" className="flex-1">Badges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4">
            <Achievement 
              title="Premier Investissement"
              desc="Vous avez réalisé votre premier investissement simulé"
              icon={<TrophyIcon className="h-4 w-4" />}
            />
            <Achievement 
              title="Maître du Budget"
              desc="Vous avez créé 5 budgets personnalisés"
              icon={<Award className="h-4 w-4" />}
            />
            <Achievement 
              title="Sur la bonne voie"
              desc="Connectez-vous 7 jours d'affilée"
              icon={<Medal className="h-4 w-4" />}
            />
          </TabsContent>
          
          <TabsContent value="badges" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {currentUser.badges.map((badge, idx) => (
                <div key={idx} className="bg-muted/50 hover:bg-muted/80 border border-border rounded-lg p-3 text-center transition-colors">
                  <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="font-medium text-sm">{badge.name}</div>
                </div>
              ))}
              <div className="border border-dashed border-muted-foreground/30 rounded-lg p-3 text-center hover:bg-muted/20 transition-colors">
                <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                  <Award className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <div className="text-sm text-muted-foreground">Accomplir plus de défis</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
