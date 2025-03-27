
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, ChevronUp, Medal, TrophyIcon, Star, ArrowUp, Sparkles, Target, Crown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { PieChart } from "@/components/ui/chart";
import { scaleIn, fadeIn } from "@/lib/animations";

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

const mockUsers: User[] = [
  {
    id: 1,
    name: "Sophie Martin",
    avatar: "",
    points: 3750,
    rank: 1,
    previousRank: 1,
    badges: [
      { name: "Expert en Épargne", type: "secondary" },
      { name: "Investisseur Pro", type: "secondary" },
    ],
    progress: 92,
    challenges: 28,
    pointsHistory: [3450, 3560, 3605, 3650, 3750],
  },
  {
    id: 2,
    name: "Thomas Dubois",
    avatar: "",
    points: 3420,
    rank: 2,
    previousRank: 3,
    badges: [
      { name: "Maître Budget", type: "secondary" },
      { name: "Challenger", type: "outline" },
    ],
    progress: 87,
    challenges: 25,
    pointsHistory: [3100, 3200, 3290, 3350, 3420],
  },
  {
    id: 3,
    name: "Emma Petit",
    avatar: "",
    points: 3100,
    rank: 3,
    previousRank: 2,
    badges: [
      { name: "Débutant", type: "outline" },
      { name: "Épargnant", type: "secondary" },
    ],
    progress: 75,
    challenges: 20,
    pointsHistory: [3200, 3190, 3150, 3120, 3100],
  },
  {
    id: 4,
    name: "Lucas Bernard",
    avatar: "",
    points: 2800,
    rank: 4,
    previousRank: 4,
    badges: [
      { name: "Analyste", type: "secondary" },
    ],
    progress: 65,
    challenges: 18,
    pointsHistory: [2600, 2650, 2700, 2750, 2800],
  },
  {
    id: 5,
    name: "Camille Roux",
    avatar: "",
    points: 2450,
    rank: 5,
    previousRank: 6,
    badges: [
      { name: "Débutant", type: "outline" },
    ],
    progress: 58,
    challenges: 15,
    pointsHistory: [2200, 2280, 2350, 2400, 2450],
  },
  {
    id: 6,
    name: "Hugo Leroy",
    avatar: "",
    points: 2100,
    rank: 6,
    previousRank: 5,
    badges: [
      { name: "Novice", type: "outline" },
    ],
    progress: 45,
    challenges: 12,
    pointsHistory: [2200, 2180, 2150, 2120, 2100],
  },
  {
    id: 7,
    name: "Léa Moreau",
    avatar: "",
    points: 1900,
    rank: 7,
    previousRank: 7,
    badges: [
      { name: "Débutant", type: "outline" },
    ],
    progress: 40,
    challenges: 10,
    pointsHistory: [1800, 1820, 1850, 1880, 1900],
  },
];

// Données pour le graphique des badges
const badgeDistributionData = [
  { name: "Investisseur", value: 25 },
  { name: "Épargnant", value: 35 },
  { name: "Budget", value: 20 },
  { name: "Débutant", value: 20 },
];

