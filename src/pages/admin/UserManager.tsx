
import { useState } from "react";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { UserFilters } from "@/components/admin/users/UserFilters";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserEditDialog } from "@/components/admin/users/UserEditDialog";
import { UserDeleteDialog } from "@/components/admin/users/UserDeleteDialog";
import { MOCK_USERS, User, UserFormValues } from "@/components/admin/users/types";

const UserManager = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesPlan = planFilter === "all" || user.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesPlan;
  });

  // Open edit dialog
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Submit form for editing a user
  const onSubmitEdit = (data: UserFormValues) => {
    if (!currentUser) return;
    
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
    if (!currentUser) return;
    
    const updatedUsers = users.filter((user) => user.id !== currentUser.id);
    
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Utilisateur supprimé",
      description: `"${currentUser.name}" a été supprimé avec succès.`,
      variant: "destructive",
    });
  };

  // Toggle user status (active/blocked)
  const toggleUserStatus = (user: User) => {
    const newStatus = user.status === "active" ? "blocked" : "active";
    
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: newStatus as "active" | "pending" | "blocked" } : u
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: newStatus === "active" ? "Utilisateur activé" : "Utilisateur bloqué",
      description: `Le statut de "${user.name}" a été mis à jour avec succès.`,
    });
  };

  // Send password reset email
  const sendPasswordReset = (user: User) => {
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

        <UserFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          planFilter={planFilter}
          setPlanFilter={setPlanFilter}
        />

        <UserTable 
          users={filteredUsers}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onToggleStatus={toggleUserStatus}
          onSendPasswordReset={sendPasswordReset}
        />
      </div>

      <UserEditDialog 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={currentUser}
        onSubmit={onSubmitEdit}
      />

      <UserDeleteDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={currentUser}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default UserManager;
