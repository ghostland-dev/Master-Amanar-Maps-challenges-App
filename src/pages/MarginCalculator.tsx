
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, ArrowRightLeft, Heart, RefreshCw, Percent, FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import { slideIn } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { generatePdfFromData, generatePdfFromElement } from "@/utils/pdf";

const MarginCalculator = () => {
  const { toast } = useToast();
  const simulatorRef = useState<HTMLDivElement | null>(null)[0];
  const resultsRef = useState<HTMLDivElement | null>(null)[0];
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  
  const [sellingPrice, setSellingPrice] = useState<number>(100);
  const [costPrice, setCostPrice] = useState<number>(60);
  const [marginType, setMarginType] = useState<string>("percent");
  const [results, setResults] = useState<{
    marginAmount: number;
    marginPercent: number;
    markup: number;
    breakEvenPoint: number;
  } | null>(null);
  
  useEffect(() => {
    document.title = "FinQuest - Calculateur de marge";
  }, []);
  
  const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellingPrice(parseFloat(e.target.value) || 0);
  };
  
  const handleCostPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostPrice(parseFloat(e.target.value) || 0);
  };
  
  const calculate = () => {
    if (costPrice <= 0) {
      toast({
        title: "Erreur",
        description: "Le coût de revient doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    if (sellingPrice <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix de vente doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate margin
    const marginAmount = sellingPrice - costPrice;
    const marginPercent = (marginAmount / sellingPrice) * 100;
    const markup = (marginAmount / costPrice) * 100;
    const breakEvenPoint = costPrice > 0 ? costPrice / sellingPrice : 0;
    
    setResults({
      marginAmount,
      marginPercent,
      markup,
      breakEvenPoint
    });
    
    if (resultsRef) {
      slideIn(resultsRef, 'up');
    }
  };
  
  const reset = () => {
    setSellingPrice(100);
    setCostPrice(60);
    setMarginType("percent");
    setResults(null);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const handleExportPdf = () => {
    if (!results) return;
    
    // Option 1: Export as data
    const data = {
      "Informations du calcul": {
        "Prix de vente": formatCurrency(sellingPrice),
        "Coût de revient": formatCurrency(costPrice),
        "Type de marge": marginType === "percent" ? "Pourcentage" : "Montant"
      },
      "Résultats": {
        "Marge brute": formatCurrency(results.marginAmount),
        "Taux de marge": `${results.marginPercent.toFixed(2)}%`,
        "Taux de marque": `${results.markup.toFixed(2)}%`,
        "Seuil de rentabilité": `${(results.breakEvenPoint * 100).toFixed(2)}%`
      },
      "Interprétation": [
        results.marginPercent >= 40
          ? "Excellente marge ! Votre produit est très rentable."
          : results.marginPercent >= 25
          ? "Bonne marge. Votre prix est compétitif tout en assurant une bonne rentabilité."
          : results.marginPercent >= 15
          ? "Marge moyenne. Envisagez d'optimiser vos coûts ou d'augmenter légèrement votre prix."
          : "Marge faible. Examinez vos coûts ou ajustez votre stratégie de prix."
      ],
      "Conseils": [
        results.marginPercent < 20 
          ? `Envisagez d'augmenter votre prix de vente de ${((costPrice * 0.25) - results.marginAmount).toFixed(0)}€ pour atteindre une marge de 25%.` 
          : "",
        results.markup < 50 
          ? "Cherchez à réduire vos coûts de production pour améliorer votre taux de marque." 
          : "",
        results.marginPercent > 60 
          ? "Votre marge est très élevée. Vous pourriez envisager de baisser légèrement votre prix pour augmenter votre volume de ventes." 
          : "",
        results.marginAmount <= 0 
          ? "Attention ! Vous vendez à perte. Augmentez votre prix ou réduisez vos coûts immédiatement." 
          : ""
      ].filter(item => item !== "")
    };
    
    try {
      generatePdfFromData(data, {
        title: "Analyse de Marge - FinQuest",
        filename: "margin-analysis.pdf",
      });
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre analyse de marge a été téléchargée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Calculateur de marge</h1>
          <p className="text-muted-foreground mb-8">
            Déterminez vos marges et prix optimaux pour maximiser votre rentabilité
          </p>
          
          <div className="glass p-6 rounded-xl text-center mb-10 border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <Percent className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Calculateur de marge et prix</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Calculez rapidement votre marge bénéficiaire et analysez votre rentabilité.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Export PDF
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Calcul en temps réel
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Conseils personnalisés
              </span>
            </div>
          </div>
        
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={(el) => { if (el && !simulatorRef) slideIn(el, 'right') }}>
                <Card className="glass border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="mr-2 h-5 w-5 text-primary" />
                      Calculateur de marge
                    </CardTitle>
                    <CardDescription>
                      Calculez votre marge bénéficiaire et votre taux de marge
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="sellingPrice">Prix de vente</Label>
                      <div className="relative">
                        <Input
                          id="sellingPrice"
                          type="number"
                          min="0"
                          step="1"
                          value={sellingPrice}
                          onChange={handleSellingPriceChange}
                          className="pl-8 transition-all hover:border-primary focus:border-primary"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="costPrice">Coût de revient</Label>
                      <div className="relative">
                        <Input
                          id="costPrice"
                          type="number"
                          min="0"
                          step="1"
                          value={costPrice}
                          onChange={handleCostPriceChange}
                          className="pl-8 transition-all hover:border-primary focus:border-primary"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="marginType">Type de marge</Label>
                      <Select value={marginType} onValueChange={setMarginType}>
                        <SelectTrigger id="marginType" className="transition-all hover:border-primary focus:border-primary">
                          <SelectValue placeholder="Sélectionnez un type de marge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percent">Marge en pourcentage</SelectItem>
                          <SelectItem value="amount">Marge en montant</SelectItem>
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
                    Développé pour vous aider à optimiser votre stratégie de prix
                  </p>
                </div>
              </div>
              
              {results && (
                <div ref={(el) => { if (el && !resultsRef) slideIn(el, 'up') }}>
                  <Card className="glass border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
                          Résultats de l'analyse
                        </CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleExportPdf} 
                          className="flex items-center gap-1 hover:bg-primary/10"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Exporter</span>
                        </Button>
                      </div>
                      <CardDescription>
                        Analyse détaillée de votre marge et rentabilité
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6" ref={resultsContainerRef}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">Marge brute</h3>
                          <p className={`text-3xl font-bold ${results.marginAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(results.marginAmount)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Prix de vente - Coût de revient
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">Taux de marge</h3>
                          <p className={`text-3xl font-bold ${results.marginPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.marginPercent.toFixed(2)}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            (Marge / Prix de vente) × 100
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">Taux de marque</h3>
                          <p className={`text-3xl font-bold ${results.markup >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.markup.toFixed(2)}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            (Marge / Coût de revient) × 100
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">Seuil de rentabilité</h3>
                          <p className="text-3xl font-bold">
                            {(results.breakEvenPoint * 100).toFixed(2)}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Pourcentage des ventes nécessaire pour couvrir les coûts
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 space-y-4">
                        <div className="bg-primary/5 p-4 rounded-lg shadow-sm">
                          <h3 className="text-sm font-medium mb-2">Interprétation des résultats</h3>
                          <p className="text-sm text-muted-foreground">
                            {results.marginPercent >= 40
                              ? "Excellente marge ! Votre produit est très rentable."
                              : results.marginPercent >= 25
                              ? "Bonne marge. Votre prix est compétitif tout en assurant une bonne rentabilité."
                              : results.marginPercent >= 15
                              ? "Marge moyenne. Envisagez d'optimiser vos coûts ou d'augmenter légèrement votre prix."
                              : "Marge faible. Examinez vos coûts ou ajustez votre stratégie de prix."}
                          </p>
                        </div>
                        
                        <div className="bg-primary/5 p-4 rounded-lg shadow-sm">
                          <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {results.marginPercent < 20 && (
                              <li>• Envisagez d'augmenter votre prix de vente de {((costPrice * 0.25) - results.marginAmount).toFixed(0)}€ pour atteindre une marge de 25%.</li>
                            )}
                            {results.markup < 50 && (
                              <li>• Cherchez à réduire vos coûts de production pour améliorer votre taux de marque.</li>
                            )}
                            {results.marginPercent > 60 && (
                              <li>• Votre marge est très élevée. Vous pourriez envisager de baisser légèrement votre prix pour augmenter votre volume de ventes.</li>
                            )}
                            {results.marginAmount <= 0 && (
                              <li>• Attention ! Vous vendez à perte. Augmentez votre prix ou réduisez vos coûts immédiatement.</li>
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
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;
