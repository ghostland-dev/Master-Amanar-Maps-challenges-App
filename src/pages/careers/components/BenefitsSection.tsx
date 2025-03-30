
import React from "react";
import { Globe, Clock, Coffee, Briefcase } from "lucide-react";
import Benefit from "./Benefit";

const BenefitsSection = () => {
  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold text-center mb-10">Avantages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Benefit 
          icon={<Globe />} 
          title="Travail à distance" 
          description="Travaillez d'où vous voulez, quand vous voulez." 
        />
        <Benefit 
          icon={<Clock />} 
          title="Horaires flexibles" 
          description="Organisez votre temps comme vous le souhaitez." 
        />
        <Benefit 
          icon={<Coffee />} 
          title="Pauses café virtuelles" 
          description="Rencontrez l'équipe de manière informelle." 
        />
        <Benefit 
          icon={<Briefcase />} 
          title="Développement professionnel" 
          description="Budget formation et conférences." 
        />
      </div>
    </div>
  );
};

export default BenefitsSection;
