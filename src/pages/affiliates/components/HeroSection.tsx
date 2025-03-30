
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold mb-4">Programme d'affiliation Amanar Map</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
        Recommandez notre plateforme et gagnez jusqu'à 30% de commission sur chaque abonnement généré.
        Un programme pensé pour être simple, transparent et rentable.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <Link to="/affiliate-dashboard">
            Rejoindre le programme
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="#how-it-works">
            Comment ça marche
          </a>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
