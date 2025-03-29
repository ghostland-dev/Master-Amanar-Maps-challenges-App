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

const LibraryItem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    // Update progress in API or local data
    // Example: await fetch(`/api/library/${id}`, { method: 'PUT', body: JSON.stringify({ progress: newProgress }) });
  };

  const handleCompleteItem = () => {
    setShowConfirmation(true);
  };

  const confirmCompleteItem = () => {
    setIsCompleted(true);
    setShowConfirmation(false);
    // Update completion status in API or local data
    // Example: await fetch(`/api/library/${id}`, { method: 'PUT', body: JSON.stringify({ isCompleted: true }) });
  };

  const cancelCompleteItem = () => {
    setShowConfirmation(false);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement de l'élément.</div>;
  }

  if (!item) {
    return <div>Élément non trouvé.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-6xl mx-auto py-20 px-4">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage src={item.image} alt={item.title} />
                <AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                <CardDescription>{item.author}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{item.type}</Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Durée estimée: {item.duration / 60} heures
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Temps estimé pour compléter cette ressource</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Separator />
            <p>{item.description}</p>
            <Separator />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Progression</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
              <div className="flex justify-between mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={progress <= 0}
                  onClick={() => handleProgressChange(Math.max(0, progress - 10))}
                >
                  - 10%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={progress >= 100}
                  onClick={() => handleProgressChange(Math.min(100, progress + 10))}
                >
                  + 10%
                </Button>
              </div>
            </div>
            <Separator />
            <Accordion type="single" collapsible>
              <AccordionItem value="sections">
                <AccordionTrigger>Sections</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className="h-[200px] w-full rounded-md border">
                    <div className="p-4">
                      {item.sections && item.sections.length > 0 ? (
                        <ul className="list-none space-y-2">
                          {item.sections.map((section, index) => (
                            <li key={index} className="flex items-center justify-between">
                              {section.title}
                              {section.isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <span className="text-muted-foreground">En cours</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">Aucune section disponible.</p>
                      )}
                    </div>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="related">
                <AccordionTrigger>Related Items</AccordionTrigger>
                <AccordionContent>
                  {item.relatedItems && item.relatedItems.length > 0 ? (
                    <ul className="list-none space-y-2">
                      {item.relatedItems.map((relatedItem) => (
                        <li key={relatedItem.id}>
                          <Button
                            variant="link"
                            onClick={() => navigate(`/library/${relatedItem.id}`)}
                          >
                            {relatedItem.title} ({relatedItem.type})
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No related items found.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faqs">
                <AccordionTrigger>FAQ</AccordionTrigger>
                <AccordionContent>
                  {item.faqs && item.faqs.length > 0 ? (
                    <ul className="list-none space-y-2">
                      {item.faqs.map((faq, index) => (
                        <li key={index}>
                          <p className="font-bold">{faq.question}</p>
                          <p>{faq.answer}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No FAQs available.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="resources">
                <AccordionTrigger>Resources</AccordionTrigger>
                <AccordionContent>
                  {item.resources && item.resources.length > 0 ? (
                    <ul className="list-none space-y-2">
                      {item.resources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {resource.title} ({resource.type})
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No resources available.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Separator />
            {!isCompleted ? (
              <Button className="w-full" onClick={handleCompleteItem}>
                <BookOpenCheck className="h-4 w-4 mr-2" />
                Marquer comme terminé
              </Button>
            ) : (
              <div className="flex items-center justify-center text-green-500">
                <CheckCircle className="h-6 w-6 mr-2" />
                <span>Terminé</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la complétion</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir marquer cet élément comme terminé?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Marquer comme terminé débloquera de nouvelles ressources et défis.</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={cancelCompleteItem}>
              Annuler
            </Button>
            <Button type="submit" onClick={confirmCompleteItem}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryItem;
