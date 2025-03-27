
import { useState } from "react";
import { 
  CreditCard, Search, Filter, ChevronDown, Edit, AlertCircle, 
  Check, Plus, RefreshCw, DollarSign
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock subscription plans data
const MOCK_PLANS = [
  {
    id: "1",
    name: "Gratuit",
    description: "Plan de base avec fonctionnalités limitées",
    price: 0,
    billingCycle: "monthly",
    features: ["Accès aux challenges de base", "1 simulateur", "Support par email"],
    isActive: true,
    isDefault: true,
    usersCount: 203,
  },
  {
    id: "2",
    name: "Premium",
    description: "Plan premium avec fonctionnalités avancées",
    price: 19.99,
    billingCycle: "monthly",
    features: ["Accès à tous les challenges", "Tous les simulateurs", "Support prioritaire", "Contenu exclusif"],
    isActive: true,
    isDefault: false,
    usersCount: 87,
  },
  {
    id: "3",
    name: "Premium Annuel",
    description: "Plan premium avec facturation annuelle",
    price: 199.99,
    billingCycle: "yearly",
    features: ["Accès à tous les challenges", "Tous les simulateurs", "Support prioritaire", "Contenu exclusif", "2 mois gratuits"],
    isActive: true,
    isDefault: false,
    usersCount: 42,
  },
  {
    id: "4",
    name: "Entreprise",
    description: "Plan pour les entreprises",
    price: 99.99,
    billingCycle: "monthly",
    features: ["Accès à tous les challenges", "Tous les simulateurs", "Support dédié", "Contenu exclusif", "10 utilisateurs inclus"],
    isActive: false,
    isDefault: false,
    usersCount: 0,
  },
];

// Subscription plan schema for form validation
const planSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  description: z.string().min(5, { message: "La description doit contenir au moins 5 caractères" }),
  price: z.coerce.number().min(0, { message: "Le prix ne peut pas être négatif" }),
  billingCycle: z.enum(["monthly", "yearly"], {
    message: "Veuillez sélectionner un cycle de facturation",
  }),
  features: z.string().min(5, { message: "Les fonctionnalités doivent être renseignées (une par ligne)" }),
  isActive: z.boolean(),
  isDefault: z.boolean(),
});

type PlanFormValues = z.infer<typeof planSchema>;

