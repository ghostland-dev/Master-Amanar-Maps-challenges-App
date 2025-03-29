
import React from "react";
import { PieChart } from "@/components/ui/chart";
import { Sparkles, Target, ChevronUp, Star } from "lucide-react";
import { BadgeData } from "./models";

interface BadgeDistributionProps {
  data: BadgeData[];
}

export const BadgeDistribution = ({ data }: BadgeDistributionProps) => {
  return (
    <div className="py-4">
      <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
        <div className="md:w-1/2">
          <PieChart
            data={data}
            index="name"
            category="value"
            colors={["#2563eb", "#4ade80", "#f97316", "#f43f5e"]}
            valueFormatter={(value) => `${value}%`}
            className="h-[300px]"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-lg font-medium mb-4">Types de Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center p-3 rounded-lg border border-border bg-card">
              <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                <Sparkles className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="font-medium">Investisseur</div>
                <div className="text-xs text-muted-foreground">Maîtrise des stratégies d'investissement</div>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg border border-border bg-card">
              <div className="bg-green-500/20 p-2 rounded-full mr-3">
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <div className="font-medium">Épargnant</div>
                <div className="text-xs text-muted-foreground">Atteinte des objectifs d'épargne</div>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg border border-border bg-card">
              <div className="bg-orange-500/20 p-2 rounded-full mr-3">
                <ChevronUp className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <div className="font-medium">Budget</div>
                <div className="text-xs text-muted-foreground">Gestion efficace des dépenses</div>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg border border-border bg-card">
              <div className="bg-red-500/20 p-2 rounded-full mr-3">
                <Star className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <div className="font-medium">Débutant</div>
                <div className="text-xs text-muted-foreground">Premiers pas dans l'éducation financière</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
