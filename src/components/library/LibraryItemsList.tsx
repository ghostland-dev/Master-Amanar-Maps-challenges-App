
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
  const premiumItems = items.filter(item => item.premium);
  const freeItems = items.filter(item => !item.premium);

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">Aucun contenu trouvé avec ces critères.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {premiumItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Contenu Premium
            </span>
            {!hasPremiumAccess && (
              <span className="ml-2 text-sm bg-muted py-0.5 px-2 rounded-md text-muted-foreground">
                Nécessite un abonnement
              </span>
            )}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumItems.map((item) => {
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
        </div>
      )}

      {freeItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Contenu Gratuit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeItems.map((item) => {
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
        </div>
      )}
    </div>
  );
}
