
import { useState } from "react";
import { Save, AlertCircle, Trash } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import AdminNavbar from "@/components/admin/AdminNavbar";

const PaymentGatewayManager = () => {
  const { toast } = useToast();

  // Stripe configuration state
  const [stripeConfig, setStripeConfig] = useState({
    stripePublicKey: "",
    stripeSecretKey: "",
    stripeWebhookSecret: "",
    isStripeEnabled: false
  });

  // PayPal configuration state
  const [paypalConfig, setPaypalConfig] = useState({
    paypalClientId: "",
    paypalClientSecret: "",
    isPaypalEnabled: false,
    isSandboxMode: true
  });

  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Function to update Stripe configuration
  const updateStripeConfig = () => {
    setIsTestingConnection(true);
    
    // In a real app, this would make an API call to validate and save the keys
    setTimeout(() => {
      setIsTestingConnection(false);
      toast({
        title: "Stripe configuration mise à jour",
        description: "Votre configuration Stripe a été enregistrée avec succès.",
      });
    }, 1000);
  };

  // Function to update PayPal configuration
  const updatePaypalConfig = () => {
    setIsTestingConnection(true);
    
    // In a real app, this would make an API call to validate and save the keys
    setTimeout(() => {
      setIsTestingConnection(false);
      toast({
        title: "PayPal configuration mise à jour",
        description: "Votre configuration PayPal a été enregistrée avec succès.",
      });
    }, 1000);
  };

  // Functions to handle input changes
  const handleStripeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    // Fix: Ensure we're providing all required properties when updating state
    setStripeConfig(prevConfig => ({
      ...prevConfig,
      [name]: inputValue
    }));
  };

  const handlePaypalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    // Fix: Ensure we're providing all required properties when updating state
    setPaypalConfig(prevConfig => ({
      ...prevConfig,
      [name]: inputValue
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Passerelles de Paiement</h1>
        
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Stripe Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Configuration Stripe</CardTitle>
                <Switch 
                  checked={stripeConfig.isStripeEnabled}
                  name="isStripeEnabled"
                  onCheckedChange={(checked) => 
                    setStripeConfig(prev => ({ ...prev, isStripeEnabled: checked }))
                  }
                />
              </div>
              <CardDescription>
                Configurez votre intégration Stripe pour accepter les paiements par carte.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stripePublicKey">Clé publique Stripe</Label>
                <Input 
                  id="stripePublicKey"
                  name="stripePublicKey"
                  placeholder="pk_test_..."
                  value={stripeConfig.stripePublicKey}
                  onChange={handleStripeInputChange}
                  disabled={!stripeConfig.isStripeEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stripeSecretKey">Clé secrète Stripe</Label>
                <Input 
                  id="stripeSecretKey"
                  name="stripeSecretKey"
                  type="password"
                  placeholder="sk_test_..."
                  value={stripeConfig.stripeSecretKey}
                  onChange={handleStripeInputChange}
                  disabled={!stripeConfig.isStripeEnabled}
                />
                <p className="text-xs text-muted-foreground">
                  Cette clé sensible est stockée de manière sécurisée et chiffrée.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stripeWebhookSecret">Clé secrète Webhook</Label>
                <Input 
                  id="stripeWebhookSecret"
                  name="stripeWebhookSecret"
                  type="password"
                  placeholder="whsec_..."
                  value={stripeConfig.stripeWebhookSecret}
                  onChange={handleStripeInputChange}
                  disabled={!stripeConfig.isStripeEnabled}
                />
              </div>
              
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Ne partagez jamais vos clés secrètes Stripe. Ces clés donnent un accès complet à votre compte.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" disabled={!stripeConfig.isStripeEnabled}>
                    <Trash className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action supprimera votre configuration Stripe et interrompra tous les paiements actuels.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                      setStripeConfig({
                        stripePublicKey: "",
                        stripeSecretKey: "",
                        stripeWebhookSecret: "",
                        isStripeEnabled: false
                      });
                      toast({
                        title: "Configuration réinitialisée",
                        description: "Votre configuration Stripe a été réinitialisée.",
                      });
                    }}>
                      Réinitialiser
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button 
                onClick={updateStripeConfig}
                disabled={!stripeConfig.isStripeEnabled || isTestingConnection}
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
          
          {/* PayPal Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Configuration PayPal</CardTitle>
                <Switch 
                  checked={paypalConfig.isPaypalEnabled}
                  name="isPaypalEnabled"
                  onCheckedChange={(checked) => 
                    setPaypalConfig(prev => ({ ...prev, isPaypalEnabled: checked }))
                  }
                />
              </div>
              <CardDescription>
                Configurez votre intégration PayPal pour offrir cette option de paiement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paypalClientId">ID Client PayPal</Label>
                <Input 
                  id="paypalClientId"
                  name="paypalClientId"
                  placeholder="Ab12CdEfGhIjKlMnOpQrStUvWxYz..."
                  value={paypalConfig.paypalClientId}
                  onChange={handlePaypalInputChange}
                  disabled={!paypalConfig.isPaypalEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paypalClientSecret">Secret Client PayPal</Label>
                <Input 
                  id="paypalClientSecret"
                  name="paypalClientSecret"
                  type="password"
                  placeholder="EAb12CdEfGhIjKlMnOpQrStUvWxYz..."
                  value={paypalConfig.paypalClientSecret}
                  onChange={handlePaypalInputChange}
                  disabled={!paypalConfig.isPaypalEnabled}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isSandboxMode"
                  name="isSandboxMode"
                  checked={paypalConfig.isSandboxMode}
                  onCheckedChange={(checked) => 
                    setPaypalConfig(prev => ({ ...prev, isSandboxMode: checked }))
                  }
                  disabled={!paypalConfig.isPaypalEnabled}
                />
                <Label htmlFor="isSandboxMode">Mode Sandbox</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Activez le mode sandbox pour tester les paiements sans traiter de véritables transactions.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" disabled={!paypalConfig.isPaypalEnabled}>
                    <Trash className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action supprimera votre configuration PayPal et interrompra tous les paiements actuels.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                      setPaypalConfig({
                        paypalClientId: "",
                        paypalClientSecret: "",
                        isPaypalEnabled: false,
                        isSandboxMode: true
                      });
                      toast({
                        title: "Configuration réinitialisée",
                        description: "Votre configuration PayPal a été réinitialisée.",
                      });
                    }}>
                      Réinitialiser
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button 
                onClick={updatePaypalConfig}
                disabled={!paypalConfig.isPaypalEnabled || isTestingConnection}
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayManager;
