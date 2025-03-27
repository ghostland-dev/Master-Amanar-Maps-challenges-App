
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Crown, Medal, Search, User } from "lucide-react";

interface LeaderboardUser {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  badges: number;
  challenges: number;
  category?: string;
}

const Leaderboard = () => {
  useEffect(() => {
    document.title = "FinQuest - Classement";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock leaderboard data - will be replaced with Supabase data
  const mockUsers: LeaderboardUser[] = [
    { id: 1, rank: 1, name: "Sophie Martin", avatar: "", level: 15, xp: 15420, badges: 12, challenges: 27, category: "E-commerce" },
    { id: 2, rank: 2, name: "Thomas Dubois", avatar: "", level: 14, xp: 14280, badges: 10, challenges: 23, category: "Investissement" },
    { id: 3, rank: 3, name: "Emma Bernard", avatar: "", level: 13, xp: 13150, badges: 9, challenges: 20, category: "Crypto" },
    { id: 4, rank: 4, name: "Lucas Petit", avatar: "", level: 12, xp: 12050, badges: 8, challenges: 19, category: "Marketing" },
    { id: 5, rank: 5, name: "Camille Durand", avatar: "", level: 11, xp: 11700, badges: 7, challenges: 17, category: "E-commerce" },
    { id: 6, rank: 6, name: "Hugo Moreau", avatar: "", level: 10, xp: 10950, badges: 9, challenges: 16, category: "Investissement" },
    { id: 7, rank: 7, name: "Léa Leroy", avatar: "", level: 9, xp: 9800, badges: 6, challenges: 15, category: "Crypto" },
    { id: 8, rank: 8, name: "Arthur Roux", avatar: "", level: 9, xp: 9450, badges: 5, challenges: 14, category: "Marketing" },
    { id: 9, rank: 9, name: "Chloé Simon", avatar: "", level: 8, xp: 8720, badges: 6, challenges: 13, category: "E-commerce" },
    { id: 10, rank: 10, name: "Gabriel Fournier", avatar: "", level: 8, xp: 8300, badges: 5, challenges: 12, category: "Investissement" },
  ];

  // Filter users based on search query and category filter
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filter === "all" || user.category?.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const renderLeaderboardItem = (user: LeaderboardUser, index: number) => {
    // Determine styling for top 3 positions
    const isTop3 = user.rank <= 3;
    const rankColorClass = 
      user.rank === 1 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
      user.rank === 2 ? "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400" :
      user.rank === 3 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
      "bg-secondary text-secondary-foreground";

    const rankIcon = 
      user.rank === 1 ? <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" /> :
      user.rank === 2 ? <Medal className="h-4 w-4 text-slate-600 dark:text-slate-400" /> :
      user.rank === 3 ? <Medal className="h-4 w-4 text-amber-600 dark:text-amber-400" /> : null;

    return (
      <div key={user.id} className={`flex items-center p-4 rounded-lg ${index % 2 === 0 ? "bg-secondary/10" : ""}`}>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${rankColorClass} mr-4`}>
          {rankIcon || user.rank}
        </div>
        
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium">{user.name}</span>
            {isTop3 && (
              <Badge variant="primary" className="ml-2">
                Top {user.rank}
              </Badge>
            )}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="mr-2">Niveau {user.level}</span>
            {user.category && <span>• {user.category}</span>}
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-medium">{user.xp.toLocaleString()} XP</div>
          <div className="text-xs text-muted-foreground">
            {user.challenges} défis • {user.badges} badges
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-2">Classement</h1>
          <p className="text-muted-foreground mb-8">
            Découvrez les meilleurs utilisateurs de la plateforme
          </p>
          
          <Tabs defaultValue="global" className="mb-8">
            <TabsList>
              <TabsTrigger value="global">Classement global</TabsTrigger>
              <TabsTrigger value="monthly">Ce mois-ci</TabsTrigger>
              <TabsTrigger value="weekly">Cette semaine</TabsTrigger>
            </TabsList>
            
            <TabsContent value="global" className="mt-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Classement global
                  </CardTitle>
                  <CardDescription>
                    Les utilisateurs classés par XP total accumulé
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher un utilisateur..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-48">
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrer par catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les catégories</SelectItem>
                          <SelectItem value="e-commerce">E-commerce</SelectItem>
                          <SelectItem value="investissement">Investissement</SelectItem>
                          <SelectItem value="crypto">Crypto</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => renderLeaderboardItem(user, index))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Aucun résultat trouvé
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Classement mensuel
                  </CardTitle>
                  <CardDescription>
                    Les utilisateurs classés par XP accumulé ce mois-ci
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Le classement mensuel sera disponible prochainement
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Classement hebdomadaire
                  </CardTitle>
                  <CardDescription>
                    Les utilisateurs classés par XP accumulé cette semaine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Le classement hebdomadaire sera disponible prochainement
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Comment gagner plus d'XP ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <Trophy className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Compléter des challenges</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Terminez des challenges pour gagner de l'XP et progresser dans le classement.
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Obtenir des badges</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Débloquez des badges en atteignant des objectifs spécifiques sur la plateforme.
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Être actif régulièrement</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connectez-vous quotidiennement et utilisez les simulateurs pour gagner de l'XP bonus.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
