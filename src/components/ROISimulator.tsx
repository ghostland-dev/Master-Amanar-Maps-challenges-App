
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Calculator, Download, Heart, RefreshCw } from "lucide-react";
import { slideIn } from "@/lib/animations";
import { generatePdfFromElement, generatePdfFromData } from "@/utils/pdfGenerator";
import { useToast } from "@/components/ui/use-toast";

interface Results {
  roi: number;
  profit: number;
  returnOnCost: number;
  breakEvenPoint: number;
}

const ROISimulator = () => {
  const simulatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [investment, setInvestment] = useState<number>(1000);
  const [revenue, setRevenue] = useState<number>(1500);
  const [costs, setCosts] = useState<number>(500);
  const [period, setPeriod] = useState<string>("month");
  const [results, setResults] = useState<Results | null>(null);
  
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestment(parseFloat(e.target.value) || 0);
  };
  
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevenue(parseFloat(e.target.value) || 0);
  };
  
  const handleCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCosts(parseFloat(e.target.value) || 0);
  };
  
  const calculate = () => {
    // Simple ROI = (Net Profit / Investment) * 100
    const profit = revenue - costs;
    const roi = (profit / investment) * 100;
    const returnOnCost = (profit / costs) * 100;
    const breakEvenPoint = investment / (revenue - costs);
    
    setResults({
      roi,
      profit,
      returnOnCost,
      breakEvenPoint
    });
    
    if (resultsRef.current) {
      slideIn(resultsRef.current, 'up');
    }
  };
  
  const reset = () => {
    setInvestment(1000);
    setRevenue(1500);
    setCosts(500);
    setPeriod("month");
    setResults(null);
  };
  
  const downloadPDF = async () => {
    if (!results) return;
    
    if (printRef.current) {
      try {
        await generatePdfFromElement(printRef.current, {
          title: "Résultats de simulation ROI",
          filename: `roi-simulation-${new Date().toLocaleDateString('fr-FR')}.pdf`,
          subject: "Simulation de retour sur investissement"
        });
        
        toast({
          title: "PDF généré avec succès",
          description: "Votre rapport de simulation a été téléchargé",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de générer le PDF",
          variant: "destructive",
        });
      }
    }
  };
  
  const downloadDataPDF = () => {
    if (!results) return;
    
    try {
      const data = {
        "Paramètres de la simulation": {
          "Investissement initial": `${formatCurrency(investment)}`,
          "Revenus générés": `${formatCurrency(revenue)}`,
          "Coûts opérationnels": `${formatCurrency(costs)}`,
          "Période": translatePeriod(period)
        },
        "Résultats": {
          "ROI": `${results.roi.toFixed(2)}%`,
          "Profit Net": `${formatCurrency(results.profit)}`,
          "Retour sur coût": `${results.returnOnCost.toFixed(2)}%`,
          "Point d'équilibre": `${results.breakEvenPoint.toFixed(1)} ${translatePeriod(period)}s`
        },
        "Interprétation": getInterpretation(results.roi)
      };
      
      generatePdfFromData(data, {
        title: "Rapport de Simulation ROI",
        filename: `roi-simulation-rapport-${new Date().toLocaleDateString('fr-FR')}.pdf`,
        subject: "Simulation de retour sur investissement"
      });
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre rapport détaillé a été téléchargé",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    if (simulatorRef.current) {
      slideIn(simulatorRef.current, 'right');
    }
  }, []);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const translatePeriod = (period: string) => {
    const periods: Record<string, string> = {
      "day": "jour",
      "week": "semaine",
      "month": "mois",
      "quarter": "trimestre",
      "year": "année"
    };
    return periods[period] || period;
  };
  
  const getInterpretation = (roi: number) => {
    if (roi >= 30) {
      return "Excellent ROI ! Votre investissement est très rentable.";
    } else if (roi >= 15) {
      return "Bon ROI. Votre projet est rentable et présente un bon potentiel.";
    } else if (roi >= 0) {
      return "ROI positif mais modeste. Cherchez des moyens d'améliorer la rentabilité.";
    } else {
      return "ROI négatif. Reconsidérez votre stratégie ou réduisez vos coûts.";
    }
  };
  
  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div ref={simulatorRef}>
          <Card className="glass transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-primary" />
                Simulateur de ROI
              </CardTitle>
              <CardDescription>
                Calculez le retour sur investissement de votre projet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="investment">Investissement initial</Label>
                <div className="relative">
                  <Input
                    id="investment"
                    type="number"
                    min="0"
                    step="100"
                    value={investment}
                    onChange={handleInvestmentChange}
                    className="pl-8 transition-all hover:border-primary focus:border-primary"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenus générés</Label>
                <div className="relative">
                  <Input
                    id="revenue"
                    type="number"
                    min="0"
                    step="100"
                    value={revenue}
                    onChange={handleRevenueChange}
                    className="pl-8 transition-all hover:border-primary focus:border-primary"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="costs">Coûts opérationnels</Label>
                <div className="relative">
                  <Input
                    id="costs"
                    type="number"
                    min="0"
                    step="50"
                    value={costs}
                    onChange={handleCostsChange}
                    className="pl-8 transition-all hover:border-primary focus:border-primary"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="period">Période</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger id="period" className="transition-all hover:border-primary focus:border-primary">
                    <SelectValue placeholder="Sélectionnez une période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Journalier</SelectItem>
                    <SelectItem value="week">Hebdomadaire</SelectItem>
                    <SelectItem value="month">Mensuel</SelectItem>
                    <SelectItem value="quarter">Trimestriel</SelectItem>
                    <SelectItem value="year">Annuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={calculate} className="flex-1 transition-all hover:shadow-md">
                  Calculer
                </Button>
                <Button variant="outline" onClick={reset} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" /> Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center">
              <Heart className="mr-1 h-4 w-4 text-red-500" />
              Développé pour vous aider à prendre de meilleures décisions financières
            </p>
          </div>
        </div>
        
        {results && (
          <div ref={resultsRef}>
            <Card className="glass transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
                    Résultats de la simulation
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={downloadPDF} className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Exporter en PDF</span>
                  </Button>
                </div>
                <CardDescription>
                  Analyse basée sur vos données pour la période: {translatePeriod(period)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div ref={printRef}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
                      <h3 className="text-sm text-muted-foreground font-medium mb-1">ROI</h3>
                      <p className={`text-3xl font-bold ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.roi.toFixed(2)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Retour sur investissement
                      </p>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
                      <h3 className="text-sm text-muted-foreground font-medium mb-1">Profit Net</h3>
                      <p className={`text-3xl font-bold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(results.profit)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Revenus - Coûts
                      </p>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
                      <h3 className="text-sm text-muted-foreground font-medium mb-1">Retour sur coût</h3>
                      <p className={`text-3xl font-bold ${results.returnOnCost >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.returnOnCost.toFixed(2)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Profit / Coûts opérationnels
                      </p>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
                      <h3 className="text-sm text-muted-foreground font-medium mb-1">Point d'équilibre</h3>
                      <p className="text-3xl font-bold">
                        {results.breakEvenPoint.toFixed(1)} {translatePeriod(period)}s
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Temps nécessaire pour récupérer l'investissement
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 space-y-4">
                    <div className="bg-primary/5 p-4 rounded-lg hover:shadow-sm transition-all">
                      <h3 className="text-sm font-medium mb-2">Interprétation des résultats</h3>
                      <p className="text-sm text-muted-foreground">
                        {getInterpretation(results.roi)}
                      </p>
                    </div>
                    
                    <div className="bg-primary/5 p-4 rounded-lg hover:shadow-sm transition-all">
                      <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {results.roi < 0 && (
                          <li>• Cherchez à réduire vos coûts opérationnels de {Math.abs(results.profit).toFixed(0)}€ pour atteindre le seuil de rentabilité.</li>
                        )}
                        {results.returnOnCost < 50 && (
                          <li>• Optimisez l'utilisation de vos ressources pour améliorer le retour sur coût.</li>
                        )}
                        {results.breakEvenPoint > 3 && period === "month" && (
                          <li>• Le point d'équilibre est assez éloigné. Envisagez d'augmenter vos revenus pour le réduire.</li>
                        )}
                        {results.breakEvenPoint > 1 && period === "year" && (
                          <li>• Plus d'un an pour rentabiliser votre investissement. Évaluez si cela correspond à vos objectifs.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <Button onClick={downloadDataPDF} variant="secondary" className="w-full flex gap-2 items-center">
                    <Download className="h-4 w-4" />
                    Télécharger le rapport détaillé
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROISimulator;
