
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
