
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Calculator, Heart, RefreshCw } from "lucide-react";
import { slideIn } from "@/lib/animations";

interface Results {
  roi: number;
  profit: number;
  returnOnCost: number;
  breakEvenPoint: number;
}

const ROISimulator = () => {
  const simulatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    if (simulatorRef.current) {
      slideIn(simulatorRef.current, 'right');
    }
  }, []);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div ref={simulatorRef}>
          <Card className="glass">
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
                    className="pl-8"
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
                    className="pl-8"
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
                    className="pl-8"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="period">Période</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger id="period">
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
                <Button onClick={calculate} className="flex-1">
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
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
                  Résultats de la simulation
                </CardTitle>
                <CardDescription>
                  Analyse basée sur vos données pour la période: {period}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary/50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-muted-foreground font-medium mb-1">ROI</h3>
                    <p className={`text-3xl font-bold ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.roi.toFixed(2)}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Retour sur investissement
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-muted-foreground font-medium mb-1">Profit Net</h3>
                    <p className={`text-3xl font-bold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.profit)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Revenus - Coûts
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-muted-foreground font-medium mb-1">Retour sur coût</h3>
                    <p className={`text-3xl font-bold ${results.returnOnCost >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.returnOnCost.toFixed(2)}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Profit / Coûts opérationnels
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-muted-foreground font-medium mb-1">Point d'équilibre</h3>
                    <p className="text-3xl font-bold">
                      {results.breakEvenPoint.toFixed(1)} {period}s
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Temps nécessaire pour récupérer l'investissement
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Interprétation des résultats</h3>
                    <p className="text-sm text-muted-foreground">
                      {results.roi >= 30
                        ? "Excellent ROI ! Votre investissement est très rentable."
                        : results.roi >= 15
                        ? "Bon ROI. Votre projet est rentable et présente un bon potentiel."
                        : results.roi >= 0
                        ? "ROI positif mais modeste. Cherchez des moyens d'améliorer la rentabilité."
                        : "ROI négatif. Reconsidérez votre stratégie ou réduisez vos coûts."}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
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
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROISimulator;
