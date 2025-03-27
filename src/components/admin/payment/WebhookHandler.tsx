
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, CheckCircle2, XCircle } from "lucide-react";

const WebhookHandler = () => {
  const { toast } = useToast();
  const [webhookEndpoint, setWebhookEndpoint] = useState<string>("");
  const [testResult, setTestResult] = useState<{status: 'success' | 'error' | null, message: string}>({
    status: null,
    message: ""
  });

  // URL de base pour les webhooks
  const baseWebhookUrl = "https://finquest-api.exemple.com/webhooks";
  
  const webhookUrls = {
    stripe: `${baseWebhookUrl}/stripe`,
    paypal: `${baseWebhookUrl}/paypal`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copié!",
        description: "L'URL a été copiée dans le presse-papiers"
      });
    });
  };

  const testWebhook = (provider: 'stripe' | 'paypal') => {
    // Simulation d'un test de webhook
    setTimeout(() => {
      if (Math.random() > 0.2) {
        setTestResult({
          status: 'success',
          message: `Le webhook ${provider} est correctement configuré et fonctionne.`
        });
        toast({
          title: "Test réussi",
          description: `La configuration du webhook ${provider} est valide.`
        });
      } else {
        setTestResult({
          status: 'error',
          message: `Erreur lors du test du webhook ${provider}. Veuillez vérifier votre configuration.`
        });
        toast({
          title: "Échec du test",
          variant: "destructive",
          description: `Le webhook ${provider} n'est pas correctement configuré.`
        });
      }
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration des Webhooks</CardTitle>
        <CardDescription>
          Configurez les webhooks pour recevoir les notifications de paiement en temps réel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stripe">
          <TabsList className="mb-4">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stripe">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Configurez ce webhook dans votre tableau de bord Stripe pour recevoir les événements en temps réel.
                </p>
                
                <div className="flex items-center space-x-2">
                  <Input
                    value={webhookUrls.stripe}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(webhookUrls.stripe)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Événements recommandés :</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>payment_intent.succeeded</Badge>
                  <Badge>payment_intent.failed</Badge>
                  <Badge>subscription.created</Badge>
                  <Badge>subscription.updated</Badge>
                  <Badge>subscription.deleted</Badge>
                  <Badge>invoice.paid</Badge>
                  <Badge>invoice.payment_failed</Badge>
                </div>
              </div>
              
              <Button onClick={() => testWebhook('stripe')}>
                Tester le webhook Stripe
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="paypal">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Configurez ce webhook dans votre compte développeur PayPal pour recevoir les notifications IPN.
                </p>
                
                <div className="flex items-center space-x-2">
                  <Input
                    value={webhookUrls.paypal}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(webhookUrls.paypal)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Événements recommandés :</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>PAYMENT.SALE.COMPLETED</Badge>
                  <Badge>PAYMENT.SALE.DENIED</Badge>
                  <Badge>BILLING.SUBSCRIPTION.CREATED</Badge>
                  <Badge>BILLING.SUBSCRIPTION.UPDATED</Badge>
                  <Badge>BILLING.SUBSCRIPTION.CANCELLED</Badge>
                </div>
              </div>
              
              <Button onClick={() => testWebhook('paypal')}>
                Tester le webhook PayPal
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {testResult.status && (
          <div className={`mt-6 p-4 rounded-lg ${testResult.status === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start">
              {testResult.status === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <p className={`text-sm ${testResult.status === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {testResult.message}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookHandler;
