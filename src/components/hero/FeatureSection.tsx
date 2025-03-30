
import { useEffect, useRef } from "react";
import { TrendingUp, Timer, BookOpen, Award, LineChart, Shield, Zap } from "lucide-react";
import { slideIn } from "@/lib/animations";

const FeatureSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (featuresRef.current) slideIn(featuresRef.current, 'up');
  }, []);

  const features = [
    {
      icon: <LineChart className="h-7 w-7 text-primary" />,
      title: "Simulateurs interactifs",
      description: "Testez vos stratégies d'investissement sans risque financier grâce à nos simulateurs de ROI et budget."
    },
    {
      icon: <Timer className="h-7 w-7 text-primary" />,
      title: "Challenges guidés",
      description: "Progressez étape par étape avec nos défis structurés pour développer de nouvelles compétences business."
    },
    {
      icon: <BookOpen className="h-7 w-7 text-primary" />,
      title: "Ressources premium",
      description: "Accédez à une bibliothèque complète de guides, templates et études de cas créés par des experts."
    },
    {
      icon: <Award className="h-7 w-7 text-primary" />,
      title: "Système de progression",
      description: "Gagnez des XP, des badges et montez dans le classement en relevant des défis progressifs."
    },
    {
      icon: <Shield className="h-7 w-7 text-primary" />,
      title: "Communauté sécurisée",
      description: "Échangez avec d'autres apprenants dans un espace bienveillant modéré par nos experts."
    },
    {
      icon: <Zap className="h-7 w-7 text-primary" />,
      title: "Résultats rapides",
      description: "Obtenez des résultats concrets dès les premiers jours grâce à notre approche orientée action."
    }
  ];

  return (
    <div ref={featuresRef} className="mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Une approche simple pour <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600">gagner</span> vos premiers euros
      </h2>
      <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16">
        Notre plateforme combine les meilleurs outils et ressources pour vous aider à générer vos premiers revenus en ligne.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="glass p-8 rounded-xl hover-lift border border-primary/5 hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
