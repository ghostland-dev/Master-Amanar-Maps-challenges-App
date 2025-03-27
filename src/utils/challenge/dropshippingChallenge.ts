
import { Challenge } from "./types";

// Challenge data for dropshipping
export const dropshippingChallenge: Challenge = {
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
  objective: "Réaliser votre première vente en dropshipping et acquérir les compétences fondamentales pour développer une activité e-commerce rentable.",
  prerequisites: [
    "Avoir un budget minimum de 150€ pour démarrer (plateforme e-commerce et publicité)",
    "Disposer d'une carte bancaire pour les paiements en ligne",
    "Aucune connaissance préalable en e-commerce n'est nécessaire"
  ],
  learningOutcomes: [
    "Maîtriser les fondamentaux du modèle dropshipping",
    "Identifier des niches et produits à fort potentiel",
    "Créer et configurer une boutique en ligne",
    "Mettre en place une stratégie marketing de base",
    "Gérer les commandes et la relation client"
  ],
  steps: [
    {
      id: 1,
      title: "Comprendre le modèle dropshipping",
      description: "Apprendre les bases du dropshipping et comment ce modèle fonctionne.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "2 heures",
      difficulty: "easy",
      tips: [
        "Prenez des notes sur les avantages et inconvénients du dropshipping",
        "Analysez des exemples concrets de boutiques qui utilisent ce modèle",
        "Identifiez les erreurs courantes à éviter"
      ],
      resources: [
        {
          title: "Guide complet du débutant en dropshipping",
          url: "#",
          type: "pdf"
        },
        {
          title: "Vidéo: Comment fonctionne le dropshipping",
          url: "#",
          type: "video"
        }
      ]
    },
    {
      id: 2,
      title: "Trouver une niche rentable",
      description: "Rechercher et identifier une niche de marché avec un bon potentiel de profit.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "3 heures",
      difficulty: "medium",
      tips: [
        "Utilisez des outils comme Google Trends pour identifier les tendances",
        "Analysez la concurrence sur au moins 5 niches potentielles",
        "Évaluez la taille du marché et la demande"
      ]
    },
    {
      id: 3,
      title: "Recherche de produits à fort potentiel",
      description: "Utiliser des outils pour trouver des produits tendance et à forte marge.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "4 heures",
      difficulty: "medium"
    },
    {
      id: 4,
      title: "Sélectionner des fournisseurs fiables",
      description: "Identifier et contacter des fournisseurs de qualité pour vos produits.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "3 heures",
      difficulty: "medium"
    },
    {
      id: 5,
      title: "Créer votre boutique en ligne",
      description: "Configurer votre site e-commerce avec Shopify ou WooCommerce.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "5 heures",
      difficulty: "hard"
    },
    {
      id: 6,
      title: "Rédiger des descriptions produits qui convertissent",
      description: "Apprendre à écrire des textes persuasifs pour vos fiches produits.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "3 heures",
      difficulty: "medium"
    },
    {
      id: 7,
      title: "Configurer la logistique et les paiements",
      description: "Mettre en place votre système de commande, livraison et paiement.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "2 heures",
      difficulty: "medium"
    },
    {
      id: 8,
      title: "Stratégie marketing de base",
      description: "Définir votre stratégie pour attirer vos premiers clients.",
      isCompleted: false,
      isLocked: false,
      estimatedTime: "4 heures",
      difficulty: "medium"
    },
    {
      id: 9,
      title: "Publicité sur les réseaux sociaux",
      description: "Créer et lancer vos premières campagnes publicitaires.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "5 heures",
      difficulty: "hard"
    },
    {
      id: 10,
      title: "Optimisation du taux de conversion",
      description: "Améliorer l'expérience utilisateur pour augmenter vos ventes.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "4 heures",
      difficulty: "medium"
    },
    {
      id: 11,
      title: "Réaliser votre première vente",
      description: "Techniques pour finaliser votre première transaction.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "2 heures",
      difficulty: "easy"
    },
    {
      id: 12,
      title: "Analyse et optimisation",
      description: "Analyser vos résultats et optimiser votre stratégie.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "3 heures",
      difficulty: "medium"
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide complet du dropshipping",
      type: "pdf",
      url: "#",
      description: "Un guide de 50 pages couvrant tous les aspects essentiels du dropshipping"
    },
    {
      id: 2,
      title: "Liste des meilleurs fournisseurs",
      type: "pdf",
      url: "#",
      description: "Comparatif détaillé de 20 fournisseurs fiables pour le dropshipping"
    },
    {
      id: 3,
      title: "Modèle de plan marketing",
      type: "template",
      url: "#",
      description: "Template prêt à l'emploi pour définir votre stratégie marketing"
    },
    {
      id: 4,
      title: "Calculateur de marge",
      type: "simulator",
      url: "/simulators/margin",
      description: "Outil pour calculer précisément vos marges et seuils de rentabilité"
    }
  ],
  faqs: [
    {
      question: "Est-ce que je dois avoir une entreprise déclarée pour démarrer?",
      answer: "Non, vous pouvez commencer en tant que particulier, mais si votre activité devient rentable, il est recommandé de créer une structure juridique adaptée."
    },
    {
      question: "Combien de temps avant de réaliser ma première vente?",
      answer: "Cela varie considérablement, mais avec une stratégie efficace, vous pourriez réaliser votre première vente dans les 1-2 semaines suivant le lancement de votre boutique."
    },
    {
      question: "Quelle plateforme est recommandée pour les débutants?",
      answer: "Shopify est généralement recommandée pour les débutants en raison de sa facilité d'utilisation et ses nombreuses intégrations pour le dropshipping."
    }
  ]
};
