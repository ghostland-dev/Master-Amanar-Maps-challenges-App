
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
  
  // Données factices pour la démo
  const challenge = {
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
        url: "/simulators",
      },
    ],
  };
  
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
                            <li>Recherchez au moins 3 fournisseurs potentiels sur AliExpress ou autres plateformes</li>
                            <li>Comparez les prix, délais de livraison et évaluations</li>
                            <li>Contactez les fournisseurs pour vérifier leur réactivité et demander des échantillons si nécessaire</li>
                            <li>Sélectionnez votre fournisseur principal et un fournisseur de secours</li>
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
