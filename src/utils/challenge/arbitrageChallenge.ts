
import { Challenge } from "./types";

// Challenge data for product arbitrage
export const arbitrageChallenge: Challenge = {
  id: "3",
  title: "Arbitrage de produits",
  description: "Trouvez des produits sous-évalués et revendez-les à profit sur différentes plateformes.",
  category: "Achat-Revente",
  difficulty: "Débutant",
  duration: "21 jours",
  xp: 350,
  progress: 20,
  currentStep: 2,
  totalSteps: 8,
  steps: [
    {
      id: 1,
      title: "Comprendre le concept d'arbitrage",
      description: "Apprendre les bases de l'arbitrage de produits et les différentes approches.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: "Identifier les plateformes d'achat et de revente",
      description: "Sélectionner les meilleures plateformes pour acheter et revendre vos produits.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 3,
      title: "Techniques de recherche de produits sous-évalués",
      description: "Maîtriser les méthodes pour identifier des opportunités d'arbitrage rentables.",
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 4,
      title: "Calculer tous les coûts et marges",
      description: "Prendre en compte frais d'achat, commissions, expédition et taxes.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 5,
      title: "Effectuer vos premiers achats stratégiques",
      description: "Acquérir vos premiers produits à fort potentiel de revente.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 6,
      title: "Créer des annonces optimisées",
      description: "Concevoir des fiches produits attractives pour maximiser les ventes.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 7,
      title: "Optimiser la logistique et les expéditions",
      description: "Organiser efficacement le stockage, l'emballage et l'expédition.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 8,
      title: "Développer votre activité d'arbitrage",
      description: "Mettre en place un système de scaling pour augmenter votre volume et vos profits.",
      isCompleted: false,
      isLocked: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide d'arbitrage sur les marketplaces",
      type: "pdf",
      url: "#",
    },
    {
      id: 2,
      title: "Liste de produits à fort potentiel",
      type: "pdf",
      url: "#",
    },
    {
      id: 3,
      title: "Calculateur de marges d'arbitrage",
      type: "simulator",
      url: "/simulators/margin",
    },
  ],
};
