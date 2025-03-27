import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, ChevronUp, Medal, TrophyIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";

interface User {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  badges: { name: string; type: "default" | "secondary" | "destructive" | "outline" }[];
  progress: number;
  challenges: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Sophie Martin",
    avatar: "",
    points: 3750,
    rank: 1,
    badges: [
      { name: "Expert en Épargne", type: "secondary" },
      { name: "Investisseur Pro", type: "secondary" },
    ],
    progress: 92,
    challenges: 28,
  },
  {
    id: 2,
    name: "Thomas Dubois",
    avatar: "",
    points: 3420,
    rank: 2,
    badges: [
      { name: "Maître Budget", type: "secondary" },
      { name: "Challenger", type: "outline" },
    ],
    progress: 87,
    challenges: 25,
  },
  {
    id: 3,
    name: "Emma Petit",
    avatar: "",
    points: 3100,
    rank: 3,
    badges: [
      { name: "Débutant", type: "outline" },
      { name: "Épargnant", type: "secondary" },
    ],
    progress: 75,
    challenges: 20,
  },
  {
    id: 4,
    name: "Lucas Bernard",
    avatar: "",
    points: 2800,
    rank: 4,
    badges: [
      { name: "Analyste", type: "secondary" },
    ],
    progress: 65,
    challenges: 18,
  },
  {
    id: 5,
    name: "Camille Roux",
    avatar: "",
    points: 2450,
    rank: 5,
    badges: [
      { name: "Débutant", type: "outline" },
    ],
    progress: 58,
    challenges: 15,
  },
  {
    id: 6,
    name: "Hugo Leroy",
    avatar: "",
    points: 2100,
    rank: 6,
    badges: [
      { name: "Novice", type: "outline" },
    ],
    progress: 45,
    challenges: 12,
  },
  {
    id: 7,
    name: "Léa Moreau",
    avatar: "",
    points: 1900,
    rank: 7,
    badges: [
      { name: "Débutant", type: "outline" },
    ],
    progress: 40,
    challenges: 10,
  },
];

const UserRankCard = ({ user, highlight = false }: { user: User; highlight?: boolean }) => (
  <div className={`p-4 rounded-lg transition-all ${highlight ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}>
    <div className="flex items-center">
      <div className="flex-shrink-0 w-8 mr-3 text-muted-foreground font-medium">#{user.rank}</div>
      <UserAvatar 
        user={{ name: user.name, avatar: user.avatar }}
        border
        borderColor={highlight ? "border-primary" : "border-muted"}
      />
      <div className="ml-4 flex-1">
        <div className="font-medium">{user.name}</div>
        <div className="flex mt-1 space-x-1">
          {user.badges.map((badge, idx) => (
            <Badge key={idx} variant={badge.type}>
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
  </div>
);

const Achievement = ({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) => (
  <div className="flex items-start p-4 rounded-lg border border-border">
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
  
  const currentUser = mockUsers[3]; // Example: currently logged in user
  
  return (
    <div className="container max-w-6xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Classement</h1>
          <p className="text-muted-foreground">
            Suivez votre progression et comparez-vous aux autres membres de la communauté
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <CardTitle>Classement Global</CardTitle>
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
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              {/* Top 3 users with medals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                {mockUsers.slice(1, 2).map((user) => (
                  <div key={user.id} className="bg-muted rounded-lg p-4 flex flex-col items-center order-2">
                    <div className="relative">
                      <UserAvatar
                        user={{ name: user.name, avatar: user.avatar }}
                        size="lg"
                        border
                        borderColor="border-secondary"
                      />
                      <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground w-7 h-7 rounded-full flex items-center justify-center">
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
                    </div>
                  </div>
                ))}
                
                {mockUsers.slice(0, 1).map((user) => (
                  <div key={user.id} className="bg-muted rounded-lg p-4 flex flex-col items-center relative order-1 md:mt-[-20px]">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                      <TrophyIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="relative pt-3">
                      <UserAvatar
                        user={{ name: user.name, avatar: user.avatar }}
                        size="xl"
                        border
                        borderColor="border-primary"
                      />
                      <div className="absolute -top-2 -right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">#{user.rank}</div>
                      <div className="mt-1 flex items-center justify-center">
                        <span className="font-bold">{user.points.toLocaleString()}</span>
                        <span className="text-xs ml-1 text-muted-foreground">pts</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {mockUsers.slice(2, 3).map((user) => (
                  <div key={user.id} className="bg-muted rounded-lg p-4 flex flex-col items-center order-3">
                    <div className="relative">
                      <UserAvatar
                        user={{ name: user.name, avatar: user.avatar }}
                        size="lg"
                        border
                        borderColor="border-yellow-600/50"
                      />
                      <div className="absolute -top-2 -right-2 bg-yellow-600/50 text-secondary-foreground w-7 h-7 rounded-full flex items-center justify-center">
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
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Full Leaderboard */}
              <div className="space-y-2">
                {mockUsers.slice(0, 7).map((user) => (
                  <UserRankCard key={user.id} user={user} highlight={user.id === currentUser.id} />
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" size="sm">Voir plus</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
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
                    <div className="h-full bg-primary rounded-full" style={{ width: `${currentUser.progress}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Prochain niveau: #{currentUser.rank - 1}</span>
                    <span className="text-xs text-muted-foreground">
                      +{mockUsers[currentUser.rank - 2].points - currentUser.points} pts
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="text-xl font-bold">{currentUser.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Points totaux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{currentUser.progress}%</div>
                    <div className="text-xs text-muted-foreground">Progression</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{currentUser.challenges}</div>
                    <div className="text-xs text-muted-foreground">Défis complétés</div>
                  </div>
                </div>
                
                <Button className="w-full gap-2">
                  <ChevronUp className="h-4 w-4" />
                  <span>Améliorer mon classement</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
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
                      <div key={idx} className="border border-border rounded-lg p-3 text-center">
                        <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div className="font-medium text-sm">{badge.name}</div>
                      </div>
                    ))}
                    <div className="border border-dashed border-muted-foreground/30 rounded-lg p-3 text-center">
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
