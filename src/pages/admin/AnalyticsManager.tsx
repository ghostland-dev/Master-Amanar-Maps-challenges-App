
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Award, Users, CreditCard, TrendingUp, Eye, ArrowUp, ArrowDown, Target, Trophy, CheckCircle } from "lucide-react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AnalyticsManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "FinQuest - Analytics Manager";
  }, []);

  // Mock analytics data
  const overviewData = {
    totalUsers: 2487,
    userGrowth: 12.5,
    activeUsers: 1845,
    activeGrowth: 8.2,
    revenue: 8750,
    revenueGrowth: 15.3,
    completions: 3245,
    completionGrowth: 22.1,
  };

  const challengeCompletionData = [
    { name: "Dropshipping", value: 385 },
    { name: "Crypto", value: 425 },
    { name: "Affiliation", value: 285 },
    { name: "Copywriting", value: 215 },
    { name: "Achat-Revente", value: 320 },
    { name: "NFTs", value: 175 },
  ];

  const userActivityData = [
    { month: "Jan", users: 1500 },
    { month: "Feb", users: 1750 },
    { month: "Mar", users: 1900 },
    { month: "Apr", users: 2100 },
    { month: "May", users: 2300 },
    { month: "Jun", users: 2450 },
    { month: "Jul", users: 2487 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 5200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 6400 },
    { month: "Apr", revenue: 7100 },
    { month: "May", revenue: 7800 },
    { month: "Jun", revenue: 8350 },
    { month: "Jul", revenue: 8750 },
  ];

  const topChallenges = [
    { id: "1", title: "Première vente en Dropshipping", participants: 587, completionRate: 68 },
    { id: "2", title: "Portfolio Crypto Diversifié", participants: 495, completionRate: 53 },
    { id: "3", title: "Arbitrage de produits", participants: 463, completionRate: 72 },
    { id: "4", title: "Programme d'affiliation rentable", participants: 389, completionRate: 48 },
    { id: "5", title: "Copywriting qui convertit", participants: 352, completionRate: 65 },
  ];

  const handleExportData = () => {
    toast({
      title: "Données exportées",
      description: "Les données d'analyse ont été exportées avec succès.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <AdminNavbar />
      <div className="container px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tableau de bord Analytique</h1>
            <p className="text-muted-foreground">
              Moniteur détaillé des performances et de l'engagement utilisateur
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select 
              value={timeRange} 
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">7 derniers jours</SelectItem>
                <SelectItem value="month">30 derniers jours</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Année</SelectItem>
                <SelectItem value="all">Tout</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportData}>
              Exporter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Challenges
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2">
              Revenus
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Utilisateurs Total</p>
                      <h3 className="text-2xl font-bold">{overviewData.totalUsers}</h3>
                      <div className="flex items-center mt-1 text-sm">
                        <span className={overviewData.userGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                          {overviewData.userGrowth >= 0 ? <ArrowUp className="h-3 w-3 inline mr-1" /> : <ArrowDown className="h-3 w-3 inline mr-1" />}
                          {Math.abs(overviewData.userGrowth)}%
                        </span>
                        <span className="text-muted-foreground ml-1">vs {timeRange === "month" ? "dernier mois" : "période précédente"}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Utilisateurs Actifs</p>
                      <h3 className="text-2xl font-bold">{overviewData.activeUsers}</h3>
                      <div className="flex items-center mt-1 text-sm">
                        <span className={overviewData.activeGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                          {overviewData.activeGrowth >= 0 ? <ArrowUp className="h-3 w-3 inline mr-1" /> : <ArrowDown className="h-3 w-3 inline mr-1" />}
                          {Math.abs(overviewData.activeGrowth)}%
                        </span>
                        <span className="text-muted-foreground ml-1">vs {timeRange === "month" ? "dernier mois" : "période précédente"}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Revenus Total (€)</p>
                      <h3 className="text-2xl font-bold">{overviewData.revenue}</h3>
                      <div className="flex items-center mt-1 text-sm">
                        <span className={overviewData.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                          {overviewData.revenueGrowth >= 0 ? <ArrowUp className="h-3 w-3 inline mr-1" /> : <ArrowDown className="h-3 w-3 inline mr-1" />}
                          {Math.abs(overviewData.revenueGrowth)}%
                        </span>
                        <span className="text-muted-foreground ml-1">vs {timeRange === "month" ? "dernier mois" : "période précédente"}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Complétions de Challenges</p>
                      <h3 className="text-2xl font-bold">{overviewData.completions}</h3>
                      <div className="flex items-center mt-1 text-sm">
                        <span className={overviewData.completionGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                          {overviewData.completionGrowth >= 0 ? <ArrowUp className="h-3 w-3 inline mr-1" /> : <ArrowDown className="h-3 w-3 inline mr-1" />}
                          {Math.abs(overviewData.completionGrowth)}%
                        </span>
                        <span className="text-muted-foreground ml-1">vs {timeRange === "month" ? "dernier mois" : "période précédente"}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Utilisateurs actifs</CardTitle>
                  <CardDescription>Évolution du nombre d'utilisateurs actifs</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart 
                    data={userActivityData} 
                    index="month" 
                    categories={["users"]} 
                    colors={["#3b82f6"]} 
                    valueFormatter={(value) => `${value} utilisateurs`}
                  />
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Revenus</CardTitle>
                  <CardDescription>Évolution des revenus sur la période</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={revenueData} 
                    index="month" 
                    categories={["revenue"]} 
                    colors={["#0ea5e9"]} 
                    valueFormatter={(value) => `${value} €`}
                  />
                </CardContent>
              </Card>
            </div>

            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle>Challenges les plus populaires</CardTitle>
                <CardDescription>Top 5 des challenges avec le plus de participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-muted-foreground">Challenge</th>
                        <th className="text-center p-3 text-muted-foreground">Participants</th>
                        <th className="text-center p-3 text-muted-foreground">Taux de complétion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topChallenges.map((challenge, index) => (
                        <tr key={challenge.id} className="border-b border-border hover:bg-secondary/40 transition-colors">
                          <td className="p-3 flex items-center gap-2">
                            <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                              {index === 0 && <Trophy className="h-4 w-4 text-primary" />}
                              {index !== 0 && <Target className="h-4 w-4 text-primary" />}
                            </div>
                            <span className="text-sm md:text-base">{challenge.title}</span>
                          </td>
                          <td className="p-3 text-center">{challenge.participants}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="bg-secondary w-24 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    challenge.completionRate > 70 ? "bg-green-500" : 
                                    challenge.completionRate > 50 ? "bg-blue-500" : "bg-amber-500"
                                  }`} 
                                  style={{ width: `${challenge.completionRate}%` }}
                                />
                              </div>
                              <span className="text-sm">{challenge.completionRate}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Démographie des utilisateurs</CardTitle>
                  <CardDescription>Répartition des utilisateurs par âge</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart 
                    data={[
                      { name: "18-24", value: 35 },
                      { name: "25-34", value: 42 },
                      { name: "35-44", value: 18 },
                      { name: "45+", value: 5 },
                    ]} 
                    index="name" 
                    category="value" 
                    colors={["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
                    valueFormatter={(value) => `${value}%`}
                  />
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Activité quotidienne</CardTitle>
                  <CardDescription>Nombre de connexions par jour</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart 
                    data={[
                      { day: "Lun", logins: 245 },
                      { day: "Mar", logins: 287 },
                      { day: "Mer", logins: 320 },
                      { day: "Jeu", logins: 298 },
                      { day: "Ven", logins: 275 },
                      { day: "Sam", logins: 195 },
                      { day: "Dim", logins: 187 },
                    ]} 
                    index="day" 
                    categories={["logins"]} 
                    colors={["#0ea5e9"]} 
                    valueFormatter={(value) => `${value} connexions`}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Nouveaux Utilisateurs</p>
                      <h3 className="text-2xl font-bold">321</h3>
                      <p className="text-xs text-muted-foreground mt-1">30 derniers jours</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Taux de Rétention</p>
                      <h3 className="text-2xl font-bold">74%</h3>
                      <p className="text-xs text-muted-foreground mt-1">+2.3% vs période précédente</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">XP Moyen par Utilisateur</p>
                      <h3 className="text-2xl font-bold">647</h3>
                      <p className="text-xs text-muted-foreground mt-1">+12% vs période précédente</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Répartition des complétions</CardTitle>
                  <CardDescription>Challenges complétés par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart 
                    data={challengeCompletionData} 
                    index="name" 
                    category="value" 
                    colors={["#3b82f6", "#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef", "#ec4899"]}
                    valueFormatter={(value) => `${value} complétions`}
                  />
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Taux d'engagement</CardTitle>
                  <CardDescription>Progression moyenne par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={[
                      { category: "E-commerce", rate: 72 },
                      { category: "Crypto", rate: 68 },
                      { category: "Affiliation", rate: 54 },
                      { category: "Copywriting", rate: 82 },
                      { category: "Achat-Revente", rate: 76 },
                      { category: "NFTs", rate: 47 },
                    ]} 
                    index="category" 
                    categories={["rate"]} 
                    colors={["#0ea5e9"]} 
                    valueFormatter={(value) => `${value}%`}
                  />
                </CardContent>
              </Card>
            </div>

            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle>Performance des Challenges</CardTitle>
                <CardDescription>Analyse des taux de complétion et d'abandon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-muted-foreground">Challenge</th>
                        <th className="text-center p-3 text-muted-foreground">Démarrages</th>
                        <th className="text-center p-3 text-muted-foreground">Complétions</th>
                        <th className="text-center p-3 text-muted-foreground">Taux d'abandon</th>
                        <th className="text-center p-3 text-muted-foreground">Feedback moyen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "1", title: "Première vente en Dropshipping", starts: 862, completions: 587, abandonRate: 32, rating: 4.7 },
                        { id: "2", title: "Portfolio Crypto Diversifié", starts: 935, completions: 495, abandonRate: 47, rating: 4.3 },
                        { id: "3", title: "Arbitrage de produits", starts: 645, completions: 463, abandonRate: 28, rating: 4.6 },
                        { id: "4", title: "Programme d'affiliation rentable", starts: 748, completions: 389, abandonRate: 52, rating: 4.1 },
                        { id: "5", title: "Copywriting qui convertit", starts: 542, completions: 352, abandonRate: 35, rating: 4.8 },
                      ].map((challenge) => (
                        <tr key={challenge.id} className="border-b border-border hover:bg-secondary/40 transition-colors">
                          <td className="p-3 whitespace-nowrap">{challenge.title}</td>
                          <td className="p-3 text-center">{challenge.starts}</td>
                          <td className="p-3 text-center">{challenge.completions}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              challenge.abandonRate > 40 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : 
                              challenge.abandonRate > 30 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : 
                              "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }`}>
                              {challenge.abandonRate}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Award 
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= Math.floor(challenge.rating) 
                                        ? "text-amber-500" 
                                        : star <= challenge.rating
                                        ? "text-amber-500/50"
                                        : "text-muted-foreground/20"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm">{challenge.rating}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Revenu Mensuel</p>
                      <h3 className="text-2xl font-bold">€2,850</h3>
                      <p className="text-xs text-green-500 mt-1">+15.3% vs mois précédent</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Valeur Vie Client</p>
                      <h3 className="text-2xl font-bold">€137</h3>
                      <p className="text-xs text-green-500 mt-1">+5.7% vs période précédente</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Taux de conversion</p>
                      <h3 className="text-2xl font-bold">7.2%</h3>
                      <p className="text-xs text-green-500 mt-1">+1.2% vs période précédente</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Revenus par abonnement</CardTitle>
                  <CardDescription>Répartition des revenus par type d'abonnement</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart 
                    data={[
                      { name: "Premium Mensuel", value: 45 },
                      { name: "Premium Annuel", value: 35 },
                      { name: "Pro Mensuel", value: 12 },
                      { name: "Pro Annuel", value: 8 },
                    ]} 
                    index="name" 
                    category="value" 
                    colors={["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
                    valueFormatter={(value) => `${value}%`}
                  />
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle>Évolution du chiffre d'affaires</CardTitle>
                  <CardDescription>Revenus mensuels sur les 12 derniers mois</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <LineChart 
                    data={[
                      { month: "Août", revenue: 4200 },
                      { month: "Sep", revenue: 4500 },
                      { month: "Oct", revenue: 4750 },
                      { month: "Nov", revenue: 5100 },
                      { month: "Déc", revenue: 5500 },
                      { month: "Jan", revenue: 5200 },
                      { month: "Fév", revenue: 5800 },
                      { month: "Mar", revenue: 6400 },
                      { month: "Avr", revenue: 7100 },
                      { month: "Mai", revenue: 7800 },
                      { month: "Juin", revenue: 8350 },
                      { month: "Juil", revenue: 8750 },
                    ]} 
                    index="month" 
                    categories={["revenue"]} 
                    colors={["#0ea5e9"]} 
                    valueFormatter={(value) => `€${value}`}
                    showLegend={false}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsManager;
