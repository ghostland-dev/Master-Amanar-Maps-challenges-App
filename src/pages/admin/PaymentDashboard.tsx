
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminNavbar from "@/components/admin/AdminNavbar";
import TransactionsList from "@/components/admin/payment/TransactionsList";
import WebhookHandler from "@/components/admin/payment/WebhookHandler";
import { CreditCard, BarChart3, ArrowRightLeft, Bell, Settings } from "lucide-react";
import { BarChart } from "@/components/ui/chart/bar-chart";
import { LineChart } from "@/components/ui/chart/line-chart";
import { PieChart } from "@/components/ui/chart/pie-chart";

// Données fictives pour les graphiques
const revenueData = [
  { month: "Jan", amount: 4000 },
  { month: "Fév", amount: 5000 },
  { month: "Mar", amount: 7500 },
  { month: "Avr", amount: 8200 },
  { month: "Mai", amount: 9100 },
  { month: "Juin", amount: 12000 },
];

const transactionsByMethod = [
  { name: "Carte", value: 72 },
  { name: "PayPal", value: 21 },
  { name: "Virement", value: 7 },
];

const subscriptionsByPlan = [
  { name: "Free", value: 150 },
  { name: "Pro", value: 75 },
  { name: "Enterprise", value: 25 },
];

const PaymentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const overviewStats = [
    {
      title: "Revenu Mensuel",
      value: "12 000 €",
      change: "+15%",
      trend: "up",
    },
    {
      title: "Abonnements Actifs",
      value: "250",
      change: "+8%",
      trend: "up",
    },
    {
      title: "Taux de Conversion",
      value: "3.2%",
      change: "+0.5%",
      trend: "up",
    },
    {
      title: "Valeur Clt Moyenne",
      value: "48 €",
      change: "+2%",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-10 flex items-center space-x-4">
          <CreditCard className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Tableau de Bord Paiements</h1>
            <p className="text-muted-foreground">
              Gérez et suivez les paiements et abonnements de votre plateforme
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {overviewStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenus Mensuels</CardTitle>
                  <CardDescription>Évolution des revenus sur les 6 derniers mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={revenueData}
                    index="month"
                    categories={["amount"]}
                    colors={["primary"]}
                    valueFormatter={(value: number) => `${value} €`}
                    className="aspect-[4/3]"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des Transactions</CardTitle>
                  <CardDescription>Par méthode de paiement</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    data={transactionsByMethod}
                    index="name"
                    valueFormatter={(value: number) => `${value}%`}
                    category="value"
                    className="h-64"
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Abonnements par Plan</CardTitle>
                  <CardDescription>Répartition des utilisateurs par plan d'abonnement</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={subscriptionsByPlan}
                    index="name"
                    categories={["value"]}
                    colors={["primary"]}
                    className="aspect-video"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionsList />
          </TabsContent>
          
          <TabsContent value="webhooks">
            <WebhookHandler />
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de Paiement</CardTitle>
                <CardDescription>
                  Configurez les paramètres généraux de paiement pour votre plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Passerelles de Paiement</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Configurez vos passerelles de paiement (Stripe, PayPal)
                    </p>
                    
                    <Button onClick={() => navigate("/admin/payment-gateways")}>
                      Configurer les Passerelles
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Plans d'Abonnement</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Gérez les plans d'abonnement disponibles pour vos clients
                    </p>
                    
                    <Button onClick={() => navigate("/admin/subscriptions")}>
                      Gérer les Abonnements
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentDashboard;
