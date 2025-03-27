
import { Challenge } from "./types";

export const copywritingChallenge: Challenge = {
  id: "5",
  title: "Copywriting qui convertit",
  description: "Apprenez à rédiger des textes persuasifs pour augmenter vos taux de conversion.",
  category: "Copywriting",
  difficulty: "Intermédiaire",
  duration: "14 jours",
  xp: 250,
  progress: 30,
  currentStep: 3,
  totalSteps: 8,
  steps: [
    {
      id: 1,
      title: "Maîtriser les principes du copywriting",
      description: "Comprendre les fondamentaux de l'écriture persuasive et ses mécanismes.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: "Définir votre persona cible",
      description: "Analyser précisément votre audience pour adapter votre message.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 3,
      title: "Créer des headlines irrésistibles",
      description: "Techniques pour rédiger des titres accrocheurs qui captent l'attention.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 4,
      title: "Structurer vos textes commerciaux",
      description: "Organiser vos contenus selon des modèles éprouvés (AIDA, PAS, etc.).",
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 5,
      title: "Développer des arguments de vente convaincants",
      description: "Transformer les caractéristiques en bénéfices pour votre audience.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 6,
      title: "Concevoir des appels à l'action efficaces",
      description: "Créer des CTA qui déclenchent le passage à l'action immédiat.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 7,
      title: "Adapter votre copywriting aux différents canaux",
      description: "Personnaliser vos textes pour sites web, emails et réseaux sociaux.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 8,
      title: "Tester et optimiser vos conversions",
      description: "Mettre en place des tests A/B pour améliorer continuellement vos résultats.",
      isCompleted: false,
      isLocked: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide des formules de copywriting",
      type: "pdf",
      url: "#",
    },
    {
      id: 2,
      title: "Modèles de pages de vente",
      type: "template",
      url: "#",
    },
    {
      id: 3,
      title: "Checklist de copywriting convertissant",
      type: "pdf",
      url: "#",
    },
  ],
};
