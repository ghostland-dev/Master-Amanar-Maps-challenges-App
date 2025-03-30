
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter FAQs based on search term
  const filteredFaqs = faqData.filter(
    category => 
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      category.faqs.some(
        faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <MainLayout title="FAQ" description="Questions fréquentes sur Amanar Map et ses services">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Foire Aux Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Trouvez rapidement des réponses à vos questions les plus courantes sur nos challenges, simulateurs et services.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher une question..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.map((category) => (
            <div key={category.id} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <div className="prose prose-sm dark:prose-invert">
                        <p>{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucune question ne correspond à votre recherche. Essayez avec d'autres termes.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// Mock data for FAQ
const faqData = [
  {
    id: 'general',
    title: 'Questions générales',
    faqs: [
      {
        id: 1,
        question: "Qu'est-ce qu'Amanar Map ?",
        answer: "Amanar Map est une plateforme éducative qui vous aide à développer vos compétences pour générer des revenus en ligne. Nous proposons des challenges guidés, des simulateurs et des ressources pour vous accompagner dans votre parcours vers la liberté financière."
      },
      {
        id: 2,
        question: "Comment fonctionne la plateforme ?",
        answer: "Vous pouvez vous inscrire gratuitement et accéder à certains challenges et simulateurs. Notre approche est basée sur des mini-défis pratiques qui vous permettent d'apprendre par la pratique. Chaque challenge est découpé en étapes simples à suivre."
      },
      {
        id: 3,
        question: "Faut-il des compétences particulières pour commencer ?",
        answer: "Non, nos challenges sont conçus pour être accessibles aux débutants. Nous vous guidons pas à pas, même si vous n'avez aucune expérience préalable. Vous pourrez progresser à votre rythme."
      }
    ]
  },
  {
    id: 'challenges',
    title: 'Challenges',
    faqs: [
      {
        id: 4,
        question: "Comment sont structurés les challenges ?",
        answer: "Chaque challenge est divisé en étapes claires avec des instructions précises. Vous avez accès à des ressources, des conseils et une assistance pour réussir chaque étape. Une fois le challenge terminé, vous recevez un badge de réussite."
      },
      {
        id: 5,
        question: "Combien de temps faut-il pour compléter un challenge ?",
        answer: "La durée varie selon le challenge et votre rythme. Certains peuvent être complétés en quelques heures, d'autres peuvent prendre plusieurs semaines. L'important est de progresser régulièrement."
      },
      {
        id: 6,
        question: "Puis-je travailler sur plusieurs challenges en même temps ?",
        answer: "Oui, vous pouvez travailler sur plusieurs challenges simultanément. Cependant, nous recommandons de se concentrer sur un seul challenge à la fois pour maximiser vos chances de réussite, surtout si vous débutez."
      }
    ]
  },
  {
    id: 'subscriptions',
    title: 'Abonnements',
    faqs: [
      {
        id: 7,
        question: "Quels sont les avantages de l'abonnement Premium ?",
        answer: "L'abonnement Premium vous donne accès à tous les challenges, tous les simulateurs, du contenu exclusif dans la bibliothèque, un accès prioritaire au support, et des analyses détaillées de vos performances."
      },
      {
        id: 8,
        question: "Comment puis-je annuler mon abonnement ?",
        answer: "Vous pouvez annuler votre abonnement à tout moment depuis votre espace personnel dans la section 'Paramètres > Abonnement'. L'annulation prendra effet à la fin de votre période de facturation en cours."
      },
      {
        id: 9,
        question: "Y a-t-il une garantie de remboursement ?",
        answer: "Oui, nous offrons une garantie de remboursement de 14 jours pour tous nos abonnements. Si vous n'êtes pas satisfait, contactez notre service client dans les 14 jours suivant votre achat."
      }
    ]
  },
  {
    id: 'technical',
    title: 'Support technique',
    faqs: [
      {
        id: 10,
        question: "Comment puis-je contacter le support ?",
        answer: "Vous pouvez nous contacter via le formulaire de contact sur notre site, par email à support@amanarmap.com, ou via le chat en direct disponible pour les membres Premium."
      },
      {
        id: 11,
        question: "Le site est-il compatible avec tous les appareils ?",
        answer: "Oui, notre plateforme est entièrement responsive et fonctionne sur ordinateurs, tablettes et smartphones. Vous pouvez y accéder depuis n'importe quel navigateur moderne."
      }
    ]
  }
];

export default FAQ;
