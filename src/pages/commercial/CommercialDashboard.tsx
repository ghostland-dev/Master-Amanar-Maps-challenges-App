
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, PhoneCall, Calendar, BarChart3, ChevronRight, Target, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";

const CommercialDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "FinQuest - Dashboard Commercial";
  }, []);

  return (
    <MainLayout title="Dashboard Commercial" description="Gérez vos clients et vos ventes">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Commercial</h1>
            <p className="text-muted-foreground">
              Bienvenue {user?.name} ! Suivez vos objectifs et gérez vos prospects.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Planifier un RDV
            </Button>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Nouveau prospect
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">85,230 €</CardTitle>
              <CardDescription>CA du trimestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-green-500">+12% vs objectif</div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">24</CardTitle>
              <CardDescription>Contrats signés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">80% de l'objectif</div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">38</CardTitle>
              <CardDescription>Prospects actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-amber-500">12 à relancer</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">42%</CardTitle>
              <CardDescription>Taux de conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+5% vs moyenne équipe</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pipeline" className="mb-10">
          <TabsList className="mb-6">
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="activities">Activités</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Pipeline de vente
                </CardTitle>
                <CardDescription>Prospects par étape du cycle de vente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Qualification (14)</span>
                      <span>28,500 €</span>
                    </div>
                    <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                      <div className="bg-blue-500/70 h-3 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Proposition (12)</span>
                      <span>56,200 €</span>
                    </div>
                    <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                      <div className="bg-amber-500/70 h-3 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Négociation (8)</span>
                      <span>74,800 €</span>
                    </div>
                    <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                      <div className="bg-purple-500/70 h-3 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Closing (4)</span>
                      <span>42,500 €</span>
                    </div>
                    <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary">
                  Voir détails du pipeline
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Opportunités à fort potentiel
                  </CardTitle>
                  <CardDescription>Prospects avec une probabilité élevée de conversion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Entreprise XYZ</p>
                      <p className="text-sm text-muted-foreground">Enterprise - 32,500 €</p>
                    </div>
                    <Button size="sm">Contacter</Button>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Startup ABC</p>
                      <p className="text-sm text-muted-foreground">Premium - 8,750 €</p>
                    </div>
                    <Button size="sm">Contacter</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Boutique 123</p>
                      <p className="text-sm text-muted-foreground">Premium - 12,250 €</p>
                    </div>
                    <Button size="sm">Contacter</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PhoneCall className="h-5 w-5 text-primary" />
                    Relances à effectuer
                  </CardTitle>
                  <CardDescription>Contacts à suivre cette semaine</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">Marie Dupont - Société A</p>
                        <p className="text-sm text-muted-foreground">Dernier contact: il y a 15 jours</p>
                      </div>
                      <Button size="sm" variant="outline">Appeler</Button>
                    </div>
                    <div className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">Jean Martin - Société B</p>
                        <p className="text-sm text-muted-foreground">Dernier contact: il y a 10 jours</p>
                      </div>
                      <Button size="sm" variant="outline">Appeler</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Sophie Legrand - Société C</p>
                        <p className="text-sm text-muted-foreground">Dernier contact: il y a 8 jours</p>
                      </div>
                      <Button size="sm" variant="outline">Appeler</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Portefeuille clients</CardTitle>
                <CardDescription>Liste de vos clients actifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-3 font-medium bg-muted/50">
                    <div>Client</div>
                    <div>Plan</div>
                    <div>Valeur annuelle</div>
                    <div>Statut</div>
                    <div className="text-right">Action</div>
                  </div>
                  <div className="grid grid-cols-5 p-3 border-t items-center">
                    <div>Entreprise ABC</div>
                    <div>Enterprise</div>
                    <div>45,000 €</div>
                    <div><span className="inline-block px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-600">Actif</span></div>
                    <div className="text-right"><Button size="sm" variant="ghost">Gérer</Button></div>
                  </div>
                  <div className="grid grid-cols-5 p-3 border-t items-center">
                    <div>Société XYZ</div>
                    <div>Premium</div>
                    <div>18,500 €</div>
                    <div><span className="inline-block px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-600">Actif</span></div>
                    <div className="text-right"><Button size="sm" variant="ghost">Gérer</Button></div>
                  </div>
                  <div className="grid grid-cols-5 p-3 border-t items-center">
                    <div>Startup 123</div>
                    <div>Premium</div>
                    <div>12,800 €</div>
                    <div><span className="inline-block px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-600">Renouvellement</span></div>
                    <div className="text-right"><Button size="sm" variant="ghost">Gérer</Button></div>
                  </div>
                  <div className="grid grid-cols-5 p-3 border-t items-center">
                    <div>Boutique DEF</div>
                    <div>Premium</div>
                    <div>9,200 €</div>
                    <div><span className="inline-block px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-600">Actif</span></div>
                    <div className="text-right"><Button size="sm" variant="ghost">Gérer</Button></div>
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
          </TabsContent>
          
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Planning de la semaine
                </CardTitle>
                <CardDescription>Vos rendez-vous et tâches à venir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="bg-primary/10 p-2 rounded min-w-10 text-center">
                      <p className="text-xs font-medium text-primary">LUN</p>
                      <p className="text-lg font-bold text-primary">12</p>
                    </div>
                    <div>
                      <p className="font-medium">Réunion avec Entreprise ABC</p>
                      <p className="text-sm text-muted-foreground">10:00 - 11:30 • Présentation produit</p>
                      <p className="text-sm">Thomas Martin - Directeur Marketing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="bg-primary/10 p-2 rounded min-w-10 text-center">
                      <p className="text-xs font-medium text-primary">MAR</p>
                      <p className="text-lg font-bold text-primary">13</p>
                    </div>
                    <div>
                      <p className="font-medium">Appel de suivi avec Startup XYZ</p>
                      <p className="text-sm text-muted-foreground">14:00 - 14:30 • Discussion offre</p>
                      <p className="text-sm">Sophie Dubois - CEO</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded min-w-10 text-center">
                      <p className="text-xs font-medium text-primary">JEU</p>
                      <p className="text-lg font-bold text-primary">15</p>
                    </div>
                    <div>
                      <p className="font-medium">Démonstration Entreprise DEF</p>
                      <p className="text-sm text-muted-foreground">15:00 - 16:30 • Démo plateforme</p>
                      <p className="text-sm">Pierre Legrand - Responsable achats</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary">
                  Voir planning complet
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Performance individuelle
            </CardTitle>
            <CardDescription>Comparaison avec vos objectifs personnels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Chiffre d'affaires</span>
                  <span>85,230 € / 100,000 € (85%)</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nouveaux contrats</span>
                  <span>24 / 30 (80%)</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ventes Enterprise</span>
                  <span>3 / 5 (60%)</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Taux de renouvellement</span>
                  <span>95% / 90% (105%)</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CommercialDashboard;
