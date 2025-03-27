
import { Users, Eye, CreditCard, CheckCircle } from "lucide-react";
import { StatCard } from "./StatCard";
import { ChartCard } from "./ChartCard";
import { ChallengeTable } from "./ChallengeTable";
import { LineChart, BarChart } from "@/components/ui/chart";
import { overviewData, userActivityData, revenueData, topChallenges } from "./data";

interface OverviewTabProps {
  timeRange: string;
}

export const OverviewTab = ({ timeRange }: OverviewTabProps) => {
  // Map string timeRange to TimeRange type
  const mappedTimeRange = timeRange === "week" ? "day" : 
                           timeRange === "month" ? "month" :
                           timeRange === "year" ? "year" : "month";
                           
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Utilisateurs Total" 
          value={overviewData.totalUsers} 
          growth={overviewData.userGrowth} 
          icon={Users} 
          timeRange={mappedTimeRange} 
        />
        <StatCard 
          title="Utilisateurs Actifs" 
          value={overviewData.activeUsers} 
          growth={overviewData.activeGrowth} 
          icon={Eye} 
          timeRange={mappedTimeRange} 
        />
        <StatCard 
          title="Revenus Total (€)" 
          value={overviewData.revenue} 
          growth={overviewData.revenueGrowth} 
          icon={CreditCard} 
          timeRange={mappedTimeRange} 
        />
        <StatCard 
          title="Complétions de Challenges" 
          value={overviewData.completions} 
          growth={overviewData.completionGrowth} 
          icon={CheckCircle} 
          timeRange={mappedTimeRange} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard 
          title="Utilisateurs actifs" 
          description="Évolution du nombre d'utilisateurs actifs"
        >
          <LineChart 
            data={userActivityData} 
            index="month" 
            categories={["users"]} 
            colors={["#3b82f6"]} 
            valueFormatter={(value) => `${value} utilisateurs`}
          />
        </ChartCard>

        <ChartCard 
          title="Revenus" 
          description="Évolution des revenus sur la période"
        >
          <BarChart 
            data={revenueData} 
            index="month" 
            categories={["revenue"]} 
            colors={["#0ea5e9"]} 
            valueFormatter={(value) => `${value} €`}
          />
        </ChartCard>
      </div>

      <ChartCard 
        title="Challenges les plus populaires" 
        description="Top 5 des challenges avec le plus de participants"
      >
        <ChallengeTable challenges={topChallenges} />
      </ChartCard>
    </div>
  );
};
