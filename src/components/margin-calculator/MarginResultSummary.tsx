
import React from "react";
import { formatCurrency } from "@/components/margin-calculator/utils";

interface MarginResultSummaryProps {
  marginAmount: number;
  marginPercent: number;
  markup: number;
  breakEvenPoint: number;
}

const MarginResultSummary = ({
  marginAmount,
  marginPercent,
  markup,
  breakEvenPoint
}: MarginResultSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
        <h3 className="text-sm text-muted-foreground font-medium mb-1">Marge brute</h3>
        <p className={`text-3xl font-bold ${marginAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(marginAmount)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Prix de vente - Coût de revient
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
        <h3 className="text-sm text-muted-foreground font-medium mb-1">Taux de marge</h3>
        <p className={`text-3xl font-bold ${marginPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {marginPercent.toFixed(2)}%
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          (Marge / Prix de vente) × 100
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
        <h3 className="text-sm text-muted-foreground font-medium mb-1">Taux de marque</h3>
        <p className={`text-3xl font-bold ${markup >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {markup.toFixed(2)}%
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          (Marge / Coût de revient) × 100
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-lg text-center shadow-sm">
        <h3 className="text-sm text-muted-foreground font-medium mb-1">Seuil de rentabilité</h3>
        <p className="text-3xl font-bold">
          {(breakEvenPoint * 100).toFixed(2)}%
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Pourcentage des ventes nécessaire pour couvrir les coûts
        </p>
      </div>
    </div>
  );
};

export default MarginResultSummary;
