import React from "react";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { LibraryHeader } from "@/components/library/LibraryHeader";
import { LibrarySearch } from "@/components/library/LibrarySearch";
import { LibraryFilterDialog } from "@/components/library/LibraryFilterDialog";
import { LibraryItemsList } from "@/components/library/LibraryItemsList";
import { mockLibraryItems, mockUserProgress } from "@/data/mock";

const Library = () => {
  const [libraryItems, setLibraryItems] = useState(mockLibraryItems);
  const [userProgress, setUserProgress] = useState(mockUserProgress);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  useEffect(() => {
    document.title = "Amanar Map - Bibliothèque";
  }, []);

  const handleFilterChange = (values: {
    category?: string;
    type?: string;
    difficulty?: string;
    completed?: boolean;
    search?: string;
  }) => {
    setSelectedCategory(values.category || "");
    setSelectedType(values.type || "");
    setSelectedDifficulty(values.difficulty || "");
    setIsCompleted(values.completed || false);
    setSearchQuery(values.search || "");
    setIsFilterDialogOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
    setSelectedDifficulty("");
    setIsCompleted(false);
    setSearchQuery("");
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

    return (
      categoryMatch &&
      typeMatch &&
      difficultyMatch &&
      completedMatch &&
      searchMatch
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

        <LibraryFilterDialog
          isOpen={isFilterDialogOpen}
          onOpenChange={setIsFilterDialogOpen}
          defaultValues={{
            category: selectedCategory,
            type: selectedType,
            difficulty: selectedDifficulty,
            completed: isCompleted,
            search: searchQuery,
          }}
          onSubmit={handleFilterChange}
          onReset={handleResetFilters}
        />

        <LibraryItemsList 
          items={sortedItems}
          userProgress={userProgress}
        />
      </div>
    </MainLayout>
  );
};

export default Library;
