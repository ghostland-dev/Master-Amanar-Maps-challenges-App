
import { CreditCard, Users, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { ChartCard } from "./ChartCard";
import { PieChart, LineChart } from "@/components/ui/chart";
import { revenueStatsData, revenueBySubscriptionData, yearlyRevenueData } from "./data";

export const RevenueTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Revenu Mensuel" 
          value={`€${revenueStatsData.monthlyRevenue}`} 
          growth={revenueStatsData.revenueGrowth} 
          icon={CreditCard} 
        />
        <StatCard 
          title="Valeur Vie Client" 
          value={`€${revenueStatsData.customerLifetimeValue}`} 
          growth={revenueStatsData.clvGrowth} 
          icon={Users} 
        />
        <StatCard 
          title="Taux de conversion" 
          value={`${revenueStatsData.conversionRate}%`} 
          growth={revenueStatsData.conversionGrowth} 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChartCard 
          title="Revenus par abonnement" 
          description="Répartition des revenus par type d'abonnement"
        >
          <PieChart 
            data={revenueBySubscriptionData} 
            index="name" 
            category="value" 
            colors={["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
            valueFormatter={(value) => `${value}%`}
          />
        </ChartCard>

        <ChartCard 
          title="Évolution du chiffre d'affaires" 
          description="Revenus mensuels sur les 12 derniers mois"
          className="h-auto"
        >
          <div className="h-80">
            <LineChart 
              data={yearlyRevenueData} 
              index="month" 
              categories={["revenue"]} 
              colors={["#0ea5e9"]} 
              valueFormatter={(value) => `€${value}`}
              showLegend={false}
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
};
