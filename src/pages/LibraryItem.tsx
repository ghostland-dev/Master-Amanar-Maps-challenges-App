
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, BookOpen, Share, BookmarkPlus, ThumbsUp, Play, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock item data
const MOCK_ITEM = {
  id: "1",
  title: "Comprendre les bases de l'épargne",
  description: "Un guide complet pour commencer à épargner efficacement et construire une sécurité financière sur le long terme. Découvrez les stratégies recommandées par les experts.",
  type: "article",
  category: "épargne",
  image: "/placeholder.svg",
  duration: 10,
  difficulty: "débutant",
  progress: 0,
  author: "Marie Dupont",
  publishedDate: "10 mars 2023",
  content: `
    <h2>Introduction à l'épargne</h2>
    <p>L'épargne est le fondement de toute santé financière. Elle vous permet de faire face aux imprévus, de réaliser vos projets et de préparer votre avenir.</p>
    
    <h2>Pourquoi épargner ?</h2>
    <p>Épargner vous offre une sécurité financière et une tranquillité d'esprit. Voici les principales raisons d'épargner :</p>
    <ul>
      <li>Constituer un fonds d'urgence</li>
      <li>Financer vos projets</li>
      <li>Préparer votre retraite</li>
      <li>Faire face aux imprévus</li>
    </ul>
    
    <h2>Comment commencer à épargner ?</h2>
    <p>Commencer à épargner peut sembler difficile, mais avec une approche méthodique, c'est accessible à tous :</p>
    <ol>
      <li>Fixez-vous des objectifs clairs</li>
      <li>Établissez un budget</li>
      <li>Automatisez votre épargne</li>
      <li>Choisissez les bons produits d'épargne</li>
    </ol>
    
    <h2>Les différents types de produits d'épargne</h2>
    <p>Il existe de nombreux produits d'épargne adaptés à différents objectifs et horizons d'investissement :</p>
    <ul>
      <li>Livret A : épargne de précaution</li>
      <li>LDDS : complément au Livret A</li>
      <li>LEP : pour les revenus modestes</li>
      <li>PEL : pour un projet immobilier</li>
      <li>Assurance-vie : épargne à moyen/long terme</li>
      <li>PEA : pour investir en actions</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>L'épargne est un élément essentiel d'une stratégie financière saine. En commençant tôt et en étant cohérent, vous pouvez construire une sécurité financière qui vous servira toute votre vie.</p>
  `,
  relatedItems: [
    {
      id: "2",
      title: "Investir en bourse pour débutants",
      type: "video",
      image: "/placeholder.svg",
      duration: 25,
    },
    {
      id: "3",
      title: "Stratégies de remboursement de dettes",
      type: "article",
      image: "/placeholder.svg",
      duration: 15,
    },
    {
      id: "6",
      title: "Planifier sa retraite dès 30 ans",
      type: "article",
      image: "/placeholder.svg",
      duration: 20,
    },
  ]
};

const LibraryItem = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState(MOCK_ITEM);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    document.title = `FinQuest - ${item.title}`;
    
    // Simulate API call to fetch the item
    const timer = setTimeout(() => {
      setIsLoading(false);
      setProgress(item.progress);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [item.title, item.progress]);
  
  // Function to format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    }
  };
  
  // Function to get color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "débutant": return "bg-green-500";
      case "intermédiaire": return "bg-yellow-500";
      case "avancé": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };
  
  // Update progress
  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
    // In a real app, this would be an API call to update the user's progress
  };
  
  // Mark as complete
  const markAsComplete = () => {
    updateProgress(100);
  };
  
  // Function to get the type icon
  const getTypeIcon = () => {
    switch (item.type) {
      case "article": return BookOpen;
      case "video": return Play;
      case "podcast": return Pause;
      default: return BookOpen;
    }
  };
  
  const TypeIcon = getTypeIcon();
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          {/* Back button */}
          <Link to="/library">
            <Button variant="ghost" className="mb-4 pl-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la bibliothèque
            </Button>
          </Link>
          
          {isLoading ? (
            <div>Chargement...</div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-72 object-cover" 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">{item.category}</Badge>
                      <Badge className={getDifficultyColor(item.difficulty)}>
                        {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                      </Badge>
                      <Badge className="flex items-center gap-1">
                        <TypeIcon className="h-3 w-3" />
                        <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                      </Badge>
                    </div>
                    
                    <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDuration(item.duration)}
                      </div>
                      {item.author && (
                        <div className="text-sm text-muted-foreground">
                          Par {item.author}
                        </div>
                      )}
                      {item.publishedDate && (
                        <div className="text-sm text-muted-foreground">
                          Publié le {item.publishedDate}
                        </div>
                      )}
                    </div>
                    
                    {progress > 0 && progress < 100 && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {progress === 0 && (
                        <Button onClick={() => updateProgress(10)}>
                          Commencer la lecture
                        </Button>
                      )}
                      
                      {progress > 0 && progress < 100 && (
                        <Button onClick={() => markAsComplete()}>
                          Marquer comme terminé
                        </Button>
                      )}
                      
                      {progress === 100 && (
                        <Button variant="outline">
                          Déjà terminé
                        </Button>
                      )}
                      
                      <Button variant="outline">
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </Button>
                      
                      <Button variant="outline">
                        <Share className="h-4 w-4 mr-2" />
                        Partager
                      </Button>
                      
                      <Button variant="outline">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Utile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Content tabs */}
              <Tabs defaultValue="content" className="mt-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="content">Contenu</TabsTrigger>
                  <TabsTrigger value="related">Contenu associé</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </TabsContent>
                
                <TabsContent value="related">
                  <h2 className="text-xl font-semibold mb-4">Contenu associé</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.relatedItems.map((relatedItem) => (
                      <Link to={`/library/${relatedItem.id}`} key={relatedItem.id}>
                        <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={relatedItem.image} 
                              alt={relatedItem.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">
                                {relatedItem.type.charAt(0).toUpperCase() + relatedItem.type.slice(1)}
                              </Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDuration(relatedItem.duration)}
                              </div>
                            </div>
                            <h3 className="font-medium line-clamp-2">{relatedItem.title}</h3>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryItem;
