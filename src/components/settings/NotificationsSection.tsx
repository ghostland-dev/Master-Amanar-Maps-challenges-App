
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NotificationsSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
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
  
  return (
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
  );
};
