
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Percent, LineChart, ArrowRightLeft, Heart, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { slideIn } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

const PassiveIncomeCalculator = () => {
  const { toast } = useToast();
  const simulatorRef = useState<HTMLDivElement | null>(null)[0];
  const resultsRef = useState<HTMLDivElement | null>(null)[0];
  
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(20);
  const [taxRate, setTaxRate] = useState<number>(30);
  const [inflationRate, setInflationRate] = useState<number>(2);
  const [investmentType, setInvestmentType] = useState<string>("mixed");
  const [withdrawalRate, setWithdrawalRate] = useState<number>(4);
  
  const [results, setResults] = useState<{
    finalBalance: number;
    totalContributions: number;
    totalInterestEarned: number;
    passiveIncomeMonthly: number;
    passiveIncomeYearly: number;
    realValueAfterInflation: number;
    taxAmount: number;
    netPassiveIncome: number;
    yearlyData: Array<{
      year: number;
      balance: number;
      contributions: number;
      interest: number;
      passiveIncome: number;
    }>;
  } | null>(null);
  
  useEffect(() => {
    document.title = "FinQuest - Calculateur de Revenus Passifs";
  }, []);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInvestment(parseFloat(e.target.value) || 0);
  };
  
  const handleMonthlyContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyContribution(parseFloat(e.target.value) || 0);
  };
  
  const handleInterestRateChange = (value: number[]) => {
    setInterestRate(value[0]);
  };
  
  const handleInvestmentPeriodChange = (value: number[]) => {
    setInvestmentPeriod(value[0]);
  };
  
  const handleWithdrawalRateChange = (value: number[]) => {
    setWithdrawalRate(value[0]);
  };
  
  const reset = () => {
    setInitialInvestment(10000);
    setMonthlyContribution(200);
    setInterestRate(6);
    setInvestmentPeriod(20);
    setTaxRate(30);
    setInflationRate(2);
    setInvestmentType("mixed");
    setWithdrawalRate(4);
    setResults(null);
  };
  
  const calculate = () => {
    if (initialInvestment < 0 || monthlyContribution < 0) {
      toast({
        title: "Erreur de calcul",
        description: "Les montants d'investissement ne peuvent pas être négatifs",
        variant: "destructive"
      });
      return;
    }
    
    // Initialize variables
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    let totalInterest = 0;
    const yearlyData = [];
    
    // Adjust interest rate based on investment type
    let adjustedInterestRate = interestRate;
    switch (investmentType) {
      case "conservative":
        adjustedInterestRate = Math.max(3, interestRate - 2);
        break;
      case "aggressive":
        adjustedInterestRate = interestRate + 2;
        break;
    }
    
    const monthlyInterestRate = adjustedInterestRate / 100 / 12;
    
    // Calculate growth over time
    for (let year = 1; year <= investmentPeriod; year++) {
      let yearlyInterest = 0;
      let yearlyContribution = 0;
      
      // Calculate compounding for each month of the year
      for (let month = 1; month <= 12; month++) {
        const monthlyInterest = balance * monthlyInterestRate;
        yearlyInterest += monthlyInterest;
        
        balance += monthlyInterest + monthlyContribution;
        yearlyContribution += monthlyContribution;
      }
      
      totalContributions += yearlyContribution;
      totalInterest += yearlyInterest;
      
      // Calculate passive income
      const yearlyPassiveIncome = balance * (withdrawalRate / 100);
      
      yearlyData.push({
        year,
        balance,
        contributions: yearlyContribution,
        interest: yearlyInterest,
        passiveIncome: yearlyPassiveIncome,
      });
    }
    
    // Calculate final values
    const finalBalance = balance;
    const passiveIncomeYearly = finalBalance * (withdrawalRate / 100);
    const passiveIncomeMonthly = passiveIncomeYearly / 12;
    
    // Calculate inflation-adjusted value
    const inflationFactor = Math.pow(1 + (inflationRate / 100), investmentPeriod);
    const realValueAfterInflation = finalBalance / inflationFactor;
    
    // Calculate tax
    const taxAmount = passiveIncomeYearly * (taxRate / 100);
    const netPassiveIncome = passiveIncomeYearly - taxAmount;
    
    setResults({
      finalBalance,
      totalContributions,
      totalInterestEarned: totalInterest,
      passiveIncomeMonthly,
      passiveIncomeYearly,
      realValueAfterInflation,
      taxAmount,
      netPassiveIncome,
      yearlyData,
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
          <h1 className="text-3xl font-bold mb-2">Calculateur de revenus passifs</h1>
          <p className="text-muted-foreground mb-8">
            Projetez vos revenus passifs potentiels grâce à différentes stratégies d'investissement
          </p>
          
          <div className="glass p-6 rounded-xl text-center mb-10">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <Percent className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Simulateur de revenus passifs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
              Calculez le montant de revenu passif que vos investissements peuvent générer à long terme.
            </p>
          </div>
        
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={(el) => { if (el && !simulatorRef) slideIn(el, 'right') }}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="mr-2 h-5 w-5 text-primary" />
                      Simulateur de revenus passifs
                    </CardTitle>
                    <CardDescription>
                      Calculez votre potentiel de revenus passifs à long terme
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="initialInvestment">Investissement initial</Label>
                      <div className="relative">
                        <Input
                          id="initialInvestment"
                          type="number"
                          min="0"
                          step="1000"
                          value={initialInvestment}
                          onChange={handleInitialInvestmentChange}
                          className="pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution">Contribution mensuelle</Label>
                      <div className="relative">
                        <Input
                          id="monthlyContribution"
                          type="number"
                          min="0"
                          step="50"
                          value={monthlyContribution}
                          onChange={handleMonthlyContributionChange}
                          className="pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="interestRate">Taux de rendement annuel moyen</Label>
                        <span className="text-sm font-medium">{interestRate}%</span>
                      </div>
                      <Slider
                        id="interestRate"
                        min={1}
                        max={12}
                        step={0.5}
                        value={[interestRate]}
                        onValueChange={handleInterestRateChange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1% (Très sécurisé)</span>
                        <span>6% (Équilibré)</span>
                        <span>12% (Risqué)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="investmentPeriod">Période d'investissement</Label>
                        <span className="text-sm font-medium">{investmentPeriod} ans</span>
                      </div>
                      <Slider
                        id="investmentPeriod"
                        min={5}
                        max={40}
                        step={1}
                        value={[investmentPeriod]}
                        onValueChange={handleInvestmentPeriodChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="investmentType">Stratégie d'investissement</Label>
                      <Select value={investmentType} onValueChange={setInvestmentType}>
                        <SelectTrigger id="investmentType">
                          <SelectValue placeholder="Choisir une stratégie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative (moins de risque)</SelectItem>
                          <SelectItem value="mixed">Mixte (équilibrée)</SelectItem>
                          <SelectItem value="aggressive">Agressive (plus de risque)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="withdrawalRate">Taux de retrait sécurisé</Label>
                        <span className="text-sm font-medium">{withdrawalRate}%</span>
                      </div>
                      <Slider
                        id="withdrawalRate"
                        min={2}
                        max={8}
                        step={0.5}
                        value={[withdrawalRate]}
                        onValueChange={handleWithdrawalRateChange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>2% (Très prudent)</span>
                        <span>4% (Classique)</span>
                        <span>8% (Agressif)</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="taxRate">Taux d'imposition (%)</Label>
                        <Input
                          id="taxRate"
                          type="number"
                          min="0"
                          max="100"
                          value={taxRate}
                          onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="inflationRate">Taux d'inflation (%)</Label>
                        <Input
                          id="inflationRate"
                          type="number"
                          min="0"
                          max="10"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(parseFloat(e.target.value) || 0)}
                        />
                      </div>
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
                    Développé pour vous aider à planifier votre indépendance financière
                  </p>
                </div>
              </div>
              
              {results && (
                <div ref={(el) => { if (el && !resultsRef) slideIn(el, 'up') }}>
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
                        Projections de revenus passifs
                      </CardTitle>
                      <CardDescription>
                        Basées sur vos données d'investissement sur {investmentPeriod} ans
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="summary" className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="summary" className="flex-1">Résumé</TabsTrigger>
                          <TabsTrigger value="chart" className="flex-1">Graphique</TabsTrigger>
                          <TabsTrigger value="details" className="flex-1">Détails</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="summary" className="space-y-6 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Revenu passif mensuel</h3>
                              <p className="text-3xl font-bold text-green-600">
                                {formatCurrency(results.passiveIncomeMonthly)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Revenu mensuel potentiel
                              </p>
                            </div>
                            
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Revenu passif annuel</h3>
                              <p className="text-3xl font-bold text-green-600">
                                {formatCurrency(results.passiveIncomeYearly)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Revenu annuel potentiel
                              </p>
                            </div>
                            
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Capital final</h3>
                              <p className="text-3xl font-bold">
                                {formatCurrency(results.finalBalance)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Montant total accumulé
                              </p>
                            </div>
                            
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Revenus nets après impôts</h3>
                              <p className="text-3xl font-bold">
                                {formatCurrency(results.netPassiveIncome)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Revenu annuel après impôts
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-4 space-y-4">
                            <div className="bg-primary/5 p-4 rounded-lg">
                              <h3 className="text-sm font-medium mb-2">Récapitulatif de l'investissement</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Total des contributions</span>
                                  <span className="font-medium">{formatCurrency(results.totalContributions)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Total des intérêts cumulés</span>
                                  <span className="font-medium">{formatCurrency(results.totalInterestEarned)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Valeur réelle (après inflation)</span>
                                  <span className="font-medium">{formatCurrency(results.realValueAfterInflation)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Impôts annuels estimés</span>
                                  <span className="font-medium">{formatCurrency(results.taxAmount)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-primary/5 p-4 rounded-lg">
                              <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
                              <ul className="text-sm text-muted-foreground space-y-2">
                                {withdrawalRate > 5 && (
                                  <li>• Votre taux de retrait est élevé. Pour une durabilité à long terme, envisagez de le réduire à 4%.</li>
                                )}
                                {monthlyContribution < 300 && investmentPeriod > 25 && (
                                  <li>• Augmenter votre contribution mensuelle permettrait d'atteindre vos objectifs plus rapidement.</li>
                                )}
                                {investmentType === "conservative" && investmentPeriod > 20 && (
                                  <li>• Avec votre horizon long terme, une stratégie plus équilibrée pourrait améliorer vos résultats.</li>
                                )}
                                {results.passiveIncomeMonthly < 1500 && (
                                  <li>• Votre revenu passif estimé est inférieur au SMIC. Envisagez d'augmenter vos contributions pour améliorer votre confort financier.</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="chart" className="space-y-6 mt-4">
                          <div className="bg-white rounded-lg p-4">
                            <h3 className="text-sm font-medium mb-4">Évolution du capital et des revenus</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart
                                data={results.yearlyData.filter((_, index) => index % 5 === 0 || index === results.yearlyData.length - 1)}
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
                                <Bar name="Capital" dataKey="balance" fill="#3b82f6" />
                                <Bar name="Revenu passif annuel" dataKey="passiveIncome" fill="#10b981" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Croissance totale</h3>
                              <p className="text-3xl font-bold">
                                {(((results.finalBalance / results.totalContributions) - 1) * 100).toFixed(0)}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Rendement total sur la période
                              </p>
                            </div>
                            
                            <div className="bg-secondary/50 p-4 rounded-lg text-center">
                              <h3 className="text-sm text-muted-foreground font-medium mb-1">Rendement moyen</h3>
                              <p className="text-3xl font-bold">
                                {interestRate}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Taux de rendement annuel
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="details" className="space-y-6 mt-4">
                          <div className="bg-white rounded-lg p-4 overflow-auto max-h-[400px]">
                            <table className="w-full text-sm">
                              <thead className="sticky top-0 bg-white">
                                <tr className="border-b">
                                  <th className="text-left p-2">Année</th>
                                  <th className="text-right p-2">Capital</th>
                                  <th className="text-right p-2">Contributions</th>
                                  <th className="text-right p-2">Intérêts</th>
                                  <th className="text-right p-2">Revenu passif</th>
                                </tr>
                              </thead>
                              <tbody>
                                {results.yearlyData.map((yearData) => (
                                  <tr key={yearData.year} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{yearData.year}</td>
                                    <td className="text-right p-2">{formatCurrency(yearData.balance)}</td>
                                    <td className="text-right p-2">{formatCurrency(yearData.contributions)}</td>
                                    <td className="text-right p-2">{formatCurrency(yearData.interest)}</td>
                                    <td className="text-right p-2">{formatCurrency(yearData.passiveIncome)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Remarques importantes</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              <li>• Les projections sont basées sur un taux de rendement constant, ce qui ne reflète pas la volatilité réelle des marchés.</li>
                              <li>• Les valeurs ne tiennent pas compte des frais de gestion potentiels ou autres coûts liés aux investissements.</li>
                              <li>• La répartition des actifs n'est pas modélisée en détail et pourrait affecter les rendements réels.</li>
                              <li>• Les changements fiscaux futurs pourraient impacter le revenu net disponible.</li>
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

export default PassiveIncomeCalculator;
