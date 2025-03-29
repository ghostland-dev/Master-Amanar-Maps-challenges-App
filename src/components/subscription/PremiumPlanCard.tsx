
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SubscriptionTier } from "@/context/AuthContext";

interface PremiumPlanCardProps {
  currentPlan: SubscriptionTier;
  onSubscribe: (tier: SubscriptionTier) => Promise<void>;
}

export const PremiumPlanCard = ({ currentPlan, onSubscribe }: PremiumPlanCardProps) => {
  return (
    <Card className={`border ${currentPlan === 'premium' ? 'border-primary' : 'border-amber-500/50'} shadow-lg`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-amber-500">Premium</CardTitle>
            <CardDescription>Pour les entrepreneurs sérieux</CardDescription>
          </div>
          <Crown className="h-6 w-6 text-amber-500" />
        </div>
        <p className="text-2xl font-bold mt-2">19,99€/mois</p>
        {currentPlan === 'premium' && (
          <Badge className="mt-2 bg-amber-500">Plan actuel</Badge>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Tout le contenu gratuit</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Accès à tous les challenges avancés</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Ressources exclusives premium</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Support prioritaire</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-amber-500 hover:bg-amber-600" 
          disabled={currentPlan === 'premium'}
          onClick={() => onSubscribe('premium')}
        >
          {currentPlan === 'premium' ? 'Votre forfait actuel' : "S'abonner à Premium"}
        </Button>
      </CardFooter>
    </Card>
  );
};
