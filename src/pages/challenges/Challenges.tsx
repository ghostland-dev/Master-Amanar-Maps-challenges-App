
import { useState, useEffect } from "react";
import { challengesData } from "@/utils/challenge";
import { SortOption } from "./types";
import ChallengeFilters from "./components/ChallengeFilters";
import ChallengeList from "./components/ChallengeList";
import ChallengeDisplayModeTabs from "./components/ChallengeDisplayModeTabs";
import type { Challenge } from "@/utils/challenge/types";

// Function to ensure difficulty is one of the accepted values
const normalizeDifficulty = (difficulty: string): "beginner" | "intermediate" | "advanced" => {
  if (difficulty === "beginner" || difficulty === "intermediate" || difficulty === "advanced") {
    return difficulty as "beginner" | "intermediate" | "advanced";
  }
  return "beginner"; // Default fallback
};

// Mapping challenge objects to an array with IDs
const mappedChallengesData: Array<Challenge & { id: string }> = [
  { ...challengesData.dropshippingChallenge.dropshippingChallenge, id: "1" },
  { ...challengesData.cryptoChallenge.cryptoChallenge, id: "2" },
  { ...challengesData.arbitrageChallenge.arbitrageChallenge, id: "3" },
  { ...challengesData.affiliationChallenge.affiliationChallenge, id: "4" },
  { ...challengesData.copywritingChallenge.copywritingChallenge, id: "5" },
  { ...challengesData.nftChallenge.nftChallenge, id: "6" },
  { ...challengesData.achatReventeChallenge.achatReventeChallenge, id: "7" },
  { ...challengesData.marketingChallenge.marketingChallenge, id: "8" },
];

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [filteredChallenges, setFilteredChallenges] = useState(mappedChallengesData);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Filter challenges based on search term, category, and difficulty
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call/data processing delay
    const timer = setTimeout(() => {
      const filtered = mappedChallengesData.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === "all" || 
                              challenge.category === selectedCategory;
        
        const matchesDifficulty = selectedDifficulty === "all" || 
                                challenge.difficulty === selectedDifficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
      });
      
      setFilteredChallenges(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
  };

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Challenges</h1>
          <p className="text-muted-foreground mb-6">
            Explorez nos challenges pour développer vos compétences et atteindre vos objectifs.
          </p>
        </div>

        {/* Filters */}
        <ChallengeFilters
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
          categoryFilter={selectedCategory}
          setCategoryFilter={setSelectedCategory}
          difficultyFilter={selectedDifficulty}
          setDifficultyFilter={setSelectedDifficulty}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filtersVisible={filtersVisible}
          setFiltersVisible={setFiltersVisible}
          resetFilters={resetFilters}
        />

        {/* Challenge List for immediate display */}
        <ChallengeList 
          challenges={filteredChallenges} 
          resetFilters={resetFilters}
        />

        {/* Challenge Display with Tabs */}
        <div>
          <ChallengeDisplayModeTabs
            displayMode={displayMode}
            isLoading={isLoading}
            filteredChallenges={filteredChallenges}
            resetFilters={resetFilters}
            normalizeDifficulty={normalizeDifficulty}
          />
        </div>
      </div>
    </div>
  );
};

export default Challenges;
