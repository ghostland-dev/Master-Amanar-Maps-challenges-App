
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generatePdfFromElement, generatePdfFromData } from "@/utils/pdfGenerator";
import ResultCard from "./ResultCard";
import InterpretationPanel from "./InterpretationPanel";
import { formatCurrency, translatePeriod, getInterpretation } from "./utils";

interface ResultsData {
  roi: number;
  profit: number;
  returnOnCost: number;
  breakEvenPoint: number;
}

interface ROIResultsProps {
  results: ResultsData;
  period: string;
}

const ROIResults = ({ results, period }: ROIResultsProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Generate tips based on results
  const generateTips = () => {
    const tips = [];
    
    if (results.roi < 0) {
      tips.push(`• Cherchez à réduire vos coûts opérationnels de ${Math.abs(results.profit).toFixed(0)}€ pour atteindre le seuil de rentabilité.`);
    }
    
    if (results.returnOnCost < 50) {
      tips.push(`• Optimisez l'utilisation de vos ressources pour améliorer le retour sur coût.`);
    }
    
    if (results.breakEvenPoint > 3 && period === "month") {
      tips.push(`• Le point d'équilibre est assez éloigné. Envisagez d'augmenter vos revenus pour le réduire.`);
    }
    
    if (results.breakEvenPoint > 1 && period === "year") {
      tips.push(`• Plus d'un an pour rentabiliser votre investissement. Évaluez si cela correspond à vos objectifs.`);
    }
    
    return tips;
  };

  const downloadPDF = async () => {
    if (printRef.current) {
      try {
        await generatePdfFromElement(printRef.current, {
          title: "Résultats de simulation ROI",
          filename: `roi-simulation-${new Date().toLocaleDateString('fr-FR')}.pdf`,
          subject: "Simulation de retour sur investissement"
        });
        
        toast({
          title: "PDF généré avec succès",
          description: "Votre rapport de simulation a été téléchargé",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de générer le PDF",
          variant: "destructive",
        });
      }
    }
  };
  
  const downloadDataPDF = () => {
    try {
      const data = {
        "Paramètres de la simulation": {
          "Investissement initial": `${formatCurrency(results.profit / (results.roi / 100))}`,
          "Revenus générés": `${formatCurrency(results.profit + results.profit / (results.returnOnCost / 100))}`,
          "Coûts opérationnels": `${formatCurrency(results.profit / (results.returnOnCost / 100))}`,
          "Période": translatePeriod(period)
        },
        "Résultats": {
          "ROI": `${results.roi.toFixed(2)}%`,
          "Profit Net": `${formatCurrency(results.profit)}`,
          "Retour sur coût": `${results.returnOnCost.toFixed(2)}%`,
          "Point d'équilibre": `${results.breakEvenPoint.toFixed(1)} ${translatePeriod(period)}s`
        },
        "Interprétation": getInterpretation(results.roi)
      };
      
      generatePdfFromData(data, {
        title: "Rapport de Simulation ROI",
        filename: `roi-simulation-rapport-${new Date().toLocaleDateString('fr-FR')}.pdf`,
        subject: "Simulation de retour sur investissement"
      });
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre rapport détaillé a été téléchargé",
        variant: "default",
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
    <Card className="glass transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
            Résultats de la simulation
          </CardTitle>
          <Button variant="outline" size="sm" onClick={downloadPDF} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exporter en PDF</span>
          </Button>
        </div>
        <CardDescription>
          Analyse basée sur vos données pour la période: {translatePeriod(period)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={printRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              title="ROI"
              value={results.roi}
              suffix="%"
              description="Retour sur investissement"
              isPositive={results.roi >= 0}
            />
            
            <ResultCard
              title="Profit Net"
              value={formatCurrency(results.profit)}
              description="Revenus - Coûts"
              isPositive={results.profit >= 0}
            />
            
            <ResultCard
              title="Retour sur coût"
              value={results.returnOnCost}
              suffix="%"
              description="Profit / Coûts opérationnels"
              isPositive={results.returnOnCost >= 0}
            />
            
            <ResultCard
              title="Point d'équilibre"
              value={`${results.breakEvenPoint.toFixed(1)} ${translatePeriod(period)}s`}
              description="Temps nécessaire pour récupérer l'investissement"
            />
          </div>
          
          <InterpretationPanel 
            interpretation={getInterpretation(results.roi)}
            tips={generateTips()}
          />
        </div>
        
        <div className="border-t pt-4 mt-4">
          <Button onClick={downloadDataPDF} variant="secondary" className="w-full flex gap-2 items-center">
            <Download className="h-4 w-4" />
            Télécharger le rapport détaillé
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROIResults;
