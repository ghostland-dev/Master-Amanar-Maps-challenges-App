
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, Edit, Trash2, Search, Eye, ArrowUp, ArrowDown, 
  Check, X, Calendar, Clock, Award, Target, BookOpen, 
  Filter, RefreshCw, Download, Upload
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Step schema for challenge creation
const stepSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  instructions: z.array(z.string()).optional(),
  resources: z.array(z.object({
    title: z.string(),
    type: z.string(),
    url: z.string()
  })).optional(),
  isLocked: z.boolean().default(false),
  estimatedTime: z.number().min(1).default(30),
});

// Resource schema for challenge resources
const resourceSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères."),
  type: z.enum(["pdf", "video", "link", "template", "simulator"]),
  url: z.string().url("L'URL doit être valide.")
});

// Define the schema for challenge creation/edition
const challengeSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  category: z.string().min(2, {
    message: "La catégorie doit contenir au moins 2 caractères.",
  }),
  difficulty: z.enum(["facile", "moyen", "difficile"]),
  duration: z.number().min(1, {
    message: "La durée doit être d'au moins 1 jour.",
  }),
  xp: z.number().min(10, {
    message: "L'XP doit être d'au moins 10.",
  }),
  status: z.enum(["brouillon", "publié", "archivé"]).default("brouillon"),
  isPopular: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  steps: z.array(stepSchema).optional(),
  resources: z.array(resourceSchema).optional(),
  prerequisites: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  targetAudience: z.string().optional(),
  learningOutcomes: z.array(z.string()).optional(),
});

// Define the type for a challenge step based on the schema
type ChallengeStep = z.infer<typeof stepSchema>;

// Define the type for a challenge resource based on the schema
type ChallengeResource = z.infer<typeof resourceSchema>;

// Define the type for a challenge based on the schema
type Challenge = z.infer<typeof challengeSchema> & { 
  id: string;
  steps?: ChallengeStep[];
  resources?: ChallengeResource[];
  prerequisites?: string[];
  objectives?: string[];
  learningOutcomes?: string[];
};

const ChallengeManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State variables
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentStep, setCurrentStep] = useState<ChallengeStep | null>(null);
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [isNewStep, setIsNewStep] = useState(true);
  const [stepIndex, setStepIndex] = useState(-1);
  const [currentResource, setCurrentResource] = useState<ChallengeResource | null>(null);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [isNewResource, setIsNewResource] = useState(true);
  const [resourceIndex, setResourceIndex] = useState(-1);
  const [currentTab, setCurrentTab] = useState("general");

  // Mock data for demonstration purposes
  useEffect(() => {
    // Replace this with a real API call to fetch challenges
    const mockChallenges: Challenge[] = [
      { 
        id: "1", 
        title: "Défi SEO", 
        description: "Optimisez un site web pour les moteurs de recherche.", 
        category: "SEO", 
        difficulty: "moyen", 
        duration: 30, 
        xp: 500, 
        status: "publié",
        isPopular: true,
        steps: [
          {
            title: "Analyse de mots-clés",
            description: "Recherchez et identifiez les mots-clés pertinents pour votre niche.",
            instructions: [
              "Utilisez des outils comme Google Keyword Planner",
              "Analysez la concurrence pour ces mots-clés",
              "Identifiez les mots-clés à fort potentiel et faible concurrence"
            ],
            isLocked: false,
            estimatedTime: 120
          },
          {
            title: "Optimisation on-page",
            description: "Optimisez les éléments sur page pour les moteurs de recherche.",
            instructions: [
              "Intégrez les mots-clés dans les titres et méta-descriptions",
              "Structurez votre contenu avec des balises HTML appropriées",
              "Optimisez les images avec des attributs alt"
            ],
            isLocked: true,
            estimatedTime: 180
          }
        ],
        resources: [
          {
            title: "Guide SEO complet",
            type: "pdf",
            url: "https://example.com/seo-guide.pdf"
          },
          {
            title: "Checklist d'optimisation",
            type: "template",
            url: "https://example.com/seo-checklist"
          }
        ],
        prerequisites: ["Bases du HTML", "Connaissance des CMS"],
        objectives: ["Améliorer le positionnement sur Google", "Augmenter le trafic organique"],
        targetAudience: "Débutants en marketing digital",
        learningOutcomes: ["Maîtrise des techniques SEO de base", "Capacité à analyser et optimiser un site"]
      },
      { 
        id: "2", 
        title: "Campagne Adwords", 
        description: "Lancez une campagne publicitaire sur Google Adwords.", 
        category: "Publicité", 
        difficulty: "difficile", 
        duration: 60, 
        xp: 800, 
        status: "publié",
        steps: [
          {
            title: "Structure de compte",
            description: "Créez une structure d'account efficace.",
            isLocked: false,
            estimatedTime: 90
          },
          {
            title: "Recherche de mots-clés",
            description: "Identifiez les mots-clés pertinents pour votre campagne.",
            isLocked: false,
            estimatedTime: 120
          }
        ]
      },
      { 
        id: "3", 
        title: "Analyse de Logs", 
        description: "Effectuez une analyse des logs d'un serveur.", 
        category: "DevOps", 
        difficulty: "facile", 
        duration: 15, 
        xp: 200, 
        status: "brouillon",
        isRecommended: true
      },
    ];
    setChallenges(mockChallenges);
  }, []);

  // Form for creating and editing challenges
  const form = useForm<Challenge>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "facile",
      duration: 1,
      xp: 10,
      status: "brouillon",
      isPopular: false,
      isRecommended: false,
      steps: [],
      resources: [],
      prerequisites: [],
      objectives: [],
      learningOutcomes: []
    },
  });

  // Step form
  const stepForm = useForm<ChallengeStep>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      title: "",
      description: "",
      instructions: [],
      isLocked: false,
      estimatedTime: 30
    }
  });

  // Resource form
  const resourceForm = useForm<ChallengeResource>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      type: "pdf",
      url: ""
    }
  });

  // Handlers for form submission
  const onCreateChallenge = (values: Challenge) => {
    // In a real app, you would send this data to your server
    const newChallenge: Challenge = { 
      ...values, 
      id: String(Date.now()),
      steps: values.steps || [],
      resources: values.resources || [],
      prerequisites: values.prerequisites || [],
      objectives: values.objectives || [],
      learningOutcomes: values.learningOutcomes || []
    };
    setChallenges([...challenges, newChallenge]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Challenge créé",
      description: "Le challenge a été créé avec succès",
    });
    form.reset();
  };

  const updateChallenge = (id: string, updatedData: Partial<Challenge>) => {
    const updatedChallenges = challenges.map(challenge => 
      challenge.id === id 
        ? { 
            ...challenge, 
            ...updatedData,
            title: updatedData.title || challenge.title,
            description: updatedData.description || challenge.description,
            category: updatedData.category || challenge.category,
            difficulty: updatedData.difficulty || challenge.difficulty,
            duration: updatedData.duration || challenge.duration,
            xp: updatedData.xp ?? challenge.xp,
            status: updatedData.status || challenge.status,
            isPopular: updatedData.isPopular ?? challenge.isPopular,
            isRecommended: updatedData.isRecommended ?? challenge.isRecommended,
            steps: updatedData.steps || challenge.steps,
            resources: updatedData.resources || challenge.resources,
            prerequisites: updatedData.prerequisites || challenge.prerequisites,
            objectives: updatedData.objectives || challenge.objectives,
            targetAudience: updatedData.targetAudience || challenge.targetAudience,
            learningOutcomes: updatedData.learningOutcomes || challenge.learningOutcomes
          } 
        : challenge
    );
    setChallenges(updatedChallenges);
    setIsEditDialogOpen(false);
    toast({
      title: "Challenge mis à jour",
      description: "Le challenge a été modifié avec succès",
    });
  };

  const onDeleteChallenge = (id: string) => {
    // In a real app, you would send a delete request to your server
    setChallenges(challenges.filter(challenge => challenge.id !== id));
    setIsDeleteDialogOpen(false);
    setSelectedChallenge(null);
    toast({
      title: "Challenge supprimé",
      description: "Le challenge a été supprimé avec succès",
    });
  };

  // Step handlers
  const addStep = (stepData: ChallengeStep) => {
    const currentValues = form.getValues();
    const updatedSteps = [...(currentValues.steps || [])];
    
    if (isNewStep) {
      updatedSteps.push(stepData);
    } else if (stepIndex !== -1) {
      updatedSteps[stepIndex] = stepData;
    }
    
    form.setValue('steps', updatedSteps);
    setIsStepDialogOpen(false);
    stepForm.reset();
  };

  const removeStep = (index: number) => {
    const currentValues = form.getValues();
    const updatedSteps = [...(currentValues.steps || [])];
    updatedSteps.splice(index, 1);
    form.setValue('steps', updatedSteps);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const currentValues = form.getValues();
    const steps = [...(currentValues.steps || [])];
    
    if (direction === 'up' && index > 0) {
      [steps[index], steps[index - 1]] = [steps[index - 1], steps[index]];
    } else if (direction === 'down' && index < steps.length - 1) {
      [steps[index], steps[index + 1]] = [steps[index + 1], steps[index]];
    }
    
    form.setValue('steps', steps);
  };

  // Resource handlers
  const addResource = (resourceData: ChallengeResource) => {
    const currentValues = form.getValues();
    const updatedResources = [...(currentValues.resources || [])];
    
    if (isNewResource) {
      updatedResources.push(resourceData);
    } else if (resourceIndex !== -1) {
      updatedResources[resourceIndex] = resourceData;
    }
    
    form.setValue('resources', updatedResources);
    setIsResourceDialogOpen(false);
    resourceForm.reset();
  };

  const removeResource = (index: number) => {
    const currentValues = form.getValues();
    const updatedResources = [...(currentValues.resources || [])];
    updatedResources.splice(index, 1);
    form.setValue('resources', updatedResources);
  };

  // Array field handlers (prerequisites, objectives, learning outcomes)
  const addArrayItem = (field: 'prerequisites' | 'objectives' | 'learningOutcomes', value: string) => {
    if (!value.trim()) return;
    
    const currentValues = form.getValues();
    const updatedArray = [...(currentValues[field] || []), value];
    form.setValue(field as any, updatedArray);
    
    // Clear the input field after adding
    const inputElement = document.getElementById(`${field}-input`) as HTMLInputElement;
    if (inputElement) inputElement.value = '';
  };

  const removeArrayItem = (field: 'prerequisites' | 'objectives' | 'learningOutcomes', index: number) => {
    const currentValues = form.getValues();
    const updatedArray = [...(currentValues[field] || [])];
    updatedArray.splice(index, 1);
    form.setValue(field as any, updatedArray);
  };

  // Filter and sort challenges
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || challenge.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || challenge.difficulty === difficultyFilter;
    const matchesStatus = statusFilter === 'all' || challenge.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  }).sort((a, b) => {
    // Handle different field types
    if (sortField === 'title' || sortField === 'category') {
      return sortDirection === 'asc' 
        ? a[sortField].localeCompare(b[sortField]) 
        : b[sortField].localeCompare(a[sortField]);
    } else {
      // For numeric fields
      const aValue = a[sortField as keyof Challenge] as number;
      const bValue = b[sortField as keyof Challenge] as number;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(challenges.map(challenge => challenge.category))];

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <div className="container mx-auto py-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Challenges</h1>
            <p className="text-muted-foreground">
              Créer, modifier et gérer les challenges de la plateforme
            </p>
          </div>
          <Button onClick={() => {
            form.reset();
            setIsCreateDialogOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Challenge
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un challenge..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Toutes les catégories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par difficulté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les difficultés</SelectItem>
                  <SelectItem value="facile">Facile</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="difficile">Difficile</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="brouillon">Brouillon</SelectItem>
                  <SelectItem value="publié">Publié</SelectItem>
                  <SelectItem value="archivé">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {filteredChallenges.length} challenges trouvés
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setDifficultyFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Réinitialiser
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-3 w-3" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-3 w-3" />
                  Importer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Table>
          <TableCaption>Liste des challenges disponibles sur la plateforme.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="w-[200px] cursor-pointer"
                onClick={() => toggleSort('title')}
              >
                Titre
                {sortField === 'title' && (
                  sortDirection === 'asc' ? <ArrowUp className="inline ml-1 h-3 w-3" /> : <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => toggleSort('category')}
              >
                Catégorie
                {sortField === 'category' && (
                  sortDirection === 'asc' ? <ArrowUp className="inline ml-1 h-3 w-3" /> : <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead>Difficulté</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => toggleSort('duration')}
              >
                Durée (jours)
                {sortField === 'duration' && (
                  sortDirection === 'asc' ? <ArrowUp className="inline ml-1 h-3 w-3" /> : <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => toggleSort('xp')}
              >
                XP
                {sortField === 'xp' && (
                  sortDirection === 'asc' ? <ArrowUp className="inline ml-1 h-3 w-3" /> : <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChallenges.map((challenge) => (
              <TableRow key={challenge.id}>
                <TableCell className="font-medium">
                  {challenge.title}
                  <div className="flex mt-1 gap-1">
                    {challenge.isPopular && (
                      <Badge variant="destructive" className="text-xs">Populaire</Badge>
                    )}
                    {challenge.isRecommended && (
                      <Badge variant="outline" className="text-xs">Recommandé</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{challenge.category}</TableCell>
                <TableCell>
                  <Badge variant={
                    challenge.difficulty === "facile" ? "success" :
                      challenge.difficulty === "moyen" ? "warning" : "danger"
                  }>
                    {challenge.difficulty}
                  </Badge>
                </TableCell>
                <TableCell>{challenge.duration}</TableCell>
                <TableCell>{challenge.xp}</TableCell>
                <TableCell>
                  <Badge variant={
                    challenge.status === "brouillon" ? "outline" :
                      challenge.status === "publié" ? "success" : "secondary"
                  }>
                    {challenge.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Voir
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      form.reset({
                        title: challenge.title,
                        description: challenge.description,
                        category: challenge.category,
                        difficulty: challenge.difficulty,
                        duration: challenge.duration,
                        xp: challenge.xp,
                        status: challenge.status,
                        isPopular: challenge.isPopular,
                        isRecommended: challenge.isRecommended,
                        steps: challenge.steps || [],
                        resources: challenge.resources || [],
                        prerequisites: challenge.prerequisites || [],
                        objectives: challenge.objectives || [],
                        targetAudience: challenge.targetAudience || "",
                        learningOutcomes: challenge.learningOutcomes || []
                      });
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>
                {challenges.length} challenges au total
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {/* Create/Edit Challenge Dialog */}
        {(isCreateDialogOpen || isEditDialogOpen) && (
          <Dialog 
            open={isCreateDialogOpen || isEditDialogOpen} 
            onOpenChange={(open) => {
              if (!open) {
                setIsCreateDialogOpen(false);
                setIsEditDialogOpen(false);
              }
            }}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>
                  {isCreateDialogOpen ? "Créer un nouveau challenge" : "Modifier le challenge"}
                </DialogTitle>
                <DialogDescription>
                  {isCreateDialogOpen 
                    ? "Ajoutez un nouveau challenge à la plateforme." 
                    : "Modifiez les informations du challenge sélectionné."}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs
                defaultValue="general"
                className="w-full"
                value={currentTab}
                onValueChange={setCurrentTab}
              >
                <TabsList className="mb-4">
                  <TabsTrigger value="general">Général</TabsTrigger>
                  <TabsTrigger value="steps">Étapes</TabsTrigger>
                  <TabsTrigger value="resources">Ressources</TabsTrigger>
                  <TabsTrigger value="metadata">Métadonnées</TabsTrigger>
                </TabsList>
                
                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit(
                      isCreateDialogOpen ? onCreateChallenge : (values) => {
                        if (selectedChallenge) updateChallenge(selectedChallenge.id, values);
                      }
                    )} 
                    className="space-y-4"
                  >
                    <ScrollArea className="h-[60vh] pr-4">
                      <TabsContent value="general" className="space-y-4 mt-0">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Titre</FormLabel>
                              <FormControl>
                                <Input placeholder="Titre du challenge" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Description détaillée du challenge"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Catégorie</FormLabel>
                                <FormControl>
                                  <Input placeholder="Catégorie du challenge" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Difficulté</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner la difficulté" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="facile">Facile</SelectItem>
                                    <SelectItem value="moyen">Moyen</SelectItem>
                                    <SelectItem value="difficile">Difficile</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Durée (jours)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Durée du challenge en jours"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="xp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>XP</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="XP à gagner en complétant le challenge"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Statut</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner le statut" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="brouillon">Brouillon</SelectItem>
                                  <SelectItem value="publié">Publié</SelectItem>
                                  <SelectItem value="archivé">Archivé</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="isPopular"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Populaire</FormLabel>
                                  <FormDescription>
                                    Marquer ce challenge comme populaire sur la plateforme.
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="isRecommended"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Recommandé</FormLabel>
                                  <FormDescription>
                                    Marquer ce challenge comme recommandé pour les nouveaux utilisateurs.
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>
                      
                      {/* Steps Tab */}
                      <TabsContent value="steps" className="space-y-4 mt-0">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Étapes du Challenge</h3>
                          <Button
                            type="button"
                            onClick={() => {
                              setIsNewStep(true);
                              setStepIndex(-1);
                              stepForm.reset({
                                title: "",
                                description: "",
                                instructions: [],
                                isLocked: false,
                                estimatedTime: 30
                              });
                              setIsStepDialogOpen(true);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter une étape
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          {form.watch('steps')?.map((step, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium">{step.title}</h4>
                                      {step.isLocked && (
                                        <Badge variant="outline" className="text-xs">Verrouillé</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                                    
                                    {step.instructions && step.instructions.length > 0 && (
                                      <div className="mt-2">
                                        <p className="text-xs font-medium mb-1">Instructions:</p>
                                        <ul className="text-xs text-muted-foreground list-disc list-inside">
                                          {step.instructions.map((instruction, i) => (
                                            <li key={i}>{instruction}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>Durée estimée: {step.estimatedTime} min</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setIsNewStep(false);
                                        setStepIndex(index);
                                        stepForm.reset(step);
                                        setIsStepDialogOpen(true);
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeStep(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <div className="flex flex-col gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={index === 0}
                                        onClick={() => moveStep(index, 'up')}
                                      >
                                        <ArrowUp className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={index === (form.watch('steps')?.length || 0) - 1}
                                        onClick={() => moveStep(index, 'down')}
                                      >
                                        <ArrowDown className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          
                          {(!form.watch('steps') || form.watch('steps').length === 0) && (
                            <div className="text-center py-6 border border-dashed rounded-lg">
                              <Target className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">Aucune étape ajoutée</p>
                              <p className="text-xs text-muted-foreground">Cliquez sur "Ajouter une étape" pour commencer</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      {/* Resources Tab */}
                      <TabsContent value="resources" className="space-y-4 mt-0">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Ressources du Challenge</h3>
                          <Button
                            type="button"
                            onClick={() => {
                              setIsNewResource(true);
                              setResourceIndex(-1);
                              resourceForm.reset({
                                title: "",
                                type: "pdf",
                                url: ""
                              });
                              setIsResourceDialogOpen(true);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter une ressource
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {form.watch('resources')?.map((resource, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                {resource.type === 'pdf' && <BookOpen className="h-4 w-4 text-primary" />}
                                {resource.type === 'video' && <BookOpen className="h-4 w-4 text-primary" />}
                                {resource.type === 'template' && <BookOpen className="h-4 w-4 text-primary" />}
                                {resource.type === 'simulator' && <Clock className="h-4 w-4 text-primary" />}
                                {resource.type === 'link' && <BookOpen className="h-4 w-4 text-primary" />}
                                <div>
                                  <p className="font-medium text-sm">{resource.title}</p>
                                  <p className="text-xs text-muted-foreground">{resource.url}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setIsNewResource(false);
                                    setResourceIndex(index);
                                    resourceForm.reset(resource);
                                    setIsResourceDialogOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeResource(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          {(!form.watch('resources') || form.watch('resources').length === 0) && (
                            <div className="text-center py-6 border border-dashed rounded-lg">
                              <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">Aucune ressource ajoutée</p>
                              <p className="text-xs text-muted-foreground">Cliquez sur "Ajouter une ressource" pour commencer</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      {/* Metadata Tab */}
                      <TabsContent value="metadata" className="space-y-4 mt-0">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="targetAudience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Audience cible</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Ex: Débutants en marketing digital" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  À qui s'adresse principalement ce challenge
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {/* Prerequisites */}
                          <div className="space-y-2">
                            <Label>Prérequis</Label>
                            <div className="flex gap-2">
                              <Input 
                                id="prerequisites-input"
                                placeholder="Ex: Connaissance de base en HTML" 
                              />
                              <Button 
                                type="button"
                                onClick={() => {
                                  const inputElement = document.getElementById('prerequisites-input') as HTMLInputElement;
                                  addArrayItem('prerequisites', inputElement.value);
                                }}
                              >
                                Ajouter
                              </Button>
                            </div>
                            <FormDescription>
                              Compétences ou connaissances nécessaires avant de commencer ce challenge
                            </FormDescription>
                            
                            <div className="space-y-2 mt-2">
                              {form.watch('prerequisites')?.map((prerequisite, index) => (
                                <div key={index} className="flex items-center justify-between bg-secondary/20 px-3 py-2 rounded">
                                  <span>{prerequisite}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => removeArrayItem('prerequisites', index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Objectives */}
                          <div className="space-y-2">
                            <Label>Objectifs</Label>
                            <div className="flex gap-2">
                              <Input 
                                id="objectives-input"
                                placeholder="Ex: Créer une stratégie SEO complète" 
                              />
                              <Button 
                                type="button"
                                onClick={() => {
                                  const inputElement = document.getElementById('objectives-input') as HTMLInputElement;
                                  addArrayItem('objectives', inputElement.value);
                                }}
                              >
                                Ajouter
                              </Button>
                            </div>
                            <FormDescription>
                              Objectifs principaux de ce challenge
                            </FormDescription>
                            
                            <div className="space-y-2 mt-2">
                              {form.watch('objectives')?.map((objective, index) => (
                                <div key={index} className="flex items-center justify-between bg-secondary/20 px-3 py-2 rounded">
                                  <span>{objective}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => removeArrayItem('objectives', index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Learning Outcomes */}
                          <div className="space-y-2">
                            <Label>Résultats d'apprentissage</Label>
                            <div className="flex gap-2">
                              <Input 
                                id="learningOutcomes-input"
                                placeholder="Ex: Maîtriser l'utilisation de Google Analytics" 
                              />
                              <Button 
                                type="button"
                                onClick={() => {
                                  const inputElement = document.getElementById('learningOutcomes-input') as HTMLInputElement;
                                  addArrayItem('learningOutcomes', inputElement.value);
                                }}
                              >
                                Ajouter
                              </Button>
                            </div>
                            <FormDescription>
                              Ce que l'utilisateur pourra accomplir après avoir complété ce challenge
                            </FormDescription>
                            
                            <div className="space-y-2 mt-2">
                              {form.watch('learningOutcomes')?.map((outcome, index) => (
                                <div key={index} className="flex items-center justify-between bg-secondary/20 px-3 py-2 rounded">
                                  <span>{outcome}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => removeArrayItem('learningOutcomes', index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </ScrollArea>
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setIsCreateDialogOpen(false);
                          setIsEditDialogOpen(false);
                        }}
                      >
                        Annuler
                      </Button>
                      <Button type="submit">
                        {isCreateDialogOpen ? "Créer le challenge" : "Mettre à jour le challenge"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
        
        {/* View Challenge Dialog */}
        {isViewDialogOpen && selectedChallenge && (
          <Dialog 
            open={isViewDialogOpen} 
            onOpenChange={(open) => !open && setIsViewDialogOpen(false)}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>{selectedChallenge.title}</DialogTitle>
                <div className="flex gap-2 mt-2">
                  <Badge>{selectedChallenge.category}</Badge>
                  <Badge variant={
                    selectedChallenge.difficulty === "facile" ? "success" :
                      selectedChallenge.difficulty === "moyen" ? "warning" : "danger"
                  }>
                    {selectedChallenge.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedChallenge.status}</Badge>
                </div>
              </DialogHeader>
              
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{selectedChallenge.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Durée</p>
                        <p className="text-sm text-muted-foreground">{selectedChallenge.duration} jours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">XP</p>
                        <p className="text-sm text-muted-foreground">{selectedChallenge.xp} points</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Steps */}
                  {selectedChallenge.steps && selectedChallenge.steps.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Étapes ({selectedChallenge.steps.length})</h3>
                      <div className="space-y-4">
                        {selectedChallenge.steps.map((step, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <div className="rounded-full h-6 w-6 bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium">{step.title}</h4>
                                    {step.isLocked && (
                                      <Badge variant="outline" className="text-xs">Verrouillé</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                                  
                                  {step.instructions && step.instructions.length > 0 && (
                                    <div className="mt-2">
                                      <p className="text-xs font-medium mb-1">Instructions:</p>
                                      <ul className="text-xs text-muted-foreground list-disc list-inside">
                                        {step.instructions.map((instruction, i) => (
                                          <li key={i}>{instruction}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>Durée estimée: {step.estimatedTime} min</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Resources */}
                  {selectedChallenge.resources && selectedChallenge.resources.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Ressources ({selectedChallenge.resources.length})</h3>
                      <div className="space-y-2">
                        {selectedChallenge.resources.map((resource, index) => (
                          <div key={index} className="flex items-center p-3 bg-secondary/20 rounded-lg">
                            {resource.type === 'pdf' && <BookOpen className="h-4 w-4 text-primary mr-3" />}
                            {resource.type === 'video' && <BookOpen className="h-4 w-4 text-primary mr-3" />}
                            {resource.type === 'template' && <BookOpen className="h-4 w-4 text-primary mr-3" />}
                            {resource.type === 'simulator' && <Clock className="h-4 w-4 text-primary mr-3" />}
                            {resource.type === 'link' && <BookOpen className="h-4 w-4 text-primary mr-3" />}
                            <div>
                              <p className="font-medium text-sm">{resource.title}</p>
                              <p className="text-xs text-muted-foreground">{resource.url}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Metadata */}
                  <div className="space-y-4">
                    {selectedChallenge.targetAudience && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Audience cible</h4>
                        <p className="text-sm text-muted-foreground">{selectedChallenge.targetAudience}</p>
                      </div>
                    )}
                    
                    {selectedChallenge.prerequisites && selectedChallenge.prerequisites.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Prérequis</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {selectedChallenge.prerequisites.map((prerequisite, index) => (
                            <li key={index}>{prerequisite}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedChallenge.objectives && selectedChallenge.objectives.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Objectifs</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {selectedChallenge.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedChallenge.learningOutcomes && selectedChallenge.learningOutcomes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Résultats d'apprentissage</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {selectedChallenge.learningOutcomes.map((outcome, index) => (
                            <li key={index}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Fermer
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    form.reset({
                      title: selectedChallenge.title,
                      description: selectedChallenge.description,
                      category: selectedChallenge.category,
                      difficulty: selectedChallenge.difficulty,
                      duration: selectedChallenge.duration,
                      xp: selectedChallenge.xp,
                      status: selectedChallenge.status,
                      isPopular: selectedChallenge.isPopular,
                      isRecommended: selectedChallenge.isRecommended,
                      steps: selectedChallenge.steps || [],
                      resources: selectedChallenge.resources || [],
                      prerequisites: selectedChallenge.prerequisites || [],
                      objectives: selectedChallenge.objectives || [],
                      targetAudience: selectedChallenge.targetAudience || "",
                      learningOutcomes: selectedChallenge.learningOutcomes || []
                    });
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Step Dialog */}
        <Dialog 
          open={isStepDialogOpen} 
          onOpenChange={(open) => !open && setIsStepDialogOpen(false)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isNewStep ? "Ajouter une étape" : "Modifier l'étape"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...stepForm}>
              <form onSubmit={stepForm.handleSubmit(addStep)} className="space-y-4">
                <FormField
                  control={stepForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre de l'étape" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={stepForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description détaillée de l'étape"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={stepForm.control}
                  name="estimatedTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée estimée (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Temps estimé pour compléter cette étape"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={stepForm.control}
                  name="isLocked"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Verrouillée</FormLabel>
                        <FormDescription>
                          Les étapes verrouillées nécessitent la complétion des étapes précédentes.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="step-instruction-input"
                      placeholder="Ex: Utilisez l'outil X pour..." 
                    />
                    <Button 
                      type="button"
                      onClick={() => {
                        const inputElement = document.getElementById('step-instruction-input') as HTMLInputElement;
                        if (inputElement.value.trim()) {
                          const currentInstructions = stepForm.getValues('instructions') || [];
                          stepForm.setValue('instructions', [...currentInstructions, inputElement.value]);
                          inputElement.value = '';
                        }
                      }}
                    >
                      Ajouter
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    {stepForm.watch('instructions')?.map((instruction, index) => (
                      <div key={index} className="flex items-center justify-between bg-secondary/20 px-3 py-2 rounded">
                        <span>{instruction}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const currentInstructions = stepForm.getValues('instructions') || [];
                            currentInstructions.splice(index, 1);
                            stepForm.setValue('instructions', currentInstructions);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsStepDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    {isNewStep ? "Ajouter" : "Mettre à jour"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Resource Dialog */}
        <Dialog 
          open={isResourceDialogOpen} 
          onOpenChange={(open) => !open && setIsResourceDialogOpen(false)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isNewResource ? "Ajouter une ressource" : "Modifier la ressource"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...resourceForm}>
              <form onSubmit={resourceForm.handleSubmit(addResource)} className="space-y-4">
                <FormField
                  control={resourceForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre de la ressource" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={resourceForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type de ressource" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pdf">Document (PDF)</SelectItem>
                          <SelectItem value="video">Vidéo</SelectItem>
                          <SelectItem value="link">Lien</SelectItem>
                          <SelectItem value="template">Modèle</SelectItem>
                          <SelectItem value="simulator">Simulateur</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={resourceForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL de la ressource" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsResourceDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    {isNewResource ? "Ajouter" : "Mettre à jour"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog 
          open={isDeleteDialogOpen} 
          onOpenChange={(open) => !open && setIsDeleteDialogOpen(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement ce challenge
                et toutes les données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={() => selectedChallenge && onDeleteChallenge(selectedChallenge.id)}>
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ChallengeManager;
