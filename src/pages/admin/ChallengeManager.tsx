import { useState } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, Trash2, Pencil, ChevronRight, Check, 
  PlusSquare, MinusSquare, Award, Clock, Link as LinkIcon, Eye, 
  CheckCircle, Target, BookOpen, Layers, ShoppingCart, 
  TrendingUp, PenTool, Link, X
} from "lucide-react";
import { Lock, Play } from "@/components/admin/components/ChallengeManagerIcons";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";

interface Step {
  id: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface Resource {
  id: number;
  title: string;
  type: "pdf" | "template" | "simulator" | "video";
  url: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  xp: number;
  participants?: number;
  steps: Step[];
  isPopular: boolean;
  isNew: boolean;
  isActive: boolean;
  resources: Resource[];
  rewards: string[];
  completedBy?: number;
  rating?: number;
}

interface ChallengeTableProps {
  challenges: Challenge[];
  onEdit: (challenge: Challenge) => void;
  onDelete: (challenge: Challenge) => void;
  onToggle: (id: string, isActive: boolean) => void;
  getChallengeIcon: (category: string) => JSX.Element;
  getDifficultyLabel: (difficulty: string) => JSX.Element;
  getChallengeStatus: (challenge: Challenge) => JSX.Element;
  categoryLabels: Record<string, string>;
}

// Challenge Table Component
const ChallengeTable = ({
  challenges,
  onEdit,
  onDelete,
  onToggle,
  getChallengeIcon,
  getDifficultyLabel,
  getChallengeStatus,
  categoryLabels
}: ChallengeTableProps) => {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Challenge</TableHead>
            <TableHead className="w-[150px]">Catégorie</TableHead>
            <TableHead className="w-[120px]">Difficulté</TableHead>
            <TableHead className="w-[120px]">XP</TableHead>
            <TableHead className="w-[120px]">Durée</TableHead>
            <TableHead className="w-[120px]">Participants</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[150px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {challenges.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Target className="h-8 w-8 mb-2" />
                  <p>Aucun challenge trouvé</p>
                  <p className="text-sm">Créez un nouveau challenge ou modifiez vos filtres.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            challenges.map((challenge) => (
              <TableRow key={challenge.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getChallengeIcon(challenge.category)}
                    </div>
                    <div>
                      <div className="font-medium">{challenge.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {challenge.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {categoryLabels[challenge.category] || challenge.category}
                </TableCell>
                <TableCell>
                  {getDifficultyLabel(challenge.difficulty)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Award className="mr-1.5 h-4 w-4 text-primary" />
                    {challenge.xp}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    {challenge.duration}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {challenge.participants || 0}
                    <Badge className="ml-1.5 bg-primary/10 text-primary hover:bg-primary/20">
                      {challenge.completedBy || 0} terminés
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {getChallengeStatus(challenge)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Switch
                      checked={challenge.isActive}
                      onCheckedChange={(checked) => onToggle(challenge.id, checked)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(challenge)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(challenge)}
                    >
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
  );
};

const ChallengeManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [activeStepTab, setActiveStepTab] = useState("steps");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  
  // Form state for new challenge
  const [formData, setFormData] = useState<Omit<Challenge, "id">>({
    title: "",
    description: "",
    category: "ecommerce",
    difficulty: "beginner",
    duration: "14 jours",
    xp: 300,
    steps: [],
    isPopular: false,
    isNew: true,
    isActive: true,
    resources: [],
    rewards: [],
  });

  // Form state for step
  const [stepForm, setStepForm] = useState<Omit<Step, "id">>({
    title: "",
    description: "",
    isCompleted: false,
    isLocked: false,
  });

  // Form state for resource
  const [resourceForm, setResourceForm] = useState<Omit<Resource, "id">>({
    title: "",
    type: "pdf",
    url: "",
  });

  // Form state for reward
  const [rewardForm, setRewardForm] = useState("");

  // Initial challenge data
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Première vente en Dropshipping",
      description: "Lancez votre première boutique en ligne et réalisez une vente en dropshipping.",
      category: "ecommerce",
      difficulty: "beginner",
      duration: "14 jours",
      xp: 300,
      participants: 587,
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
          title: "Configurer la logistique et les paiements",
          description: "Mettre en place votre système de commande, livraison et paiement.",
          isCompleted: false,
          isLocked: false,
        },
      ],
      isPopular: true,
      isNew: false,
      isActive: true,
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
      ],
      rewards: ["Badge Vendeur", "Accès au forum E-commerce"],
      completedBy: 420,
      rating: 4.7,
    },
    {
      id: "2",
      title: "Portfolio Crypto Diversifié",
      description: "Créez et gérez un portefeuille diversifié de cryptomonnaies.",
      category: "crypto",
      difficulty: "intermediate",
      duration: "30 jours",
      xp: 450,
      participants: 495,
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
          title: "Sécuriser vos investissements",
          description: "Mettre en place des solutions de sécurité pour protéger vos actifs numériques.",
          isCompleted: false,
          isLocked: false,
        },
      ],
      isPopular: false,
      isNew: false,
      isActive: true,
      resources: [
        {
          id: 1,
          title: "Guide d'introduction aux cryptomonnaies",
          type: "pdf",
          url: "#",
        },
      ],
      rewards: ["Badge Investisseur", "10€ en Bitcoin"],
      completedBy: 187,
      rating: 4.3,
    },
  ]);

  // Category mapping
  const categoryIcons: Record<string, JSX.Element> = {
    "ecommerce": <Layers className="h-5 w-5" />,
    "crypto": <TrendingUp className="h-5 w-5" />,
    "achat-revente": <ShoppingCart className="h-5 w-5" />,
    "affiliation": <LinkIcon className="h-5 w-5" />,
    "copywriting": <PenTool className="h-5 w-5" />,
    "marketing": <Eye className="h-5 w-5" />,
  };
  
  const categoryLabels: Record<string, string> = {
    "ecommerce": "E-commerce",
    "crypto": "Crypto",
    "achat-revente": "Achat/Revente",
    "affiliation": "Affiliation",
    "copywriting": "Copywriting",
    "marketing": "Marketing",
    "developpement": "Développement",
    "design": "Design",
  };

  const resourceTypeLabels: Record<string, string> = {
    "pdf": "Document PDF",
    "template": "Modèle/Template",
    "simulator": "Simulateur",
    "video": "Vidéo",
  };

  // Filtered challenges
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = searchQuery
      ? challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = categoryFilter
      ? challenge.category === categoryFilter
      : true;
    
    const matchesDifficulty = difficultyFilter
      ? challenge.difficulty === difficultyFilter
      : true;
    
    const matchesTab = activeTab === "all" 
      ? true 
      : activeTab === "active" 
        ? challenge.isActive 
        : !challenge.isActive;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab;
  });

  // Get challenge icon based on category
  const getChallengeIcon = (category: string) => {
    return categoryIcons[category] || <Target className="h-5 w-5" />;
  };

  // CRUD Operations
  const handleAddChallenge = () => {
    const newChallenge: Challenge = {
      ...formData,
      id: (challenges.length + 1).toString(),
    };
    
    setChallenges([...challenges, newChallenge]);
    setFormData({
      title: "",
      description: "",
      category: "ecommerce",
      difficulty: "beginner",
      duration: "14 jours",
      xp: 300,
      steps: [],
      isPopular: false,
      isNew: true,
      isActive: true,
      resources: [],
      rewards: [],
    });
    
    setIsAddDialogOpen(false);
    
    toast({
      title: "Challenge ajouté",
      description: `Le challenge "${newChallenge.title}" a été créé avec succès.`,
    });
  };

  const handleUpdateChallenge = () => {
    if (!currentChallenge) return;
    
    setChallenges(challenges.map(challenge => 
      challenge.id === currentChallenge.id ? currentChallenge : challenge
    ));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Challenge mis à jour",
      description: `Le challenge "${currentChallenge.title}" a été mis à jour avec succès.`,
    });
  };

  const handleDeleteChallenge = () => {
    if (!currentChallenge) return;
    
    setChallenges(challenges.filter(challenge => challenge.id !== currentChallenge.id));
    
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Challenge supprimé",
      description: `Le challenge "${currentChallenge.title}" a été supprimé avec succès.`,
    });
  };

  const handleAddStep = () => {
    if (!currentChallenge) return;
    
    const newStep: Step = {
      ...stepForm,
      id: (currentChallenge.steps.length + 1),
    };
    
    const updatedChallenge = {
      ...currentChallenge,
      steps: [...currentChallenge.steps, newStep],
    };
    
    setCurrentChallenge(updatedChallenge);
    
    setStepForm({
      title: "",
      description: "",
      isCompleted: false,
      isLocked: false,
    });
    
    toast({
      title: "Étape ajoutée",
      description: `L'étape "${newStep.title}" a été ajoutée avec succès.`,
    });
  };

  const handleDeleteStep = (stepId: number) => {
    if (!currentChallenge) return;
    
    const updatedSteps = currentChallenge.steps.filter(step => step.id !== stepId);
    
    setCurrentChallenge({
      ...currentChallenge,
      steps: updatedSteps,
    });
    
    toast({
      title: "Étape supprimée",
      description: "L'étape a été supprimée avec succès.",
    });
  };

  const handleAddResource = () => {
    if (!currentChallenge) return;
    
    const newResource: Resource = {
      ...resourceForm,
      id: (currentChallenge.resources.length + 1),
    };
    
    const updatedChallenge = {
      ...currentChallenge,
      resources: [...currentChallenge.resources, newResource],
    };
    
    setCurrentChallenge(updatedChallenge);
    
    setResourceForm({
      title: "",
      type: "pdf",
      url: "",
    });
    
    toast({
      title: "Ressource ajoutée",
      description: `La ressource "${newResource.title}" a été ajoutée avec succès.`,
    });
  };

  const handleDeleteResource = (resourceId: number) => {
    if (!currentChallenge) return;
    
    const updatedResources = currentChallenge.resources.filter(resource => resource.id !== resourceId);
    
    setCurrentChallenge({
      ...currentChallenge,
      resources: updatedResources,
    });
    
    toast({
      title: "Ressource supprimée",
      description: "La ressource a été supprimée avec succès.",
    });
  };

  const handleAddReward = () => {
    if (!currentChallenge || !rewardForm.trim()) return;
    
    const updatedChallenge = {
      ...currentChallenge,
      rewards: [...currentChallenge.rewards, rewardForm],
    };
    
    setCurrentChallenge(updatedChallenge);
    setRewardForm("");
    
    toast({
      title: "Récompense ajoutée",
      description: `La récompense "${rewardForm}" a été ajoutée avec succès.`,
    });
  };

  const handleDeleteReward = (index: number) => {
    if (!currentChallenge) return;
    
    const updatedRewards = [...currentChallenge.rewards];
    updatedRewards.splice(index, 1);
    
    setCurrentChallenge({
      ...currentChallenge,
      rewards: updatedRewards,
    });
    
    toast({
      title: "Récompense supprimée",
      description: "La récompense a été supprimée avec succès.",
    });
  };

  const handleToggleChallenge = (id: string, isActive: boolean) => {
    setChallenges(
      challenges.map(challenge => 
        challenge.id === id 
          ? { ...challenge, isActive } 
          : challenge
      )
    );
    
    toast({
      title: isActive ? "Challenge activé" : "Challenge désactivé",
      description: `Le challenge a été ${isActive ? "activé" : "désactivé"} avec succès.`,
    });
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Badge className="bg-green-500">Débutant</Badge>;
      case "intermediate":
        return <Badge className="bg-amber-500">Intermédiaire</Badge>;
      case "advanced":
        return <Badge className="bg-red-500">Avancé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getChallengeStatus = (challenge: Challenge) => {
    if (!challenge.isActive) {
      return <Badge variant="outline" className="bg-muted/50 text-muted-foreground">Inactif</Badge>;
    }
    if (challenge.isNew) {
      return <Badge className="bg-primary">Nouveau</Badge>;
    }
    if (challenge.isPopular) {
      return <Badge className="bg-amber-500">Populaire</Badge>;
    }
    return <Badge variant="outline" className="bg-green-500/10 text-green-500">Actif</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <AdminNavbar />
      <div className="container px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des Challenges</h1>
            <p className="text-muted-foreground">
              Créez, modifiez et gérez les challenges de la plateforme
            </p>
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter un challenge
          </Button>
        </div>

        {/* Filters and Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="active">Actifs</TabsTrigger>
                <TabsTrigger value="inactive">Inactifs</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-1 gap-2">
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes</SelectItem>
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Difficulté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes</SelectItem>
                    <SelectItem value="beginner">Débutant</SelectItem>
                    <SelectItem value="intermediate">Intermédiaire</SelectItem>
                    <SelectItem value="advanced">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <ChallengeTable 
                challenges={filteredChallenges} 
                onEdit={(challenge) => {
                  setCurrentChallenge(challenge);
                  setIsEditDialogOpen(true);
                }}
                onDelete={(challenge) => {
                  setCurrentChallenge(challenge);
                  setIsDeleteDialogOpen(true);
                }}
                onToggle={handleToggleChallenge}
                getChallengeIcon={getChallengeIcon}
                getDifficultyLabel={getDifficultyLabel}
                getChallengeStatus={getChallengeStatus}
                categoryLabels={categoryLabels}
              />
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              <ChallengeTable 
                challenges={filteredChallenges} 
                onEdit={(challenge) => {
                  setCurrentChallenge(challenge);
                  setIsEditDialogOpen(true);
                }}
                onDelete={(challenge) => {
                  setCurrentChallenge(challenge);
                  setIsDeleteDialogOpen(true);
                }}
                onToggle={handleToggleChallenge}
                getChallengeIcon={getChallengeIcon}
                getDifficultyLabel={getDifficultyLabel}
                getChallengeStatus={getChallengeStatus}
                categoryLabels={categoryLabels}
              />
            </TabsContent>
            
            <TabsContent value="inactive" className="space-y-4">
              <ChallengeTable 
                challenges={filteredChallenges} 
                onEdit={(challenge) => {
                  setCurrentChallenge(challenge);
                  setIsEditDialogOpen(true);
                }}
                onDelete={(challenge) => {
                  setCurrentChallenge(challenge);
                  setIsDeleteDialogOpen(true);
                }}
                onToggle={handleToggleChallenge}
                getChallengeIcon={getChallengeIcon}
                getDifficultyLabel={getDifficultyLabel}
                getChallengeStatus={getChallengeStatus}
                categoryLabels={categoryLabels}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Challenge Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau challenge</DialogTitle>
              <DialogDescription>
                Créez un nouveau challenge pour les utilisateurs de la plateforme.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Titre du challenge"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description détaillée du challenge"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <Select 
                    value={formData.difficulty} 
                    onValueChange={(value: "beginner" | "intermediate" | "advanced") => 
                      setFormData({...formData, difficulty: value})
                    }
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Niveau de difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Débutant</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire</SelectItem>
                      <SelectItem value="advanced">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée estimée</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="ex: 14 jours"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="xp">Points XP</Label>
                  <Input
                    id="xp"
                    type="number"
                    value={formData.xp}
                    onChange={(e) => setFormData({...formData, xp: parseInt(e.target.value)})}
                    placeholder="Points d'expérience"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isActive" 
                    checked={formData.isActive} 
                    onCheckedChange={(checked) => 
                      setFormData({...formData, isActive: checked as boolean})
                    }
                  />
                  <Label htmlFor="isActive">Challenge actif</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isNew" 
                    checked={formData.isNew} 
                    onCheckedChange={(checked) => 
                      setFormData({...formData, isNew: checked as boolean})
                    }
                  />
                  <Label htmlFor="isNew">Marquer comme nouveau</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isPopular" 
                    checked={formData.isPopular} 
                    onCheckedChange={(checked) => 
                      setFormData({...formData, isPopular: checked as boolean})
                    }
                  />
                  <Label htmlFor="isPopular">Marquer comme populaire</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddChallenge}>Créer le challenge</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Challenge Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier le challenge</DialogTitle>
              <DialogDescription>
                Modifiez les détails, étapes et ressources du challenge.
              </DialogDescription>
            </DialogHeader>
            
            {currentChallenge && (
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="steps">Étapes</TabsTrigger>
                  <TabsTrigger value="resources">Ressources</TabsTrigger>
                </TabsList>
                
                {/* Details Tab */}
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Titre</Label>
                      <Input
                        id="edit-title"
                        value={currentChallenge.title}
                        onChange={(e) => setCurrentChallenge({
                          ...currentChallenge, 
                          title: e.target.value
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Catégorie</Label>
                      <Select 
                        value={currentChallenge.category} 
                        onValueChange={(value) => setCurrentChallenge({
                          ...currentChallenge, 
                          category: value
                        })}
                      >
                        <SelectTrigger id="edit-category">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={currentChallenge.description}
                      onChange={(e) => setCurrentChallenge({
                        ...currentChallenge, 
                        description: e.target.value
                      })}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-difficulty">Difficulté</Label>
                      <Select 
                        value={currentChallenge.difficulty} 
                        onValueChange={(value: "beginner" | "intermediate" | "advanced") => 
                          setCurrentChallenge({
                            ...currentChallenge, 
                            difficulty: value
                          })
                        }
                      >
                        <SelectTrigger id="edit-difficulty">
                          <SelectValue placeholder="Niveau de difficulté" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Débutant</SelectItem>
                          <SelectItem value="intermediate">Intermédiaire</SelectItem>
                          <SelectItem value="advanced">Avancé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-duration">Durée estimée</Label>
                      <Input
                        id="edit-duration"
                        value={currentChallenge.duration}
                        onChange={(e) => setCurrentChallenge({
                          ...currentChallenge, 
                          duration: e.target.value
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-xp">Points XP</Label>
                      <Input
                        id="edit-xp"
                        type="number"
                        value={currentChallenge.xp}
                        onChange={(e) => setCurrentChallenge({
                          ...currentChallenge, 
                          xp: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:
