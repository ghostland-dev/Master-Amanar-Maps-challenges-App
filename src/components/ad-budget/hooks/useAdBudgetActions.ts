
import { useToast } from "@/hooks/use-toast";
import { slideIn } from "@/lib/animations";
import { exportAdBudgetToPdf, exportAdBudgetComparisonToPdf } from "@/utils/pdf/exportAdBudget";
import { calculateBudget, getInputsFromState } from "../utils/calculatorUtils";
import { AdBudgetResult } from "./useAdBudgetState";

export const useAdBudgetActions = (state: any, refs: any) => {
  const { toast } = useToast();
  
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setMonthlyRevenue(parseFloat(e.target.value) || 0);
  };
  
  const handleAOVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setAverageOrderValue(parseFloat(e.target.value) || 0);
  };
  
  const handleROASChange = (value: number[]) => {
    state.setTargetROAS(value[0]);
  };
  
  const handleConversionChange = (value: number[]) => {
    state.setConversionRate(value[0]);
  };
  
  const reset = () => {
    state.setMonthlyRevenue(10000);
    state.setTargetROAS(3);
    state.setIndustryType("ecommerce");
    state.setIncludeOrganic(true);
    state.setConversionRate(2.5);
    state.setAverageOrderValue(75);
    state.setIsAdvancedOpen(false);
    state.setResults(null);
    
    // Clear localStorage data
    localStorage.removeItem(state.STORAGE_KEY_INPUTS);
    localStorage.removeItem(state.STORAGE_KEY_RESULTS);
    
    toast({
      title: "Réinitialisation effectuée",
      description: "Toutes les données ont été réinitialisées",
    });
  };
  
  const calculate = () => {
    if (state.monthlyRevenue <= 0) {
      toast({
        title: "Erreur de calcul",
        description: "Le revenu mensuel doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    const newResults = calculateBudget(
      state.monthlyRevenue,
      state.targetROAS,
      state.industryType,
      state.conversionRate
    );
    
    state.setResults(newResults);
    
    // Wait for state update to complete before animating
    setTimeout(() => {
      if (refs.resultsRef.current) {
        slideIn(refs.resultsRef.current, 'up');
      }
    }, 0);
    
    toast({
      title: "Calcul effectué",
      description: "Votre budget publicitaire a été calculé avec succès",
    });
  };

  const handleExportPdf = () => {
    if (!state.results) return;
    
    const inputs = getInputsFromState(state);
    
    exportAdBudgetToPdf(state.results, inputs, toast);
  };
  
  const clearSavedData = () => {
    localStorage.removeItem(state.STORAGE_KEY_INPUTS);
    localStorage.removeItem(state.STORAGE_KEY_RESULTS);
    localStorage.removeItem(state.STORAGE_KEY_COMPARISON);
    
    state.setSavedScenario(null);
    state.setIsComparisonMode(false);
    
    toast({
      title: "Données effacées",
      description: "Les données sauvegardées ont été supprimées",
    });
  };
  
  const saveScenario = () => {
    if (!state.results) return;
    
    state.setSavedScenario(state.results);
    localStorage.setItem(state.STORAGE_KEY_COMPARISON, JSON.stringify(state.results));
    
    toast({
      title: "Scénario sauvegardé",
      description: "Ce scénario pourra être utilisé pour une comparaison",
    });
  };
  
  const toggleComparisonMode = () => {
    if (state.isComparisonMode) {
      state.setIsComparisonMode(false);
    } else {
      if (!state.savedScenario) {
        toast({
          title: "Aucun scénario sauvegardé",
          description: "Veuillez d'abord sauvegarder un scénario pour comparer",
          variant: "destructive"
        });
        return;
      }
      
      if (!state.results) {
        toast({
          title: "Aucun résultat actuel",
          description: "Veuillez d'abord calculer un budget pour comparer",
          variant: "destructive"
        });
        return;
      }
      
      state.setIsComparisonMode(true);
    }
  };
  
  return {
    handleRevenueChange,
    handleAOVChange,
    handleROASChange,
    handleConversionChange,
    reset,
    calculate,
    handleExportPdf,
    clearSavedData,
    saveScenario,
    toggleComparisonMode
  };
};
