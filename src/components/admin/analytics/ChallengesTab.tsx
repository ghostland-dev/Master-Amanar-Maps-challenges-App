
import { ChartCard } from "./ChartCard";
import { ChallengeTable } from "./ChallengeTable";
import { PieChart, BarChart } from "@/components/ui/chart";
import { challengeCompletionData, challengeEngagementData, challengePerformanceData } from "./data";

export const ChallengesTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard 
          title="Répartition des complétions" 
          description="Challenges complétés par catégorie"
        >
          <PieChart 
            data={challengeCompletionData} 
            index="name" 
            category="value" 
            colors={["#3b82f6", "#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef", "#ec4899"]}
            valueFormatter={(value) => `${value} complétions`}
          />
        </ChartCard>

        <ChartCard 
          title="Taux d'engagement" 
          description="Progression moyenne par catégorie"
        >
          <BarChart 
            data={challengeEngagementData} 
            index="category" 
            categories={["rate"]} 
            colors={["#0ea5e9"]} 
            valueFormatter={(value) => `${value}%`}
          />
        </ChartCard>
      </div>

      <ChartCard 
        title="Performance des Challenges" 
        description="Analyse des taux de complétion et d'abandon"
      >
        <ChallengeTable 
          challenges={challengePerformanceData.map(challenge => ({
            ...challenge,
            participants: challenge.starts,
            completionRate: 100 - (challenge.abandonRate || 0)
          }))} 
          showRating={true} 
          showAbandonRate={true} 
        />
      </ChartCard>
    </div>
  );
};
