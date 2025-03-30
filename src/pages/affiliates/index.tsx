
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  TrendingUp,
  Link as LinkIcon,
  DollarSign,
  Award,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const Affiliates = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <MainLayout title="Programme d'affiliation" description="Gagnez des commissions en recommandant Amanar Map">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Programme d'Affiliation</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Recommandez Amanar Map à votre audience et gagnez des commissions généreuses 
            sur chaque abonnement réalisé grâce à votre lien.
          </p>
          
          {isAuthenticated ? (
            <Button size="lg" asChild>
              <Link to="/affiliate-dashboard">
                Accéder à mon tableau de bord
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link to="/auth?redirect=/affiliates">
                Devenir affilié
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        
        {/* Program Benefits */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">Pourquoi devenir affilié ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<DollarSign />} 
              title="Commissions attractives" 
              description="Gagnez 30% de commission sur tous les abonnements générés via votre lien, pendant toute la durée de l'abonnement."
            />
            <BenefitCard 
              icon={<LinkIcon />} 
              title="Liens et outils personnalisés" 
              description="Accédez à des liens de tracking personnalisés et des outils marketing pour maximiser vos conversions."
            />
            <BenefitCard 
              icon={<BarChart3 />} 
              title="Analytics détaillés" 
              description="Suivez vos performances en temps réel avec des statistiques complètes sur vos clics et conversions."
            />
          </div>
        </div>
        
        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">Comment ça fonctionne</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-dashed border-primary/40 rounded-xl">
              <div className="relative w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">1</span>
                <LinkIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Inscrivez-vous</h3>
              <p className="text-sm text-muted-foreground">
                Créez votre compte affilié et obtenez votre lien de parrainage unique.
              </p>
            </div>
            
            <div className="text-center p-6 border border-dashed border-primary/40 rounded-xl">
              <div className="relative w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">2</span>
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Partagez</h3>
              <p className="text-sm text-muted-foreground">
                Partagez votre lien sur vos réseaux, blog, emails ou autres canaux.
              </p>
            </div>
            
            <div className="text-center p-6 border border-dashed border-primary/40 rounded-xl">
              <div className="relative w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">3</span>
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Gagnez</h3>
              <p className="text-sm text-muted-foreground">
                Recevez vos commissions chaque mois pour tous les abonnements générés.
              </p>
            </div>
          </div>
          
          <div className="mt-10 p-6 rounded-xl bg-secondary/30">
            <h3 className="font-semibold mb-3 text-center">Programme VIP pour les grands affiliés</h3>
            <p className="text-center text-muted-foreground mb-4">
              Vous avez une large audience ? Contactez-nous pour discuter de commissions personnalisées 
              et de ressources marketing exclusives.
            </p>
            <div className="text-center">
              <Button variant="outline" asChild>
                <a href="mailto:affiliate@amanarmap.com">Contacter l'équipe d'affiliation</a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Commission Structure */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">Structure de commissions</h2>
          
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-3 font-medium bg-secondary/50 p-4">
              <div>Abonnement</div>
              <div className="text-center">Prix</div>
              <div className="text-right">Votre commission</div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 p-4">
              <div>Mensuel</div>
              <div className="text-center">19,99€/mois</div>
              <div className="text-right font-medium">6€/mois</div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 p-4">
              <div>Annuel</div>
              <div className="text-center">199€/an</div>
              <div className="text-right font-medium">60€/an</div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 p-4 bg-secondary/30">
              <div>Enterprise</div>
              <div className="text-center">499€/an</div>
              <div className="text-right font-medium">150€/an</div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            * Les commissions sont versées après une période de garantie de 30 jours
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">Ce que disent nos affiliés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                      {testimonial.initial}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">Questions fréquentes</h2>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-6 space-y-4">
              <FaqItem 
                question="Qui peut devenir affilié ?" 
                answer="Toute personne majeure peut devenir affilié. Notre programme est particulièrement adapté aux blogueurs, influenceurs, formateurs, coachs et entrepreneurs dans les domaines du marketing digital, e-commerce, et business en ligne." 
              />
              <FaqItem 
                question="Combien de temps le cookie d'affiliation est-il valide ?" 
                answer="Notre cookie d'affiliation est valide pendant 60 jours. Cela signifie que si un visiteur clique sur votre lien, vous serez crédité de la commission si ce visiteur s'abonne dans les 60 jours suivant le clic." 
              />
              <FaqItem 
                question="Puis-je promouvoir Amanar Map sur plusieurs canaux ?" 
                answer="Oui, vous pouvez promouvoir Amanar Map sur tous vos canaux : site web, blog, réseaux sociaux, emails, etc. Nous fournissons des outils et ressources pour vous aider sur chaque canal." 
              />
            </TabsContent>
            
            <TabsContent value="payments" className="mt-6 space-y-4">
              <FaqItem 
                question="Quand sont versées les commissions ?" 
                answer="Les commissions sont versées mensuellement, le 15 du mois suivant. Par exemple, les commissions générées en janvier seront versées le 15 février." 
              />
              <FaqItem 
                question="Quel est le montant minimum pour être payé ?" 
                answer="Le seuil minimum de paiement est de 50€. Si vous n'atteignez pas ce montant, vos commissions sont reportées au mois suivant jusqu'à atteindre ce seuil." 
              />
              <FaqItem 
                question="Quelles sont les méthodes de paiement disponibles ?" 
                answer="Nous proposons plusieurs méthodes de paiement : virement bancaire, PayPal, et Stripe. Vous pouvez choisir votre méthode préférée dans votre tableau de bord d'affiliation." 
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to Action */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 via-secondary/50 to-primary/10 p-10 rounded-xl">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Rejoignez notre programme d'affiliation dès aujourd'hui et commencez à gagner 
            des commissions en partageant une plateforme que vous adorez.
          </p>
          
          {isAuthenticated ? (
            <Button size="lg" asChild>
              <Link to="/affiliate-dashboard">
                Accéder à mon tableau de bord
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link to="/auth?redirect=/affiliates">
                Devenir affilié maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// Benefit Card Component
const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 rounded-xl bg-card border border-border">
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-primary" })}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

// FAQ Item Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => (
  <div className="border border-border rounded-lg p-4">
    <h4 className="font-medium flex items-center mb-2">
      <CheckCircle className="h-4 w-4 text-primary mr-2" />
      {question}
    </h4>
    <p className="text-muted-foreground text-sm pl-6">{answer}</p>
  </div>
);

// Testimonials Data
const testimonials = [
  {
    quote: "Amanar Map est devenu ma principale source de revenu d'affiliation. Mes abonnés adorent la plateforme et les commissions récurrentes sont un vrai plus.",
    name: "Thomas M.",
    initial: "T",
    role: "Blogueur entrepreneurial"
  },
  {
    quote: "Le système d'affiliation est super simple à utiliser et le support répond toujours rapidement. J'ai déjà généré plus de 2000€ en 3 mois.",
    name: "Sophie L.",
    initial: "S",
    role: "Coach en marketing digital"
  },
  {
    quote: "Les ressources marketing qu'ils fournissent sont vraiment efficaces. J'ai pu facilement intégrer leur promotion dans mon podcast sans que ça paraisse forcé.",
    name: "Marc D.",
    initial: "M",
    role: "Podcaster"
  }
];

export default Affiliates;
