
import React from "react";
import Step from "./Step";

const HowItWorksSection = () => {
  return (
    <div id="how-it-works" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-center mb-10">Comment ça fonctionne ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Step
          number={1}
          title="Inscrivez-vous"
          description="Créez votre compte d'affilié gratuitement et accédez à votre tableau de bord"
        />
        <Step
          number={2}
          title="Partagez votre lien"
          description="Utilisez vos liens personnalisés sur vos canaux de communication"
        />
        <Step
          number={3}
          title="Gagnez des commissions"
          description="Recevez jusqu'à 30% sur chaque abonnement généré"
        />
      </div>
    </div>
  );
};

export default HowItWorksSection;
