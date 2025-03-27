
import { Challenge } from "./types";

export const marketingChallenge: Challenge = {
  id: "8",
  title: "Marketing Digital Efficace",
  description: "Apprenez à attirer du trafic qualifié vers vos produits et services en maîtrisant les bases du marketing digital.",
  category: "marketing",
  difficulty: "intermediate",
  duration: "21 jours",
  xp: 320,
  progress: 0,
  currentStep: 1,
  totalSteps: 7,
  objective: "Mettre en place une stratégie de marketing digital complète capable d'attirer et de convertir une audience qualifiée vers vos produits ou services.",
  prerequisites: [
    "Un produit, service ou projet à promouvoir (même personnel ou fictif)",
    "Un smartphone ou ordinateur avec connexion internet",
    "Un compte sur au moins deux réseaux sociaux (Facebook, Instagram, LinkedIn, etc.)",
    "Un petit budget test pour la publicité (15-20€ minimum)"
  ],
  learningOutcomes: [
    "Identifier et comprendre votre client idéal (persona)",
    "Créer du contenu engageant adapté à différentes plateformes",
    "Maîtriser les bases de la publicité en ligne à petit budget",
    "Analyser et optimiser vos actions marketing à l'aide de données",
    "Mettre en place un calendrier éditorial efficace"
  ],
  steps: [
    {
      id: 1,
      title: "Définition de votre persona client",
      description: "Identifiez précisément qui est votre client idéal et quels sont ses besoins et problèmes.",
      isCompleted: false,
      isLocked: false,
      estimatedTime: "2 jours",
      difficulty: "easy",
      tips: [
        "Basez votre persona sur des données réelles plutôt que sur des suppositions",
        "Soyez spécifique dans la description de votre persona (âge, profession, intérêts, etc.)",
        "Identifiez les problèmes précis que votre produit ou service résout pour cette personne",
        "Limitez-vous à 1-2 personas pour commencer, vous pourrez élargir plus tard"
      ],
      detailedInstructions: "Commencez par définir qui est votre client idéal en créant une fiche persona complète. Utilisez un modèle de persona (disponible dans les ressources) et remplissez toutes les sections: données démographiques (âge, sexe, localisation, revenus), données psychographiques (centres d'intérêt, valeurs, objectifs), défis et problèmes quotidiens, sources d'information (où cette personne se renseigne), et comportement d'achat. Si vous avez déjà une activité, basez-vous sur vos meilleurs clients actuels. Sinon, faites des recherches sur votre marché cible et interviewez 3-5 personnes qui correspondent potentiellement à votre cible. Créez une fiche visuelle de votre persona avec photo, nom fictif et toutes les informations collectées. Cette fiche vous servira de référence pour toutes vos décisions marketing futures.",
      prerequisites: [
        "Avoir défini clairement votre produit ou service",
        "Avoir fait des recherches préliminaires sur votre marché"
      ],
      expectedOutcome: "Une fiche persona détaillée avec toutes les caractéristiques de votre client idéal, ses besoins, problèmes et motivations d'achat.",
      commonMistakes: [
        "Définir un persona trop large ou trop vague (ex: 'femmes de 25 à 65 ans')",
        "Se baser uniquement sur des suppositions sans données réelles",
        "Oublier d'inclure les problèmes et objectifs spécifiques du persona",
        "Créer un persona qui vous ressemble trop à vous plutôt qu'à votre véritable client idéal"
      ],
      resources: [
        {
          title: "Modèle de fiche persona marketing",
          url: "https://example.com/modele-persona",
          type: "template",
          description: "Fichier prêt à remplir pour créer facilement votre persona client"
        },
        {
          title: "Guide d'entretien pour interviews clients",
          url: "https://example.com/guide-interview",
          type: "outil",
          description: "Questions à poser pour recueillir des informations pertinentes sur vos clients potentiels"
        },
        {
          title: "Études de cas: Personas marketing efficaces",
          url: "https://example.com/etudes-personas",
          type: "article",
          description: "Exemples concrets de personas qui ont contribué au succès de campagnes marketing"
        }
      ]
    },
    {
      id: 2,
      title: "Sélection des canaux marketing",
      description: "Choisissez les plateformes les plus adaptées à votre persona et à votre offre.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "1 jour",
      difficulty: "easy",
      tips: [
        "Privilégiez la qualité à la quantité: mieux vaut être excellent sur 2 canaux que médiocre sur 5",
        "Choisissez les plateformes où votre persona passe déjà du temps",
        "Considérez les types de contenu que vous êtes à l'aise de produire régulièrement",
        "Tenez compte des spécificités de chaque plateforme (format, audience, algorithme)"
      ],
      detailedInstructions: "En vous basant sur votre persona, identifiez où cette personne passe du temps en ligne. Consultez les statistiques démographiques des différentes plateformes sociales pour voir lesquelles correspondent le mieux à votre cible. Faites une liste des 4-5 canaux potentiels (ex: Instagram, LinkedIn, email, blog, YouTube) puis évaluez chacun selon ces critères: 1) Présence de votre persona sur cette plateforme, 2) Adéquation avec votre produit/service, 3) Votre capacité à produire du contenu adapté régulièrement, 4) Potentiel de conversion pour votre offre. Attribuez une note de 1 à 5 pour chaque critère et additionnez les scores. Sélectionnez les 2-3 canaux avec les scores les plus élevés comme canaux principaux. Pour chaque canal retenu, notez le type de contenu que vous allez y publier, la fréquence idéale de publication, et les métriques que vous suivrez pour mesurer votre succès.",
      prerequisites: [
        "Avoir défini clairement votre persona client",
        "Avoir créé des comptes sur les principales plateformes sociales"
      ],
      expectedOutcome: "Une stratégie de canaux marketing claire avec 2-3 plateformes principales identifiées, des objectifs spécifiques pour chacune, et un plan préliminaire de types de contenu à créer.",
      commonMistakes: [
        "Choisir trop de canaux et se disperser",
        "Sélectionner des plateformes uniquement parce qu'elles sont populaires",
        "Ignorer les spécificités de chaque plateforme dans votre stratégie",
        "Ne pas tenir compte de vos propres contraintes de temps et de ressources"
      ],
      resources: [
        {
          title: "Comparatif des plateformes sociales 2024",
          url: "https://example.com/comparatif-plateformes",
          type: "article",
          description: "Analyse détaillée des démographies et spécificités de chaque réseau social"
        },
        {
          title: "Matrice de sélection des canaux marketing",
          url: "https://example.com/matrice-canaux",
          type: "outil",
          description: "Outil Excel pour évaluer objectivement les canaux les plus adaptés à votre situation"
        },
        {
          title: "Formats de contenu par plateforme",
          url: "https://example.com/formats-contenu",
          type: "guide",
          description: "Dimensions, durées et formats optimaux pour chaque plateforme en 2024"
        }
      ]
    },
    {
      id: 3,
      title: "Création de contenu engageant",
      description: "Développez une semaine de contenu captivant pour vos canaux marketing sélectionnés.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "3 jours",
      difficulty: "medium",
      tips: [
        "Suivez la règle 80/20: 80% de contenu utile/divertissant et 20% promotionnel",
        "Adaptez votre ton et format au canal tout en gardant une cohérence globale",
        "Misez sur le storytelling pour créer une connexion émotionnelle",
        "Incluez systématiquement un appel à l'action clair dans chaque contenu"
      ],
      detailedInstructions: "Pour cette étape, vous allez planifier et créer une semaine complète de contenu pour vos canaux principaux. Commencez par définir 3-4 piliers de contenu - des thèmes généraux en lien avec votre offre et les intérêts de votre persona (ex: pour un coach sportif, les piliers pourraient être: exercices, nutrition, motivation, récupération). Pour chaque pilier, listez 5-10 idées de contenu spécifiques. Ensuite, créez un calendrier éditorial simple pour la semaine à venir, en assignant différentes idées aux jours appropriés sur chaque plateforme. Pour chaque contenu, notez: le pilier concerné, le titre/sujet, le format (texte, image, vidéo, etc.), les mots-clés à inclure, et l'appel à l'action. Puis, passez à la création proprement dite: rédigez les textes, préparez les visuels (utilisez Canva si nécessaire), et organisez le tout dans un dossier par jour. Adaptez chaque contenu au format spécifique de la plateforme tout en maintenant une identité visuelle et tonale cohérente.",
      prerequisites: [
        "Avoir identifié vos canaux marketing principaux",
        "Disposer des outils basiques de création de contenu (appareil photo/smartphone, logiciel d'édition simple)"
      ],
      expectedOutcome: "Un calendrier éditorial pour une semaine complète et l'ensemble du contenu prêt à être publié (textes, images, vidéos) pour vos canaux principaux, avec une cohérence globale et des appels à l'action pertinents.",
      commonMistakes: [
        "Créer du contenu trop promotionnel qui n'apporte pas de valeur à l'audience",
        "Négliger l'adaptation du format aux spécificités de chaque plateforme",
        "Oublier d'inclure des appels à l'action clairs dans chaque publication",
        "Manquer de cohérence visuelle et tonale entre les différents contenus"
      ],
      resources: [
        {
          title: "Template de calendrier éditorial",
          url: "https://example.com/calendrier-editorial",
          type: "modèle",
          description: "Modèle Excel/Google Sheets pour planifier efficacement votre contenu"
        },
        {
          title: "Bibliothèque de modèles Canva pour réseaux sociaux",
          url: "https://example.com/modeles-canva",
          type: "outil",
          description: "Accès à des templates professionnels adaptés à chaque plateforme"
        },
        {
          title: "Formules d'appels à l'action qui convertissent",
          url: "https://example.com/cta-efficaces",
          type: "guide",
          description: "25 exemples d'appels à l'action testés et approuvés pour différents objectifs"
        }
      ]
    },
    {
      id: 4,
      title: "Configuration de campagne publicitaire",
      description: "Créez et lancez une campagne publicitaire ciblée avec un budget test limité.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "2 jours",
      difficulty: "medium",
      tips: [
        "Commencez avec un petit budget (15-20€) pour tester avant d'investir davantage",
        "Ciblez très précisément votre audience en utilisant les informations de votre persona",
        "Testez plusieurs visuels et accroches pour identifier ce qui fonctionne le mieux",
        "Fixez-vous un objectif clair pour votre campagne (trafic, engagement, leads, etc.)"
      ],
      detailedInstructions: "Pour cette étape, vous allez configurer et lancer une mini-campagne publicitaire sur la plateforme la plus pertinente pour votre cible (Facebook/Instagram Ads ou Google Ads sont recommandés pour débuter). Commencez par définir clairement l'objectif de votre campagne: génération de trafic, engagement, leads, ventes... Ensuite, créez votre compte publicitaire si ce n'est pas déjà fait et familiarisez-vous avec l'interface. Préparez 2-3 visuels différents et 2-3 variantes de texte pour pouvoir tester ce qui fonctionne le mieux. Configurez votre ciblage en vous basant strictement sur les caractéristiques de votre persona: données démographiques, centres d'intérêt, comportements. Limitez votre budget quotidien (2-5€/jour) et programmez la campagne pour une durée de 3-7 jours. Assurez-vous que votre page de destination (site web, profil, etc.) est optimisée pour convertir les visiteurs. Avant de lancer, installez le pixel de suivi ou équivalent pour mesurer les résultats. Lancez la campagne et prévoyez de la surveiller quotidiennement pour faire des ajustements si nécessaire.",
      prerequisites: [
        "Avoir créé du contenu de qualité pour votre offre",
        "Disposer d'un budget minimum de 15-20€ pour tester",
        "Avoir une page de destination fonctionnelle (site web, page de vente, profil optimisé)"
      ],
      expectedOutcome: "Une campagne publicitaire active, correctement configurée et ciblée, avec plusieurs variantes de test, un budget maîtrisé et des objectifs de conversion clairs.",
      commonMistakes: [
        "Cibler une audience trop large qui dilue votre budget",
        "Créer une publicité trop promotionnelle sans valeur claire pour l'utilisateur",
        "Négliger l'optimisation de la page de destination où arrivent les utilisateurs",
        "Ne pas mettre en place les outils de suivi pour mesurer les résultats"
      ],
      resources: [
        {
          title: "Guide étape par étape: Facebook Ads pour débutants",
          url: "https://example.com/guide-facebook-ads",
          type: "tutoriel",
          description: "Instructions détaillées pour configurer votre première campagne Facebook/Instagram"
        },
        {
          title: "Checklist de lancement de campagne publicitaire",
          url: "https://example.com/checklist-campagne",
          type: "outil",
          description: "Liste des points à vérifier avant de lancer votre publicité"
        },
        {
          title: "Exemples de publicités performantes par secteur",
          url: "https://example.com/exemples-publicites",
          type: "galerie",
          description: "Collection de publicités à fort taux de conversion dans différents domaines"
        }
      ]
    },
    {
      id: 5,
      title: "Publication et suivi du contenu",
      description: "Publiez votre contenu selon votre calendrier et engagez-vous avec votre audience.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "7 jours",
      difficulty: "easy",
      tips: [
        "Utilisez des outils de programmation pour publier aux heures optimales",
        "Répondez rapidement aux commentaires et messages (idéalement sous 2h)",
        "Suivez vos statistiques quotidiennement pour identifier les contenus performants",
        "Adaptez-vous en temps réel en fonction des réactions de votre audience"
      ],
      detailedInstructions: "C'est maintenant le moment de mettre en œuvre votre plan de contenu sur une semaine complète. Commencez par programmer vos publications aux horaires optimaux (généralement entre 12h-14h et 18h-21h en semaine, mais vérifiez les statistiques spécifiques à votre audience). Utilisez un outil comme Buffer, Hootsuite ou les fonctionnalités natives de programmation pour gagner du temps. Créez une routine quotidienne: 15 minutes le matin pour vérifier les performances et répondre aux premiers commentaires, 15 minutes à midi, et 15 minutes en soirée. Pour chaque commentaire ou message reçu, apportez une réponse personnalisée qui ajoute de la valeur et encourage l'engagement (posez des questions, remerciez, apportez des informations complémentaires). Tenez un journal simple de ce qui fonctionne bien et moins bien, notez les questions fréquentes qui pourraient inspirer de futurs contenus. Si un contenu performe particulièrement bien, envisagez de le promouvoir avec un petit budget publicitaire pour amplifier son impact. À la fin de chaque journée, vérifiez les statistiques d'engagement et adaptez votre contenu des jours suivants si nécessaire.",
      prerequisites: [
        "Avoir préparé votre contenu pour la semaine",
        "Avoir configuré des outils de programmation si nécessaire",
        "Avoir accès aux statistiques sur vos plateformes"
      ],
      expectedOutcome: "Une semaine complète de contenu publié selon votre calendrier, avec des interactions régulières avec votre audience, un suivi quotidien des performances, et un journal documentant ce qui fonctionne le mieux.",
      commonMistakes: [
        "Publier et disparaître sans interagir avec les commentaires et messages",
        "Ignorer les données d'engagement qui vous indiquent ce qui fonctionne",
        "Rester trop rigide dans votre plan sans vous adapter aux réactions",
        "Négliger la régularité et la cohérence dans vos publications"
      ],
      resources: [
        {
          title: "Guide des meilleurs horaires de publication par plateforme",
          url: "https://example.com/horaires-publication",
          type: "guide",
          description: "Données actualisées sur les moments optimaux pour publier selon votre secteur"
        },
        {
          title: "Modèles de réponses pour l'engagement avec votre communauté",
          url: "https://example.com/modeles-reponses",
          type: "modèle",
          description: "Exemples de réponses professionnelles pour différents types d'interactions"
        },
        {
          title: "Template de suivi quotidien des performances",
          url: "https://example.com/suivi-performances",
          type: "outil",
          description: "Fichier simple pour documenter et analyser vos résultats jour après jour"
        }
      ]
    },
    {
      id: 6,
      title: "Analyse des résultats de campagne",
      description: "Évaluez les performances de votre campagne publicitaire et tirez-en des leçons.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "1 jour",
      difficulty: "medium",
      tips: [
        "Concentrez-vous sur les métriques qui correspondent à vos objectifs initiaux",
        "Comparez les performances des différentes variantes que vous avez testées",
        "Calculez votre coût par résultat (clic, lead, vente) pour évaluer la rentabilité",
        "Identifiez les segments d'audience qui ont le mieux répondu"
      ],
      detailedInstructions: "Après avoir laissé votre campagne publicitaire fonctionner pendant 3-7 jours, il est temps d'analyser en profondeur ses performances. Connectez-vous à votre plateforme publicitaire et exportez les données complètes. Créez un tableau d'analyse avec les métriques clés: impressions, clics, taux de clic (CTR), coût par clic (CPC), conversions (selon votre objectif), coût par conversion. Si vous avez testé plusieurs variantes (visuels ou textes différents), comparez leurs performances respectives pour identifier les éléments les plus efficaces. Analysez également quels segments de votre audience ont le mieux réagi (âge, sexe, centres d'intérêt) et à quels moments de la journée. Calculez votre retour sur investissement (ROI) si vous avez généré des ventes directes. Documentez toutes vos découvertes dans un rapport concis qui servira de base pour vos futures campagnes. Identifiez 3-5 enseignements clés et des actions concrètes d'amélioration pour votre prochaine campagne.",
      prerequisites: [
        "Avoir lancé et terminé votre campagne publicitaire test",
        "Avoir mis en place les outils de suivi appropriés",
        "Avoir défini clairement vos métriques de succès au préalable"
      ],
      expectedOutcome: "Un rapport d'analyse complet de votre campagne avec les performances détaillées, les enseignements clés, et un plan d'amélioration concret pour vos futures actions publicitaires.",
      commonMistakes: [
        "Se focaliser uniquement sur les métriques de vanité (likes, impressions) sans regarder les conversions",
        "Tirer des conclusions définitives à partir d'un échantillon trop petit de données",
        "Ne pas segmenter les résultats pour identifier les audiences les plus réceptives",
        "Oublier de documenter les enseignements pour les futures campagnes"
      ],
      resources: [
        {
          title: "Template d'analyse de campagne publicitaire",
          url: "https://example.com/template-analyse",
          type: "modèle",
          description: "Modèle Excel pour structurer votre analyse de façon professionnelle"
        },
        {
          title: "Guide d'interprétation des métriques publicitaires",
          url: "https://example.com/guide-metriques",
          type: "article",
          description: "Comment comprendre et utiliser chaque métrique pour optimiser vos campagnes"
        },
        {
          title: "Calculateur de ROI marketing",
          url: "https://example.com/calculateur-roi",
          type: "outil",
          description: "Outil en ligne pour déterminer précisément la rentabilité de vos actions marketing"
        }
      ]
    },
    {
      id: 7,
      title: "Optimisation et plan à long terme",
      description: "Créez une stratégie marketing durable basée sur vos résultats et apprentissages.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "2 jours",
      difficulty: "hard",
      tips: [
        "Basez votre stratégie sur les données réelles collectées, pas sur des suppositions",
        "Prévoyez des tests réguliers pour continuer à optimiser votre approche",
        "Équilibrez contenus organiques et payants dans votre stratégie",
        "Définissez des KPIs clairs et un système de suivi régulier"
      ],
      detailedInstructions: "Pour cette étape finale, vous allez consolider tous vos apprentissages dans une stratégie marketing structurée sur 3 mois. Commencez par faire un bilan complet: quels contenus ont généré le plus d'engagement, quels messages ont le mieux résonné, quels canaux ont été les plus efficaces, quels segments d'audience ont le mieux réagi. Sur cette base, construisez un plan en trois parties: 1) Stratégie de contenu: définissez vos piliers de contenu définitifs, la fréquence de publication sur chaque canal, et un calendrier éditorial pour le premier mois avec des thèmes spécifiques. 2) Stratégie publicitaire: planifiez vos futures campagnes en vous basant sur vos tests réussis, avec un budget progressif et des objectifs précis pour chaque étape du tunnel de conversion. 3) Système de mesure: mettez en place un tableau de bord simple pour suivre hebdomadairement vos KPIs principaux (engagement, trafic, leads, ventes) et prévoir des revues mensuelles plus approfondies. Définissez également 2-3 expérimentations à tester chaque mois pour continuer à améliorer vos performances. Rédigez votre plan sous forme de document structuré que vous pourrez suivre et ajuster au fil du temps.",
      prerequisites: [
        "Avoir complété toutes les étapes précédentes du challenge",
        "Avoir collecté et analysé des données sur vos performances",
        "Avoir identifié ce qui fonctionne et ce qui doit être amélioré"
      ],
      expectedOutcome: "Un plan marketing stratégique sur 3 mois incluant un calendrier éditorial détaillé, une stratégie publicitaire optimisée, un système de suivi des performances, et des tests d'amélioration continue planifiés.",
      commonMistakes: [
        "Créer un plan trop ambitieux qui ne sera pas tenable sur la durée",
        "Ne pas prévoir suffisamment de flexibilité pour s'adapter aux résultats",
        "Négliger l'équilibre entre acquisition de nouveaux prospects et fidélisation",
        "Oublier d'intégrer des mécanismes de test et d'amélioration continue"
      ],
      resources: [
        {
          title: "Template de plan marketing trimestriel",
          url: "https://example.com/plan-marketing",
          type: "modèle",
          description: "Document structuré pour planifier vos actions marketing sur 3 mois"
        },
        {
          title: "Tableau de bord marketing - modèle Google Data Studio",
          url: "https://example.com/tableau-bord",
          type: "outil",
          description: "Dashboard prêt à l'emploi pour suivre toutes vos métriques importantes"
        },
        {
          title: "Méthodologie d'expérimentation marketing",
          url: "https://example.com/experimentation-marketing",
          type: "guide",
          description: "Comment mettre en place des tests A/B et des expériences pour optimiser continuellement vos résultats"
        }
      ]
    }
  ],
  resources: [
    {
      id: 1,
      title: "Marketing digital pour entrepreneurs: fondamentaux et stratégies",
      type: "ebook",
      url: "https://example.com/ebook-marketing-digital",
      description: "Un guide complet couvrant toutes les bases du marketing digital efficace"
    },
    {
      id: 2,
      title: "Bibliothèque de modèles marketing",
      type: "outils",
      url: "https://example.com/modeles-marketing",
      description: "Collection de templates pour vos personas, calendriers éditoriaux, rapports d'analyse et plans marketing"
    },
    {
      id: 3,
      title: "Cours vidéo: Publicité Facebook et Instagram pour débutants",
      type: "formation",
      url: "https://example.com/cours-facebook-ads",
      description: "Formation étape par étape pour maîtriser les plateformes publicitaires de Meta"
    },
    {
      id: 4,
      title: "Communauté d'entraide marketing pour entrepreneurs",
      type: "forum",
      url: "https://example.com/communaute-marketing",
      description: "Espace d'échange avec d'autres entrepreneurs pour partager conseils et expériences"
    },
    {
      id: 5,
      title: "Outil d'analyse de contenu concurrent",
      type: "logiciel",
      url: "https://example.com/analyse-concurrence",
      description: "Plateforme pour identifier le contenu performant dans votre secteur et vous en inspirer"
    }
  ],
  faqs: [
    {
      question: "Puis-je suivre ce challenge sans avoir de produit ou service à vendre?",
      answer: "Absolument! Vous pouvez appliquer ces techniques pour un projet personnel, un blog, ou même un service fictif que vous pourriez lancer à l'avenir. L'important est d'apprendre la méthodologie et de pratiquer avec un cas concret."
    },
    {
      question: "Quel budget minimum est nécessaire pour la partie publicité?",
      answer: "Le challenge est conçu pour fonctionner avec un budget test de 15-20€ minimum. C'est suffisant pour collecter des données significatives et comprendre les mécanismes publicitaires, sans risque financier important."
    },
    {
      question: "Combien de temps par jour dois-je consacrer à ce challenge?",
      answer: "Prévoyez environ 1 heure par jour en moyenne, avec certains jours nécessitant 2-3 heures (notamment pour la création de contenu et l'analyse des résultats) et d'autres seulement 15-30 minutes (suivi et interactions)."
    },
    {
      question: "Je n'ai pas de compétences en design, est-ce un problème?",
      answer: "Pas du tout! Les ressources du challenge incluent des outils comme Canva avec des templates prêts à l'emploi qui permettent de créer des visuels professionnels sans compétences particulières en design."
    },
    {
      question: "Puis-je adapter ce challenge à mon secteur d'activité spécifique?",
      answer: "Oui, la méthodologie est universelle et s'applique à tous les secteurs. Vous adapterez votre persona, vos canaux et votre contenu à votre domaine spécifique, mais le processus reste le même qu'il s'agisse de mode, de technologie, de services professionnels ou autre."
    }
  ]
};
