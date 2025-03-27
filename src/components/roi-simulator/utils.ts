
// Format currency in EUR
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

// Translate period from English to French
export const translatePeriod = (period: string) => {
  const periods: Record<string, string> = {
    "day": "jour",
    "week": "semaine",
    "month": "mois",
    "quarter": "trimestre",
    "year": "année"
  };
  return periods[period] || period;
};

// Get ROI interpretation based on percentage
export const getInterpretation = (roi: number) => {
  if (roi >= 30) {
    return "Excellent ROI ! Votre investissement est très rentable.";
  } else if (roi >= 15) {
    return "Bon ROI. Votre projet est rentable et présente un bon potentiel.";
  } else if (roi >= 0) {
    return "ROI positif mais modeste. Cherchez des moyens d'améliorer la rentabilité.";
  } else {
    return "ROI négatif. Reconsidérez votre stratégie ou réduisez vos coûts.";
  }
};

// Calculate ROI results
export interface ROIResults {
  roi: number;
  profit: number;
  returnOnCost: number;
  breakEvenPoint: number;
}

export const calculateROI = (investment: number, revenue: number, costs: number): ROIResults => {
  const profit = revenue - costs;
  const roi = (profit / investment) * 100;
  const returnOnCost = (profit / costs) * 100;
  const breakEvenPoint = investment / profit;
  
  return {
    roi,
    profit,
    returnOnCost,
    breakEvenPoint
  };
};
