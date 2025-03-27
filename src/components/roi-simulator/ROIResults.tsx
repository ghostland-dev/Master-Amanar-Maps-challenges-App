
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generatePdfFromElement, generatePdfFromData } from "@/utils/pdfGenerator";

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
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const translatePeriod = (period: string) => {
    const periods: Record<string, string> = {
      "day": "jour",
      "week": "semaine",
      "month": "mois",
      "quarter": "trimestre",
      "year": "année"
    };
    return periods[period] || period;
  };
  
  const getInterpretation = (roi: number) => {
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
            <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
              <h3 className="text-sm text-muted-foreground font-medium mb-1">ROI</h3>
              <p className={`text-3xl font-bold ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.roi.toFixed(2)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Retour sur investissement
              </p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
              <h3 className="text-sm text-muted-foreground font-medium mb-1">Profit Net</h3>
              <p className={`text-3xl font-bold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(results.profit)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Revenus - Coûts
              </p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
              <h3 className="text-sm text-muted-foreground font-medium mb-1">Retour sur coût</h3>
              <p className={`text-3xl font-bold ${results.returnOnCost >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.returnOnCost.toFixed(2)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Profit / Coûts opérationnels
              </p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
              <h3 className="text-sm text-muted-foreground font-medium mb-1">Point d'équilibre</h3>
              <p className="text-3xl font-bold">
                {results.breakEvenPoint.toFixed(1)} {translatePeriod(period)}s
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Temps nécessaire pour récupérer l'investissement
              </p>
            </div>
          </div>
          
          <div className="pt-6 space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg hover:shadow-sm transition-all">
              <h3 className="text-sm font-medium mb-2">Interprétation des résultats</h3>
              <p className="text-sm text-muted-foreground">
                {getInterpretation(results.roi)}
              </p>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg hover:shadow-sm transition-all">
              <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                {results.roi < 0 && (
                  <li>• Cherchez à réduire vos coûts opérationnels de {Math.abs(results.profit).toFixed(0)}€ pour atteindre le seuil de rentabilité.</li>
                )}
                {results.returnOnCost < 50 && (
                  <li>• Optimisez l'utilisation de vos ressources pour améliorer le retour sur coût.</li>
                )}
                {results.breakEvenPoint > 3 && period === "month" && (
                  <li>• Le point d'équilibre est assez éloigné. Envisagez d'augmenter vos revenus pour le réduire.</li>
                )}
                {results.breakEvenPoint > 1 && period === "year" && (
                  <li>• Plus d'un an pour rentabiliser votre investissement. Évaluez si cela correspond à vos objectifs.</li>
                )}
              </ul>
            </div>
          </div>
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
