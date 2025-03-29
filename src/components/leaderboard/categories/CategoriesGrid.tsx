
import React from "react";
import { CategoryCard } from "./CategoryCard";
import { LucideIcon } from "lucide-react";

interface CategoryStats {
  participants: number;
  challengesCompleted: number;
  avgXp: number;
}

interface CategoryData {
  id: string;
  name: string;
  icon: LucideIcon;
  stats: CategoryStats;
}

interface CategoriesGridProps {
  categories: CategoryData[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export const CategoriesGrid = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategoriesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {categories.map(category => (
        <CategoryCard 
          key={category.id} 
          id={category.id}
          name={category.name}
          icon={category.icon}
          stats={category.stats}
          isSelected={selectedCategory === category.id}
          onClick={() => onCategorySelect(category.id)}
        />
      ))}
    </div>
  );
};
