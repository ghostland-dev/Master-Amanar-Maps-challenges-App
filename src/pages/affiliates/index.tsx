
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

const Affiliates = () => {
  return (
    <MainLayout title="Programme d'affiliation" description="Gagnez des commissions en recommandant Amanar Map">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Programme d'affiliation Amanar Map</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Recommandez notre plateforme et gagnez jusqu'à 30% de commission sur chaque abonnement généré.
            Un programme pensé pour être simple, transparent et rentable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/affiliate-dashboard">
                Rejoindre le programme
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">
                Comment ça marche
              </a>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatCard
            value="30%"
            label="Commission"
            description="Sur chaque abonnement généré par votre lien"
          />
          <StatCard
            value="365"
            label="Jours de cookie"
            description="Chaque visiteur est tracé pendant un an"
          />
          <StatCard
            value="€0"
            label="Coût d'entrée"
            description="Rejoindre notre programme est totalement gratuit"
          />
        </div>

        {/* How it works */}
        <div id="how-it-works" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold text-center mb-10">Comment ça fonctionne ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              number={1}
              title="Inscrivez-vous"
              description="Créez votre compte d'affilié gratuitement et accédez à votre tableau de bord"
            />
            <Step
              number={2}
              title="Partagez votre lien"
              description="Utilisez vos liens personnalisés sur vos canaux de communication"
            />
            <Step
              number={3}
              title="Gagnez des commissions"
              description="Recevez jusqu'à 30% sur chaque abonnement généré"
            />
          </div>
        </div>

        {/* Commission Plans */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Plans de commission</h2>
          <Tabs defaultValue="standard" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
            <TabsContent value="standard">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Standard</CardTitle>
                  <CardDescription>Pour tous les affiliés qui débutent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CommissionItem
                      percentage="20%"
                      description="Sur les abonnements mensuels"
                    />
                    <CommissionItem
                      percentage="25%"
                      description="Sur les abonnements annuels"
                    />
                    <CommissionItem
                      percentage="10%"
                      description="Sur les renouvellements"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/affiliate-dashboard">Démarrer maintenant</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="premium">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Premium</CardTitle>
                  <CardDescription>Pour les affiliés qui génèrent plus de 10 ventes par mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CommissionItem
                      percentage="25%"
                      description="Sur les abonnements mensuels"
                    />
                    <CommissionItem
                      percentage="30%"
                      description="Sur les abonnements annuels"
                    />
                    <CommissionItem
                      percentage="15%"
                      description="Sur les renouvellements"
                    />
                    <CommissionItem
                      percentage="5%"
                      description="Commission à 2 niveaux sur les affiliés que vous parrainez"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact">Contacter l'équipe</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FaqItem
              question="Quand sont versées les commissions ?"
              answer="Les commissions sont versées le 15 de chaque mois pour le mois précédent, à condition que votre solde atteigne le minimum de 50€."
            />
            <FaqItem
              question="Comment sont tracées les ventes ?"
              answer="Nous utilisons des cookies avec une durée de vie de 365 jours. Si un utilisateur clique sur votre lien et s'abonne dans l'année, vous recevez votre commission."
            />
            <FaqItem
              question="Puis-je promouvoir vos services sur les réseaux sociaux ?"
              answer="Absolument ! Vous êtes libre d'utiliser tous les canaux de communication que vous souhaitez, tant que vous respectez nos conditions d'utilisation."
            />
            <FaqItem
              question="Y a-t-il un minimum de ventes à réaliser ?"
              answer="Non, il n'y a pas de minimum de ventes. Vous pouvez promouvoir nos services à votre rythme sans aucune contrainte de performance."
            />
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/faq" className="flex items-center">
                Voir toutes les FAQ <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/50 p-10 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Rejoignez notre programme d'affiliation dès aujourd'hui et commencez à gagner des commissions en recommandant une plateforme que vous appréciez.
          </p>
          <Button size="lg" asChild>
            <Link to="/affiliate-dashboard">
              Devenir affilié maintenant
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

// Helper components
const StatCard = ({ value, label, description }: { value: string, label: string, description: string }) => (
  <div className="bg-secondary/20 p-6 rounded-lg text-center">
    <p className="text-4xl font-bold text-primary">{value}</p>
    <h3 className="text-xl font-semibold mt-2 mb-1">{label}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const Step = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const CommissionItem = ({ percentage, description }: { percentage: string, description: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <Check className="h-5 w-5 text-primary mr-2" />
      <span>{description}</span>
    </div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <span className="font-bold">{percentage}</span>
            <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Commission calculée sur le montant HT</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => (
  <div className="border border-border rounded-lg p-4">
    <h4 className="font-medium mb-2">{question}</h4>
    <p className="text-sm text-muted-foreground">{answer}</p>
  </div>
);

export default Affiliates;
