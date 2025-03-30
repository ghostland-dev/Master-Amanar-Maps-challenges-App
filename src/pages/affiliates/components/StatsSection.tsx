
import React from "react";
import StatCard from "./StatCard";

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <StatCard
        value="30%"
        label="Commission"
        description="Sur chaque abonnement généré par votre lien"
      />
      <StatCard
        value="365"
        label="Jours de cookie"
        description="Chaque visiteur est tracé pendant un an"
      />
      <StatCard
        value="€0"
        label="Coût d'entrée"
        description="Rejoindre notre programme est totalement gratuit"
      />
    </div>
  );
};

export default StatsSection;
