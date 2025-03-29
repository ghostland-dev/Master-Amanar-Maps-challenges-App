
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SubscriptionTier } from "@/context/AuthContext";

interface FreePlanCardProps {
  currentPlan: SubscriptionTier;
  onSubscribe: (tier: SubscriptionTier) => Promise<void>;
}

export const FreePlanCard = ({ currentPlan, onSubscribe }: FreePlanCardProps) => {
  return (
    <Card className={`border ${currentPlan === 'free' ? 'border-primary' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Gratuit</CardTitle>
            <CardDescription>Pour commencer</CardDescription>
          </div>
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <p className="text-2xl font-bold mt-2">0€/mois</p>
        {currentPlan === 'free' && (
          <Badge className="mt-2">Plan actuel</Badge>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm">Accès à la bibliothèque de base</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm">Challenges débutants</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm">Simulateurs essentiels</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant="outline" 
          disabled={currentPlan === 'free'}
          onClick={() => onSubscribe('free')}
        >
          {currentPlan === 'free' ? 'Votre forfait actuel' : 'Rétrograder vers Gratuit'}
        </Button>
      </CardFooter>
    </Card>
  );
};
