
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, Share, FileDown, BarChart3 } from "lucide-react";
import { scaleIn, fadeIn } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import {
  UserRankCard,
  TopUsersSection,
  BadgeDistribution,
  UserProgressCard,
  UserAchievementsCard,
  LeaderboardFilters,
  LeaderboardTabs,
  LeaderboardPagination,
  mockUsers,
  badgeDistributionData
} from "@/components/leaderboard";

const USERS_PER_PAGE = 5;

const Leaderboard = () => {
  const [period, setPeriod] = useState("all-time");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const [isExportingChart, setIsExportingChart] = useState(false);
  
  // Simulate loading state for better UX
  const [isLoading, setIsLoading] = useState(true);
  
  const currentUser = mockUsers[3]; // Example: currently logged in user
  
  // Filter users based on selected category
  const filteredUsers = mockUsers.filter(user => {
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
  
  useEffect(() => {
    document.title = "FinQuest - Classement des utilisateurs";
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Animation pour les éléments au chargement
    const cards = document.querySelectorAll('.top-user-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        if (card instanceof HTMLElement) scaleIn(card);
      }, 100 * (index + 1));
    });
    
    const rankCards = document.querySelectorAll('.rank-card');
    rankCards.forEach((card, index) => {
      setTimeout(() => {
        if (card instanceof HTMLElement) fadeIn(card);
      }, 300 + (100 * index));
    });
  }, []);
  
  // Handle category or period change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, period]);
  
  // Simulate exporting data
  const handleExportData = () => {
    setIsExportingChart(true);
    setTimeout(() => {
      setIsExportingChart(false);
      window.alert("Les données du classement ont été exportées");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-6xl mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Classement
            </h1>
            <p className="text-muted-foreground">
              Suivez votre progression et comparez-vous aux autres membres de la communauté
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5" 
              onClick={handleExportData}
              disabled={isExportingChart}
            >
              {isExportingChart ? (
                <>
                  <div className="h-4 w-4 border-t-2 border-r-2 border-primary rounded-full animate-spin" />
                  Exportation...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  Exporter
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5"
            >
              <Share className="h-4 w-4" />
              Partager
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="gap-1.5 hidden md:flex"
            >
              <BarChart3 className="h-4 w-4" />
              Voir mes statistiques
            </Button>
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
                {isLoading ? (
                  <div className="py-20 space-y-4">
                    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
                    <p className="text-center text-muted-foreground">Chargement du classement...</p>
                  </div>
                ) : view === "general" ? (
                  <>
                    {/* Top 3 users with medals */}
                    <TopUsersSection users={filteredUsers.slice(0, 3)} />
                    
                    {/* Full Leaderboard */}
                    <div className="space-y-1">
                      {paginatedUsers.map((user) => (
                        <div key={user.id} className="rank-card">
                          <UserRankCard user={user} highlight={user.id === currentUser.id} />
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
      
      <footer className="bg-muted py-12 mt-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">À propos du Classement</h3>
              <p className="text-muted-foreground text-sm">
                Le classement FinQuest est mis à jour chaque jour en fonction des points
                gagnés par nos utilisateurs. Relevez des défis financiers pour améliorer
                votre position !
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Comment gagner des points</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Compléter des défis financiers
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Participer aux quizzes hebdomadaires
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Utiliser régulièrement les simulateurs
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Partager vos connaissances avec la communauté
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Consultez notre FAQ ou contactez notre équipe si vous avez des questions
                sur le fonctionnement du classement.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Voir la FAQ
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} FinQuest. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;
