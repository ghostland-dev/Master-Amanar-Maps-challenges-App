import { generatePdfFromData } from "./index";
import { PdfGenerationOptions } from "./types";

interface AdBudgetResult {
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

interface AdBudgetInputs {
  monthlyRevenue: number;
  targetROAS: number;
  industryType: string;
  conversionRate: number;
  averageOrderValue: number;
}

export const exportAdBudgetToPdf = (
  results: AdBudgetResult,
  inputs: AdBudgetInputs,
  toast: any
) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Translate industry type
  const getIndustryLabel = (type: string) => {
    const types: Record<string, string> = {
      "ecommerce": "E-commerce",
      "saas": "SaaS / Tech",
      "retail": "Retail / Commerce",
      "services": "Services"
    };
    return types[type] || type;
  };

  // Prepare data for PDF export
  const data = {
    "Résumé du budget publicitaire": {
      "Budget mensuel recommandé": formatCurrency(results.recommendedBudget),
      "Pourcentage du CA": `${results.percentageOfRevenue.toFixed(1)}%`,
      "ROAS estimé": `${results.estimatedROI.toFixed(1)}x`,
      "Chiffre d'affaires projeté": formatCurrency(results.projectedRevenue)
    },
    "Paramètres de simulation": {
      "Chiffre d'affaires mensuel": formatCurrency(inputs.monthlyRevenue),
      "Objectif de ROAS": `${inputs.targetROAS}x`,
      "Type d'industrie": getIndustryLabel(inputs.industryType),
      "Taux de conversion": `${inputs.conversionRate}%`,
      "Valeur moyenne de commande": formatCurrency(inputs.averageOrderValue)
    },
    "Répartition du budget": {
      "Search (SEA, Google Ads)": formatCurrency(results.breakdown.search),
      "Social (Facebook, Instagram)": formatCurrency(results.breakdown.social),
      "Display et autres canaux": formatCurrency(results.breakdown.display)
    },
    "Conseils personnalisés": results.percentageOfRevenue > 20 ? 
      ["Votre budget est assez élevé. Assurez-vous d'avoir une stratégie d'attribution solide pour optimiser chaque canal."] :
      results.percentageOfRevenue < 5 ?
      ["Votre budget est conservateur. Vous pourriez manquer des opportunités de croissance. Envisagez des tests d'augmentation progressive."] :
      inputs.targetROAS > 5 ?
      ["Votre objectif de ROAS est ambitieux. Concentrez-vous sur des mots-clés à forte intention d'achat et un remarketing efficace."] :
      inputs.conversionRate < 2 ?
      ["Votre taux de conversion est faible. Travaillez sur l'optimisation de votre site avant d'investir davantage en publicité."] :
      ["Votre budget publicitaire semble bien équilibré. Assurez-vous de suivre régulièrement vos performances pour optimiser votre ROI."]
  };

  try {
    // Generate PDF
    generatePdfFromData(data, {
      title: "Recommandation de budget publicitaire",
      filename: "budget-publicitaire.pdf",
      subject: "Rapport de budget publicitaire FinQuest"
    });
    
    toast({
      title: "Rapport téléchargé",
      description: "Le rapport de budget publicitaire a été téléchargé avec succès",
    });
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Impossible de générer le PDF",
      variant: "destructive",
    });
  }
};

export const exportAdBudgetComparisonToPdf = (
  leftScenario: AdBudgetResult,
  rightScenario: AdBudgetResult,
  leftLabel: string,
  rightLabel: string,
  toast: any
) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate difference
  const getDifference = (a: number, b: number, formatter: (n: number) => string = (n) => n.toString()) => {
    const diff = a - b;
    const percentage = b !== 0 ? (diff / b) * 100 : 0;
    return `${diff > 0 ? '+' : ''}${formatter(diff)} (${diff > 0 ? '+' : ''}${percentage.toFixed(1)}%)`;
  };

  // Prepare data for PDF export
  const data = {
    [`Comparaison des scénarios: ${leftLabel} vs ${rightLabel}`]: {
      "Date de génération": new Date().toLocaleDateString('fr-FR')
    },
    "Budget recommandé": {
      [`Budget mensuel - ${leftLabel}`]: formatCurrency(leftScenario.recommendedBudget),
      [`Budget mensuel - ${rightLabel}`]: formatCurrency(rightScenario.recommendedBudget),
      "Différence": getDifference(leftScenario.recommendedBudget, rightScenario.recommendedBudget, formatCurrency),
      
      [`Pourcentage du CA - ${leftLabel}`]: `${leftScenario.percentageOfRevenue.toFixed(1)}%`,
      [`Pourcentage du CA - ${rightLabel}`]: `${rightScenario.percentageOfRevenue.toFixed(1)}%`,
      "Différence (pourcentage)": getDifference(leftScenario.percentageOfRevenue, rightScenario.percentageOfRevenue, (n) => `${n.toFixed(1)}%`)
    },
    "Performance projetée": {
      [`ROAS estimé - ${leftLabel}`]: `${leftScenario.estimatedROI.toFixed(1)}x`,
      [`ROAS estimé - ${rightLabel}`]: `${rightScenario.estimatedROI.toFixed(1)}x`,
      "Différence": getDifference(leftScenario.estimatedROI, rightScenario.estimatedROI, (n) => `${n.toFixed(1)}x`),
      
      [`Revenu projeté - ${leftLabel}`]: formatCurrency(leftScenario.projectedRevenue),
      [`Revenu projeté - ${rightLabel}`]: formatCurrency(rightScenario.projectedRevenue),
      "Différence (revenu)": getDifference(leftScenario.projectedRevenue, rightScenario.projectedRevenue, formatCurrency)
    },
    "Répartition du budget": {
      [`Search - ${leftLabel}`]: formatCurrency(leftScenario.breakdown.search),
      [`Search - ${rightLabel}`]: formatCurrency(rightScenario.breakdown.search),
      "Différence (Search)": getDifference(leftScenario.breakdown.search, rightScenario.breakdown.search, formatCurrency),
      
      [`Social - ${leftLabel}`]: formatCurrency(leftScenario.breakdown.social),
      [`Social - ${rightLabel}`]: formatCurrency(rightScenario.breakdown.social),
      "Différence (Social)": getDifference(leftScenario.breakdown.social, rightScenario.breakdown.social, formatCurrency),
      
      [`Display - ${leftLabel}`]: formatCurrency(leftScenario.breakdown.display),
      [`Display - ${rightLabel}`]: formatCurrency(rightScenario.breakdown.display),
      "Différence (Display)": getDifference(leftScenario.breakdown.display, rightScenario.breakdown.display, formatCurrency)
    },
    "Recommandations": [
      "Analysez attentivement les différences entre les deux scénarios pour identifier la stratégie la plus adaptée à vos objectifs.",
      "Considérez réaliser un test A/B avec un budget limité pour valider la performance des deux approches avant de déployer à grande échelle.",
      "Le scénario avec le ROAS le plus élevé n'est pas nécessairement le meilleur - évaluez également le volume de conversions et le revenu total généré."
    ]
  };

  try {
    // Generate PDF
    generatePdfFromData(data, {
      title: "Comparaison de budgets publicitaires",
      filename: "comparaison-budgets-publicitaires.pdf",
      subject: "Comparaison de scénarios FinQuest"
    });
    
    toast({
      title: "Rapport comparatif téléchargé",
      description: "La comparaison des budgets publicitaires a été téléchargée avec succès",
    });
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Impossible de générer le PDF",
      variant: "destructive",
    });
  }
};
