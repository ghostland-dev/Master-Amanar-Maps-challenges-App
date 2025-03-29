import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Bookmark,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Download,
  Eye,
  Star,
  CheckCircle,
  AlertTriangle,
  Link as LinkIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Mock data for Library Items
const mockLibraryItems = [
  {
    id: "1",
    title: "The Intelligent Investor",
    description: "The definitive book on value investing.",
    category: "Investment",
    type: "book",
    content: "...",
    url: "https://example.com/intelligent-investor",
    image: "/placeholder.svg",
    author: "Benjamin Graham",
    duration: null,
    difficulty: "intermediate",
  },
  {
    id: "2",
    title: "How to Start a Startup",
    description: "A series of lectures on how to start a startup.",
    category: "Entrepreneurship",
    type: "video",
    content: "...",
    url: "https://example.com/how-to-start-a-startup",
    image: "/placeholder.svg",
    author: "Sam Altman",
    duration: 60,
    difficulty: "beginner",
  },
  {
    id: "3",
    title: "Marketing in the Digital Age",
    description: "Strategies for marketing in the digital age.",
    category: "Marketing",
    type: "article",
    content: "...",
    url: "https://example.com/marketing-in-the-digital-age",
    image: "/placeholder.svg",
    author: "Neil Patel",
    duration: null,
    difficulty: "intermediate",
  },
  {
    id: "4",
    title: "Cryptocurrency for Beginners",
    description: "A guide to understanding cryptocurrency.",
    category: "Crypto",
    type: "pdf",
    content: "...",
    url: "https://example.com/cryptocurrency-for-beginners",
    image: "/placeholder.svg",
    author: null,
    duration: null,
    difficulty: "beginner",
  },
  {
    id: "5",
    title: "Personal Finance 101",
    description: "A comprehensive guide to personal finance.",
    category: "Finance",
    type: "book",
    content: "...",
    url: "https://example.com/personal-finance-101",
    image: "/placeholder.svg",
    author: "Robert Kiyosaki",
    duration: null,
    difficulty: "beginner",
  },
  {
    id: "6",
    title: "The Lean Startup",
    description: "A methodology for developing businesses and products.",
    category: "Entrepreneurship",
    type: "book",
    content: "...",
    url: "https://example.com/the-lean-startup",
    image: "/placeholder.svg",
    author: "Eric Ries",
    duration: null,
    difficulty: "intermediate",
  },
  {
    id: "7",
    title: "Social Media Marketing",
    description: "A guide to social media marketing.",
    category: "Marketing",
    type: "video",
    content: "...",
    url: "https://example.com/social-media-marketing",
    image: "/placeholder.svg",
    author: "Gary Vaynerchuk",
    duration: 45,
    difficulty: "intermediate",
  },
  {
    id: "8",
    title: "Blockchain Basics",
    description: "An introduction to blockchain technology.",
    category: "Crypto",
    type: "article",
    content: "...",
    url: "https://example.com/blockchain-basics",
    image: "/placeholder.svg",
    author: null,
    duration: null,
    difficulty: "beginner",
  },
  {
    id: "9",
    title: "Retirement Planning",
    description: "A guide to planning for retirement.",
    category: "Finance",
    type: "book",
    content: "...",
    url: "https://example.com/retirement-planning",
    image: "/placeholder.svg",
    author: "Suze Orman",
    duration: null,
    difficulty: "intermediate",
  },
  {
    id: "10",
    title: "Venture Capital",
    description: "An overview of venture capital.",
    category: "Investment",
    type: "video",
    content: "...",
    url: "https://example.com/venture-capital",
    image: "/placeholder.svg",
    author: "Naval Ravikant",
    duration: 30,
    difficulty: "advanced",
  },
];

// Mock data for User Progress
const mockUserProgress = [
  { itemId: "1", progress: 80, completed: false },
  { itemId: "2", progress: 50, completed: false },
  { itemId: "3", progress: 100, completed: true },
  { itemId: "4", progress: 20, completed: false },
  { itemId: "5", progress: 100, completed: true },
  { itemId: "6", progress: 70, completed: false },
  { itemId: "7", progress: 100, completed: true },
  { itemId: "8", progress: 40, completed: false },
  { itemId: "9", progress: 60, completed: false },
  { itemId: "10", progress: 90, completed: false },
];

