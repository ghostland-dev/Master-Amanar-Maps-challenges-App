
import React from "react";
import { UserPlus, Share2, Coins } from "lucide-react";
import StepCard from "./StepCard";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Inscrivez-vous",
      description: "Créez votre compte d'affilié gratuitement et accédez à votre tableau de bord",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      number: 2,
      title: "Partagez votre lien",
      description: "Utilisez vos liens personnalisés sur vos canaux de communication",
      icon: <Share2 className="h-5 w-5" />,
    },
    {
      number: 3,
      title: "Gagnez des commissions",
      description: "Recevez jusqu'à 30% sur chaque abonnement généré",
      icon: <Coins className="h-5 w-5" />,
    }
  ];

  return (
    <div id="how-it-works" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-center mb-10">Comment ça fonctionne ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            icon={step.icon}
            delay={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
