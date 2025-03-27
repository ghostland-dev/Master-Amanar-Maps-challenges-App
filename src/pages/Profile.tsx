
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import { Trophy, Star, Zap, Award, Gift, BookOpen, LineChart, Shield, Crown, LucideIcon, CheckCircle2, Clock, Users, ChevronRight, DollarSign, CreditCard, Settings, Bell, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Mock data - in a real app, this would come from your backend
const user = {
  id: "user-1",
  name: "Julien Dubois",
  email: "julien@exemple.fr",
  level: 3,
  xp: 650,
  nextLevelXp: 1000,
  subscription: "free", // "free", "pro", "premium"
  joinedDate: "10 Apr 2023",
  profileImage: "",
  badgeCount: 8,
  completedChallenges: 5,
  inProgressChallenges: 2,
};

// Badge definitions
const badges = [
  { id: 1, name: "Premier pas", icon: <CheckCircle2 className="h-6 w-6" />, description: "Complétez votre premier défi", earned: true },
  { id: 2, name: "Investisseur novice", icon: <Star className="h-6 w-6" />, description: "Terminez 3 défis d'investissement", earned: true },
  { id: 3, name: "Roi du ROI", icon: <Trophy className="h-6 w-6" />, description: "Obtenez un ROI de plus de 20% dans le simulateur", earned: true },
  { id: 4, name: "Analyste financier", icon: <LineChart className="h-6 w-6" />, description: "Utilisez tous les simulateurs disponibles", earned: true },
  { id: 5, name: "Expert en crypto", icon: <Zap className="h-6 w-6" />, description: "Complétez le défi Crypto", earned: false },
  { id: 6, name: "Investisseur aguerri", icon: <Award className="h-6 w-6" />, description: "Atteignez le niveau 5", earned: false },
  { id: 7, name: "Prodige du marketing", icon: <Users className="h-6 w-6" />, description: "Complétez le défi d'affiliation", earned: true },
  { id: 8, name: "Entrepreneur numérique", icon: <DollarSign className="h-6 w-6" />, description: "Complétez tous les défis liés au e-commerce", earned: true },
  { id: 9, name: "Expert en NFT", icon: <Gift className="h-6 w-6" />, description: "Complétez le défi NFT", earned: true },
  { id: 10, name: "Maître du copywriting", icon: <BookOpen className="h-6 w-6" />, description: "Complétez le défi de copywriting", earned: true },
  { id: 11, name: "Analyste de tendances", icon: <LineChart className="h-6 w-6" />, description: "Utilisez le simulateur d'analyse de tendances", earned: false },
  { id: 12, name: "Membre Premium", icon: <Crown className="h-6 w-6" />, description: "Activez un abonnement Premium", earned: false },
];

// Activity and history mock data
const activities = [
  { id: 1, type: "challenge", name: "Défi Dropshipping", date: "12 mai 2023", status: "completed", xp: 150 },
  { id: 2, type: "simulator", name: "Simulateur de ROI", date: "10 mai 2023", status: "completed", xp: 50 },
  { id: 3, type: "challenge", name: "Défi Crypto", date: "05 mai 2023", status: "in-progress", xp: 0 },
  { id: 4, type: "simulator", name: "Calculateur de Marge", date: "01 mai 2023", status: "completed", xp: 50 },
  { id: 5, type: "challenge", name: "Défi Affiliation", date: "28 avril 2023", status: "completed", xp: 150 },
];

const subscriptionPlans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€",
    features: [
      "Accès à 3 défis",
      "Simulateur de ROI",
      "Calculateur de marge",
    ],
    current: user.subscription === "free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "9.99€/mois",
    features: [
      "Tous les défis",
      "Tous les simulateurs",
      "Ressources pédagogiques avancées",
      "Suivi de progression détaillé",
    ],
    current: user.subscription === "pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: "19.99€/mois",
    features: [
      "Tout ce qui est inclus dans Pro",
      "Coaching personnalisé mensuel",
      "Communauté privée d'investisseurs",
      "Accès anticipé aux nouveaux contenus",
      "Webinaires exclusifs",
    ],
    current: user.subscription === "premium",
  }
];