const UserRankCard = ({ user, highlight = false }: { user: User; highlight?: boolean }) => {
  const rankChange = user.previousRank ? user.previousRank - user.rank : 0;
  
  return (
    <div className={`p-4 rounded-lg transition-all ${highlight 
      ? "bg-primary/10 border border-primary/20 shadow-md" 
      : "hover:bg-accent border border-transparent hover:border-border/50"}`}
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-8 mr-3 font-medium flex items-center justify-center 
          ${user.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}
        >
          {user.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
          {user.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
          {user.rank === 3 && <Award className="h-5 w-5 text-amber-700" />}
          {user.rank > 3 && <span>#{user.rank}</span>}
        </div>
        <UserAvatar 
          user={{ name: user.name, avatar: user.avatar }}
          border
          className="transition-transform hover:scale-110"
          borderColor={
            user.rank === 1 ? "border-yellow-500" :
            user.rank === 2 ? "border-gray-400" :
            user.rank === 3 ? "border-amber-700" :
            highlight ? "border-primary" : "border-muted"
          }
        />
        <div className="ml-4 flex-1">
          <div className="font-medium flex items-center gap-2">
            {user.name}
            {rankChange > 0 && (
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                {rankChange}
              </span>
            )}
            {rankChange < 0 && (
              <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-full flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5 rotate-180" />
                {Math.abs(rankChange)}
              </span>
            )}
          </div>
          <div className="flex mt-1 space-x-1 flex-wrap">
            {user.badges.map((badge, idx) => (
              <Badge key={idx} variant={badge.type} className="mt-1">
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center ml-2">
          <div className="font-semibold text-lg">{user.points.toLocaleString()}</div>
          <div className="text-xs ml-1 text-muted-foreground">pts</div>
        </div>
      </div>
      
      {/* Point history visualization (mini sparkline) */}
      {user.pointsHistory && (
        <div className="mt-3 flex items-end h-6 gap-0.5 pl-16">
          {user.pointsHistory.map((point, idx) => {
            const normalizedHeight = 
              ((point - Math.min(...user.pointsHistory!)) / 
              (Math.max(...user.pointsHistory!) - Math.min(...user.pointsHistory!))) * 24;
            
            return (
              <div 
                key={idx}
                className={`w-1 ${
                  highlight ? "bg-primary/60" : 
                  user.rank <= 3 ? "bg-primary/40" : "bg-muted-foreground/20"
                } rounded-t`}
                style={{ height: `${Math.max(4, normalizedHeight)}px` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const Achievement = ({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) => (
  <div className="flex items-start p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-primary/5 transition-colors">
    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full mr-3 text-primary">
      {icon}
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

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
        if (card instanceof HTMLElement) scaleIn(card, index * 0.1);
      }, 100);
    });
    
    const rankCards = document.querySelectorAll('.rank-card');
    rankCards.forEach((card, index) => {
      setTimeout(() => {
        if (card instanceof HTMLElement) fadeIn(card, 0.3 + index * 0.05);
      }, 300);
    });
  }, []);
  
  return (
    <div className="container max-w-6xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Classement</h1>
          <p className="text-muted-foreground">
            Suivez votre progression et comparez-vous aux autres membres de la communauté
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="general" value={view} onValueChange={setView}>
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrophyIcon className="h-4 w-4 mr-2" />
              Classement Général
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Award className="h-4 w-4 mr-2" />
              Distribution des Badges
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
                  <div className="flex mt-3 md:mt-0 space-x-3">
                    <Select value={period} onValueChange={setPeriod}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="this-week">Cette semaine</SelectItem>
                        <SelectItem value="this-month">Ce mois</SelectItem>
                        <SelectItem value="all-time">Tout le temps</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        <SelectItem value="investment">Investissement</SelectItem>
                        <SelectItem value="saving">Épargne</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              {view === "general" ? (
                <>
                  {/* Top 3 users with medals */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {mockUsers.slice(1, 2).map((user) => (
                      <div key={user.id} className="top-user-card bg-muted/50 hover:bg-muted/80 rounded-xl p-4 flex flex-col items-center order-2 border border-border/30 shadow-sm transition-all hover:shadow-md">
                        <div className="relative">
                          <UserAvatar
                            user={{ name: user.name, avatar: user.avatar }}
                            size="lg"
                            border
                            className="ring-2 ring-offset-2 ring-gray-400/50 transition-transform hover:scale-105"
                            borderColor="border-gray-400"
                          />
                          <div className="absolute -top-2 -right-2 bg-gray-400 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                            <Medal className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="mt-3 text-center">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">#{user.rank}</div>
                          <div className="mt-1 flex items-center justify-center">
                            <span className="font-bold">{user.points.toLocaleString()}</span>
                            <span className="text-xs ml-1 text-muted-foreground">pts</span>
                          </div>
                          {user.previousRank < user.rank && (
                            <div className="mt-1 text-xs flex items-center justify-center text-red-500">
                              <ArrowUp className="h-3 w-3 mr-0.5 rotate-180" />
                              <span>{Math.abs(user.previousRank - user.rank)}</span>
                            </div>
                          )}
                          {user.previousRank > user.rank && (
                            <div className="mt-1 text-xs flex items-center justify-center text-green-500">
                              <ArrowUp className="h-3 w-3 mr-0.5" />
                              <span>{user.previousRank - user.rank}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {mockUsers.slice(0, 1).map((user) => (
                      <div key={user.id} className="top-user-card bg-gradient-to-b from-yellow-50 to-yellow-100/50 dark:from-yellow-900/10 dark:to-yellow-900/5 rounded-xl p-5 flex flex-col items-center relative order-1 md:mt-[-30px] border border-yellow-200 dark:border-yellow-700/30 shadow-md hover:shadow-lg transition-all">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <Crown className="h-10 w-10 text-yellow-500 drop-shadow-md" />
                        </div>
                        <div className="relative pt-4">
                          <UserAvatar
                            user={{ name: user.name, avatar: user.avatar }}
                            size="xl"
                            border
                            className="ring-4 ring-offset-2 ring-yellow-500/50 transition-transform hover:scale-105"
                            borderColor="border-yellow-500"
                          />
                          <div className="absolute -top-2 -right-2 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                            1
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <div className="font-semibold text-lg">{user.name}</div>
                          <div className="text-sm text-muted-foreground">#{user.rank}</div>
                          <div className="mt-2 flex items-center justify-center">
                            <span className="font-bold text-xl">{user.points.toLocaleString()}</span>
                            <span className="text-xs ml-1 text-muted-foreground">pts</span>
                          </div>
                          <div className="mt-1 space-x-1">
                            {user.badges.map((badge, idx) => (
                              <Badge key={idx} variant={badge.type} className="mt-1">
                                {badge.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {mockUsers.slice(2, 3).map((user) => (
                      <div key={user.id} className="top-user-card bg-muted/50 hover:bg-muted/80 rounded-xl p-4 flex flex-col items-center order-3 border border-border/30 shadow-sm transition-all hover:shadow-md">
                        <div className="relative">
                          <UserAvatar
                            user={{ name: user.name, avatar: user.avatar }}
                            size="lg"
                            border
                            className="ring-2 ring-offset-2 ring-amber-700/50 transition-transform hover:scale-105"
                            borderColor="border-amber-700"
                          />
                          <div className="absolute -top-2 -right-2 bg-amber-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                            <Award className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="mt-3 text-center">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">#{user.rank}</div>
                          <div className="mt-1 flex items-center justify-center">
                            <span className="font-bold">{user.points.toLocaleString()}</span>
                            <span className="text-xs ml-1 text-muted-foreground">pts</span>
                          </div>
                          {user.previousRank < user.rank && (
                            <div className="mt-1 text-xs flex items-center justify-center text-red-500">
                              <ArrowUp className="h-3 w-3 mr-0.5 rotate-180" />
                              <span>{Math.abs(user.previousRank - user.rank)}</span>
                            </div>
                          )}
                          {user.previousRank > user.rank && (
                            <div className="mt-1 text-xs flex items-center justify-center text-green-500">
                              <ArrowUp className="h-3 w-3 mr-0.5" />
                              <span>{user.previousRank - user.rank}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
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
                <div className="py-4">
                  <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
                    <div className="md:w-1/2">
                      <PieChart
                        data={badgeDistributionData}
                        index="name"
                        category="value"
                        colors={["#2563eb", "#4ade80", "#f97316", "#f43f5e"]}
                        valueFormatter={(value) => `${value}%`}
                        className="h-[300px]"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-lg font-medium mb-4">Types de Badges</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center p-3 rounded-lg border border-border bg-card">
                          <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                            <Sparkles className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium">Investisseur</div>
                            <div className="text-xs text-muted-foreground">Maîtrise des stratégies d'investissement</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-lg border border-border bg-card">
                          <div className="bg-green-500/20 p-2 rounded-full mr-3">
                            <Target className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <div className="font-medium">Épargnant</div>
                            <div className="text-xs text-muted-foreground">Atteinte des objectifs d'épargne</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-lg border border-border bg-card">
                          <div className="bg-orange-500/20 p-2 rounded-full mr-3">
                            <ChevronUp className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <div className="font-medium">Budget</div>
                            <div className="text-xs text-muted-foreground">Gestion efficace des dépenses</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 rounded-lg border border-border bg-card">
                          <div className="bg-red-500/20 p-2 rounded-full mr-3">
                            <Star className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <div className="font-medium">Débutant</div>
                            <div className="text-xs text-muted-foreground">Premiers pas dans l'éducation financière</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Votre Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Position Actuelle</span>
                    <span className="text-sm font-medium">#{currentUser.rank}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full" style={{ width: `${currentUser.progress}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Prochain niveau: #{currentUser.rank - 1}</span>
                    <span className="text-xs text-muted-foreground">
                      +{mockUsers[currentUser.rank - 2].points - currentUser.points} pts
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/20">
                    <div className="text-xl font-bold text-primary">{currentUser.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Points totaux</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/20">
                    <div className="text-xl font-bold text-primary">{currentUser.progress}%</div>
                    <div className="text-xs text-muted-foreground">Progression</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/20">
                    <div className="text-xl font-bold text-primary">{currentUser.challenges}</div>
                    <div className="text-xs text-muted-foreground">Défis complétés</div>
                  </div>
                </div>
                
                <Button className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary">
                  <ChevronUp className="h-4 w-4" />
                  <span>Améliorer mon classement</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
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
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
