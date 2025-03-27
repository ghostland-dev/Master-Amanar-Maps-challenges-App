import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, BarChart, ArrowRightLeft, Heart, RefreshCw, Download } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Navbar from "@/components/Navbar";
import { slideIn } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { exportAdBudgetToPdf } from "@/utils/pdf/exportAdBudget";

const AdBudgetCalculator = () => {
  const { toast } = useToast();
  const simulatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(10000);
  const [targetROAS, setTargetROAS] = useState<number>(3);
  const [industryType, setIndustryType] = useState<string>("ecommerce");
  const [includeOrganic, setIncludeOrganic] = useState<boolean>(true);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(75);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);
  
  const [results, setResults] = useState<{
    recommendedBudget: number;
    percentageOfRevenue: number;
    estimatedROI: number;
    projectedRevenue: number;
    breakdown: {
      search: number;
      social: number;
      display: number;
    };
  } | null>(null);
  
  useEffect(() => {
    document.title = "FinQuest - Calcul Budget Publicitaire";
    
    // Animate simulator on initial render
    if (simulatorRef.current) {
      slideIn(simulatorRef.current, 'right');
    }
  }, []);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyRevenue(parseFloat(e.target.value) || 0);
  };
  
  const handleAOVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAverageOrderValue(parseFloat(e.target.value) || 0);
  };
  
  const handleROASChange = (value: number[]) => {
    setTargetROAS(value[0]);
  };
  
  const handleConversionChange = (value: number[]) => {
    setConversionRate(value[0]);
  };
  
  const reset = () => {
    setMonthlyRevenue(10000);
    setTargetROAS(3);
    setIndustryType("ecommerce");
    setIncludeOrganic(true);
    setConversionRate(2.5);
    setAverageOrderValue(75);
    setIsAdvancedOpen(false);
    setResults(null);
  };
  
  const calculate = () => {
    if (monthlyRevenue <= 0) {
      toast({
        title: "Erreur de calcul",
        description: "Le revenu mensuel doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    // Industry factors
    const industryFactors = {
      ecommerce: { searchRatio: 0.5, socialRatio: 0.3, displayRatio: 0.2, basePercentage: 0.12 },
      saas: { searchRatio: 0.4, socialRatio: 0.2, displayRatio: 0.4, basePercentage: 0.18 },
      retail: { searchRatio: 0.35, socialRatio: 0.45, displayRatio: 0.2, basePercentage: 0.10 },
      services: { searchRatio: 0.6, socialRatio: 0.25, displayRatio: 0.15, basePercentage: 0.15 }
    };
    
    const factor = industryFactors[industryType as keyof typeof industryFactors];
    
    // Base budget calculation
    let basePercentage = factor.basePercentage;
    
    // Adjust for ROAS
    const roasFactor = 5 / targetROAS; // Higher target ROAS means lower budget
    
    // Adjust for conversion rate
    const conversionFactor = conversionRate < 2 ? 1.2 : conversionRate > 4 ? 0.8 : 1;
    
    // Calculate budget
    let budgetPercentage = basePercentage * roasFactor * conversionFactor;
    budgetPercentage = Math.min(Math.max(budgetPercentage, 0.05), 0.3); // Limit between 5% and 30%
    
    const recommendedBudget = monthlyRevenue * budgetPercentage;
    const estimatedROI = targetROAS;
    const projectedRevenue = recommendedBudget * targetROAS;
    
    // Channel breakdown
    const breakdown = {
      search: recommendedBudget * factor.searchRatio,
      social: recommendedBudget * factor.socialRatio,
      display: recommendedBudget * factor.displayRatio
    };
    
    setResults({
      recommendedBudget,
      percentageOfRevenue: budgetPercentage * 100,
      estimatedROI,
      projectedRevenue,
      breakdown
    });
    
    // Wait for state update to complete before animating
    setTimeout(() => {
      if (resultsRef.current) {
        slideIn(resultsRef.current, 'up');
      }
    }, 0);
  };

  const handleExportPdf = () => {
    if (!results) return;
    
    const inputs = {
      monthlyRevenue,
      targetROAS,
      industryType,
      conversionRate,
      averageOrderValue
    };
    
    exportAdBudgetToPdf(results, inputs, toast);
  };
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-2">Budget publicitaire</h1>
          <p className="text-muted-foreground mb-8">
            Optimisez votre budget marketing et publicitaire pour maximiser votre ROI
          </p>
          
          <div className="glass p-6 rounded-xl text-center mb-10">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Calculateur de budget publicitaire</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
              Déterminez le budget optimal pour vos campagnes publicitaires en fonction de vos objectifs commerciaux.
            </p>
          </div>
        
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={simulatorRef}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5 text-primary" />
                      Simulateur de budget publicitaire
                    </CardTitle>
                    <CardDescription>
                      Calculez le budget marketing optimal pour atteindre vos objectifs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyRevenue">Chiffre d'affaires mensuel</Label>
                      <div className="relative">
                        <Input
                          id="monthlyRevenue"
                          type="number"
                          min="0"
                          step="1000"
                          value={monthlyRevenue}
                          onChange={handleRevenueChange}
                          className="pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="targetROAS">Objectif de ROAS (Retour sur dépense publicitaire)</Label>
                        <span className="text-sm font-medium">{targetROAS}x</span>
                      </div>
                      <Slider
                        id="targetROAS"
                        min={1}
                        max={10}
                        step={0.5}
                        value={[targetROAS]}
                        onValueChange={handleROASChange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1x (Équilibre)</span>
                        <span>5x (Objectif)</span>
                        <span>10x (Ambitieux)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industryType">Type d'industrie</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant={industryType === "ecommerce" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setIndustryType("ecommerce")}
                        >
                          E-commerce
                        </Button>
                        <Button
                          type="button"
                          variant={industryType === "saas" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setIndustryType("saas")}
                        >
                          SaaS / Tech
                        </Button>
                        <Button
                          type="button"
                          variant={industryType === "retail" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setIndustryType("retail")}
                        >
                          Retail / Commerce
                        </Button>
                        <Button
                          type="button"
                          variant={industryType === "services" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setIndustryType("services")}
                        >
                          Services
                        </Button>
                      </div>
                    </div>
                    
                    <Collapsible
                      open={isAdvancedOpen}
                      onOpenChange={setIsAdvancedOpen}
                      className="border rounded-md p-1"
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between">
                          Paramètres avancés
                          <span className="text-xs">{isAdvancedOpen ? "▲" : "▼"}</span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 pt-2 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="conversionRate">Taux de conversion (%)</Label>
                            <span className="text-sm font-medium">{conversionRate}%</span>
                          </div>
                          <Slider
                            id="conversionRate"
                            min={0.5}
                            max={10}
                            step={0.5}
                            value={[conversionRate]}
                            onValueChange={handleConversionChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="averageOrderValue">Valeur moyenne de commande</Label>
                          <div className="relative">
                            <Input
                              id="averageOrderValue"
                              type="number"
                              min="0"
                              step="5"
                              value={averageOrderValue}
                              onChange={handleAOVChange}
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeOrganic"
                            checked={includeOrganic}
                            onCheckedChange={(checked) => setIncludeOrganic(checked as boolean)}
                          />
                          <Label htmlFor="includeOrganic" className="text-sm">
                            Inclure trafic organique dans les projections
                          </Label>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
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
                    Développé pour optimiser vos investissements publicitaires
                  </p>
                </div>
              </div>
              
              {results && (
                <div ref={resultsRef}>
                  <Card className="glass">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
                          Budget recommandé
                        </CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-primary/10"
                          onClick={handleExportPdf}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Exporter PDF
                        </Button>
                      </div>
                      <CardDescription>
                        Basé sur votre industrie et vos objectifs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-secondary/50 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">Budget mensuel</h3>
                          <p className="text-3xl font-bold text-primary">
                            {formatCurrency(results.recommendedBudget)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {results.percentageOfRevenue.toFixed(1)}% du chiffre d'affaires
                          </p>
                        </div>
                        
                        <div className="bg-secondary/50 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">ROAS estimé</h3>
                          <p className="text-3xl font-bold text-green-600">
                            {results.estimatedROI.toFixed(1)}x
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Retour sur dépense publicitaire
                          </p>
                        </div>
                        
                        <div className="bg-secondary/50 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">CA projeté</h3>
                          <p className="text-3xl font-bold text-green-600">
                            {formatCurrency(results.projectedRevenue)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Généré par les campagnes
                          </p>
                        </div>
                        
                        <div className="bg-secondary/50 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-muted-foreground font-medium mb-1">CPA estimé</h3>
                          <p className="text-3xl font-bold">
                            {formatCurrency(averageOrderValue / targetROAS)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Coût par acquisition
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 space-y-4">
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <h3 className="text-sm font-medium mb-2">Répartition du budget</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Search (SEA, Google Ads)</span>
                                <span className="font-medium">{formatCurrency(results.breakdown.search)}</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full" 
                                  style={{ width: `${(results.breakdown.search / results.recommendedBudget) * 100}%` }} 
                                />
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Social (Facebook, Instagram)</span>
                                <span className="font-medium">{formatCurrency(results.breakdown.social)}</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-500 rounded-full" 
                                  style={{ width: `${(results.breakdown.social / results.recommendedBudget) * 100}%` }} 
                                />
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Display et autres canaux</span>
                                <span className="font-medium">{formatCurrency(results.breakdown.display)}</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500 rounded-full" 
                                  style={{ width: `${(results.breakdown.display / results.recommendedBudget) * 100}%` }} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {results.percentageOfRevenue > 20 && (
                              <li>• Votre budget est assez élevé. Assurez-vous d'avoir une stratégie d'attribution solide pour optimiser chaque canal.</li>
                            )}
                            {results.percentageOfRevenue < 5 && (
                              <li>• Votre budget est conservateur. Vous pourriez manquer des opportunités de croissance. Envisagez des tests d'augmentation progressive.</li>
                            )}
                            {targetROAS > 5 && (
                              <li>• Votre objectif de ROAS est ambitieux. Concentrez-vous sur des mots-clés à forte intention d'achat et un remarketing efficace.</li>
                            )}
                            {conversionRate < 2 && (
                              <li>• Votre taux de conversion est faible. Travaillez sur l'optimisation de votre site avant d'investir davantage en publicité.</li>
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

export default AdBudgetCalculator;
