
import { useEffect, useRef } from "react";
import { TrendingUp, Timer, BookOpen, Award } from "lucide-react";
import { slideIn } from "@/lib/animations";

const FeatureSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (featuresRef.current) slideIn(featuresRef.current, 'up');
  }, []);

  return (
    <div ref={featuresRef} className="mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        Une approche simple pour <span className="text-gradient">gagner</span> vos premiers euros
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="glass p-8 rounded-xl hover-lift">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <TrendingUp className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Simulateurs interactifs</h3>
          <p className="text-muted-foreground leading-relaxed">
            Testez vos stratégies d'investissement sans risque financier grâce à nos simulateurs de ROI et budget.
          </p>
        </div>
        
        <div className="glass p-8 rounded-xl hover-lift">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <Timer className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Challenges guidés</h3>
          <p className="text-muted-foreground leading-relaxed">
            Progressez étape par étape avec nos défis structurés pour développer de nouvelles compétences business.
          </p>
        </div>
        
        <div className="glass p-8 rounded-xl hover-lift">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Ressources premium</h3>
          <p className="text-muted-foreground leading-relaxed">
            Accédez à une bibliothèque complète de guides, templates et études de cas créés par des experts.
          </p>
        </div>
        
        <div className="glass p-8 rounded-xl hover-lift">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <Award className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Système de progression</h3>
          <p className="text-muted-foreground leading-relaxed">
            Gagnez des XP, des badges et montez dans le classement en relevant des défis progressifs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
