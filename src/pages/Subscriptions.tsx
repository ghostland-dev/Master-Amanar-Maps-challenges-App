
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Gem, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";

const Subscriptions = () => {
  const { user, isAuthenticated, hasPremiumAccess, upgradeSubscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "FinQuest - Abonnements";
  }, []);

  const handleSubscribe = async (tier: 'free' | 'premium' | 'enterprise') => {
    try {
      await upgradeSubscription(tier);
      toast({
        title: "Abonnement activé",
        description: `Vous êtes maintenant abonné au forfait ${tier === 'premium' ? 'Premium' : 'Enterprise'}.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre abonnement.",
        variant: "destructive",
      });
    }
  };

  const currentPlan = user?.subscription?.tier || 'free';

  return (
    <MainLayout title="Abonnements" description="Gérez vos abonnements FinQuest">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Abonnements</h1>
          <p className="text-muted-foreground mb-8">
            Choisissez l'abonnement qui correspond à vos besoins pour débloquer plus de fonctionnalités
          </p>

          {/* Current subscription info */}
          {isAuthenticated && (
            <Card className="mb-8 bg-muted/30">
              <CardHeader>
                <CardTitle>Votre abonnement actuel</CardTitle>
                <CardDescription>
                  Forfait {currentPlan === 'free' ? 'Gratuit' : currentPlan === 'premium' ? 'Premium' : 'Enterprise'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {currentPlan === 'free' ? (
                    <Badge variant="outline">Gratuit</Badge>
                  ) : currentPlan === 'premium' ? (
                    <Badge className="bg-amber-500">Premium</Badge>
                  ) : (
                    <Badge className="bg-indigo-500">Enterprise</Badge>
                  )}
                  
                  {user?.subscription?.active ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Actif
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500/10 text-red-500">
                      Inactif
                    </Badge>
                  )}

                  {user?.subscription?.expiresAt && (
                    <span className="text-sm text-muted-foreground">
                      Expire le {new Date(user.subscription.expiresAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subscription plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free plan */}
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
                  onClick={() => handleSubscribe('free')}
                >
                  {currentPlan === 'free' ? 'Votre forfait actuel' : 'Rétrograder vers Gratuit'}
                </Button>
              </CardFooter>
            </Card>

            {/* Premium plan */}
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
                  onClick={() => handleSubscribe('premium')}
                >
                  {currentPlan === 'premium' ? 'Votre forfait actuel' : "S'abonner à Premium"}
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise plan */}
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
                  onClick={() => handleSubscribe('enterprise')}
                >
                  {currentPlan === 'enterprise' ? 'Votre forfait actuel' : "S'abonner à Enterprise"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium mb-1">Information importante sur les paiements</h3>
                <p className="text-sm text-muted-foreground">
                  Pour l'instant, cette page simule les abonnements sans traitement de paiement réel.
                  Une intégration Stripe sera bientôt mise en place pour gérer les paiements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
