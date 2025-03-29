
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const SecuritySection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChangePassword = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Email envoyé",
        description: "Un email pour réinitialiser votre mot de passe a été envoyé.",
      });
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Sécurité du compte</CardTitle>
        <CardDescription>
          Gérez votre mot de passe et la sécurité de votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h3 className="font-medium flex items-center">
            <Shield className="h-4 w-4 mr-2 text-primary" />
            Changer de mot de passe
          </h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Pour modifier votre mot de passe, nous vous enverrons un lien sécurisé par email.
          </p>
          <Button 
            onClick={handleChangePassword} 
            disabled={isLoading} 
            size="sm"
          >
            {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
          </Button>
        </div>
        
        <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
          <h3 className="font-medium">Sessions actives</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-2">
            Vous êtes actuellement connecté sur les appareils suivants:
          </p>
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">Ce navigateur (Chrome)</p>
                <p className="text-xs text-muted-foreground">Paris, France • Dernière connexion: Aujourd'hui</p>
              </div>
              <Badge className="bg-green-500">Actif</Badge>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
          <h3 className="font-medium">Authentification à deux facteurs</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Ajoutez une couche de sécurité supplémentaire à votre compte.
          </p>
          <Button variant="outline" size="sm" onClick={() => {
            toast({
              title: "Fonctionnalité à venir",
              description: "L'authentification à deux facteurs sera bientôt disponible.",
            });
          }}>
            Configurer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
