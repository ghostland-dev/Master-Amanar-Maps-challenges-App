
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Award, Search, Plus, Edit, Trash2, ChevronDown, 
  Filter, FileText, Eye, AlertCircle, Check, X 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock challenge data
const MOCK_CHALLENGES = [
  {
    id: "1",
    title: "Arbitrage de Crypto-monnaies",
    description: "Apprenez à tirer profit des différences de prix entre les exchanges.",
    category: "Trading",
    difficulty: "intermediate",
    duration: "2-3 heures",
    xp: 150,
    status: "published",
  },
  {
    id: "2",
    title: "Revenus avec l'Affiliation",
    description: "Découvrez comment gagner des commissions en recommandant des produits.",
    category: "Marketing",
    difficulty: "beginner",
    duration: "1-2 heures",
    xp: 100,
    status: "published",
  },
  {
    id: "3",
    title: "Fondamentaux du Copywriting",
    description: "Maîtrisez l'art d'écrire des textes persuasifs qui convertissent.",
    category: "Marketing",
    difficulty: "intermediate",
    duration: "2-3 heures",
    xp: 150,
    status: "draft",
  },
  {
    id: "4",
    title: "Trading de NFTs",
    description: "Stratégies pour acheter et vendre des NFTs de manière profitable.",
    category: "Trading",
    difficulty: "advanced",
    duration: "3-4 heures",
    xp: 200,
    status: "archived",
  },
];

// Challenge schema for form validation
const challengeSchema = z.object({
  title: z.string().min(5, { message: "Le titre doit contenir au moins 5 caractères" }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
  category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
  difficulty: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Veuillez sélectionner un niveau de difficulté",
  }),
  duration: z.string().min(1, { message: "Veuillez indiquer une durée" }),
  xp: z.coerce.number().min(50, { message: "Le minimum d'XP est de 50" }).max(500, { message: "Le maximum d'XP est de 500" }),
  status: z.enum(["draft", "published", "archived"], {
    message: "Veuillez sélectionner un statut",
  }),
});

type ChallengeFormValues = z.infer<typeof challengeSchema>;

const ChallengeManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [challenges, setChallenges] = useState(MOCK_CHALLENGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Set up form for creating/editing challenges
  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "beginner",
      duration: "",
      xp: 100,
      status: "draft",
    },
  });

  const difficultyLabels = {
    beginner: { label: "Débutant", color: "bg-green-500 hover:bg-green-600" },
    intermediate: { label: "Intermédiaire", color: "bg-yellow-500 hover:bg-yellow-600" },
    advanced: { label: "Avancé", color: "bg-red-500 hover:bg-red-600" },
  };

  const statusLabels = {
    draft: { label: "Brouillon", color: "bg-slate-500" },
    published: { label: "Publié", color: "bg-green-500" },
    archived: { label: "Archivé", color: "bg-red-500" },
  };

  // Filter challenges based on search and filters
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || challenge.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || challenge.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(challenges.map(challenge => challenge.category)));

  // Open add dialog
  const handleAddChallenge = () => {
    form.reset({
      title: "",
      description: "",
      category: "",
      difficulty: "beginner",
      duration: "",
      xp: 100,
      status: "draft",
    });
    setIsAddDialogOpen(true);
  };

  // Open edit dialog
  const handleEditChallenge = (challenge: any) => {
    setCurrentChallenge(challenge);
    form.reset({
      title: challenge.title,
      description: challenge.description,
      category: challenge.category,
      difficulty: challenge.difficulty,
      duration: challenge.duration,
      xp: challenge.xp,
      status: challenge.status,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteChallenge = (challenge: any) => {
    setCurrentChallenge(challenge);
    setIsDeleteDialogOpen(true);
  };

  // Submit form for adding a new challenge
  const onSubmitAdd = (data: ChallengeFormValues) => {
    const newChallenge = {
      id: (challenges.length + 1).toString(),
      ...data,
    };
    
    setChallenges([...challenges, newChallenge]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Challenge créé",
      description: `"${data.title}" a été ajouté avec succès.`,
    });
  };

  // Submit form for editing a challenge
  const onSubmitEdit = (data: ChallengeFormValues) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === currentChallenge.id ? { ...challenge, ...data } : challenge
    );
    
    setChallenges(updatedChallenges);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Challenge modifié",
      description: `"${data.title}" a été mis à jour avec succès.`,
    });
  };

  // Confirm deletion of a challenge
  const confirmDelete = () => {
    const updatedChallenges = challenges.filter(
      (challenge) => challenge.id !== currentChallenge.id
    );
    
    setChallenges(updatedChallenges);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Challenge supprimé",
      description: `"${currentChallenge.title}" a été supprimé avec succès.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Award className="mr-2 h-6 w-6 text-primary" />
            Gestion des Challenges
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez les challenges disponibles sur la plateforme.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un challenge..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Catégorie
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                      Toutes les catégories
                      {categoryFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem 
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category}
                        {categoryFilter === category && <Check className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Statut
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      Tous les statuts
                      {statusFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    {Object.entries(statusLabels).map(([key, { label }]) => (
                      <DropdownMenuItem 
                        key={key}
                        onClick={() => setStatusFilter(key)}
                      >
                        {label}
                        {statusFilter === key && <Check className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button onClick={handleAddChallenge} className="whitespace-nowrap">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                  <TableHead className="hidden md:table-cell">Difficulté</TableHead>
                  <TableHead className="hidden md:table-cell">XP</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChallenges.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                      Aucun challenge ne correspond à votre recherche
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredChallenges.map((challenge) => (
                    <TableRow key={challenge.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{challenge.title}</div>
                          <div className="text-xs text-muted-foreground md:hidden">
                            {challenge.category} · {difficultyLabels[challenge.difficulty as keyof typeof difficultyLabels].label} · {challenge.xp} XP
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{challenge.category}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={difficultyLabels[challenge.difficulty as keyof typeof difficultyLabels].color}>
                          {difficultyLabels[challenge.difficulty as keyof typeof difficultyLabels].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{challenge.xp} XP</TableCell>
                      <TableCell>
                        <Badge className={statusLabels[challenge.status as keyof typeof statusLabels].color}>
                          {statusLabels[challenge.status as keyof typeof statusLabels].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="outline" size="icon" onClick={() => navigate(`/challenge/${challenge.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditChallenge(challenge)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteChallenge(challenge)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Add Challenge Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau challenge</DialogTitle>
            <DialogDescription>
              Créez un nouveau challenge pour la plateforme. Les utilisateurs pourront le découvrir une fois publié.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
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
                        placeholder="Description du challenge" 
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
                        <Input placeholder="Ex: Trading, Marketing..." {...field} />
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
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une difficulté" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée estimée</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 1-2 heures" {...field} />
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
                      <FormLabel>Points d'XP</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ex: 100" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Brouillon</SelectItem>
                          <SelectItem value="published">Publié</SelectItem>
                          <SelectItem value="archived">Archivé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="submit">Créer le challenge</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Challenge Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Modifier le challenge</DialogTitle>
            <DialogDescription>
              Apportez des modifications au challenge sélectionné.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
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
                        placeholder="Description du challenge" 
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
                        <Input placeholder="Ex: Trading, Marketing..." {...field} />
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
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une difficulté" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée estimée</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 1-2 heures" {...field} />
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
                      <FormLabel>Points d'XP</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ex: 100" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Brouillon</SelectItem>
                          <SelectItem value="published">Publié</SelectItem>
                          <SelectItem value="archived">Archivé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="submit">Sauvegarder les modifications</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Challenge Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Le challenge sera définitivement supprimé de la plateforme.
              {currentChallenge && (
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <div className="font-medium">{currentChallenge.title}</div>
                  <div className="text-sm text-muted-foreground">{currentChallenge.description}</div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChallengeManager;
