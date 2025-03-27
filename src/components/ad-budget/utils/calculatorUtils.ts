
import { AdBudgetResult, AdBudgetInputs } from "../hooks/useAdBudgetState";

// Format currency
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

export const calculateBudget = (
  monthlyRevenue: number,
  targetROAS: number,
  industryType: string,
  conversionRate: number
): AdBudgetResult => {
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
  
  return {
    recommendedBudget,
    percentageOfRevenue: budgetPercentage * 100,
    estimatedROI,
    projectedRevenue,
    breakdown
  };
};

export const getInputsFromState = (state: {
  monthlyRevenue: number;
  targetROAS: number;
  industryType: string;
  includeOrganic: boolean;
  conversionRate: number;
  averageOrderValue: number;
}): AdBudgetInputs => {
  return {
    monthlyRevenue: state.monthlyRevenue,
    targetROAS: state.targetROAS,
    industryType: state.industryType,
    includeOrganic: state.includeOrganic,
    conversionRate: state.conversionRate,
    averageOrderValue: state.averageOrderValue
  };
};
