
import { useState } from "react";
import { 
  Users, Search, Filter, ChevronDown, Eye, Edit, Trash2, AlertCircle,
  Check, X, UserPlus, UserCheck, Mail, PenSquare, Lock, Unlock
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "admin",
    status: "active",
    plan: "premium",
    createdAt: "2023-05-15T10:30:00.000Z",
    avatar: "",
  },
  {
    id: "2",
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    role: "user",
    status: "active",
    plan: "free",
    createdAt: "2023-06-22T14:45:00.000Z",
    avatar: "",
  },
  {
    id: "3",
    name: "Thomas Martin",
    email: "thomas.martin@example.com",
    role: "user",
    status: "active",
    plan: "premium",
    createdAt: "2023-07-10T09:15:00.000Z",
    avatar: "",
  },
  {
    id: "4",
    name: "Sophie Legrand",
    email: "sophie.legrand@example.com",
    role: "user",
    status: "blocked",
    plan: "free",
    createdAt: "2023-08-05T16:20:00.000Z",
    avatar: "",
  },
  {
    id: "5",
    name: "Luc Bernard",
    email: "luc.bernard@example.com",
    role: "user",
    status: "pending",
    plan: "free",
    createdAt: "2023-09-12T11:50:00.000Z",
    avatar: "",
  },
];

// User schema for form validation
const userSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  role: z.enum(["admin", "user"], {
    message: "Veuillez sélectionner un rôle",
  }),
  status: z.enum(["active", "pending", "blocked"], {
    message: "Veuillez sélectionner un statut",
  }),
  plan: z.enum(["free", "premium"], {
    message: "Veuillez sélectionner un plan",
  }),
});

type UserFormValues = z.infer<typeof userSchema>;

const UserManager = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Set up form for editing users
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      status: "active",
      plan: "free",
    },
  });

  const roleLabels = {
    admin: { label: "Admin", color: "bg-purple-500" },
    user: { label: "Utilisateur", color: "bg-blue-500" },
  };

  const statusLabels = {
    active: { label: "Actif", color: "bg-green-500" },
    pending: { label: "En attente", color: "bg-yellow-500" },
    blocked: { label: "Bloqué", color: "bg-red-500" },
  };

  const planLabels = {
    free: { label: "Gratuit", color: "bg-slate-500" },
    premium: { label: "Premium", color: "bg-amber-500" },
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesPlan = planFilter === "all" || user.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesPlan;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Open edit dialog
  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      plan: user.plan,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteUser = (user: any) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Submit form for editing a user
  const onSubmitEdit = (data: UserFormValues) => {
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? { ...user, ...data } : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Utilisateur modifié",
      description: `Le profil de "${data.name}" a été mis à jour avec succès.`,
    });
  };

  // Confirm deletion of a user
  const confirmDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== currentUser.id);
    
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Utilisateur supprimé",
      description: `"${currentUser.name}" a été supprimé avec succès.`,
      variant: "destructive",
    });
  };

  // Quick actions for users
  const toggleUserStatus = (user: any) => {
    const newStatus = user.status === "active" ? "blocked" : "active";
    
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: newStatus === "active" ? "Utilisateur activé" : "Utilisateur bloqué",
      description: `Le statut de "${user.name}" a été mis à jour avec succès.`,
    });
  };

  const sendPasswordReset = (user: any) => {
    toast({
      title: "Email de réinitialisation envoyé",
      description: `Un email a été envoyé à ${user.email} avec les instructions de réinitialisation.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Users className="mr-2 h-6 w-6 text-primary" />
            Gestion des Utilisateurs
          </h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, leurs rôles et leur accès à la plateforme.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un utilisateur..."
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
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Rôle
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                      Tous les rôles
                      {roleFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    {Object.entries(roleLabels).map(([key, { label }]) => (
                      <DropdownMenuItem 
                        key={key}
                        onClick={() => setRoleFilter(key)}
                      >
                        {label}
                        {roleFilter === key && <Check className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Plan
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setPlanFilter("all")}>
                      Tous les plans
                      {planFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                    </DropdownMenuItem>
                    {Object.entries(planLabels).map(([key, { label }]) => (
                      <DropdownMenuItem 
                        key={key}
                        onClick={() => setPlanFilter(key)}
                      >
                        {label}
                        {planFilter === key && <Check className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead className="hidden md:table-cell">Rôle</TableHead>
                  <TableHead className="hidden md:table-cell">Plan</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden md:table-cell">Inscrit le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                      Aucun utilisateur ne correspond à votre recherche
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                            <div className="md:hidden flex flex-wrap gap-1 mt-1">
                              <Badge className={roleLabels[user.role as keyof typeof roleLabels].color + " text-xs"}>
                                {roleLabels[user.role as keyof typeof roleLabels].label}
                              </Badge>
                              <Badge className={planLabels[user.plan as keyof typeof planLabels].color + " text-xs"}>
                                {planLabels[user.plan as keyof typeof planLabels].label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={roleLabels[user.role as keyof typeof roleLabels].color}>
                          {roleLabels[user.role as keyof typeof roleLabels].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={planLabels[user.plan as keyof typeof planLabels].color}>
                          {planLabels[user.plan as keyof typeof planLabels].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusLabels[user.status as keyof typeof statusLabels].color}>
                          {statusLabels[user.status as keyof typeof statusLabels].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <PenSquare className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleUserStatus(user)}>
                              {user.status === "active" ? (
                                <>
                                  <Lock className="mr-2 h-4 w-4" />
                                  Bloquer
                                </>
                              ) : (
                                <>
                                  <Unlock className="mr-2 h-4 w-4" />
                                  Activer
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => sendPasswordReset(user)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Réinitialiser le mot de passe
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations et les droits de l'utilisateur.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rôle</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">Utilisateur</SelectItem>
                        </SelectContent>
                      </Select>
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
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="blocked">Bloqué</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="free">Gratuit</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
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

      {/* Delete User Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. L'utilisateur sera définitivement supprimé de la plateforme.
              {currentUser && (
                <div className="mt-2 p-3 bg-muted rounded-lg flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{currentUser.name && getInitials(currentUser.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{currentUser.name}</div>
                    <div className="text-sm text-muted-foreground">{currentUser.email}</div>
                  </div>
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

export default UserManager;
