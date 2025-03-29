
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Share, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RankingTab } from "@/components/leaderboard/ranking/RankingTab";
import { CategoriesTab } from "@/components/leaderboard/categories/CategoriesTab";
import { BadgesTab } from "@/components/leaderboard/badges/BadgesTab";
import { EventsTab } from "@/components/leaderboard/events/EventsTab";
import { scaleIn, fadeIn } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import { 
  ChevronUp, 
  Trophy, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  Zap, 
  Gem, 
  Crown,
} from "lucide-react";
import { mockUsers, badgeDistributionData } from "@/components/leaderboard";
import { CategoryData, UpcomingEvent, PastEvent, UserEvent } from "@/components/leaderboard/models";

// Category stats data
const CATEGORY_STATS: CategoryData[] = [
  { 
    id: "general", 
    name: "Général", 
    icon: Trophy, 
    stats: { participants: 1245, challengesCompleted: 5872, avgXp: 850 } 
  },
  { 
    id: "ecommerce", 
    name: "E-commerce", 
    icon: Gem, 
    stats: { participants: 456, challengesCompleted: 1287, avgXp: 730 } 
  },
  { 
    id: "crypto", 
    name: "Crypto", 
    icon: TrendingUp, 
    stats: { participants: 389, challengesCompleted: 954, avgXp: 920 } 
  },
  { 
    id: "dropshipping", 
    name: "Dropshipping", 
    icon: Target, 
    stats: { participants: 621, challengesCompleted: 1854, avgXp: 680 } 
  },
  { 
    id: "marketing", 
    name: "Marketing", 
    icon: Zap, 
    stats: { participants: 732, challengesCompleted: 2145, avgXp: 810 } 
  },
];

// Badges spéciaux pour les tops performances
const SPECIAL_BADGES = [
  { name: "Meilleur progression", user: "Marie Dupont", avatar: "/placeholder.svg", value: "+350 XP", icon: <TrendingUp className="text-green-500" /> },
  { name: "Plus de challenges", user: "Lucas Martin", avatar: "/placeholder.svg", value: "12 challenges", icon: <CheckCircle className="text-blue-500" /> },
  { name: "Expert E-commerce", user: "Sophie Lefebvre", avatar: "/placeholder.svg", value: "Niveau 8", icon: <Star className="text-yellow-500" /> },
  { name: "Plus actif", user: "Alexandre Petit", avatar: "/placeholder.svg", value: "45 jours consécutifs", icon: <Zap className="text-purple-500" /> },
];

// Événements à venir
const UPCOMING_EVENTS: UpcomingEvent[] = [
  { name: "Challenge Hebdomadaire", date: "08 mars", xp: 150, type: "challenge", description: "Créez votre première campagne publicitaire rentable" },
  { name: "Tournoi des Investisseurs", date: "15 mars", xp: 300, type: "competition", description: "Compétition de trading sur 7 jours" },
  { name: "Hack Day Finance", date: "22 mars", xp: 200, type: "event", description: "Créez un outil financier innovant en 24h" },
];

// Past events data
const PAST_EVENTS: PastEvent[] = [
  { title: "Challenge E-commerce MVP", description: "Créez une boutique en ligne fonctionnelle en une semaine", winner: "Marie Dupont", xp: 250 },
  { title: "Hackathon Marketing Digital", description: "Développez une stratégie de marketing viral en 48h", winner: "Alexandre Petit", xp: 320 },
  { title: "Marathon Trading", description: "Réalisez le plus grand profit en une journée de trading", winner: "Lucas Martin", xp: 400 },
];

// User events data
const USER_EVENTS: UserEvent[] = [
  { title: "Challenge Investissement", description: "Créez un portefeuille d'investissement rentable", date: "15 janvier 2023", status: "success", xp: 180 },
  { title: "Hackathon E-commerce", description: "Développez une plateforme e-commerce innovante", date: "28 février 2023", status: "failure", xp: 0 },
  { title: "Workshop Marketing Digital", description: "Maîtrisez les techniques de marketing numérique", date: "10 mars 2023", status: "success", xp: 150 },
];

const Leaderboard = () => {
  const [isExportingChart, setIsExportingChart] = useState(false);
  const [activeTab, setActiveTab] = useState("ranking");
  const [isLoading, setIsLoading] = useState(true);
  
  const currentUser = mockUsers[3]; // Example: currently logged in user
  
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
        
        {/* Main navigation tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 mb-2 w-full">
            <TabsTrigger value="ranking" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Classement
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Catégories
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Badges
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Événements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ranking">
            {isLoading ? (
              <div className="py-20 space-y-4">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
                <p className="text-center text-muted-foreground">Chargement du classement...</p>
              </div>
            ) : (
              <RankingTab 
                users={mockUsers}
                currentUser={currentUser}
                badgeDistributionData={badgeDistributionData}
                specialBadges={SPECIAL_BADGES}
              />
            )}
          </TabsContent>
          
          <TabsContent value="categories">
            <CategoriesTab 
              categories={CATEGORY_STATS} 
              users={mockUsers}
              currentUserId={currentUser.id}
            />
          </TabsContent>
          
          <TabsContent value="badges">
            <BadgesTab 
              currentUser={currentUser} 
              badgeDistributionData={badgeDistributionData} 
            />
          </TabsContent>
          
          <TabsContent value="events">
            <EventsTab 
              upcomingEvents={UPCOMING_EVENTS}
              pastEvents={PAST_EVENTS}
              userEvents={USER_EVENTS}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
