
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OverviewTab } from "@/components/admin/analytics/OverviewTab";
import { UsersTab } from "@/components/admin/analytics/UsersTab";
import { ChallengesTab } from "@/components/admin/analytics/ChallengesTab";
import { RevenueTab } from "@/components/admin/analytics/RevenueTab";
import { FileDown } from "lucide-react";

const AnalyticsManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "FinQuest - Analytics Manager";
  }, []);

  const handleExportData = () => {
    toast({
      title: "Données exportées",
      description: "Les données d'analyse ont été exportées avec succès.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <AdminNavbar />
      <div className="container px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto animate-fade-in">
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
            <Button variant="outline" onClick={handleExportData} className="transition-all hover:bg-primary/10">
              <FileDown className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
              Challenges
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
              Revenus
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-in">
            <OverviewTab timeRange={timeRange} />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="animate-fade-in">
            <UsersTab />
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="animate-fade-in">
            <ChallengesTab />
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="animate-fade-in">
            <RevenueTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsManager;
