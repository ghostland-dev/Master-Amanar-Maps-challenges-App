
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold mb-4">Rejoignez l'aventure Amanar Map</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
        Nous construisons le futur de l'apprentissage entrepreneurial en ligne. 
        Rejoignez une équipe passionnée qui aide des milliers de personnes à atteindre leur liberté financière.
      </p>
      <Button size="lg" asChild>
        <a href="#open-positions">
          Voir les postes ouverts
        </a>
      </Button>
    </div>
  );
};

export default HeroSection;
