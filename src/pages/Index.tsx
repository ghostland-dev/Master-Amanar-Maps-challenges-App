
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, Layers, Link as LinkIcon, PenTool, Code, LineChart, Palette, ChevronRight } from "lucide-react";
import Hero from "@/components/hero";
import CategoryCard from "@/components/CategoryCard";
import MainLayout from "@/components/layouts/MainLayout";
import { fadeIn } from "@/lib/animations";

const Index = () => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (categoriesRef.current) fadeIn(categoriesRef.current);
  }, []);
  
  const categories = [
    {
      title: "Achat/Revente",
      description: "Apprenez à acheter à bas prix et revendre pour gagner de l'argent",
      icon: <ShoppingCart className="h-6 w-6 text-primary" />,
      count: 5,
      difficulty: "beginner" as const,
      to: "/challenges?category=achat-revente",
    },
    {
      title: "Crypto",
      description: "Découvrez les investissements en cryptomonnaies",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      count: 7,
      difficulty: "intermediate" as const,
      to: "/challenges?category=crypto",
    },
    {
      title: "E-commerce",
      description: "Créez et gérez votre boutique en ligne",
      icon: <Layers className="h-6 w-6 text-primary" />,
      count: 8,
      difficulty: "intermediate" as const,
      to: "/challenges?category=ecommerce",
    },
    {
      title: "Affiliation",
      description: "Gagnez de l'argent en recommandant des produits",
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      count: 6,
      difficulty: "beginner" as const,
      to: "/challenges?category=affiliation",
    },
    {
      title: "Copywriting",
      description: "Créez des textes qui vendent",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      count: 4,
      difficulty: "intermediate" as const,
      to: "/challenges?category=copywriting",
    },
    {
      title: "Développement",
      description: "Créez des sites web et des applications",
      icon: <Code className="h-6 w-6 text-primary" />,
      count: 5,
      difficulty: "advanced" as const,
      to: "/challenges?category=developpement",
    },
    {
      title: "Marketing",
      description: "Apprenez à attirer des clients",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      count: 7,
      difficulty: "intermediate" as const,
      to: "/challenges?category=marketing",
    },
    {
      title: "Design",
      description: "Créez de beaux designs qui attirent l'attention",
      icon: <Palette className="h-6 w-6 text-primary" />,
      count: 3,
      difficulty: "intermediate" as const,
      to: "/challenges?category=design",
    },
  ];

  return (
    <MainLayout title="Accueil">
      <Hero />
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto pb-20">
        <div ref={categoriesRef} className="pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Catégories de challenges</h2>
              <p className="text-muted-foreground">Explorez nos différentes catégories et trouvez celle qui vous correspond</p>
            </div>
            <Link to="/challenges">
              <Button variant="secondary" className="group">
                Voir tous les challenges
                <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
