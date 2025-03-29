
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Award, CreditCard, BarChart3, Building, Link as LinkIcon, UserCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { useAuth } from "@/context/AuthContext";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(true); // In a real app, check admin rights

  // Mock check for demonstration purposes
  // In a real app, this would be handled by authentication system
  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Accès non autorisé</CardTitle>
            <CardDescription>
              Vous n'avez pas les droits d'accès pour cette section.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/")} 
              className="w-full"
            >
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const adminModules = [
    {
      title: "Gestion des Challenges",
      description: "Créer, modifier, supprimer et gérer tous les challenges de la plateforme.",
      icon: <Award className="h-8 w-8 text-primary" />,
      path: "/admin/challenges"
    },
    {
      title: "Gestion des Utilisateurs",
      description: "Gérer les utilisateurs, leurs rôles et leurs accès à la plateforme.",
      icon: <Users className="h-8 w-8 text-primary" />,
      path: "/admin/users"
    },
    {
      title: "Gestion des Abonnements",
      description: "Gérer les plans d'abonnement et les transactions sur la plateforme.",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      path: "/admin/subscriptions"
    },
    {
      title: "Statistiques & Analytique",
      description: "Visualiser les statistiques d'utilisation et les performances de la plateforme.",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      path: "/admin/analytics"
    }
  ];

  // Informations sur les rôles
  const roles = [
    {
      name: "Client",
      icon: <UserCircle className="h-6 w-6 text-green-500" />,
      description: "Utilisateurs standards avec accès aux fonctionnalités de base",
      access: ["Dashboard", "Challenges", "Bibliothèque", "Simulateurs"]
    },
    {
      name: "Partenaire",
      icon: <Building className="h-6 w-6 text-amber-500" />,
      description: "Partenaires externes avec portail dédié",
      access: ["Dashboard", "Portail partenaire", "Accès premium"]
    },
    {
      name: "Affiliateur",
      icon: <LinkIcon className="h-6 w-6 text-purple-500" />,
      description: "Promoteurs avec outils d'affiliation",
      access: ["Dashboard", "Outils d'affiliation", "Suivi de commissions"]
    },
    {
      name: "Commercial",
      icon: <CreditCard className="h-6 w-6 text-cyan-500" />,
      description: "Équipe commerciale avec CRM",
      access: ["Dashboard", "Dashboard commercial", "Analytics", "Gestion client"]
    },
    {
      name: "Admin",
      icon: <Shield className="h-6 w-6 text-red-500" />,
      description: "Administration de la plateforme",
      access: ["Toutes les fonctionnalités standards", "Panneau admin", "Gestion utilisateurs", "Gestion challenges"]
    },
    {
      name: "Super Admin",
      icon: <Shield className="h-6 w-6 text-orange-500" />,
      description: "Accès complet à toute la plateforme",
      access: ["Toutes les fonctionnalités sans exception"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-10 flex items-center space-x-4">
          <Shield className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
            <p className="text-muted-foreground">
              {user?.role === 'super_admin' ? 'Accès Super Admin' : 'Accès Admin'} - Gérez tous les aspects de votre plateforme SaaS
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-10">
          {adminModules.map((module, index) => (
            <Card 
              key={index} 
              className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
              onClick={() => navigate(module.path)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  {module.icon}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(module.path);
                    }}
                  >
                    Gérer
                  </Button>
                </div>
                <CardTitle className="mt-4">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Gestion des rôles et permissions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  {role.icon}
                  <CardTitle>{role.name}</CardTitle>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-medium mb-2">Accès:</h4>
                <div className="flex flex-wrap gap-1">
                  {role.access.map((access, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted">
                      {access}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
