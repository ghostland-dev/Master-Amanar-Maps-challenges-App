
import React from "react";
import { Percent } from "lucide-react";

const MarginCalculatorHeader = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Calculateur de marge
      </h1>
      <p className="text-muted-foreground mb-8">
        Déterminez vos marges et prix optimaux pour maximiser votre rentabilité
      </p>
      
      <div className="glass p-6 rounded-xl text-center mb-10 border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
          <Percent className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Calculateur de marge et prix</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          Calculez rapidement votre marge bénéficiaire et analysez votre rentabilité.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Export PDF
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Calcul en temps réel
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Conseils personnalisés
          </span>
        </div>
      </div>
    </>
  );
};

export default MarginCalculatorHeader;
