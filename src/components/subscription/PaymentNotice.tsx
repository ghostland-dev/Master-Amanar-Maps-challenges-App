
import { AlertCircle } from "lucide-react";

export const PaymentNotice = () => {
  return (
    <div className="mt-8 p-4 bg-muted rounded-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium mb-1">Information importante sur les paiements</h3>
          <p className="text-sm text-muted-foreground">
            Pour l'instant, cette page simule les abonnements sans traitement de paiement réel.
            Une intégration Stripe sera bientôt mise en place pour gérer les paiements de manière sécurisée.
          </p>
        </div>
      </div>
    </div>
  );
};
