
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { slideIn } from "@/lib/animations";
import { exportAdBudgetToPdf } from "@/utils/pdf/exportAdBudget";
import Navbar from "@/components/Navbar";
import AdBudgetHeader from "./AdBudgetHeader";
import AdBudgetForm from "./AdBudgetForm";
import AdBudgetResults from "./AdBudgetResults";
import AdBudgetFooter from "./AdBudgetFooter";
import ComparisonView from "./ComparisonView";
import { Button } from "@/components/ui/button";
import { Columns, X } from "lucide-react";

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

export interface AdBudgetInputs {
  monthlyRevenue: number;
  targetROAS: number;
  industryType: string;
  includeOrganic: boolean;
  conversionRate: number;
  averageOrderValue: number;
}

// Storage keys for localStorage
const STORAGE_KEY_RESULTS = 'adBudget_results';
const STORAGE_KEY_INPUTS = 'adBudget_inputs';
const STORAGE_KEY_COMPARISON = 'adBudget_comparison';

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
  
  // Comparison feature states
  const [isComparisonMode, setIsComparisonMode] = useState<boolean>(false);
  const [savedScenario, setSavedScenario] = useState<AdBudgetResult | null>(null);
  
  // Load saved data on initial mount
  useEffect(() => {
    document.title = "FinQuest - Calcul Budget Publicitaire";
    
    // Load saved inputs and results
    try {
      const savedInputs = localStorage.getItem(STORAGE_KEY_INPUTS);
      const savedResults = localStorage.getItem(STORAGE_KEY_RESULTS);
      const savedComparison = localStorage.getItem(STORAGE_KEY_COMPARISON);
      
      if (savedInputs) {
        const parsedInputs: AdBudgetInputs = JSON.parse(savedInputs);
        setMonthlyRevenue(parsedInputs.monthlyRevenue);
        setTargetROAS(parsedInputs.targetROAS);
        setIndustryType(parsedInputs.industryType);
        setIncludeOrganic(parsedInputs.includeOrganic);
        setConversionRate(parsedInputs.conversionRate);
        setAverageOrderValue(parsedInputs.averageOrderValue);
      }
      
      if (savedResults) {
        const parsedResults: AdBudgetResult = JSON.parse(savedResults);
        setResults(parsedResults);
        
        // Wait for state update to complete before animating
        setTimeout(() => {
          if (resultsRef.current) {
            slideIn(resultsRef.current, 'up');
          }
        }, 100);
      }
      
      if (savedComparison) {
        const parsedComparison: AdBudgetResult = JSON.parse(savedComparison);
        setSavedScenario(parsedComparison);
      }
    } catch (error) {
      console.error("Error loading saved ad budget data:", error);
    }
    
    // Animate simulator on initial render
    if (simulatorRef.current) {
      slideIn(simulatorRef.current, 'right');
    }
  }, []);
  
  // Save inputs and results to localStorage whenever they change
  useEffect(() => {
    // Only save if we have results
    if (results) {
      const inputsToSave: AdBudgetInputs = {
        monthlyRevenue,
        targetROAS,
        industryType,
        includeOrganic,
        conversionRate,
        averageOrderValue
      };
      
      localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(inputsToSave));
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(results));
    }
  }, [results, monthlyRevenue, targetROAS, industryType, includeOrganic, conversionRate, averageOrderValue]);
  
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
    
    // Clear localStorage data
    localStorage.removeItem(STORAGE_KEY_INPUTS);
    localStorage.removeItem(STORAGE_KEY_RESULTS);
    
    toast({
      title: "Réinitialisation effectuée",
      description: "Toutes les données ont été réinitialisées",
    });
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
    
    const newResults = {
      recommendedBudget,
      percentageOfRevenue: budgetPercentage * 100,
      estimatedROI,
      projectedRevenue,
      breakdown
    };
    
    setResults(newResults);
    
    // Wait for state update to complete before animating
    setTimeout(() => {
      if (resultsRef.current) {
        slideIn(resultsRef.current, 'up');
      }
    }, 0);
    
    toast({
      title: "Calcul effectué",
      description: "Votre budget publicitaire a été calculé avec succès",
    });
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
  
  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY_INPUTS);
    localStorage.removeItem(STORAGE_KEY_RESULTS);
    localStorage.removeItem(STORAGE_KEY_COMPARISON);
    
    setSavedScenario(null);
    setIsComparisonMode(false);
    
    toast({
      title: "Données effacées",
      description: "Les données sauvegardées ont été supprimées",
    });
  };
  
  const saveScenario = () => {
    if (!results) return;
    
    setSavedScenario(results);
    localStorage.setItem(STORAGE_KEY_COMPARISON, JSON.stringify(results));
    
    toast({
      title: "Scénario sauvegardé",
      description: "Ce scénario pourra être utilisé pour une comparaison",
    });
  };
  
  const toggleComparisonMode = () => {
    if (isComparisonMode) {
      setIsComparisonMode(false);
    } else {
      if (!savedScenario) {
        toast({
          title: "Aucun scénario sauvegardé",
          description: "Veuillez d'abord sauvegarder un scénario pour comparer",
          variant: "destructive"
        });
        return;
      }
      
      if (!results) {
        toast({
          title: "Aucun résultat actuel",
          description: "Veuillez d'abord calculer un budget pour comparer",
          variant: "destructive"
        });
        return;
      }
      
      setIsComparisonMode(true);
    }
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
                  onClearSavedData={clearSavedData}
                />
                
                <AdBudgetFooter />
              </div>
              
              <div>
                {isComparisonMode ? (
                  <ComparisonView
                    leftScenario={savedScenario}
                    rightScenario={results}
                    onClose={() => setIsComparisonMode(false)}
                    formatCurrency={formatCurrency}
                    toast={toast}
                  />
                ) : results ? (
                  <div ref={resultsRef}>
                    <div className="flex justify-end mb-4 gap-2">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={saveScenario}
                      >
                        Sauvegarder ce scénario
                      </Button>
                      <Button 
                        variant={savedScenario ? "default" : "outline"} 
                        className="gap-2"
                        onClick={toggleComparisonMode}
                        disabled={!savedScenario}
                      >
                        <Columns className="h-4 w-4" />
                        Comparer
                      </Button>
                    </div>
                    <AdBudgetResults 
                      {...results}
                      conversionRate={conversionRate}
                      targetROAS={targetROAS}
                      averageOrderValue={averageOrderValue}
                      formatCurrency={formatCurrency}
                      onExportPdf={handleExportPdf}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBudgetCalculator;
