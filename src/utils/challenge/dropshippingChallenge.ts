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
      detailedInstructions: "Dans cette première étape, vous allez vous familiariser avec le modèle dropshipping en étudiant son fonctionnement, ses avantages et ses inconvénients. Commencez par regarder la vidéo d'introduction, puis lisez le guide PDF complet. Prenez des notes sur les points clés et créez un document résumant les éléments essentiels que vous avez appris.",
      expectedOutcome: "À la fin de cette étape, vous serez capable d'expliquer clairement le modèle dropshipping, son fonctionnement, ses avantages et ses limites. Vous aurez également identifié les compétences nécessaires pour réussir dans ce domaine.",
      prerequisites: [
        "Aucun prérequis technique nécessaire",
        "Prévoir un cahier ou document numérique pour prendre des notes"
      ],
      tips: [
        "Prenez des notes détaillées sur les avantages et inconvénients du dropshipping",
        "Analysez en profondeur 3-4 exemples concrets de boutiques qui utilisent ce modèle avec succès",
        "Identifiez au moins 5 erreurs courantes à éviter quand on débute",
        "Créez un glossaire des termes techniques que vous rencontrez pour vous y référer plus tard"
      ],
      commonMistakes: [
        "Se précipiter sans comprendre complètement le modèle économique",
        "Sous-estimer l'importance de la logistique et des délais de livraison",
        "Ne pas considérer les aspects légaux (mentions légales, CGV, etc.)"
      ],
      resources: [
        {
          title: "Guide complet du débutant en dropshipping",
          url: "#",
          type: "pdf",
          description: "Un guide de 50 pages couvrant tous les fondamentaux du modèle"
        },
        {
          title: "Vidéo: Comment fonctionne le dropshipping",
          url: "#",
          type: "video",
          description: "Explication claire et visuelle du processus complet en 15 minutes"
        },
        {
          title: "Les bases juridiques du e-commerce",
          url: "#",
          type: "article",
          description: "Informations essentielles sur les obligations légales"
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
      detailedInstructions: "Dans cette étape cruciale, vous allez apprendre à identifier une niche de marché profitable pour votre boutique. Commencez par étudier les outils de recherche de tendances comme Google Trends, puis suivez la méthodologie d'analyse de niche détaillée dans les ressources. Vous devrez évaluer au moins 5 niches potentielles selon les critères de rentabilité, concurrence et tendances.",
      expectedOutcome: "À la fin de cette étape, vous aurez identifié 1-2 niches prometteuses avec des produits spécifiques et une audience cible bien définie. Vous disposerez également d'une analyse comparative des niches étudiées.",
      tips: [
        "Utilisez des outils comme Google Trends pour identifier les tendances sur 12-24 mois",
        "Analysez méthodiquement la concurrence sur au moins 5 niches potentielles",
        "Évaluez la taille du marché et la demande à l'aide d'outils d'analyse de mots-clés",
        "Vérifiez le volume de recherche mensuel pour les produits de votre niche",
        "Privilégiez les niches avec une audience passionnée et prête à dépenser"
      ],
      commonMistakes: [
        "Choisir une niche uniquement parce qu'elle vous passionne sans vérifier son potentiel commercial",
        "Sélectionner une niche trop compétitive ou dominée par des grandes marques",
        "Ne pas évaluer correctement les marges potentielles dans la niche"
      ],
      resources: [
        {
          title: "Méthodologie de recherche de niche rentable",
          url: "#",
          type: "pdf",
          description: "Guide étape par étape pour identifier et évaluer des niches profitables"
        },
        {
          title: "Tutorial: Utiliser Google Trends efficacement",
          url: "#",
          type: "tutorial",
          description: "Comment exploiter toutes les fonctionnalités de cet outil gratuit"
        },
        {
          title: "Modèle d'analyse comparative de niche",
          url: "#",
          type: "template",
          description: "Tableur prêt à l'emploi pour comparer différentes niches"
        }
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
      difficulty: "medium",
      detailedInstructions: "Dans cette étape essentielle, vous allez configurer l'ensemble de votre système logistique et de paiement. Suivez le guide pas à pas pour connecter votre boutique avec vos fournisseurs, configurer les méthodes de paiement sécurisées et mettre en place le système de suivi des commandes pour vos clients.",
      expectedOutcome: "À la fin de cette étape, votre boutique sera entièrement fonctionnelle avec un processus automatisé de traitement des commandes, des options de paiement sécurisées et un système de suivi des livraisons pour vos clients.",
      prerequisites: [
        "Avoir déjà créé votre boutique en ligne (étape 5)",
        "Avoir sélectionné vos fournisseurs (étape 4)",
        "Disposer d'un compte PayPal Business ou Stripe"
      ],
      tips: [
        "Configurez plusieurs méthodes de paiement pour maximiser vos taux de conversion",
        "Testez entièrement le processus de commande avant de lancer votre boutique",
        "Assurez-vous que les délais de livraison sont clairement indiqués",
        "Créez des e-mails automatiques pour chaque étape du processus de commande",
        "Vérifiez que tous les aspects fiscaux sont correctement configurés"
      ],
      commonMistakes: [
        "Négliger les frais de transaction dans le calcul de vos marges",
        "Ne pas tester le processus de commande de bout en bout",
        "Oublier de configurer les e-mails de confirmation et de suivi",
        "Sous-estimer l'importance des conditions de remboursement et de retour"
      ],
      resources: [
        {
          title: "Guide de configuration Shopify-AliExpress",
          url: "#",
          type: "tutorial",
          description: "Configuration complète et détaillée avec Oberlo ou DSers"
        },
        {
          title: "Modèles d'e-mails pour le suivi client",
          url: "#",
          type: "template",
          description: "10 modèles d'e-mails personnalisables pour chaque étape"
        },
        {
          title: "Vidéo: Configuration des paiements sécurisés",
          url: "#",
          type: "video",
          description: "Guide étape par étape pour configurer PayPal et Stripe"
        }
      ]
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
