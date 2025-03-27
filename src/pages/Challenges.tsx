
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChallengeCard from "@/components/ChallengeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, ShoppingCart, Layers, Link as LinkIcon, PenTool, Award } from "lucide-react";
import { useLocation } from "react-router-dom";

const Challenges = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  
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
    },
  ];
  
  const categoryLabels: Record<string, string> = {
    "ecommerce": "E-commerce",
    "crypto": "Crypto",
    "achat-revente": "Achat/Revente",
    "affiliation": "Affiliation",
    "copywriting": "Copywriting",
    "developpement": "Développement",
    "marketing": "Marketing",
    "design": "Design",
  };
  
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? challenge.category === categoryFilter : true;
    
    const matchesDifficulty = difficultyFilter ? challenge.difficulty === difficultyFilter : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-2">Challenges</h1>
          <p className="text-muted-foreground mb-8">
            Découvrez nos challenges financiers et développez vos compétences
          </p>
          
          {/* Filters */}
          <div className="glass p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un challenge..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
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
          </div>
          
          {/* Challenge list */}
          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
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
              <Button onClick={() => {
                setSearchQuery("");
                setCategoryFilter("");
                setDifficultyFilter("");
              }}>
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
