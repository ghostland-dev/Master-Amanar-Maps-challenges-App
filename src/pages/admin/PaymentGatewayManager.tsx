
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, BadgeDollarSign, BadgeEuro, Euro, DollarSign, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma pour la configuration Stripe
const stripeFormSchema = z.object({
  stripePublicKey: z.string().min(1, "La clé publique est requise"),
  stripeSecretKey: z.string().min(1, "La clé secrète est requise"),
  stripeWebhookSecret: z.string().optional(),
  isStripeEnabled: z.boolean().default(false),
});

// Schéma pour la configuration PayPal
const paypalFormSchema = z.object({
  paypalClientId: z.string().min(1, "L'ID client est requis"),
  paypalClientSecret: z.string().min(1, "Le secret client est requis"),
  isPaypalEnabled: z.boolean().default(false),
  isSandboxMode: z.boolean().default(true),
});

const PaymentGatewayManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("stripe");
  
  // États pour simuler les configurations enregistrées
  const [stripeConfig, setStripeConfig] = useState({
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY || "",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    isStripeEnabled: false,
  });
  
  const [paypalConfig, setPaypalConfig] = useState({
    paypalClientId: process.env.PAYPAL_CLIENT_ID || "",
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET || "",
    isPaypalEnabled: false,
    isSandboxMode: true,
  });

  // Configuration du formulaire Stripe
  const stripeForm = useForm<z.infer<typeof stripeFormSchema>>({
    resolver: zodResolver(stripeFormSchema),
    defaultValues: {
      stripePublicKey: stripeConfig.stripePublicKey,
      stripeSecretKey: stripeConfig.stripeSecretKey,
      stripeWebhookSecret: stripeConfig.stripeWebhookSecret,
      isStripeEnabled: stripeConfig.isStripeEnabled,
    },
  });

  // Configuration du formulaire PayPal
  const paypalForm = useForm<z.infer<typeof paypalFormSchema>>({
    resolver: zodResolver(paypalFormSchema),
    defaultValues: {
      paypalClientId: paypalConfig.paypalClientId,
      paypalClientSecret: paypalConfig.paypalClientSecret,
      isPaypalEnabled: paypalConfig.isPaypalEnabled,
      isSandboxMode: paypalConfig.isSandboxMode,
    },
  });

  // Gestion de la soumission du formulaire Stripe
  const onStripeSubmit = (values: z.infer<typeof stripeFormSchema>) => {
    console.log("Configuration Stripe enregistrée:", values);
    setStripeConfig(values);
    
    toast({
      title: "Configuration Stripe mise à jour",
      description: `La passerelle de paiement Stripe a été ${values.isStripeEnabled ? 'activée' : 'désactivée'}.`,
    });
  };

  // Gestion de la soumission du formulaire PayPal
  const onPaypalSubmit = (values: z.infer<typeof paypalFormSchema>) => {
    console.log("Configuration PayPal enregistrée:", values);
    setPaypalConfig(values);
    
    toast({
      title: "Configuration PayPal mise à jour",
      description: `La passerelle de paiement PayPal a été ${values.isPaypalEnabled ? 'activée' : 'désactivée'} en mode ${values.isSandboxMode ? 'sandbox' : 'production'}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="container mx-auto py-10">
        <div className="mb-10 flex items-center space-x-4">
          <CreditCard className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Passerelles de Paiement</h1>
            <p className="text-muted-foreground">
              Configurez et gérez les passerelles de paiement pour votre plateforme SaaS
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuration des Passerelles de Paiement</CardTitle>
            <CardDescription>
              Activez et configurez différentes passerelles de paiement pour votre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="stripe" className="flex items-center">
                  <BadgeDollarSign className="h-4 w-4 mr-2" />
                  Stripe
                </TabsTrigger>
                <TabsTrigger value="paypal" className="flex items-center">
                  <BadgeEuro className="h-4 w-4 mr-2" />
                  PayPal
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="stripe">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration Stripe</CardTitle>
                    <CardDescription>
                      Entrez vos clés API Stripe pour activer les paiements par carte
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...stripeForm}>
                      <form onSubmit={stripeForm.handleSubmit(onStripeSubmit)} className="space-y-6">
                        <FormField
                          control={stripeForm.control}
                          name="isStripeEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Activer Stripe
                                </FormLabel>
                                <FormDescription>
                                  Activez ou désactivez la passerelle de paiement Stripe
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={stripeForm.control}
                          name="stripePublicKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Clé Publique Stripe</FormLabel>
                              <FormControl>
                                <Input placeholder="pk_..." {...field} />
                              </FormControl>
                              <FormDescription>
                                La clé publique est utilisée côté client
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={stripeForm.control}
                          name="stripeSecretKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Clé Secrète Stripe</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="sk_..." {...field} />
                              </FormControl>
                              <FormDescription>
                                La clé secrète est utilisée côté serveur et ne doit jamais être exposée
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={stripeForm.control}
                          name="stripeWebhookSecret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Secret Webhook Stripe (optionnel)</FormLabel>
                              <FormControl>
                                <Input placeholder="whsec_..." {...field} />
                              </FormControl>
                              <FormDescription>
                                Le secret webhook est utilisé pour vérifier les notifications de Stripe
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          Sauvegarder la configuration Stripe
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="paypal">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration PayPal</CardTitle>
                    <CardDescription>
                      Entrez vos identifiants d'API PayPal pour activer les paiements PayPal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...paypalForm}>
                      <form onSubmit={paypalForm.handleSubmit(onPaypalSubmit)} className="space-y-6">
                        <FormField
                          control={paypalForm.control}
                          name="isPaypalEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Activer PayPal
                                </FormLabel>
                                <FormDescription>
                                  Activez ou désactivez la passerelle de paiement PayPal
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={paypalForm.control}
                          name="isSandboxMode"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Mode Sandbox
                                </FormLabel>
                                <FormDescription>
                                  Activez le mode sandbox pour les tests ou désactivez-le pour la production
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={paypalForm.control}
                          name="paypalClientId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID Client PayPal</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                L'ID client est utilisé pour initier les paiements PayPal
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={paypalForm.control}
                          name="paypalClientSecret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Secret Client PayPal</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormDescription>
                                Le secret client est utilisé pour authentifier les requêtes à l'API PayPal
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          Sauvegarder la configuration PayPal
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Intégration avec les Abonnements</CardTitle>
            <CardDescription>
              Suivez ces étapes pour finaliser l'intégration de paiement avec votre système d'abonnements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-4">
              <li className="pl-2">
                <strong>Configurez votre passerelle de paiement préférée</strong> - Entrez vos clés API dans les formulaires ci-dessus.
              </li>
              <li className="pl-2">
                <strong>Créez des produits et des plans tarifaires</strong> - Allez dans le gestionnaire d'abonnements pour créer des produits et des plans.
              </li>
              <li className="pl-2">
                <strong>Testez le système de paiement</strong> - Utilisez les comptes de test pour vérifier que tout fonctionne correctement.
              </li>
              <li className="pl-2">
                <strong>Activez en production</strong> - Une fois les tests terminés, vous pouvez passer en mode production.
              </li>
            </ol>
            
            <div className="mt-6 flex space-x-4">
              <Button onClick={() => navigate("/admin/subscriptions")}>
                Gérer les Abonnements
              </Button>
              <Button variant="outline" onClick={() => navigate("/admin/analytics")}>
                Voir l'Analytique des Paiements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentGatewayManager;
