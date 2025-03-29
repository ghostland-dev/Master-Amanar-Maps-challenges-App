
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronUp, 
  Share, 
  FileDown, 
  BarChart3, 
  Award, 
  Trophy, 
  Shield, 
  Medal, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Calendar,
  Star,
  User,
  Crown,
  Zap,
  Gem,
  ArrowUpRight,
  Info,
  Filter
} from "lucide-react";
import { scaleIn, fadeIn } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

// Stats pour les différentes catégories
const CATEGORY_STATS = [
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
const UPCOMING_EVENTS = [
  { name: "Challenge Hebdomadaire", date: "08 mars", xp: 150, type: "challenge", description: "Créez votre première campagne publicitaire rentable" },
  { name: "Tournoi des Investisseurs", date: "15 mars", xp: 300, type: "competition", description: "Compétition de trading sur 7 jours" },
  { name: "Hack Day Finance", date: "22 mars", xp: 200, type: "event", description: "Créez un outil financier innovant en 24h" },
];

const Leaderboard = () => {
  const [period, setPeriod] = useState("all-time");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const [isExportingChart, setIsExportingChart] = useState(false);
  const [activeTab, setActiveTab] = useState("ranking");
  const [selectedCategory, setSelectedCategory] = useState("general");
  
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
        
        {/* Vue d'ensemble */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3">Votre position</h3>
                <div className="bg-background/80 rounded-lg p-4 flex items-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Trophy className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{currentUser.name}</span>
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          Rang {currentUser.rank}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-500">{currentUser.xp} XP</Badge>
                        <Badge variant="outline" className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                          +120 cette semaine
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-muted-foreground mb-1">
                        {currentUser.xp} XP sur {mockUsers[currentUser.rank - 2].xp} XP pour atteindre le rang {currentUser.rank - 1}
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Badges récents</h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentUser.badges.slice(0, 4).map((badge) => (
                    <div key={badge.id} className="bg-background/80 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <div className={`h-10 w-10 rounded-full bg-${badge.color || "primary"}/10 flex items-center justify-center mb-1`}>
                        {badge.icon === "Trophy" ? (
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        ) : badge.icon === "Award" ? (
                          <Award className="h-5 w-5 text-primary" />
                        ) : badge.icon === "Shield" ? (
                          <Shield className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Medal className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                      <p className="text-xs font-medium truncate w-full">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Navigation principale */}
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
                
                {/* Tendances */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Performances de la semaine</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-3">
                      {SPECIAL_BADGES.map((badge, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-background mr-3 flex items-center justify-center">
                              {badge.icon}
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">{badge.name}</p>
                              <div className="flex items-center">
                                <Avatar className="h-4 w-4 mr-1">
                                  <AvatarImage src={badge.avatar} alt={badge.user} />
                                  <AvatarFallback>{badge.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="text-sm font-medium">{badge.user}</p>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{badge.value}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Classements par catégorie</h2>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_STATS.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {CATEGORY_STATS.map(cat => {
                const CategoryIcon = cat.icon;
                return (
                  <Card 
                    key={cat.id} 
                    className={`hover:shadow-md transition-all cursor-pointer ${
                      selectedCategory === cat.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <CategoryIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{cat.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {cat.stats.participants} participants
                          </p>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="grid grid-cols-2 gap-3 text-center mt-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Challenges</p>
                          <p className="font-medium">{cat.stats.challengesCompleted}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">XP Moyenne</p>
                          <p className="font-medium">{cat.stats.avgXp}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Top 10 - {CATEGORY_STATS.find(c => c.id === selectedCategory)?.name || "Général"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="week">
                      <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Cette semaine</SelectItem>
                        <SelectItem value="month">Ce mois</SelectItem>
                        <SelectItem value="year">Cette année</SelectItem>
                        <SelectItem value="all">Tout le temps</SelectItem>
                      </SelectContent>
                    </Select>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Classement basé sur les XP gagnés</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {filteredUsers.slice(0, 10).map((user) => (
                    <div key={user.id} className="rank-card">
                      <UserRankCard user={user} highlight={user.id === currentUser.id} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Meilleure progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredUsers.slice(0, 5).map((user, idx) => (
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
                        <Badge className="bg-green-500">+{50 + Math.floor(Math.random() * 200)} XP</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Challenges complétés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredUsers.slice(0, 5).map((user, idx) => (
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
                        <Badge variant="outline">{3 + Math.floor(Math.random() * 12)} challenges</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="badges">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <BadgeDistribution data={badgeDistributionData} />
              </div>
              <div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Vos badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {currentUser.badges.map((badge) => (
                        <div key={badge.id} className="bg-card rounded-lg p-3 flex flex-col items-center text-center">
                          <div className={`h-14 w-14 rounded-full bg-${badge.color || "primary"}/10 flex items-center justify-center mb-2`}>
                            {badge.icon === "Trophy" ? (
                              <Trophy className="h-7 w-7 text-yellow-500" />
                            ) : badge.icon === "Award" ? (
                              <Award className="h-7 w-7 text-primary" />
                            ) : badge.icon === "Shield" ? (
                              <Shield className="h-7 w-7 text-blue-500" />
                            ) : (
                              <Medal className="h-7 w-7 text-amber-500" />
                            )}
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
              </div>
            </div>
            
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
                  {badgeDistributionData.slice(0, 8).map((badge, idx) => (
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
          </TabsContent>
          
          <TabsContent value="events">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {UPCOMING_EVENTS.map((event, idx) => (
                    <Card key={idx} className="overflow-hidden border-border/70">
                      <div className={`p-2 text-center text-white ${event.type === 'challenge' ? 'bg-blue-600' : event.type === 'competition' ? 'bg-purple-600' : 'bg-amber-600'}`}>
                        <Badge variant="outline" className="bg-white/20 border-white/40 text-white">
                          {event.type === 'challenge' ? 'Challenge' : event.type === 'competition' ? 'Compétition' : 'Événement'}
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{event.name}</h3>
                          <Badge variant="outline" className="bg-primary/10 text-primary whitespace-nowrap">
                            {event.xp} XP
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {event.date}
                          </div>
                          <Button variant="outline" size="sm">
                            S'inscrire
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Records précédents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Challenge E-commerce MVP</h3>
                        <Badge variant="outline">Terminé</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Créez une boutique en ligne fonctionnelle en une semaine
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Marie Dupont</span>
                        </div>
                        <Badge className="bg-amber-500/90">250 XP</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Hackathon Marketing Digital</h3>
                        <Badge variant="outline">Terminé</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Développez une stratégie de marketing viral en 48h
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Alexandre Petit</span>
                        </div>
                        <Badge className="bg-amber-500/90">320 XP</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Marathon Trading</h3>
                        <Badge variant="outline">Terminé</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Réalisez le plus grand profit en une journée de trading
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Lucas Martin</span>
                        </div>
                        <Badge className="bg-amber-500/90">400 XP</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Vos participations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Challenge Investissement</h3>
                        <Badge variant="success" className="bg-green-600">Réussi</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Créez un portefeuille d'investissement rentable
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          15 janvier 2023
                        </div>
                        <Badge className="bg-green-600/90">+180 XP</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Hackathon E-commerce</h3>
                        <Badge variant="destructive">Non terminé</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Développez une plateforme e-commerce innovante
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          28 février 2023
                        </div>
                        <Badge variant="outline">0 XP</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Workshop Marketing Digital</h3>
                        <Badge variant="success" className="bg-green-600">Réussi</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Maîtrisez les techniques de marketing numérique
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          10 mars 2023
                        </div>
                        <Badge className="bg-green-600/90">+150 XP</Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button variant="outline" size="sm">
                        Voir toutes vos participations
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
