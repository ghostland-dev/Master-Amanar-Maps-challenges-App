
import { Heart } from "lucide-react";

const AdBudgetFooter = () => {
  return (
    <div className="mt-8 text-center text-sm text-muted-foreground">
      <p className="flex items-center justify-center">
        <Heart className="mr-1 h-4 w-4 text-primary" />
        Développé pour optimiser vos investissements publicitaires
      </p>
    </div>
  );
};

export default AdBudgetFooter;
