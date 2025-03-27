
import { Users, TrendingUp, Award } from "lucide-react";
import { StatCard } from "./StatCard";
import { ChartCard } from "./ChartCard";
import { PieChart, LineChart } from "@/components/ui/chart";
import { userDemographicsData, dailyActivityData, userStatsData } from "./data";

export const UsersTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard 
          title="Démographie des utilisateurs" 
          description="Répartition des utilisateurs par âge"
        >
          <PieChart 
            data={userDemographicsData} 
            index="name" 
            category="value" 
            colors={["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
            valueFormatter={(value) => `${value}%`}
          />
        </ChartCard>

        <ChartCard 
          title="Activité quotidienne" 
          description="Nombre de connexions par jour"
        >
          <LineChart 
            data={dailyActivityData} 
            index="day" 
            categories={["logins"]} 
            colors={["#0ea5e9"]} 
            valueFormatter={(value) => `${value} connexions`}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Nouveaux Utilisateurs" 
          value={userStatsData.newUsers} 
          icon={Users} 
        />
        <StatCard 
          title="Taux de Rétention" 
          value={`${userStatsData.retentionRate}%`} 
          growth={userStatsData.retentionGrowth} 
          icon={TrendingUp} 
        />
        <StatCard 
          title="XP Moyen par Utilisateur" 
          value={userStatsData.avgXp} 
          growth={userStatsData.xpGrowth} 
          icon={Award} 
        />
      </div>
    </div>
  );
};
