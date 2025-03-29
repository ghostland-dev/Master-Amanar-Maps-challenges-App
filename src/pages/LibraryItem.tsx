import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calendar as CalendarIcon, Code, MessageSquare, File, Copy, CheckCircle, BookOpenCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const LibraryItem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState("sections");

  useEffect(() => {
    // Fetch item details from API or local data
    const fetchItem = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API endpoint or data source
        // const response = await fetch(`/api/library/${id}`);
        // const data = await response.json();
        const data = {
          id: id,
          title: "The Lean Startup",
          description: "A revolutionary approach to launching and scaling businesses.",
          category: "Business",
          type: "book",
          content: "This book provides a scientific approach to creating and managing startups...",
          url: "https://example.com/lean-startup",
          image: "/placeholder.svg",
          author: "Eric Ries",
          duration: 360,
          difficulty: "intermediate",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
          progress: 50,
          isCompleted: false,
          sections: [
            {
              title: "Part 1: Vision",
              content: "The first section covers the importance of having a clear vision...",
              isCompleted: true,
            },
            {
              title: "Part 2: Steer",
              content: "The second section discusses how to steer your startup in the right direction...",
              isCompleted: false,
            },
            {
              title: "Part 3: Accelerate",
              content: "The third section focuses on accelerating growth and scaling your business...",
              isCompleted: false,
            },
          ],
          relatedItems: [
            {
              id: "1",
              title: "Zero to One",
              type: "book",
            },
            {
              id: "2",
              title: "Good to Great",
              type: "book",
            },
          ],
          faqs: [
            {
              question: "What is the main idea of the book?",
              answer: "The book introduces the Lean Startup methodology...",
            },
            {
              question: "Who is the target audience?",
              answer: "The book is for entrepreneurs, founders, and anyone interested in startups...",
            },
          ],
          resources: [
            {
              title: "Lean Startup Summary",
              url: "https://example.com/lean-startup-summary",
              type: "article",
            },
            {
              title: "Eric Ries Interview",
              url: "https://example.com/eric-ries-interview",
              type: "video",
            },
          ],
        };

        setItem(data);
        setProgress(data.progress);
        setIsCompleted(data.isCompleted);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleProgressChange = (newProgress: number) => {
    setProgress(newProgress);
    toast({
      title: "Progression mise à jour",
      description: `Vous êtes maintenant à ${newProgress}% de progression`,
    });
    // Update progress in API or local data
    // Example: await fetch(`/api/library/${id}`, { method: 'PUT', body: JSON.stringify({ progress: newProgress }) });
  };

  const handleCompleteItem = () => {
    setShowConfirmation(true);
  };

  const confirmCompleteItem = () => {
    setIsCompleted(true);
    setShowConfirmation(false);
    toast({
      title: "Félicitations !",
      description: "Vous avez terminé cette ressource.",
      variant: "default",
    });
    // Update completion status in API or local data
    // Example: await fetch(`/api/library/${id}`, { method: 'PUT', body: JSON.stringify({ isCompleted: true }) });
  };

  const cancelCompleteItem = () => {
    setShowConfirmation(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          <h3 className="text-lg font-medium">Chargement en cours...</h3>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-red-500">Erreur</CardTitle>
            <CardDescription>
              Une erreur est survenue lors du chargement de cette ressource.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Ressource non trouvée</CardTitle>
            <CardDescription>
              La ressource que vous recherchez n'existe pas ou a été supprimée.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate("/library")}>
              Retour à la bibliothèque
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "success";
      case "intermediate": return "warning";
      case "advanced": return "danger";
      default: return "secondary";
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "article": return <File className="h-4 w-4" />;
      case "video": return <MessageSquare className="h-4 w-4" />;
      case "code": return <Code className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navbar />
      
      <div className="container max-w-6xl mx-auto py-10 px-4 space-y-8 animate-fade-in">
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-2">
          <button onClick={() => navigate("/library")} className="hover:text-primary transition-colors">
            Bibliothèque
          </button>
          <span className="mx-2">/</span>
          <span>{item.category}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{item.title}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Resource Details */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="overflow-hidden border-none shadow-lg bg-card/80 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 h-3"></div>
              <CardHeader className="relative pb-0">
                <div className="flex items-center">
                  <Avatar className="w-16 h-16 mr-4 ring-2 ring-primary/20 bg-primary/5">
                    <AvatarImage src={item.image} alt={item.title} />
                    <AvatarFallback className="text-2xl font-bold text-primary">{item.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <span>{item.author}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="hover-lift">{item.type}</Badge>
                  <Badge variant={getDifficultyColor(item.difficulty)} className="hover-lift">{item.difficulty}</Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="hover-lift">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {item.duration / 60}h
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Temps estimé pour compléter cette ressource</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm italic">{item.description}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progression</span>
                    <Badge variant={isCompleted ? "success" : "outline"} className="text-xs">
                      {isCompleted ? "Terminé" : `${progress}%`}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2"
                    indicatorClassName={getProgressColor(progress)}
                  />
                  <div className="flex justify-between mt-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={progress <= 0 || isCompleted}
                      onClick={() => handleProgressChange(Math.max(0, progress - 10))}
                      className="flex-1"
                    >
                      -10%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={progress >= 100 || isCompleted}
                      onClick={() => handleProgressChange(Math.min(100, progress + 10))}
                      className="flex-1"
                    >
                      +10%
                    </Button>
                  </div>
                </div>
                
                {!isCompleted ? (
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-md transition-all duration-300 hover:shadow-lg"
                    onClick={handleCompleteItem}
                  >
                    <BookOpenCheck className="h-4 w-4 mr-2" />
                    Marquer comme terminé
                  </Button>
                ) : (
                  <div className="flex items-center justify-center bg-green-500/10 text-green-600 py-2 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Terminé</span>
                  </div>
                )}
                
                <Card className="bg-primary/5 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Resource Link</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm truncate max-w-[70%]">{item.url}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          toast({
                            title: "Lien copié",
                            description: "Le lien a été copié dans le presse-papier",
                          });
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Resources Card */}
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="border-b pb-3">
                <CardTitle className="text-lg">Ressources complémentaires</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {item.resources && item.resources.length > 0 ? (
                  <ul className="space-y-3">
                    {item.resources.map((resource, index) => (
                      <li key={index} className="group">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-md hover:bg-secondary/50 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm group-hover:text-primary transition-colors">
                              {resource.title}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {resource.type}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Aucune ressource disponible
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors ${
                    activeTab === "sections"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                  onClick={() => setActiveTab("sections")}
                >
                  Sections
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors ${
                    activeTab === "faqs"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                  onClick={() => setActiveTab("faqs")}
                >
                  FAQ
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors ${
                    activeTab === "related"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                  onClick={() => setActiveTab("related")}
                >
                  Ressources liées
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === "sections" && (
                  <div className="animate-fade-in">
                    <h3 className="text-lg font-medium mb-4">Contenu</h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-6">
                        {item.sections && item.sections.length > 0 ? (
                          item.sections.map((section, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border transition-all ${
                                section.isCompleted
                                  ? "bg-green-500/5 border-green-200"
                                  : "bg-secondary/20 border-secondary/30 hover:bg-secondary/30"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{section.title}</h4>
                                {section.isCompleted ? (
                                  <Badge variant="success" className="text-xs">Terminé</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs">En cours</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {section.content}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center py-8">
                            Aucune section disponible
                          </p>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {activeTab === "faqs" && (
                  <div className="animate-fade-in">
                    <h3 className="text-lg font-medium mb-4">Foire aux questions</h3>
                    {item.faqs && item.faqs.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {item.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-base font-medium hover:text-primary">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Aucune FAQ disponible
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "related" && (
                  <div className="animate-fade-in">
                    <h3 className="text-lg font-medium mb-4">Ressources liées</h3>
                    {item.relatedItems && item.relatedItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.relatedItems.map((relatedItem) => (
                          <Card key={relatedItem.id} className="hover:shadow-md transition-shadow border border-border/50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{relatedItem.title}</CardTitle>
                              <CardDescription>{relatedItem.type}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                              <Button
                                variant="ghost"
                                className="w-full justify-between"
                                onClick={() => navigate(`/library/${relatedItem.id}`)}
                              >
                                <span>Découvrir</span>
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Aucune ressource liée disponible
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>

            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b pb-3">
                <CardTitle className="text-lg">Notes de lecture</CardTitle>
                <CardDescription>Prenez des notes et partagez vos réflexions sur cette ressource</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <textarea
                    className="w-full min-h-[150px] p-3 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Écrivez vos notes ici..."
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="default" size="sm">
                    Partager mes notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la complétion</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir marquer cette ressource comme terminée?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-green-500/10 text-green-600 p-3 rounded-md border border-green-200 text-sm">
              <p>Marquer comme terminé débloquera de nouvelles ressources et défis.</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={cancelCompleteItem}>
              Annuler
            </Button>
            <Button type="submit" onClick={confirmCompleteItem} className="bg-green-600 hover:bg-green-700">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryItem;
