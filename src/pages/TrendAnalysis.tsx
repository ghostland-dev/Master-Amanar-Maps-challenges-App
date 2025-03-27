
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart as LineChartIcon, TrendingUp, TrendingDown, ArrowRightLeft, Heart, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chip } from "@/components/ui/chip";
import Navbar from "@/components/Navbar";
import { slideIn } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TrendAnalysis = () => {
  const { toast } = useToast();
  const simulatorRef = useState<HTMLDivElement | null>(null)[0];
  const resultsRef = useState<HTMLDivElement | null>(null)[0];
  
  const [marketTrendType, setMarketTrendType] = useState<string>("growth");
  const [industryType, setIndustryType] = useState<string>("tech");
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [timeHorizon, setTimeHorizon] = useState<number>(5);
  const [riskTolerance, setRiskTolerance] = useState<string>("moderate");
  const [customGrowthRate, setCustomGrowthRate] = useState<number>(5);
  
  const [results, setResults] = useState<{
    projectedValues: Array<{
      year: number;
      optimistic: number;
      expected: number;
      pessimistic: number;
    }>;
    annualizedReturn: number;
    riskAssessment: string;
    volatility: number;
    marketOpportunities: string[];
    potentialRisks: string[];
  } | null>(null);
  
  useEffect(() => {
    document.title = "FinQuest - Analyse de Tendance";
  }, []);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInvestment(parseFloat(e.target.value) || 0);
  };
  
  const handleTimeHorizonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeHorizon(parseFloat(e.target.value) || 0);
  };
  
  const handleCustomGrowthRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomGrowthRate(parseFloat(e.target.value) || 0);
  };
  
  const reset = () => {
    setMarketTrendType("growth");
    setIndustryType("tech");
    setInitialInvestment(10000);
    setTimeHorizon(5);
    setRiskTolerance("moderate");
    setCustomGrowthRate(5);
    setResults(null);
  };
  
  const calculate = () => {
    if (initialInvestment <= 0) {
      toast({
        title: "Erreur de calcul",
        description: "L'investissement initial doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    if (timeHorizon <= 0) {
      toast({
        title: "Erreur de calcul",
        description: "L'horizon temporel doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    // Base growth rates by industry
    const industryGrowthRates = {
      tech: 8,
      finance: 6,
      healthcare: 7,
      retail: 4,
      energy: 5,
      manufacturing: 3,
      custom: customGrowthRate
    };
    
    // Adjust growth based on market trend
    const marketTrendAdjustment = {
      growth: 2,
      neutral: 0,
      recession: -3
    };
    
    // Risk factors
    const riskFactors = {
      conservative: { optimistic: 1.2, pessimistic: 0.8, volatility: 5 },
      moderate: { optimistic: 1.5, pessimistic: 0.7, volatility: 12 },
      aggressive: { optimistic: 2.0, pessimistic: 0.5, volatility: 20 }
    };
    
    // Calculate base growth rate
    const baseGrowthRate = industryGrowthRates[industryType as keyof typeof industryGrowthRates] + 
                          marketTrendAdjustment[marketTrendType as keyof typeof marketTrendAdjustment];
    
    // Get risk factors
    const riskFactor = riskFactors[riskTolerance as keyof typeof riskFactors];
    
    // Calculate optimistic and pessimistic growth rates
    const optimisticGrowthRate = baseGrowthRate * riskFactor.optimistic;
    const pessimisticGrowthRate = baseGrowthRate * riskFactor.pessimistic;
    
    // Calculate projected values
    const projectedValues = [];
    for (let year = 0; year <= timeHorizon; year++) {
      const optimistic = initialInvestment * Math.pow(1 + optimisticGrowthRate / 100, year);
      const expected = initialInvestment * Math.pow(1 + baseGrowthRate / 100, year);
      const pessimistic = initialInvestment * Math.pow(1 + pessimisticGrowthRate / 100, year);
      
      projectedValues.push({
        year,
        optimistic,
        expected,
        pessimistic
      });
    }
    
    // Market opportunities and risks based on selections
    const marketOpportunities = [];
    const potentialRisks = [];
    
    // Industry-specific opportunities
    switch (industryType) {
      case "tech":
        marketOpportunities.push("Innovation technologique constante");
        marketOpportunities.push("Expansion des marchés émergents");
        potentialRisks.push("Concurrence intense et évolution rapide");
        potentialRisks.push("Risques réglementaires croissants");
        break;
      case "finance":
        marketOpportunities.push("Digitalisation des services financiers");
        marketOpportunities.push("Expansion des services de paiement");
        potentialRisks.push("Volatilité des marchés financiers");
        potentialRisks.push("Changements réglementaires");
        break;
      case "healthcare":
        marketOpportunities.push("Vieillissement de la population");
        marketOpportunities.push("Innovations médicales");
        potentialRisks.push("Pression sur les prix des médicaments");
        potentialRisks.push("Incertitudes réglementaires");
        break;
      case "retail":
        marketOpportunities.push("Croissance du e-commerce");
        marketOpportunities.push("Personnalisation de l'expérience client");
        potentialRisks.push("Concurrence des géants du web");
        potentialRisks.push("Changements des habitudes de consommation");
        break;
      case "energy":
        marketOpportunities.push("Transition énergétique");
        marketOpportunities.push("Nouvelles technologies de stockage");
        potentialRisks.push("Volatilité des prix des matières premières");
        potentialRisks.push("Pressions réglementaires environnementales");
        break;
      case "manufacturing":
        marketOpportunities.push("Industrie 4.0 et automatisation");
        marketOpportunities.push("Chaînes d'approvisionnement optimisées");
        potentialRisks.push("Augmentation des coûts de main-d'œuvre");
        potentialRisks.push("Concurrence internationale");
        break;
    }
    
    // Market trend specific factors
    switch (marketTrendType) {
      case "growth":
        marketOpportunities.push("Expansion économique générale");
        potentialRisks.push("Risque de surchauffe et d'inflation");
        break;
      case "neutral":
        marketOpportunities.push("Stabilité des marchés");
        potentialRisks.push("Stagnation possible");
        break;
      case "recession":
        marketOpportunities.push("Acquisitions à prix réduits");
        marketOpportunities.push("Restructurations et optimisations");
        potentialRisks.push("Baisse généralisée de la consommation");
        potentialRisks.push("Accès limité au financement");
        break;
    }
    
    setResults({
      projectedValues,
      annualizedReturn: baseGrowthRate,
      riskAssessment: riskTolerance,
      volatility: riskFactor.volatility,
      marketOpportunities,
      potentialRisks
    });
    
    if (resultsRef) {
      slideIn(resultsRef, 'up');
    }
  };
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-2">Analyse de tendance</h1>
          <p className="text-muted-foreground mb-8">
            Analysez les tendances du marché et leur impact potentiel sur vos investissements
          </p>
          
          <div className="glass p-6 rounded-xl text-center mb-10">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <LineChartIcon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Simulateur d'analyse de tendance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
              Évaluez l'impact des tendances macro-économiques et sectorielles sur vos investissements.
            </p>
          </div>
        
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={(el) => { if (el && !simulatorRef) slideIn(el, 'right') }}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                      Simulateur d'analyse de tendance
                    </CardTitle>
                    <CardDescription>
                      Analysez l'impact des tendances de marché sur vos investissements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="marketTrendType">Tendance de marché</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant={marketTrendType === "growth" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setMarketTrendType("growth")}
                        >
                          <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                          Croissance
                        </Button>
                        <Button
                          type="button"
                          variant={marketTrendType === "neutral" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setMarketTrendType("neutral")}
                        >
                          <ArrowRightLeft className="mr-2 h-4 w-4 text-yellow-500" />
                          Neutre
                        </Button>
                        <Button
                          type="button"
                          variant={marketTrendType === "recession" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setMarketTrendType("recession")}
                        >
                          <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                          Récession
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industryType">Secteur d'activité</Label>
                      <Select value={industryType} onValueChange={setIndustryType}>
                        <SelectTrigger id="industryType">
                          <SelectValue placeholder="Choisir un secteur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technologie</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Santé</SelectItem>
                          <SelectItem value="retail">Commerce de détail</SelectItem>
                          <SelectItem value="energy">Énergie</SelectItem>
                          <SelectItem value="manufacturing">Industrie manufacturière</SelectItem>
                          <SelectItem value="custom">Personnalisé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {industryType === "custom" && (
                      <div className="space-y-2">
                        <Label htmlFor="customGrowthRate">Taux de croissance personnalisé (%)</Label>
                        <Input
                          id="customGrowthRate"
                          type="number"
                          min="-10"
                          max="20"
                          step="0.5"
                          value={customGrowthRate}
                          onChange={handleCustomGrowthRateChange}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="initialInvestment">Investissement initial</Label>
                      <div className="relative">
                        <Input
                          id="initialInvestment"
                          type="number"
                          min="1000"
                          step="1000"
                          value={initialInvestment}
                          onChange={handleInvestmentChange}
                          className="pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeHorizon">Horizon temporel (années)</Label>
                      <Input
                        id="timeHorizon"
                        type="number"
                        min="1"
                        max="30"
                        step="1"
                        value={timeHorizon}
                        onChange={handleTimeHorizonChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="riskTolerance">Tolérance au risque</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant={riskTolerance === "conservative" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setRiskTolerance("conservative")}
                        >
                          Conservative
                        </Button>
                        <Button
                          type="button"
                          variant={riskTolerance === "moderate" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setRiskTolerance("moderate")}
                        >
                          Modérée
                        </Button>
                        <Button
                          type="button"
                          variant={riskTolerance === "aggressive" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setRiskTolerance("aggressive")}
                        >
                          Agressive
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button onClick={calculate} className="flex-1">
                        Analyser
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
                    Développé pour vous aider à anticiper les tendances du marché
                  </p>
                </div>
              </div>
              
              {results && (
                <div ref={(el) => { if (el && !resultsRef) slideIn(el, 'up') }}>
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChartIcon className="mr-2 h-5 w-5 text-primary" />
                        Analyse de tendance
                      </CardTitle>
                      <CardDescription>
                        Basée sur les tendances actuelles du marché
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="projection" className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="projection" className="flex-1">Projection</TabsTrigger>
                          <TabsTrigger value="analysis" className="flex-1">Analyse</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="projection" className="space-y-6 mt-4">
                          <div className="bg-white rounded-lg p-4">
                            <h3 className="text-sm font-medium mb-4">Projection de l'investissement sur {timeHorizon} ans</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart
                                data={results.projectedValues}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                  dataKey="year" 
                                  label={{ value: 'Années', position: 'insideBottom', offset: -5 }} 
                                />
                                <YAxis 
                                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
                                  label={{ value: 'Montant (k€)', angle: -90, position: 'insideLeft' }} 
                                />
                                <Tooltip 
                                  formatter={(value) => [`${formatCurrency(value as number)}`, '']}
                                  labelFormatter={(value) => `Année ${value}`}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Line 
                                  name="Scénario optimiste" 
                                  type="monotone" 
                                  dataKey="optimistic" 
                                  stroke="#10b981" 
                                  activeDot={{ r: 8 }} 
                                />
                                <Line 
                                  name="Scénario attendu" 
                                  type="monotone" 
                                  dataKey="expected" 
                                  stroke="#3b82f6" 
                                  activeDot={{ r: 8 }} 
                                />
                                <Line 
                                  name="Scénario pessimiste" 
                                  type="monotone" 
                                  dataKey="pessimistic" 
                                  stroke="#ef4444" 
                                  activeDot={{ r: 8 }} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Rendement annualisé</h3>
                              <p className="text-3xl font-bold">
                                {results.annualizedReturn.toFixed(1)}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Taux de rendement moyen par an
                              </p>
                            </div>
                            
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Volatilité estimée</h3>
                              <p className="text-3xl font-bold">
                                {results.volatility.toFixed(1)}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Écart-type annuel prévu
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Valeurs projetées</h3>
                            <div className="space-y-2">
                              <div className="grid grid-cols-4 gap-1 text-xs font-medium text-muted-foreground">
                                <div>Année</div>
                                <div className="text-right">Optimiste</div>
                                <div className="text-right">Attendu</div>
                                <div className="text-right">Pessimiste</div>
                              </div>
                              {results.projectedValues.filter((_, i) => i % Math.ceil(results.projectedValues.length / 6) === 0 || i === results.projectedValues.length - 1).map((yearData) => (
                                <div key={yearData.year} className="grid grid-cols-4 gap-1 text-sm">
                                  <div>{yearData.year}</div>
                                  <div className="text-right text-green-600 font-medium">{formatCurrency(yearData.optimistic)}</div>
                                  <div className="text-right font-medium">{formatCurrency(yearData.expected)}</div>
                                  <div className="text-right text-red-600 font-medium">{formatCurrency(yearData.pessimistic)}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="analysis" className="space-y-6 mt-4">
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Opportunités de marché</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {results.marketOpportunities.map((opportunity, index) => (
                                <Chip key={index} variant="success" size="md">{opportunity}</Chip>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Risques potentiels</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {results.potentialRisks.map((risk, index) => (
                                <Chip key={index} variant="danger" size="md">{risk}</Chip>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Profil de risque</h3>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Tolérance au risque</span>
                                  <span className="font-medium capitalize">{results.riskAssessment}</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      results.riskAssessment === "conservative" ? "bg-green-500" : 
                                      results.riskAssessment === "moderate" ? "bg-yellow-500" : 
                                      "bg-red-500"
                                    }`} 
                                    style={{ width: `${
                                      results.riskAssessment === "conservative" ? 33 : 
                                      results.riskAssessment === "moderate" ? 66 : 
                                      100
                                    }%` }} 
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Volatilité</span>
                                  <span className="font-medium">{results.volatility}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      results.volatility < 10 ? "bg-green-500" : 
                                      results.volatility < 15 ? "bg-yellow-500" : 
                                      "bg-red-500"
                                    }`} 
                                    style={{ width: `${Math.min(results.volatility * 5, 100)}%` }} 
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Recommandations stratégiques</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              {marketTrendType === "growth" && (
                                <li>• Dans un marché en croissance, envisagez une allocation plus importante dans des actifs de croissance.</li>
                              )}
                              {marketTrendType === "neutral" && (
                                <li>• Dans un marché neutre, une approche diversifiée avec un mix d'actifs de croissance et défensifs est recommandée.</li>
                              )}
                              {marketTrendType === "recession" && (
                                <li>• Dans un contexte de récession, privilégiez les actifs défensifs et conservez des liquidités pour saisir les opportunités.</li>
                              )}
                              {results.volatility > 15 && (
                                <li>• La volatilité élevée suggère de réduire l'exposition aux actifs risqués et d'augmenter la diversification.</li>
                              )}
                              {industryType === "tech" && results.annualizedReturn > 7 && (
                                <li>• Le secteur technologique offre un bon potentiel de croissance, mais surveillez les valorisations et diversifiez.</li>
                              )}
                              {timeHorizon < 3 && (
                                <li>• Avec un horizon court, privilégiez la préservation du capital et les actifs moins volatils.</li>
                              )}
                              {timeHorizon > 10 && (
                                <li>• Votre horizon long terme vous permet de supporter plus de volatilité pour viser des rendements supérieurs.</li>
                              )}
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
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

export default TrendAnalysis;
