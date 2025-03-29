
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Crown, ChevronRight, BookOpen, LineChart } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DashboardPage = () => {
  const { user, hasPremiumAccess } = useAuth();
  
  useEffect(() => {
    document.title = "FinQuest - Tableau de bord";
  }, []);

  // Ensure subscription has default values if it doesn't exist
  const userSubscription = user?.subscription || { tier: 'free', active: true, expiresAt: null };
  
  return (
    <MainLayout 
      title="Tableau de bord" 
      description="Votre espace personnel FinQuest"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue, {user?.name} ! Voici un aperçu de vos activités et progrès.
            </p>
          </div>
          
          {!hasPremiumAccess && (
            <Link to="/subscriptions">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                <Crown className="mr-2 h-4 w-4" />
                Passer à Premium
              </Button>
            </Link>
          )}
        </div>
        
        {/* Subscription banner if not premium */}
        {!hasPremiumAccess && (
          <Card className="mb-8 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 p-3 rounded-full">
                    <Crown className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Passez à Premium pour débloquer tout le contenu</h3>
                    <p className="text-muted-foreground">Accédez à tous les challenges avancés et aux ressources exclusives</p>
                  </div>
                </div>
                <Link to="/subscriptions">
                  <Button>En savoir plus</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Dashboard />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/challenges" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Challenges
                </CardTitle>
                <CardDescription>Poursuivez votre apprentissage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Continuez avec les challenges pour développer vos compétences en entrepreneuriat.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-primary text-sm">
                  Voir les challenges
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
          
          <Link to="/library" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Bibliothèque
                </CardTitle>
                <CardDescription>Ressources et guides</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Explorez notre bibliothèque de ressources pour approfondir vos connaissances.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-primary text-sm">
                  Parcourir la bibliothèque
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
          
          <Link to="/simulator" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-primary" />
                  Simulateurs
                </CardTitle>
                <CardDescription>Calculateurs et prévisions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Utilisez nos outils de simulation pour planifier vos projets et estimer vos rendements.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-primary text-sm">
                  Accéder aux simulateurs
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
