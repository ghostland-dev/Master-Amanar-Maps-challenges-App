
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/50 p-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Rejoignez notre programme d'affiliation dès aujourd'hui et commencez à gagner des commissions en recommandant une plateforme que vous appréciez.
      </p>
      <Button size="lg" asChild>
        <Link to="/affiliate-dashboard">
          Devenir affilié maintenant
        </Link>
      </Button>
    </div>
  );
};

export default CtaSection;
