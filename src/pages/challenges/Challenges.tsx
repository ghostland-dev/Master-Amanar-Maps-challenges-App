
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import ChallengeCard from "@/components/ChallengeCard"; // Fixed import
import { ContextualPopover } from "@/components/navigation/ContextualPopover";
import { AnimatePresence, motion } from "framer-motion";
import { dropshippingChallenge, cryptoChallenge, arbitrageChallenge,
  affiliationChallenge, copywritingChallenge, nftChallenge,
  achatReventeChallenge, marketingChallenge } from "@/utils/challenge";
import type { Challenge } from "@/utils/challenge/types";

// Mapping challenge objects to an array with IDs
const challengesData: Array<Challenge & { id: string }> = [
  { ...dropshippingChallenge, id: "1" },
  { ...cryptoChallenge, id: "2" },
  { ...arbitrageChallenge, id: "3" },
  { ...affiliationChallenge, id: "4" },
  { ...copywritingChallenge, id: "5" },
  { ...nftChallenge, id: "6" },
  { ...achatReventeChallenge, id: "7" },
  { ...marketingChallenge, id: "8" },
];

const categories = [
  { label: "Tous", value: "all" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Marketing", value: "marketing" },
  { label: "Crypto", value: "crypto" },
  { label: "Affiliation", value: "affiliation" },
  { label: "Social Media", value: "social" },
];

const difficultyLevels = [
  { label: "Tous niveaux", value: "all" },
  { label: "Débutant", value: "beginner" },
  { label: "Intermédiaire", value: "intermediate" },
  { label: "Avancé", value: "advanced" },
];

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [filteredChallenges, setFilteredChallenges] = useState(challengesData);
  const [isLoading, setIsLoading] = useState(true);

  // Filter challenges based on search term, category, and difficulty
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call/data processing delay
    const timer = setTimeout(() => {
      const filtered = challengesData.filter(challenge => {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un challenge..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            {/* Category Filter */}
            <ContextualPopover
              trigger={
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Catégorie
                </Button>
              }
              content={
                <div className="bg-popover rounded-md shadow-md border p-2 min-w-[200px]">
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.value)}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>
              }
              contentClassName="w-[200px]"
            />

            {/* Difficulty Filter */}
            <ContextualPopover
              trigger={
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Difficulté
                </Button>
              }
              content={
                <div className="bg-popover rounded-md shadow-md border p-2 min-w-[200px]">
                  <div className="space-y-1">
                    {difficultyLevels.map((level) => (
                      <Button
                        key={level.value}
                        variant={selectedDifficulty === level.value ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedDifficulty(level.value)}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>
              }
              contentClassName="w-[200px]"
            />

            {/* Display Mode Toggle */}
            <Tabs defaultValue="grid" value={displayMode} onValueChange={(v) => setDisplayMode(v as "grid" | "list")}>
              <TabsList className="h-10">
                <TabsTrigger value="grid" className="px-3">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== "all" && (
            <Badge variant="outline" className="py-1 px-3">
              {categories.find(c => c.value === selectedCategory)?.label || selectedCategory}
              <button 
                className="ml-2 hover:text-destructive"
                onClick={() => setSelectedCategory("all")}
              >
                ×
              </button>
            </Badge>
          )}
          
          {selectedDifficulty !== "all" && (
            <Badge variant="outline" className="py-1 px-3">
              {difficultyLevels.find(d => d.value === selectedDifficulty)?.label || selectedDifficulty}
              <button 
                className="ml-2 hover:text-destructive"
                onClick={() => setSelectedDifficulty("all")}
              >
                ×
              </button>
            </Badge>
          )}
          
          {(selectedCategory !== "all" || selectedDifficulty !== "all") && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>

        {/* Challenge Display */}
        <div>
          <Tabs value={displayMode} className="w-full">
            <TabsContent value="grid" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-video bg-muted rounded-t-lg"></div>
                      <div className="h-48 bg-card rounded-b-lg p-4 space-y-3">
                        <div className="h-5 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                        <div className="h-8 bg-muted rounded w-full mt-4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredChallenges.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <AnimatePresence>
                    {filteredChallenges.map((challenge) => (
                      <motion.div key={challenge.id} variants={itemVariants}>
                        <ChallengeCard
                          id={challenge.id}
                          title={challenge.title}
                          description={challenge.description}
                          category={challenge.category || ""}
                          icon={challenge.icon}
                          difficulty={challenge.difficulty}
                          duration={challenge.duration || ""}
                          xp={challenge.xp || 0}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucun challenge ne correspond à votre recherche.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedDifficulty("all");
                    }}
                  >
                    Réinitialiser la recherche
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse flex bg-card rounded-lg overflow-hidden">
                      <div className="w-1/4 bg-muted"></div>
                      <div className="w-3/4 p-4 space-y-3">
                        <div className="h-5 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="h-8 bg-muted rounded w-1/4"></div>
                          <div className="h-4 bg-muted rounded w-1/6"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredChallenges.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredChallenges.map((challenge) => (
                    <motion.div 
                      key={challenge.id}
                      variants={itemVariants}
                      className="bg-card border rounded-lg overflow-hidden flex flex-col md:flex-row"
                    >
                      <div className="w-full md:w-1/4 aspect-video md:aspect-auto">
                        <img 
                          src={challenge.image || "/placeholder.svg"} 
                          alt={challenge.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="p-4 md:p-6 flex-1">
                        <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                        <p className="text-muted-foreground line-clamp-2 mb-4">{challenge.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary">{challenge.category}</Badge>
                          <Badge variant="outline">{challenge.difficulty}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button asChild>
                            <a href={`/challenge/${challenge.id}`}>Voir le challenge</a>
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            {challenge.duration}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucun challenge ne correspond à votre recherche.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedDifficulty("all");
                    }}
                  >
                    Réinitialiser la recherche
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
