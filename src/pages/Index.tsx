
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, Layers, Link as LinkIcon, PenTool, Code, LineChart, Palette, ChevronRight } from "lucide-react";
import Hero from "@/components/hero";
import CategoryCard from "@/components/CategoryCard";
import MainLayout from "@/components/layouts/MainLayout";
import { fadeIn, stagger } from "@/lib/animations";

const Index = () => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoryItemsRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    if (categoriesRef.current) fadeIn(categoriesRef.current);
    
    // Stagger animation for category cards
    const categoryItems = document.querySelectorAll('.category-card');
    if (categoryItems.length > 0) {
      stagger(categoryItems as NodeListOf<HTMLElement>, fadeIn, 100);
    }
  }, []);
  
  const categories = [
    {
      title: "Achat/Revente",
      description: "Apprenez à acheter à bas prix et revendre pour gagner de l'argent",
      icon: <ShoppingCart className="h-6 w-6 text-primary" />,
      count: 5,
      difficulty: "beginner" as const,
      to: "/challenges?category=achat-revente",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2340&auto=format&fit=crop",
    },
    {
      title: "Crypto",
      description: "Découvrez les investissements en cryptomonnaies",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      count: 7,
      difficulty: "intermediate" as const,
      to: "/challenges?category=crypto",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2574&auto=format&fit=crop",
    },
    {
      title: "E-commerce",
      description: "Créez et gérez votre boutique en ligne",
      icon: <Layers className="h-6 w-6 text-primary" />,
      count: 8,
      difficulty: "intermediate" as const,
      to: "/challenges?category=ecommerce",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Affiliation",
      description: "Gagnez de l'argent en recommandant des produits",
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      count: 6,
      difficulty: "beginner" as const,
      to: "/challenges?category=affiliation",
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Copywriting",
      description: "Créez des textes qui vendent",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      count: 4,
      difficulty: "intermediate" as const,
      to: "/challenges?category=copywriting",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
    },
    {
      title: "Développement",
      description: "Créez des sites web et des applications",
      icon: <Code className="h-6 w-6 text-primary" />,
      count: 5,
      difficulty: "advanced" as const,
      to: "/challenges?category=developpement",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop",
    },
    {
      title: "Marketing",
      description: "Apprenez à attirer des clients",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      count: 7,
      difficulty: "intermediate" as const,
      to: "/challenges?category=marketing",
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2574&auto=format&fit=crop",
    },
    {
      title: "Design",
      description: "Créez de beaux designs qui attirent l'attention",
      icon: <Palette className="h-6 w-6 text-primary" />,
      count: 3,
      difficulty: "intermediate" as const,
      to: "/challenges?category=design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2671&auto=format&fit=crop",
    },
  ];

  return (
    <MainLayout title="Accueil">
      <Hero />
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto pb-28">
        <div ref={categoriesRef} className="pt-20 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary dark:bg-primary/10 mb-6">
              <span className="text-xs font-medium">Explorez nos catégories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Découvrez nos <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600">catégories de challenges</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez la catégorie qui correspond à vos objectifs et commencez votre parcours vers l'indépendance financière.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{categories.length} catégories</span> disponibles • 
                <span className="ml-2 font-semibold text-foreground">{categories.reduce((acc, cat) => acc + cat.count, 0)} challenges</span> au total
              </p>
            </div>
            <Link to="/challenges">
              <Button variant="secondary" className="group shadow-md hover:shadow-lg transition-all">
                Voir tous les challenges
                <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="category-card transform hover:-translate-y-1 transition-all duration-300 h-full">
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all dark:shadow-primary/10" asChild>
              <Link to="/challenges">
                Explorer tous les challenges
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
