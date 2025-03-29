
import React from "react";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { LibraryHeader } from "@/components/library/LibraryHeader";
import { LibrarySearch } from "@/components/library/LibrarySearch";
import { LibraryFilterDialog } from "@/components/library/LibraryFilterDialog";
import { LibraryItemsList } from "@/components/library/LibraryItemsList";
import { mockLibraryItems, mockUserProgress, mockSubscription } from "../data/mock";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Library = () => {
  const [libraryItems, setLibraryItems] = useState(mockLibraryItems);
  const [userProgress, setUserProgress] = useState(mockUserProgress);
  const [subscription, setSubscription] = useState(mockSubscription);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [premiumFilter, setPremiumFilter] = useState<"all" | "free" | "premium">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Amanar Map - Bibliothèque";

    // In a real application, we would fetch the user's subscription status from the backend
    if (user && user.role === "admin") {
      setSubscription({ hasPremium: true, expiresAt: null });
    }
  }, [user]);

  const handleFilterChange = (values: {
    category?: string;
    type?: string;
    difficulty?: string;
    completed?: boolean;
    premium?: "all" | "free" | "premium";
    search?: string;
  }) => {
    setSelectedCategory(values.category || "");
    setSelectedType(values.type || "");
    setSelectedDifficulty(values.difficulty || "");
    setIsCompleted(values.completed || false);
    setPremiumFilter(values.premium || "all");
    setSearchQuery(values.search || "");
    setIsFilterDialogOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
    setSelectedDifficulty("");
    setIsCompleted(false);
    setPremiumFilter("all");
    setSearchQuery("");
  };

  const handlePremiumItemClick = (isPremium: boolean) => {
    if (isPremium && !subscription.hasPremium) {
      toast({
        title: "Contenu premium",
        description: "Ce contenu est réservé aux membres premium. Abonnez-vous pour y accéder.",
        variant: "destructive",
      });
    }
  };

  const filteredItems = libraryItems.filter((item) => {
    const categoryMatch = selectedCategory
      ? item.category === selectedCategory
      : true;
    const typeMatch = selectedType ? item.type === selectedType : true;
    const difficultyMatch = selectedDifficulty
      ? item.difficulty === selectedDifficulty
      : true;
    const completedMatch = isCompleted
      ? userProgress.find((progress) => progress.itemId === item.id)?.completed
      : true;
    const searchMatch = searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const premiumMatch = 
      premiumFilter === "all" ? true :
      premiumFilter === "free" ? !item.premium :
      item.premium;

    return (
      categoryMatch &&
      typeMatch &&
      difficultyMatch &&
      completedMatch &&
      searchMatch &&
      premiumMatch
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "relevance") {
      return 0;
    } else if (sortOrder === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "duration") {
      const durationA = a.duration || 0;
      const durationB = b.duration || 0;
      return durationA - durationB;
    }
    return 0;
  });

  return (
    <MainLayout 
      title="Bibliothèque" 
      description="Découvrez des ressources pour développer vos compétences financières"
    >
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <LibraryHeader 
            title="Bibliothèque"
            description="Découvrez des ressources pour développer vos compétences financières"
            itemCount={filteredItems.length}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <LibrarySearch 
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            setIsFilterDialogOpen={setIsFilterDialogOpen}
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {premiumFilter !== "all" && (
            <Badge 
              variant="outline" 
              className="bg-secondary/30 hover:bg-secondary/50 cursor-pointer"
              onClick={() => setPremiumFilter("all")}
            >
              {premiumFilter === "free" ? "Gratuit" : "Premium"} ×
            </Badge>
          )}
          {selectedCategory && (
            <Badge 
              variant="outline" 
              className="bg-secondary/30 hover:bg-secondary/50 cursor-pointer"
              onClick={() => setSelectedCategory("")}
            >
              {selectedCategory} ×
            </Badge>
          )}
          {selectedType && (
            <Badge 
              variant="outline" 
              className="bg-secondary/30 hover:bg-secondary/50 cursor-pointer"
              onClick={() => setSelectedType("")}
            >
              {selectedType} ×
            </Badge>
          )}
          {selectedDifficulty && (
            <Badge 
              variant="outline" 
              className="bg-secondary/30 hover:bg-secondary/50 cursor-pointer"
              onClick={() => setSelectedDifficulty("")}
            >
              {selectedDifficulty} ×
            </Badge>
          )}
          {isCompleted && (
            <Badge 
              variant="outline" 
              className="bg-secondary/30 hover:bg-secondary/50 cursor-pointer"
              onClick={() => setIsCompleted(false)}
            >
              Complété ×
            </Badge>
          )}
        </div>

        <LibraryFilterDialog
          isOpen={isFilterDialogOpen}
          onOpenChange={setIsFilterDialogOpen}
          defaultValues={{
            category: selectedCategory,
            type: selectedType,
            difficulty: selectedDifficulty,
            completed: isCompleted,
            premium: premiumFilter,
            search: searchQuery,
          }}
          onSubmit={handleFilterChange}
          onReset={handleResetFilters}
        />

        <LibraryItemsList 
          items={sortedItems}
          userProgress={userProgress}
          hasPremiumAccess={subscription.hasPremium}
          onPremiumItemClick={handlePremiumItemClick}
        />
      </div>
    </MainLayout>
  );
};

export default Library;
