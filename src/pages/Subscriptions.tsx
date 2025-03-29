
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import { FreePlanCard } from "@/components/subscription/FreePlanCard";
import { PremiumPlanCard } from "@/components/subscription/PremiumPlanCard";
import { EnterprisePlanCard } from "@/components/subscription/EnterprisePlanCard";
import { PaymentNotice } from "@/components/subscription/PaymentNotice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Subscriptions = () => {
  const { user, isAuthenticated, upgradeSubscription } = useAuth();

  useEffect(() => {
    document.title = "FinQuest - Abonnements";
  }, []);

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
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">Votre abonnement actuel</h2>
                <p className="text-muted-foreground mb-4">
                  Forfait {currentPlan === 'free' ? 'Gratuit' : currentPlan === 'premium' ? 'Premium' : 'Enterprise'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={currentPlan === 'free' ? 'outline' : currentPlan === 'premium' ? 'default' : 'secondary'}>
                    {currentPlan === 'free' ? 'Gratuit' : currentPlan === 'premium' ? 'Premium' : 'Enterprise'}
                  </Badge>
                  
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
              </div>
            </Card>
          )}

          {/* Subscription plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FreePlanCard currentPlan={currentPlan} onSubscribe={upgradeSubscription} />
            <PremiumPlanCard currentPlan={currentPlan} onSubscribe={upgradeSubscription} />
            <EnterprisePlanCard currentPlan={currentPlan} onSubscribe={upgradeSubscription} />
          </div>

          <PaymentNotice />
        </div>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
