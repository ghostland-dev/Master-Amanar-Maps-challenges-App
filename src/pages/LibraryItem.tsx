
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Share, 
  BookmarkPlus, 
  ThumbsUp, 
  Play, 
  Pause, 
  Download, 
  CheckCircle, 
  Flag,
  MessageSquare,
  User,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

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
  authorAvatar: "/placeholder.svg",
  publishedDate: "10 mars 2023",
  lastUpdated: "15 avril 2023",
  readCount: 1243,
  likes: 87,
  rating: 4.7,
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
    
    <div class="bg-primary/5 p-4 rounded-md my-6 border border-primary/20">
      <h3 class="font-medium text-lg mb-2">Conseil d'expert</h3>
      <p>Pour constituer votre fonds d'urgence, visez l'équivalent de 3 à 6 mois de dépenses. Placez cet argent sur un support disponible immédiatement et sans risque, comme un Livret A.</p>
    </div>
    
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
    
    <table class="w-full border-collapse my-6">
      <thead class="bg-muted">
        <tr>
          <th class="border p-2 text-left">Produit</th>
          <th class="border p-2 text-left">Plafond</th>
          <th class="border p-2 text-left">Rémunération</th>
          <th class="border p-2 text-left">Disponibilité</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2">Livret A</td>
          <td class="border p-2">22 950€</td>
          <td class="border p-2">3% (taux 2023)</td>
          <td class="border p-2">Immédiate</td>
        </tr>
        <tr>
          <td class="border p-2">LDDS</td>
          <td class="border p-2">12 000€</td>
          <td class="border p-2">3% (taux 2023)</td>
          <td class="border p-2">Immédiate</td>
        </tr>
        <tr>
          <td class="border p-2">LEP</td>
          <td class="border p-2">7 700€</td>
          <td class="border p-2">4.6% (taux 2023)</td>
          <td class="border p-2">Immédiate</td>
        </tr>
        <tr>
          <td class="border p-2">PEL</td>
          <td class="border p-2">61 200€</td>
          <td class="border p-2">1 à 2.5%</td>
          <td class="border p-2">Après 4 ans</td>
        </tr>
      </tbody>
    </table>
    
    <h2>Conclusion</h2>
    <p>L'épargne est un élément essentiel d'une stratégie financière saine. En commençant tôt et en étant cohérent, vous pouvez construire une sécurité financière qui vous servira toute votre vie.</p>
  `,
  resources: [
    {
      title: "Guide complet des livrets d'épargne 2023",
      type: "PDF",
      url: "#",
      icon: "download"
    },
    {
      title: "Calculateur d'épargne mensuelle",
      type: "Outil",
      url: "#",
      icon: "calculator"
    },
    {
      title: "Comparatif des assurances-vie",
      type: "Lien",
      url: "#",
      icon: "link"
    }
  ],
  quiz: [
    {
      question: "Quelle est la principale fonction d'un fonds d'urgence ?",
      options: [
        "Générer des intérêts élevés", 
        "Faire face aux dépenses imprévues", 
        "Préparer sa retraite", 
        "Réduire ses impôts"
      ],
      answer: 1
    },
    {
      question: "Quel produit d'épargne a le meilleur taux en 2023 pour les revenus modestes ?",
      options: [
        "Livret A", 
        "LDDS", 
        "LEP", 
        "PEL"
      ],
      answer: 2
    },
    {
      question: "Combien de mois de dépenses devrait représenter votre fonds d'urgence idéal ?",
      options: [
        "1 mois", 
        "2 mois", 
        "3 à 6 mois", 
        "12 mois"
      ],
      answer: 2
    }
  ],
  relatedItems: [
    {
      id: "2",
      title: "Investir en bourse pour débutants",
      type: "video",
      image: "/placeholder.svg",
      duration: 25,
      difficulty: "débutant",
    },
    {
      id: "3",
      title: "Stratégies de remboursement de dettes",
      type: "article",
      image: "/placeholder.svg",
      duration: 15,
      difficulty: "intermédiaire",
    },
    {
      id: "6",
      title: "Planifier sa retraite dès 30 ans",
      type: "article",
      image: "/placeholder.svg",
      duration: 20,
      difficulty: "intermédiaire",
    },
  ],
  comments: [
    {
      id: "1",
      author: "Jean Martin",
      avatar: "/placeholder.svg",
      date: "5 jours",
      content: "Excellent article qui m'a enfin permis de comprendre comment organiser mon épargne !",
      likes: 12
    },
    {
      id: "2",
      author: "Sophie Dubois",
      avatar: "/placeholder.svg",
      date: "2 semaines",
      content: "Très clair, j'ai pu ouvrir mon LEP après la lecture. Merci pour les conseils pratiques.",
      likes: 8
    }
  ]
};

const LibraryItem = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState(MOCK_ITEM);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { toast } = useToast();
  
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
    toast({
      title: "Progression mise à jour",
      description: `Vous avez atteint ${newProgress}% de ce contenu`,
    });
    // In a real app, this would be an API call to update the user's progress
  };
  
  // Mark as complete
  const markAsComplete = () => {
    updateProgress(100);
    toast({
      title: "Félicitations !",
      description: "Vous avez terminé ce contenu et gagné 50 XP",
    });
  };
  
  // Handle quiz answer selection
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    if (quizSubmitted) return;
    
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };
  
  // Submit quiz
  const submitQuiz = () => {
    if (quizAnswers.length < item.quiz.length) {
      toast({
        title: "Attention",
        description: "Veuillez répondre à toutes les questions",
        variant: "destructive"
      });
      return;
    }
    
    setQuizSubmitted(true);
    
    // Calculate score
    const correctAnswers = quizAnswers.filter((answer, index) => answer === item.quiz[index].answer).length;
    const score = Math.round((correctAnswers / item.quiz.length) * 100);
    
    toast({
      title: `Score: ${score}%`,
      description: `Vous avez ${correctAnswers} bonnes réponses sur ${item.quiz.length}`,
    });
    
    // Update progress if score is good
    if (score > 70 && progress < 100) {
      updateProgress(100);
    }
  };
  
  // Reset quiz
  const resetQuiz = () => {
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };
  
  // Add comment
  const addComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "Commentaire vide",
        description: "Veuillez écrire un commentaire avant de l'envoyer",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été publié avec succès",
    });
    
    setCommentText("");
    // In a real app, this would be an API call to add the comment
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
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
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
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDuration(item.duration)}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {item.rating} ({item.likes} avis)
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-1" />
                        {item.readCount} lectures
                      </div>
                      
                      {item.author && (
                        <div className="flex items-center text-sm">
                          <Avatar className="h-6 w-6 mr-1">
                            <AvatarImage src={item.authorAvatar} alt={item.author} />
                            <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>Par {item.author}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Publié le {item.publishedDate}
                      </div>
                      {item.lastUpdated && (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Mis à jour le {item.lastUpdated}
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
                          <Play className="h-4 w-4 mr-2" />
                          Commencer la lecture
                        </Button>
                      )}
                      
                      {progress > 0 && progress < 100 && (
                        <Button onClick={() => markAsComplete()}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Marquer comme terminé
                        </Button>
                      )}
                      
                      {progress === 100 && (
                        <Button variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Terminé
                        </Button>
                      )}
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <BookmarkPlus className="h-4 w-4 mr-2" />
                              Sauvegarder
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ajouter à vos favoris</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <Share className="h-4 w-4 mr-2" />
                              Partager
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Partager avec vos amis</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              Utile
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Marquer comme utile</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      {item.type === "article" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Télécharger en PDF</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              <Flag className="h-4 w-4 mr-2" />
                              Signaler
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Signaler un problème</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Content tabs */}
              <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className="mb-6 grid grid-cols-4">
                  <TabsTrigger value="content">Contenu</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="related">Contenu associé</TabsTrigger>
                  <TabsTrigger value="comments">Commentaires</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                  
                  {/* Resources */}
                  {item.resources && item.resources.length > 0 && (
                    <div className="mt-8 p-4 border rounded-lg bg-muted/40">
                      <h3 className="text-lg font-semibold mb-3">Ressources supplémentaires</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {item.resources.map((resource, index) => (
                          <Card key={index} className="flex hover:shadow-md transition-all">
                            <div className="bg-primary/10 p-3 flex items-center justify-center">
                              <Download className="h-5 w-5 text-primary" />
                            </div>
                            <CardContent className="p-3 flex-1">
                              <p className="font-medium text-sm">{resource.title}</p>
                              <Badge variant="secondary" className="mt-1">{resource.type}</Badge>
                            </CardContent>
                            <CardFooter className="p-0">
                              <Button variant="ghost" size="sm" className="h-full">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-8">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Précédent
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        if (progress < 100) {
                          updateProgress(progress + 20 > 100 ? 100 : progress + 20);
                        }
                        setActiveTab("quiz");
                      }}
                    >
                      Quiz
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="quiz">
                  <div className="bg-card border rounded-lg p-6 max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold mb-2">Testez vos connaissances</h3>
                    <p className="text-muted-foreground mb-6">
                      Répondez aux questions suivantes pour valider ce que vous avez appris
                    </p>
                    
                    <div className="space-y-8">
                      {item.quiz.map((question, qIndex) => (
                        <div key={qIndex} className="border rounded-md p-4">
                          <h4 className="text-md font-medium mb-3">
                            <span className="mr-2 text-primary">Q{qIndex + 1}:</span>
                            {question.question}
                          </h4>
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => {
                              const isSelected = quizAnswers[qIndex] === oIndex;
                              const isCorrect = quizSubmitted && oIndex === question.answer;
                              const isWrong = quizSubmitted && isSelected && !isCorrect;
                              
                              return (
                                <div 
                                  key={oIndex}
                                  className={`flex items-center p-3 rounded-md cursor-pointer transition-all ${
                                    quizSubmitted ? 'cursor-default ' : 'hover:bg-muted '
                                  }${
                                    isSelected ? 'border-primary border' : 'border'
                                  }${
                                    isCorrect ? ' bg-green-500/10 border-green-500/30' : ''
                                  }${
                                    isWrong ? ' bg-red-500/10 border-red-500/30' : ''
                                  }`}
                                  onClick={() => handleQuizAnswer(qIndex, oIndex)}
                                >
                                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                                    isSelected ? 'border-primary bg-primary text-white' : ''
                                  }${
                                    isCorrect ? ' border-green-500 bg-green-500 text-white' : ''
                                  }${
                                    isWrong ? ' border-red-500 bg-red-500 text-white' : ''
                                  }`}>
                                    {isSelected || isCorrect ? (
                                      <CheckCircle className="h-3 w-3" />
                                    ) : null}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              );
                            })}
                          </div>
                          
                          {quizSubmitted && (
                            <div className={`mt-3 text-sm ${
                              quizAnswers[qIndex] === question.answer 
                                ? 'text-green-500' 
                                : 'text-red-500'
                            }`}>
                              {quizAnswers[qIndex] === question.answer 
                                ? '✓ Bonne réponse !' 
                                : `✗ Mauvaise réponse. La bonne réponse était: ${question.options[question.answer]}`
                              }
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      {!quizSubmitted ? (
                        <Button onClick={submitQuiz}>
                          Valider mes réponses
                        </Button>
                      ) : (
                        <div className="flex gap-3">
                          <Button variant="outline" onClick={resetQuiz}>
                            Réessayer
                          </Button>
                          <Button onClick={() => {
                            markAsComplete();
                            setActiveTab("related");
                          }}>
                            Continuer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="related">
                  <h2 className="text-xl font-semibold mb-4">Contenu associé</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.relatedItems.map((relatedItem) => (
                      <Link to={`/library/${relatedItem.id}`} key={relatedItem.id}>
                        <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer h-full">
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
                            <Badge className={getDifficultyColor(relatedItem.difficulty) + " mt-2"}>
                              {relatedItem.difficulty.charAt(0).toUpperCase() + relatedItem.difficulty.slice(1)}
                            </Badge>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="comments">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold mb-6">Commentaires ({item.comments.length})</h2>
                    
                    {/* Add comment */}
                    <div className="mb-8">
                      <textarea 
                        className="w-full border rounded-md p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Partagez votre avis sur ce contenu..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button onClick={addComment}>Publier un commentaire</Button>
                      </div>
                    </div>
                    
                    {/* Comments list */}
                    <div className="space-y-6">
                      {item.comments.map(comment => (
                        <div key={comment.id} className="border-b pb-5">
                          <div className="flex items-start mb-3">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={comment.avatar} alt={comment.author} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium">{comment.author}</h4>
                                <span className="text-xs text-muted-foreground ml-2">il y a {comment.date}</span>
                              </div>
                              <p className="mt-1">{comment.content}</p>
                              <div className="flex items-center mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1" /> {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <MessageSquare className="h-3.5 w-3.5 mr-1" /> Répondre
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
