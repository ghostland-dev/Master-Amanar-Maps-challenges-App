
import React from "react";
import { LibraryItem } from "./LibraryItem";

interface LibraryItemType {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number | null;
  type: string;
  difficulty: string;
  author: string | null;
  url: string;
  image: string;
  content: string;
  premium: boolean;
}

interface UserProgressType {
  itemId: string;
  progress: number;
  completed: boolean;
}

interface LibraryItemsListProps {
  items: LibraryItemType[];
  userProgress: UserProgressType[];
  hasPremiumAccess: boolean;
  onPremiumItemClick: (isPremium: boolean) => void;
}

export function LibraryItemsList({ 
  items, 
  userProgress, 
  hasPremiumAccess, 
  onPremiumItemClick 
}: LibraryItemsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const progress = userProgress.find(
          (progress) => progress.itemId === item.id
        );
        const itemProgress = progress ? progress.progress : 0;
        const isCompleted = progress ? progress.completed : false;

        return (
          <LibraryItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            duration={item.duration}
            progress={itemProgress}
            completed={isCompleted}
            premium={item.premium}
            hasPremiumAccess={hasPremiumAccess}
            onPremiumClick={() => onPremiumItemClick(item.premium)}
          />
        );
      })}
    </div>
  );
}
