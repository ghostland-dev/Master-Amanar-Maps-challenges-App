
/**
 * Formate un nombre en devise (EUR)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(value);
};

/**
 * Prépare les données pour l'export PDF
 */
export const prepareDataForPdfExport = (
  sellingPrice: number,
  costPrice: number,
  marginType: string,
  results: {
    marginAmount: number;
    marginPercent: number;
    markup: number;
    breakEvenPoint: number;
  }
) => {
  return {
    "Informations du calcul": {
      "Prix de vente": formatCurrency(sellingPrice),
      "Coût de revient": formatCurrency(costPrice),
      "Type de marge": marginType === "percent" ? "Pourcentage" : "Montant"
    },
    "Résultats": {
      "Marge brute": formatCurrency(results.marginAmount),
      "Taux de marge": `${results.marginPercent.toFixed(2)}%`,
      "Taux de marque": `${results.markup.toFixed(2)}%`,
      "Seuil de rentabilité": `${(results.breakEvenPoint * 100).toFixed(2)}%`
    },
    "Interprétation": [
      results.marginPercent >= 40
        ? "Excellente marge ! Votre produit est très rentable."
        : results.marginPercent >= 25
        ? "Bonne marge. Votre prix est compétitif tout en assurant une bonne rentabilité."
        : results.marginPercent >= 15
        ? "Marge moyenne. Envisagez d'optimiser vos coûts ou d'augmenter légèrement votre prix."
        : "Marge faible. Examinez vos coûts ou ajustez votre stratégie de prix."
    ],
    "Conseils": [
      results.marginPercent < 20 
        ? `Envisagez d'augmenter votre prix de vente de ${((costPrice * 0.25) - results.marginAmount).toFixed(0)}€ pour atteindre une marge de 25%.` 
        : "",
      results.markup < 50 
        ? "Cherchez à réduire vos coûts de production pour améliorer votre taux de marque." 
        : "",
      results.marginPercent > 60 
        ? "Votre marge est très élevée. Vous pourriez envisager de baisser légèrement votre prix pour augmenter votre volume de ventes." 
        : "",
      results.marginAmount <= 0 
        ? "Attention ! Vous vendez à perte. Augmentez votre prix ou réduisez vos coûts immédiatement." 
        : ""
    ].filter(item => item !== "")
  };
};
