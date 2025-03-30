
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle } from "lucide-react";
import { scaleIn } from "@/lib/animations";

const CtaSection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ctaRef.current) scaleIn(ctaRef.current);
  }, []);

  const benefits = [
    "Accès aux challenges débutants",
    "Simulateurs financiers illimités",
    "Support communautaire",
    "Ressources pour démarrer"
  ];

  return (
    <div 
      ref={ctaRef} 
      className="mt-24 relative p-12 rounded-2xl text-center overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Prêt à gagner vos premiers euros en ligne ?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Rejoignez notre communauté et commencez dès aujourd'hui avec des défis adaptés aux débutants.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-primary/30 hover:shadow-primary/40 transition-all dark:shadow-primary/20">
            Créer un compte gratuit
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base glass hover:bg-primary/10 transition-all dark:glass-dark hover:dark:bg-primary/10 border-primary/20 hover:border-primary/40">
            Découvrir les simulateurs
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Aucune carte de crédit requise. Accès gratuit aux fonctionnalités de base.
        </p>
      </div>
    </div>
  );
};

export default CtaSection;
