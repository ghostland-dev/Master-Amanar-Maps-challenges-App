
import { SlidersHorizontal, Search, X, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Chip } from "@/components/ui/chip";
import { categoryLabels } from "../utils/challengeUtils";
import { SortOption } from "../types";

interface ChallengeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  filtersVisible: boolean;
  setFiltersVisible: (visible: boolean) => void;
  resetFilters: () => void;
}

const ChallengeFilters = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  difficultyFilter,
  setDifficultyFilter,
  sortOption,
  setSortOption,
  filtersVisible,
  setFiltersVisible,
  resetFilters
}: ChallengeFiltersProps) => {
  
  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "popular": return "Les plus populaires";
      case "newest": return "Les plus récents";
      case "xp-high": return "XP (décroissant)";
      case "xp-low": return "XP (croissant)";
      case "duration-short": return "Durée (plus court)";
      case "duration-long": return "Durée (plus long)";
      default: return "Trier par";
    }
  };

  return (
    <div className="glass p-6 rounded-xl mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un challenge..."
            className="pl-9 md:max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="md:flex hidden items-center gap-1"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
            {(categoryFilter || difficultyFilter) && (
              <Chip variant="primary" size="sm" className="ml-1">
                {categoryFilter && difficultyFilter ? '2' : '1'}
              </Chip>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">{getSortLabel(sortOption)}</span>
                <span className="inline sm:hidden">Trier</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSortOption("popular")}>
                Les plus populaires
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("newest")}>
                Les plus récents
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOption("xp-high")}>
                XP (décroissant)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("xp-low")}>
                XP (croissant)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOption("duration-short")}>
                Durée (plus court)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("duration-long")}>
                Durée (plus long)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(categoryFilter || difficultyFilter || searchQuery) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>
      </div>
      
      {/* Additional filters - toggleable on mobile */}
      {(filtersVisible || window.innerWidth >= 768) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par difficulté" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les difficultés</SelectItem>
                <SelectItem value="beginner">Débutant</SelectItem>
                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                <SelectItem value="advanced">Avancé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeFilters;
