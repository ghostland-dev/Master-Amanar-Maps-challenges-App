
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeIn } from "@/lib/animations";

const HeroHeader = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) fadeIn(heroRef.current);
  }, []);

  return (
    <div ref={heroRef} className="text-center max-w-4xl mx-auto">
      <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary dark:bg-primary/10 dark:border-primary/20">
        <Sparkles className="h-3.5 w-3.5 mr-2" />
        <span className="text-xs font-medium">La plateforme qui gamifie l'apprentissage financier</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
        Apprenez à <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600">gagner de l'argent</span> en ligne
      </h1>
      <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
        Réalisez des petits challenges guidés pour réussir vos premiers euros sur internet, 
        <span className="font-medium text-foreground"> même sans diplôme ni expérience</span>. 
        Suivez simplement les étapes et progressez à votre rythme.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all dark:shadow-primary/10">
          Commencer gratuitement
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        <Link to="/challenges">
          <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base glass hover:bg-primary/10 transition-all dark:glass-dark border-primary/20 hover:border-primary/40">
            Explorer les challenges
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroHeader;
