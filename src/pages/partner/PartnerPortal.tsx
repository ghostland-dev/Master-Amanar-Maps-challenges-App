
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, BarChart3, GraduationCap, Trophy, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";

const PartnerPortal = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "FinQuest - Portail Partenaire";
  }, []);

  return (
    <MainLayout title="Portail Partenaire" description="Gérez votre partenariat FinQuest">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Portail Partenaire</h1>
            <p className="text-muted-foreground">
              Bienvenue {user?.name} ! Gérez vos clients et suivez vos performances.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">42</CardTitle>
              <CardDescription>Clients actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+12% ce mois</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">85%</CardTitle>
              <CardDescription>Taux de rétention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+5% par rapport à la moyenne</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">28</CardTitle>
              <CardDescription>Leads en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">8 convertis ce mois</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">4.8/5</CardTitle>
              <CardDescription>Satisfaction client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+0.2 depuis le trimestre dernier</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Gestion des clients
              </CardTitle>
              <CardDescription>Suivez et gérez vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Entreprise ABC</p>
                    <p className="text-sm text-muted-foreground">5 utilisateurs · Premium</p>
                  </div>
                  <Button size="sm" variant="outline">Voir détails</Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Startup XYZ</p>
                    <p className="text-sm text-muted-foreground">3 utilisateurs · Enterprise</p>
                  </div>
                  <Button size="sm" variant="outline">Voir détails</Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Boutique 123</p>
                    <p className="text-sm text-muted-foreground">1 utilisateur · Premium</p>
                  </div>
                  <Button size="sm" variant="outline">Voir détails</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-primary">
                Voir tous les clients
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance
              </CardTitle>
              <CardDescription>Vos indicateurs de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Objectif mensuel</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Taux de conversion</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-primary">
                Rapport détaillé
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Ressources partenaires
              </CardTitle>
              <CardDescription>Supports pour développer votre activité</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Guide de vente FinQuest</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Matériel marketing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>FAQ clients</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Comparatifs concurrentiels</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-primary">
                Centre de ressources
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Programme de fidélité
              </CardTitle>
              <CardDescription>Vos avantages partenaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Partenaire Gold</p>
                    <p className="text-xs text-muted-foreground">8650 points</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Niveau suivant: Platinum</span>
                    <span className="font-medium">86.5%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "86.5%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-primary">
                Avantages et récompenses
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PartnerPortal;
