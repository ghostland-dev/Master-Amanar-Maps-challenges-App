
import { useRef, useEffect } from "react";
import { slideIn } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import AdBudgetHeader from "./AdBudgetHeader";
import AdBudgetForm from "./AdBudgetForm";
import AdBudgetResults from "./AdBudgetResults";
import AdBudgetFooter from "./AdBudgetFooter";
import ComparisonView from "./ComparisonView";
import ComparisonModeToggle from "./ComparisonModeToggle";
import { useAdBudgetState } from "./hooks/useAdBudgetState";
import { useAdBudgetActions } from "./hooks/useAdBudgetActions";
import { formatCurrency } from "./utils/calculatorUtils";

const AdBudgetCalculator = () => {
  const simulatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Use our custom hook for state management
  const state = useAdBudgetState();
  
  // Use our custom hook for action handlers
  const actions = useAdBudgetActions(state, { resultsRef });
  
  // Animate components on initial render
  useEffect(() => {
    if (simulatorRef.current) {
      slideIn(simulatorRef.current, 'right');
    }
    
    if (resultsRef.current && state.results) {
      setTimeout(() => {
        slideIn(resultsRef.current, 'up');
      }, 100);
    }
  }, [state.results]);
  
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
                  monthlyRevenue={state.monthlyRevenue}
                  targetROAS={state.targetROAS}
                  industryType={state.industryType}
                  includeOrganic={state.includeOrganic}
                  conversionRate={state.conversionRate}
                  averageOrderValue={state.averageOrderValue}
                  isAdvancedOpen={state.isAdvancedOpen}
                  onMonthlyRevenueChange={actions.handleRevenueChange}
                  onROASChange={actions.handleROASChange}
                  onIndustryTypeChange={state.setIndustryType}
                  onIncludeOrganicChange={state.setIncludeOrganic}
                  onConversionChange={actions.handleConversionChange}
                  onAOVChange={actions.handleAOVChange}
                  onAdvancedOpenChange={state.setIsAdvancedOpen}
                  onCalculate={actions.calculate}
                  onReset={actions.reset}
                  onClearSavedData={actions.clearSavedData}
                />
                
                <AdBudgetFooter />
              </div>
              
              <div>
                {state.isComparisonMode ? (
                  <ComparisonView
                    leftScenario={state.savedScenario}
                    rightScenario={state.results}
                    onClose={() => state.setIsComparisonMode(false)}
                    formatCurrency={formatCurrency}
                    toast={state.toast}
                  />
                ) : state.results ? (
                  <div ref={resultsRef}>
                    <ComparisonModeToggle 
                      savedScenario={state.savedScenario}
                      onSaveScenario={actions.saveScenario}
                      onToggleComparison={actions.toggleComparisonMode}
                    />
                    
                    <AdBudgetResults 
                      {...state.results}
                      conversionRate={state.conversionRate}
                      targetROAS={state.targetROAS}
                      averageOrderValue={state.averageOrderValue}
                      formatCurrency={formatCurrency}
                      onExportPdf={actions.handleExportPdf}
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
