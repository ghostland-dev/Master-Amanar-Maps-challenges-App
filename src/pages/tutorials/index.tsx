
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Filter, Clock, ArrowRight, Play, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Tutorials = () => {
  return (
    <MainLayout title="Tutoriels" description="Apprenez les compétences essentielles pour réussir en ligne">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Tutoriels et Formations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des guides étape par étape pour maîtriser les compétences essentielles du business en ligne.
            Disponibles en vidéo et en texte.
          </p>
        </div>
        
        {/* Filtres et recherche */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un tutoriel..."
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Catégorie" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="copywriting">Copywriting</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="affiliation">Affiliation</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Durée" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les durées</SelectItem>
                  <SelectItem value="short">Moins de 15 minutes</SelectItem>
                  <SelectItem value="medium">15-30 minutes</SelectItem>
                  <SelectItem value="long">Plus de 30 minutes</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les niveaux</SelectItem>
                  <SelectItem value="beginner">Débutant</SelectItem>
                  <SelectItem value="intermediate">Intermédiaire</SelectItem>
                  <SelectItem value="advanced">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Onglets */}
        <Tabs defaultValue="all" className="mb-10">
          <TabsList className="mb-8">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="video">Tutoriels vidéo</TabsTrigger>
            <TabsTrigger value="text">Guides textuels</TabsTrigger>
            <TabsTrigger value="interactive">Cours interactifs</TabsTrigger>
            <TabsTrigger value="started">En cours</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="video">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials
                .filter((tutorial) => tutorial.type === 'video')
                .map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials
                .filter((tutorial) => tutorial.type === 'text')
                .map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="interactive">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials
                .filter((tutorial) => tutorial.type === 'interactive')
                .map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="started">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials
                .filter((tutorial) => tutorial.progress > 0 && tutorial.progress < 100)
                .map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Section de parcours d'apprentissage */}
        <div className="bg-muted/30 rounded-lg p-8 mb-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Parcours d'apprentissage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Suivez nos parcours structurés pour acquérir les compétences nécessaires à votre réussite en ligne.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    {React.cloneElement(path.icon, { className: "h-6 w-6 text-primary" })}
                  </div>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{path.tutorialsCount} tutoriels • {path.duration}</p>
                  <div className="flex items-center">
                    <Progress value={path.completionRate} className="h-2 mr-3" />
                    <span className="text-sm font-medium">{path.completionRate}%</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={`/learning-path/${path.id}`}>
                      {path.completionRate > 0 ? "Continuer" : "Commencer"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Appel à l'action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            N'hésitez pas à nous suggérer des sujets de tutoriels ou à consulter notre bibliothèque de ressources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/contact">Suggérer un tutoriel</Link>
            </Button>
            <Button asChild>
              <Link to="/library">Explorer la bibliothèque</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

interface Tutorial {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  type: "video" | "text" | "interactive";
  isPremium: boolean;
  progress: number;
  author: string;
}

// Composant pour afficher un tutoriel
const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
  const TutorialIcon = () => {
    switch (tutorial.type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'text':
        return <BookOpen className="h-4 w-4" />;
      case 'interactive':
        return <ArrowRight className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img 
          src={tutorial.image} 
          alt={tutorial.title} 
          className="w-full h-48 object-cover"
        />
        {tutorial.isPremium && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-yellow-500/90">Premium</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">{tutorial.category}</Badge>
          <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{tutorial.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tutorial.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-xs mr-2">Par {tutorial.author}</span>
          </div>
          <Badge variant="outline" className={
            tutorial.level === 'beginner' ? 'bg-green-500/10 text-green-600 border-green-200' :
            tutorial.level === 'intermediate' ? 'bg-blue-500/10 text-blue-600 border-blue-200' : 
            'bg-purple-500/10 text-purple-600 border-purple-200'
          }>
            {tutorial.level === 'beginner' ? 'Débutant' : 
             tutorial.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
          </Badge>
        </div>
        
        {tutorial.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progression</span>
              <span>{tutorial.progress}%</span>
            </div>
            <Progress value={tutorial.progress} className="h-1" />
          </div>
        )}
        
        <Button className="w-full flex items-center justify-center" variant={tutorial.progress > 0 ? "outline" : "default"}>
          <TutorialIcon />
          <span className="ml-2">
            {tutorial.progress > 0 ? "Continuer" : 
             tutorial.type === 'video' ? "Regarder" : 
             tutorial.type === 'text' ? "Lire" : "Démarrer"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

// Données de tutoriels
const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "Les bases du Copywriting qui convertit",
    description: "Apprenez à rédiger des textes persuasifs qui incitent vos visiteurs à passer à l'action.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
    category: "Copywriting",
    level: "beginner",
    duration: "25 min",
    type: "video",
    isPremium: false,
    progress: 65,
    author: "Léa Dubois"
  },
  {
    id: 2,
    title: "SEO pour les e-commerces",
    description: "Optimisez votre boutique en ligne pour les moteurs de recherche et attirez plus de clients.",
    image: "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?q=80&w=2576&auto=format&fit=crop",
    category: "SEO",
    level: "intermediate",
    duration: "45 min",
    type: "video",
    isPremium: true,
    progress: 0,
    author: "Thomas Lecomte"
  },
  {
    id: 3,
    title: "Lancer votre première campagne Facebook Ads",
    description: "Guide complet pour créer et optimiser vos publicités Facebook qui génèrent des résultats.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
    category: "Marketing",
    level: "beginner",
    duration: "30 min",
    type: "interactive",
    isPremium: false,
    progress: 0,
    author: "Sophie Bernard"
  },
  {
    id: 4,
    title: "Automatisation des emails pour l'e-commerce",
    description: "Mettez en place des séquences d'emails efficaces pour augmenter vos ventes.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=2574&auto=format&fit=crop",
    category: "E-commerce",
    level: "intermediate",
    duration: "40 min",
    type: "text",
    isPremium: true,
    progress: 20,
    author: "Marc Duchamp"
  },
  {
    id: 5,
    title: "Affiliation Amazon de A à Z",
    description: "Construisez un business d'affiliation rentable avec le programme d'affiliation Amazon.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    category: "Affiliation",
    level: "beginner",
    duration: "60 min",
    type: "video",
    isPremium: false,
    progress: 0,
    author: "Alexandre Martin"
  },
  {
    id: 6,
    title: "Analyse avancée des données Google Analytics",
    description: "Exploitez toute la puissance de Google Analytics pour prendre les meilleures décisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Marketing",
    level: "advanced",
    duration: "50 min",
    type: "interactive",
    isPremium: true,
    progress: 0,
    author: "Claire Dumont"
  }
];

// Données des parcours d'apprentissage
const learningPaths = [
  {
    id: 1,
    title: "Devenir Copywriter",
    description: "Maîtrisez l'art d'écrire pour vendre et construisez une carrière lucrative en copywriting.",
    icon: <BookOpen />,
    tutorialsCount: 8,
    duration: "5h 30min",
    completionRate: 40
  },
  {
    id: 2,
    title: "Expert E-commerce",
    description: "De la création de votre boutique à l'optimisation des conversions et du marketing.",
    icon: <ArrowRight />,
    tutorialsCount: 12,
    duration: "8h 15min",
    completionRate: 0
  },
  {
    id: 3,
    title: "Maître de l'Affiliation",
    description: "Générez des revenus passifs grâce au marketing d'affiliation sur différentes plateformes.",
    icon: <Play />,
    tutorialsCount: 10,
    duration: "6h 45min",
    completionRate: 15
  }
];

export default Tutorials;
