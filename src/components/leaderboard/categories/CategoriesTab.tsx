
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoriesGrid } from "./CategoriesGrid";
import { CategoryLeaderboard } from "./CategoryLeaderboard";
import { ProgressionList } from "./ProgressionList";
import { CategoryData, User } from "../models";

interface CategoriesTabProps {
  categories: CategoryData[];
  users: User[];
  currentUserId: number;
}

export const CategoriesTab = ({ categories, users, currentUserId }: CategoriesTabProps) => {
  const [selectedCategory, setSelectedCategory] = useState("general");

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const categoryName = selectedCategoryData ? selectedCategoryData.name : "Général";

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Classements par catégorie</h2>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <CategoriesGrid 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect} 
      />
      
      <CategoryLeaderboard 
        categoryName={categoryName} 
        users={users} 
        currentUserId={currentUserId} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressionList title="Meilleure progression" users={users} badgeType="xp" />
        <ProgressionList title="Challenges complétés" users={users} badgeType="challenges" />
      </div>
    </>
  );
};
