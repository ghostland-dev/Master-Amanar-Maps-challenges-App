
import { Challenge } from "./types";

// Add more challenges with their steps
export const affiliationChallenge: Challenge = {
  id: "4",
  title: "Programme d'affiliation rentable",
  description: "Créez un système d'affiliation qui génère des revenus récurrents.",
  category: "Affiliation",
  difficulty: "Intermédiaire",
  duration: "45 jours",
  xp: 500,
  progress: 10,
  currentStep: 1,
  totalSteps: 9,
  steps: [
    {
      id: 1,
      title: "Comprendre le marketing d'affiliation",
      description: "Apprendre les fondamentaux de l'affiliation et les différents modèles de rémunération.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: "Rechercher une niche rentable",
      description: "Identifier un secteur avec des produits à forte commission et demande stable.",
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 3,
      title: "Évaluer les programmes d'affiliation",
      description: "Comparer et sélectionner les programmes offrant les meilleures conditions.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 4,
      title: "Créer votre plateforme de contenu",
      description: "Mettre en place un blog, site ou chaîne pour promouvoir vos liens d'affiliation.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 5,
      title: "Produire du contenu à forte valeur ajoutée",
      description: "Créer des contenus qui génèrent de la confiance et incitent à l'action.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 6,
      title: "Optimiser pour le référencement naturel",
      description: "Améliorer la visibilité de votre contenu dans les moteurs de recherche.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 7,
      title: "Construire une liste d'emails qualifiée",
      description: "Développer votre base d'abonnés pour promouvoir vos offres d'affiliation.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 8,
      title: "Analyser et optimiser les conversions",
      description: "Utiliser les données pour améliorer vos taux de clics et de conversion.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 9,
      title: "Développer des revenus récurrents",
      description: "Promouvoir des produits à abonnement pour stabiliser vos revenus mensuels.",
      isCompleted: false,
      isLocked: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide complet du marketing d'affiliation",
      type: "pdf",
      url: "#",
    },
    {
      id: 2,
      title: "Liste des meilleurs programmes d'affiliation",
      type: "pdf",
      url: "#",
    },
    {
      id: 3,
      title: "Modèle de plan marketing d'affiliation",
      type: "template",
      url: "#",
    },
    {
      id: 4,
      title: "Calculateur de revenus d'affiliation",
      type: "simulator",
      url: "/simulators",
    },
  ],
};
