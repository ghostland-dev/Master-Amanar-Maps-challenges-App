
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ResultCard from "./ResultCard";
import { Button } from "@/components/ui/button";
import { Download, FilePdf } from "lucide-react";
import { generatePdfFromData } from "@/utils/pdf";
import { useToast } from "@/hooks/use-toast";

interface ROIResultsProps {
  investment: number;
  returns: number;
  period: number;
  roi: number;
  monthlyROI: number;
}

const ROIResults = ({ investment, returns, period, roi, monthlyROI }: ROIResultsProps) => {
  const { toast } = useToast();
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };

  // Format percentage values
  const formatPercentage = (value: number) => {
    return value.toFixed(2) + '%';
  };
  
  const handleExportPdf = () => {
    // Prepare data for PDF export
    const data = {
      "Retour sur Investissement (ROI)": {
        "Investissement initial": formatCurrency(investment),
        "Retours générés": formatCurrency(returns),
        "Période": period === 1 ? "Annuelle" : 
                  period === 4 ? "Trimestrielle" : 
                  period === 12 ? "Mensuelle" : 
                  period === 52 ? "Hebdomadaire" : 
                  period === 365 ? "Journalière" : "Personnalisée",
      },
      "Résultats": {
        "ROI total": formatPercentage(roi),
        "ROI périodique": formatPercentage(monthlyROI),
        "Bénéfice": formatCurrency(returns - investment),
      },
      "Interprétation": [
        roi > 100 
          ? "Excellente performance ! Votre investissement est très rentable." 
          : roi > 50 
          ? "Bonne performance ! Votre investissement présente un bon retour." 
          : roi > 20 
          ? "Performance correcte. Votre investissement est rentable." 
          : roi > 0 
          ? "Performance modeste. Votre investissement est légèrement rentable." 
          : "Attention, votre investissement n'est pas rentable avec ce ROI."
      ]
    };
    
    try {
      generatePdfFromData(data, {
        title: "Analyse de ROI - FinQuest",
        filename: "roi-analysis.pdf",
      });
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre analyse ROI a été téléchargée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportPdf} 
          className="text-sm flex items-center gap-1 hover:bg-primary/10"
        >
          <FilePdf className="h-4 w-4" />
          <span>Exporter en PDF</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard
          title="Investissement"
          value={formatCurrency(investment)}
          description="Montant investi initialement"
          variant="primary"
        />
        <ResultCard
          title="Retours"
          value={formatCurrency(returns)}
          description="Gains générés par l'investissement"
          variant="success"
        />
        <ResultCard
          title="Bénéfice"
          value={formatCurrency(returns - investment)}
          description="Profit net après investissement"
          variant={returns - investment > 0 ? "success" : "danger"}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">ROI Total</h3>
              <p className={`text-3xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(roi)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (Retours - Investissement) / Investissement × 100
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">ROI Périodique</h3>
              <p className={`text-3xl font-bold ${monthlyROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(monthlyROI)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ROI total / Période
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROIResults;
