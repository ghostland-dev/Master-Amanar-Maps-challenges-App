
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SubscriptionTier } from "@/context/AuthContext";

interface EnterprisePlanCardProps {
  currentPlan: SubscriptionTier;
  onSubscribe: (tier: SubscriptionTier) => Promise<void>;
}

export const EnterprisePlanCard = ({ currentPlan, onSubscribe }: EnterprisePlanCardProps) => {
  return (
    <Card className={`border ${currentPlan === 'enterprise' ? 'border-primary' : 'border-indigo-500/50'}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-indigo-500">Enterprise</CardTitle>
            <CardDescription>Pour une maîtrise totale</CardDescription>
          </div>
          <Gem className="h-6 w-6 text-indigo-500" />
        </div>
        <p className="text-2xl font-bold mt-2">49,99€/mois</p>
        {currentPlan === 'enterprise' && (
          <Badge className="mt-2 bg-indigo-500">Plan actuel</Badge>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-indigo-500" />
            <span className="text-sm">Tout le contenu Premium</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-indigo-500" />
            <span className="text-sm">Mentorat personnalisé</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-indigo-500" />
            <span className="text-sm">Analytics avancées</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-indigo-500" />
            <span className="text-sm">Webinaires exclusifs mensuels</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-indigo-500 hover:bg-indigo-600" 
          disabled={currentPlan === 'enterprise'}
          onClick={() => onSubscribe('enterprise')}
        >
          {currentPlan === 'enterprise' ? 'Votre forfait actuel' : "S'abonner à Enterprise"}
        </Button>
      </CardFooter>
    </Card>
  );
};
