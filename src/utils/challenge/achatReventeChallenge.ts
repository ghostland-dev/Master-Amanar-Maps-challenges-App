
import { Challenge } from "./types";

export const achatReventeChallenge: Challenge = {
  id: "7",
  title: "Achat / Revente de produits",
  description: "Apprenez à acheter des produits à bas prix et les revendre avec une marge bénéficiaire pour générer des revenus réguliers sans compétences techniques particulières.",
  category: "achat-revente",
  difficulty: "beginner",
  duration: "14 jours",
  xp: 300,
  progress: 0,
  currentStep: 1,
  totalSteps: 8,
  objective: "Réaliser vos premières ventes avec bénéfice en achetant des produits à prix bas et en les revendant avec une marge optimisée.",
  prerequisites: [
    "Un petit budget initial (50-200€) pour vos premiers achats",
    "Un smartphone avec appareil photo pour prendre des photos de qualité",
    "Un compte sur les plateformes de vente (Leboncoin, Vinted, Facebook Marketplace...)",
    "De la patience et de la persévérance pour chercher les bonnes affaires"
  ],
  learningOutcomes: [
    "Identifier les niches de produits rentables pour l'achat/revente",
    "Maîtriser les techniques d'achat à bas prix et de négociation",
    "Créer des annonces attractives qui génèrent des ventes rapides",
    "Calculer et optimiser votre marge bénéficiaire",
    "Gérer efficacement votre inventaire et votre trésorerie"
  ],
  steps: [
    {
      id: 1,
      title: "Recherche de niche de produits",
      description: "Identifiez une catégorie de produits rentable adaptée à votre budget et à votre environnement.",
      isCompleted: false,
      isLocked: false,
      estimatedTime: "2 jours",
      difficulty: "easy",
      tips: [
        "Commencez par des produits que vous connaissez ou qui vous passionnent",
        "Utilisez l'outil de recherche des plateformes pour voir les produits qui se vendent bien",
        "Recherchez des produits avec une marge potentielle d'au moins 30%",
        "Évitez les marchés saturés comme l'électronique grand public à moins d'avoir une expertise"
      ],
      detailedInstructions: "Pour cette première étape cruciale, prenez le temps d'analyser différentes catégories de produits. Connectez-vous sur Leboncoin, Vinted et Facebook Marketplace et observez les produits populaires dans votre région. Notez les articles qui apparaissent souvent dans les recherches et qui semblent se vendre rapidement. Concentrez-vous sur 3-5 catégories potentielles (ex: vêtements de marque, jouets vintage, accessoires de sport, petits meubles, etc.) et pour chacune, estimez le prix d'achat moyen et le prix de revente potentiel. Créez un tableau comparatif pour visualiser quelle niche offre la meilleure rentabilité par rapport à votre budget et vos connaissances.",
      prerequisites: [
        "Avoir créé des comptes sur les principales plateformes d'achat/vente",
        "Avoir défini un budget initial pour vos premiers achats"
      ],
      expectedOutcome: "Une liste de 3 niches de produits prometteuses avec une estimation de la marge potentielle pour chacune, ainsi qu'un choix final justifié de la niche sur laquelle vous allez vous concentrer.",
      commonMistakes: [
        "Choisir une niche uniquement parce qu'elle vous plaît sans vérifier sa rentabilité",
        "Viser des produits trop chers pour votre budget initial",
        "Se disperser sur trop de catégories de produits différentes",
        "Négliger les frais annexes (livraison, commissions des plateformes, emballage)"
      ],
      resources: [
        {
          title: "Les niches rentables en achat-revente en 2024",
          url: "https://example.com/niches-rentables",
          type: "article",
          description: "Un aperçu des catégories de produits les plus rentables cette année avec des exemples concrets"
        },
        {
          title: "Comment utiliser les outils de recherche Leboncoin efficacement",
          url: "https://example.com/recherche-leboncoin",
          type: "tutoriel",
          description: "Guide pour maîtriser les filtres et suivre les annonces intéressantes"
        },
        {
          title: "Calculateur de marge pour l'achat-revente",
          url: "https://example.com/calculateur",
          type: "outil",
          description: "Outil en ligne pour estimer rapidement votre marge potentielle"
        }
      ]
    },
    {
      id: 2,
      title: "Sourcing des produits",
      description: "Apprenez à trouver des produits à bas prix via différents canaux d'approvisionnement.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "3 jours",
      difficulty: "medium",
      tips: [
        "Consultez les plateformes de vente tôt le matin pour saisir les nouvelles annonces",
        "Configurez des alertes pour être notifié des nouveaux articles dans votre niche",
        "Visitez les vide-greniers, brocantes et marchés aux puces le week-end",
        "Explorez les groupes Facebook locaux dédiés aux ventes entre particuliers"
      ],
      detailedInstructions: "Maintenant que vous avez choisi votre niche, il est temps de chercher activement des produits à acheter. Créez un planning de recherche quotidien: consacrez 30 minutes chaque matin à parcourir les nouvelles annonces sur les plateformes en ligne, configurez des alertes avec des mots-clés précis liés à votre niche. Pour les sources physiques, identifiez les vide-greniers à venir dans votre région et prévoyez d'y aller tôt (idéalement dès l'ouverture). Préparez une liste de questions à poser aux vendeurs pour évaluer l'état et l'authenticité des produits. Établissez à l'avance votre budget maximum par article et gardez trace de tous les produits intéressants dans un document dédié avec photos, prix demandé, et lien de l'annonce ou coordonnées du vendeur.",
      prerequisites: [
        "Avoir identifié votre niche de produits",
        "Disposer d'un budget prêt à l'emploi",
        "Avoir configuré les alertes sur les plateformes en ligne"
      ],
      expectedOutcome: "Une liste de 5-10 produits potentiels à acheter, avec toutes les informations nécessaires (prix, état, localisation) et un plan de contact ou d'achat pour chacun.",
      commonMistakes: [
        "Négliger d'inspecter minutieusement l'état des produits avant achat",
        "Payer le premier prix demandé sans tenter de négocier",
        "Ne pas vérifier l'authenticité des produits de marque",
        "Acheter trop de stock d'un coup sans avoir validé que ça se vend bien"
      ],
      resources: [
        {
          title: "Calendrier des brocantes et vide-greniers",
          url: "https://example.com/calendrier-brocantes",
          type: "outil",
          description: "Trouvez facilement les événements près de chez vous"
        },
        {
          title: "L'art de négocier en achat-revente",
          url: "https://example.com/techniques-negociation",
          type: "vidéo",
          description: "Techniques efficaces pour réduire le prix d'achat sans froisser le vendeur"
        },
        {
          title: "Comment repérer les faux produits de marque",
          url: "https://example.com/authentifier-produits",
          type: "guide",
          description: "Guide pratique pour détecter les contrefaçons sur les articles populaires"
        }
      ]
    },
    {
      id: 3,
      title: "Négociation et achat",
      description: "Maîtrisez l'art de la négociation pour obtenir le meilleur prix d'achat possible.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "2 jours",
      difficulty: "medium",
      tips: [
        "Commencez toujours par une offre plus basse que votre prix cible (15-20% en dessous)",
        "Justifiez votre offre en mentionnant des défauts mineurs ou la concurrence",
        "Soyez prêt à partir si le prix ne vous convient pas",
        "Proposez un paiement immédiat en espèces pour obtenir une réduction"
      ],
      detailedInstructions: "Parmi votre liste de produits potentiels, sélectionnez 3 articles prioritaires et préparez votre stratégie de négociation pour chacun. Déterminez votre prix idéal et votre prix maximum. Pour les achats en ligne, rédigez un message type poli et personnalisé qui explique pourquoi vous offrez moins que le prix affiché. Pour les achats en personne, préparez 2-3 arguments (basés sur l'état, les prix du marché ou l'ancienneté de l'annonce). Lors de la négociation, restez toujours courtois et montrez votre intérêt sincère pour le produit. Si le vendeur refuse votre première offre, proposez un compromis entre votre offre initiale et son prix. N'hésitez pas à mentionner que vous êtes un acheteur sérieux qui peut conclure rapidement. Une fois l'accord trouvé, vérifiez à nouveau l'état du produit avant de finaliser l'achat et demandez un reçu ou une preuve d'achat si possible.",
      prerequisites: [
        "Avoir identifié les produits à acheter",
        "Connaître la valeur marchande des produits ciblés",
        "Avoir préparé votre budget et vos moyens de paiement"
      ],
      expectedOutcome: "L'acquisition de 1 à 3 produits à un prix inférieur au prix initialement demandé, avec une marge potentielle d'au moins 30% à la revente.",
      commonMistakes: [
        "Montrer trop d'enthousiasme qui affaiblit votre position de négociation",
        "Utiliser des arguments agressifs ou irrespectueux",
        "Ne pas vérifier minutieusement le produit juste avant la transaction finale",
        "Dépasser votre budget maximum sous la pression"
      ],
      resources: [
        {
          title: "Scripts de négociation efficaces",
          url: "https://example.com/scripts-negociation",
          type: "modèle",
          description: "Modèles de messages et phrases à utiliser lors de vos négociations"
        },
        {
          title: "Psychologie de la négociation en achat-revente",
          url: "https://example.com/psychologie-negociation",
          type: "article",
          description: "Comprendre les leviers psychologiques pour mieux négocier"
        },
        {
          title: "Checklist d'inspection avant achat",
          url: "https://example.com/checklist-inspection",
          type: "outil",
          description: "Liste des points à vérifier selon chaque catégorie de produits"
        }
      ]
    },
    {
      id: 4,
      title: "Préparation des produits pour la vente",
      description: "Optimisez l'apparence et la présentation de vos produits pour maximiser leur valeur perçue.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "1 jour",
      difficulty: "easy",
      tips: [
        "Nettoyez soigneusement chaque produit pour qu'il paraisse comme neuf",
        "Effectuez les petites réparations qui peuvent augmenter significativement la valeur",
        "Rassemblez tous les accessoires, manuels ou emballages d'origine si possible",
        "Préparez un espace neutre et bien éclairé pour les photos"
      ],
      detailedInstructions: "Pour chaque produit que vous avez acheté, établissez une checklist de préparation. Commencez par un nettoyage approfondi adapté au type de produit (utilisez des produits spécifiques selon le matériau). Identifiez les petits défauts réparables et procédez aux réparations simples qui ne nécessitent pas d'expertise particulière (ex: recoudre un bouton, resserrer une vis, enlever une tache). Si le produit nécessite des piles ou batteries, vérifiez qu'elles fonctionnent ou remplacez-les. Rassemblez tous les éléments qui valorisent le produit: boîte d'origine, accessoires, manuel d'utilisation, certificat d'authenticité, etc. Si vous vendez des vêtements, repassez-les soigneusement. Enfin, préparez un espace dédié pour la prise de photos: fond neutre (blanc ou pastel), bonne luminosité naturelle, et si possible quelques accessoires de mise en scène simples mais élégants.",
      prerequisites: [
        "Avoir acquis des produits à revendre",
        "Disposer de produits de nettoyage adaptés",
        "Avoir un espace pour préparer et photographier les articles"
      ],
      expectedOutcome: "Des produits impeccables, prêts à être photographiés et mis en vente, avec une apparence nettement améliorée par rapport à leur état d'achat.",
      commonMistakes: [
        "Négliger le nettoyage approfondi qui peut considérablement augmenter la valeur perçue",
        "Utiliser des produits de nettoyage inadaptés qui risquent d'endommager l'article",
        "Ignorer les petites réparations à faible coût mais à fort impact",
        "Ne pas rassembler tous les accessoires qui augmentent la valeur"
      ],
      resources: [
        {
          title: "Techniques de nettoyage par type de produit",
          url: "https://example.com/nettoyage-produits",
          type: "guide",
          description: "Méthodes spécifiques pour chaque matériau et type d'article"
        },
        {
          title: "Petites réparations qui augmentent fortement la valeur",
          url: "https://example.com/reparations-rapides",
          type: "tutoriel",
          description: "Vidéos de réparations simples que tout le monde peut faire"
        },
        {
          title: "Kit de préparation pour la revente",
          url: "https://example.com/kit-preparation",
          type: "liste",
          description: "Liste des outils et produits essentiels pour préparer vos articles"
        }
      ]
    },
    {
      id: 5,
      title: "Photographie professionnelle",
      description: "Réalisez des photos de qualité qui mettent en valeur vos produits et attirent l'attention.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "1 jour",
      difficulty: "medium",
      tips: [
        "Utilisez la lumière naturelle près d'une fenêtre plutôt que le flash",
        "Prenez des photos sous plusieurs angles (8-10 photos minimum par produit)",
        "Montrez clairement les détails importants et les éventuels défauts mineurs",
        "Incluez une photo avec un objet de référence pour montrer l'échelle"
      ],
      detailedInstructions: "La qualité des photos est souvent ce qui fait la différence entre une vente rapide et une annonce ignorée. Pour chaque produit, prévoyez une séance photo complète. Choisissez le meilleur moment de la journée pour la lumière naturelle (généralement entre 10h et 14h) et installez votre espace photo près d'une fenêtre mais sans soleil direct qui crée des ombres dures. Utilisez un trépied improvisé (livres empilés) si vous n'en avez pas pour éviter les photos floues. Pour chaque produit, prenez systématiquement: 1 photo principale (vue d'ensemble), 4 photos des différents angles, 2-3 photos de détails importants (étiquettes, logos, fonctionnalités), 1 photo montrant la taille (avec un objet commun à côté pour référence), et si nécessaire 1-2 photos montrant honnêtement les défauts mineurs. Après la prise de vue, sélectionnez les meilleures photos et ajustez légèrement la luminosité et le contraste si nécessaire (sans filtres excessifs qui déforment la réalité).",
      prerequisites: [
        "Avoir des produits nettoyés et préparés",
        "Disposer d'un smartphone avec un appareil photo correct",
        "Avoir préparé un espace photo avec bon éclairage"
      ],
      expectedOutcome: "Une série de 8-12 photos professionnelles par produit, bien éclairées, nettes et attractives, prêtes à être utilisées dans vos annonces de vente.",
      commonMistakes: [
        "Prendre des photos dans un environnement encombré ou mal rangé",
        "Utiliser une lumière artificielle qui dénature les couleurs",
        "Ne pas montrer les défauts mineurs (ce qui peut entraîner des déceptions et retours)",
        "Prendre trop peu de photos ou seulement sous un angle"
      ],
      resources: [
        {
          title: "Guide de photographie pour e-commerce avec smartphone",
          url: "https://example.com/photo-smartphone",
          type: "tutoriel",
          description: "Techniques professionnelles adaptées aux moyens limités"
        },
        {
          title: "Applications gratuites pour améliorer vos photos",
          url: "https://example.com/apps-photo",
          type: "liste",
          description: "Sélection d'apps pour retoucher légèrement vos images sans les dénaturer"
        },
        {
          title: "Exemples de bonnes et mauvaises photos de produits",
          url: "https://example.com/exemples-photo",
          type: "galerie",
          description: "Comparaison avant/après pour comprendre ce qui fonctionne"
        }
      ]
    },
    {
      id: 6,
      title: "Création d'annonces optimisées",
      description: "Rédigez des annonces percutantes avec des titres accrocheurs et des descriptions convaincantes.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "1 jour",
      difficulty: "medium",
      tips: [
        "Utilisez des mots-clés pertinents dans le titre que les acheteurs recherchent",
        "Indiquez toujours la marque, le modèle, la taille et la couleur dès le titre",
        "Structurez votre description en paragraphes courts et lisibles",
        "Soyez transparent sur l'état tout en restant positif dans la formulation"
      ],
      detailedInstructions: "Pour chaque produit, commencez par rédiger un titre optimal de 60-70 caractères qui inclut les informations essentielles dans cet ordre: marque, modèle/nom du produit, caractéristique distinctive, taille/dimensions, couleur, état (si excellent/neuf). Pour la description, structurez-la en 4 parties: 1) Un paragraphe d'introduction qui présente le produit et ses points forts, 2) Un paragraphe détaillant les caractéristiques techniques et spécifications, 3) Un paragraphe sur l'état avec une mention honnête des éventuels défauts mineurs, 4) Un paragraphe de conclusion avec les modalités pratiques (envoi, paiement, essai éventuel). Utilisez des listes à puces pour les caractéristiques techniques. Pour le prix, recherchez des articles similaires sur la plateforme et positionnez-vous légèrement en-dessous des prix comparables pour une vente plus rapide, tout en gardant votre marge. N'oubliez pas de préciser si le prix est négociable ou ferme. Enfin, sélectionnez soigneusement les catégories et filtres appropriés pour que votre annonce apparaisse dans les bonnes recherches.",
      prerequisites: [
        "Avoir des photos de qualité de vos produits",
        "Connaître les caractéristiques précises de chaque article",
        "Avoir fait une recherche de prix du marché pour articles similaires"
      ],
      expectedOutcome: "Des annonces complètes et optimisées pour chaque produit, avec un titre accrocheur, une description structurée et convaincante, et un prix stratégiquement positionné pour assurer une vente rapide avec une marge satisfaisante.",
      commonMistakes: [
        "Créer des titres trop courts qui manquent d'informations essentielles",
        "Rédiger des descriptions trop longues ou trop techniques",
        "Omettre des informations importantes sur l'état ou les dimensions",
        "Fixer un prix trop élevé par rapport au marché qui ralentit la vente"
      ],
      resources: [
        {
          title: "Formules de titres d'annonces qui convertissent",
          url: "https://example.com/titres-annonces",
          type: "modèle",
          description: "Templates de titres optimisés par catégorie de produits"
        },
        {
          title: "Générateur de descriptions pour produits d'occasion",
          url: "https://example.com/generateur-descriptions",
          type: "outil",
          description: "Outil pour créer rapidement des descriptions professionnelles"
        },
        {
          title: "Stratégie de prix pour vente rapide",
          url: "https://example.com/strategie-prix",
          type: "article",
          description: "Méthodes pour déterminer le prix optimal de vos articles"
        }
      ]
    },
    {
      id: 7,
      title: "Publication et promotion des annonces",
      description: "Publiez vos annonces sur les bonnes plateformes et augmentez leur visibilité pour vendre plus vite.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "1 jour",
      difficulty: "easy",
      tips: [
        "Publiez vos annonces en soirée quand plus d'acheteurs sont en ligne",
        "Utilisez plusieurs plateformes simultanément pour toucher plus d'acheteurs",
        "Partagez vos annonces dans des groupes Facebook spécialisés",
        "Répondez rapidement aux questions pour augmenter vos chances de vente"
      ],
      detailedInstructions: "Pour chaque produit, identifiez les 2-3 plateformes les plus adaptées selon le type d'article (ex: Vinted pour les vêtements, Leboncoin pour les meubles, eBay pour les objets de collection). Créez un planning de publication avec les meilleurs horaires (généralement entre 18h et 21h en semaine, ou le dimanche soir). Publiez vos annonces en commençant par la plateforme principale, puis adaptez légèrement le titre et la description pour les autres plateformes afin d'éviter le contenu dupliqué. Une fois publiées, partagez vos annonces dans 2-3 groupes Facebook pertinents (groupes locaux ou thématiques selon votre produit). Activez les notifications sur votre téléphone pour répondre aux questions dans les 15-30 minutes qui suivent. Préparez à l'avance des réponses aux questions fréquentes. Si une annonce ne génère pas d'intérêt après 3-4 jours, rafraîchissez-la en modifiant légèrement le titre ou en ajustant le prix de 5-10%. Tenez un tableau de bord simple pour suivre où chaque produit est publié et les interactions reçues.",
      prerequisites: [
        "Avoir créé des annonces optimisées avec photos et descriptions",
        "Être inscrit sur plusieurs plateformes de vente",
        "Avoir identifié des groupes Facebook pertinents pour vos produits"
      ],
      expectedOutcome: "Des annonces publiées sur les plateformes appropriées, avec un suivi régulier des interactions et un plan de rafraîchissement pour les annonces moins performantes.",
      commonMistakes: [
        "Publier à des moments de faible affluence (comme le lundi matin)",
        "Ignorer les questions des acheteurs potentiels ou répondre tardivement",
        "Ne pas republier ou rafraîchir les annonces qui stagnent",
        "Utiliser exactement le même contenu sur toutes les plateformes"
      ],
      resources: [
        {
          title: "Calendrier des meilleurs moments pour publier par plateforme",
          url: "https://example.com/calendrier-publication",
          type: "outil",
          description: "Horaires optimaux selon les jours et les plateformes"
        },
        {
          title: "Liste des groupes Facebook par catégorie de produits",
          url: "https://example.com/groupes-facebook",
          type: "répertoire",
          description: "Groupes classés par région et par thématique"
        },
        {
          title: "Modèles de réponses aux questions fréquentes",
          url: "https://example.com/reponses-types",
          type: "modèle",
          description: "Réponses prêtes à l'emploi pour gagner du temps"
        }
      ]
    },
    {
      id: 8,
      title: "Finalisation des ventes et analyse des résultats",
      description: "Gérez les transactions de manière professionnelle et analysez vos performances pour vous améliorer.",
      isCompleted: false,
      isLocked: true,
      estimatedTime: "4 jours",
      difficulty: "easy",
      tips: [
        "Proposez plusieurs méthodes de paiement sécurisées pour rassurer les acheteurs",
        "Emballez soigneusement les produits pour éviter les problèmes lors de l'envoi",
        "Demandez poliment un avis positif après une transaction réussie",
        "Analysez vos marges et le temps investi pour chaque vente"
      ],
      detailedInstructions: "Lorsque vous recevez une demande d'achat ferme, confirmez rapidement les détails de la transaction: mode de paiement, méthode de livraison/remise, délais. Pour les remises en main propre, choisissez un lieu public et sécurisé. Pour les envois, utilisez un service avec suivi et prenez des photos du colis avant expédition. Après réception du paiement, envoyez un message de remerciement avec les informations de suivi si applicable. Une fois la transaction terminée, mettez à jour votre tableau de suivi avec les données clés: prix d'achat initial, prix de vente final, frais éventuels (envoi, commissions), temps total investi (de l'achat à la vente), et marge nette réalisée. Calculez votre bénéfice net et votre taux horaire pour chaque vente. Identifiez les produits qui ont généré les meilleures marges et les ventes les plus rapides. Essayez de comprendre pourquoi certains produits se sont mieux vendus que d'autres (prix, qualité des photos, saisonnalité, etc.) et utilisez ces enseignements pour affiner votre stratégie d'achat future.",
      prerequisites: [
        "Avoir reçu des demandes d'achat pour vos produits",
        "Disposer de moyens d'emballage adaptés pour les envois",
        "Avoir mis en place un système de suivi de vos transactions"
      ],
      expectedOutcome: "Des ventes finalisées avec succès, un tableau d'analyse détaillé de vos performances (marge, temps, rentabilité par type de produit), et un plan d'action pour optimiser vos futures opérations d'achat-revente.",
      commonMistakes: [
        "Ne pas confirmer clairement tous les détails de la transaction",
        "Économiser sur l'emballage au risque d'endommager le produit",
        "Oublier de prendre en compte tous les frais dans le calcul de la marge",
        "Ne pas tirer de leçons des ventes les plus et les moins réussies"
      ],
      resources: [
        {
          title: "Guide d'emballage sécurisé par type de produit",
          url: "https://example.com/guide-emballage",
          type: "tutoriel",
          description: "Techniques pour protéger efficacement vos envois"
        },
        {
          title: "Tableau de suivi et d'analyse des ventes",
          url: "https://example.com/tableau-analyse",
          type: "modèle",
          description: "Template Excel/Google Sheets pour suivre toutes vos transactions"
        },
        {
          title: "Checklist de finalisation de vente professionnelle",
          url: "https://example.com/checklist-vente",
          type: "outil",
          description: "Liste des étapes à suivre pour une transaction parfaite"
        }
      ]
    }
  ],
  resources: [
    {
      id: 1,
      title: "Le guide complet de l'achat-revente",
      type: "ebook",
      url: "https://example.com/guide-achat-revente",
      description: "Un guide détaillé couvrant toutes les étapes de l'achat à la revente"
    },
    {
      id: 2,
      title: "Comparatif des plateformes de vente",
      type: "article",
      url: "https://example.com/comparatif-plateformes",
      description: "Analyse des avantages et inconvénients de chaque plateforme (Leboncoin, Vinted, eBay...)"
    },
    {
      id: 3,
      title: "Applications essentielles pour l'achat-revente",
      type: "liste",
      url: "https://example.com/apps-achat-revente",
      description: "Sélection d'applications pour faciliter votre activité (suivi des prix, organisation...)"
    },
    {
      id: 4,
      title: "Chaîne YouTube: Les astuces de l'achat-revente",
      type: "vidéo",
      url: "https://example.com/youtube-achat-revente",
      description: "Tutoriels vidéo sur les techniques avancées et études de cas réels"
    },
    {
      id: 5,
      title: "Calculateur de rentabilité pour achat-revente",
      type: "outil",
      url: "https://example.com/calculateur-rentabilite",
      description: "Outil en ligne pour estimer précisément vos marges et votre rentabilité horaire"
    }
  ],
  faqs: [
    {
      question: "Quel budget minimum faut-il pour commencer l'achat-revente?",
      answer: "Vous pouvez commencer avec aussi peu que 50€, mais un budget initial de 100-200€ vous permettra d'acheter plusieurs articles et de diversifier vos risques. L'important est de commencer petit et de réinvestir vos bénéfices."
    },
    {
      question: "Combien de temps faut-il consacrer à cette activité?",
      answer: "Pour des résultats significatifs, prévoyez au moins 5-10 heures par semaine. Cela inclut la recherche de produits, les achats, la préparation, la création d'annonces et la gestion des ventes. Vous pouvez commencer à temps partiel et augmenter progressivement."
    },
    {
      question: "Faut-il déclarer les revenus de l'achat-revente?",
      answer: "Oui, les revenus réguliers d'achat-revente doivent être déclarés aux impôts. Si vous vendez occasionnellement des objets personnels, vous êtes généralement exempté. Mais dès que l'activité devient régulière et vise à générer des bénéfices, elle doit être déclarée, souvent sous le statut d'auto-entrepreneur."
    },
    {
      question: "Quelles sont les niches les plus rentables pour débuter?",
      answer: "Les niches accessibles et rentables pour débutants incluent les vêtements de marque, les petits électroménagers, les jouets de collection, les livres rares, et les accessoires électroniques. Choisissez une niche que vous connaissez pour mieux évaluer la valeur des produits."
    },
    {
      question: "Comment éviter les arnaques lors des achats?",
      answer: "Privilégiez les rencontres en personne dans des lieux publics, vérifiez minutieusement les produits avant l'achat, méfiez-vous des prix anormalement bas, utilisez des moyens de paiement sécurisés, et demandez des preuves d'authenticité pour les articles de marque ou de valeur."
    }
  ]
};
