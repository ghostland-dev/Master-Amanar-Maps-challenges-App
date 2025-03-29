
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Trophy, Book, Award, Activity, Settings, FileText, LogOut, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ProfileBadges } from "@/components/profile/ProfileBadges";
import { ProfileChallenges } from "@/components/profile/ProfileChallenges";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";

const Profile = () => {
  const { user, hasPremiumAccess, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    document.title = "FinQuest - Profil";
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate level progress percentage
  const calculateLevelProgress = () => {
    if (!user) return 0;
    
    // Mock data for display
    const level = 12;
    const xp = 2450;
    
    const xpForCurrentLevel = level * 1000;
    const xpForNextLevel = (level + 1) * 1000;
    const xpInCurrentLevel = xp - xpForCurrentLevel;
    const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
    
    return Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100);
  };
  
  const levelProgress = calculateLevelProgress();

  if (!user) return null; // Safety check
  
  // Ensure subscription has default values if it doesn't exist
  const userSubscription = user.subscription || { tier: 'free', active: true, expiresAt: null };
  
  const mockUserStats = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    xp: 2450,
    level: 12,
    avatar: "",
    completedChallenges: 8,
    inProgressChallenges: 2,
    badges: 15,
    plan: userSubscription.tier === 'free' ? 'gratuit' : userSubscription.tier,
    joinDate: "12 Avril 2023",
  };
  
  return (
    <MainLayout title="Profil" description="Votre profil utilisateur FinQuest">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
        <div className="mb-8 flex flex-col md:flex-row gap-6">
          {/* Profile Overview Card */}
          <Card className="w-full md:w-1/3">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={mockUserStats.avatar || ""} alt={mockUserStats.name} />
                    <AvatarFallback className="text-lg">{mockUserStats.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{mockUserStats.name}</CardTitle>
                    <CardDescription>{mockUserStats.email}</CardDescription>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        className={hasPremiumAccess ? "bg-amber-500" : ""}
                      >
                        {hasPremiumAccess ? (
                          <span className="flex items-center">
                            Premium <Crown className="ml-1 h-3 w-3" />
                          </span>
                        ) : "Gratuit"}
                      </Badge>
                      {user.role === 'admin' && (
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          Admin
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-sm">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">Niveau {mockUserStats.level}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{mockUserStats.xp} XP</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {100 - levelProgress}% jusqu'au niveau {mockUserStats.level + 1}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold">{mockUserStats.completedChallenges}</div>
                  <div className="text-xs text-muted-foreground">Challenges</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold">{mockUserStats.badges}</div>
                  <div className="text-xs text-muted-foreground">Badges</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold">{mockUserStats.level}</div>
                  <div className="text-xs text-muted-foreground">Niveau</div>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Membre depuis {mockUserStats.joinDate}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Link to="/subscriptions" className="w-full">
                <Button className="w-full justify-start bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  <Crown className="mr-2 h-4 w-4" />
                  {hasPremiumAccess ? "Gérer mon abonnement" : "Passer à Premium"}
                </Button>
              </Link>
              <Link to="/settings" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres du compte
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </CardFooter>
          </Card>
          
          {/* Tabs Section */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="challenges">
              <TabsList className="mb-4 grid grid-cols-4 h-auto">
                <TabsTrigger value="challenges" className="py-2">
                  <Trophy className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                  <span className="hidden md:inline-block lg:inline-block">Challenges</span>
                </TabsTrigger>
                <TabsTrigger value="badges" className="py-2">
                  <Award className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                  <span className="hidden md:inline-block lg:inline-block">Badges</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="py-2">
                  <Activity className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                  <span className="hidden md:inline-block lg:inline-block">Statistiques</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="py-2">
                  <Settings className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                  <span className="hidden md:inline-block lg:inline-block">Paramètres</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="challenges">
                <ProfileChallenges userId={user.id} />
              </TabsContent>
              
              <TabsContent value="badges">
                <ProfileBadges userId={user.id} />
              </TabsContent>
              
              <TabsContent value="stats">
                <ProfileStats userId={user.id} />
              </TabsContent>
              
              <TabsContent value="settings">
                <ProfileSettings user={mockUserStats} setUser={() => {}} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
