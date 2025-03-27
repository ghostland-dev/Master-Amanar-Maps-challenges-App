
import { useState } from "react";
import { 
  BarChart3, Users, Award, DollarSign, TrendingUp,
  Calendar, ArrowUpRight, ArrowDownRight, Filter, ChevronDown, Check
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import AdminNavbar from "@/components/admin/AdminNavbar";

// Mock analytics data
const MOCK_USER_GROWTH = [
  { month: 'Jan', users: 120 },
  { month: 'Fév', users: 180 },
  { month: 'Mar', users: 240 },
  { month: 'Avr', users: 320 },
  { month: 'Mai', users: 290 },
  { month: 'Juin', users: 350 },
  { month: 'Juil', users: 420 },
  { month: 'Août', users: 490 },
  { month: 'Sep', users: 550 },
  { month: 'Oct', users: 600 },
  { month: 'Nov', users: 680 },
  { month: 'Déc', users: 750 },
];

const MOCK_REVENUE = [
  { month: 'Jan', revenue: 5400 },
  { month: 'Fév', revenue: 6200 },
  { month: 'Mar', revenue: 7800 },
  { month: 'Avr', revenue: 9100 },
  { month: 'Mai', revenue: 8500 },
  { month: 'Juin', revenue: 10200 },
  { month: 'Juil', revenue: 11500 },
  { month: 'Août', revenue: 13000 },
  { month: 'Sep', revenue: 14800 },
  { month: 'Oct', revenue: 16200 },
  { month: 'Nov', revenue: 17800 },
  { month: 'Déc', revenue: 19500 },
];

const MOCK_CHALLENGE_COMPLETION = [
  { challenge: 'Arbitrage de Crypto', completed: 145, started: 210 },
  { challenge: 'Revenus Affiliation', completed: 187, started: 250 },
  { challenge: 'Copywriting', completed: 98, started: 175 },
  { challenge: 'Trading de NFTs', completed: 76, started: 150 },
  { challenge: 'E-commerce', completed: 120, started: 180 },
];

const MOCK_PLAN_DISTRIBUTION = [
  { name: 'Gratuit', value: 58, color: '#64748b' },
  { name: 'Premium (Mensuel)', value: 27, color: '#3b82f6' },
  { name: 'Premium (Annuel)', value: 12, color: '#6366f1' },
  { name: 'Entreprise', value: 3, color: '#8b5cf6' },
];

const MOCK_USER_ACTIVITY = [
  { day: 'Lun', active: 420 },
  { day: 'Mar', active: 380 },
  { day: 'Mer', active: 450 },
  { day: 'Jeu', active: 520 },
  { day: 'Ven', active: 580 },
  { day: 'Sam', active: 310 },
  { day: 'Dim', active: 290 },
];

const AnalyticsManager = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Format large numbers with k, M suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate totals and growth rates from mock data
  const totalUsers = 743;
  const newUsersGrowth = 12.8;
  const totalRevenue = 154300;
  const revenueGrowth = 18.4;
  const challengesCompleted = 2345;
  const challengesGrowth = 9.2;
  const conversionRate = 7.8;
  const conversionGrowth = 2.1;

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <BarChart3 className="mr-2 h-6 w-6 text-primary" />
            Statistiques & Analytique
          </h1>
          <p className="text-muted-foreground">
            Visualisez les statistiques d'utilisation et les performances de la plateforme.
          </p>
        </div>
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Aperçu de la performance</h2>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {timeRange === "week" && "Cette semaine"}
                {timeRange === "month" && "Ce mois"}
                {timeRange === "year" && "Cette année"}
                {timeRange === "all" && "Tout le temps"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTimeRange("week")}>
                Cette semaine
                {timeRange === "week" && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("month")}>
                Ce mois
                {timeRange === "month" && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("year")}>
                Cette année
                {timeRange === "year" && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("all")}>
                Tout le temps
                {timeRange === "all" && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Utilisateurs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(totalUsers)}</div>
              <div className="flex items-center text-xs mt-1">
                {newUsersGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+{newUsersGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-red-500">{newUsersGrowth}%</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">vs précédent</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenu Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              <div className="flex items-center text-xs mt-1">
                {revenueGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+{revenueGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-red-500">{revenueGrowth}%</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">vs précédent</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Challenges Complétés
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(challengesCompleted)}</div>
              <div className="flex items-center text-xs mt-1">
                {challengesGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+{challengesGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-red-500">{challengesGrowth}%</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">vs précédent</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taux de Conversion
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <div className="flex items-center text-xs mt-1">
                {conversionGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+{conversionGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-red-500">{conversionGrowth}%</span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">vs précédent</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Croissance des utilisateurs</CardTitle>
              <CardDescription>
                Nombre total d'utilisateurs inscrits par mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={MOCK_USER_GROWTH}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} utilisateurs`, 'Total']}
                      contentStyle={{ borderRadius: "8px" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      name="Utilisateurs"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenu mensuel</CardTitle>
              <CardDescription>
                Revenus générés par mois en euros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_REVENUE}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${formatCurrency(value as number)}`, 'Revenu']}
                      contentStyle={{ borderRadius: "8px" }}
                    />
                    <Bar 
                      dataKey="revenue" 
                      name="Revenu"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Progression des challenges</CardTitle>
              <CardDescription>
                Taux de complétion des challenges les plus populaires
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_CHALLENGE_COMPLETION}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 10,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="challenge" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: "8px" }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="started" 
                      name="Démarrés"
                      stackId="a"
                      fill="#94a3b8" 
                    />
                    <Bar 
                      dataKey="completed" 
                      name="Complétés"
                      stackId="a"
                      fill="#3b82f6" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribution des abonnements</CardTitle>
              <CardDescription>
                Répartition des utilisateurs par type d'abonnement
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_PLAN_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {MOCK_PLAN_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{ borderRadius: "8px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activité hebdomadaire</CardTitle>
            <CardDescription>
              Nombre d'utilisateurs actifs par jour de la semaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MOCK_USER_ACTIVITY}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} utilisateurs`, 'Actifs']}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Bar 
                    dataKey="active" 
                    name="Utilisateurs actifs"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsManager;