const levelTitles = [
  "Débutant",
  "Apprenti",
  "Intermédiaire",
  "Expérimenté",
  "Expert",
  "Maître",
  "Gourou",
];

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    document.title = `FinQuest - Profil de ${user.name}`;
  }, []);
  
  const handleUpgrade = (planId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Fonctionnalité à venir",
        description: `L'abonnement ${planId} sera bientôt disponible.`,
      });
      setIsLoading(false);
    }, 1500);
  };
  
  const calculateLevelProgress = () => {
    return (user.xp / user.nextLevelXp) * 100;
  };
  
  const getLevelTitle = () => {
    return levelTitles[Math.min(user.level - 1, levelTitles.length - 1)];
  };
  
  const earnedBadges = badges.filter((badge) => badge.earned);
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Profil</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/notifications")}>
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User info card */}
            <Card className="glass lg:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="mt-2 flex justify-center">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    <span>Niveau {user.level} - {getLevelTitle()}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progression</span>
                    <span className="font-medium">{user.xp} / {user.nextLevelXp} XP</span>
                  </div>
                  <Progress value={calculateLevelProgress()} className="h-2" />
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Membre depuis</span>
                    <span className="text-sm font-medium">{user.joinedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Badges obtenus</span>
                    <span className="text-sm font-medium">{earnedBadges.length} / {badges.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Défis complétés</span>
                    <span className="text-sm font-medium">{user.completedChallenges}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Défis en cours</span>
                    <span className="text-sm font-medium">{user.inProgressChallenges}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Abonnement</span>
                    <Badge variant={user.subscription === "free" ? "outline" : "default"}>
                      {user.subscription === "free" ? "Gratuit" : user.subscription === "pro" ? "Pro" : "Premium"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/logout")}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </CardFooter>
            </Card>
            
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="activity" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="activity">Activités</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="subscription">Abonnement</TabsTrigger>
                  <TabsTrigger value="challenges">Défis</TabsTrigger>
                </TabsList>
                
                {/* Activity Tab */}
                <TabsContent value="activity" className="space-y-4">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Activités récentes</CardTitle>
                      <CardDescription>Suivez vos dernières activités et progrès</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activities.map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                            <div className="flex items-center space-x-3">
                              {activity.type === "challenge" ? (
                                <Trophy className="h-5 w-5 text-primary" />
                              ) : (
                                <LineChart className="h-5 w-5 text-primary" />
                              )}
                              <div>
                                <p className="font-medium">{activity.name}</p>
                                <p className="text-sm text-muted-foreground">{activity.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {activity.status === "completed" ? (
                                <div className="flex items-center space-x-2">
                                  <Badge variant="success" className="bg-green-500">+{activity.xp} XP</Badge>
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline">En cours</Badge>
                                  <Clock className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" onClick={() => navigate("/activity-history")}>
                        Voir tout l'historique
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Objectifs</CardTitle>
                      <CardDescription>Votre progression vers les prochains objectifs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Atteindre le niveau {user.level + 1}</span>
                          <span>{user.xp}/{user.nextLevelXp} XP</span>
                        </div>
                        <Progress value={calculateLevelProgress()} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Compléter tous les défis</span>
                          <span>{user.completedChallenges}/7 défis</span>
                        </div>
                        <Progress value={(user.completedChallenges / 7) * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Obtenir tous les badges</span>
                          <span>{earnedBadges.length}/{badges.length} badges</span>
                        </div>
                        <Progress value={(earnedBadges.length / badges.length) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Badges Tab */}
                <TabsContent value="badges">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Vos badges</CardTitle>
                      <CardDescription>Collectionnez des badges en complétant des défis et en progressant</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {badges.map((badge) => (
                          <div
                            key={badge.id}
                            className={`p-4 rounded-lg flex flex-col items-center text-center space-y-2 ${
                              badge.earned
                                ? "bg-primary/10 border border-primary/30"
                                : "bg-secondary/30 border border-secondary/50 opacity-60"
                            }`}
                          >
                            <div
                              className={`rounded-full p-3 ${
                                badge.earned ? "bg-primary/20 text-primary" : "bg-secondary/20 text-muted-foreground"
                              }`}
                            >
                              {badge.icon}
                            </div>
                            <h3 className="font-medium">{badge.name}</h3>
                            <p className="text-xs text-muted-foreground">{badge.description}</p>
                            {badge.earned ? (
                              <Badge className="mt-2 bg-green-600">Obtenu</Badge>
                            ) : (
                              <Badge variant="outline" className="mt-2">À débloquer</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Subscription Tab */}
                <TabsContent value="subscription">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Votre abonnement</CardTitle>
                      <CardDescription>Gérez votre abonnement et découvrez les offres premium</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {subscriptionPlans.map((plan) => (
                          <div
                            key={plan.id}
                            className={`p-4 rounded-lg border ${
                              plan.current
                                ? "bg-primary/10 border-primary"
                                : "bg-card border-border"
                            }`}
                          >
                            <div className="text-center mb-4">
                              <h3 className="font-bold text-lg">{plan.name}</h3>
                              <p className="text-2xl font-bold mt-2">{plan.price}</p>
                              {plan.current && (
                                <Badge className="mt-2">Actif</Badge>
                              )}
                            </div>
                            
                            <ul className="space-y-2 mb-4">
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-sm">
                                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            
                            <Button
                              variant={plan.current ? "outline" : "default"}
                              className="w-full"
                              disabled={plan.current || isLoading}
                              onClick={() => handleUpgrade(plan.id)}
                            >
                              {plan.current
                                ? "Abonnement actif"
                                : `Passer à ${plan.name}`}
                              {isLoading && "..."}
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Alert>
                          <CreditCard className="h-4 w-4" />
                          <AlertTitle>Information</AlertTitle>
                          <AlertDescription>
                            Les abonnements premium vous donnent accès à du contenu exclusif et des fonctionnalités avancées.
                            Vous pouvez annuler ou modifier votre abonnement à tout moment.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Challenges Tab */}
                <TabsContent value="challenges">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Vos défis</CardTitle>
                      <CardDescription>Suivez votre progression dans les différents défis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                          <div className="flex items-center space-x-3">
                            <Trophy className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Défi Dropshipping</p>
                              <p className="text-sm text-muted-foreground">Complété le 12 mai 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="success" className="mr-2 bg-green-500">+150 XP</Badge>
                            <Button variant="ghost" size="sm" onClick={() => navigate("/challenge/1")}>
                              Revoir
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                          <div className="flex items-center space-x-3">
                            <Trophy className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Défi Affiliation</p>
                              <p className="text-sm text-muted-foreground">Complété le 28 avril 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="success" className="mr-2 bg-green-500">+150 XP</Badge>
                            <Button variant="ghost" size="sm" onClick={() => navigate("/challenge/3")}>
                              Revoir
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-secondary/50">
                          <div className="flex items-center space-x-3">
                            <Trophy className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Défi Crypto</p>
                              <p className="text-sm text-muted-foreground">En cours - Étape 2/5</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Progress value={40} className="w-20 h-2 mr-2" />
                            <Button variant="ghost" size="sm" onClick={() => navigate("/challenge/2")}>
                              Continuer
                            </Button>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="text-center space-y-3">
                          <h3 className="font-medium">Défis à débloquer</h3>
                          <p className="text-sm text-muted-foreground">
                            Passez à un abonnement premium pour accéder à tous les défis
                          </p>
                          <Button onClick={() => navigate("/challenges")}>
                            Explorer tous les défis
                          </Button>
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
