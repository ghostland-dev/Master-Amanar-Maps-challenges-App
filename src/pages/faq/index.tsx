
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Search, Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filtrer les FAQs selon la recherche et la catégorie
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <MainLayout title="FAQ" description="Réponses aux questions fréquentes sur Amanar Map">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Foire Aux Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus fréquemment posées sur Amanar Map, nos services et notre fonctionnement.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une question..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button 
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeCategory === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            Toutes
          </button>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeCategory === category.value 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-b border-border">
                  <AccordionTrigger className="py-4 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground mt-2">
                Essayez d'autres termes de recherche ou parcourez les catégories ci-dessus.
              </p>
            </div>
          )}
        </div>
        
        {/* Contact */}
        <div className="mt-12 text-center bg-muted/30 p-8 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Notre équipe de support est là pour vous aider. N'hésitez pas à nous contacter si vous avez d'autres questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contacter le support</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Catégories de FAQ
const categories = [
  { label: "Compte", value: "account" },
  { label: "Abonnements", value: "subscriptions" },
  { label: "Challenges", value: "challenges" },
  { label: "Paiements", value: "payments" },
  { label: "Affiliation", value: "affiliate" },
  { label: "Technique", value: "technical" }
];

// Données de FAQ
const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "Comment créer un compte sur Amanar Map ?",
    answer: "Pour créer un compte sur Amanar Map, cliquez sur le bouton <strong>S'inscrire</strong> en haut à droite de la page d'accueil. Vous pouvez vous inscrire avec votre adresse email, ou utiliser vos comptes Google ou Facebook pour une inscription rapide. Remplissez ensuite les informations demandées pour finaliser votre profil.",
    category: "account"
  },
  {
    id: "faq-2",
    question: "Puis-je essayer Amanar Map gratuitement avant de m'abonner ?",
    answer: "Oui, Amanar Map propose un accès gratuit à certaines fonctionnalités de base et challenges. Vous pouvez explorer la plateforme et tester nos outils sans engagement. Pour accéder à l'ensemble des fonctionnalités premium et challenges avancés, vous devrez souscrire à un abonnement.",
    category: "subscriptions"
  },
  {
    id: "faq-3",
    question: "Comment fonctionnent les challenges ?",
    answer: "Les challenges sont des parcours d'apprentissage pratiques qui vous guident étape par étape pour acquérir de nouvelles compétences. Chaque challenge est divisé en étapes concrètes à réaliser. Vous progressez à votre rythme en validant chaque étape, et recevez des récompenses (badges, points XP) à mesure que vous avancez. Vous pouvez également poser des questions et échanger avec la communauté pendant votre progression.",
    category: "challenges"
  },
  {
    id: "faq-4",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes de crédit et de débit (Visa, Mastercard, American Express), PayPal, et dans certains pays, les virements bancaires. Toutes les transactions sont sécurisées et cryptées pour protéger vos informations.",
    category: "payments"
  },
  {
    id: "faq-5",
    question: "Comment fonctionne le programme d'affiliation ?",
    answer: "Notre programme d'affiliation vous permet de gagner des commissions en recommandant Amanar Map. Après inscription au programme, vous recevez un lien de parrainage unique. Lorsque quelqu'un s'abonne via votre lien, vous recevez jusqu'à 30% de commission sur le montant de leur abonnement. Les commissions sont versées mensuellement une fois que votre solde atteint 50€.",
    category: "affiliate"
  },
  {
    id: "faq-6",
    question: "Comment puis-je annuler mon abonnement ?",
    answer: "Pour annuler votre abonnement, connectez-vous à votre compte, allez dans <strong>Paramètres > Abonnements</strong> et cliquez sur \"Gérer mon abonnement\". Suivez ensuite les instructions pour procéder à l'annulation. Vous conserverez l'accès aux fonctionnalités premium jusqu'à la fin de votre période de facturation en cours.",
    category: "subscriptions"
  },
  {
    id: "faq-7",
    question: "Mes progrès sont-ils sauvegardés si je change d'appareil ?",
    answer: "Oui, tous vos progrès sont sauvegardés dans votre compte Amanar Map. Vous pouvez vous connecter depuis n'importe quel appareil (ordinateur, tablette, smartphone) et retrouver votre progression exactement là où vous l'aviez laissée.",
    category: "technical"
  },
  {
    id: "faq-8",
    question: "Comment obtenir de l'aide si je bloque sur un challenge ?",
    answer: "Si vous rencontrez des difficultés sur un challenge, plusieurs options s'offrent à vous :<br><br>1. Consultez les conseils et astuces disponibles dans chaque étape du challenge<br>2. Posez votre question dans la section commentaires du challenge<br>3. Rejoignez notre communauté Discord où d'autres membres et mentors peuvent vous aider<br>4. Pour les abonnés Premium, utilisez la fonctionnalité \"Assistance prioritaire\" pour obtenir une réponse personnalisée de nos experts",
    category: "challenges"
  },
  {
    id: "faq-9",
    question: "Puis-je télécharger les ressources pour les consulter hors ligne ?",
    answer: "Oui, la plupart des ressources (guides PDF, fiches pratiques, templates) peuvent être téléchargées pour une consultation hors ligne. Les vidéos ne sont disponibles qu'en streaming pour protéger notre contenu, mais les abonnés Premium peuvent télécharger certaines vidéos sélectionnées pour un visionnage hors ligne.",
    category: "technical"
  },
  {
    id: "faq-10",
    question: "Quand sont versées les commissions d'affiliation ?",
    answer: "Les commissions d'affiliation sont calculées à la fin de chaque mois et versées le 15 du mois suivant, à condition que votre solde atteigne au moins 50€. Par exemple, les commissions générées en janvier seront versées le 15 février si vous avez atteint le seuil minimum. Les paiements sont effectués par PayPal ou virement bancaire selon votre préférence.",
    category: "affiliate"
  },
  {
    id: "faq-11",
    question: "Comment mettre à jour mes informations de paiement ?",
    answer: "Pour mettre à jour vos informations de paiement, connectez-vous à votre compte et accédez à <strong>Paramètres > Facturation</strong>. Cliquez sur \"Modifier les informations de paiement\" et suivez les instructions pour ajouter ou modifier votre carte ou compte PayPal. Vos informations seront immédiatement mises à jour pour les prochains paiements.",
    category: "payments"
  },
  {
    id: "faq-12",
    question: "Comment puis-je récupérer mon mot de passe ?",
    answer: "Si vous avez oublié votre mot de passe, cliquez sur \"Mot de passe oublié ?\" sur la page de connexion. Saisissez l'adresse email associée à votre compte pour recevoir un lien de réinitialisation. Suivez les instructions dans l'email pour créer un nouveau mot de passe sécurisé.",
    category: "account"
  }
];

export default FAQ;
