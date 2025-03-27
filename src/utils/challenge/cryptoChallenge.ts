
import { Challenge } from "./types";

// Challenge data for crypto portfolio
export const cryptoChallenge: Challenge = {
  id: "2",
  title: "Portfolio Crypto Diversifié",
  description: "Créez et gérez un portefeuille diversifié de cryptomonnaies pour maximiser vos gains tout en minimisant les risques.",
  category: "Crypto",
  difficulty: "Intermédiaire",
  duration: "30 jours",
  xp: 450,
  progress: 35,
  currentStep: 4,
  totalSteps: 10,
  steps: [
    {
      id: 1,
      title: "Comprendre les bases des cryptomonnaies",
      description: "Apprendre les concepts fondamentaux de la blockchain et des cryptomonnaies.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: "Ouvrir un compte sur une plateforme d'échange",
      description: "Sélectionner et configurer un compte sur une plateforme d'échange fiable.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 3,
      title: "Sécuriser vos investissements",
      description: "Mettre en place des solutions de sécurité pour protéger vos actifs numériques.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 4,
      title: "Analyser les principales cryptomonnaies",
      description: "Étudier les projets, équipes et cas d'usage des cryptomonnaies majeures.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 5,
      title: "Élaborer une stratégie de diversification",
      description: "Définir une allocation d'actifs équilibrée entre différentes catégories de cryptos.",
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 6,
      title: "Réaliser vos premiers investissements",
      description: "Effectuer vos premières transactions selon votre stratégie d'allocation.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 7,
      title: "Utiliser l'analyse technique de base",
      description: "Apprendre à lire les graphiques et identifier les tendances principales.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 8,
      title: "Mettre en place un plan de DCA (Dollar Cost Averaging)",
      description: "Créer une stratégie d'investissement régulier pour réduire la volatilité.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 9,
      title: "Surveiller et ajuster votre portefeuille",
      description: "Mettre en place des outils pour suivre la performance de votre portefeuille.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 10,
      title: "Définir une stratégie de prise de profits",
      description: "Établir des règles claires pour sécuriser vos gains.",
      isCompleted: false,
      isLocked: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide d'introduction aux cryptomonnaies",
      type: "pdf",
      url: "#",
    },
    {
      id: 2,
      title: "Comparatif des plateformes d'échange",
      type: "pdf",
      url: "#",
    },
    {
      id: 3,
      title: "Modèle d'allocation d'actifs",
      type: "template",
      url: "#",
    },
    {
      id: 4,
      title: "Simulateur de DCA",
      type: "simulator",
      url: "/simulators",
    },
  ],
};
