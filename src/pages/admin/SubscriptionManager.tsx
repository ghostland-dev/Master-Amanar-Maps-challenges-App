import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the SubscriptionPlan type
type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
  isActive: boolean;
  isDefault: boolean;
  usersCount: number;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit comporter au moins 10 caractères.",
  }),
  price: z.number(),
  billingCycle: z.enum(["monthly", "yearly"]),
  features: z.string().array(),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  usersCount: z.number(),
});

const SubscriptionManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    {
      id: "1",
      name: "Free",
      description: "For individuals getting started.",
      price: 0,
      billingCycle: "monthly",
      features: ["Access to basic challenges", "Community support"],
      isActive: true,
      isDefault: true,
      usersCount: 10,
    },
    {
      id: "2",
      name: "Pro",
      description: "For small teams and professionals.",
      price: 29,
      billingCycle: "monthly",
      features: ["Access to all challenges", "Priority support", "Team collaboration"],
      isActive: true,
      isDefault: false,
      usersCount: 50,
    },
    {
      id: "3",
      name: "Enterprise",
      description: "For large organizations with advanced needs.",
      price: 99,
      billingCycle: "monthly",
      features: ["Custom challenges", "Dedicated support", "Unlimited users"],
      isActive: true,
      isDefault: false,
      usersCount: 1000,
    },
  ]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      billingCycle: "monthly",
      features: [],
      isActive: true,
      isDefault: false,
      usersCount: 0,
    },
  });

  const onCreatePlan = (values: z.infer<typeof formSchema>) => {
    const newPlan: SubscriptionPlan = {
      id: String(Date.now()),
      name: values.name,
      description: values.description,
      price: values.price,
      billingCycle: values.billingCycle,
      features: values.features || [],
      isActive: values.isActive,
      isDefault: values.isDefault,
      usersCount: values.usersCount
    };
    setPlans([...plans, newPlan]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Forfait créé",
      description: "Le nouveau forfait d'abonnement a été créé avec succès",
    });
    form.reset();
  };

  const onUpdatePlan = (values: z.infer<typeof formSchema>) => {
    if (selectedPlan) {
      updatePlan(selectedPlan.id, values);
    }
  };

  const updatePlan = (id: string, updatedData: Partial<SubscriptionPlan>) => {
    const updatedPlans = plans.map(plan =>
      plan.id === id
        ? {
          ...plan,
          ...updatedData,
          name: updatedData.name || plan.name,
          description: updatedData.description || plan.description,
          price: updatedData.price ?? plan.price,
          billingCycle: updatedData.billingCycle || plan.billingCycle,
          features: updatedData.features || plan.features,
          isActive: updatedData.isActive ?? plan.isActive,
          isDefault: updatedData.isDefault ?? plan.isDefault,
          usersCount: updatedData.usersCount ?? plan.usersCount
        }
        : plan
    );
    setPlans(updatedPlans);
    setIsEditDialogOpen(false);
    toast({
      title: "Forfait mis à jour",
      description: "Le forfait d'abonnement a été modifié avec succès",
    });
  };

  const onDeletePlan = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id));
    toast({
      title: "Forfait supprimé",
      description: "Le forfait d'abonnement a été supprimé avec succès",
    });
  };

  useEffect(() => {
    if (selectedPlan) {
      form.reset(selectedPlan);
    }
  }, [selectedPlan, form]);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10 flex items-center space-x-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Abonnements</h1>
          <p className="text-muted-foreground">
            Gérez les plans d'abonnement et les transactions sur la plateforme.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Abonnements</CardTitle>
          <CardDescription>
            Affichez, modifiez et gérez les abonnements disponibles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Cycle de facturation</TableHead>
                <TableHead>Nombre d'utilisateurs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.price} €</TableCell>
                  <TableCell>{plan.billingCycle}</TableCell>
                  <TableCell>{plan.usersCount}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPlan(plan);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeletePlan(plan.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Abonnement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Créer un Abonnement</DialogTitle>
                <DialogDescription>
                  Créer un nouveau plan d'abonnement pour la plateforme.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreatePlan)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom du forfait" {...field} />
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
                          <Input placeholder="Description du forfait" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Prix du forfait" {...field} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <FormField
                    control={form.control}
                    name="usersCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre d'utilisateurs</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Nombre d'utilisateurs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Actif</FormLabel>
                          <FormDescription>
                            Définir si le plan est actif ou non.
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
                      <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Par défaut</FormLabel>
                          <FormDescription>
                            Définir si le plan est le plan par défaut.
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
                  <div className="flex justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button type="submit">Créer</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" style={{ display: 'none' }}>
                Modifier un Abonnement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Modifier un Abonnement</DialogTitle>
                <DialogDescription>
                  Modifier un plan d'abonnement existant.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdatePlan)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom du forfait" {...field} />
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
                          <Input placeholder="Description du forfait" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Prix du forfait" {...field} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <FormField
                    control={form.control}
                    name="usersCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre d'utilisateurs</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Nombre d'utilisateurs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Actif</FormLabel>
                          <FormDescription>
                            Définir si le plan est actif ou non.
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
                      <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Par défaut</FormLabel>
                          <FormDescription>
                            Définir si le plan est le plan par défaut.
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
                  <div className="flex justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button type="submit">Mettre à jour</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManager;
