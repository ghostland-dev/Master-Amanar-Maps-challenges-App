
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";

interface ProfileStatsProps {
  userId: string;
}

const xpHistoryData = [
  { month: "Jan", xp: 200 },
  { month: "Fév", xp: 350 },
  { month: "Mar", xp: 450 },
  { month: "Avr", xp: 320 },
  { month: "Mai", xp: 500 },
  { month: "Juin", xp: 650 },
];

const challengesCompletionData = [
  { name: "Budget", value: 3 },
  { name: "Épargne", value: 2 },
  { name: "Investissement", value: 1 },
  { name: "Dettes", value: 2 },
];

const simulationsData = [
  { month: "Jan", count: 5 },
  { month: "Fév", count: 8 },
  { month: "Mar", count: 12 },
  { month: "Avr", count: 6 },
  { month: "Mai", count: 10 },
  { month: "Juin", count: 7 },
];

const activityData = [
  { day: "Lun", value: 4 },
  { day: "Mar", value: 2 },
  { day: "Mer", value: 5 },
  { day: "Jeu", value: 3 },
  { day: "Ven", value: 6 },
  { day: "Sam", value: 1 },
  { day: "Dim", value: 2 },
];

export function ProfileStats({ userId }: ProfileStatsProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [userId]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes Statistiques</CardTitle>
        <CardDescription>
          Visualisez votre activité et progression sur la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="xp">
          <TabsList className="mb-4 grid grid-cols-4">
            <TabsTrigger value="xp">XP</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="simulators">Simulateurs</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="xp">
            <div className="h-80">
              <LineChart 
                data={xpHistoryData} 
                index="month" 
                categories={["xp"]} 
                colors={["#3b82f6"]} 
                valueFormatter={(value) => `${value} XP`}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="challenges">
            <div className="h-80">
              <PieChart 
                data={challengesCompletionData} 
                index="name" 
                category="value" 
                colors={["#3b82f6", "#0ea5e9", "#6366f1", "#8b5cf6"]} 
                valueFormatter={(value) => `${value} challenges`}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="simulators">
            <div className="h-80">
              <BarChart 
                data={simulationsData} 
                index="month" 
                categories={["count"]} 
                colors={["#0ea5e9"]} 
                valueFormatter={(value) => `${value} utilisations`}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="h-80">
              <BarChart 
                data={activityData} 
                index="day" 
                categories={["value"]} 
                colors={["#6366f1"]} 
                valueFormatter={(value) => `${value} sessions`}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
