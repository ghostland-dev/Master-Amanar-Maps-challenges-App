
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Video, Headphones, FileText, ArrowRight, Clock } from "lucide-react";
import { LibraryCategory } from "@/components/library/LibraryCategory";
import { LibraryItemCard } from "@/components/library/LibraryItemCard";
import { LibraryFilters } from "@/components/library/LibraryFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const MOCK_ITEMS = [
  {
    id: "1",
    title: "Comprendre les bases de l'épargne",
    description: "Un guide complet pour commencer à épargner efficacement",
    type: "article",
    category: "épargne",
    image: "/placeholder.svg",
    duration: 10,
    difficulty: "débutant",
    progress: 0,
  },
  {
    id: "2",
    title: "Investir en bourse pour débutants",
    description: "Les fondamentaux pour débuter en bourse sans risque",
    type: "video",
    category: "investissement",
    image: "/placeholder.svg",
    duration: 25,
    difficulty: "débutant",
    progress: 30,
  },
  {
    id: "3",
    title: "Stratégies de remboursement de dettes",
    description: "Méthodes efficaces pour se libérer de ses dettes",
    type: "article",
    category: "dettes",
    image: "/placeholder.svg",
    duration: 15,
    difficulty: "intermédiaire",
    progress: 100,
  },
  {
    id: "4",
    title: "Podcast: Gérer son budget au quotidien",
    description: "Astuces pratiques pour optimiser son budget mensuel",
    type: "podcast",
    category: "budget",
    image: "/placeholder.svg",
    duration: 45,
    difficulty: "débutant",
    progress: 65,
  },
  {
    id: "5",
    title: "Guide d'investissement immobilier",
    description: "Comment construire et gérer un patrimoine immobilier",
    type: "ebook",
    category: "investissement",
    image: "/placeholder.svg",
    duration: 60,
    difficulty: "avancé",
    progress: 0,
  },
  {
    id: "6",
    title: "Planifier sa retraite dès 30 ans",
    description: "Stratégies d'épargne long terme pour préparer sa retraite",
    type: "article",
    category: "retraite",
    image: "/placeholder.svg",
    duration: 20,
    difficulty: "intermédiaire",
    progress: 15,
  },
  {
    id: "7",
    title: "Les crypto-monnaies expliquées simplement",
    description: "Tout ce que vous devez savoir pour débuter dans les cryptos",
    type: "video",
    category: "investissement",
    image: "/placeholder.svg",
    duration: 30,
    difficulty: "débutant",
    progress: 0,
  },
  {
    id: "8",
    title: "Optimisation fiscale pour freelances",
    description: "Comment réduire légalement vos impôts en tant qu'indépendant",
    type: "ebook",
    category: "fiscalité",
    image: "/placeholder.svg",
    duration: 40,
    difficulty: "intermédiaire",
    progress: 0,
  },
  {
    id: "9",
    title: "Masterclass: NFTs et Économie Web3",
    description: "Comprendre les NFTs et leurs applications pratiques",
    type: "video",
    category: "investissement",
    image: "/placeholder.svg",
    duration: 50,
    difficulty: "avancé",
    progress: 0,
  },
  {
    id: "10",
    title: "Budget familial: Méthodes qui fonctionnent",
    description: "Conseils pratiques pour gérer les finances d'un foyer",
    type: "article",
    category: "budget",
    image: "/placeholder.svg",
    duration: 15,
    difficulty: "débutant",
    progress: 0,
  },
  {
    id: "11",
    title: "Podcast: Devenir rentier avant 40 ans",
    description: "Témoignages et stratégies de personnes ayant atteint l'indépendance financière",
    type: "podcast",
    category: "retraite",
    image: "/placeholder.svg",
    duration: 60,
    difficulty: "intermédiaire",
    progress: 0,
  },
  {
    id: "12",
    title: "Gagner de l'argent avec le marketing d'affiliation",
    description: "Guide pas à pas pour générer des revenus passifs",
    type: "article",
    category: "revenus",
    image: "/placeholder.svg",
    duration: 25,
    difficulty: "débutant",
    progress: 0,
  },
];

const CATEGORIES = [
  { id: "épargne", name: "Épargne", icon: BookOpen, count: 12 },
  { id: "investissement", name: "Investissement", icon: BookOpen, count: 24 },
  { id: "budget", name: "Budget", icon: BookOpen, count: 18 },
  { id: "dettes", name: "Dettes", icon: BookOpen, count: 9 },
  { id: "retraite", name: "Retraite", icon: BookOpen, count: 6 },
  { id: "fiscalité", name: "Fiscalité", icon: BookOpen, count: 10 },
  { id: "revenus", name: "Revenus", icon: BookOpen, count: 7 },
];

const COLLECTIONS = [
  { id: "1", title: "Débuter en investissement", count: 5, image: "/placeholder.svg" },
  { id: "2", title: "Gérer son budget", count: 4, image: "/placeholder.svg" },
  { id: "3", title: "Indépendance financière", count: 7, image: "/placeholder.svg" },
];

const POPULAR_COURSES = MOCK_ITEMS.slice(0, 4);

