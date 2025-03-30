
import React from "react";
import { Button } from "@/components/ui/button";

const JoinUsCTA = () => {
  return (
    <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/50 p-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas le poste idéal ?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Nous sommes toujours à la recherche de talents exceptionnels. Envoyez-nous votre CV 
        et expliquez-nous comment vous pourriez contribuer à notre mission.
      </p>
      <Button variant="default" asChild>
        <a href="mailto:careers@amanarmap.com">Contactez-nous</a>
      </Button>
    </div>
  );
};

export default JoinUsCTA;
