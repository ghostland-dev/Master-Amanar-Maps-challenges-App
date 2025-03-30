
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  
  // Filter tutorials based on search and filters
  const filteredTutorials = tutorialsData
    .filter(tutorial => 
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(tutorial => categoryFilter ? tutorial.category === categoryFilter : true)
    .filter(tutorial => levelFilter ? tutorial.level === levelFilter : true);

  // Extract unique categories and levels for filters
  const categories = [...new Set(tutorialsData.map(tutorial => tutorial.category))];
  const levels = [...new Set(tutorialsData.map(tutorial => tutorial.level))];

  return (
    <MainLayout title="Tutoriels" description="Apprenez pas à pas avec nos tutoriels détaillés">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Tutoriels</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Des guides pas à pas pour vous aider à développer vos compétences 
            et maîtriser les outils essentiels pour réussir en ligne.
          </p>
          
          {/* Search and filters */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher un tutoriel..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les niveaux</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Tutorials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial) => (
            <Link 
              to={`/tutorials/${tutorial.id}`} 
              key={tutorial.id}
              className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
                {tutorial.premium && (
                  <Badge variant="secondary" className="absolute top-3 right-3 bg-yellow-500/90 text-white">
                    Premium
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <Badge className="bg-primary/10 text-primary border-none">{tutorial.category}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{tutorial.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tutorial.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                    {tutorial.level}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Voir le tutoriel
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredTutorials.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">Aucun tutoriel ne correspond à vos critères.</p>
            <Button onClick={() => {
              setSearchTerm("");
              setCategoryFilter("");
              setLevelFilter("");
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// Mock data for tutorials
const tutorialsData = [
  {
    id: 1,
    title: "Comment configurer une boutique Shopify en 1 heure",
    description: "Un guide rapide pour créer et configurer votre première boutique e-commerce sur Shopify, même si vous débutez.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
    category: "E-commerce",
    level: "Débutant",
    duration: "45 min",
    premium: false
  },
  {
    id: 2,
    title: "Maîtriser les annonces Facebook pour l'affiliation",
    description: "Apprenez à créer des campagnes publicitaires sur Facebook qui convertissent pour vos produits d'affiliation.",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2670&auto=format&fit=crop",
    category: "Marketing",
    level: "Intermédiaire",
    duration: "1h20",
    premium: true
  },
  {
    id: 3,
    title: "Créer des NFTs qui se vendent",
    description: "De la conception à la mise en vente, découvrez comment créer et vendre vos premiers NFTs sur les principales plateformes.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop",
    category: "Crypto",
    level: "Intermédiaire",
    duration: "2h",
    premium: true
  },
  {
    id: 4,
    title: "Introduction au dropshipping avec AliExpress",
    description: "Comment démarrer votre business de dropshipping en utilisant AliExpress comme fournisseur principal.",
    image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=2831&auto=format&fit=crop",
    category: "E-commerce",
    level: "Débutant",
    duration: "1h",
    premium: false
  },
  {
    id: 5,
    title: "Copywriting persuasif pour pages de vente",
    description: "Les techniques de copywriting qui transforment les visiteurs en clients. Structure et formules éprouvées.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
    category: "Copywriting",
    level: "Intermédiaire",
    duration: "1h30",
    premium: false
  },
  {
    id: 6,
    title: "Trading de crypto pour débutants",
    description: "Les bases pour débuter dans le trading de crypto-monnaies sans se ruiner. Stratégies simples et gestion des risques.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2574&auto=format&fit=crop",
    category: "Crypto",
    level: "Débutant",
    duration: "1h15",
    premium: false
  },
];

export default Tutorials;
