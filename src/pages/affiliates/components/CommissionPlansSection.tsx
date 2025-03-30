
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CommissionPlan from "./CommissionPlan";

const CommissionPlansSection = () => {
  const standardCommissions = [
    {
      percentage: "20%",
      description: "Sur les abonnements mensuels",
    },
    {
      percentage: "25%",
      description: "Sur les abonnements annuels",
    },
    {
      percentage: "10%",
      description: "Sur les renouvellements",
    },
  ];

  const premiumCommissions = [
    {
      percentage: "25%",
      description: "Sur les abonnements mensuels",
    },
    {
      percentage: "30%",
      description: "Sur les abonnements annuels",
    },
    {
      percentage: "15%",
      description: "Sur les renouvellements",
    },
    {
      percentage: "5%",
      description: "Commission à 2 niveaux sur les affiliés que vous parrainez",
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-10">Plans de commission</h2>
      <Tabs defaultValue="standard" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>
        <TabsContent value="standard">
          <CommissionPlan
            title="Plan Standard"
            description="Pour tous les affiliés qui débutent"
            commissions={standardCommissions}
            buttonText="Démarrer maintenant"
            buttonLink="/affiliate-dashboard"
          />
        </TabsContent>
        <TabsContent value="premium">
          <CommissionPlan
            title="Plan Premium"
            description="Pour les affiliés qui génèrent plus de 10 ventes par mois"
            commissions={premiumCommissions}
            buttonText="Contacter l'équipe"
            buttonLink="/contact"
            variant="outline"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionPlansSection;
