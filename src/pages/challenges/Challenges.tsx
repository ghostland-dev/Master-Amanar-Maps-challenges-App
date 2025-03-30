
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ChallengeFilters from "./components/ChallengeFilters";
import ChallengeViewTabs from "./components/ChallengeViewTabs";
import ChallengeStats from "./components/ChallengeStats";
import ChallengeList from "./components/ChallengeList";
import { sortChallenges, getChallenges } from "./utils/challengeUtils";

export type SortOption = "popular" | "newest" | "xp-high" | "xp-low" | "duration-short" | "duration-long";

const Challenges = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<string>("all");
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  useEffect(() => {
    document.title = "FinQuest - Challenges";
    
    // Get category from URL query params
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setCategoryFilter(category);
    }
    
    const view = params.get("view");
    if (view) {
      setViewMode(view);
    }
  }, [location.search]);

  const challenges = getChallenges();
  
  const filteredChallenges = challenges
    .filter((challenge) => {
      // Filter based on search query
      const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter based on category
      const matchesCategory = categoryFilter ? challenge.category === categoryFilter : true;
      
      // Filter based on difficulty
      const matchesDifficulty = difficultyFilter ? challenge.difficulty === difficultyFilter : true;
      
      // Filter based on view mode (all, in-progress, completed)
      const matchesViewMode = 
        viewMode === "all" ? true :
        viewMode === "progress" ? challenge.progress > 0 && challenge.progress < 100 :
        viewMode === "completed" ? challenge.progress === 100 :
        viewMode === "new" ? challenge.isNew :
        true;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesViewMode;
    });
  
  const sortedChallenges = sortChallenges(filteredChallenges, sortOption);

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setDifficultyFilter("");
    setSortOption("popular");
    
    toast({
      title: "Filtres réinitialisés",
      description: "Tous les challenges sont maintenant affichés",
    });
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Challenges</h1>
            <p className="text-muted-foreground">
              Développez vos compétences et augmentez vos revenus en relevant nos défis financiers
            </p>
          </div>
          
          {/* View mode tabs */}
          <ChallengeViewTabs viewMode={viewMode} setViewMode={setViewMode} />
          
          {/* Filters */}
          <ChallengeFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            filtersVisible={filtersVisible}
            setFiltersVisible={setFiltersVisible}
            resetFilters={resetFilters}
          />
          
          {/* Challenge stats */}
          <ChallengeStats challenges={challenges} />
          
          {/* Challenge list */}
          <ChallengeList 
            challenges={sortedChallenges} 
            resetFilters={resetFilters} 
          />
        </div>
      </div>
    </div>
  );
};

export default Challenges;
