
import React from "react";

interface MarginInterpretationProps {
  marginPercent: number;
  markup: number;
  marginAmount: number;
  costPrice: number;
}

const MarginInterpretation = ({
  marginPercent,
  markup,
  marginAmount,
  costPrice
}: MarginInterpretationProps) => {
  return (
    <div className="pt-4 space-y-4">
      <div className="bg-primary/5 p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium mb-2">Interprétation des résultats</h3>
        <p className="text-sm text-muted-foreground">
          {marginPercent >= 40
            ? "Excellente marge ! Votre produit est très rentable."
            : marginPercent >= 25
            ? "Bonne marge. Votre prix est compétitif tout en assurant une bonne rentabilité."
            : marginPercent >= 15
            ? "Marge moyenne. Envisagez d'optimiser vos coûts ou d'augmenter légèrement votre prix."
            : "Marge faible. Examinez vos coûts ou ajustez votre stratégie de prix."}
        </p>
      </div>
      
      <div className="bg-primary/5 p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          {marginPercent < 20 && (
            <li>• Envisagez d'augmenter votre prix de vente de {((costPrice * 0.25) - marginAmount).toFixed(0)}€ pour atteindre une marge de 25%.</li>
          )}
          {markup < 50 && (
            <li>• Cherchez à réduire vos coûts de production pour améliorer votre taux de marque.</li>
          )}
          {marginPercent > 60 && (
            <li>• Votre marge est très élevée. Vous pourriez envisager de baisser légèrement votre prix pour augmenter votre volume de ventes.</li>
          )}
          {marginAmount <= 0 && (
            <li>• Attention ! Vous vendez à perte. Augmentez votre prix ou réduisez vos coûts immédiatement.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MarginInterpretation;