const filterSchema = z.object({
  category: z.string().optional(),
  type: z.string().optional(),
  difficulty: z.string().optional(),
  duration: z.string().optional(),
  completed: z.boolean().optional(),
  search: z.string().optional(),
});

const Library = () => {
  const [libraryItems, setLibraryItems] = useState(mockLibraryItems);
  const [userProgress, setUserProgress] = useState(mockUserProgress);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: "",
      type: "",
      difficulty: "",
      duration: "",
      completed: false,
      search: "",
    },
  });

  useEffect(() => {
    document.title = "FinQuest - Bibliothèque";
  }, []);

  const handleFilterChange = (values: z.infer<typeof filterSchema>) => {
    setSelectedCategory(values.category || "");
    setSelectedType(values.type || "");
    setSelectedDifficulty(values.difficulty || "");
    setIsCompleted(values.completed || false);
    setSearchQuery(values.search || "");
    setIsFilterDialogOpen(false);
  };

  const filteredItems = libraryItems.filter((item) => {
    const categoryMatch = selectedCategory
      ? item.category === selectedCategory
      : true;
    const typeMatch = selectedType ? item.type === selectedType : true;
    const difficultyMatch = selectedDifficulty
      ? item.difficulty === selectedDifficulty
      : true;
    const completedMatch = isCompleted
      ? userProgress.find((progress) => progress.itemId === item.id)?.completed
      : true;
    const searchMatch = searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return (
      categoryMatch &&
      typeMatch &&
      difficultyMatch &&
      completedMatch &&
      searchMatch
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "relevance") {
      return 0;
    } else if (sortOrder === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "duration") {
      const durationA = a.duration || 0;
      const durationB = b.duration || 0;
      return durationA - durationB;
    }
    return 0;
  });

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
    setSelectedDifficulty("");
    setIsCompleted(false);
    setSearchQuery("");
    form.reset();
  };

  return (
    <div className="container max-w-6xl mx-auto py-20 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Bibliothèque
          </h1>
          <p className="text-muted-foreground">
            Découvrez des ressources pour développer vos compétences financières
          </p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <Input
            type="search"
            placeholder="Rechercher une ressource..."
            className="md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filtrer les ressources</DialogTitle>
                <DialogDescription>
                  Affinez votre recherche en utilisant les filtres ci-dessous.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFilterChange)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Toutes les catégories</SelectItem>
                            <SelectItem value="Investment">Investissement</SelectItem>
                            <SelectItem value="Entrepreneurship">
                              Entrepreneuriat
                            </SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Crypto">Crypto</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de ressource</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Tous les types</SelectItem>
                            <SelectItem value="book">Livre</SelectItem>
                            <SelectItem value="video">Vidéo</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau de difficulté</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un niveau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Tous les niveaux</SelectItem>
                            <SelectItem value="beginner">Débutant</SelectItem>
                            <SelectItem value="intermediate">Intermédiaire</SelectItem>
                            <SelectItem value="advanced">Avancé</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="completed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-md border px-3 py-2">
                        <div className="space-y-0.5">
                          <FormLabel>Ressources terminées</FormLabel>
                          <FormDescription>
                            Afficher uniquement les ressources que vous avez
                            terminées.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleResetFilters}
                    >
                      Réinitialiser
                    </Button>
                    <Button type="submit" size="sm">
                      Appliquer les filtres
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {filteredItems.length} Ressources disponibles
        </h2>
        <Select onValueChange={setSortOrder} defaultValue={sortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Pertinence</SelectItem>
            <SelectItem value="title">Titre</SelectItem>
            <SelectItem value="duration">Durée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => {
          const progress = userProgress.find(
            (progress) => progress.itemId === item.id
          );
          const itemProgress = progress ? progress.progress : 0;
          const isCompleted = progress ? progress.completed : false;

          return (
            <Card key={item.id} className="glass hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  {item.duration && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{item.duration} minutes</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ressource terminée</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : itemProgress > 0 ? (
                    <div className="text-sm text-muted-foreground">
                      Progression: {itemProgress}%
                    </div>
                  ) : null}
                </div>
                <Button asChild>
                  <a href={`/library/${item.id}`}>
                    Voir plus <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
