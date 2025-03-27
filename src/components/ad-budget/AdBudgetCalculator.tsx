
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { slideIn } from "@/lib/animations";
import { exportAdBudgetToPdf } from "@/utils/pdf/exportAdBudget";
import Navbar from "@/components/Navbar";
import AdBudgetHeader from "./AdBudgetHeader";
import AdBudgetForm from "./AdBudgetForm";
import AdBudgetResults from "./AdBudgetResults";
import AdBudgetFooter from "./AdBudgetFooter";

export interface AdBudgetResult {
  recommendedBudget: number;
  percentageOfRevenue: number;
  estimatedROI: number;
  projectedRevenue: number;
  breakdown: {
    search: number;
    social: number;
    display: number;
  };
}

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
  const [results, setResults] = useState<AdBudgetResult | null>(null);
  
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
          <AdBudgetHeader />
          
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={simulatorRef}>
                <AdBudgetForm 
                  monthlyRevenue={monthlyRevenue}
                  targetROAS={targetROAS}
                  industryType={industryType}
                  includeOrganic={includeOrganic}
                  conversionRate={conversionRate}
                  averageOrderValue={averageOrderValue}
                  isAdvancedOpen={isAdvancedOpen}
                  onMonthlyRevenueChange={handleRevenueChange}
                  onROASChange={handleROASChange}
                  onIndustryTypeChange={setIndustryType}
                  onIncludeOrganicChange={setIncludeOrganic}
                  onConversionChange={handleConversionChange}
                  onAOVChange={handleAOVChange}
                  onAdvancedOpenChange={setIsAdvancedOpen}
                  onCalculate={calculate}
                  onReset={reset}
                />
                
                <AdBudgetFooter />
              </div>
              
              {results && (
                <div ref={resultsRef}>
                  <AdBudgetResults 
                    {...results}
                    conversionRate={conversionRate}
                    targetROAS={targetROAS}
                    averageOrderValue={averageOrderValue}
                    formatCurrency={formatCurrency}
                    onExportPdf={handleExportPdf}
                  />
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
