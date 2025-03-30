
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FaqItem from "./FaqItem";
import FaqAccordion from "./FaqAccordion";

const FaqSection = () => {
  const faqItems = [
    {
      question: "Quand sont versées les commissions ?",
      answer: "Les commissions sont versées le 15 de chaque mois pour le mois précédent, à condition que votre solde atteigne le minimum de 50€."
    },
    {
      question: "Comment sont tracées les ventes ?",
      answer: "Nous utilisons des cookies avec une durée de vie de 365 jours. Si un utilisateur clique sur votre lien et s'abonne dans l'année, vous recevez votre commission."
    },
    {
      question: "Puis-je promouvoir vos services sur les réseaux sociaux ?",
      answer: "Absolument ! Vous êtes libre d'utiliser tous les canaux de communication que vous souhaitez, tant que vous respectez nos conditions d'utilisation."
    },
    {
      question: "Y a-t-il un minimum de ventes à réaliser ?",
      answer: "Non, il n'y a pas de minimum de ventes. Vous pouvez promouvoir nos services à votre rythme sans aucune contrainte de performance."
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-10">Questions fréquentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          <FaqItem
            question="Quand sont versées les commissions ?"
            answer="Les commissions sont versées le 15 de chaque mois pour le mois précédent, à condition que votre solde atteigne le minimum de 50€."
          />
          <FaqItem
            question="Comment sont tracées les ventes ?"
            answer="Nous utilisons des cookies avec une durée de vie de 365 jours. Si un utilisateur clique sur votre lien et s'abonne dans l'année, vous recevez votre commission."
          />
        </div>
        <div className="space-y-4">
          <FaqItem
            question="Puis-je promouvoir vos services sur les réseaux sociaux ?"
            answer="Absolument ! Vous êtes libre d'utiliser tous les canaux de communication que vous souhaitez, tant que vous respectez nos conditions d'utilisation."
          />
          <FaqItem
            question="Y a-t-il un minimum de ventes à réaliser ?"
            answer="Non, il n'y a pas de minimum de ventes. Vous pouvez promouvoir nos services à votre rythme sans aucune contrainte de performance."
          />
        </div>
      </div>
      <div className="mt-8 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Plus de questions ?</h3>
        <FaqAccordion items={faqItems.slice(0, 2)} />
      </div>
      <div className="text-center mt-10">
        <Button variant="outline" asChild>
          <Link to="/faq" className="flex items-center">
            Voir toutes les FAQ <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FaqSection;
