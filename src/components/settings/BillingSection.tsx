
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const BillingSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Facturation et abonnement</CardTitle>
        <CardDescription>
          Gérez vos méthodes de paiement et votre abonnement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h3 className="font-medium flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-primary" />
            Abonnement actuel
          </h3>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <p className="font-bold">Plan Gratuit</p>
              <p className="text-sm text-muted-foreground">Fonctionnalités de base</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/profile?tab=subscription")}
            >
              Mettre à niveau
            </Button>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
          <h3 className="font-medium">Historique de facturation</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Aucune facturation n'est disponible pour le moment.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
          <h3 className="font-medium">Méthodes de paiement</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Aucune méthode de paiement n'est enregistrée.
          </p>
          <Button variant="outline" size="sm" onClick={() => {
            toast({
              title: "Fonctionnalité à venir",
              description: "La gestion des méthodes de paiement sera bientôt disponible.",
            });
          }}>
            Ajouter une méthode de paiement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
