import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronUp } from "lucide-react";
import { scaleIn, fadeIn } from "@/lib/animations";
import {
  UserRankCard,
  TopUsersSection,
  BadgeDistribution,
  UserProgressCard,
  UserAchievementsCard,
  LeaderboardFilters,
  LeaderboardTabs,
  mockUsers,
  badgeDistributionData
} from "@/components/leaderboard";

const Leaderboard = () => {
  const [period, setPeriod] = useState("all-time");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("general");
  
  const currentUser = mockUsers[3]; // Example: currently logged in user
  
  useEffect(() => {
    // Animation pour les éléments au chargement
    const cards = document.querySelectorAll('.top-user-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        if (card instanceof HTMLElement) scaleIn(card);
      }, 100);
    });
    
    const rankCards = document.querySelectorAll('.rank-card');
    rankCards.forEach((card, index) => {
      setTimeout(() => {
        if (card instanceof HTMLElement) fadeIn(card);
      }, 300);
    });
  }, []);
  
  return (
    <div className="container max-w-6xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Classement
          </h1>
          <p className="text-muted-foreground">
            Suivez votre progression et comparez-vous aux autres membres de la communauté
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <LeaderboardTabs view={view} onViewChange={setView} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
              {view === "general" ? (
                <>
                  {/* Top 3 users with medals */}
                  <TopUsersSection users={mockUsers} />
                  
                  {/* Full Leaderboard */}
                  <div className="space-y-2">
                    {mockUsers.slice(0, 7).map((user) => (
                      <div key={user.id} className="rank-card">
                        <UserRankCard user={user} highlight={user.id === currentUser.id} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <BadgeDistribution data={badgeDistributionData} />
              )}
              
              <div className="text-center mt-8">
                <Button variant="outline" size="sm" className="gap-1 hover:bg-primary/5">
                  <span>Voir plus</span>
                  <ChevronUp className="h-4 w-4 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <UserProgressCard 
            currentUser={currentUser} 
            nextRankUser={mockUsers[currentUser.rank - 2]}
          />
          
          <UserAchievementsCard currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
