import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, RefreshCw, Shield, Bell, Moon, Languages, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form states
  const [name, setName] = useState("Julien Dubois");
  const [email, setEmail] = useState("julien@exemple.fr");
  const [language, setLanguage] = useState("fr");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    document.title = "FinQuest - Paramètres";
  }, []);
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès.",
      });
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSaveNotifications = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences de notification ont été enregistrées.",
      });
      setIsLoading(false);
    }, 1500);
  };
  
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
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au profil
            </Button>
            <h1 className="text-3xl font-bold">Paramètres</h1>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="billing">Facturation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles et vos préférences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <Label htmlFor="darkMode">Mode sombre</Label>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveProfile} 
                    disabled={isLoading}
                    className="ml-auto"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>
                    Configurez la façon dont vous souhaitez recevoir les notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications" className="text-base">Notifications par email</Label>
                        <p className="text-sm text-muted-foreground">Recevez des emails pour les nouvelles activités et mises à jour</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications" className="text-base">Notifications push</Label>
                        <p className="text-sm text-muted-foreground">Recevez des notifications sur votre navigateur</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails" className="text-base">Emails marketing</Label>
                        <p className="text-sm text-muted-foreground">Recevez des offres spéciales et des conseils personnalisés</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveNotifications} 
                    disabled={isLoading}
                    className="ml-auto"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Mettre à jour les préférences
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
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
            </TabsContent>
            
            <TabsContent value="billing">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Facturation et abonnement</CardTitle>
                  <CardDescription>
                    Gérez vos méthodes de paiement et votre abonnement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h3 className="font-medium flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-primary" />
                      Abonnement actuel
                    </h3>
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold">Plan Gratuit</p>
                        <p className="text-sm text-muted-foreground">Fonctionnalités de base</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate("/profile?tab=subscription")}
                      >
                        Mettre à niveau
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
                    <h3 className="font-medium">Historique de facturation</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Aucune facturation n'est disponible pour le moment.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
                    <h3 className="font-medium">Méthodes de paiement</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Aucune méthode de paiement n'est enregistrée.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Fonctionnalité à venir",
                        description: "La gestion des méthodes de paiement sera bientôt disponible.",
                      });
                    }}>
                      Ajouter une méthode de paiement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
