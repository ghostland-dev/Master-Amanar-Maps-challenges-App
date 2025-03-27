
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Award, ChevronLeft, LockIcon, UnlockIcon, BookOpen, BarChart, ChevronRight } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import { Chip } from "@/components/ui/chip";
import { fadeIn, slideIn } from "@/lib/animations";

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const infoRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  
  // Animation des éléments au chargement
  useEffect(() => {
    if (infoRef.current) fadeIn(infoRef.current);
    if (stepsRef.current) slideIn(stepsRef.current, 'right', 0.3);
    if (resourcesRef.current) slideIn(resourcesRef.current, 'up', 0.6);
  }, []);
  
  // Get challenge data based on ID
  const getChallengeData = () => {
    // Challenge data for dropshipping
    const dropshippingChallenge = {
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
    const cryptoChallenge = {
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
    const arbitrageChallenge = {
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
          title: "Rechercher des produits à fort potentiel",
          description: "Apprendre à repérer les opportunités d'arbitrage rentables.",
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 4,
          title: "Analyser les coûts et marges",
          description: "Calculer précisément tous les coûts pour déterminer la rentabilité réelle.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 5,
          title: "Acquérir votre premier lot de produits",
          description: "Réaliser vos premiers achats de produits à revendre.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 6,
          title: "Optimiser vos annonces de revente",
          description: "Créer des annonces attractives pour maximiser vos ventes.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 7,
          title: "Gérer la logistique et les expéditions",
          description: "Organiser efficacement le stockage et l'expédition de vos produits.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 8,
          title: "Mettre en place un système de scaling",
          description: "Développer votre activité d'arbitrage pour augmenter vos profits.",
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
    const affiliationChallenge = {
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
          title: "Choisir une niche rentable",
          description: "Identifier un secteur avec des produits à forte commission et demande stable.",
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 3,
          title: "Sélectionner les meilleurs programmes d'affiliation",
          description: "Évaluer et rejoindre les programmes d'affiliation les plus adaptés à votre niche.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 4,
          title: "Créer votre plateforme de contenu",
          description: "Mettre en place un site web, blog ou chaîne pour promouvoir vos liens d'affiliation.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 5,
          title: "Produire du contenu de qualité",
          description: "Créer des articles, vidéos ou podcasts qui génèrent de la confiance et de la valeur.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 6,
          title: "Optimiser pour le SEO",
          description: "Améliorer le référencement de votre contenu pour attirer plus de visiteurs.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 7,
          title: "Mettre en place une stratégie email",
          description: "Créer une liste d'emails pour fidéliser votre audience et promouvoir vos liens.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 8,
          title: "Analyser et optimiser vos conversions",
          description: "Utiliser les données pour améliorer vos taux de conversion et revenus.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 9,
          title: "Développer des sources de revenus récurrentes",
          description: "Identifier et promouvoir des produits à abonnement pour des revenus stables.",
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
    
    const copywritingChallenge = {
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
          title: "Comprendre les principes du copywriting",
          description: "Découvrir les fondamentaux de l'écriture persuasive et son importance.",
          isCompleted: true,
          isLocked: false,
        },
        {
          id: 2,
          title: "Analyser votre audience cible",
          description: "Définir précisément votre persona pour adapter votre message.",
          isCompleted: true,
          isLocked: false,
        },
        {
          id: 3,
          title: "Maîtriser les formules de headlines efficaces",
          description: "Apprendre à rédiger des titres accrocheurs qui captent l'attention.",
          isCompleted: true,
          isLocked: false,
        },
        {
          id: 4,
          title: "Structurer vos textes pour une conversion maximale",
          description: "Organiser vos contenus selon des modèles éprouvés (AIDA, PAS, etc.).",
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 5,
          title: "Rédiger des arguments de vente convaincants",
          description: "Transformer les caractéristiques en bénéfices pour votre audience.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 6,
          title: "Créer des appels à l'action puissants",
          description: "Concevoir des CTA qui incitent à l'action immédiate.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 7,
          title: "Optimiser vos textes pour différents canaux",
          description: "Adapter votre copywriting pour sites web, emails et réseaux sociaux.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 8,
          title: "Tester et améliorer vos textes",
          description: "Mettre en place des tests A/B pour optimiser continuellement vos conversions.",
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
    
    const nftChallenge = {
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
          title: "Comprendre les NFTs et leur écosystème",
          description: "Découvrir les concepts fondamentaux des NFTs et leurs cas d'usage.",
          isCompleted: true,
          isLocked: false,
        },
        {
          id: 2,
          title: "Configurer un wallet compatible NFT",
          description: "Mettre en place et sécuriser un portefeuille pour gérer vos NFTs.",
          isCompleted: true,
          isLocked: false,
        },
        {
          id: 3,
          title: "Explorer les principales marketplaces NFT",
          description: "Se familiariser avec OpenSea, Rarible et autres plateformes d'échange.",
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 4,
          title: "Analyser les collections NFT prometteuses",
          description: "Identifier les critères de valeur d'une collection NFT.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 5,
          title: "Comprendre la valorisation des NFTs",
          description: "Maîtriser les facteurs qui influencent le prix des NFTs.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 6,
          title: "Acquérir vos premiers NFTs",
          description: "Réaliser vos premiers achats de NFTs selon votre stratégie.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 7,
          title: "Suivre les tendances du marché NFT",
          description: "Utiliser les outils et communautés pour anticiper les mouvements du marché.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 8,
          title: "Participer à des drops et mint events",
          description: "Découvrir et participer aux lancements de nouvelles collections.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 9,
          title: "Élaborer une stratégie de revente",
          description: "Définir des règles pour revendre vos NFTs avec profit.",
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 10,
          title: "Gérer votre portfolio NFT",
          description: "Suivre et optimiser la performance de votre collection de NFTs.",
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
    const challengesMap = {
      "1": dropshippingChallenge,
      "2": cryptoChallenge,
      "3": arbitrageChallenge,
      "4": affiliationChallenge,
      "5": copywritingChallenge,
      "6": nftChallenge,
    };
    
    return challengesMap[id as string] || dropshippingChallenge;
  };
  
  const challenge = getChallengeData();
  
  const [activeStep, setActiveStep] = useState<number | null>(challenge.currentStep);
  
  const handleStepClick = (stepId: number) => {
    if (!challenge.steps.find(step => step.id === stepId)?.isLocked) {
      setActiveStep(stepId);
    }
  };
  
  useEffect(() => {
    document.title = `FinQuest - ${challenge.title}`;
  }, [challenge.title]);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <Link to="/challenges" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour aux challenges
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Challenge info */}
            <div ref={infoRef} className="lg:col-span-1">
              <Card className="glass">
                <CardContent className="p-6">
                  <Chip variant="primary" size="sm" className="mb-4">
                    {challenge.category}
                  </Chip>
                  
                  <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
                  <p className="text-muted-foreground mb-6">{challenge.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-sm">
                      <Award className="mr-1 h-4 w-4 text-primary" />
                      <span>{challenge.xp} XP</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-4 w-4 text-primary" />
                      <span>{challenge.duration}</span>
                    </div>
                    <Chip variant="neutral" size="sm">
                      {challenge.difficulty}
                    </Chip>
                  </div>
                  
                  <div className="mb-6">
                    <ProgressBar 
                      label="Progression du challenge" 
                      value={challenge.progress} 
                      max={100}
                      size="lg"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-6">
                    <div>{challenge.currentStep}/{challenge.totalSteps} étapes complétées</div>
                  </div>
                  
                  <Button className="w-full">Continuer le challenge</Button>
                </CardContent>
              </Card>
              
              {/* Resources */}
              <div ref={resourcesRef} className="mt-8">
                <h2 className="text-xl font-bold mb-4">Ressources</h2>
                <Card className="glass">
                  <CardContent className="p-6 space-y-4">
                    {challenge.resources.map(resource => (
                      <Link key={resource.id} to={resource.url} className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg hover:bg-secondary transition-colors">
                        <div className="flex items-center">
                          {resource.type === 'pdf' && <BookOpen className="h-5 w-5 mr-3 text-primary" />}
                          {resource.type === 'template' && <BookOpen className="h-5 w-5 mr-3 text-primary" />}
                          {resource.type === 'simulator' && <BarChart className="h-5 w-5 mr-3 text-primary" />}
                          <span>{resource.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Steps */}
            <div ref={stepsRef} className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Étapes du challenge</h2>
              
              <div className="space-y-4">
                {challenge.steps.map(step => (
                  <div 
                    key={step.id}
                    className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
                      step.isLocked ? 'opacity-60' : activeStep === step.id ? 'ring-2 ring-primary' : 'hover:bg-secondary/10'
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className="p-4 cursor-pointer">
                      <div className="flex items-start">
                        <div className={`rounded-full p-2 mr-4 ${
                          step.isCompleted 
                            ? 'bg-primary/10 text-primary' 
                            : step.isLocked 
                              ? 'bg-muted text-muted-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {step.isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : step.isLocked ? (
                            <LockIcon className="h-5 w-5" />
                          ) : (
                            <UnlockIcon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{step.title}</h3>
                            <span className="text-sm text-muted-foreground">Étape {step.id}/{challenge.totalSteps}</span>
                          </div>
                          <p className="text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {activeStep === step.id && !step.isLocked && (
                      <div className="bg-secondary/50 p-4 border-t border-border">
                        <div className="text-sm mb-4">
                          <p className="mb-2">Instructions détaillées :</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {step.id === 4 && challenge.id === "2" ? (
                              <>
                                <li>Recherchez au moins 5 cryptomonnaies dans le top 20 du marché</li>
                                <li>Analysez leur cas d'usage, équipe et adoption réelle</li>
                                <li>Identifiez leurs forces, faiblesses et potentiel futur</li>
                                <li>Déterminez leur place dans un portefeuille diversifié</li>
                              </>
                            ) : (
                              <>
                                <li>Recherchez au moins 3 sources d'information sur le sujet</li>
                                <li>Comparez les différentes approches et méthodologies</li>
                                <li>Établissez un plan d'action personnalisé</li>
                                <li>Fixez des objectifs spécifiques et mesurables</li>
                              </>
                            )}
                          </ul>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          {step.isCompleted ? (
                            <Button variant="outline" className="sm:flex-1">Revoir l'étape</Button>
                          ) : (
                            <Button className="sm:flex-1">Marquer comme terminé</Button>
                          )}
                          <Button variant="outline" className="sm:flex-1">Ouvrir le journal de bord</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
