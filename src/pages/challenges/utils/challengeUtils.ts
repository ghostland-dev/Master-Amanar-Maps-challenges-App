
import type { SortOption } from "../Challenges";

// Category labels mapping
export const categoryLabels: Record<string, string> = {
  "ecommerce": "E-commerce",
  "crypto": "Crypto",
  "achat-revente": "Achat/Revente",
  "affiliation": "Affiliation",
  "copywriting": "Copywriting",
  "marketing": "Marketing",
  "developpement": "Développement",
  "design": "Design",
};

// Function to sort challenges based on sort option
export const sortChallenges = (challenges: any[], sortOption: SortOption) => {
  const sortedChallenges = [...challenges];
  
  switch (sortOption) {
    case "popular":
      return sortedChallenges.sort((a, b) => b.participants - a.participants);
    case "newest":
      return sortedChallenges.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
    case "xp-high":
      return sortedChallenges.sort((a, b) => b.xp - a.xp);
    case "xp-low":
      return sortedChallenges.sort((a, b) => a.xp - b.xp);
    case "duration-short":
      return sortedChallenges.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    case "duration-long":
      return sortedChallenges.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
    default:
      return sortedChallenges;
  }
};

// Function to get all challenges
export const getChallenges = () => {
  return [
    {
      id: "1",
      title: "Première vente en Dropshipping",
      description: "Lancez votre première boutique en ligne et réalisez une vente en dropshipping.",
      category: "ecommerce",
      icon: "Layers",
      difficulty: "beginner" as const,
      duration: "14 jours",
      xp: 300,
      participants: 587,
      steps: 12,
      isPopular: true,
      rewards: ["Badge Vendeur", "Accès au forum E-commerce"],
      completedBy: 420,
      rating: 4.7,
      progress: 65,
      isNew: false,
    },
    {
      id: "2",
      title: "Portfolio Crypto Diversifié",
      description: "Créez et gérez un portefeuille diversifié de cryptomonnaies.",
      category: "crypto",
      icon: "TrendingUp",
      difficulty: "intermediate" as const,
      duration: "30 jours",
      xp: 450,
      participants: 495,
      steps: 10,
      isPopular: false,
      rewards: ["Badge Investisseur", "10€ en Bitcoin"],
      completedBy: 187,
      rating: 4.3,
      progress: 25,
      isNew: false,
    },
    {
      id: "3",
      title: "Arbitrage de produits",
      description: "Trouvez des produits sous-évalués et revendez-les à profit sur différentes plateformes.",
      category: "achat-revente",
      icon: "ShoppingCart",
      difficulty: "beginner" as const,
      duration: "21 jours",
      xp: 350,
      participants: 463,
      steps: 8,
      isPopular: false,
      rewards: ["Badge Négociateur", "Modèles de calcul de marge"],
      completedBy: 293,
      rating: 4.6,
      progress: 0,
      isNew: false,
    },
    {
      id: "4",
      title: "Programme d'affiliation rentable",
      description: "Créez un système d'affiliation qui génère des revenus récurrents.",
      category: "affiliation",
      icon: "Link",
      difficulty: "intermediate" as const,
      duration: "45 jours",
      xp: 500,
      participants: 389,
      steps: 9,
      isPopular: false,
      rewards: ["Badge Partenaire", "Guide des meilleurs programmes d'affiliation"],
      completedBy: 156,
      rating: 4.1,
      progress: 0,
      isNew: false,
    },
    {
      id: "5",
      title: "Copywriting qui convertit",
      description: "Apprenez à rédiger des textes persuasifs pour augmenter vos taux de conversion.",
      category: "copywriting",
      icon: "PenTool",
      difficulty: "intermediate" as const,
      duration: "14 jours",
      xp: 250,
      participants: 352,
      steps: 8,
      isPopular: false,
      rewards: ["Badge Écrivain", "Modèles de textes promotionnels"],
      completedBy: 223,
      rating: 4.8,
      progress: 0,
      isNew: false,
    },
    {
      id: "6",
      title: "Trading de NFTs",
      description: "Explorez le marché des NFTs et développez une stratégie de trading efficace.",
      category: "crypto",
      icon: "TrendingUp",
      difficulty: "advanced" as const,
      duration: "30 jours",
      xp: 550,
      participants: 247,
      steps: 10,
      isPopular: false,
      rewards: ["Badge Collectionneur", "NFT exclusif FinQuest"],
      completedBy: 103,
      rating: 4.4,
      progress: 0,
      isNew: true,
    },
    {
      id: "7",
      title: "Stratégie Instagram pour entrepreneurs",
      description: "Développez une présence professionnelle sur Instagram et attirez des clients qualifiés.",
      category: "marketing",
      icon: "PenTool",
      difficulty: "beginner" as const,
      duration: "21 jours",
      xp: 320,
      participants: 578,
      steps: 7,
      isPopular: true,
      rewards: ["Badge Influenceur", "Guide de croissance Instagram"],
      completedBy: 342,
      rating: 4.6,
      progress: 0,
      isNew: true,
    },
    {
      id: "8",
      title: "Construire une audience sur YouTube",
      description: "Créez et développez une chaîne YouTube rentable dans votre domaine d'expertise.",
      category: "marketing",
      icon: "PenTool",
      difficulty: "intermediate" as const,
      duration: "60 jours",
      xp: 480,
      participants: 312,
      steps: 12,
      isPopular: false,
      rewards: ["Badge Créateur", "Accès aux ressources premium"],
      completedBy: 124,
      rating: 4.5,
      progress: 0,
      isNew: true,
    },
  ];
};
