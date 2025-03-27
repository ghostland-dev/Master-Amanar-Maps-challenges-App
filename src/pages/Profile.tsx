
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Medal, Settings, Trophy, User } from "lucide-react";

const Profile = () => {
  useEffect(() => {
    document.title = "FinQuest - Profil";
  }, []);

  // Mock user data - will be replaced with Supabase data
  const user = {
    name: "Alex Dubois",
    email: "alex@example.com",
    avatar: "",
    level: 7,
    xp: 3280,
    xpToNextLevel: 5000,
    joinedDate: "12 mars 2023",
    completedChallenges: 8,
    badges: [
      { id: 1, name: "Première victoire", description: "Compléter votre premier challenge" },
      { id: 2, name: "Investisseur en herbe", description: "Atteindre 1000 XP dans la catégorie investissement" },
      { id: 3, name: "Explorateur financier", description: "Essayer des challenges dans 3 catégories différentes" }
    ],
    achievements: [
      { id: 1, name: "Assiduité", progress: 75, description: "Se connecter 7 jours de suite" },
      { id: 2, name: "Analyste", progress: 40, description: "Utiliser tous les simulateurs disponibles" },
      { id: 3, name: "Expert en ROI", progress: 100, description: "Maîtriser le simulateur de ROI" }
    ],
    stats: {
      simulationsRun: 27,
      challengesStarted: 12,
      challengesCompleted: 8,
      totalXP: 3280,
      rank: "Investisseur Intermédiaire"
    }
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10">
                        <User className="h-12 w-12 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground mb-4">{user.email}</p>
                    
                    <div className="w-full mb-6">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Niveau {user.level}</span>
                        <span>{user.xp} / {user.xpToNextLevel} XP</span>
                      </div>
                      <Progress value={(user.xp / user.xpToNextLevel) * 100} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full mb-6">
                      <div className="bg-secondary/50 p-3 rounded-lg text-center">
                        <p className="text-xl font-bold">{user.completedChallenges}</p>
                        <p className="text-xs text-muted-foreground">Challenges</p>
                      </div>
                      <div className="bg-secondary/50 p-3 rounded-lg text-center">
                        <p className="text-xl font-bold">{user.badges.length}</p>
                        <p className="text-xs text-muted-foreground">Badges</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Modifier le profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Stats Utilisateur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Simulations exécutées</span>
                      <span className="font-medium">{user.stats.simulationsRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Challenges commencés</span>
                      <span className="font-medium">{user.stats.challengesStarted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Challenges terminés</span>
                      <span className="font-medium">{user.stats.challengesCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">XP Total</span>
                      <span className="font-medium">{user.stats.totalXP}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Rang actuel</span>
                      <span className="font-medium">{user.stats.rank}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="badges">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="badges" className="flex-1">
                    <Award className="mr-2 h-4 w-4" />
                    Badges
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex-1">
                    <Trophy className="mr-2 h-4 w-4" />
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Historique
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="badges">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Mes Badges</CardTitle>
                      <CardDescription>
                        Badges débloqués au cours de votre parcours d'apprentissage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.badges.map((badge) => (
                          <div key={badge.id} className="border border-border rounded-lg p-4 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Medal className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{badge.name}</h3>
                              <p className="text-sm text-muted-foreground">{badge.description}</p>
                            </div>
                          </div>
                        ))}
                        {/* Placeholder for locked badges */}
                        <div className="border border-border border-dashed rounded-lg p-4 flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Medal className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium text-muted-foreground">Badge verrouillé</h3>
                            <p className="text-sm text-muted-foreground">Continuez à progresser pour le débloquer</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Mes Achievements</CardTitle>
                      <CardDescription>
                        Suivez votre progression dans différentes réalisations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {user.achievements.map((achievement) => (
                          <div key={achievement.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{achievement.name}</h3>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              </div>
                              <Badge variant={achievement.progress === 100 ? "default" : "outline"}>
                                {achievement.progress === 100 ? "Complété" : `${achievement.progress}%`}
                              </Badge>
                            </div>
                            <Progress value={achievement.progress} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Historique d'activité</CardTitle>
                      <CardDescription>
                        Votre activité récente sur la plateforme
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Timeline items */}
                        <div className="relative pl-6 border-l border-border pb-6">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Aujourd'hui</span>
                            <span className="font-medium">Challenge "Introduction au ROI" terminé</span>
                            <span className="text-sm text-muted-foreground">+200 XP</span>
                          </div>
                        </div>
                        
                        <div className="relative pl-6 border-l border-border pb-6">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-border"></div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Hier</span>
                            <span className="font-medium">A utilisé le simulateur de ROI</span>
                            <span className="text-sm text-muted-foreground">+50 XP</span>
                          </div>
                        </div>
                        
                        <div className="relative pl-6 border-l border-border pb-6">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-border"></div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Il y a 3 jours</span>
                            <span className="font-medium">Challenge "Bases de l'investissement" commencé</span>
                            <span className="text-sm text-muted-foreground">+30 XP</span>
                          </div>
                        </div>
                        
                        <div className="relative pl-6">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-border"></div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Il y a 5 jours</span>
                            <span className="font-medium">A débloqué le badge "Explorateur financier"</span>
                            <span className="text-sm text-muted-foreground">+100 XP</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
