
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeaderboardFiltersProps {
  period: string;
  category: string;
  onPeriodChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const LeaderboardFilters = ({ 
  period, 
  category, 
  onPeriodChange, 
  onCategoryChange 
}: LeaderboardFiltersProps) => {
  return (
    <div className="flex mt-3 md:mt-0 space-x-3">
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Période" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Aujourd'hui</SelectItem>
          <SelectItem value="this-week">Cette semaine</SelectItem>
          <SelectItem value="this-month">Ce mois</SelectItem>
          <SelectItem value="all-time">Tout le temps</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          <SelectItem value="investment">Investissement</SelectItem>
          <SelectItem value="saving">Épargne</SelectItem>
          <SelectItem value="budget">Budget</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