const Library = () => {
  useEffect(() => {
    document.title = "FinQuest - Bibliothèque";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState(MOCK_ITEMS);
  const [courseProgress, setCourseProgress] = useState(35);
  
  // Filter library items based on search query and filters
  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || item.difficulty === selectedDifficulty;
    const matchesType = !selectedType || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });
  
  // Get count of items by progress state
  const completedCount = libraryItems.filter(item => item.progress === 100).length;
  const inProgressCount = libraryItems.filter(item => item.progress > 0 && item.progress < 100).length;
  const notStartedCount = libraryItems.filter(item => item.progress === 0).length;
  
  // Get icon based on content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText;
      case "video":
        return Video;
      case "podcast":
        return Headphones;
      case "ebook":
        return BookOpen;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-2">Bibliothèque</h1>
          <p className="text-muted-foreground mb-8">
            Explorez notre collection de ressources éducatives sur la finance
          </p>
          
          {/* Dashboard de progression */}
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <h3 className="font-medium text-lg mb-2">Votre progression globale</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vous avez complété {completedCount} ressources sur {libraryItems.length}
                  </p>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{courseProgress}%</span>
                  </div>
                  <Progress value={courseProgress} className="h-2 mb-4" />
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-background rounded-md p-3">
                      <p className="text-xl font-medium">{completedCount}</p>
                      <p className="text-xs text-muted-foreground">Terminés</p>
                    </div>
                    <div className="bg-background rounded-md p-3">
                      <p className="text-xl font-medium">{inProgressCount}</p>
                      <p className="text-xs text-muted-foreground">En cours</p>
                    </div>
                    <div className="bg-background rounded-md p-3">
                      <p className="text-xl font-medium">{notStartedCount}</p>
                      <p className="text-xs text-muted-foreground">À commencer</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Continuer</h3>
                  <div className="space-y-3">
                    {libraryItems
                      .filter(item => item.progress > 0 && item.progress < 100)
                      .slice(0, 2)
                      .map(item => (
                        <Link to={`/library/${item.id}`} key={item.id}>
                          <div className="flex items-center gap-3 bg-background hover:bg-muted rounded-lg p-3 transition-colors cursor-pointer">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                              {React.createElement(getContentTypeIcon(item.type), { className: "h-5 w-5 text-primary" })}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.title}</p>
                              <Progress value={item.progress} className="h-1.5 mt-1" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Suggestion</h3>
                  <div className="bg-background hover:bg-muted rounded-lg p-4 transition-colors h-full cursor-pointer">
                    {libraryItems
                      .filter(item => item.progress === 0)
                      .slice(0, 1)
                      .map(item => (
                        <Link to={`/library/${item.id}`} key={item.id} className="block h-full">
                          <div className="flex flex-col h-full">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                              {React.createElement(getContentTypeIcon(item.type), { className: "h-5 w-5 text-primary" })}
                            </div>
                            <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground mb-auto">{item.description}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-2">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.duration} min
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Collections populaires */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Collections</h2>
              <Button variant="link" className="font-medium">
                Voir toutes les collections
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLLECTIONS.map(collection => (
                <Card key={collection.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                  <div className="h-32 overflow-hidden relative">
                    <img 
                      src={collection.image} 
                      alt={collection.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div>
                        <h3 className="text-white font-medium">{collection.title}</h3>
                        <p className="text-white/80 text-sm">{collection.count} ressources</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Contenu populaire */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Contenu populaire</h2>
              <Button variant="link" className="font-medium">
                Voir tout le contenu populaire
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {POPULAR_COURSES.map((item) => (
                <LibraryItemCard 
                  key={item.id}
                  item={item}
                  typeIcon={getContentTypeIcon(item.type)}
                />
              ))}
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar with categories */}
            <div className="w-full md:w-1/4 space-y-6">
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="space-y-1">
                  {CATEGORIES.map(category => (
                    <LibraryCategory 
                      key={category.id}
                      category={category}
                      isSelected={selectedCategory === category.id}
                      onSelect={() => {
                        setSelectedCategory(
                          selectedCategory === category.id ? null : category.id
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="hidden md:block">
                <LibraryFilters 
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              </div>
            </div>
            
            {/* Main content area */}
            <div className="w-full md:w-3/4 space-y-6">
              {/* Search and filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher dans la bibliothèque..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="md:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>
              
              {/* Mobile filters */}
              {isFilterOpen && (
                <div className="md:hidden">
                  <LibraryFilters 
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                  />
                </div>
              )}
              
              {/* Content tabs */}
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="started">Commencés</TabsTrigger>
                  <TabsTrigger value="completed">Terminés</TabsTrigger>
                  <TabsTrigger value="bookmarked">Sauvegardés</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredItems.map((item) => (
                        <LibraryItemCard 
                          key={item.id}
                          item={item}
                          typeIcon={getContentTypeIcon(item.type)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Aucun résultat trouvé</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory(null);
                          setSelectedDifficulty(null);
                          setSelectedType(null);
                        }}
                      >
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="started" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems
                      .filter(item => item.progress > 0 && item.progress < 100)
                      .map((item) => (
                        <LibraryItemCard 
                          key={item.id}
                          item={item}
                          typeIcon={getContentTypeIcon(item.type)}
                        />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems
                      .filter(item => item.progress === 100)
                      .map((item) => (
                        <LibraryItemCard 
                          key={item.id}
                          item={item}
                          typeIcon={getContentTypeIcon(item.type)}
                        />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="bookmarked" className="mt-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Fonctionnalité bientôt disponible</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
