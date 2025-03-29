
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, Gem } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SubscriptionPalette = () => {
  const { isAuthenticated, hasPremiumAccess } = useAuth();

  const tiers = [
    {
      name: "Gratuit",
      price: "0€",
      description: "Pour commencer votre aventure financière",
      features: [
        "Accès à la bibliothèque de base",
        "Challenges débutants",
        "Simulateurs essentiels"
      ],
      highlighted: false,
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      action: isAuthenticated ? "Votre forfait actuel" : "Commencer gratuitement"
    },
    {
      name: "Premium",
      price: "19,99€/mois",
      description: "Pour les entrepreneurs sérieux",
      features: [
        "Tout le contenu gratuit",
        "Accès à tous les challenges avancés",
        "Ressources exclusives premium",
        "Support prioritaire"
      ],
      highlighted: true,
      icon: <Crown className="h-6 w-6 text-amber-500" />,
      action: hasPremiumAccess ? "Votre forfait actuel" : "S'abonner"
    },
    {
      name: "Enterprise",
      price: "49,99€/mois",
      description: "Pour une maîtrise totale",
      features: [
        "Tout le contenu Premium",
        "Mentorat personnalisé",
        "Analytics avancées",
        "Webinaires exclusifs mensuels"
      ],
      highlighted: false,
      icon: <Gem className="h-6 w-6 text-indigo-500" />,
      action: "Découvrir"
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Nos formules d'abonnement</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choisissez l'abonnement qui vous correspond pour accélérer votre progression financière
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <Card 
            key={index} 
            className={`border ${tier.highlighted ? 'border-primary shadow-lg shadow-primary/10' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </div>
                <div className={`p-2 rounded-full ${
                  tier.highlighted ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  {tier.icon}
                </div>
              </div>
              <p className="text-2xl font-bold mt-4">{tier.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link to={isAuthenticated ? "/subscriptions" : "/auth?tab=register"} className="w-full">
                <Button 
                  className={`w-full ${tier.highlighted ? '' : 'bg-muted-foreground/20 hover:bg-muted-foreground/30 text-foreground'}`}
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.action}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPalette;
