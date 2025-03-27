
import { useState, useEffect } from "react";
import { User, Trophy, Book, Award, Activity, Settings, FileText, LogOut } from "lucide-react";
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

// Mock user data (would come from database/auth)
const mockUser = {
  id: "user1",
  name: "Jean Dupont",
  email: "jean.dupont@example.com",
  role: "user",
  xp: 2450,
  level: 12,
  avatar: "",
  completedChallenges: 8,
  inProgressChallenges: 2,
  badges: 15,
  plan: "premium",
  joinDate: "12 Avril 2023",
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(mockUser);
  
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
    const xpForCurrentLevel = user.level * 1000;
    const xpForNextLevel = (user.level + 1) * 1000;
    const xpInCurrentLevel = user.xp - xpForCurrentLevel;
    const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
    
    return Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100);
  };
  
  const levelProgress = calculateLevelProgress();
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="mb-8 flex flex-col md:flex-row gap-6">
            {/* Profile Overview Card */}
            <Card className="w-full md:w-1/3">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarImage src={user.avatar || ""} alt={user.name} />
                      <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                      <Badge className="mt-1">{user.plan === "premium" ? "Premium" : "Gratuit"}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Niveau {user.level}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{user.xp} XP</span>
                  </div>
                  <Progress value={levelProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {100 - levelProgress}% jusqu'au niveau {user.level + 1}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-semibold">{user.completedChallenges}</div>
                    <div className="text-xs text-muted-foreground">Challenges</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-semibold">{user.badges}</div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-semibold">{user.level}</div>
                    <div className="text-xs text-muted-foreground">Niveau</div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Membre depuis {user.joinDate}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres du compte
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
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
                  <ProfileSettings user={user} setUser={setUser} />
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
