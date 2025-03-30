
import React from "react";
import { Heart, Zap, Users } from "lucide-react";

const ValuesSection = () => {
  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold text-center mb-10">Nos valeurs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 rounded-xl bg-secondary/50">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Passion</h3>
          <p className="text-muted-foreground">
            Nous sommes passionnés par notre mission d'aider les gens à réussir dans l'entrepreneuriat digital.
          </p>
        </div>
        <div className="text-center p-6 rounded-xl bg-secondary/50">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Innovation</h3>
          <p className="text-muted-foreground">
            Nous explorons constamment de nouvelles approches pour rendre l'apprentissage plus efficace et accessible.
          </p>
        </div>
        <div className="text-center p-6 rounded-xl bg-secondary/50">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Communauté</h3>
          <p className="text-muted-foreground">
            Nous croyons à la puissance de la communauté et de l'entraide pour progresser ensemble.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
