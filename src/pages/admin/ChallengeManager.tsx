import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import AdminNavbar from "@/components/admin/AdminNavbar";

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
});

// Define the type for a challenge based on the schema
type Challenge = z.infer<typeof challengeSchema> & { id: string };

const ChallengeManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State variables
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  // Mock data for demonstration purposes
  useEffect(() => {
    // Replace this with a real API call to fetch challenges
    const mockChallenges: Challenge[] = [
      { id: "1", title: "Défi SEO", description: "Optimisez un site web pour les moteurs de recherche.", category: "SEO", difficulty: "moyen", duration: 30, xp: 500, status: "publié" },
      { id: "2", title: "Campagne Adwords", description: "Lancez une campagne publicitaire sur Google Adwords.", category: "Publicité", difficulty: "difficile", duration: 60, xp: 800, status: "publié" },
      { id: "3", title: "Analyse de Logs", description: "Effectuez une analyse des logs d'un serveur.", category: "DevOps", difficulty: "facile", duration: 15, xp: 200, status: "brouillon" },
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
    },
  });

  // Handlers for form submission
  const onCreateChallenge = (values: Challenge) => {
    // In a real app, you would send this data to your server
    const newChallenge: Challenge = { ...values, id: String(Date.now()) };
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
            status: updatedData.status || challenge.status
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
    toast({
      title: "Challenge supprimé",
      description: "Le challenge a été supprimé avec succès",
    });
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
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Challenge
          </Button>
        </div>

        <Table>
          <TableCaption>Liste des challenges disponibles sur la plateforme.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Difficulté</TableHead>
              <TableHead>Durée (jours)</TableHead>
              <TableHead>XP</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challenges.map((challenge) => (
              <TableRow key={challenge.id}>
                <TableCell className="font-medium">{challenge.title}</TableCell>
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
                <TableCell>{challenge.status}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      form.reset(challenge);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteChallenge(challenge.id)}
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

        {/* Create Challenge Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Créer un nouveau challenge</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau challenge à la plateforme.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCreateChallenge)} className="space-y-4">
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
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button type="submit">Créer le challenge</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Challenge Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier le challenge</DialogTitle>
              <DialogDescription>
                Modifiez les informations du challenge sélectionné.
              </DialogDescription>
            </DialogHeader>
            {selectedChallenge ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => updateChallenge(selectedChallenge.id, values))} className="space-y-4">
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
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <Button type="submit">Mettre à jour le challenge</Button>
                </form>
              </Form>
            ) : (
              <div>Challenge non sélectionné</div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChallengeManager;
