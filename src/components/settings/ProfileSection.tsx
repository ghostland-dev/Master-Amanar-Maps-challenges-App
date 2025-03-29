
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Save, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export const ProfileSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("Julien Dubois");
  const [email, setEmail] = useState("julien@exemple.fr");
  const [language, setLanguage] = useState("fr");
  const [darkMode, setDarkMode] = useState(false);
  
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
  
  return (
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
  );
};
