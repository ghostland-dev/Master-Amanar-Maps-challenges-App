
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Video, Headphones, FileText } from "lucide-react";
import { LibraryCategory } from "@/components/library/LibraryCategory";
import { LibraryItemCard } from "@/components/library/LibraryItemCard";
import { LibraryFilters } from "@/components/library/LibraryFilters";

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
];

const CATEGORIES = [
  { id: "épargne", name: "Épargne", icon: BookOpen, count: 12 },
  { id: "investissement", name: "Investissement", icon: BookOpen, count: 24 },
  { id: "budget", name: "Budget", icon: BookOpen, count: 18 },
  { id: "dettes", name: "Dettes", icon: BookOpen, count: 9 },
  { id: "retraite", name: "Retraite", icon: BookOpen, count: 6 },
  { id: "fiscalité", name: "Fiscalité", icon: BookOpen, count: 10 },
];

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
  
  // Filter library items based on search query and filters
  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || item.difficulty === selectedDifficulty;
    const matchesType = !selectedType || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });
  
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