const SubscriptionManager = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState(MOCK_PLANS);
  const [searchQuery, setSearchQuery] = useState("");
  const [billingFilter, setBillingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>(null);

  // Set up form for creating/editing plans
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      billingCycle: "monthly",
      features: "",
      isActive: true,
      isDefault: false,
    },
  });

  const billingCycleLabels = {
    monthly: { label: "Mensuel", color: "bg-blue-500" },
    yearly: { label: "Annuel", color: "bg-indigo-500" },
  };

  // Filter plans based on search and filters
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBilling = billingFilter === "all" || plan.billingCycle === billingFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && plan.isActive) || 
                         (statusFilter === "inactive" && !plan.isActive);
    
    return matchesSearch && matchesBilling && matchesStatus;
  });

  // Format price for display
  const formatPrice = (price: number, billingCycle: string) => {
    if (price === 0) return "Gratuit";
    return `${price.toFixed(2)} €${billingCycle === "yearly" ? "/an" : "/mois"}`;
  };

  // Open add dialog
  const handleAddPlan = () => {
    form.reset({
      name: "",
      description: "",
      price: 0,
      billingCycle: "monthly",
      features: "",
      isActive: true,
      isDefault: false,
    });
    setIsAddDialogOpen(true);
  };

  // Open edit dialog
  const handleEditPlan = (plan: any) => {
    setCurrentPlan(plan);
    form.reset({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      billingCycle: plan.billingCycle,
      features: plan.features.join("\n"),
      isActive: plan.isActive,
      isDefault: plan.isDefault,
    });
    setIsEditDialogOpen(true);
  };

  // Toggle plan active status
  const togglePlanStatus = (plan: any) => {
    const updatedPlans = plans.map((p) =>
      p.id === plan.id ? { ...p, isActive: !p.isActive } : p
    );
    
    setPlans(updatedPlans);
    
    toast({
      title: plan.isActive ? "Plan désactivé" : "Plan activé",
      description: `Le plan "${plan.name}" a été ${plan.isActive ? "désactivé" : "activé"} avec succès.`,
    });
  };

  // Set as default plan
  const setAsDefault = (plan: any) => {
    if (!plan.isActive) {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas définir un plan inactif comme plan par défaut.",
        variant: "destructive",
      });
      return;
    }

    const updatedPlans = plans.map((p) =>
      p.id === plan.id ? { ...p, isDefault: true } : { ...p, isDefault: false }
    );
    
    setPlans(updatedPlans);
    
    toast({
      title: "Plan par défaut mis à jour",
      description: `Le plan "${plan.name}" est maintenant le plan par défaut.`,
    });
  };

  // Submit form for adding a new plan
  const onSubmitAdd = (data: PlanFormValues) => {
    // Convert features string to array
    const featuresArray = data.features.split("\n").filter(feature => feature.trim() !== "");
    
    const newPlan = {
      id: (plans.length + 1).toString(),
      ...data,
      features: featuresArray,
      usersCount: 0,
    };
    
    // If this is set as default, update other plans
    const updatedPlans = data.isDefault 
      ? plans.map(plan => ({ ...plan, isDefault: false }))
      : [...plans];
    
    setPlans([...updatedPlans, newPlan]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Plan créé",
      description: `Le plan "${data.name}" a été ajouté avec succès.`,
    });
  };

  // Submit form for editing a plan
  const onSubmitEdit = (data: PlanFormValues) => {
    // Convert features string to array
    const featuresArray = data.features.split("\n").filter(feature => feature.trim() !== "");
    
    let updatedPlans;
    
    // If this is set as default, update other plans
    if (data.isDefault) {
      updatedPlans = plans.map(plan => 
        plan.id === currentPlan.id 
          ? { ...plan, ...data, features: featuresArray, isDefault: true } 
          : { ...plan, isDefault: false }
      );
    } else {
      // If this was the default and is no longer, we need a new default
      const wasDefault = currentPlan.isDefault && !data.isDefault;
      
      updatedPlans = plans.map(plan => {
        if (plan.id === currentPlan.id) {
          return { ...plan, ...data, features: featuresArray };
        }
        
        // If we need a new default and this is the first active plan, make it default
        if (wasDefault && plan.isActive && !plan.isDefault) {
          return { ...plan, isDefault: true };
        }
        
        return plan;
      });
    }
    
    setPlans(updatedPlans);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Plan modifié",
      description: `Le plan "${data.name}" a été mis à jour avec succès.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <CreditCard className="mr-2 h-6 w-6 text-primary" />
            Gestion des Abonnements
          </h1>
          <p className="text-muted-foreground">
            Gérez les formules d'abonnement disponibles sur la plateforme.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un plan..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2 flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Facturation
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setBillingFilter("all")}>
                      Tous les cycles
                      {billingFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    {Object.entries(billingCycleLabels).map(([key, { label }]) => (
                      <DropdownMenuItem 
                        key={key}
                        onClick={() => setBillingFilter(key)}
                      >
                        {label}
                        {billingFilter === key && <Check className="ml-2 h-4 w-4" />}
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
                    <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                      Actifs
                      {statusFilter === "active" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                      Inactifs
                      {statusFilter === "inactive" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button onClick={handleAddPlan} className="whitespace-nowrap">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlans.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Aucun plan ne correspond à votre recherche
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPlans.map((plan) => (
              <Card key={plan.id} className={`border-2 ${plan.isDefault ? 'border-primary' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditPlan(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold mr-2">
                      {plan.price === 0 ? "Gratuit" : `${plan.price.toFixed(2)} €`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">
                        /{plan.billingCycle === "yearly" ? "an" : "mois"}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={billingCycleLabels[plan.billingCycle as keyof typeof billingCycleLabels].color}>
                      {billingCycleLabels[plan.billingCycle as keyof typeof billingCycleLabels].label}
                    </Badge>
                    
                    <Badge variant={plan.isActive ? "default" : "outline"}>
                      {plan.isActive ? "Actif" : "Inactif"}
                    </Badge>
                    
                    {plan.isDefault && (
                      <Badge className="bg-primary">
                        Par défaut
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Fonctionnalités :</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Actif</span>
                      <Switch 
                        checked={plan.isActive}
                        onCheckedChange={() => togglePlanStatus(plan)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Plan par défaut</span>
                      <Switch 
                        checked={plan.isDefault}
                        disabled={!plan.isActive || plan.isDefault}
                        onCheckedChange={() => setAsDefault(plan)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Utilisateurs</span>
                      <span>{plan.usersCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add Plan Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un plan d'abonnement</DialogTitle>
            <DialogDescription>
              Créez un nouveau plan d'abonnement pour la plateforme.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du plan</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Premium" {...field} />
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
                      <Input placeholder="Description courte du plan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="number" 
                            step="0.01"
                            min="0"
                            placeholder="0.00" 
                            className="pl-8"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cycle de facturation</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Mensuel</SelectItem>
                          <SelectItem value="yearly">Annuel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fonctionnalités (une par ligne)</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Accès aux challenges de base&#10;Support par email&#10;etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Actif</FormLabel>
                        <FormDescription className="text-xs">
                          Le plan sera visible et disponible à l'achat
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
                
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Plan par défaut</FormLabel>
                        <FormDescription className="text-xs">
                          Plan sélectionné par défaut pour les nouveaux utilisateurs
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!form.watch("isActive")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="submit">Créer le plan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier le plan d'abonnement</DialogTitle>
            <DialogDescription>
              Modifiez les détails du plan d'abonnement sélectionné.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du plan</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Premium" {...field} />
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
                      <Input placeholder="Description courte du plan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="number" 
                            step="0.01"
                            min="0"
                            placeholder="0.00" 
                            className="pl-8"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cycle de facturation</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Mensuel</SelectItem>
                          <SelectItem value="yearly">Annuel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fonctionnalités (une par ligne)</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Accès aux challenges de base&#10;Support par email&#10;etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Actif</FormLabel>
                        <FormDescription className="text-xs">
                          Le plan sera visible et disponible à l'achat
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                            if (!value) {
                              form.setValue("isDefault", false);
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Plan par défaut</FormLabel>
                        <FormDescription className="text-xs">
                          Plan sélectionné par défaut pour les nouveaux utilisateurs
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!form.watch("isActive")}
                        />
                      </FormControl>
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
    </div>
  );
};

export default SubscriptionManager;
