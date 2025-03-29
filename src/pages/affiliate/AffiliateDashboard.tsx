
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as LinkIcon, DollarSign, Users, TrendingUp, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";

const AffiliateDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "FinQuest - Dashboard Affilié";
  }, []);

  return (
    <MainLayout title="Dashboard Affilié" description="Gérez votre programme d'affiliation FinQuest">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Affilié</h1>
            <p className="text-muted-foreground">
              Bienvenue {user?.name} ! Suivez vos performances et gérez vos liens d'affiliation.
            </p>
          </div>
          <Button>
            <LinkIcon className="mr-2 h-4 w-4" />
            Créer un nouveau lien
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">1,245 €</CardTitle>
              <CardDescription>Revenus du mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+18% vs mois dernier</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">87</CardTitle>
              <CardDescription>Nouveaux inscrits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+12 cette semaine</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">5.2%</CardTitle>
              <CardDescription>Taux de conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+0.8% vs moyenne</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">2,450 €</CardTitle>
              <CardDescription>Commissions en attente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Prochain paiement: 15/06</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="links" className="mb-10">
          <TabsList className="mb-6">
            <TabsTrigger value="links">Mes liens</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="links" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  Liens d'affiliation
                </CardTitle>
                <CardDescription>Gérez vos liens et suivez leurs performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4 gap-2">
                    <div>
                      <p className="font-medium">Page d'accueil principale</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">https://finquest.com/?ref=affiliate123</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        <p>2,145 clics</p>
                        <p className="text-muted-foreground">98 conversions</p>
                      </div>
                      <Button size="sm" variant="outline">Copier</Button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4 gap-2">
                    <div>
                      <p className="font-medium">Landing challenges débutants</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">https://finquest.com/challenges/debutants?ref=affiliate123</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        <p>1,830 clics</p>
                        <p className="text-muted-foreground">75 conversions</p>
                      </div>
                      <Button size="sm" variant="outline">Copier</Button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4 gap-2">
                    <div>
                      <p className="font-medium">Offre premium</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">https://finquest.com/premium?ref=affiliate123</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        <p>950 clics</p>
                        <p className="text-muted-foreground">42 conversions</p>
                      </div>
                      <Button size="sm" variant="outline">Copier</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary">
                  Voir tous les liens
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance des campagnes
                </CardTitle>
                <CardDescription>Analyse détaillée de vos campagnes d'affiliation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Graphique d'analyse des performances</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Historique des paiements
                </CardTitle>
                <CardDescription>Suivi de vos commissions et paiements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Mai 2023</p>
                      <p className="text-sm text-muted-foreground">Payé le 15/06/2023</p>
                    </div>
                    <p className="font-medium">1,850 €</p>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Avril 2023</p>
                      <p className="text-sm text-muted-foreground">Payé le 15/05/2023</p>
                    </div>
                    <p className="font-medium">1,620 €</p>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Mars 2023</p>
                      <p className="text-sm text-muted-foreground">Payé le 15/04/2023</p>
                    </div>
                    <p className="font-medium">1,380 €</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary">
                  Historique complet
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top affiliés ce mois
              </CardTitle>
              <CardDescription>Voyez où vous vous situez par rapport aux autres</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <p>David M.</p>
                  </div>
                  <p className="font-medium">4,250 €</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <p>Sophie T.</p>
                  </div>
                  <p className="font-medium">3,820 €</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-600/50 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <p>Thomas L.</p>
                  </div>
                  <p className="font-medium">3,150 €</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">8</div>
                    <p>Vous</p>
                  </div>
                  <p className="font-medium">1,245 €</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Ressources marketing
              </CardTitle>
              <CardDescription>Outils pour augmenter vos conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-full">
                      <LinkIcon className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="font-medium">Bannières publicitaires</p>
                  </div>
                  <Button size="sm" variant="ghost">Télécharger</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-full">
                      <Users className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="font-medium">Landing pages templates</p>
                  </div>
                  <Button size="sm" variant="ghost">Accéder</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-full">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                    </div>
                    <p className="font-medium">Guide de démarrage</p>
                  </div>
                  <Button size="sm" variant="ghost">Consulter</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AffiliateDashboard;
