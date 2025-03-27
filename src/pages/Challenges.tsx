
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChallengeCard from "@/components/ChallengeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, TrendingUp, ShoppingCart, Layers, Link as LinkIcon, 
  PenTool, Award, SlidersHorizontal, X, ArrowUpDown, Award as AwardIcon 
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Chip } from "@/components/ui/chip";

type SortOption = "popular" | "newest" | "xp-high" | "xp-low" | "duration-short" | "duration-long";

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
  }, [location.search]);
  
  const challenges = [
    {
      id: "1",
      title: "Première vente en Dropshipping",
      description: "Lancez votre première boutique en ligne et réalisez une vente en dropshipping.",
      category: "ecommerce",
      icon: <Layers className="h-6 w-6 text-primary" />,
      difficulty: "beginner" as const,
      duration: "14 jours",
      xp: 300,
      participants: 587,
      steps: 12,
      isPopular: true,
      rewards: ["Badge Vendeur", "Accès au forum E-commerce"],
      completedBy: 420,
      rating: 4.7,
      progress: 65,
      isNew: false,
    },
    {
      id: "2",
      title: "Portfolio Crypto Diversifié",
      description: "Créez et gérez un portefeuille diversifié de cryptomonnaies.",
      category: "crypto",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      difficulty: "intermediate" as const,
      duration: "30 jours",
      xp: 450,
      participants: 495,
      steps: 10,
      isPopular: false,
      rewards: ["Badge Investisseur", "10€ en Bitcoin"],
      completedBy: 187,
      rating: 4.3,
      progress: 25,
      isNew: false,
    },
    {
      id: "3",
      title: "Arbitrage de produits",
      description: "Trouvez des produits sous-évalués et revendez-les à profit sur différentes plateformes.",
      category: "achat-revente",
      icon: <ShoppingCart className="h-6 w-6 text-primary" />,
      difficulty: "beginner" as const,
      duration: "21 jours",
      xp: 350,
      participants: 463,
      steps: 8,
      isPopular: false,
      rewards: ["Badge Négociateur", "Modèles de calcul de marge"],
      completedBy: 293,
      rating: 4.6,
      progress: 0,
      isNew: false,
    },
    {
      id: "4",
      title: "Programme d'affiliation rentable",
      description: "Créez un système d'affiliation qui génère des revenus récurrents.",
      category: "affiliation",
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      difficulty: "intermediate" as const,
      duration: "45 jours",
      xp: 500,
      participants: 389,
      steps: 9,
      isPopular: false,
      rewards: ["Badge Partenaire", "Guide des meilleurs programmes d'affiliation"],
      completedBy: 156,
      rating: 4.1,
      progress: 0,
      isNew: false,
    },
    {
      id: "5",
      title: "Copywriting qui convertit",
      description: "Apprenez à rédiger des textes persuasifs pour augmenter vos taux de conversion.",
      category: "copywriting",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      difficulty: "intermediate" as const,
      duration: "14 jours",
      xp: 250,
      participants: 352,
      steps: 8,
      isPopular: false,
      rewards: ["Badge Écrivain", "Modèles de textes promotionnels"],
      completedBy: 223,
      rating: 4.8,
      progress: 0,
      isNew: false,
    },
    {
      id: "6",
      title: "Trading de NFTs",
      description: "Explorez le marché des NFTs et développez une stratégie de trading efficace.",
      category: "crypto",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      difficulty: "advanced" as const,
      duration: "30 jours",
      xp: 550,
      participants: 247,
      steps: 10,
      isPopular: false,
      rewards: ["Badge Collectionneur", "NFT exclusif FinQuest"],
      completedBy: 103,
      rating: 4.4,
      progress: 0,
      isNew: true,
    },
    {
      id: "7",
      title: "Stratégie Instagram pour entrepreneurs",
      description: "Développez une présence professionnelle sur Instagram et attirez des clients qualifiés.",
      category: "marketing",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      difficulty: "beginner" as const,
      duration: "21 jours",
      xp: 320,
      participants: 578,
      steps: 7,
      isPopular: true,
      rewards: ["Badge Influenceur", "Guide de croissance Instagram"],
      completedBy: 342,
      rating: 4.6,
      progress: 0,
      isNew: true,
    },
    {
      id: "8",
      title: "Construire une audience sur YouTube",
      description: "Créez et développez une chaîne YouTube rentable dans votre domaine d'expertise.",
      category: "marketing",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      difficulty: "intermediate" as const,
      duration: "60 jours",
      xp: 480,
      participants: 312,
      steps: 12,
      isPopular: false,
      rewards: ["Badge Créateur", "Accès aux ressources premium"],
      completedBy: 124,
      rating: 4.5,
      progress: 0,
      isNew: true,
    },
  ];
  
  const categoryLabels: Record<string, string> = {
    "ecommerce": "E-commerce",
    "crypto": "Crypto",
    "achat-revente": "Achat/Revente",
    "affiliation": "Affiliation",
    "copywriting": "Copywriting",
    "marketing": "Marketing",
    "developpement": "Développement",
    "design": "Design",
  };
  
  const sortChallenges = (challenges: any[]) => {
    const sortedChallenges = [...challenges];
    
    switch (sortOption) {
      case "popular":
        return sortedChallenges.sort((a, b) => b.participants - a.participants);
      case "newest":
        return sortedChallenges.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
      case "xp-high":
        return sortedChallenges.sort((a, b) => b.xp - a.xp);
      case "xp-low":
        return sortedChallenges.sort((a, b) => a.xp - b.xp);
      case "duration-short":
        return sortedChallenges.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      case "duration-long":
        return sortedChallenges.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
      default:
        return sortedChallenges;
    }
  };

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
  
  const sortedChallenges = sortChallenges(filteredChallenges);

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
          <Tabs value={viewMode} onValueChange={setViewMode} className="mb-6">
            <TabsList className="grid grid-cols-4 mb-2 w-full sm:w-auto">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Tous
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                En cours
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Terminés
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Nouveaux
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Filters */}
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
                      <SelectItem value="">Toutes les catégories</SelectItem>
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
                      <SelectItem value="">Toutes les difficultés</SelectItem>
                      <SelectItem value="beginner">Débutant</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire</SelectItem>
                      <SelectItem value="advanced">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          
          {/* Challenge stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="glass p-4 rounded-xl flex items-center gap-3 flex-1 min-w-[200px]">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Challenges terminés</p>
                <p className="text-xl font-bold">2 / {challenges.length}</p>
              </div>
            </div>
            <div className="glass p-4 rounded-xl flex items-center gap-3 flex-1 min-w-[200px]">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">XP accumulés</p>
                <p className="text-xl font-bold">750 XP</p>
              </div>
            </div>
            <div className="glass p-4 rounded-xl flex items-center gap-3 flex-1 min-w-[200px]">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <AwardIcon className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Badges gagnés</p>
                <p className="text-xl font-bold">3 badges</p>
              </div>
            </div>
          </div>
          
          {/* Challenge list */}
          {sortedChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedChallenges.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id}
                  {...challenge}
                  category={categoryLabels[challenge.category]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="h-16 w-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Aucun challenge trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Aucun challenge ne correspond à vos critères de recherche.
              </p>
              <Button onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
