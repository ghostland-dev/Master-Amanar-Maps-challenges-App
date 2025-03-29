
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { scaleIn } from "@/lib/animations";

const CtaSection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ctaRef.current) scaleIn(ctaRef.current);
  }, []);

  return (
    <div 
      ref={ctaRef} 
      className="mt-24 glass p-12 rounded-2xl text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 dark:from-primary/10 dark:to-primary/5 dark:border-primary/10"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Prêt à gagner vos premiers euros en ligne ?
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
        Rejoignez notre communauté et commencez dès aujourd'hui avec des défis adaptés aux débutants.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all dark:shadow-primary/20">
          Créer un compte gratuit
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base glass hover:bg-primary/10 transition-all dark:glass-dark hover:dark:bg-primary/10">
          Découvrir les simulateurs
        </Button>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Aucune carte de crédit requise. Accès gratuit aux fonctionnalités de base.
      </p>
    </div>
  );
};

export default CtaSection;
