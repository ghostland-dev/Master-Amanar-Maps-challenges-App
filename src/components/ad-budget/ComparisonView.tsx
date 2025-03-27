
import { useState } from "react";
import { AdBudgetResult } from "./hooks/useAdBudgetState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowDownToLine } from "lucide-react";
import { exportAdBudgetComparisonToPdf } from "@/utils/pdf/exportAdBudget";
import { Toast } from "@/hooks/use-toast";

interface ComparisonViewProps {
  leftScenario: AdBudgetResult | null;
  rightScenario: AdBudgetResult | null;
  onClose: () => void;
  formatCurrency: (value: number) => string;
  toast: any; // Using any for now to avoid breaking changes in type definition
}

const ComparisonView = ({
  leftScenario,
  rightScenario,
  onClose,
  formatCurrency,
  toast
}: ComparisonViewProps) => {
  const [leftLabel, setLeftLabel] = useState<string>("Scénario A");
  const [rightLabel, setRightLabel] = useState<string>("Scénario B");

  const getDifference = (a: number, b: number) => {
    const diff = a - b;
    const percentage = b !== 0 ? (diff / b) * 100 : 0;
    const isPositive = diff > 0;
    
    return {
      diff,
      percentage,
      isPositive
    };
  };
  
  const handleExportPdf = () => {
    if (!leftScenario || !rightScenario) return;
    
    exportAdBudgetComparisonToPdf(
      leftScenario, 
      rightScenario, 
      leftLabel, 
      rightLabel, 
      toast
    );
  };

  const renderComparisonItem = (
    label: string, 
    leftValue: number, 
    rightValue: number, 
    formatter: (n: number) => string = (n) => n.toString(),
    reverseColors: boolean = false
  ) => {
    const { diff, percentage, isPositive } = getDifference(leftValue, rightValue);
    const diffText = `${isPositive ? '+' : ''}${formatter(diff)} (${isPositive ? '+' : ''}${percentage.toFixed(1)}%)`;
    
    const diffColorClass = reverseColors
      ? (!isPositive ? "text-green-600" : "text-red-600")
      : (isPositive ? "text-green-600" : "text-red-600");

    return (
      <div className="py-2 border-b last:border-b-0">
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="font-medium">{formatter(leftValue)}</div>
          <div className="font-medium">{formatter(rightValue)}</div>
          <div className={`font-medium ${diffColorClass}`}>{diffText}</div>
        </div>
      </div>
    );
  };

  if (!leftScenario || !rightScenario) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Comparaison</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-muted-foreground">
            Veuillez enregistrer deux scénarios pour les comparer.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary-50 dark:bg-primary-950/20">
        <CardTitle className="flex justify-between items-center">
          <span>Comparaison des scénarios</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPdf}>
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <input
              type="text"
              value={leftLabel}
              onChange={(e) => setLeftLabel(e.target.value)}
              className="w-full p-2 border rounded bg-background"
              placeholder="Scénario A"
            />
          </div>
          <div>
            <input
              type="text"
              value={rightLabel}
              onChange={(e) => setRightLabel(e.target.value)}
              className="w-full p-2 border rounded bg-background"
              placeholder="Scénario B"
            />
          </div>
          <div className="text-center p-2 font-medium text-muted-foreground">
            Différence
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Budget recommandé</h3>
            {renderComparisonItem(
              "Budget mensuel", 
              leftScenario.recommendedBudget, 
              rightScenario.recommendedBudget, 
              formatCurrency
            )}
            {renderComparisonItem(
              "% du revenu", 
              leftScenario.percentageOfRevenue, 
              rightScenario.percentageOfRevenue, 
              (n) => `${n.toFixed(1)}%`
            )}
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Performance projetée</h3>
            {renderComparisonItem(
              "ROAS estimé", 
              leftScenario.estimatedROI, 
              rightScenario.estimatedROI, 
              (n) => `${n.toFixed(1)}x`
            )}
            {renderComparisonItem(
              "Revenu projeté", 
              leftScenario.projectedRevenue, 
              rightScenario.projectedRevenue, 
              formatCurrency
            )}
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Répartition du budget</h3>
            {renderComparisonItem(
              "Search", 
              leftScenario.breakdown.search, 
              rightScenario.breakdown.search, 
              formatCurrency
            )}
            {renderComparisonItem(
              "Social", 
              leftScenario.breakdown.social, 
              rightScenario.breakdown.social, 
              formatCurrency
            )}
            {renderComparisonItem(
              "Display", 
              leftScenario.breakdown.display, 
              rightScenario.breakdown.display, 
              formatCurrency
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonView;
