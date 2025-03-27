
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Types pour les transactions
type TransactionStatus = "completed" | "pending" | "failed" | "refunded";
type PaymentMethod = "card" | "paypal" | "bank_transfer";

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  description: string;
  date: Date;
}

// Données de transactions fictives pour démonstration
const mockTransactions: Transaction[] = [
  {
    id: "tx_12345",
    userId: "user_123",
    userName: "Jean Dupont",
    amount: 29.99,
    currency: "EUR",
    status: "completed",
    paymentMethod: "card",
    description: "Abonnement Premium - Mensuel",
    date: new Date(2023, 5, 15)
  },
  {
    id: "tx_12346",
    userId: "user_124",
    userName: "Marie Lambert",
    amount: 99.99,
    currency: "EUR",
    status: "completed",
    paymentMethod: "paypal",
    description: "Abonnement Enterprise - Mensuel",
    date: new Date(2023, 5, 14)
  },
  {
    id: "tx_12347",
    userId: "user_125",
    userName: "Thomas Martin",
    amount: 29.99,
    currency: "EUR",
    status: "failed",
    paymentMethod: "card",
    description: "Abonnement Premium - Mensuel",
    date: new Date(2023, 5, 14)
  },
  {
    id: "tx_12348",
    userId: "user_126",
    userName: "Sophie Petit",
    amount: 299.99,
    currency: "EUR",
    status: "pending",
    paymentMethod: "bank_transfer",
    description: "Abonnement Enterprise - Annuel",
    date: new Date(2023, 5, 13)
  },
  {
    id: "tx_12349",
    userId: "user_127",
    userName: "Pierre Durand",
    amount: 29.99,
    currency: "EUR",
    status: "refunded",
    paymentMethod: "card",
    description: "Abonnement Premium - Mensuel",
    date: new Date(2023, 5, 12)
  }
];

const TransactionsList = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  // Fonction pour formater la date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Fonction pour formater le montant
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Rendu du statut avec icône
  const renderStatus = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Complété
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Échec
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="secondary">
            <AlertCircle className="h-3 w-3 mr-1" />
            Remboursé
          </Badge>
        );
    }
  };

  // Rendu de la méthode de paiement
  const renderPaymentMethod = (method: PaymentMethod) => {
    switch (method) {
      case "card":
        return "Carte bancaire";
      case "paypal":
        return "PayPal";
      case "bank_transfer":
        return "Virement bancaire";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions Récentes</CardTitle>
        <CardDescription>
          Liste des transactions de paiement les plus récentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Liste des transactions récentes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                <TableCell>{transaction.userName}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{formatAmount(transaction.amount, transaction.currency)}</TableCell>
                <TableCell>{renderPaymentMethod(transaction.paymentMethod)}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{renderStatus(transaction.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          toast({
            title: "Exportation",
            description: "Les transactions ont été exportées au format CSV",
          });
        }}>
          Exporter les transactions
        </Button>
        <Button onClick={() => {
          toast({
            title: "Actualisé",
            description: "La liste des transactions a été actualisée",
          });
        }}>
          Actualiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionsList;
