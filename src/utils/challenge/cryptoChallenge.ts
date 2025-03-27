
import { Challenge } from "./types";

// Challenge data for crypto portfolio
export const cryptoChallenge: Challenge = {
  id: "2",
  title: "Portfolio Crypto Diversifié",
  description: "Créez et gérez un portefeuille diversifié de cryptomonnaies pour maximiser vos gains tout en minimisant les risques. Ce challenge vous guidera à travers toutes les étapes nécessaires pour construire une stratégie d'investissement crypto solide et réfléchie.",
  category: "Crypto",
  difficulty: "Intermédiaire",
  duration: "30 jours",
  xp: 450,
  progress: 35,
  currentStep: 4,
  totalSteps: 10,
  objective: "Construire un portefeuille crypto diversifié et équilibré qui reflète une stratégie d'investissement réfléchie, avec une répartition des actifs adaptée à votre profil de risque et vos objectifs financiers.",
  prerequisites: [
    "Disposer d'un budget minimum de 200€ à investir (vous pouvez commencer avec moins, mais l'expérience sera plus limitée)",
    "Posséder une pièce d'identité valide pour les vérifications KYC des plateformes",
    "Avoir un smartphone ou un ordinateur avec une connexion internet sécurisée",
    "Avoir des connaissances de base en finance (pas obligatoire mais utile)"
  ],
  learningOutcomes: [
    "Comprendre les fondamentaux de la technologie blockchain et des cryptomonnaies",
    "Maîtriser l'analyse fondamentale et technique de base pour évaluer les projets crypto",
    "Développer une stratégie d'investissement adaptée à votre profil de risque",
    "Sécuriser efficacement vos actifs numériques contre le vol et la perte",
    "Gérer et optimiser votre portefeuille sur le long terme",
    "Comprendre les implications fiscales des investissements en cryptomonnaies"
  ],
  steps: [
    {
      id: 1,
      title: "Comprendre les bases des cryptomonnaies",
      description: "Apprendre les concepts fondamentaux de la blockchain et des cryptomonnaies.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "3 heures",
      difficulty: "easy",
      detailedInstructions: "Cette première étape vous permettra d'acquérir les connaissances fondamentales nécessaires pour investir en connaissance de cause. Commencez par étudier le livre blanc de Bitcoin et les principes de la blockchain. Ensuite, familiarisez-vous avec les différentes catégories de cryptomonnaies (monnaies, tokens utilitaires, tokens de sécurité, etc.) et leur cas d'usage. Comprenez également les mécanismes de consensus comme la Preuve de Travail et la Preuve d'Enjeu.",
      expectedOutcome: "À la fin de cette étape, vous serez capable d'expliquer clairement ce qu'est la blockchain, comment fonctionnent les cryptomonnaies, et quelle est la différence entre les principales catégories d'actifs numériques. Vous comprendrez également les fondamentaux qui déterminent la valeur d'un projet crypto.",
      prerequisites: [
        "Aucun prérequis technique spécifique",
        "Préparer un cahier ou document numérique pour prendre des notes"
      ],
      tips: [
        "Ne vous précipitez pas pour investir avant d'avoir compris les bases",
        "Utilisez des sources d'information variées et vérifiez toujours les informations",
        "Créez un lexique personnel des termes techniques pour vous y référer",
        "Rejoignez des communautés d'apprentissage pour poser vos questions",
        "Suivez quelques influenceurs crypto réputés pour leur sérieux et leur pédagogie"
      ],
      commonMistakes: [
        "Confondre le trading à court terme et l'investissement à long terme",
        "Investir sans comprendre la technologie sous-jacente",
        "Se fier uniquement au prix passé pour évaluer une cryptomonnaie",
        "Négliger l'importance de l'équipe de développement derrière un projet"
      ],
      resources: [
        {
          title: "Guide complet du débutant en cryptomonnaies",
          url: "#",
          type: "pdf",
          description: "Un manuel de 60 pages couvrant tous les concepts fondamentaux avec des explications claires"
        },
        {
          title: "Vidéo: La blockchain expliquée simplement",
          url: "#",
          type: "video",
          description: "Une explication visuelle de 20 minutes sur le fonctionnement de la blockchain"
        },
        {
          title: "Lexique des termes crypto",
          url: "#",
          type: "article",
          description: "Un dictionnaire complet des termes spécifiques à l'écosystème crypto"
        },
        {
          title: "Histoire des cryptomonnaies",
          url: "#",
          type: "article",
          description: "L'évolution du secteur depuis la création de Bitcoin jusqu'à aujourd'hui"
        }
      ]
    },
    {
      id: 2,
      title: "Ouvrir un compte sur une plateforme d'échange",
      description: "Sélectionner et configurer un compte sur une plateforme d'échange fiable.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "2 heures",
      difficulty: "easy",
      detailedInstructions: "Le choix de la plateforme d'échange est crucial pour votre sécurité et votre expérience d'investissement. Dans cette étape, vous comparerez plusieurs plateformes selon des critères comme la sécurité, les frais, la variété des cryptomonnaies disponibles, les méthodes de paiement acceptées et le service client. Une fois votre choix fait, vous ouvrirez un compte et passerez la vérification d'identité (KYC).",
      expectedOutcome: "À la fin de cette étape, vous aurez un compte vérifié sur une plateforme d'échange réputée, avec des méthodes de dépôt configurées et l'authentification à deux facteurs (2FA) activée. Vous serez prêt à effectuer vos premiers achats.",
      prerequisites: [
        "Avoir terminé l'étape 1 pour comprendre les bases",
        "Disposer d'une pièce d'identité valide (passeport, carte d'identité)",
        "Avoir un justificatif de domicile récent",
        "Préparer un moyen de paiement (virement bancaire ou carte bancaire)"
      ],
      tips: [
        "Privilégiez les plateformes réglementées dans votre juridiction",
        "Activez immédiatement l'authentification à deux facteurs (2FA)",
        "Utilisez une adresse email dédiée à vos activités crypto",
        "Vérifiez les frais de trading et de retrait avant de choisir définitivement",
        "Lisez attentivement les avis et vérifiez l'historique de sécurité de la plateforme"
      ],
      commonMistakes: [
        "Choisir une plateforme uniquement sur la base des frais les plus bas",
        "Ne pas activer toutes les fonctionnalités de sécurité disponibles",
        "Partager ses identifiants de connexion avec d'autres personnes",
        "Négliger de vérifier si la plateforme est régulée dans votre pays"
      ],
      resources: [
        {
          title: "Comparatif détaillé des plateformes d'échange",
          url: "#",
          type: "pdf",
          description: "Analyse complète de 10 plateformes majeures avec leurs avantages et inconvénients"
        },
        {
          title: "Guide de sécurisation de votre compte d'échange",
          url: "#",
          type: "article",
          description: "Étapes essentielles pour protéger votre compte contre les piratages"
        },
        {
          title: "Tutoriel: Comment passer la vérification KYC facilement",
          url: "#",
          type: "video",
          description: "Guide pas à pas pour compléter rapidement la vérification d'identité"
        },
        {
          title: "Les méthodes de dépôt comparées",
          url: "#",
          type: "article",
          description: "Analyse des différentes méthodes de dépôt (délais, frais, limites)"
        }
      ]
    },
    {
      id: 3,
      title: "Sécuriser vos investissements",
      description: "Mettre en place des solutions de sécurité pour protéger vos actifs numériques.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "2 heures",
      difficulty: "medium",
      detailedInstructions: "La sécurité est primordiale dans l'écosystème crypto. Vous apprendrez à protéger vos actifs contre les piratages, les arnaques et les erreurs humaines. Cette étape couvre la création de portefeuilles (wallets) sécurisés, la gestion de vos clés privées, et l'élaboration d'un protocole de sécurité personnel pour tous vos investissements crypto.",
      expectedOutcome: "À la fin de cette étape, vous aurez configuré au moins un portefeuille non-custodial (où vous contrôlez vos clés privées), établi un système de sauvegarde sécurisé pour vos phrases de récupération, et créé une stratégie de stockage adaptée à vos besoins. Vous connaîtrez également les principales menaces de sécurité et comment les éviter.",
      prerequisites: [
        "Avoir ouvert un compte sur une plateforme d'échange (étape 2)",
        "Disposer d'un appareil (ordinateur ou smartphone) sécurisé et à jour",
        "Avoir un moyen sécurisé de stocker vos informations confidentielles (coffre, etc.)"
      ],
      tips: [
        "Ne stockez jamais votre phrase de récupération numériquement (captures d'écran, documents, emails)",
        "Répartissez vos actifs entre différents types de stockage selon leur valeur",
        "Testez toujours le processus de récupération de vos portefeuilles",
        "Utilisez des portefeuilles hardware pour vos investissements à long terme",
        "Méfiez-vous des offres trop belles pour être vraies et des demandes d'aide non sollicitées"
      ],
      commonMistakes: [
        "Laisser tous ses actifs sur des plateformes d'échange (\"Not your keys, not your coins\")",
        "Partager sa phrase de récupération avec qui que ce soit",
        "Ignorer les mises à jour de sécurité de vos portefeuilles",
        "Cliquer sur des liens suspects dans des emails ou messages prétendant venir de votre plateforme"
      ],
      resources: [
        {
          title: "Guide de sécurité crypto pour investisseurs",
          url: "#",
          type: "pdf",
          description: "Manuel complet des meilleures pratiques de sécurité pour protéger vos actifs"
        },
        {
          title: "Tutoriel: Configuration d'un portefeuille non-custodial",
          url: "#",
          type: "video",
          description: "Instructions détaillées pour configurer différents types de portefeuilles"
        },
        {
          title: "Les arnaques crypto courantes et comment les éviter",
          url: "#",
          type: "article",
          description: "Présentation des techniques d'arnaque les plus fréquentes dans l'écosystème crypto"
        },
        {
          title: "Comparatif des portefeuilles hardware",
          url: "#",
          type: "article",
          description: "Analyse des principales solutions de stockage matériel avec leurs avantages et inconvénients"
        }
      ]
    },
    {
      id: 4,
      title: "Analyser les principales cryptomonnaies",
      description: "Étudier les projets, équipes et cas d'usage des cryptomonnaies majeures.",
      isCompleted: true,
      isLocked: false,
      estimatedTime: "5 heures",
      difficulty: "medium",
      detailedInstructions: "L'analyse fondamentale est essentielle pour faire des choix d'investissement éclairés. Dans cette étape, vous apprendrez à évaluer les cryptomonnaies selon des critères objectifs: qualité de l'équipe, utilité du projet, avantage concurrentiel, tokenomics, adoption, etc. Vous étudierez en détail au moins 10 cryptomonnaies majeures pour comprendre leurs forces et faiblesses.",
      expectedOutcome: "À la fin de cette étape, vous serez capable d'analyser méthodiquement un projet crypto et de déterminer s'il présente un potentiel d'investissement. Vous aurez constitué une liste de projets de qualité pour votre futur portefeuille, avec une analyse détaillée de chacun.",
      prerequisites: [
        "Avoir complété les étapes 1 à 3",
        "Disposer de temps pour lire les whitepapers et faire des recherches approfondies",
        "Savoir distinguer des sources d'information fiables"
      ],
      tips: [
        "Lisez toujours le whitepaper d'un projet avant d'investir",
        "Vérifiez l'expérience et les antécédents de l'équipe de développement",
        "Évaluez l'utilité réelle du token dans l'écosystème du projet",
        "Analysez la distribution des tokens et le calendrier de déblocage",
        "Recherchez des projets qui résolvent des problèmes concrets"
      ],
      commonMistakes: [
        "Se fier uniquement au prix et aux mouvements du marché pour évaluer un projet",
        "Investir dans un projet uniquement parce qu'il est promu par des influenceurs",
        "Ignorer les métriques on-chain et l'activité réelle du réseau",
        "Ne pas vérifier la concurrence et les avantages distinctifs du projet"
      ],
      resources: [
        {
          title: "Méthodologie d'analyse fondamentale pour cryptomonnaies",
          url: "#",
          type: "pdf",
          description: "Cadre complet pour évaluer systématiquement la qualité d'un projet crypto"
        },
        {
          title: "Analyse détaillée des 10 principales cryptomonnaies",
          url: "#",
          type: "article",
          description: "Étude approfondie des forces, faiblesses et perspectives des plus grands projets"
        },
        {
          title: "Comprendre la tokenomics: guide complet",
          url: "#",
          type: "video",
          description: "Explication des mécanismes économiques qui influencent la valeur d'un token"
        },
        {
          title: "Tableau comparatif des projets crypto par secteur",
          url: "#",
          type: "template",
          description: "Outil pour comparer les projets selon leur secteur d'activité (DeFi, NFT, Layer 1, etc.)"
        }
      ]
    },
    {
      id: 5,
      title: "Élaborer une stratégie de diversification",
      description: "Définir une allocation d'actifs équilibrée entre différentes catégories de cryptos.",
      isCompleted: false,
      isLocked: false,
      estimatedTime: "3 heures",
      difficulty: "hard",
      detailedInstructions: "La diversification est la clé pour gérer le risque. Dans cette étape, vous allez définir votre profil d'investisseur (conservateur, modéré, agressif) et créer une stratégie d'allocation d'actifs adaptée. Vous apprendrez à répartir vos investissements entre différentes catégories (Layer 1, DeFi, NFT, etc.) et niveaux de risque pour optimiser le rapport rendement/risque.",
      expectedOutcome: "À la fin de cette étape, vous aurez élaboré une stratégie d'allocation personnalisée avec des pourcentages précis pour chaque catégorie d'actifs. Vous aurez sélectionné les cryptomonnaies spécifiques pour chaque catégorie et défini le montant exact à investir dans chacune.",
      prerequisites: [
        "Avoir analysé plusieurs cryptomonnaies (étape 4)",
        "Définir clairement vos objectifs financiers à court et long terme",
        "Évaluer honnêtement votre tolérance au risque"
      ],
      tips: [
        "Commencez par allouer une plus grande part aux projets établis comme Bitcoin et Ethereum",
        "N'investissez dans des projets à haut risque que ce que vous êtes prêt à perdre",
        "Répartissez vos investissements sur différentes catégories de projets",
        "Considérez la corrélation entre les différents actifs dans votre portefeuille",
        "Prévoyez des liquidités pour saisir de futures opportunités d'investissement"
      ],
      commonMistakes: [
        "Investir trop lourdement dans des projets à haut risque/haute récompense",
        "Négliger de rééquilibrer périodiquement son portefeuille",
        "Ignorer les corrélations entre les différents crypto-actifs",
        "S'écarter de sa stratégie sous le coup de l'émotion (FOMO, FUD)"
      ],
      resources: [
        {
          title: "Modèles de portefeuilles crypto par profil de risque",
          url: "#",
          type: "template",
          description: "Exemples d'allocations pour différents profils d'investisseurs"
        },
        {
          title: "Guide de diversification en crypto",
          url: "#",
          type: "pdf",
          description: "Stratégies avancées pour créer un portefeuille équilibré et résistant"
        },
        {
          title: "Calculateur de corrélation entre crypto-actifs",
          url: "#",
          type: "simulator",
          description: "Outil pour mesurer les corrélations historiques entre différentes cryptomonnaies"
        },
        {
          title: "Webinaire: Construction d'un portefeuille crypto optimal",
          url: "#",
          type: "video",
          description: "Présentation des principes de construction de portefeuille par des experts"
        }
      ]
    },
    {
      id: 6,
      title: "Réaliser vos premiers investissements",
      description: "Effectuer vos premières transactions selon votre stratégie d'allocation.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "2 heures",
      difficulty: "medium",
      detailedInstructions: "Il est temps de passer à l'action! Dans cette étape, vous allez réaliser vos premiers achats selon votre stratégie d'allocation. Vous apprendrez à utiliser efficacement les interfaces de trading, à placer différents types d'ordres, et à optimiser vos transactions pour minimiser les frais. Vous mettrez également en place un système pour documenter tous vos investissements.",
      expectedOutcome: "À la fin de cette étape, vous aurez investi dans au moins 3-5 cryptomonnaies différentes selon votre plan d'allocation. Vous maîtriserez le processus d'achat sur votre plateforme d'échange et aurez transféré vos actifs vers des solutions de stockage appropriées.",
      tips: [
        "Utilisez des ordres limites plutôt que des ordres au marché pour économiser sur les frais",
        "Échelonnez vos achats pour éviter l'impact de la volatilité à court terme",
        "Tenez un journal détaillé de toutes vos transactions pour le suivi et les impôts",
        "Transférez immédiatement les actifs à long terme vers vos portefeuilles sécurisés",
        "Vérifiez toujours deux fois les adresses avant d'effectuer des transferts"
      ],
      commonMistakes: [
        "Investir tout son budget d'un coup au lieu d'échelonner ses achats",
        "Se précipiter pour acheter pendant une hausse de marché (FOMO)",
        "Négliger les coûts de transaction dans le calcul de la rentabilité",
        "Envoyer des fonds vers une mauvaise adresse ou un mauvais réseau"
      ],
      resources: [
        {
          title: "Guide des types d'ordres en trading crypto",
          url: "#",
          type: "article",
          description: "Explication détaillée des différents types d'ordres et de leur utilisation"
        },
        {
          title: "Modèle de suivi de portefeuille crypto",
          url: "#",
          type: "template",
          description: "Feuille de calcul pour suivre tous vos investissements et leur performance"
        },
        {
          title: "Tutoriel: Comment optimiser ses frais de transaction",
          url: "#",
          type: "video",
          description: "Techniques pour minimiser les coûts lors de l'achat et du transfert de cryptomonnaies"
        }
      ]
    },
    {
      id: 7,
      title: "Utiliser l'analyse technique de base",
      description: "Apprendre à lire les graphiques et identifier les tendances principales.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "4 heures",
      difficulty: "medium",
      detailedInstructions: "L'analyse technique peut vous aider à optimiser vos points d'entrée et de sortie. Dans cette étape, vous apprendrez les bases de la lecture de graphiques, l'identification des tendances, et l'utilisation des indicateurs techniques les plus courants. Vous vous familiariserez avec les concepts de support, résistance, et moyennes mobiles.",
      expectedOutcome: "À la fin de cette étape, vous serez capable d'analyser un graphique de prix basique, d'identifier les tendances principales et de reconnaître certains patterns de marché. Vous saurez utiliser quelques indicateurs techniques fondamentaux pour guider vos décisions d'achat et de vente.",
      tips: [
        "Commencez par maîtriser les concepts de base avant d'utiliser des indicateurs complexes",
        "Utilisez toujours plusieurs timeframes pour confirmer une tendance",
        "Combinez l'analyse technique avec l'analyse fondamentale pour une vision complète",
        "N'oubliez pas que l'analyse technique a ses limites, surtout dans un marché volatile",
        "Pratiquez régulièrement avec des outils de graphiques avant d'investir de l'argent réel"
      ],
      commonMistakes: [
        "Surcharger ses graphiques avec trop d'indicateurs",
        "Prendre des décisions basées uniquement sur un seul indicateur",
        "Ignorer le contexte plus large du marché et les facteurs fondamentaux",
        "Faire du sur-trading en réagissant à chaque mouvement de prix mineur"
      ],
      resources: [
        {
          title: "Les bases de l'analyse technique pour les cryptomonnaies",
          url: "#",
          type: "pdf",
          description: "Guide complet des concepts fondamentaux de l'analyse technique adaptés aux crypto"
        },
        {
          title: "Cours vidéo: Lecture de graphiques pour débutants",
          url: "#",
          type: "video",
          description: "Formation pas à pas sur l'interprétation des graphiques de prix"
        },
        {
          title: "Les 10 indicateurs techniques essentiels expliqués",
          url: "#",
          type: "article",
          description: "Présentation détaillée des indicateurs les plus utiles avec exemples pratiques"
        }
      ]
    },
    {
      id: 8,
      title: "Mettre en place un plan de DCA (Dollar Cost Averaging)",
      description: "Créer une stratégie d'investissement régulier pour réduire la volatilité.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "2 heures",
      difficulty: "easy",
      detailedInstructions: "Le DCA est une stratégie qui consiste à investir régulièrement de petites sommes plutôt qu'un montant important en une seule fois. Dans cette étape, vous allez apprendre à créer et mettre en œuvre un plan d'investissement régulier, à définir la fréquence et les montants adaptés à votre situation, et à automatiser ce processus lorsque c'est possible.",
      expectedOutcome: "À la fin de cette étape, vous aurez mis en place un plan DCA personnalisé avec des montants et une fréquence définis. Vous aurez configuré des achats automatiques si votre plateforme le permet, ou créé un système de rappel pour les achats manuels.",
      tips: [
        "Choisissez une fréquence d'investissement qui correspond à vos revenus (hebdomadaire, mensuelle)",
        "Définissez un montant que vous pouvez maintenir sur le long terme sans difficulté",
        "Restez discipliné et suivez votre plan, même pendant les périodes de marché baissier",
        "Réajustez votre stratégie DCA périodiquement mais pas trop fréquemment",
        "Automatisez le processus si possible pour éviter les décisions émotionnelles"
      ],
      commonMistakes: [
        "Abandonner sa stratégie DCA pendant les périodes de baisse du marché",
        "Modifier constamment les montants en fonction des émotions du moment",
        "Investir plus que ce que l'on peut se permettre de perdre",
        "Ne pas tenir compte de l'évolution de sa situation financière personnelle"
      ],
      resources: [
        {
          title: "Guide complet du Dollar Cost Averaging en crypto",
          url: "#",
          type: "pdf",
          description: "Tout ce que vous devez savoir sur le DCA et comment l'optimiser"
        },
        {
          title: "Calculateur d'investissement DCA",
          url: "#",
          type: "simulator",
          description: "Outil pour simuler différentes stratégies DCA et leurs résultats potentiels"
        },
        {
          title: "Comment automatiser vos investissements crypto",
          url: "#",
          type: "article",
          description: "Guide pour configurer des achats récurrents sur différentes plateformes"
        }
      ]
    },
    {
      id: 9,
      title: "Surveiller et ajuster votre portefeuille",
      description: "Mettre en place des outils pour suivre la performance de votre portefeuille.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "2 heures",
      difficulty: "medium",
      detailedInstructions: "Un suivi régulier est essentiel pour optimiser votre portefeuille. Dans cette étape, vous découvrirez comment surveiller efficacement vos investissements, mettre en place des alertes de prix, et utiliser des outils de suivi de portefeuille. Vous apprendrez également quand et comment rééquilibrer votre allocation d'actifs.",
      expectedOutcome: "À la fin de cette étape, vous aurez configuré au moins un outil de suivi de portefeuille, défini des alertes pertinentes, et établi un calendrier de révision régulière. Vous saurez quand et comment ajuster votre portefeuille en fonction de l'évolution du marché et de vos objectifs.",
      tips: [
        "Utilisez des outils spécialisés pour le suivi plutôt que des feuilles de calcul manuelles",
        "Configurez des alertes de prix pour vous avertir des mouvements significatifs",
        "Planifiez des révisions régulières de votre portefeuille (mensuelles, trimestrielles)",
        "Ajustez votre allocation en fonction de la performance relative des actifs",
        "Révisez votre stratégie en fonction des évolutions majeures du marché ou de votre situation"
      ],
      commonMistakes: [
        "Vérifier son portefeuille de manière obsessionnelle (plusieurs fois par jour)",
        "Réagir émotionnellement aux fluctuations quotidiennes du marché",
        "Ajuster sa stratégie trop fréquemment sans avoir une vision à long terme",
        "Ignorer les changements fondamentaux dans les projets de son portefeuille"
      ],
      resources: [
        {
          title: "Top 5 des applications de suivi de portefeuille crypto",
          url: "#",
          type: "article",
          description: "Comparaison des meilleures solutions pour suivre vos investissements"
        },
        {
          title: "Guide du rééquilibrage de portefeuille",
          url: "#",
          type: "pdf",
          description: "Stratégies et méthodologies pour optimiser périodiquement votre allocation"
        },
        {
          title: "Modèle d'audit trimestriel de portefeuille",
          url: "#",
          type: "template",
          description: "Format structuré pour évaluer régulièrement la performance de vos investissements"
        }
      ]
    },
    {
      id: 10,
      title: "Définir une stratégie de prise de profits",
      description: "Établir des règles claires pour sécuriser vos gains.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "3 heures",
      difficulty: "hard",
      detailedInstructions: "Savoir quand et comment prendre ses profits est aussi important que savoir quand investir. Dans cette étape, vous apprendrez différentes stratégies de prise de profits, à définir des objectifs de prix réalistes, et à mettre en place un système discipliné pour sécuriser vos gains progressivement sans céder aux émotions.",
      expectedOutcome: "À la fin de cette étape, vous aurez défini une stratégie personnalisée de prise de profits avec des niveaux spécifiques pour chaque actif de votre portefeuille. Vous disposerez d'un plan écrit qui guidera vos décisions de vente et de réinvestissement des profits.",
      prerequisites: [
        "Avoir un portefeuille crypto actif (étapes 1-6)",
        "Comprendre les bases de l'analyse de marché (étape 7)",
        "Avoir défini clairement vos objectifs financiers"
      ],
      tips: [
        "Définissez à l'avance des niveaux de prise de profits progressifs",
        "Considérez la fiscalité avant de vendre vos actifs",
        "Maintenez une perspective à long terme même lors des prises de profits",
        "Réinvestissez une partie de vos gains selon un plan prédéfini",
        "N'ayez pas peur de prendre des profits partiels pendant les hausses importantes"
      ],
      commonMistakes: [
        "Attendre le \"sommet\" parfait pour vendre, ce qui conduit souvent à manquer l'opportunité",
        "Vendre la totalité d'une position au lieu d'échelonner ses prises de profits",
        "Céder à l'avidité en ignorant sa stratégie prédéfinie pendant un bull market",
        "Ne pas tenir compte des implications fiscales lors des prises de profits"
      ],
      resources: [
        {
          title: "Stratégies de prise de profits en crypto",
          url: "#",
          type: "pdf",
          description: "Guide complet des différentes approches pour sécuriser ses gains"
        },
        {
          title: "Calculateur d'objectifs de prix et de prise de profits",
          url: "#",
          type: "simulator",
          description: "Outil pour déterminer des niveaux de sortie optimaux selon différents scénarios"
        },
        {
          title: "Workshop: Psychologie de l'investisseur et gestion des émotions",
          url: "#",
          type: "video",
          description: "Formation sur la gestion des biais émotionnels qui affectent les décisions de vente"
        },
        {
          title: "Guide fiscal pour investisseurs crypto",
          url: "#",
          type: "article",
          description: "Présentation des implications fiscales des gains en cryptomonnaies"
        }
      ]
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide d'introduction aux cryptomonnaies",
      type: "pdf",
      url: "#",
      description: "Manuel complet de 80 pages couvrant tous les aspects de l'investissement en cryptomonnaies"
    },
    {
      id: 2,
      title: "Comparatif des plateformes d'échange",
      type: "pdf",
      url: "#",
      description: "Analyse détaillée de 15 plateformes d'échange avec leurs avantages, inconvénients et frais"
    },
    {
      id: 3,
      title: "Modèle d'allocation d'actifs",
      type: "template",
      url: "#",
      description: "Feuille de calcul pour créer et suivre votre stratégie d'allocation de portefeuille"
    },
    {
      id: 4,
      title: "Simulateur de DCA",
      type: "simulator",
      url: "/simulators",
      description: "Outil interactif pour calculer les résultats potentiels de différentes stratégies d'investissement régulier"
    },
    {
      id: 5,
      title: "Webinaire: Cryptomonnaies et fiscalité",
      type: "video",
      url: "#",
      description: "Présentation complète des aspects fiscaux liés aux investissements en cryptomonnaies"
    }
  ],
  faqs: [
    {
      question: "Quel est le montant minimum pour commencer à investir?",
      answer: "Il n'y a pas de montant minimum absolu, vous pouvez commencer avec aussi peu que 50€. Cependant, un budget initial de 200-500€ est recommandé pour construire un portefeuille suffisamment diversifié et couvrir les frais de transaction."
    },
    {
      question: "Dois-je déclarer mes investissements en cryptomonnaies aux impôts?",
      answer: "Oui, dans la plupart des pays, les plus-values réalisées sur les cryptomonnaies sont imposables. Il est important de tenir un registre détaillé de toutes vos transactions et de vous informer sur la réglementation fiscale spécifique à votre pays."
    },
    {
      question: "Combien de cryptomonnaies différentes devrais-je inclure dans mon portefeuille?",
      answer: "Pour un débutant, il est recommandé de commencer avec 5-7 cryptomonnaies soigneusement sélectionnées. Trop diversifier au début peut rendre le suivi difficile, tandis qu'une diversification insuffisante augmente le risque."
    },
    {
      question: "Est-il préférable d'investir en une fois ou progressivement?",
      answer: "Pour la plupart des investisseurs, l'approche progressive (DCA - Dollar Cost Averaging) est recommandée car elle réduit l'impact de la volatilité et le risque d'entrer sur le marché à un pic. Cette méthode consiste à investir régulièrement de petites sommes plutôt qu'un montant important en une seule fois."
    }
  ]
};
