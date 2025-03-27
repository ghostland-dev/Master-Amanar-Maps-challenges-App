
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Timer, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { scaleIn, fadeIn, slideIn } from "@/lib/animations";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) fadeIn(heroRef.current);
    if (featuresRef.current) slideIn(featuresRef.current, 'up', 0.3);
    if (ctaRef.current) scaleIn(ctaRef.current, 0.6);
  }, []);

  return (
    <div className="pt-24 pb-12 md:pb-20">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Hero section */}
        <div ref={heroRef} className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Maîtrisez vos <span className="text-gradient">compétences financières</span> à travers des défis structurés
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Testez des stratégies, développez vos compétences business et suivez votre progression avec des simulateurs interactifs et des challenges gamifiés.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-base">
              Commencer gratuitement
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base glass">
              Découvrir les challenges
            </Button>
          </div>
        </div>
        
        {/* Features */}
        <div ref={featuresRef} className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass p-6 rounded-xl hover-lift">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Simulateurs interactifs</h3>
            <p className="text-muted-foreground">
              Testez vos stratégies sans risque avec nos simulateurs de ROI, marge et budget.
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl hover-lift">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Timer className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Challenges guidés</h3>
            <p className="text-muted-foreground">
              Suivez un parcours structuré avec des étapes progressives et déverrouillez de nouvelles compétences.
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl hover-lift">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Ressources éducatives</h3>
            <p className="text-muted-foreground">
              Accédez à une bibliothèque de guides et ressources pour approfondir vos connaissances.
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl hover-lift">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Progression gamifiée</h3>
            <p className="text-muted-foreground">
              Gagnez des XP, badges et montez dans les classements à mesure que vous progressez.
            </p>
          </div>
        </div>
        
        {/* CTA */}
        <div ref={ctaRef} className="mt-20 glass p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à relever votre premier challenge financier ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Rejoignez des milliers d'utilisateurs qui développent leurs compétences et testent de nouvelles stratégies business.
          </p>
          <Link to="/challenges">
            <Button size="lg" className="rounded-full px-8 py-6 text-base">
              Explorer les challenges
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
