
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  avatar: string;
  [key: string]: any;
}

interface ProfileSettingsProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface ProfileFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface NotificationSettings {
  email: boolean;
  challenges: boolean;
  platform: boolean;
  marketing: boolean;
}

export function ProfileSettings({ user, setUser }: ProfileSettingsProps) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
    }
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    challenges: true,
    platform: true,
    marketing: false,
  });
  
  const handleNotificationChange = (key: keyof NotificationSettings, checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: checked }));
  };
  
  const onSubmitProfile = (data: ProfileFormValues) => {
    // Validate password
    if (data.password && data.password !== data.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        name: data.name,
        email: data.email,
      }));
      
      setIsUpdating(false);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès",
      });
    }, 1000);
  };
  
  const saveNotificationSettings = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences de notification ont été enregistrées",
      });
    }, 1000);
  };
  
  return (
    <Tabs defaultValue="profile">
      <TabsList className="mb-4 grid grid-cols-2">
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <form onSubmit={handleSubmit(onSubmitProfile)}>
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
              <CardDescription>
                Modifiez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input 
                  id="name" 
                  {...register("name", { required: "Le nom est requis" })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  {...register("email", { 
                    required: "L'email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email invalide"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <Input 
                  id="password" 
                  type="password"
                  {...register("password")}
                  placeholder="Laissez vide pour conserver le mot de passe actuel" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  {...register("confirmPassword", {
                    validate: value => {
                      const password = watch("password");
                      return !password || value === password || "Les mots de passe ne correspondent pas";
                    }
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Mise à jour..." : "Enregistrer les modifications"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Préférences de notification</CardTitle>
            <CardDescription>
              Gérez comment et quand vous recevez des notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des emails sur les activités importantes</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={notificationSettings.email} 
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="challenge-notifications" className="font-medium">Notifications de challenge</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications sur les nouveaux challenges</p>
                </div>
                <Switch 
                  id="challenge-notifications" 
                  checked={notificationSettings.challenges} 
                  onCheckedChange={(checked) => handleNotificationChange("challenges", checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="platform-notifications" className="font-medium">Notifications de la plateforme</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications sur les nouvelles fonctionnalités</p>
                </div>
                <Switch 
                  id="platform-notifications" 
                  checked={notificationSettings.platform} 
                  onCheckedChange={(checked) => handleNotificationChange("platform", checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-notifications" className="font-medium">Emails marketing</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des offres et des promotions</p>
                </div>
                <Switch 
                  id="marketing-notifications" 
                  checked={notificationSettings.marketing} 
                  onCheckedChange={(checked) => handleNotificationChange("marketing", checked)} 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveNotificationSettings} disabled={isUpdating}>
              {isUpdating ? "Mise à jour..." : "Enregistrer les préférences"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
