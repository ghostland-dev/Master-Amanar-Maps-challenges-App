
import React from "react";
import StatFeature from "./StatFeature";

const StatsSection = () => {
  const stats = [
    {
      value: "30%",
      label: "Commission",
      description: "Sur chaque abonnement généré par votre lien"
    },
    {
      value: "365",
      label: "Jours de cookie",
      description: "Chaque visiteur est tracé pendant un an"
    },
    {
      value: "€0",
      label: "Coût d'entrée",
      description: "Rejoindre notre programme est totalement gratuit"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {stats.map((stat, index) => (
        <StatFeature
          key={index}
          value={stat.value}
          label={stat.label}
          description={stat.description}
          delay={index}
        />
      ))}
    </div>
  );
};

export default StatsSection;
