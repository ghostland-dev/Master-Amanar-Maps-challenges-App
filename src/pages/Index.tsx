
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import { ShoppingCart, TrendingUp, Layers, Link as LinkIcon, PenTool, Code, LineChart, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { slideIn } from "@/lib/animations";
import Navbar from "@/components/Navbar";

const Index = () => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (categoriesRef.current) {
      slideIn(categoriesRef.current, 'up');
    }
  }, []);
  
  const categories = [
    {
      title: "Achat/Revente",
      description: "Apprenez à acheter à bas prix et revendre avec une marge bénéficiaire.",
      icon: <ShoppingCart className="h-6 w-6 text-primary" />,
      count: 5,
      difficulty: "beginner" as const,
      to: "/challenges?category=achat-revente",
    },
    {
      title: "Crypto",
      description: "Explorez le monde des cryptomonnaies et des stratégies d'investissement.",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      count: 7,
      difficulty: "intermediate" as const,
      to: "/challenges?category=crypto",
    },
    {
      title: "E-commerce",
      description: "Lancez et gérez votre propre boutique en ligne avec succès.",
      icon: <Layers className="h-6 w-6 text-primary" />,
      count: 8,
      difficulty: "intermediate" as const,
      to: "/challenges?category=ecommerce",
    },
    {
      title: "Affiliation",
      description: "Monétisez votre audience en promouvant des produits et services.",
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      count: 6,
      difficulty: "beginner" as const,
      to: "/challenges?category=affiliation",
    },
    {
      title: "Copywriting",
      description: "Maîtrisez l'art d'écrire des textes qui convertissent.",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      count: 4,
      difficulty: "intermediate" as const,
      to: "/challenges?category=copywriting",
    },
    {
      title: "Développement",
      description: "Développez des applications et services numériques rentables.",
      icon: <Code className="h-6 w-6 text-primary" />,
      count: 5,
      difficulty: "advanced" as const,
      to: "/challenges?category=developpement",
    },
    {
      title: "Marketing",
      description: "Attirez et convertissez votre audience cible avec des stratégies efficaces.",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      count: 7,
      difficulty: "intermediate" as const,
      to: "/challenges?category=marketing",
    },
    {
      title: "Design",
      description: "Créez des designs attrayants qui se démarquent sur le marché.",
      icon: <Palette className="h-6 w-6 text-primary" />,
      count: 3,
      difficulty: "intermediate" as const,
      to: "/challenges?category=design",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto pb-20">
        <div ref={categoriesRef}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Catégories de challenges</h2>
            <Link to="/challenges">
              <Button variant="ghost">Voir tous les challenges</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
