export interface ChallengeStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface ChallengeResource {
  id: number;
  title: string;
  type: string;
  url: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  xp: number;
  progress: number;
  currentStep: number;
  totalSteps: number;
  steps: ChallengeStep[];
  resources: ChallengeResource[];
}

// Challenge data for dropshipping
const dropshippingChallenge: Challenge = {
  id: "1",
  title: "Première vente en Dropshipping",
  description: "Lancez votre première boutique en ligne et réalisez une vente en dropshipping. Ce challenge vous guidera étape par étape dans la création de votre business en ligne, de la recherche de produits jusqu'à votre première vente.",
  category: "E-commerce",
  difficulty: "Débutant",
  duration: "14 jours",
  xp: 300,
  progress: 65,
  currentStep: 7,
  totalSteps: 12,
  steps: [
    {
      id: 1,
      title: "Comprendre le modèle dropshipping",
      description: "Apprendre les bases du dropshipping et comment ce modèle fonctionne.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: "Trouver une niche rentable",
      description: "Rechercher et identifier une niche de marché avec un bon potentiel de profit.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 3,
      title: "Recherche de produits à fort potentiel",
      description: "Utiliser des outils pour trouver des produits tendance et à forte marge.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 4,
      title: "Sélectionner des fournisseurs fiables",
      description: "Identifier et contacter des fournisseurs de qualité pour vos produits.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 5,
      title: "Créer votre boutique en ligne",
      description: "Configurer votre site e-commerce avec Shopify ou WooCommerce.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 6,
      title: "Rédiger des descriptions produits qui convertissent",
      description: "Apprendre à écrire des textes persuasifs pour vos fiches produits.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 7,
      title: "Configurer la logistique et les paiements",
      description: "Mettre en place votre système de commande, livraison et paiement.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 8,
      title: "Stratégie marketing de base",
      description: "Définir votre stratégie pour attirer vos premiers clients.",
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 9,
      title: "Publicité sur les réseaux sociaux",
      description: "Créer et lancer vos premières campagnes publicitaires.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 10,
      title: "Optimisation du taux de conversion",
      description: "Améliorer l'expérience utilisateur pour augmenter vos ventes.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 11,
      title: "Réaliser votre première vente",
      description: "Techniques pour finaliser votre première transaction.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 12,
      title: "Analyse et optimisation",
      description: "Analyser vos résultats et optimiser votre stratégie.",
      isCompleted: false,
      isLocked: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide complet du dropshipping",
      type: "pdf",
      url: "#",
    },
    {
      id: 2,
      title: "Liste des meilleurs fournisseurs",
      type: "pdf",
      url: "#",
    },
    {
      id: 3,
      title: "Modèle de plan marketing",
      type: "template",
      url: "#",
    },
    {
      id: 4,
      title: "Calculateur de marge",
      type: "simulator",
      url: "/simulators/margin",
    },
  ],
};

// Challenge data for crypto portfolio
const cryptoChallenge: Challenge = {
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

// Challenge data for product arbitrage
const arbitrageChallenge: Challenge = {
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

// Add more challenges with their steps
const affiliationChallenge: Challenge = {
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

const copywritingChallenge: Challenge = {
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

const nftChallenge: Challenge = {
  id: "6",
  title: "Trading de NFTs",
  description: "Explorez le marché des NFTs et développez une stratégie de trading efficace.",
  category: "Crypto",
  difficulty: "Avancé",
  duration: "30 jours",
  xp: 550,
  progress: 15,
  currentStep: 2,
  totalSteps: 10,
  steps: [
    {
      id: 1,
      title: "Comprendre l'écosystème NFT",
      description: "Découvrir les concepts fondamentaux des NFTs et leurs cas d'usage.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: "Configurer un wallet NFT sécurisé",
      description: "Mettre en place et sécuriser un portefeuille compatible avec les NFTs.",
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 3,
      title: "Explorer les principales marketplaces",
      description: "Se familiariser avec OpenSea, Rarible et autres plateformes d'échange.",
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 4,
      title: "Évaluer la valeur des collections NFT",
      description: "Identifier les critères qui déterminent la valeur d'une collection.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 5,
      title: "Analyser les facteurs de valorisation",
      description: "Comprendre ce qui influence le prix et l'attractivité des NFTs.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 6,
      title: "Investir dans vos premiers NFTs",
      description: "Acquérir des NFTs selon une stratégie d'investissement réfléchie.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 7,
      title: "Suivre les tendances du marché",
      description: "Utiliser les outils et communautés pour anticiper les évolutions.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 8,
      title: "Participer à des drops et mints",
      description: "Stratégies pour accéder aux lancements de nouvelles collections.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 9,
      title: "Élaborer une stratégie de revente",
      description: "Définir des critères et moments optimaux pour revendre avec profit.",
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 10,
      title: "Gérer un portfolio NFT diversifié",
      description: "Techniques pour équilibrer et optimiser votre collection de NFTs.",
      isCompleted: false,
      isLocked: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide complet sur les NFTs",
      type: "pdf",
      url: "#",
    },
    {
      id: 2,
      title: "Analyse des principales collections NFT",
      type: "pdf",
      url: "#",
    },
    {
      id: 3,
      title: "Outils de suivi du marché NFT",
      type: "pdf",
      url: "#",
    },
    {
      id: 4,
      title: "Simulateur de ROI pour NFTs",
      type: "simulator",
      url: "/simulators",
    },
  ],
};

// Map of challenges
const challengesMap: Record<string, Challenge> = {
  "1": dropshippingChallenge,
  "2": cryptoChallenge,
  "3": arbitrageChallenge,
  "4": affiliationChallenge,
  "5": copywritingChallenge,
  "6": nftChallenge,
};

export const getChallengeData = (id: string): Challenge => {
  return challengesMap[id] || dropshippingChallenge;
};
