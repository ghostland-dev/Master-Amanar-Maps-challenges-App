
import { DollarSign } from "lucide-react";

const AdBudgetHeader = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Budget publicitaire</h1>
      <p className="text-muted-foreground mb-8">
        Optimisez votre budget marketing et publicitaire pour maximiser votre ROI
      </p>
      
      <div className="glass p-6 rounded-xl text-center mb-10">
        <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
          <DollarSign className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Calculateur de budget publicitaire</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
          Déterminez le budget optimal pour vos campagnes publicitaires en fonction de vos objectifs commerciaux.
        </p>
      </div>
    </>
  );
};

export default AdBudgetHeader;
