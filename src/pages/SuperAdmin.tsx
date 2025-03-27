
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Award, CreditCard, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminNavbar from "@/components/admin/AdminNavbar";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-10 flex items-center space-x-4">
          <Shield className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
            <p className="text-muted-foreground">
              Gérez tous les aspects de votre plateforme SaaS
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </div>
  );
};

export default SuperAdmin;
