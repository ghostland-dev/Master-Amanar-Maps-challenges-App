
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useAdBudgetState = () => {
  const { toast } = useToast();
  
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
      }
      
      if (savedComparison) {
        const parsedComparison: AdBudgetResult = JSON.parse(savedComparison);
        setSavedScenario(parsedComparison);
      }
    } catch (error) {
      console.error("Error loading saved ad budget data:", error);
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
  
  return {
    // Form state
    monthlyRevenue,
    setMonthlyRevenue,
    targetROAS,
    setTargetROAS,
    industryType, 
    setIndustryType,
    includeOrganic,
    setIncludeOrganic,
    conversionRate,
    setConversionRate,
    averageOrderValue,
    setAverageOrderValue,
    isAdvancedOpen,
    setIsAdvancedOpen,
    
    // Results state
    results,
    setResults,
    
    // Comparison state
    isComparisonMode,
    setIsComparisonMode,
    savedScenario,
    setSavedScenario,
    
    // Toast
    toast,
    
    // Storage keys
    STORAGE_KEY_RESULTS,
    STORAGE_KEY_INPUTS,
    STORAGE_KEY_COMPARISON
  };
};
